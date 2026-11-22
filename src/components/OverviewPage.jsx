import { ARTICLES } from '../data/articles';
import { DATA_AS_OF, DRUGS, RADAR_EVENTS, SOURCES, TRIALS } from '../data/frontier';
import { SourceText } from './SourceLinks';

const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
const short = (s, n = 70) => (s && s.length > n ? `${s.slice(0, n)}…` : s || '');

// 阶段分布条：设计稿口径（已上市 / III期 / II期 / 早期在研），由 DRUGS 的 stage 字段分组推导。
const STAGE_GROUPS = [
  { label: '已上市', match: (s) => s === '已上市', color: '#0f766e' },
  { label: 'III期', match: (s) => s.startsWith('III期'), color: 'rgba(15,118,110,.55)' },
  { label: 'II期', match: (s) => s.startsWith('II期'), color: 'rgba(15,118,110,.32)' },
  { label: '早期在研', match: (s) => s === '早期在研', color: 'rgba(15,118,110,.18)' },
];

export default function OverviewPage({ onGo }) {
  const headline = RADAR_EVENTS.find((e) => e.type === '获批' && e.title.includes('Enlicitide'));
  const approvals = RADAR_EVENTS.filter((e) => e.type === '获批').sort(byDateDesc).slice(0, 4);
  const results = RADAR_EVENTS.filter((e) => e.type === '结果公布' || e.type === '试验推进')
    .sort(byDateDesc).slice(0, 4);
  const failures = RADAR_EVENTS.filter((e) => e.type === '失败/未达终点').sort(byDateDesc);
  const stageCounts = STAGE_GROUPS.map((g) => ({ ...g, count: DRUGS.filter((d) => g.match(d.stage)).length }));

  return (
    <div>
      {/* 头条：数据中最新的重大获批事件（Enlicitide，FDA 2026-07-16） */}
      <div className="headline">
        <div className="kicker"><span className="dot" />本周头条 · 获批</div>
        <h1>{headline.title}</h1>
        <p className="lede">{headline.summary}</p>
        <p className="src">
          {headline.date} · 来源：<SourceText text={headline.source} links={headline.sourceLinks} />
        </p>
      </div>

      {/* 三栏栏目流 */}
      <div className="cols">
        <div className="col">
          <h2>获批</h2>
          <ul className="news-list">
            {approvals.map((e) => (
              <li key={e.id}>
                <div className="news-meta">{e.date}</div>
                <h3>{e.title}</h3>
                <p>{short(e.summary, 60)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col">
          <h2>试验结果</h2>
          <ul className="news-list">
            {results.map((e) => (
              <li key={e.id}>
                <div className="news-meta">{e.date}</div>
                <h3>{e.title}</h3>
                <p>{short(e.summary, 60)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col">
          <h2><span className="fail">失败</span></h2>
          <ul className="news-list">
            {failures.map((e) => (
              <li key={e.id}>
                <div className="news-meta">{e.date}<span className="tag fail">● 未达终点</span></div>
                <h3>{e.title}</h3>
                <p>{short(e.summary, 60)}</p>
              </li>
            ))}
          </ul>
          <p className="note">
            2026 年至今收录失败 / 未达终点事件 {failures.length} 条。这一结果并未否定 Lp(a) 本身的致病作用，后续 siRNA 药物的结局试验仍在进行中。
          </p>
        </div>
      </div>

      {/* 阶段分布条 */}
      <div className="stagebar">
        <h2>{DRUGS.length} 个药物，按研发阶段分布</h2>
        <div className="bar">
          {stageCounts.map((g) => (
            <div key={g.label} style={{ flex: g.count, background: g.color }} />
          ))}
        </div>
        <div className="legend">
          {stageCounts.map((g) => (
            <div key={g.label}>
              <span className="sw" style={{ background: g.color }} />
              {g.label} <b>{g.count}</b> · {Math.round((g.count / DRUGS.length) * 100)}%
            </div>
          ))}
        </div>
      </div>

      {/* 子页入口 */}
      <div className="entries">
        <a onClick={() => onGo('drugs')}>药物资料库 <span>{DRUGS.length} 个药物与技术</span> <i>→</i></a>
        <a onClick={() => onGo('trials')}>试验追踪 <span>{TRIALS.length} 项临床试验</span> <i>→</i></a>
        <a onClick={() => onGo('evidence')}>医学证据分析 <span>收缩压 · LDL-C · 心血管事件</span> <i>→</i></a>
        <a onClick={() => onGo('articles')}>前沿解读 <span>{ARTICLES.length} 篇</span> <i>→</i></a>
        <a onClick={() => onGo('treatment')}>治疗方案 <span>指南分层总览</span> <i>→</i></a>
        <a onClick={() => onGo('guide')}>正确测压 <span>附录</span> <i>→</i></a>
      </div>

      {/* 数据来源 */}
      <div className="section">
        <h2>数据来源</h2>
        <ul className="news-list">
          {SOURCES.map((s) => (
            <li key={s.name}>
              <h3 style={{ fontSize: 15 }}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                ) : s.name}
              </h3>
              <p>{s.note}</p>
              {s.extraUrls && (
                <p className="src">
                  {s.extraUrls.map((x) => (
                    <span key={x.url} style={{ marginRight: 12 }}>
                      <a href={x.url} target="_blank" rel="noopener noreferrer">{x.label}</a>
                    </span>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 16, fontSize: 12, color: '#6b7280', lineHeight: 1.8 }}>
          特别说明：本站未接入中国 CDE 试验登记数据（反自动化限制），中国在研管线以 NMPA 与企业公告为准；
          历史数据尚未全量回填，当前以近几年关键试验与事件为主。数据口径截至 {DATA_AS_OF}。
        </p>
      </div>
    </div>
  );
}
