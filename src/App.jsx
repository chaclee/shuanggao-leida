import { useState } from 'react';
import { Card, ConfigProvider, Layout, Menu, Typography } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import OverviewPage from './components/OverviewPage';
import RadarPage from './components/RadarPage';
import TreatmentPage from './components/TreatmentPage';
import DrugLibrary from './components/DrugLibrary';
import TrialsPage from './components/TrialsPage';
import EvidencePage from './components/EvidencePage';
import ArticlesPage from './components/ArticlesPage';
import MeasureGuide from './components/MeasureGuide';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const NAV = [
  { key: 'home', label: '首页概览' },
  { key: 'radar', label: '前沿技术雷达' },
  { key: 'treatment', label: '治疗方案' },
  { key: 'drugs', label: '药物资料库' },
  { key: 'trials', label: '试验追踪' },
  { key: 'evidence', label: '医学证据分析' },
  { key: 'articles', label: '前沿解读' },
  { key: 'guide', label: '正确测压' },
];

const DISCLAIMER = '本站仅提供公开情报与科普展示，不构成诊疗建议，用药请遵医嘱。';

export default function App() {
  const [page, setPage] = useState('home');

  const go = (key) => {
    setPage(key);
    window.scrollTo({ top: 0 });
  };

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#0f766e', borderRadius: 10, fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif' } }}>
      <Layout className="site-layout">
        <Header className="site-header">
          <div className="header-inner">
            <a className="brand" onClick={() => go('home')}>📡 双高雷达</a>
            <span className="brand-sub">高血压 · 高血脂前沿技术与治疗方案</span>
          </div>
          <Menu
            mode="horizontal"
            selectedKeys={[page]}
            onClick={(e) => go(e.key)}
            items={NAV}
            className="site-menu"
          />
        </Header>
        <Content className="site-content">
          {page === 'home' && <OverviewPage onGo={go} />}
          {page === 'radar' && <RadarPage />}
          {page === 'treatment' && <TreatmentPage />}
          {page === 'drugs' && <DrugLibrary />}
          {page === 'trials' && <TrialsPage />}
          {page === 'evidence' && <EvidencePage />}
          {page === 'articles' && <ArticlesPage />}
          {page === 'guide' && (
            <div>
              <MeasureGuide />
              <Card style={{ marginTop: 16 }}>
                <Text type="secondary">附录说明：正确测压指南为科普附录，帮助读者理解家庭血压与诊室血压的区别，不属于前沿技术内容。</Text>
              </Card>
            </div>
          )}
        </Content>
        <Footer className="site-footer">
          <Text type="secondary">{DISCLAIMER}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            双高雷达 · 前沿技术展示版 · 数据口径截至 2026-11 · 数据来源：ClinicalTrials.gov、PubMed、FDA / EMA、NMPA、企业公告、AHA / ESC / ACC 会议、《中国高血压防治指南（2024 年修订版）》《中国血脂管理指南（2023 年）》
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
