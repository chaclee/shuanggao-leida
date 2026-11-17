import { useState } from 'react';
import { Alert, Card, Col, Input, List, Row, Tag, Typography } from 'antd';
import { ARTICLES } from '../data/articles';

const { Title, Paragraph, Text } = Typography;

export default function ArticlesPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('全部');
  const [openId, setOpenId] = useState(null);
  const cats = ['全部', ...new Set(ARTICLES.map((a) => a.category))];
  const filtered = ARTICLES.filter(
    (a) => (cat === '全部' || a.category === cat) && (a.title + a.body.join('')).includes(q.trim()),
  );
  const open = ARTICLES.find((a) => a.id === openId);

  return (
    <div>
      <Title level={3}>科普库</Title>
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="本站仅提供科普与记录工具，不构成诊疗建议，用药请遵医嘱。"
        description="每篇科普都写明了依据来源与版本；涉及具体数值的，只写指南目标值，不写没有来源的数字。"
      />
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Input.Search placeholder="搜科普，例如：降压药、盐、误区" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </Col>
        <Col span={24}>
          {cats.map((c) => (
            <Tag
              key={c}
              color={cat === c ? 'blue' : 'default'}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: 14 }}
              onClick={() => setCat(c)}
            >
              {c}
            </Tag>
          ))}
        </Col>
      </Row>

      {open ? (
        <Card
          title={open.title}
          extra={<a onClick={() => setOpenId(null)}>返回列表</a>}
        >
          <Paragraph><Tag color="blue">{open.category}</Tag></Paragraph>
          {open.body.map((p, i) => <Paragraph key={i}>{p}</Paragraph>)}
          <Title level={5}>要点</Title>
          <List size="small" dataSource={open.points} renderItem={(p) => <List.Item>· {p}</List.Item>} />
          <Paragraph type="secondary" style={{ marginTop: 16 }}>依据来源：{open.source}</Paragraph>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {filtered.map((a) => (
            <Col xs={24} sm={12} key={a.id}>
              <Card hoverable title={a.title} onClick={() => setOpenId(a.id)} extra={<Tag color="blue">{a.category}</Tag>}>
                <Paragraph ellipsis={{ rows: 2 }}>{a.body[0]}</Paragraph>
                <Text type="secondary" style={{ fontSize: 12 }}>来源：{a.source}</Text>
              </Card>
            </Col>
          ))}
          {!filtered.length && <Col span={24}><Paragraph type="secondary">没有找到相关科普，换个关键词试试。</Paragraph></Col>}
        </Row>
      )}
      <Paragraph type="secondary" style={{ marginTop: 16 }}>共 {ARTICLES.length} 篇科普，覆盖基础、用药、生活方式、误区四类。</Paragraph>
    </div>
  );
}
