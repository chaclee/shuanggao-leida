import { useState } from 'react';
import { Card, Col, Input, Row, Select, Table, Tag, Typography } from 'antd';
import { TRIALS } from '../data/frontier';

const { Title, Paragraph, Text } = Typography;

export default function TrialsPage() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('全部');
  const [phase, setPhase] = useState('全部');
  const statuses = ['全部', ...new Set(TRIALS.map((t) => t.status))];
  const phases = ['全部', ...new Set(TRIALS.map((t) => t.phase))];
  const filtered = TRIALS.filter(
    (t) =>
      (status === '全部' || t.status === status) &&
      (phase === '全部' || t.phase === phase) &&
      (t.trial + t.drug + t.indication).includes(q.trim()),
  );

  return (
    <div>
      <Title level={3}>试验追踪</Title>
      <Paragraph type="secondary">
        双高领域关键临床试验列表。状态变更留痕见每条的“变更记录”。
        临床试验编号只写了已核实的三项（BaxHTN、CLEAR Outcomes、Lp(a)HORIZON），其余只写试验名与公开来源，不写不确定的编号。
      </Paragraph>
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Input.Search placeholder="搜试验名或药物，例如：KARDIA、ORION" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </Col>
        <Col xs={12} md={6}>
          <Select style={{ width: '100%' }} value={status} onChange={setStatus} options={statuses.map((s) => ({ value: s, label: s === '全部' ? '状态：全部' : s }))} />
        </Col>
        <Col xs={12} md={6}>
          <Select style={{ width: '100%' }} value={phase} onChange={setPhase} options={phases.map((s) => ({ value: s, label: s === '全部' ? '阶段：全部' : s }))} />
        </Col>
      </Row>
      <Table
        rowKey="id"
        dataSource={filtered}
        pagination={false}
        scroll={{ x: 900 }}
        expandable={{
          expandedRowRender: (t) => (
            <div>
              <Paragraph><Text strong>结果登记：</Text>{t.result}</Paragraph>
              <Paragraph><Text strong>变更记录：</Text>{t.changeLog}</Paragraph>
              {t.nct && <Paragraph type="secondary">ClinicalTrials.gov 编号：{t.nct}</Paragraph>}
            </div>
          ),
        }}
        columns={[
          { title: '试验', dataIndex: 'trial', key: 'trial', render: (v) => <Text strong>{v}</Text> },
          { title: '药物 / 技术', dataIndex: 'drug', key: 'drug' },
          { title: '阶段', dataIndex: 'phase', key: 'phase' },
          { title: '适应症', dataIndex: 'indication', key: 'indication' },
          { title: '主要终点', dataIndex: 'endpoint', key: 'endpoint' },
          {
            title: '状态', dataIndex: 'status', key: 'status',
            render: (v) => <Tag color={v.includes('未达到') ? 'red' : v === '进行中' ? 'orange' : 'green'}>{v}</Tag>,
          },
        ]}
      />
      <Paragraph type="secondary" style={{ marginTop: 16 }}>共 {TRIALS.length} 项关键试验，截至 2026-11。点开每行可看结果登记与变更记录。</Paragraph>
    </div>
  );
}
