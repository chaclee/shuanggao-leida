import { useState } from 'react';
import { Input, Select, Table } from 'antd';
import { TRIALS } from '../data/frontier';
import SourceLinks from './SourceLinks';

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
      <h2 className="page-title">试验追踪</h2>
      <p className="page-intro">
        双高领域关键临床试验列表。状态变更留痕见每条的“变更记录”。
        临床试验编号只写了已核实的三项（BaxHTN、CLEAR Outcomes、Lp(a)HORIZON），其余只写试验名与公开来源，不写不确定的编号。
      </p>
      <div className="filters">
        <div className="grow">
          <Input.Search placeholder="搜试验名或药物，例如：KARDIA、ORION" allowClear value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={status} onChange={setStatus} options={statuses.map((s) => ({ value: s, label: s === '全部' ? '状态：全部' : s }))} />
        </div>
        <div className="sel">
          <Select style={{ width: '100%' }} value={phase} onChange={setPhase} options={phases.map((s) => ({ value: s, label: s === '全部' ? '阶段：全部' : s }))} />
        </div>
      </div>
      <Table
        rowKey="id"
        dataSource={filtered}
        pagination={false}
        scroll={{ x: 900 }}
        expandable={{
          expandedRowRender: (t) => (
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              <p><strong>结果登记：</strong>{t.result}</p>
              <p><strong>变更记录：</strong>{t.changeLog}</p>
              {t.nct && (
                <p style={{ fontSize: 12, color: '#6b7280' }}>
                  ClinicalTrials.gov 编号：
                  <a href={`https://clinicaltrials.gov/study/${t.nct}`} target="_blank" rel="noopener noreferrer">{t.nct}</a>
                </p>
              )}
              <p style={{ fontSize: 12 }}><SourceLinks links={t.sourceLinks} /></p>
            </div>
          ),
        }}
        columns={[
          { title: '试验', dataIndex: 'trial', key: 'trial', render: (v) => <strong>{v}</strong> },
          { title: '药物 / 技术', dataIndex: 'drug', key: 'drug' },
          { title: '阶段', dataIndex: 'phase', key: 'phase' },
          { title: '适应症', dataIndex: 'indication', key: 'indication' },
          { title: '主要终点', dataIndex: 'endpoint', key: 'endpoint' },
          {
            title: '状态', dataIndex: 'status', key: 'status',
            render: (v) => (
              <span>
                <span className={v.includes('未达到') ? 'dot red' : 'dot'} />
                {v.includes('未达到') ? <span style={{ color: '#dc2626' }}>{v}</span> : v}
              </span>
            ),
          },
        ]}
      />
      <p style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>共 {TRIALS.length} 项关键试验，截至 2026-11。点开每行可看结果登记与变更记录。</p>
    </div>
  );
}
