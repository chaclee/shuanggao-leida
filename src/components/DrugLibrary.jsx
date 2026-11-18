import { useState } from 'react';
import { Card, Col, Input, Row, Select, Tag, Typography } from 'antd';
import { DRUGS } from '../data/frontier';

const { Title, Paragraph, Text } = Typography;
const STAGE_COLORS = { '已上市': 'green', 'III期完成': 'blue', 'III期进行中': 'orange', 'II期': 'purple', 'II期完成': 'purple', '早期在研': 'default' };

export default function DrugLibrary() {
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('全部');
  const [tech, setTech] = useState('全部');
  const [cat, setCat] = useState('全部');
  const [openId, setOpenId] = useState(null);
  const stages = ['全部', ...new Set(DRUGS.map((d) => d.stage))];
  const techs = ['全部', ...new Set(DRUGS.map((d) => d.tech))];
  const cats = ['全部', ...new Set(DRUGS.map((d) => d.category))];
  const filtered = DRUGS.filter(
    (d) =>
      (stage === '全部' || d.stage === stage) &&
      (tech === '全部' || d.tech === tech) &&
      (cat === '全部' || d.category === cat) &&
      (d.name + d.nameEn + d.target).includes(q.trim()),
  );
  const open = DRUGS.find((d) => d.id === openId);

  return (
    <div>
      <Title level={3}>药物资料库</Title>
      <Paragraph type="secondary">
        按药名、靶点、技术类型检索的药物与技术档案，共 {DRUGS.length} 条，覆盖经典治疗与在研前沿。
        每个档案写机制、靶点、技术类型、研发/上市阶段、适应症与关键终点，不写个人用药建议。
      </Paragraph>
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Input.Search placeholder="搜药名或靶点，例如：英克司兰、PCSK9、Lp(a)" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </Col>
        <Col xs={8} md={4}>
          <Select style={{ width: '100%' }} value={stage} onChange={setStage} options={stages.map((s) => ({ value: s, label: s === '全部' ? '阶段：全部' : s }))} />
        </Col>
        <Col xs={8} md={4}>
          <Select style={{ width: '100%' }} value={tech} onChange={setTech} options={techs.map((s) => ({ value: s, label: s === '全部' ? '技术：全部' : s }))} />
        </Col>
        <Col xs={8} md={4}>
          <Select style={{ width: '100%' }} value={cat} onChange={setCat} options={cats.map((s) => ({ value: s, label: s === '全部' ? '适应症：全部' : s }))} />
        </Col>
      </Row>

      {open ? (
        <Card title={`${open.name} · ${open.nameEn}`} extra={<a onClick={() => setOpenId(null)}>返回列表</a>}>
          <Paragraph>
            <Tag color={STAGE_COLORS[open.stage] || 'default'}>{open.stage}</Tag>
            <Tag>{open.tech}</Tag>
            <Tag>{open.category}</Tag>
          </Paragraph>
          <Paragraph><Text strong>靶点：</Text>{open.target}</Paragraph>
          <Paragraph><Text strong>机制：</Text>{open.mechanism}</Paragraph>
          <Paragraph><Text strong>适应症：</Text>{open.indication}</Paragraph>
          <Paragraph><Text strong>关键终点：</Text>{open.endpoint}</Paragraph>
          <Paragraph type="secondary" style={{ fontSize: 12 }}>依据来源：{open.source}</Paragraph>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {filtered.map((d) => (
            <Col xs={24} sm={12} key={d.id}>
              <Card hoverable title={d.name} onClick={() => setOpenId(d.id)} extra={<Tag color={STAGE_COLORS[d.stage] || 'default'}>{d.stage}</Tag>}>
                <Paragraph ellipsis={{ rows: 2 }}>{d.mechanism}</Paragraph>
                <Text type="secondary" style={{ fontSize: 12 }}>靶点：{d.target} · 技术：{d.tech} · {d.category}</Text>
              </Card>
            </Col>
          ))}
          {!filtered.length && <Col span={24}><Paragraph type="secondary">没有找到相关药物，换个关键词或筛选条件试试。</Paragraph></Col>}
        </Row>
      )}
      <Paragraph type="secondary" style={{ marginTop: 16 }}>共 {DRUGS.length} 个药物 / 技术条目，截至 2026-11。</Paragraph>
    </div>
  );
}
