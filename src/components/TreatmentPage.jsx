import { Table } from 'antd';
import SourceLinks from './SourceLinks';

const GUIDELINE_LINKS = [
  { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
  { label: '中国血脂管理指南（2023年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E8%A1%80%E8%84%82%E7%AE%A1%E7%90%86%E6%8C%87%E5%8D%97+2023' },
];

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

const HTN_CLASSES = [
  { key: '1', cls: '利尿剂', example: '氢氯噻嗪、吲达帕胺', fit: '老年、盐敏感、单纯收缩期高血压；常作联合治疗基础', note: '监测血钾、血糖、尿酸' },
  { key: '2', cls: '钙通道阻滞剂（CCB）', example: '氨氯地平', fit: '老年、盐敏感、单纯收缩期高血压', note: '常见踝部水肿' },
  { key: '3', cls: 'ACEI（普利类）', example: '贝那普利', fit: '合并心衰、糖尿病肾病', note: '注意干咳、血管性水肿' },
  { key: '4', cls: 'ARB（沙坦类）', example: '缬沙坦、氯沙坦', fit: '合并糖尿病、蛋白尿、左室肥厚', note: '不与 ACEI 联用' },
  { key: '5', cls: 'β 受体阻滞剂', example: '美托洛尔', fit: '合并冠心病、心率快、心衰、心律失常', note: '不作为无合并症者的首选' },
];

const LIPID_CLASSES = [
  { key: '1', cls: '他汀类', example: '阿托伐他汀、瑞舒伐他汀', effect: '高强度 LDL-C 降幅 ≥ 50%', note: '一线基础治疗，每日口服' },
  { key: '2', cls: '胆固醇吸收抑制剂', example: '依折麦布', effect: 'LDL-C 降幅约 18%–25%', note: '常与他汀联用' },
  { key: '3', cls: 'PCSK9 单克隆抗体', example: '依洛尤单抗、阿利西尤单抗', effect: 'LDL-C 降幅约 50%–60%', note: '皮下注射，两周或一月一次' },
  { key: '4', cls: '小干扰 RNA（siRNA）', example: '英克司兰', effect: 'LDL-C 降幅约 50%', note: '维持期半年注射一次' },
  { key: '5', cls: 'ATP 柠檬酸裂解酶抑制剂', example: '贝派地酸', effect: 'LDL-C 降幅约 21%', note: '他汀不耐受人群' },
  { key: '6', cls: 'ANGPTL3 抑制剂', example: '依维那库单抗', effect: 'HoFH 患者 LDL-C 降幅约 49%', note: '纯合子家族性高胆固醇血症' },
];

export default function TreatmentPage() {
  return (
    <div>
      <h2 className="page-title">目前的治疗方案</h2>
      <p className="page-intro">
        按指南分层的治疗方案总览：先讲现在临床上在用的方案，再讲前沿技术处在哪个位置。
        依据来源：《中国高血压防治指南（2024 年修订版）》《中国血脂管理指南（2023 年）》及相关药品说明书。
        本页只做方案展示，不做个人用药建议，选药与调整请遵医嘱。
      </p>
      <p style={{ fontSize: 12, marginBottom: 24 }}>
        <SourceLinks links={GUIDELINE_LINKS} />
      </p>

      <div className="section" style={{ marginTop: 0 }}>
        <h3>一、降压：五类经典药物与联合治疗</h3>
        <Table
          rowKey="key" dataSource={HTN_CLASSES} pagination={false} scroll={{ x: 640 }}
          columns={[
            { title: '类别', dataIndex: 'cls', key: 'cls' },
            { title: '代表药物', dataIndex: 'example', key: 'example' },
            { title: '优先适用人群', dataIndex: 'fit', key: 'fit' },
            { title: '注意事项', dataIndex: 'note', key: 'note' },
          ]}
        />
        <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8 }}>
          <strong>阶梯治疗与联合治疗：</strong>
          多数患者单药控制不达标时，指南推荐尽早联合治疗，常用组合为 ARB/ACEI + CCB、ARB/ACEI + 利尿剂、
          CCB + 利尿剂；三药联合仍不达标且排除继发因素后，考虑难治性高血压路径——加用醛固酮受体拮抗剂、
          评估醛固酮合成酶抑制剂等新机制药物，或评估肾去神经术等器械治疗，具体由医生结合病情决定。
        </p>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8 }}>新机制位置：醛固酮合成酶抑制剂（baxdrostat、lorundrostat）、降压 siRNA（zilebesiran）、
        双重内皮素受体拮抗剂（aprocitentan）与肾去神经术，详见“药物资料库”与“前沿技术雷达”。</p>
      </div>

      <div className="section">
        <h3>二、降脂：分层达标，联合降 LDL-C</h3>
        <Table
          rowKey="key" dataSource={LIPID_CLASSES} pagination={false} scroll={{ x: 640 }}
          columns={[
            { title: '类别', dataIndex: 'cls', key: 'cls' },
            { title: '代表药物', dataIndex: 'example', key: 'example' },
            { title: 'LDL-C 降幅', dataIndex: 'effect', key: 'effect' },
            { title: '备注', dataIndex: 'note', key: 'note' },
          ]}
        />
        <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8 }}>
          <strong>分层思路：</strong>
          先按整体心血管风险分层定 LDL-C 目标，再选强度：低危以生活方式干预为主，必要时加药；
          中高危以上以他汀为基础，LDL-C 不达标时加用依折麦布、PCSK9 单抗或英克司兰等；
          他汀不耐受者可考虑贝派地酸。Lp(a) 升高目前尚无获批的针对性降低药物，在研药物详见“药物资料库”。
        </p>
      </div>

      <div className="two-col" style={{ marginTop: 32 }}>
        <div>
          <h3>血压目标</h3>
          <Table
            rowKey="key" dataSource={BP_ROWS} pagination={false}
            columns={[
              { title: '场景', dataIndex: 'item', key: 'item' },
              { title: '目标', dataIndex: 'target', key: 'target', render: (v) => <strong>{v}</strong> },
              { title: '说明', dataIndex: 'note', key: 'note' },
            ]}
          />
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8, marginTop: 12 }}>
            依据来源：《中国高血压防治指南（2024 年修订版）》。
            <SourceLinks links={[GUIDELINE_LINKS[0]]} prefix="链接" style={{ fontSize: 12 }} />
          </p>
        </div>
        <div>
          <h3>血脂目标（按风险分层）</h3>
          <Table
            rowKey="key" dataSource={LIPID_ROWS} pagination={false}
            columns={[
              { title: '风险分层', dataIndex: 'level', key: 'level' },
              { title: 'LDL-C 目标', dataIndex: 'target', key: 'target', render: (v) => <strong>{v}</strong> },
              { title: '降幅要求', dataIndex: 'reduction', key: 'reduction' },
            ]}
          />
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.8, marginTop: 12 }}>
            依据来源：《中国血脂管理指南（2023 年）》。风险分层请以医生评估为准，本页只做对照展示。
            <SourceLinks links={[GUIDELINE_LINKS[1]]} prefix="链接" style={{ fontSize: 12 }} />
          </p>
        </div>
      </div>
    </div>
  );
}
