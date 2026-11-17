import { Card, Table, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const BP_ROWS = [
  { key: '1', item: '诊室血压', target: '< 140/90 mmHg', note: '多次规范测量后由医生判断' },
  { key: '2', item: '家庭血压', target: '< 135/85 mmHg', note: '相当于诊室 140/90 的水平' },
];

const LIPID_ROWS = [
  { key: '1', level: '低危', target: 'LDL-C < 3.4 mmol/L', reduction: '—' },
  { key: '2', level: '中高危', target: 'LDL-C < 2.6 mmol/L', reduction: '—' },
  { key: '3', level: '极高危', target: 'LDL-C < 1.8 mmol/L', reduction: '降幅 > 50%' },
  { key: '4', level: '超高危', target: 'LDL-C < 1.4 mmol/L', reduction: '降幅 > 50%' },
];

export default function TargetsPage() {
  return (
    <div>
      <Title level={3}>指南目标</Title>
      <Paragraph type="secondary">以下目标值来自指南原文，风险分层请以医生评估为准，本页只做对照展示，不做分层判断。</Paragraph>

      <Card title="血压目标" style={{ marginBottom: 16 }}>
        <Table
          rowKey="key"
          dataSource={BP_ROWS}
          pagination={false}
          columns={[
            { title: '场景', dataIndex: 'item', key: 'item' },
            { title: '目标', dataIndex: 'target', key: 'target', render: (v) => <Text strong>{v}</Text> },
            { title: '说明', dataIndex: 'note', key: 'note' },
          ]}
        />
        <Paragraph type="secondary" style={{ marginTop: 12 }}>依据来源：《中国高血压防治指南（2024 年修订版）》。</Paragraph>
      </Card>

      <Card title="血脂目标（按风险分层）">
        <Table
          rowKey="key"
          dataSource={LIPID_ROWS}
          pagination={false}
          columns={[
            { title: '风险分层', dataIndex: 'level', key: 'level' },
            { title: 'LDL-C 目标', dataIndex: 'target', key: 'target', render: (v) => <Text strong>{v}</Text> },
            { title: '降幅要求', dataIndex: 'reduction', key: 'reduction' },
          ]}
        />
        <Paragraph type="secondary" style={{ marginTop: 12 }}>
          依据来源：《中国血脂管理指南（2023 年）》。血脂化验页填了风险分层与基线 LDL-C 后，会自动按这张表对照是否达标。
        </Paragraph>
      </Card>
    </div>
  );
}
