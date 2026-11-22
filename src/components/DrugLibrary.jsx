import { useState } from 'react';
import { Input, Select } from 'antd';
import { DRUGS } from '../data/frontier';
import { SourceText } from './SourceLinks';

// 药品图片：结构图用 contain 展示（避免裁剪化学结构），实拍/示意图同样处理。
function DrugImage({ drug, height, failed, onFail, className }) {
  if (!drug.image || failed.has(drug.id)) {
    return (
      <div className={className || 'drug-thumb'} style={height ? { height } : undefined}>
        <span className="noimg">{drug.imageCaption || '暂无实物图'}</span>
      </div>
    );
  }
  return (
    <div className={className || 'drug-thumb'} style={height ? { height } : undefined}>
      <img
        src={drug.image}
        alt={`${drug.name}（${drug.nameEn}）`}
        loading="lazy"
        onError={() => onFail(drug.id)}
      />
    </div>
  );
}

export default function DrugLibrary({ onGo }) {
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('全部');
  const [tech, setTech] = useState('全部');
  const [cat, setCat] = useState('全部');
  const [openId, setOpenId] = useState(null);
  const [failed, setFailed] = useState(new Set());
  const markFailed = (id) => setFailed((prev) => new Set(prev).add(id));
  const stages = ['全部', ...new Set(DRUGS.map((d) => d.stage))];
  const techs = ['全部', ...new Set(DRUGS.map((d) => d.tech))];
  const cats = ['全部', ...new Set(DRUGS.map((d) => d.category))];
  const filtered = DRUGS.filter(
    (d) =>
      (stage === '全部' || d.stage === stage) &&
      (tech === '全部' || d.tech === tech) &&
      (cat === '全部' || d.category === cat) &&
      (d.name + d.nameEn + d.target).includes(q.trim()),
  );
  const open = DRUGS.find((d) => d.id === openId);

  return (
    <div>
      <h2 className="page-title">药物资料库</h2>
      <p className="page-intro">
        按药名、靶点、技术类型检索的药物与技术档案，共 {DRUGS.length} 条，覆盖经典治疗与在研前沿。
        每个档案写机制、靶点、技术类型、研发/上市阶段、适应症与关键终点，不写个人用药建议。
        图片为公开资料图：化学结构式来自 Wikimedia Commons，示意图已在图注中注明“非本产品实物”。
        <br />
        <a onClick={() => onGo && onGo('treatment')} style={{ cursor: 'pointer' }}>先看目前的治疗方案总览 →</a>
      </p>
      <div className="filters">
        <div className="grow">
          <Input.Search placeholder="搜药名或靶点，例如：英克司兰、PCSK9、Lp(a)" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={stage} onChange={setStage} options={stages.map((s) => ({ value: s, label: s === '全部' ? '阶段：全部' : s }))} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={tech} onChange={setTech} options={techs.map((s) => ({ value: s, label: s === '全部' ? '技术：全部' : s }))} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={cat} onChange={setCat} options={cats.map((s) => ({ value: s, label: s === '全部' ? '适应症：全部' : s }))} />
        </div>
      </div>

      {open ? (
        <div>
          <a className="back-link" onClick={() => setOpenId(null)}>← 返回列表</a>
          <h2 className="page-title" style={{ marginTop: 16 }}>{open.name} · {open.nameEn}</h2>
          <DrugImage drug={open} className="detail-img" failed={failed} onFail={markFailed} />
          <p className="img-caption">
            {open.imageCaption}
            {open.imageCredit ? ` · 图片来源：${open.imageCredit}` : ''}
          </p>
          <p className="field">
            <span className="dot" />{open.stage} · {open.tech} · {open.category}
          </p>
          <p className="field"><strong>靶点：</strong>{open.target}</p>
          <p className="field"><strong>机制：</strong>{open.mechanism}</p>
          <p className="field"><strong>适应症：</strong>{open.indication}</p>
          <p className="field"><strong>关键终点：</strong>{open.endpoint}</p>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 16 }}>
            依据来源：<SourceText text={open.source} links={open.sourceLinks} />
          </p>
        </div>
      ) : (
        <ul className="drug-list">
          {filtered.map((d) => (
            <li key={d.id} onClick={() => setOpenId(d.id)}>
              <DrugImage drug={d} failed={failed} onFail={markFailed} />
              <div style={{ minWidth: 0 }}>
                <h3>{d.name} · {d.nameEn}</h3>
                <div className="drug-meta">
                  <span className="stage">{d.stage}</span> · 靶点：{d.target} · 技术：{d.tech} · {d.category}
                </div>
                <p className="clamp2">{d.mechanism}</p>
              </div>
            </li>
          ))}
          {!filtered.length && <li style={{ cursor: 'default' }}><p>没有找到相关药物，换个关键词或筛选条件试试。</p></li>}
        </ul>
      )}
      <p style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>共 {DRUGS.length} 个药物 / 技术条目，截至 2026-11。</p>
    </div>
  );
}
