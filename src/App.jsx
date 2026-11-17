import { useEffect, useState } from 'react';
import { Alert, Button, Card, ConfigProvider, Layout, Menu, Modal, Space, Typography, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import BpSection from './components/BpSection';
import LipidSection from './components/LipidSection';
import { MedSection, WeightSection } from './components/WeightMedSection';
import HomeOverview from './components/HomeOverview';
import ArticlesPage from './components/ArticlesPage';
import MeasureGuide from './components/MeasureGuide';
import TargetsPage from './components/TargetsPage';
import { clearAllSampleData, seedIfEmpty, useRecords } from './lib/store';
import { SAMPLE_BP, SAMPLE_LIPID, SAMPLE_MED, SAMPLE_WEIGHT } from './data/sampleData';
import { downloadCSV, toCSV } from './lib/stats';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const NAV = [
  { key: 'home', label: '我的概览' },
  { key: 'bp', label: '血压记录' },
  { key: 'lipid', label: '血脂化验' },
  { key: 'weight', label: '体重记录' },
  { key: 'med', label: '用药记录' },
  { key: 'articles', label: '科普库' },
  { key: 'guide', label: '正确测压' },
  { key: 'targets', label: '指南目标' },
  { key: 'data', label: '我的数据' },
];

const DISCLAIMER = '本站仅提供科普与记录工具，不构成诊疗建议，用药请遵医嘱。';

function DataPage({ stores }) {
  const [bp, lipid, weight, med] = stores;
  const total = bp.list.length + lipid.list.length + weight.list.length + med.list.length;
  const exportAll = () => {
    const jobs = [
      ['双高雷达-血压记录.csv', bp.list, [
        { label: '日期时间', value: (r) => r.datetime },
        { label: '收缩压(mmHg)', value: (r) => r.sys },
        { label: '舒张压(mmHg)', value: (r) => r.dia },
        { label: '心率(次/分)', value: (r) => r.hr ?? '' },
        { label: '手臂', value: (r) => r.arm },
        { label: '姿势', value: (r) => r.posture },
        { label: '备注', value: (r) => r.note ?? '' },
      ]],
      ['双高雷达-血脂化验.csv', lipid.list, [
        { label: '日期', value: (r) => r.date },
        { label: 'TC(mmol/L)', value: (r) => r.tc },
        { label: 'LDL-C(mmol/L)', value: (r) => r.ldl },
        { label: 'HDL-C(mmol/L)', value: (r) => r.hdl ?? '' },
        { label: 'TG(mmol/L)', value: (r) => r.tg ?? '' },
        { label: 'ApoB(g/L)', value: (r) => r.apob ?? '' },
        { label: 'Lp(a)(mg/L)', value: (r) => r.lpa ?? '' },
        { label: '体重(kg)', value: (r) => r.weight ?? '' },
        { label: '风险分层', value: (r) => r.risk },
        { label: '备注', value: (r) => r.note ?? '' },
      ]],
      ['双高雷达-体重记录.csv', weight.list, [
        { label: '日期', value: (r) => r.date },
        { label: '体重(kg)', value: (r) => r.weight },
      ]],
      ['双高雷达-用药记录.csv', med.list, [
        { label: '药名', value: (r) => r.name },
        { label: '剂量', value: (r) => r.dose },
        { label: '频次', value: (r) => r.freq },
        { label: '开始日期', value: (r) => r.startDate },
        { label: '备注', value: (r) => r.note ?? '' },
      ]],
    ];
    jobs.forEach(([name, list, cols]) => {
      if (list.length) downloadCSV(name, toCSV(list, cols));
    });
    message.success('已导出全部非空记录（每个类别一个 CSV 文件）');
  };

  return (
    <div>
      <Title level={3}>我的数据</Title>
      <Paragraph type="secondary">
        第一期数据只保存在本机浏览器 localStorage，不上传服务器、不注册账号、不登录。
        换设备、换浏览器、清除浏览器数据后，记录不会同步过来——这一点请知悉。
        本页可导出全部记录为 CSV，复诊时可直接带给医生看。
      </Paragraph>
      <Card title="当前数据" style={{ marginBottom: 16 }}>
        <Paragraph>血压记录：{bp.list.length} 条；血脂化验：{lipid.list.length} 条；体重记录：{weight.list.length} 条；用药记录：{med.list.length} 条。共 {total} 条。</Paragraph>
        <Space wrap>
          <Button type="primary" onClick={exportAll} disabled={!total}>导出全部为 CSV</Button>
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: '清空示例数据',
                content: '将删除本机浏览器里全部示例数据与已录入的记录（四类），清空后页面会重新加载，从空白开始。确定吗？',
                okText: '确定清空',
                cancelText: '取消',
                onOk: () => {
                  clearAllSampleData();
                  window.location.reload();
                },
              });
            }}
          >
            一键清空示例数据
          </Button>
          <Button
            onClick={() => {
              bp.restoreSample(); lipid.restoreSample(); weight.restoreSample(); med.restoreSample();
              message.success('已恢复示例数据');
            }}
          >
            恢复示例数据
          </Button>
        </Space>
      </Card>
      <Card title="关于隐私">
        <Paragraph>本站第一期没有账号系统、不收集个人信息、不上传任何记录。所有数据只存在你自己的浏览器里；想彻底删除，点“一键清空示例数据”或在浏览器设置里清除本站数据即可。</Paragraph>
        <Paragraph>第二期若接入 Cloudflare D1 云端存储，会在上线前单独说明并由你确认。</Paragraph>
      </Card>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [sampleOn, setSampleOn] = useState(false);

  // 首次打开且本地无任何记录时，写入虚构示例数据并打上“示例”标记。
  useEffect(() => {
    const seeded = seedIfEmpty({ bp: SAMPLE_BP, lipid: SAMPLE_LIPID, weight: SAMPLE_WEIGHT, med: SAMPLE_MED });
    setSampleOn(seeded || (() => { try { return localStorage.getItem('sgld_sample_seeded') === '1'; } catch { return false; } })());
  }, []);

  const bp = useRecords('bp', SAMPLE_BP);
  const lipid = useRecords('lipid', SAMPLE_LIPID);
  const weight = useRecords('weight', SAMPLE_WEIGHT);
  const med = useRecords('med', SAMPLE_MED);

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
            <span className="brand-sub">高血压 · 高血脂科普与记录</span>
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
          {sampleOn && (
            <Alert
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
              message="当前显示的是示例数据"
              description="站内预置的血压、血脂、体重、用药记录全部是虚构的演示数据，与任何真实个人无关。开始正式使用前，请到“我的数据”页一键清空示例数据。"
              action={<Button size="small" onClick={() => go('data')}>去清空</Button>}
            />
          )}
          {page === 'home' && <HomeOverview bp={bp} lipid={lipid} weight={weight} med={med} onGo={go} />}
          {page === 'bp' && <BpSection store={bp} />}
          {page === 'lipid' && <LipidSection store={lipid} />}
          {page === 'weight' && <WeightSection store={weight} />}
          {page === 'med' && <MedSection store={med} />}
          {page === 'articles' && <ArticlesPage />}
          {page === 'guide' && <MeasureGuide />}
          {page === 'targets' && <TargetsPage />}
          {page === 'data' && <DataPage stores={[bp, lipid, weight, med]} />}
        </Content>
        <Footer className="site-footer">
          <Text type="secondary">{DISCLAIMER}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            双高雷达 · 第一期（数据收集 + 信息展示） · 数据保存在本机浏览器，不上传服务器 ·
            科普依据：《中国高血压防治指南（2024 年修订版）》《中国血脂管理指南（2023 年）》及相关药品说明书
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
