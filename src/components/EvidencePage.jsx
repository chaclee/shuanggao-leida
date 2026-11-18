import { useState } from 'react';
import { Alert, Card, Table, Tabs, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EVIDENCE_LDL, EVIDENCE_MACE, EVIDENCE_NOTE, EVIDENCE_SBP } from '../data/frontier';
import SourceLinks from './SourceLinks';

const { Title, Paragraph, Text } = Typography;

const SBP_CHART = [
  { name: 'Baxdrostat 2mg', value: 9.8 },
  { name: 'Zilebesiran 300mg', value: 16.7 },
  { name: 'Aprocitentan', value: 3.8 },
  { name: '肾去神经术', value: 7.5 },
  { name: '常规单药', value: 10 },
];

const LDL_CHART = [
  { name: '高强度他汀', value: 50 },
  { name: 'PCSK9单抗', value: 55 },
  { name: '英克司兰', value: 50 },
  { name: '依折麦布', value: 21 },
  { name: '贝派地酸', value: 21 },
  { name: '依维那库单抗', value: 49 },
];

export default function EvidencePage() {
  const [tab, setTab] = useState('sbp');
  return (
    <div>
      <Title level={3}>医学证据分析</Title>
      <Paragraph type="secondary">按终点查证据：收缩压降幅、LDL-C 降幅、MACE 风险比。每条证据都写明试验名与来源。</Paragraph>
      <Alert type="info" showIcon style={{ marginBottom: 16 }} message="先分清两类终点" description={EVIDENCE_NOTE} />
      <Tabs
        activeKey={tab}
        onChange={setTab}
        items={[
          { key: 'sbp', label: '收缩压降幅' },
          { key: 'ldl', label: 'LDL-C 降幅' },
          { key: 'mace', label: 'MACE 风险比' },
        ]}
      />
      {tab === 'sbp' && (
        <div>
          <Card title="收缩压降幅对比（安慰剂校正，mmHg；肾去神经术与常规单药为约数）" style={{ marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={SBP_CHART} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-18} textAnchor="end" height={64} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0f766e" name="安慰剂校正降幅（mmHg）" />
              </BarChart>
            </ResponsiveContainer>
            <Text type="secondary" style={{ fontSize: 12 }}>注意：不同试验的人群、基线血压与测量方式不同，降幅数字不能直接横向比较。</Text>
          </Card>
          <Table
            rowKey="drug" dataSource={EVIDENCE_SBP} pagination={false} scroll={{ x: 700 }}
            columns={[
              { title: '药物 / 试验', dataIndex: 'drug', key: 'drug' },
              { title: '人群', dataIndex: 'population', key: 'population' },
              { title: '结果', dataIndex: 'result', key: 'result' },
              { title: '终点类型', dataIndex: 'type', key: 'type' },
              { title: '来源', dataIndex: 'source', key: 'source', render: (v, r) => (<span><div>{v}</div><SourceLinks links={r.sourceLinks} prefix="链接" style={{ fontSize: 12 }} /></span>) },
            ]}
          />
        </div>
      )}
      {tab === 'ldl' && (
        <div>
          <Card title="LDL-C 降幅对比（%）" style={{ marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={LDL_CHART} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-18} textAnchor="end" height={64} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2f6fb2" name="LDL-C 降幅（%）" />
              </BarChart>
            </ResponsiveContainer>
            <Text type="secondary" style={{ fontSize: 12 }}>依折麦布、贝派地酸取区间中值绘图；依维那库单抗为 HoFH 人群数据，不可与普通人群直接比较。</Text>
          </Card>
          <Table
            rowKey="drug" dataSource={EVIDENCE_LDL} pagination={false} scroll={{ x: 700 }}
            columns={[
              { title: '药物', dataIndex: 'drug', key: 'drug' },
              { title: 'LDL-C 降幅', dataIndex: 'result', key: 'result', render: (v) => <Text strong>{v}</Text> },
              { title: '备注', dataIndex: 'note', key: 'note' },
              { title: '来源', dataIndex: 'source', key: 'source', render: (v, r) => (<span><div>{v}</div><SourceLinks links={r.sourceLinks} prefix="链接" style={{ fontSize: 12 }} /></span>) },
            ]}
          />
        </div>
      )}
      {tab === 'mace' && (
        <div>
          <Paragraph>
            MACE（主要心血管事件）风险比 HR 小于 1 表示事件风险下降，是硬终点证据。
            注意 pelacarsen 一行：Lp(a) 下降约 78%，但 HR 1.02，主要终点未达到——替代终点好不等于硬终点好。
          </Paragraph>
          <Table
            rowKey="drug" dataSource={EVIDENCE_MACE} pagination={false} scroll={{ x: 700 }}
            columns={[
              { title: '药物 / 试验', dataIndex: 'drug', key: 'drug' },
              { title: 'MACE 风险比', dataIndex: 'result', key: 'result', render: (v) => <Text strong>{v}</Text> },
              { title: '说明', dataIndex: 'note', key: 'note' },
              { title: '来源', dataIndex: 'source', key: 'source', render: (v, r) => (<span><div>{v}</div><SourceLinks links={r.sourceLinks} prefix="链接" style={{ fontSize: 12 }} /></span>) },
            ]}
          />
        </div>
      )}
    </div>
  );
}
