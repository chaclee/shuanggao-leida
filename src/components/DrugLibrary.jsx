import { useState } from 'react';
import { Card, Col, Empty, Input, Row, Select, Tag, Typography } from 'antd';
import { DRUGS } from '../data/frontier';
import { SourceText } from './SourceLinks';

const { Title, Paragraph, Text } = Typography;
const STAGE_COLORS = { '已上市': 'green', 'III期完成': 'blue', 'III期进行中': 'orange', 'II期': 'purple', 'II期完成': 'purple', '早期在研': 'default' };

// 药品图片：结构图用 contain 展示（避免裁剪化学结构），实拍/示意图同样处理。
function DrugImage({ drug, height, failed, onFail }) {
  if (!drug.image || failed.has(drug.id)) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={drug.imageCaption || '暂无实物图'} style={{ margin: 0 }} />
      </div>
    );
  }
  return (
    <div style={{ height, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img
        src={drug.image}
        alt={`${drug.name}（${drug.nameEn}）`}
        loading="lazy"
        onError={() => onFail(drug.id)}
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}

export default function DrugLibrary() {
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('全部');
  const [tech, setTech] = useState('全部');
  const [cat, setCat] = useState('全部');
  const [openId, setOpenId] = useState(null);
  const [failed, setFailed] = useState(new Set());
  const markFailed = (id) => setFailed((prev) => new Set(prev).add(id));
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
        图片为公开资料图：化学结构式来自 Wikimedia Commons，示意图已在图注中注明“非本产品实物”。
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
          <DrugImage drug={open} height={260} failed={failed} onFail={markFailed} />
          <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 8, textAlign: 'center' }}>
            {open.imageCaption}
            {open.imageCredit ? ` · 图片来源：${open.imageCredit}` : ''}
          </Paragraph>
          <Paragraph>
            <Tag color={STAGE_COLORS[open.stage] || 'default'}>{open.stage}</Tag>
            <Tag>{open.tech}</Tag>
            <Tag>{open.category}</Tag>
          </Paragraph>
          <Paragraph><Text strong>靶点：</Text>{open.target}</Paragraph>
          <Paragraph><Text strong>机制：</Text>{open.mechanism}</Paragraph>
          <Paragraph><Text strong>适应症：</Text>{open.indication}</Paragraph>
          <Paragraph><Text strong>关键终点：</Text>{open.endpoint}</Paragraph>
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            依据来源：<SourceText text={open.source} links={open.sourceLinks} />
          </Paragraph>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {filtered.map((d) => (
            <Col xs={24} sm={12} key={d.id}>
              <Card
                hoverable
                onClick={() => setOpenId(d.id)}
                cover={<DrugImage drug={d} height={150} failed={failed} onFail={markFailed} />}
                extra={<Tag color={STAGE_COLORS[d.stage] || 'default'}>{d.stage}</Tag>}
              >
                <Card.Meta
                  title={d.name}
                  description={
                    <span>
                      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 4 }}>{d.mechanism}</Paragraph>
                      <Text type="secondary" style={{ fontSize: 12 }}>靶点：{d.target} · 技术：{d.tech} · {d.category}</Text>
                    </span>
                  }
                />
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
