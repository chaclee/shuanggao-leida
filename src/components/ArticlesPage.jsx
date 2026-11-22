import { useState } from 'react';
import { Input } from 'antd';
import { ARTICLES } from '../data/articles';
import { SourceText } from './SourceLinks';

export default function ArticlesPage({ onGo }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('全部');
  const [openId, setOpenId] = useState(null);
  const cats = ['全部', ...new Set(ARTICLES.map((a) => a.category))];
  const filtered = ARTICLES.filter(
    (a) => (cat === '全部' || a.category === cat) && (a.title + a.body.join('')).includes(q.trim()),
  );
  const open = ARTICLES.find((a) => a.id === openId);

  return (
    <div>
      <h2 className="page-title">前沿解读</h2>
      <p className="page-intro">
        每篇解读都写明了依据来源与版本；涉及具体数值的，只写已发表试验或指南披露的数字，不写没有来源的数字。
        本站仅提供公开情报与科普展示，不构成诊疗建议，用药请遵医嘱。
        <br />
        <a onClick={() => onGo && onGo('evidence')} style={{ cursor: 'pointer' }}>想按终点查证据数字？去医学证据分析 →</a>
      </p>
      <div className="filters">
        <div className="grow">
          <Input.Search placeholder="搜解读，例如：Lp(a)、siRNA、醛固酮" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="cat-btns" style={{ marginBottom: 24 }}>
        {cats.map((c) => (
          <button key={c} type="button" className={cat === c ? 'cat-btn on' : 'cat-btn'} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      {open ? (
        <div>
          <a className="back-link" onClick={() => setOpenId(null)}>← 返回列表</a>
          <h2 className="page-title" style={{ marginTop: 16 }}>{open.title}</h2>
          <p className="news-meta"><span className="tag" style={{ marginLeft: 0 }}>{open.category}</span></p>
          {open.body.map((p, i) => <p key={i} style={{ fontSize: 15, lineHeight: 1.8 }}>{p}</p>)}
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: '24px 0 8px' }}>要点</h3>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 1.8 }}>
            {open.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 16 }}>
            依据来源：<SourceText text={open.source} links={open.sourceLinks} />
          </p>
        </div>
      ) : (
        <ul className="news-list">
          {filtered.map((a) => (
            <li key={a.id} onClick={() => setOpenId(a.id)} style={{ cursor: 'pointer' }}>
              <div className="news-meta"><span className="tag" style={{ marginLeft: 0 }}>{a.category}</span></div>
              <h3>{a.title}</h3>
              <p>{a.body[0]}</p>
              <p className="src">来源：<SourceText text={a.source} links={a.sourceLinks} /></p>
            </li>
          ))}
          {!filtered.length && <li style={{ cursor: 'default' }}><p>没有找到相关科普，换个关键词试试。</p></li>}
        </ul>
      )}
      <p style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>共 {ARTICLES.length} 篇解读，覆盖基础、用药、生活方式、误区、前沿解读五类。</p>
    </div>
  );
}
