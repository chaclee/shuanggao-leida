import { Card, Tag, Typography } from 'antd';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import RecordSection from './RecordSection';
import { LDL_TARGETS, ldlStatus } from '../lib/stats';

const { Title, Paragraph, Text } = Typography;

const LIPID_FIELDS = [
  { key: 'date', label: '化验日期', type: 'date', required: true },
  { key: 'tc', label: '总胆固醇 TC（mmol/L）', type: 'number', min: 1, max: 15, required: true },
  { key: 'ldl', label: '低密度脂蛋白 LDL-C（mmol/L）', type: 'number', min: 0.1, max: 12, required: true },
  { key: 'hdl', label: '高密度脂蛋白 HDL-C（mmol/L）', type: 'number', min: 0.1, max: 5 },
  { key: 'tg', label: '甘油三酯 TG（mmol/L）', type: 'number', min: 0.1, max: 20 },
  { key: 'apob', label: '载脂蛋白 B ApoB（g/L）', type: 'number', min: 0.1, max: 5 },
  { key: 'lpa', label: '脂蛋白(a) Lp(a)（mg/L）', type: 'number', min: 0, max: 2000, step: 1 },
  { key: 'weight', label: '体重（kg）', type: 'number', min: 20, max: 300 },
  { key: 'risk', label: '风险分层', type: 'select', options: ['低危', '中高危', '极高危', '超高危'], required: true },
  { key: 'baselineLdl', label: '基线 LDL-C（mmol/L，用于算降幅，可不填）', type: 'number', min: 0.1, max: 12 },
  { key: 'note', label: '备注', type: 'text', placeholder: '例如：体检、复查' },
];

const LIPID_COLUMNS = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: 'TC', dataIndex: 'tc', key: 'tc' },
  { title: 'LDL-C', dataIndex: 'ldl', key: 'ldl', render: (v) => <Text strong>{v}</Text> },
  { title: 'HDL-C', dataIndex: 'hdl', key: 'hdl', render: (v) => (v ?? '—') },
  { title: 'TG', dataIndex: 'tg', key: 'tg', render: (v) => (v ?? '—') },
  { title: 'ApoB', dataIndex: 'apob', key: 'apob', render: (v) => (v ?? '—') },
  { title: 'Lp(a)', dataIndex: 'lpa', key: 'lpa', render: (v) => (v ?? '—') },
  { title: '体重', dataIndex: 'weight', key: 'weight', render: (v) => (v ? `${v} kg` : '—') },
  { title: '风险分层', dataIndex: 'risk', key: 'risk' },
  {
    title: '对照目标',
    key: 'status',
    render: (_, r) => {
      const s = ldlStatus(r.ldl, r.risk, r.baselineLdl);
      return (
        <span>
          {s.ok === null ? '—' : s.ok ? <Tag color="green">达标</Tag> : <Tag color="red">未达标</Tag>}
          <div style={{ fontSize: 12, color: '#666' }}>
            目标 {s.targetText || LDL_TARGETS[r.risk]?.text}
            {s.reduction !== null && s.reduction !== undefined ? ` · 降幅 ${s.reduction}%` : ''}
          </div>
        </span>
      );
    },
  },
  { title: '备注', dataIndex: 'note', key: 'note', ellipsis: true },
];

const LIPID_CSV = [
  { label: '日期', value: (r) => r.date },
  { label: 'TC(mmol/L)', value: (r) => r.tc },
  { label: 'LDL-C(mmol/L)', value: (r) => r.ldl },
  { label: 'HDL-C(mmol/L)', value: (r) => r.hdl ?? '' },
  { label: 'TG(mmol/L)', value: (r) => r.tg ?? '' },
  { label: 'ApoB(g/L)', value: (r) => r.apob ?? '' },
  { label: 'Lp(a)(mg/L)', value: (r) => r.lpa ?? '' },
  { label: '体重(kg)', value: (r) => r.weight ?? '' },
  { label: '风险分层', value: (r) => r.risk },
  { label: '基线LDL-C(mmol/L)', value: (r) => r.baselineLdl ?? '' },
  { label: '备注', value: (r) => r.note ?? '' },
];

export default function LipidSection({ store }) {
  const { list } = store;
  const chartData = [...list]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => ({ name: r.date, 'LDL-C': r.ldl, '总胆固醇': r.tc }));

  return (
    <div>
      <Title level={3}>血脂化验</Title>
      <Paragraph type="secondary">
        按《中国血脂管理指南（2023 年）》分层对照 LDL-C 目标：低危 &lt; 3.4、中高危 &lt; 2.6、
        极高危 &lt; 1.8 且降幅 &gt; 50%、超高危 &lt; 1.4 且降幅 &gt; 50%。风险分层请以医生评估为准，
        本页只做对照展示，不做分层判断。填了“基线 LDL-C”后会自动算降幅。
      </Paragraph>

      {chartData.length >= 2 && (
        <Card title="LDL-C 与总胆固醇趋势" style={{ marginBottom: 16 }}>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <ReferenceLine y={2.6} stroke="#fa8c16" strokeDasharray="4 4" label="中高危目标 2.6" />
                <ReferenceLine y={1.8} stroke="#f5222d" strokeDasharray="4 4" label="极高危目标 1.8" />
                <Line type="monotone" dataKey="LDL-C" stroke="#1677ff" strokeWidth={2} />
                <Line type="monotone" dataKey="总胆固醇" stroke="#52c41a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <RecordSection
        title="血脂化验"
        fields={LIPID_FIELDS}
        columns={LIPID_COLUMNS}
        csvColumns={LIPID_CSV}
        fileName="双高雷达-血脂化验.csv"
        store={store}
      />
    </div>
  );
}
