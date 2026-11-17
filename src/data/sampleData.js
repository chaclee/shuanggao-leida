// 内置示例数据：全部是虚构的演示数据，与任何真实个人无关。
// 页面上会明确标为“示例”，并可一键清空。不要在这里放用户的真实健康数据。

export const SAMPLE_BP = [
  { id: 'sample-bp-1', datetime: '2026-11-11T07:30', sys: 138, dia: 86, hr: 78, arm: '左臂', posture: '坐姿', note: '起床后静坐 5 分钟测' },
  { id: 'sample-bp-2', datetime: '2026-11-11T20:30', sys: 132, dia: 84, hr: 74, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-3', datetime: '2026-11-12T07:35', sys: 136, dia: 85, hr: 76, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-4', datetime: '2026-11-12T20:25', sys: 130, dia: 82, hr: 72, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-5', datetime: '2026-11-13T07:30', sys: 141, dia: 88, hr: 80, arm: '左臂', posture: '坐姿', note: '前一晚睡得晚' },
  { id: 'sample-bp-6', datetime: '2026-11-13T20:40', sys: 133, dia: 83, hr: 75, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-7', datetime: '2026-11-14T07:32', sys: 135, dia: 84, hr: 77, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-8', datetime: '2026-11-14T20:30', sys: 129, dia: 81, hr: 73, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-9', datetime: '2026-11-15T07:28', sys: 134, dia: 85, hr: 76, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-10', datetime: '2026-11-15T20:35', sys: 131, dia: 82, hr: 74, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-11', datetime: '2026-11-16T07:30', sys: 137, dia: 86, hr: 78, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-12', datetime: '2026-11-16T20:30', sys: 132, dia: 83, hr: 75, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-13', datetime: '2026-11-17T07:30', sys: 136, dia: 85, hr: 77, arm: '左臂', posture: '坐姿', note: '' },
  { id: 'sample-bp-14', datetime: '2026-11-17T20:30', sys: 130, dia: 82, hr: 73, arm: '左臂', posture: '坐姿', note: '' },
];

export const SAMPLE_LIPID = [
  {
    id: 'sample-lipid-1', date: '2026-05-17', tc: 5.4, ldl: 3.7, hdl: 1.2, tg: 1.1,
    apob: 1.05, lpa: 28, weight: 63.2, risk: '中高危', baselineLdl: 4.8, note: '示例：上半年化验',
  },
  {
    id: 'sample-lipid-2', date: '2026-08-08', tc: 6.2, ldl: 4.0, hdl: 1.3, tg: 0.9,
    apob: 1.1, lpa: 30, weight: 62.8, risk: '中高危', baselineLdl: 4.8, note: '示例：夏季复查',
  },
  {
    id: 'sample-lipid-3', date: '2026-10-20', tc: 5.9, ldl: 3.8, hdl: 1.25, tg: 1.3,
    apob: 1.0, lpa: 45, weight: 62.0, risk: '中高危', baselineLdl: 4.6, note: '示例：秋季体检',
  },
];

export const SAMPLE_WEIGHT = [
  { id: 'sample-w-1', date: '2026-09-07', weight: 63.2 },
  { id: 'sample-w-2', date: '2026-09-21', weight: 62.8 },
  { id: 'sample-w-3', date: '2026-10-06', weight: 62.3 },
  { id: 'sample-w-4', date: '2026-10-20', weight: 62.0 },
];

export const SAMPLE_MED = [
  { id: 'sample-med-1', name: '阿托伐他汀', dose: '20mg', freq: '每晚 1 次', startDate: '2026-01-10', note: '示例：他汀类，睡前服' },
  { id: 'sample-med-2', name: '英克司兰', dose: '284mg', freq: '皮下注射，半年 1 次', startDate: '2026-01-04', note: '示例：siRNA，长效降脂针' },
  { id: 'sample-med-3', name: '缬沙坦', dose: '80mg', freq: '每天 1 次', startDate: '2026-03-02', note: '示例：ARB 类降压药' },
];
