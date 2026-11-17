// 纯函数：CSV 导出、血压/血脂平均值计算（不依赖浏览器，可被 node 单测）。
// localStorage 读写在 store.js 里。

export function toCSV(rows, columns) {
  const esc = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const head = columns.map((c) => esc(c.label)).join(',');
  const body = rows.map((r) => columns.map((c) => esc(c.value(r))).join(',')).join('\n');
  return `\uFEFF${head}\n${body}\n`;
}

export function downloadCSV(filename, csvText) {
  const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// 上午 = 06:00–11:59，下午/晚上 = 其余时段（用于早晚平均）。
export function periodOf(datetimeStr) {
  const h = new Date(datetimeStr).getHours();
  return h >= 6 && h < 12 ? 'morning' : 'evening';
}

export function avg(list, key) {
  if (!list.length) return null;
  const v = list.reduce((s, r) => s + Number(r[key] || 0), 0) / list.length;
  return Math.round(v * 10) / 10;
}

// 7 天表：按日期分组，算早/晚平均；第 1 天数据按指南口径不计入 7 天总平均。
export function sevenDaySummary(readings) {
  const sorted = [...readings].sort((a, b) => a.datetime.localeCompare(b.datetime));
  const byDate = {};
  sorted.forEach((r) => {
    const d = r.datetime.slice(0, 10);
    byDate[d] = byDate[d] || { date: d, morning: [], evening: [] };
    byDate[d][periodOf(r.datetime)].push(r);
  });
  const days = Object.values(byDate)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7)
    .map((d) => ({
      date: d.date,
      morningSys: avg(d.morning, 'sys'),
      morningDia: avg(d.morning, 'dia'),
      eveningSys: avg(d.evening, 'sys'),
      eveningDia: avg(d.evening, 'dia'),
      count: d.morning.length + d.evening.length,
    }));
  const rest = days.slice(1); // 去掉第 1 天
  // 总平均直接用第 2 天起的原始读数算，避免按天平均再平均带来的偏差。
  const restDates = new Set(rest.map((d) => d.date));
  const restReadings = sorted.filter(
    (r) => restDates.has(r.datetime.slice(0, 10)) && days.length >= 2,
  );
  const pool = days.length >= 2 ? restReadings : sorted;
  return {
    days,
    avgSys: avg(pool, 'sys'),
    avgDia: avg(pool, 'dia'),
    note:
      days.length >= 2
        ? '已按 7 天家庭血压口径去掉第 1 天的数据再算平均。'
        : '不足 2 天，暂按全部记录算平均；连续记录 7 天后会自动去掉第 1 天。',
  };
}

export const LDL_TARGETS = {
  '低危': { target: 3.4, text: '< 3.4 mmol/L', needReduction: false },
  '中高危': { target: 2.6, text: '< 2.6 mmol/L', needReduction: false },
  '极高危': { target: 1.8, text: '< 1.8 mmol/L 且降幅 > 50%', needReduction: true },
  '超高危': { target: 1.4, text: '< 1.4 mmol/L 且降幅 > 50%', needReduction: true },
};

export function ldlStatus(ldl, risk, baselineLdl) {
  const t = LDL_TARGETS[risk];
  if (!t || ldl === null || ldl === undefined || ldl === '') return { ok: null, text: '—' };
  const v = Number(ldl);
  const reachTarget = v < t.target;
  let reduction = null;
  if (baselineLdl) {
    reduction = Math.round(((Number(baselineLdl) - v) / Number(baselineLdl)) * 1000) / 10;
  }
  const reachReduction = !t.needReduction || (reduction !== null && reduction > 50);
  const ok = reachTarget && reachReduction;
  return {
    ok,
    text: ok ? '达标' : '未达标',
    targetText: t.text,
    reduction,
  };
}
