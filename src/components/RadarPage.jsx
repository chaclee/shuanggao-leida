import { useState } from 'react';
import { Card, Col, Input, Row, Select, Tag, Typography } from 'antd';
import { RADAR_EVENTS } from '../data/frontier';
import { SourceText } from './SourceLinks';

const { Title, Paragraph, Text } = Typography;
const TYPE_COLORS = { '试验推进': 'blue', '结果公布': 'green', '获批': 'gold', '失败/未达终点': 'red', '指南更新': 'purple' };

export default function RadarPage() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('全部');
  const [tech, setTech] = useState('全部');
  const types = ['全部', ...new Set(RADAR_EVENTS.map((e) => e.type))];
  const techs = ['全部', ...new Set(RADAR_EVENTS.map((e) => e.tech).filter((t) => t && t !== '—'))];
  const filtered = RADAR_EVENTS.filter(
    (e) =>
      (type === '全部' || e.type === type) &&
      (tech === '全部' || e.tech === tech) &&
      (e.title + e.summary + e.drug).includes(q.trim()),
  );

  return (
    <div>
      <Title level={3}>前沿技术雷达</Title>
      <Paragraph type="secondary">
        双高领域的重大突破与研发事件，按时间倒序。事件等级：重大指改变治疗格局或管线走向的事件；重要指关键试验结果或获批进展。
        本站仅提供公开情报展示，不构成诊疗建议。
      </Paragraph>
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Input.Search placeholder="搜事件、药物，例如：baxdrostat、Lp(a)" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </Col>
        <Col xs={12} md={6}>
          <Select style={{ width: '100%' }} value={type} onChange={setType} options={types.map((t) => ({ value: t, label: t === '全部' ? '事件类型：全部' : t }))} />
        </Col>
        <Col xs={12} md={6}>
          <Select style={{ width: '100%' }} value={tech} onChange={setTech} options={techs.map((t) => ({ value: t, label: t === '全部' ? '技术类型：全部' : t }))} />
        </Col>
      </Row>
      {filtered.map((e) => (
        <Card key={e.id} style={{ marginBottom: 16 }} title={<span>{e.date} · {e.title}</span>}>
          <Paragraph>
            <Tag color={TYPE_COLORS[e.type] || 'default'}>{e.type}</Tag>
            {e.level === '重大' && <Tag color="red">重大</Tag>}
            {e.drug !== '—' && <Tag>{e.drug}</Tag>}
            {e.target !== '—' && <Tag>靶点：{e.target}</Tag>}
            {e.tech !== '—' && <Tag>技术：{e.tech}</Tag>}
          </Paragraph>
          <Paragraph>{e.summary}</Paragraph>
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            原始出处：<SourceText text={e.source} links={e.sourceLinks} />
          </Paragraph>
        </Card>
      ))}
      {!filtered.length && <Paragraph type="secondary">没有找到相关事件，换个关键词或筛选条件试试。</Paragraph>}
      <Text type="secondary">共 {RADAR_EVENTS.length} 条事件，截至 2026-11。</Text>
    </div>
  );
}
