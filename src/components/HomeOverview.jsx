import { Alert, Card, Col, List, Row, Statistic, Tag, Typography } from 'antd';
import { sevenDaySummary, ldlStatus } from '../lib/stats';

const { Title, Paragraph, Text } = Typography;

export default function HomeOverview({ bp, lipid, weight, med, onGo }) {
  const latestBp = [...bp.list].sort((a, b) => b.datetime.localeCompare(a.datetime))[0];
  const latestLipid = [...lipid.list].sort((a, b) => b.date.localeCompare(a.date))[0];
  const latestWeight = [...weight.list].sort((a, b) => b.date.localeCompare(a.date))[0];
  const summary = sevenDaySummary(bp.list);
  const ldl = latestLipid ? ldlStatus(latestLipid.ldl, latestLipid.risk, latestLipid.baselineLdl) : null;

  return (
    <div>
      <Title level={3}>我的概览</Title>
      <Paragraph type="secondary">
        双高雷达第一期：科普 + 自我管理记录。数据只保存在本机浏览器，不上传服务器，换设备不共享。
        本站仅提供科普与记录工具，不构成诊疗建议，用药请遵医嘱。
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => onGo('bp')}>
            <Statistic title="最新血压" value={latestBp ? `${latestBp.sys}/${latestBp.dia}` : '—'} suffix="mmHg" />
            <Text type="secondary" style={{ fontSize: 12 }}>{latestBp ? String(latestBp.datetime).replace('T', ' ') : '暂无记录'}</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => onGo('lipid')}>
            <Statistic title="最新 LDL-C" value={latestLipid ? latestLipid.ldl : '—'} suffix="mmol/L" />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {latestLipid ? `${latestLipid.date} · ${latestLipid.risk}` : '暂无化验'}
              {ldl && ldl.ok !== null ? (ldl.ok ? <Tag color="green" style={{ marginLeft: 6 }}>达标</Tag> : <Tag color="red" style={{ marginLeft: 6 }}>未达标</Tag>) : null}
            </Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => onGo('bp')}>
            <Statistic title="7 天血压平均" value={summary.avgSys && summary.avgDia ? `${summary.avgSys}/${summary.avgDia}` : '—'} suffix="mmHg" />
            <Text type="secondary" style={{ fontSize: 12 }}>家庭血压目标线 135/85</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => onGo('weight')}>
            <Statistic title="最新体重" value={latestWeight ? latestWeight.weight : '—'} suffix="kg" />
            <Text type="secondary" style={{ fontSize: 12 }}>{latestWeight ? latestWeight.date : '暂无记录'}</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="记录条数">
            <List
              size="small"
              dataSource={[
                { name: '血压记录', n: bp.list.length, key: 'bp' },
                { name: '血脂化验', n: lipid.list.length, key: 'lipid' },
                { name: '体重记录', n: weight.list.length, key: 'weight' },
                { name: '用药记录', n: med.list.length, key: 'med' },
              ]}
              renderItem={(item) => (
                <List.Item actions={[<a key="go" onClick={() => onGo(item.key)}>去查看</a>]}>
                  {item.name}：{item.n} 条
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="最近 7 天血压">
            {summary.days.length ? (
              <List
                size="small"
                dataSource={summary.days}
                renderItem={(d) => (
                  <List.Item>
                    {d.date}：早上 {d.morningSys ? `${d.morningSys}/${d.morningDia}` : '—'}，
                    晚上 {d.eveningSys ? `${d.eveningSys}/${d.eveningDia}` : '—'}
                  </List.Item>
                )}
              />
            ) : (
              <Paragraph type="secondary">暂无血压记录，新增后这里会显示最近 7 天的早晚平均。</Paragraph>
            )}
          </Card>
        </Col>
      </Row>

      <Alert
        type="warning"
        showIcon
        style={{ marginTop: 16 }}
        message="示例数据提示"
        description="首次打开时站内预置的全部是虚构示例数据，仅供看清功能。开始正式使用前，请在“我的数据”里一键清空示例数据，再录入你自己的记录。"
      />
    </div>
  );
}
