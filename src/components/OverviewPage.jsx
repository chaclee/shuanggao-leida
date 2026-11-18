import { Card, Col, List, Row, Statistic, Tag, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DATA_AS_OF, DATA_CALIBER, DRUGS, RADAR_EVENTS, SOURCES, TRIALS } from '../data/frontier';

const { Title, Paragraph, Text } = Typography;
const STAGE_COLORS = { '已上市': '#0f766e', 'III期完成': '#2f6fb2', 'III期进行中': '#d97706', 'II期': '#7c5cd6', 'II期完成': '#7c5cd6', '早期在研': '#94a3b8' };
const CAT_COLORS = { '降压': '#0f766e', '降脂': '#2f6fb2', 'Lp(a)': '#d97706', '难治性高血压': '#b45309' };

function countBy(list, key) {
  const map = {};
  list.forEach((r) => { const k = r[key] || '未注明'; map[k] = (map[k] || 0) + 1; });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export default function OverviewPage({ onGo }) {
  const stageData = countBy(DRUGS, 'stage');
  const techData = countBy(DRUGS, 'tech');
  const catData = countBy(DRUGS, 'category');
  const majorEvents = RADAR_EVENTS.filter((e) => e.level === '重大');

  return (
    <div>
      <Title level={3}>双高领域全局概览</Title>
      <Paragraph type="secondary">
        高血压 + 高血脂的前沿技术与治疗方案情报站。本站仅提供公开情报与科普展示，不构成诊疗建议，用药请遵医嘱。
      </Paragraph>
      <Paragraph type="secondary" style={{ fontSize: 13 }}>
        数据口径：{DATA_CALIBER} 更新时间：截至 {DATA_AS_OF}。
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}><Card><Statistic title="收录药物 / 技术" value={DRUGS.length} suffix="个" /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="收录临床试验" value={TRIALS.length} suffix="项" /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="收录研发事件" value={RADAR_EVENTS.length} suffix="条" /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="重大事件" value={majorEvents.length} suffix="条" /></Card></Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Card title="药物 / 技术：按研发阶段分布">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={stageData} dataKey="value" nameKey="name" outerRadius={88} label={({ name, value }) => `${name} ${value}`}>
                  {stageData.map((d) => <Cell key={d.name} fill={STAGE_COLORS[d.name] || '#94a3b8'} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Text type="secondary" style={{ fontSize: 12 }}>已上市为经典治疗方案；在研部分集中在 siRNA、Lp(a) 与醛固酮合成酶抑制剂。</Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="药物 / 技术：按技术路线分布">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={techData} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={110} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f766e" />
              </BarChart>
            </ResponsiveContainer>
            <Text type="secondary" style={{ fontSize: 12 }}>小分子仍是主力；siRNA 是近五年最活跃的新技术路线。</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="按适应症分布">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={catData} margin={{ left: 0, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2f6fb2">
                  {catData.map((d) => <Cell key={d.name} fill={CAT_COLORS[d.name] || '#2f6fb2'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="近期重大事件" extra={<a onClick={() => onGo('radar')}>去看雷达</a>}>
            <List
              size="small"
              dataSource={majorEvents}
              renderItem={(e) => (
                <List.Item>
                  <div>
                    <div><Tag color="red">{e.type}</Tag> {e.title}</div>
                    <Text type="secondary" style={{ fontSize: 12 }}>{e.date} · {e.drug}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Card title="数据来源" style={{ marginTop: 16 }}>
        <List
          size="small"
          dataSource={SOURCES}
          renderItem={(s) => <List.Item><Text strong>{s.name}</Text><Text type="secondary" style={{ marginLeft: 8 }}>{s.note}</Text></List.Item>}
        />
        <Paragraph type="secondary" style={{ marginTop: 12, fontSize: 12 }}>
          特别说明：本站未接入中国 CDE 试验登记数据（反自动化限制），中国在研管线以 NMPA 与企业公告为准；
          历史数据尚未全量回填，当前以近几年关键试验与事件为主。
        </Paragraph>
      </Card>
    </div>
  );
}
