import { useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import OverviewPage from './components/OverviewPage';
import RadarPage from './components/RadarPage';
import TreatmentPage from './components/TreatmentPage';
import DrugLibrary from './components/DrugLibrary';
import TrialsPage from './components/TrialsPage';
import EvidencePage from './components/EvidencePage';
import ArticlesPage from './components/ArticlesPage';
import MeasureGuide from './components/MeasureGuide';
import { DATA_AS_OF, DRUGS, RADAR_EVENTS, TRIALS } from './data/frontier';

// 顶部导航 5 项；其余 3 页放页脚链接 + 页内入口，不丢任何一页。
const NAV_MAIN = [
  { key: 'home', label: '首页概览' },
  { key: 'radar', label: '雷达' },
  { key: 'drugs', label: '药物库' },
  { key: 'trials', label: '试验' },
  { key: 'articles', label: '解读' },
];
const NAV_MORE = [
  { key: 'treatment', label: '治疗方案' },
  { key: 'evidence', label: '医学证据分析' },
  { key: 'guide', label: '正确测压' },
];

const DISCLAIMER = '本站仅提供公开情报与科普展示，不构成诊疗建议，用药请遵医嘱。';
const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function dateline() {
  const d = new Date(`${DATA_AS_OF}T00:00:00`);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${WEEKDAYS[d.getDay()]} · 每天更新`;
}

export default function App() {
  const [page, setPage] = useState('home');

  const go = (key) => {
    setPage(key);
    window.scrollTo({ top: 0 });
  };

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#0f766e', borderRadius: 0, fontFamily: '-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif' } }}>
      <div className="site-layout">
        <header className="site-header">
          <div className="header-inner">
            <div>
              <a className="brand" onClick={() => go('home')}>双高<b>雷达</b></a>
              <div className="brand-sub">高血压 · 高血脂前沿技术与治疗方案情报</div>
            </div>
            <div className="dateline">{dateline()}</div>
          </div>
          <nav className="site-nav">
            {NAV_MAIN.map((n) => (
              <a key={n.key} className={page === n.key ? 'on' : ''} onClick={() => go(n.key)}>{n.label}</a>
            ))}
          </nav>
        </header>
        <main className="site-content">
          {page === 'home' && <OverviewPage onGo={go} />}
          {page === 'radar' && <RadarPage />}
          {page === 'treatment' && <TreatmentPage />}
          {page === 'drugs' && <DrugLibrary onGo={go} />}
          {page === 'trials' && <TrialsPage />}
          {page === 'evidence' && <EvidencePage />}
          {page === 'articles' && <ArticlesPage onGo={go} />}
          {page === 'guide' && (
            <div>
              <MeasureGuide />
              <div className="flat-note" style={{ marginTop: 24 }}>
                附录说明：正确测压指南为科普附录，帮助读者理解家庭血压与诊室血压的区别，不属于前沿技术内容。
              </div>
            </div>
          )}
        </main>
        <footer className="site-footer">
          <div className="wrap">
            <p className="stats">
              收录 <b>{DRUGS.length}</b> 个药物与技术 · <b>{TRIALS.length}</b> 项临床试验 · <b>{RADAR_EVENTS.length}</b> 条研发事件 · 数据口径截至 {DATA_AS_OF}
            </p>
            <p>{DISCLAIMER}</p>
            <p>
              更多栏目：
              {NAV_MORE.map((n, i) => (
                <span key={n.key}>
                  {i > 0 && ' · '}
                  <a onClick={() => go(n.key)}>{n.label}</a>
                </span>
              ))}
            </p>
            <p>
              数据来源：ClinicalTrials.gov、PubMed、FDA / EMA、NMPA、企业公告、AHA / ESC / ACC 会议、《中国高血压防治指南（2024 年修订版）》《中国血脂管理指南（2023 年）》
            </p>
          </div>
        </footer>
      </div>
    </ConfigProvider>
  );
}
