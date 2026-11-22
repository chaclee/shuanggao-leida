import { useState } from 'react';
import { Input, Select } from 'antd';
import { RADAR_EVENTS } from '../data/frontier';
import { SourceText } from './SourceLinks';

export default function RadarPage() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('全部');
  const [tech, setTech] = useState('全部');
  const types = ['全部', ...new Set(RADAR_EVENTS.map((e) => e.type))];
  const techs = ['全部', ...new Set(RADAR_EVENTS.map((e) => e.tech).filter((t) => t && t !== '—'))];
  const filtered = RADAR_EVENTS.filter(
    (e) =>
      (type === '全部' || e.type === type) &&
      (tech === '全部' || e.tech === tech) &&
      (e.title + e.summary + e.drug).includes(q.trim()),
  );

  return (
    <div>
      <h2 className="page-title">前沿技术雷达</h2>
      <p className="page-intro">
        双高领域的重大突破与研发事件，按时间倒序。事件等级：重大指改变治疗格局或管线走向的事件；重要指关键试验结果或获批进展。
        本站仅提供公开情报展示，不构成诊疗建议。
      </p>
      <div className="filters">
        <div className="grow">
          <Input.Search placeholder="搜事件、药物，例如：baxdrostat、Lp(a)" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={type} onChange={setType} options={types.map((t) => ({ value: t, label: t === '全部' ? '事件类型：全部' : t }))} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={tech} onChange={setTech} options={techs.map((t) => ({ value: t, label: t === '全部' ? '技术类型：全部' : t }))} />
        </div>
      </div>
      <ul className="news-list">
        {filtered.map((e) => (
          <li key={e.id}>
            <div className="news-meta">
              {e.date}
              <span className={e.type === '失败/未达终点' ? 'tag fail' : 'tag'}>{e.type}</span>
              {e.level === '重大' && <span className="tag major">重大</span>}
              {e.drug !== '—' && <span style={{ marginLeft: 8 }}>{e.drug}</span>}
              {e.target !== '—' && <span style={{ marginLeft: 8 }}>靶点：{e.target}</span>}
              {e.tech !== '—' && <span style={{ marginLeft: 8 }}>技术：{e.tech}</span>}
            </div>
            <h3>{e.title}</h3>
            <p>{e.summary}</p>
            <p className="src">原始出处：<SourceText text={e.source} links={e.sourceLinks} /></p>
          </li>
        ))}
      </ul>
      {!filtered.length && <p className="page-intro">没有找到相关事件，换个关键词或筛选条件试试。</p>}
      <p style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>共 {RADAR_EVENTS.length} 条事件，截至 2026-11。</p>
    </div>
  );
}
