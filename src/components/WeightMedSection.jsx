import { Card, Typography } from 'antd';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import RecordSection from './RecordSection';

const { Title, Paragraph } = Typography;

const WEIGHT_FIELDS = [
  { key: 'date', label: '日期', type: 'date', required: true },
  { key: 'weight', label: '体重（kg）', type: 'number', min: 20, max: 300, required: true },
];
const WEIGHT_COLUMNS = [
  { title: '日期', dataIndex: 'date', key: 'date' },
  { title: '体重', dataIndex: 'weight', key: 'weight', render: (v) => `${v} kg` },
];
const WEIGHT_CSV = [
  { label: '日期', value: (r) => r.date },
  { label: '体重(kg)', value: (r) => r.weight },
];

const MED_FIELDS = [
  { key: 'name', label: '药名', type: 'text', required: true, placeholder: '例如：阿托伐他汀 / 英克司兰' },
  { key: 'dose', label: '剂量', type: 'text', required: true, placeholder: '例如：20mg / 284mg' },
  { key: 'freq', label: '频次', type: 'text', required: true, placeholder: '例如：每晚 1 次 / 半年 1 次' },
  { key: 'startDate', label: '开始日期', type: 'date', required: true },
  { key: 'note', label: '备注', type: 'text', placeholder: '例如：睡前服 / 皮下注射' },
];
const MED_COLUMNS = [
  { title: '药名', dataIndex: 'name', key: 'name' },
  { title: '剂量', dataIndex: 'dose', key: 'dose' },
  { title: '频次', dataIndex: 'freq', key: 'freq' },
  { title: '开始日期', dataIndex: 'startDate', key: 'startDate' },
  { title: '备注', dataIndex: 'note', key: 'note', ellipsis: true },
];
const MED_CSV = [
  { label: '药名', value: (r) => r.name },
  { label: '剂量', value: (r) => r.dose },
  { label: '频次', value: (r) => r.freq },
  { label: '开始日期', value: (r) => r.startDate },
  { label: '备注', value: (r) => r.note ?? '' },
];

export function WeightSection({ store }) {
  const { list } = store;
  const chartData = [...list]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => ({ name: r.date, 体重: r.weight }));
  return (
    <div>
      <Title level={3}>体重记录</Title>
      <Paragraph type="secondary">固定时间、固定条件称重（例如早上空腹、排便后），趋势才真实。体重只是记录，不做任何评价。</Paragraph>
      {chartData.length >= 2 && (
        <Card title="体重趋势" style={{ marginBottom: 16 }}>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip />
                <Line type="monotone" dataKey="体重" stroke="#1677ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
      <RecordSection title="体重记录" fields={WEIGHT_FIELDS} columns={WEIGHT_COLUMNS} csvColumns={WEIGHT_CSV} fileName="双高雷达-体重记录.csv" store={store} />
    </div>
  );
}

export function MedSection({ store }) {
  return (
    <div>
      <Title level={3}>用药记录</Title>
      <Paragraph type="secondary">
        只记录你正在吃的药（药名、剂量、频次、开始日期），方便复诊时出示。本站不做用药推荐、不判断该不该吃、
        不提示换药停药——用药调整请遵医嘱。
      </Paragraph>
      <RecordSection title="用药记录" fields={MED_FIELDS} columns={MED_COLUMNS} csvColumns={MED_CSV} fileName="双高雷达-用药记录.csv" store={store} />
    </div>
  );
}
