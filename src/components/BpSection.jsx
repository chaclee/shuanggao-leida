import { Alert, Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import RecordSection from './RecordSection';
import { sevenDaySummary } from '../lib/stats';

const { Title, Paragraph, Text } = Typography;

const BP_FIELDS = [
  { key: 'datetime', label: '日期时间', type: 'datetime', required: true },
  { key: 'sys', label: '收缩压（mmHg）', type: 'number', min: 70, max: 250, step: 1, required: true },
  { key: 'dia', label: '舒张压（mmHg）', type: 'number', min: 40, max: 160, step: 1, required: true },
  { key: 'hr', label: '心率（次/分）', type: 'number', min: 30, max: 220, step: 1 },
  { key: 'arm', label: '手臂', type: 'select', options: ['左臂', '右臂'], required: true },
  { key: 'posture', label: '姿势', type: 'select', options: ['坐姿', '平躺', '站立'], required: true },
  { key: 'note', label: '备注', type: 'text', placeholder: '例如：起床后静坐 5 分钟测' },
];

const BP_COLUMNS = [
  { title: '日期时间', dataIndex: 'datetime', key: 'datetime', render: (v) => String(v).replace('T', ' ') },
  { title: '收缩压', dataIndex: 'sys', key: 'sys', render: (v, r) => <Text strong={v >= 135}>{v} <Text type="secondary">mmHg</Text></Text> },
  { title: '舒张压', dataIndex: 'dia', key: 'dia', render: (v) => <>{v} <Text type="secondary">mmHg</Text></> },
  { title: '心率', dataIndex: 'hr', key: 'hr', render: (v) => (v ? `${v} 次/分` : '—') },
  { title: '手臂', dataIndex: 'arm', key: 'arm' },
  { title: '姿势', dataIndex: 'posture', key: 'posture' },
  { title: '备注', dataIndex: 'note', key: 'note', ellipsis: true },
];

const BP_CSV = [
  { label: '日期时间', value: (r) => r.datetime },
  { label: '收缩压(mmHg)', value: (r) => r.sys },
  { label: '舒张压(mmHg)', value: (r) => r.dia },
  { label: '心率(次/分)', value: (r) => r.hr ?? '' },
  { label: '手臂', value: (r) => r.arm },
  { label: '姿势', value: (r) => r.posture },
  { label: '备注', value: (r) => r.note ?? '' },
];

export default function BpSection({ store }) {
  const { list } = store;
  const summary = sevenDaySummary(list);
  const chartData = [...list]
    .sort((a, b) => a.datetime.localeCompare(b.datetime))
    .slice(-30)
    .map((r) => ({ name: String(r.datetime).slice(5, 16).replace('T', ' '), 收缩压: r.sys, 舒张压: r.dia }));

  const dayColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '早上平均', key: 'm', render: (_, d) => (d.morningSys ? `${d.morningSys}/${d.morningDia}` : '—') },
    { title: '晚上平均', key: 'e', render: (_, d) => (d.eveningSys ? `${d.eveningSys}/${d.eveningDia}` : '—') },
    {
      title: '是否 ≥ 135/85',
      key: 'flag',
      render: (_, d) => {
        const high = (d.morningSys && d.morningSys >= 135) || (d.eveningSys && d.eveningSys >= 135)
          || (d.morningDia && d.morningDia >= 85) || (d.eveningDia && d.eveningDia >= 85);
        return high ? <Tag color="red">偏高</Tag> : <Tag color="green">在 135/85 以内</Tag>;
      },
    },
    { title: '条数', dataIndex: 'count', key: 'count' },
  ];

  return (
    <div>
      <Title level={3}>血压记录</Title>
      <Paragraph type="secondary">
        家庭血压目标线是 <Text strong>135/85 mmHg</Text>（相当于诊室 140/90）。早上 06:00–11:59 的记录计为“早上”，其余计为“晚上”。
        收缩压超过 250 或低于 70、舒张压高于收缩压时，表单会提示你检查后再保存。
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card><Statistic title="7 天平均（去掉第 1 天）" value={summary.avgSys && summary.avgDia ? `${summary.avgSys}/${summary.avgDia}` : '—'} suffix="mmHg" /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card><Statistic title="最近一次" value={list.length ? `${[...list].sort((a, b) => b.datetime.localeCompare(a.datetime))[0].sys}/${[...list].sort((a, b) => b.datetime.localeCompare(a.datetime))[0].dia}` : '—'} suffix="mmHg" /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card><Statistic title="记录条数" value={list.length} suffix="条" /></Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card><Statistic title="7 天表天数" value={summary.days.length} suffix="天" /></Card>
        </Col>
      </Row>
      <Alert type="info" showIcon message={summary.note} style={{ marginBottom: 16 }} />

      {chartData.length >= 2 && (
        <Card title="血压趋势（最近 30 条）" style={{ marginBottom: 16 }}>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 180]} />
                <Tooltip />
                <ReferenceLine y={135} stroke="#f5222d" strokeDasharray="4 4" label="收缩压 135" />
                <ReferenceLine y={85} stroke="#fa8c16" strokeDasharray="4 4" label="舒张压 85" />
                <Line type="monotone" dataKey="收缩压" stroke="#1677ff" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="舒张压" stroke="#52c41a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Paragraph type="secondary" style={{ marginTop: 8 }}>红色虚线是家庭血压收缩压 135 的目标线，橙色虚线是舒张压 85 的目标线。</Paragraph>
        </Card>
      )}

      <Card title="7 天表视图" style={{ marginBottom: 16 }}>
        <Table rowKey="date" dataSource={summary.days} columns={dayColumns} pagination={false} size="small" locale={{ emptyText: '暂无数据，新增记录后这里会按日期汇总' }} />
      </Card>

      <RecordSection
        title="血压记录"
        fields={BP_FIELDS}
        columns={BP_COLUMNS}
        csvColumns={BP_CSV}
        fileName="双高雷达-血压记录.csv"
        store={store}
      />
    </div>
  );
}
