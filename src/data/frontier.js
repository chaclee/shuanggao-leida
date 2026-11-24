// 双高雷达 · 前沿技术展示版 — 内容数据（截至 2026-11-24，人工整理）
// 准确性规则：
// - 只写公开资料里能查到的事实；每条都写依据来源与版本。
// - 试验结果数字必须标试验名和来源；不确定的写“在研中，尚未公布关键结果”，不编数字。
// - 临床试验编号只写已核实的（BaxHTN NCT06034743、CLEAR Outcomes NCT02993406、
//   Lp(a)HORIZON NCT04023552、CORALreef Lipids NCT05952856、CORALreef HeFH NCT05952869、
//   CORALreef Outcomes NCT06008756、ORION-4 NCT03705234），其余只写试验名 + 公开来源，不写不确定的 NCT 号。
// - 本站不收录任何个人健康数据。

export const DATA_AS_OF = '2026-11-24';
export const DATA_CALIBER =
  '本站收录为人工整理的公开情报（截至 2026-11-24），不是全球试验数据库的全量统计；' +
  '数字均为已发表试验或企业公告披露的结果，详见各条目来源。';

export const SOURCES = [
  { name: 'ClinicalTrials.gov', note: '临床试验登记与结果登记', url: 'https://clinicaltrials.gov' },
  { name: 'PubMed', note: '医学文献（NEJM / JAMA / Lancet 等）', url: 'https://pubmed.ncbi.nlm.nih.gov' },
  { name: '美国 FDA / 欧洲 EMA', note: '药品与器械审批动态', url: 'https://www.fda.gov', extraUrls: [{ label: 'EMA', url: 'https://www.ema.europa.eu/en/homepage' }] },
  { name: '中国国家药品监督管理局（NMPA）', note: '国内上市与审评动态' },
  { name: '企业公告（阿斯利康、Alnylam、Amgen、诺华、Esperion 等）', note: '试验结果与研发进展' },
  { name: 'AHA / ESC / ACC 学术会议', note: '最新试验结果发布', url: 'https://www.heart.org', extraUrls: [{ label: 'ESC', url: 'https://www.escardio.org' }, { label: 'ACC', url: 'https://www.acc.org' }] },
  { name: '《中国高血压防治指南（2024 年修订版）》', note: '降压治疗方案与目标值', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
  { name: '《中国血脂管理指南（2023 年）》', note: '降脂治疗方案与 LDL-C 分层目标', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E8%A1%80%E8%84%82%E7%AE%A1%E7%90%86%E6%8C%87%E5%8D%97+2023' },
];

// ---------------- 药物 / 技术资料库（26 条） ----------------
// stage: 已上市 | III期完成 | III期进行中 | II期 | 早期在研
// tech: 小分子 | 单克隆抗体 | siRNA | 反义寡核苷酸 | 口服小分子 | 器械 | 疫苗 | 基因编辑
// category: 降压 | 降脂 | Lp(a) | 难治性高血压
export const DRUGS = [
  {
    id: 'd1', name: '阿托伐他汀', nameEn: 'Atorvastatin', target: 'HMG-CoA 还原酶',
    tech: '小分子', stage: '已上市', category: '降脂',
    mechanism: '抑制肝脏胆固醇合成关键酶 HMG-CoA 还原酶，上调肝细胞 LDL 受体，加速 LDL-C 清除。',
    indication: '高胆固醇血症、动脉粥样硬化性心血管疾病的一级与二级预防。',
    endpoint: '高强度剂量 LDL-C 降幅 ≥ 50%（指南分层）；中等强度 30%–49%。',
    source: '《中国血脂管理指南（2023 年）》及药品说明书',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Atorvastatin2D.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国血脂管理指南（2023年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E8%A1%80%E8%84%82%E7%AE%A1%E7%90%86%E6%8C%87%E5%8D%97+2023' },
    ],
  },
  {
    id: 'd2', name: '瑞舒伐他汀', nameEn: 'Rosuvastatin', target: 'HMG-CoA 还原酶',
    tech: '小分子', stage: '已上市', category: '降脂',
    mechanism: '与阿托伐他汀同类机制，强效他汀，半衰期较长。',
    indication: '高胆固醇血症、心血管疾病预防。',
    endpoint: '高强度剂量 LDL-C 降幅 ≥ 50%（指南分层）。',
    source: '《中国血脂管理指南（2023 年）》及药品说明书',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Rosuvastatin-Formula_V3.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国血脂管理指南（2023年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E8%A1%80%E8%84%82%E7%AE%A1%E7%90%86%E6%8C%87%E5%8D%97+2023' },
    ],
  },
  {
    id: 'd3', name: '依折麦布', nameEn: 'Ezetimibe', target: 'NPC1L1（胆固醇吸收）',
    tech: '小分子', stage: '已上市', category: '降脂',
    mechanism: '抑制小肠 NPC1L1 蛋白，减少胆固醇吸收，常与他汀联用。',
    indication: '原发性高胆固醇血症，单用或与他汀联用。',
    endpoint: '单药 LDL-C 降幅约 18%–25%；IMPROVE-IT 试验：联合他汀，主要心血管事件 HR 0.936。',
    source: 'IMPROVE-IT 试验（NEJM 2015）；《中国血脂管理指南（2023 年）》',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Ezetimibe_structure.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'IMPROVE-IT（NEJM 2015）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/26039521/' },
    ],
  },
  {
    id: 'd4', name: '依洛尤单抗', nameEn: 'Evolocumab', target: 'PCSK9',
    tech: '单克隆抗体', stage: '已上市', category: '降脂',
    mechanism: '单克隆抗体结合 PCSK9，阻止其降解 LDL 受体，肝细胞 LDL 受体增多，LDL-C 清除加快。',
    indication: '家族性高胆固醇血症、已确诊动脉粥样硬化性心血管疾病且 LDL-C 未达标者。',
    endpoint: 'LDL-C 降幅约 59%；FOURIER 试验：主要心血管事件 HR 0.85。',
    source: 'FOURIER 试验（NEJM 2017）；药品说明书',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Antibody_IgG1_structure.png',
    imageCaption: '单克隆抗体（IgG1）结构示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'FOURIER（NEJM 2017）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/28304224/' },
    ],
  },
  {
    id: 'd5', name: '阿利西尤单抗', nameEn: 'Alirocumab', target: 'PCSK9',
    tech: '单克隆抗体', stage: '已上市', category: '降脂',
    mechanism: '与依洛尤单抗同类机制，抑制 PCSK9。',
    indication: '急性冠脉综合征后、家族性高胆固醇血症等 LDL-C 未达标者。',
    endpoint: 'LDL-C 降幅约 55%–60%；ODYSSEY OUTCOMES 试验：主要心血管事件 HR 0.85。',
    source: 'ODYSSEY OUTCOMES 试验（NEJM 2018）；药品说明书',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Antibody_IgG1_structure.png',
    imageCaption: '单克隆抗体（IgG1）结构示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'ODYSSEY OUTCOMES（NEJM 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30403574/' },
    ],
  },
  {
    id: 'd6', name: '英克司兰', nameEn: 'Inclisiran', target: 'PCSK9',
    tech: 'siRNA', stage: '已上市', category: '降脂',
    mechanism: '小干扰 RNA，沉默肝脏 PCSK9 的 mRNA，减少 PCSK9 合成；维持期约半年注射一次。',
    indication: '原发性高胆固醇血症、混合型血脂异常、家族性高胆固醇血症。',
    endpoint: 'ORION-10/11 试验：LDL-C 降幅约 50%；心血管结局试验 ORION-4（16,000 余人）2026-11-23 公布 topline 结果：达到主要终点，MACE 风险统计学显著且有临床意义地降低（具体数值未披露），完整数据计划 2027 年上半年发表。',
    source: 'ORION-10/11 试验（NEJM 2020）；ORION-4 topline 结果（诺华公告 2026-11-23）；药品说明书',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Leqvio.jpg',
    imageCaption: 'Leqvio（英克司兰）产品包装实物图',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'ORION-10/11（NEJM 2020）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32187462/' },
      { label: 'ORION-4 topline 结果 · 诺华公告（2026-11-23）', url: 'https://www.globenewswire.com/news-release/2026/11/23/3408011/0/en/twice-yearly-leqvio-inclisiran-reduced-cardiovascular-event-risk-in-first-outcomes-study-of-an-sirna-therapy-in-ascvd.html' },
      { label: 'ClinicalTrials.gov NCT03705234', url: 'https://clinicaltrials.gov/study/NCT03705234' },
    ],
  },
  {
    id: 'd27', name: 'Enlicitide', nameEn: 'Enlicitide（Lipfendra）', target: 'PCSK9',
    tech: '口服小分子', stage: '已上市', category: '降脂',
    mechanism: '新型大环肽，口服后结合 PCSK9，阻止其与 LDL 受体结合，增加肝细胞表面 LDL 受体数量，加速 LDL-C 清除；每日一次口服，空腹服用、服药后 30 分钟内禁食。',
    indication: '成人高胆固醇血症（含杂合子家族性高胆固醇血症），作为饮食与运动的辅助治疗。',
    endpoint: 'CORALreef Lipids III期：24 周 LDL-C 较基线下降 57.1%，安慰剂校正降幅 55.8 个百分点（约 56%）；CORALreef HeFH：安慰剂校正降幅约 59%；心血管结局试验 CORALreef Outcomes（14,500 余人）进行中，尚未公布关键结果。',
    source: 'CORALreef Lipids 试验（NEJM 2026），ClinicalTrials.gov NCT05952856；FDA 批准公告（2026-07）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Enlicitide_decanoate.svg',
    imageCaption: '化学结构式（Enlicitide decanoate）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'FDA 批准公告（2026-07）', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-oral-pcsk9-inhibitor-lower-ldl-cholesterol-adults-high-cholesterol' },
      { label: 'CORALreef Lipids（NEJM 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41879224/' },
      { label: 'ClinicalTrials.gov NCT05952856', url: 'https://clinicaltrials.gov/study/NCT05952856' },
    ],
  },
  {
    id: 'd7', name: '贝派地酸', nameEn: 'Bempedoic acid', target: 'ATP 柠檬酸裂解酶（ACL）',
    tech: '小分子', stage: '已上市', category: '降脂',
    mechanism: '抑制肝脏 ATP 柠檬酸裂解酶，减少胆固醇合成；仅在肝脏活化，肌肉组织不活化。',
    indication: '他汀不耐受或他汀治疗后 LDL-C 仍未达标者。',
    endpoint: 'CLEAR Outcomes 试验：6 个月 LDL-C 降幅约 21%，四组分 MACE HR 0.87（11.7% vs 13.3%）。',
    source: 'CLEAR Outcomes 试验（NEJM 2023），ClinicalTrials.gov NCT02993406',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Bempedoic_acid.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'CLEAR Outcomes（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36876740/' },
      { label: 'ClinicalTrials.gov NCT02993406', url: 'https://clinicaltrials.gov/study/NCT02993406' },
    ],
  },
  {
    id: 'd8', name: '依维那库单抗', nameEn: 'Evinacumab', target: 'ANGPTL3',
    tech: '单克隆抗体', stage: '已上市', category: '降脂',
    mechanism: '单克隆抗体抑制 ANGPTL3，解除对脂蛋白脂肪酶和内皮脂肪酶的抑制，加速脂质清除，不依赖 LDL 受体。',
    indication: '纯合子家族性高胆固醇血症（HoFH）。',
    endpoint: 'ELIPSE 试验：HoFH 患者 LDL-C 降幅约 49%。',
    source: 'ELIPSE 试验（NEJM 2020）；药品说明书',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Antibody_IgG1_structure.png',
    imageCaption: '单克隆抗体（IgG1）结构示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'ELIPSE（NEJM 2020）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32813947/' },
    ],
  },
  {
    id: 'd9', name: 'Pelacarsen', nameEn: 'Pelacarsen（TQJ230）', target: 'apo(a) / LPA mRNA',
    tech: '反义寡核苷酸', stage: 'III期完成', category: 'Lp(a)',
    mechanism: 'GalNAc 偶联反义寡核苷酸，降解肝脏 apo(a) 的 mRNA，减少 Lp(a) 生成。',
    indication: '已确诊心血管疾病且 Lp(a) 升高的患者（探索性适应症）。',
    endpoint: 'II期 Lp(a) 降幅最高约 80%；III期 Lp(a)HORIZON 试验主要心血管终点未达到（HR 1.02，12.3% vs 12.1%），开发项目已终止。',
    source: 'Lp(a)HORIZON 试验，2026-11-07 AHA 大会公布并发表于 NEJM；ClinicalTrials.gov NCT04023552',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Antisense_DNA_oligonucleotide.svg',
    imageCaption: '反义寡核苷酸作用机制示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'Lp(a)HORIZON（NEJM 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/43001734/' },
      { label: 'ClinicalTrials.gov NCT04023552', url: 'https://clinicaltrials.gov/study/NCT04023552' },
    ],
  },
  {
    id: 'd10', name: 'Olpasiran', nameEn: 'Olpasiran（AMG 890）', target: 'LPA mRNA',
    tech: 'siRNA', stage: 'III期进行中', category: 'Lp(a)',
    mechanism: 'GalNAc 偶联 siRNA，沉默肝脏 LPA 基因表达，抑制 apo(a) 合成。',
    indication: '已确诊动脉粥样硬化性心血管疾病且 Lp(a) 升高的患者（在研适应症）。',
    endpoint: 'OCEAN(a)-DOSE 试验：高剂量组 Lp(a) 降幅超过 95%（225 mg 组安慰剂校正约 -97% 至 -101%）；心血管结局试验 OCEAN(a)-Outcomes 进行中，尚未公布关键结果。',
    source: 'OCEAN(a)-DOSE 试验（NEJM 2023）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/SiRNA_and_RNAI_english.png',
    imageCaption: 'siRNA 结构与 RNA 干扰机制示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'OCEAN(a)-DOSE · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=OCEAN%28a%29-DOSE+olpasiran' },
    ],
  },
  {
    id: 'd11', name: 'Lepodisiran', nameEn: 'Lepodisiran（LY3819469）', target: 'LPA mRNA',
    tech: 'siRNA', stage: 'III期进行中', category: 'Lp(a)',
    mechanism: 'siRNA 沉默肝脏 LPA 表达，长效抑制 Lp(a) 生成。',
    indication: '动脉粥样硬化性心血管疾病或高危且 Lp(a) 升高的患者（在研适应症）。',
    endpoint: 'II期 Lp(a) 降幅约 94%，一次给药后效果持续 12 个月以上；III期 ACCLAIM-Lp(a) 结局试验进行中，尚未公布关键结果。',
    source: 'II期试验数据（NEJM 2024）；ACCLAIM-Lp(a) 试验登记',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/SiRNA_and_RNAI_english.png',
    imageCaption: 'siRNA 结构与 RNA 干扰机制示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'Lepodisiran II期 · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Lepodisiran+Long-Duration+Small+Interfering+RNA' },
    ],
  },
  {
    id: 'd12', name: 'Zerlasiran', nameEn: 'Zerlasiran', target: 'LPA mRNA',
    tech: 'siRNA', stage: 'II期', category: 'Lp(a)',
    mechanism: 'siRNA 沉默肝脏 LPA 表达。',
    indication: 'Lp(a) 升高的患者（在研适应症）。',
    endpoint: 'II期 Lp(a) 降幅约 96%（最高剂量组）；在研中，尚未公布关键结果。',
    source: 'II期试验数据；综述文献（Curr Atheroscler Rep 2026）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/SiRNA_and_RNAI_english.png',
    imageCaption: 'siRNA 结构与 RNA 干扰机制示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'Zerlasiran II期（JAMA 2024）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/39556769/' },
    ],
  },
  {
    id: 'd13', name: 'Muvalaplin', nameEn: 'Muvalaplin（LY3473329）', target: 'apo(a)–ApoB 结合',
    tech: '口服小分子', stage: 'II期完成', category: 'Lp(a)',
    mechanism: '首个口服小分子 Lp(a) 抑制剂，干扰 apo(a) 与 ApoB 的结合，阻止 Lp(a) 颗粒形成。',
    indication: 'Lp(a) 升高的患者（在研适应症）。',
    endpoint: 'II期 KRAKEN 试验：完整 Lp(a) 降幅最高约 86%；III期 MOVE-Lp(a) 结局试验进行中，尚未公布关键结果。',
    source: 'KRAKEN II期试验数据；综述文献（Curr Atheroscler Rep 2026）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Muvalaplin.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'KRAKEN（JAMA 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/39556768/' },
    ],
  },
  {
    id: 'd14', name: 'Obicetrapib', nameEn: 'Obicetrapib', target: 'CETP（胆固醇酯转移蛋白）',
    tech: '小分子', stage: 'III期进行中', category: '降脂',
    mechanism: '抑制 CETP，减少 HDL 向 LDL 的胆固醇转移，从而降低 LDL-C。',
    indication: '他汀治疗后 LDL-C 仍未达标者（在研适应症）。',
    endpoint: 'BROOKLYN / BROADWAY 试验：LDL-C 降幅约 40%；心血管结局试验 PREVAIL 进行中，尚未公布关键结果。',
    source: 'BROOKLYN / BROADWAY 试验数据；PREVAIL 试验登记',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Obicetrapib.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'BROOKLYN（Nat Med 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41760952/' },
    ],
  },
  {
    id: 'd15', name: 'VERVE-101', nameEn: 'VERVE-101', target: 'PCSK9（基因）',
    tech: '基因编辑', stage: '早期在研', category: '降脂',
    mechanism: '体内碱基编辑技术，一次给药永久性失活肝脏 PCSK9 基因。',
    indication: '家族性高胆固醇血症（探索性适应症）。',
    endpoint: 'I期探索性研究，安全性信号仍在评估中，尚未公布关键结果。',
    source: '企业公告与 I 期试验登记',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/DsDNA_break_repair_and_CRISPR-based_genome_editing.svg',
    imageCaption: '基因编辑（CRISPR）机制示意（非本产品实物）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'VERVE-101 · ClinicalTrials.gov检索', url: 'https://clinicaltrials.gov/search?term=VERVE-101' },
    ],
  },
  {
    id: 'd16', name: '氨氯地平', nameEn: 'Amlodipine', target: 'L 型钙通道',
    tech: '小分子', stage: '已上市', category: '降压',
    mechanism: '钙通道阻滞剂（CCB，地平类），扩张外周动脉，降低外周阻力。',
    indication: '高血压、心绞痛；老年单纯收缩期高血压、盐敏感人群常优先选用。',
    endpoint: '单药平均降收缩压约 10 mmHg（荟萃分析，不同剂量与人群有差异）。',
    source: '《中国高血压防治指南（2024 年修订版）》；荟萃分析',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Amlodipine.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
    ],
  },
  {
    id: 'd17', name: '缬沙坦 / 氯沙坦', nameEn: 'Valsartan / Losartan', target: '血管紧张素 II AT1 受体',
    tech: '小分子', stage: '已上市', category: '降压',
    mechanism: '血管紧张素受体拮抗剂（ARB，沙坦类），阻断血管紧张素 II 的缩血管与促醛固酮作用。',
    indication: '高血压，合并糖尿病、蛋白尿、左室肥厚时常优先选用。',
    endpoint: '单药平均降收缩压约 10 mmHg（荟萃分析）；肾脏保护证据来自多项随机对照试验。',
    source: '《中国高血压防治指南（2024 年修订版）》',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Valsartan_v.02.svg',
    imageCaption: '化学结构式（缬沙坦；本条目同时包含氯沙坦）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
    ],
  },
  {
    id: 'd18', name: '贝那普利', nameEn: 'Benazepril', target: '血管紧张素转换酶（ACE）',
    tech: '小分子', stage: '已上市', category: '降压',
    mechanism: '血管紧张素转换酶抑制剂（ACEI，普利类），减少血管紧张素 II 生成，同时增加缓激肽。',
    indication: '高血压，合并心衰、糖尿病肾病时常优先选用。',
    endpoint: '单药平均降收缩压约 10 mmHg（荟萃分析）；需注意干咳与血管性水肿风险。',
    source: '《中国高血压防治指南（2024 年修订版）》',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Benazepril_structure.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
    ],
  },
  {
    id: 'd19', name: '氢氯噻嗪 / 吲达帕胺', nameEn: 'Hydrochlorothiazide / Indapamide', target: '肾小管钠转运',
    tech: '小分子', stage: '已上市', category: '降压',
    mechanism: '利尿剂，促进钠与水的排泄，减少血容量；吲达帕胺为噻嗪样利尿剂，作用更持久。',
    indication: '高血压，老年、盐敏感、单纯收缩期高血压常优先选用；常作为联合治疗的基础药物。',
    endpoint: '单药平均降收缩压约 10 mmHg（荟萃分析）；需监测血钾、血糖与尿酸。',
    source: '《中国高血压防治指南（2024 年修订版）》',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Hydrochlorothiazide.svg',
    imageCaption: '化学结构式（氢氯噻嗪；本条目同时包含吲达帕胺）',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
    ],
  },
  {
    id: 'd20', name: '美托洛尔', nameEn: 'Metoprolol', target: 'β1 肾上腺素受体',
    tech: '小分子', stage: '已上市', category: '降压',
    mechanism: 'β 受体阻滞剂，减慢心率、降低心输出量、抑制肾素释放。',
    indication: '高血压合并冠心病、心率快、心衰或心律失常时优先选用；不作为无合并症者的首选。',
    endpoint: '单药平均降收缩压约 10 mmHg（荟萃分析）。',
    source: '《中国高血压防治指南（2024 年修订版）》',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Metoprolol_structure.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
    ],
  },
  {
    id: 'd21', name: 'Baxdrostat', nameEn: 'Baxdrostat（Baxfendy）', target: '醛固酮合成酶 CYP11B2',
    tech: '小分子', stage: '已上市', category: '难治性高血压',
    mechanism: '高选择性醛固酮合成酶抑制剂，阻断 CYP11B2，减少醛固酮生成；治疗剂量下不抑制皮质醇合成。',
    indication: '未控制或难治性高血压（在标准治疗基础上加用）；美国 FDA 于 2026 年 5 月 15 日批准（商品名 Baxfendy），推荐剂量 2 mg 每日一次。',
    endpoint: 'BaxHTN III期：2 mg 组 12 周诊室收缩压较基线下降 15.7 mmHg，安慰剂校正下降 9.8 mmHg；1 mg 组安慰剂校正下降 8.7 mmHg。II期 BrigHTN：2 mg 组安慰剂校正下降约 11 mmHg。美国 FDA 2026 年 5 月 15 日批准用于联用治疗未控制高血压。',
    source: 'BaxHTN 试验（NEJM 2025），ClinicalTrials.gov NCT06034743；BrigHTN 试验（NEJM 2023）；FDA 批准（2026-05-15）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Baxdrostat.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'BaxHTN（NEJM 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40888730/' },
      { label: 'ClinicalTrials.gov NCT06034743', url: 'https://clinicaltrials.gov/study/NCT06034743' },
      { label: 'FDA 批准文件（NDA 219878）', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/nda/2026/219878Orig1s000Approv.pdf' },
      { label: 'FDA 2026 年新药批准', url: 'https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2026' },
    ],
  },
  {
    id: 'd22', name: 'Lorundrostat', nameEn: 'Lorundrostat', target: '醛固酮合成酶 CYP11B2',
    tech: '小分子', stage: 'III期进行中', category: '难治性高血压',
    mechanism: '醛固酮合成酶抑制剂，与 baxdrostat 同类机制，针对醛固酮驱动的高血压。',
    indication: '未控制或难治性高血压（在研适应症）。',
    endpoint: 'II期研究显示降压效果；III期进行中，尚未公布关键结果。',
    source: 'II期试验数据；企业公告',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Lorundrostat.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'Lorundrostat · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=lorundrostat' },
    ],
  },
  {
    id: 'd23', name: 'Zilebesiran', nameEn: 'Zilebesiran（ALN-AGT）', target: '血管紧张素原 AGT',
    tech: 'siRNA', stage: 'III期进行中', category: '降压',
    mechanism: 'GalNAc 偶联 siRNA，沉默肝脏血管紧张素原的 mRNA，从源头减少肾素-血管紧张素系统底物；单次注射作用持续数月。',
    indication: '轻中度及未控制高血压（在研适应症）。',
    endpoint: 'KARDIA-1 II期：300 mg 组 3 个月 24 小时动态收缩压安慰剂校正下降 16.7 mmHg（150 mg 组 -14.1，600 mg 组 -15.7），效果持续至 6 个月，血清血管紧张素原下降超过 90%；III期 ZENITH 结局试验 2025 年 8 月启动，约 11,000 人，尚未公布关键结果。',
    source: 'KARDIA-1 试验（JAMA 2024）；Alnylam / Roche 公告（2025-08）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Zilebesiran_structure.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'KARDIA-1（JAMA 2024）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/38363577/' },
      { label: 'Roche / Alnylam 公告（2025-08）', url: 'https://www.roche.com/media/releases/med-cor-2025-08-30' },
    ],
  },
  {
    id: 'd24', name: 'Aprocitentan', nameEn: 'Aprocitentan（Tryvio）', target: '内皮素受体 ETA / ETB',
    tech: '小分子', stage: '已上市', category: '难治性高血压',
    mechanism: '双重内皮素受体拮抗剂，阻断内皮素的缩血管作用。',
    indication: '难治性高血压（美国 2024 年 3 月 FDA 批准）。',
    endpoint: 'PRECISION III期：4 周时诊室收缩压安慰剂校正下降约 3.8 mmHg，效果持续至 48 周。',
    source: 'PRECISION 试验（Lancet 2022）；FDA 批准公告（2024-03）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Aprocitentan.svg',
    imageCaption: '化学结构式',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'PRECISION（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36356632/' },
      { label: 'FDA 新药批准 2024', url: 'https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2024' },
    ],
  },
  {
    id: 'd25', name: '肾去神经术', nameEn: 'Renal Denervation（RDN）', target: '肾交感神经',
    tech: '器械', stage: '已上市', category: '难治性高血压',
    mechanism: '经导管射频或超声消融肾动脉周围交感神经，降低交感神经活性与肾素释放。',
    indication: '难治性高血压或药物不耐受的患者（器械治疗）。',
    endpoint: '多项随机对照试验（SPYRAL HTN-ON MED、RADIANCE-HTN）显示诊室收缩压较对照组多降约 5–10 mmHg；美国 FDA 于 2023 年 11 月批准两款器械。',
    source: 'SPYRAL HTN-ON MED、RADIANCE-HTN 试验；FDA 批准公告（2023-11）',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Renale_Denervation_Katholisches_Klinikum_Essen.jpg',
    imageCaption: '肾去神经术治疗示意图',
    imageCredit: 'Wikimedia Commons',
    sourceLinks: [
      { label: 'SPYRAL HTN-ON MED（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/35390320/' },
      { label: 'RADIANCE-HTN SOLO（Lancet 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/29803590/' },
      { label: 'FDA 批准公告（2023-11）', url: 'https://www.fda.gov/news-events/press-announcements/fda-roundup-november-17-2023' },
    ],
  },
  {
    id: 'd26', name: '高血压疫苗', nameEn: 'Hypertension vaccines', target: '血管紧张素 II 等',
    tech: '疫苗', stage: '早期在研', category: '降压',
    mechanism: '通过疫苗诱导机体产生针对血管紧张素 II 等靶点的抗体，长期抑制升压通路。',
    indication: '高血压（探索性方向）。',
    endpoint: '早期在研，尚未进入 III 期，尚未公布关键结果。',
    source: '综述文献；早期临床试验登记',
    image: null,
    imageCaption: '暂无实物图',
    imageCredit: '',
    sourceLinks: [
      { label: '高血压疫苗 · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=hypertension+vaccine+angiotensin+II' },
    ],
  },
];

// ---------------- 前沿技术雷达：研发事件（按时间倒序，截至 2026-11-24） ----------------
// type: 试验推进 | 结果公布 | 获批 | 失败/未达终点 | 指南更新
export const RADAR_EVENTS = [
  {
    id: 'e20', date: '2026-11-23', type: '结果公布', level: '重大',
    title: '英克司兰 ORION-4 III期试验达到主要终点：首个 siRNA 疗法的心血管结局证据',
    summary: '诺华宣布，英克司兰（Leqvio）心血管结局试验 ORION-4 达到主要终点：在标准降脂治疗基础上加用英克司兰，主要心血管事件（MACE，包括冠心病死亡、心梗、致死或非致死缺血性卒中、紧急冠脉血运重建）风险较安慰剂组出现统计学显著且有临床意义的降低，入组 16,000 余名已确诊动脉粥样硬化性心血管疾病患者。这是首个 siRNA 疗法的心血管结局证据。本次仅公布 topline 结果，未披露具体风险比等数值，完整数据计划 2027 年上半年发表；另一项结局试验 VICTORION-2 PREVENT 也预计 2027 年出结果。',
    source: '诺华公告（2026-11-23）；ClinicalTrials.gov NCT03705234',
    sourceLinks: [
      { label: '诺华公告（2026-11-23）· GlobeNewswire', url: 'https://www.globenewswire.com/news-release/2026/11/23/3408011/0/en/twice-yearly-leqvio-inclisiran-reduced-cardiovascular-event-risk-in-first-outcomes-study-of-an-sirna-therapy-in-ascvd.html' },
      { label: 'ClinicalTrials.gov NCT03705234', url: 'https://clinicaltrials.gov/study/NCT03705234' },
    ],
    drug: '英克司兰', target: 'PCSK9', tech: 'siRNA', stage: '已上市',
  },
  {
    id: 'e18', date: '2026-11-18', type: '试验推进', level: '一般',
    title: 'Scribe 在 AHA 2026 公布 STX-1150 / STX-1200 临床前数据：单次给药降脂效果持续两年',
    summary: 'Scribe Therapeutics 在 AHA 2026 年会公布 STX-1150 与 STX-1200 的临床前数据：STX-1150（CRISPR 表观遗传沉默疗法，靶向 PCSK9）在非人灵长类动物中单次给药后 LDL-C 降幅最高达 68%，治疗相关剂量下降幅超过 50% 并持续至少两年，且不改变 DNA 序列；STX-1200（CRISPR-CasX 基因编辑疗法，靶向 LPA 基因）单次给药后肝脏 LPA 编辑率超过 80%，血浆 Apo(a) 下降超过 95%。STX-1150 已进入 I 期临床试验，首批临床数据预计 2027 年上半年公布。',
    source: 'Scribe Therapeutics 公告（2026-11-18）；AHA 2026 年会',
    sourceLinks: [
      { label: 'Scribe 公告（2026-11-18）· GlobeNewswire', url: 'https://rss.globenewswire.com/news-release/2026/11/18/3405586/0/en/scribe-therapeutics-presents-new-data-advancing-the-potential-of-ultra-long-acting-genetic-medicines-for-cardiovascular-disease-at-aha-scientific-sessions-2026.html' },
    ],
    drug: 'STX-1150 / STX-1200', target: 'PCSK9 / LPA', tech: '基因编辑', stage: '早期在研',
  },
  {
    id: 'e19', date: '2026-11-18', type: '结果公布', level: '一般',
    title: 'Lp(a) 降低疗法网状 Meta 分析发表：siRNA 类药物降幅最大',
    summary: '发表于《内分泌学前沿》（Frontiers in Endocrinology）的系统评价与网状 Meta 分析纳入 83 项随机对照试验、46,984 名受试者，比较各类 Lp(a) 降低疗法的生化降幅：olpasiran 平均降幅最大（-92.06 个百分点），其次为 muvalaplin（-61.49）与 pelacarsen（-54.15）。作者提醒，证据确定性多为低或极低，且该分析只比较生化指标降幅，不回答心血管事件获益。',
    source: 'Zhao 等，Frontiers in Endocrinology（2026-11-18），DOI 10.3389/fendo.2026.1960814',
    sourceLinks: [
      { label: '网状 Meta 分析全文 · Frontiers', url: 'https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2026.1960814/full' },
    ],
    drug: '—', target: 'Lp(a)', tech: '—', stage: '—',
  },
  {
    id: 'e2', date: '2026-11-16', type: '获批', level: '重大',
    title: 'Baxdrostat 获欧洲药品管理局人用药品委员会（CHMP）积极意见',
    summary: '基于 BaxHTN 与 Bax24 两项 III期试验，CHMP 建议批准 baxdrostat（商品名 Baxfendy）用于成人高血压治疗。BaxHTN 中 2 mg 组 12 周诊室收缩压较基线下降 15.7 mmHg；Bax24 中 24 小时动态收缩压较基线下降 16.6 mmHg。',
    source: '阿斯利康公告（2026-11-16）；BaxHTN 试验（NEJM 2025）',
    sourceLinks: [
      { label: 'EMA Baxfendy 药品页', url: 'https://www.ema.europa.eu/en/medicines/human/EPAR/baxfendy' },
      { label: 'BaxHTN（NEJM 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40888730/' },
    ],
    drug: 'Baxdrostat', target: 'CYP11B2', tech: '小分子', stage: '已上市',
  },
  {
    id: 'e17', date: '2026-11-08', type: '结果公布', level: '重要',
    title: '信达 Tafolecimab（SINTBILO）CREDIT-5 III期达主要终点：单药 12 周 LDL-C 降幅超 60%',
    summary: '信达生物宣布，PCSK9 单抗 tafolecimab（商品名 SINTBILO）作为一线单药治疗的 III期 CREDIT-5 试验达到主要终点：198 名中国非家族性高胆固醇血症与混合型血脂异常患者中，12 周时 LDL-C 较基线下降 65.19%（150 mg 每两周）与 64.01%（450 mg 每四周），安慰剂组分别为 -6.61% 与 -4.31%；非 HDL-C、ApoB 与 Lp(a) 亦显著下降，Lp(a) 降幅近 50%。信达计划近期向 NMPA 提交新适应症申请。',
    source: '信达生物公告（2026-11-08），PRNewswire',
    sourceLinks: [
      { label: '信达生物公告（2026-11-08）· PRNewswire', url: 'https://www.prnewswire.com/news-releases/innovent-announces-phase-3-credit-5-study-met-primary-endpoint-sintbilo-tafolecimab-injection-as-first-line-monotherapy-treatment-for-hyperlipidemia-demonstrated-potent-lipid-lowering-efficacy-302932681.html' },
    ],
    drug: 'Tafolecimab', target: 'PCSK9', tech: '单克隆抗体', stage: 'III期完成',
  },
  {
    id: 'e1', date: '2026-11-07', type: '失败/未达终点', level: '重大',
    title: 'Pelacarsen 的 Lp(a)HORIZON III期试验未达到主要心血管终点',
    summary: '8,323 名已确诊心血管疾病且 Lp(a) 升高的患者中，pelacarsen 组主要终点发生率 12.3%，安慰剂组 12.1%，风险比 HR 1.02，未达统计学意义；尽管 Lp(a) 下降约 78%，心血管事件并未减少。诺华随后宣布终止 pelacarsen 的动脉粥样硬化性心血管疾病开发项目。这一结果并未否定 Lp(a) 本身的致病作用，后续 siRNA 药物的结局试验仍在进行中。',
    source: 'Lp(a)HORIZON 试验，2026 年 AHA 大会公布并发表于 NEJM；ClinicalTrials.gov NCT04023552',
    sourceLinks: [
      { label: 'Lp(a)HORIZON（NEJM 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/43001734/' },
      { label: 'ClinicalTrials.gov NCT04023552', url: 'https://clinicaltrials.gov/study/NCT04023552' },
    ],
    drug: 'Pelacarsen', target: 'Lp(a)', tech: '反义寡核苷酸', stage: 'III期完成',
  },
  {
    id: 'e16', date: '2026-11-03', type: '结果公布', level: '重要',
    title: 'SPYRAL AFFIRM 真实世界研究 6 个月结果公布：肾去神经术诊室收缩压下降 18.2 mmHg',
    summary: '美敦力在 TCT 2026 年会公布 SPYRAL AFFIRM 上市后研究 6 个月主要终点结果：美国主要终点队列 594 名未控制高血压患者接受 Symplicity Spyral 肾去神经术后，诊室收缩压较基线下降 18.2 mmHg，家庭血压下降 9.4 mmHg，24 小时动态血压下降 9.7 mmHg，降压药数量未增加；86.1% 的患者获得临床获益。同期 FDA 批准更新 Symplicity Spyral 标签，新增单纯收缩期高血压、3b 期以下慢性肾病与 2 型糖尿病患者的数据。',
    source: '美敦力公告（2026-11-03）；TCT 2026 年会；同期发表于 Circulation: Cardiovascular Interventions',
    sourceLinks: [
      { label: '美敦力公告（2026-11-03）', url: 'https://news.medtronic.com/2026-11-03-TCT26-Medtronic-Symplicity-blood-pressure-procedure-shows-significant-blood-pressure-drops-in-SPYRAL-AFFIRM-real-world-study' },
      { label: 'Healio 报道（2026-11-17）', url: 'https://www.healio.com/news/cardiology/20261117/radiofrequency-renal-denervation-safe-effective-in-largest-us-trial' },
    ],
    drug: '肾去神经术', target: '肾交感神经', tech: '器械', stage: '已上市',
  },
  {
    id: 'e3', date: '2026-09', type: '指南更新', level: '重要',
    title: '2026 年 ACC/AHA 血脂管理指南发布，强化 Lp(a) 检测与风险管理',
    summary: '新版指南进一步明确 Lp(a) 作为独立心血管危险因素的地位，强调对高危人群检测 Lp(a)，并结合整体风险进行管理；对在研 Lp(a) 降低药物的证据现状作了梳理，指出心血管结局证据仍在积累中。',
    source: 'ACC / AHA 血脂管理指南（2026 年）',
    sourceLinks: [
      { label: '2026 ACC/AHA 血脂指南 · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=2026+ACC%2FAHA+cholesterol+guideline' },
    ],
    drug: '—', target: 'Lp(a)', tech: '—', stage: '—',
  },
  {
    id: 'e14', date: '2026-07-16', type: '获批', level: '重大',
    title: 'Enlicitide（Lipfendra）获美国 FDA 批准：首款口服 PCSK9 抑制剂',
    summary: 'FDA 批准 Merck 的 enlicitide（商品名 Lipfendra）20 mg 每日一次口服，用于成人高胆固醇血症（含杂合子家族性高胆固醇血症），作为饮食与运动的辅助治疗。这是首款获批的口服 PCSK9 抑制剂。批准基于 CORALreef 项目两项 III期试验：CORALreef Lipids（2,909 人）24 周 LDL-C 较基线下降 57.1%，安慰剂校正降幅 55.8 个百分点；CORALreef HeFH 安慰剂校正降幅约 59%。心血管结局试验 CORALreef Outcomes（14,500 余人）正在进行中，尚未公布关键结果。',
    source: 'FDA 批准公告（2026-07）；Merck 公告（2026-07-16）；CORALreef Lipids 试验（NEJM 2026）',
    sourceLinks: [
      { label: 'FDA 批准公告（2026-07）', url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-oral-pcsk9-inhibitor-lower-ldl-cholesterol-adults-high-cholesterol' },
      { label: 'CORALreef Lipids（NEJM 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41879224/' },
      { label: 'ClinicalTrials.gov NCT05952856', url: 'https://clinicaltrials.gov/study/NCT05952856' },
    ],
    drug: 'Enlicitide', target: 'PCSK9', tech: '口服小分子', stage: '已上市',
  },
  {
    id: 'e15', date: '2026-05-15', type: '获批', level: '重大',
    title: 'Baxdrostat（Baxfendy）获美国 FDA 批准：首款醛固酮合成酶抑制剂',
    summary: 'FDA 批准阿斯利康的 baxdrostat（商品名 Baxfendy）用于联用治疗未控制高血压：成人患者在其他降压药控制不佳时加用，推荐剂量 2 mg 每日一次。这是首款获批的醛固酮合成酶抑制剂。批准基于 III期 BaxHTN 试验：2 mg 组 12 周诊室收缩压较基线下降 15.7 mmHg，安慰剂校正下降 9.8 mmHg。',
    source: 'FDA 批准文件（NDA 219878，2026-05-15）；阿斯利康公告（2026-05-18）',
    sourceLinks: [
      { label: 'FDA 批准文件（NDA 219878）', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/nda/2026/219878Orig1s000Approv.pdf' },
      { label: 'FDA 2026 年新药批准', url: 'https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2026' },
    ],
    drug: 'Baxdrostat', target: 'CYP11B2', tech: '小分子', stage: '已上市',
  },
  {
    id: 'e4', date: '2025-08-30', type: '结果公布', level: '重大',
    title: 'BaxHTN III期结果在 ESC 大会公布并发表于 NEJM',
    summary: '796 名未控制或难治性高血压患者随机接受 baxdrostat 1 mg、2 mg 或安慰剂，12 周时 2 mg 组诊室收缩压较基线下降 15.7 mmHg，安慰剂校正下降 9.8 mmHg；1 mg 组安慰剂校正下降 8.7 mmHg。两剂量均达到主要终点与全部次要终点。主要安全性关注点为高钾血症（2 mg 组血钾 > 6.0 mmol/L 占 3.0%，安慰剂组 0.4%）。',
    source: 'BaxHTN 试验（NEJM 2025），ClinicalTrials.gov NCT06034743；ESC 2025 大会',
    sourceLinks: [
      { label: 'BaxHTN（NEJM 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40888730/' },
      { label: 'ClinicalTrials.gov NCT06034743', url: 'https://clinicaltrials.gov/study/NCT06034743' },
    ],
    drug: 'Baxdrostat', target: 'CYP11B2', tech: '小分子', stage: 'III期完成',
  },
  {
    id: 'e5', date: '2025-08', type: '试验推进', level: '重要',
    title: 'Zilebesiran 进入 III期心血管结局试验 ZENITH',
    summary: 'Alnylam 与 Roche 宣布推进 zilebesiran 进入全球 III期结局试验 ZENITH，计划入组约 11,000 名未控制高血压合并已确诊心血管疾病或高危的患者，比较每半年注射一次 zilebesiran 300 mg 与安慰剂的心血管事件。',
    source: 'Alnylam / Roche 公告（2025-08）',
    sourceLinks: [
      { label: 'Roche / Alnylam 公告（2025-08-30）', url: 'https://www.roche.com/media/releases/med-cor-2025-08-30' },
    ],
    drug: 'Zilebesiran', target: 'AGT', tech: 'siRNA', stage: 'III期进行中',
  },
  {
    id: 'e6', date: '2025-03', type: '结果公布', level: '重要',
    title: 'KARDIA-2 试验结果发表：zilebesiran 联合常用降压药仍有效',
    summary: '在单药控制不佳的高血压患者中，单次注射 zilebesiran 300 mg 联合吲达帕胺、氨氯地平或奥美沙坦，3 个月时日间动态收缩压安慰剂校正下降约 8.7–12.1 mmHg，效果持续至 6 个月，三组背景用药结果一致。',
    source: 'KARDIA-2 试验（JAMA 2025）',
    sourceLinks: [
      { label: 'KARDIA-2（JAMA 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40434761/' },
    ],
    drug: 'Zilebesiran', target: 'AGT', tech: 'siRNA', stage: 'III期进行中',
  },
  {
    id: 'e7', date: '2024-03', type: '获批', level: '重要',
    title: 'Aprocitentan 获美国 FDA 批准用于难治性高血压',
    summary: 'Aprocitentan（商品名 Tryvio）成为首个获批用于难治性高血压的双重内皮素受体拮抗剂。PRECISION 试验中，4 周时诊室收缩压安慰剂校正下降约 3.8 mmHg，效果持续至 48 周。',
    source: 'FDA 批准公告（2024-03）；PRECISION 试验（Lancet 2022）',
    sourceLinks: [
      { label: 'FDA 新药批准 2024', url: 'https://www.fda.gov/drugs/novel-drug-approvals-fda/novel-drug-approvals-2024' },
      { label: 'PRECISION（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36356632/' },
    ],
    drug: 'Aprocitentan', target: '内皮素受体', tech: '小分子', stage: '已上市',
  },
  {
    id: 'e8', date: '2024-02', type: '结果公布', level: '重要',
    title: 'KARDIA-1 试验结果发表：降压 siRNA 单次注射降压持续半年',
    summary: '377 名轻中度高血压患者单次皮下注射 zilebesiran 150、300 或 600 mg，3 个月时 24 小时动态收缩压安慰剂校正下降分别为 14.1、16.7 和 15.7 mmHg，效果持续至 6 个月，血清血管紧张素原下降超过 90%。',
    source: 'KARDIA-1 试验（JAMA 2024）',
    sourceLinks: [
      { label: 'KARDIA-1（JAMA 2024）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/38363577/' },
    ],
    drug: 'Zilebesiran', target: 'AGT', tech: 'siRNA', stage: 'III期进行中',
  },
  {
    id: 'e9', date: '2023-11', type: '获批', level: '重要',
    title: '美国 FDA 批准两款肾去神经术器械',
    summary: 'FDA 批准 Medtronic Symplicity Spyral 与 Recor Paradise 两款肾去神经术器械，用于难治性高血压的器械治疗。多项随机对照试验显示，肾去神经术组诊室收缩压较对照组多降约 5–10 mmHg。',
    source: 'FDA 批准公告（2023-11）；SPYRAL HTN-ON MED、RADIANCE-HTN 试验',
    sourceLinks: [
      { label: 'FDA 批准公告（2023-11）', url: 'https://www.fda.gov/news-events/press-announcements/fda-roundup-november-17-2023' },
      { label: 'SPYRAL HTN-ON MED（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/35390320/' },
    ],
    drug: '肾去神经术', target: '肾交感神经', tech: '器械', stage: '已上市',
  },
  {
    id: 'e10', date: '2023-11', type: '结果公布', level: '重要',
    title: 'OCEAN(a)-DOSE 试验结果发表：olpasiran 使 Lp(a) 下降超过 95%',
    summary: '281 名已确诊动脉粥样硬化性心血管疾病且 Lp(a) 升高的患者中，olpasiran 高剂量组 36 周时 Lp(a) 安慰剂校正降幅达 -97.4%（75 mg 组）至 -101.1%（225 mg 每 12 周组），接近完全抑制。心血管结局试验 OCEAN(a)-Outcomes 随后启动。',
    source: 'OCEAN(a)-DOSE 试验（NEJM 2023）',
    sourceLinks: [
      { label: 'OCEAN(a)-DOSE · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=OCEAN%28a%29-DOSE+olpasiran' },
    ],
    drug: 'Olpasiran', target: 'LPA', tech: 'siRNA', stage: 'III期进行中',
  },
  {
    id: 'e11', date: '2023-04', type: '结果公布', level: '重要',
    title: 'CLEAR Outcomes 试验结果发表：贝派地酸降低心血管事件',
    summary: '13,970 名他汀不耐受患者中，贝派地酸 180 mg 每日一次，四组分主要心血管事件发生率 11.7%，安慰剂组 13.3%，风险比 HR 0.87；三组分次要终点 HR 0.85；6 个月 LDL-C 降幅约 21%。',
    source: 'CLEAR Outcomes 试验（NEJM 2023），ClinicalTrials.gov NCT02993406',
    sourceLinks: [
      { label: 'CLEAR Outcomes（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36876740/' },
      { label: 'ClinicalTrials.gov NCT02993406', url: 'https://clinicaltrials.gov/study/NCT02993406' },
    ],
    drug: '贝派地酸', target: 'ACL', tech: '小分子', stage: '已上市',
  },
  {
    id: 'e12', date: '2023-02', type: '结果公布', level: '一般',
    title: 'BrigHTN II期试验结果发表：baxdrostat 用于难治性高血压',
    summary: '248 名难治性高血压患者中，baxdrostat 2 mg 组 12 周时诊室收缩压安慰剂校正下降约 11 mmHg，醛固酮被抑制，治疗剂量下未见皮质醇合成受影响，为后续 III期试验奠定基础。',
    source: 'BrigHTN 试验（NEJM 2023）',
    sourceLinks: [
      { label: 'BrigHTN（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36342143/' },
    ],
    drug: 'Baxdrostat', target: 'CYP11B2', tech: '小分子', stage: 'III期完成',
  },
  {
    id: 'e13', date: '2020-03', type: '结果公布', level: '一般',
    title: 'ORION-10 / ORION-11 试验结果发表：英克司兰 LDL-C 降幅约 50%',
    summary: '两项 III期试验中，英克司兰维持期每半年皮下注射一次，LDL-C 降幅约 50%，耐受性总体良好。心血管结局试验 ORION-4 已于 2026-11-23 公布 topline 结果：达到主要终点，MACE 风险显著降低（具体数值未披露），完整数据计划 2027 年上半年发表。',
    source: 'ORION-10 / ORION-11 试验（NEJM 2020）',
    sourceLinks: [
      { label: 'ORION-10/11（NEJM 2020）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32187462/' },
    ],
    drug: '英克司兰', target: 'PCSK9', tech: 'siRNA', stage: '已上市',
  }
];

// ---------------- 试验追踪（16 项） ----------------
// status: 已完成（结果已公布） | 已完成（主要终点未达到） | 进行中 | 已完成
// 只有三个试验写了已核实的 ClinicalTrials.gov 编号，其余只写试验名。
export const TRIALS = [
  { id: 't1', trial: 'BaxHTN', drug: 'Baxdrostat', phase: 'III期', indication: '未控制 / 难治性高血压', endpoint: '12 周诊室收缩压较基线变化', status: '已完成（结果已公布）', result: '2 mg 组较基线 -15.7 mmHg，安慰剂校正 -9.8 mmHg（NEJM 2025）', nct: 'NCT06034743', changeLog: '2023-02 II期 BrigHTN 发表 → 2025-08 III期结果公布（NEJM）→ 2026-05 获美国 FDA 批准 → 2026-11 获 EMA CHMP 积极意见。',
     sourceLinks: [
      { label: 'BaxHTN（NEJM 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40888730/' },
      { label: 'ClinicalTrials.gov NCT06034743', url: 'https://clinicaltrials.gov/study/NCT06034743' },
    ], },
  { id: 't2', trial: 'Bax24', drug: 'Baxdrostat', phase: 'III期', indication: '难治性高血压', endpoint: '12 周 24 小时动态收缩压变化', status: '已完成（结果已公布）', result: '2 mg 组 24 小时动态收缩压较基线 -16.6 mmHg，安慰剂校正 -14.0 mmHg（Lancet 2025）', nct: '', changeLog: '2025 年完成并公布结果；与 BaxHTN 共同支撑监管审评。',
     sourceLinks: [
      { label: 'Bax24（Lancet 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41794437/' },
    ], },
  { id: 't3', trial: 'BrigHTN', drug: 'Baxdrostat', phase: 'II期', indication: '难治性高血压', endpoint: '12 周诊室收缩压变化', status: '已完成（结果已公布）', result: '2 mg 组安慰剂校正下降约 11 mmHg（NEJM 2023）', nct: '', changeLog: '2023-02 结果发表；HALO 试验（未控制高血压）同期未达主要终点。',
     sourceLinks: [
      { label: 'BrigHTN（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36342143/' },
    ], },
  { id: 't4', trial: 'KARDIA-1', drug: 'Zilebesiran', phase: 'II期', indication: '轻中度高血压', endpoint: '3 个月 24 小时平均收缩压变化', status: '已完成（结果已公布）', result: '300 mg 组安慰剂校正 -16.7 mmHg，效果持续至 6 个月（JAMA 2024）', nct: '', changeLog: '2024-02 结果发表 → 2025 年进入 III期 ZENITH。',
     sourceLinks: [
      { label: 'KARDIA-1（JAMA 2024）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/38363577/' },
    ], },
  { id: 't5', trial: 'KARDIA-2', drug: 'Zilebesiran', phase: 'II期', indication: '单药控制不佳的高血压', endpoint: '3 个月日间动态收缩压变化', status: '已完成（结果已公布）', result: '联合背景用药，安慰剂校正下降约 8.7–12.1 mmHg（JAMA 2025）', nct: '', changeLog: '2025-03 结果发表。',
     sourceLinks: [
      { label: 'KARDIA-2（JAMA 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40434761/' },
    ], },
  { id: 't6', trial: 'ZENITH', drug: 'Zilebesiran', phase: 'III期', indication: '未控制高血压合并心血管疾病或高危', endpoint: '主要心血管事件（MACE）', status: '进行中', result: '在研中，尚未公布关键结果', nct: '', changeLog: '2025-08 启动，计划入组约 11,000 人，覆盖约 35 个国家。',
     sourceLinks: [
      { label: 'Roche / Alnylam 公告（2025-08-30）', url: 'https://www.roche.com/media/releases/med-cor-2025-08-30' },
    ], },
  { id: 't7', trial: 'ORION-10 / ORION-11', drug: '英克司兰', phase: 'III期', indication: '动脉粥样硬化性心血管疾病 / 高危', endpoint: 'LDL-C 降幅', status: '已完成（结果已公布）', result: 'LDL-C 降幅约 50%（NEJM 2020）', nct: '', changeLog: '2020-03 结果发表；2026-11-23 结局试验 ORION-4 公布 topline 结果：达到主要终点，MACE 风险显著降低（具体数值未披露），完整数据计划 2027 年上半年发表。',
     sourceLinks: [
      { label: 'ORION-10/11（NEJM 2020）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32187462/' },
    ], },
  { id: 't16', trial: 'ORION-4', drug: '英克司兰', phase: 'III期', indication: '已确诊动脉粥样硬化性心血管疾病', endpoint: '主要心血管事件（MACE）', status: '已完成（结果已公布）', result: '达到主要终点：MACE 风险统计学显著且有临床意义地降低（topline 结果，具体数值未披露）；完整数据计划 2027 年上半年发表', nct: 'NCT03705234', changeLog: '2026-11-23 诺华公布 topline 结果，达到主要终点；完整数据计划 2027 年上半年发表。',
     sourceLinks: [
      { label: 'ORION-4 topline 结果 · 诺华公告（2026-11-23）', url: 'https://www.globenewswire.com/news-release/2026/11/23/3408011/0/en/twice-yearly-leqvio-inclisiran-reduced-cardiovascular-event-risk-in-first-outcomes-study-of-an-sirna-therapy-in-ascvd.html' },
      { label: 'ClinicalTrials.gov NCT03705234', url: 'https://clinicaltrials.gov/study/NCT03705234' },
    ], },
  { id: 't8', trial: 'FOURIER', drug: '依洛尤单抗', phase: 'III期', indication: '已确诊动脉粥样硬化性心血管疾病', endpoint: '主要心血管事件（MACE）', status: '已完成（结果已公布）', result: 'LDL-C 降幅约 59%，MACE HR 0.85（NEJM 2017）', nct: '', changeLog: '2017 年结果发表；长期随访持续进行中。',
     sourceLinks: [
      { label: 'FOURIER（NEJM 2017）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/28304224/' },
    ], },
  { id: 't9', trial: 'ODYSSEY OUTCOMES', drug: '阿利西尤单抗', phase: 'III期', indication: '急性冠脉综合征后', endpoint: '主要心血管事件（MACE）', status: '已完成（结果已公布）', result: 'MACE HR 0.85（NEJM 2018）', nct: '', changeLog: '2018 年结果发表。',
     sourceLinks: [
      { label: 'ODYSSEY OUTCOMES（NEJM 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30403574/' },
    ], },
  { id: 't10', trial: 'CLEAR Outcomes', drug: '贝派地酸', phase: 'III期', indication: '他汀不耐受', endpoint: '四组分 MACE', status: '已完成（结果已公布）', result: '四组分 MACE HR 0.87（11.7% vs 13.3%），三组分 MACE HR 0.85（NEJM 2023）', nct: 'NCT02993406', changeLog: '2023-04 结果发表；13,970 名患者，中位随访 40.6 个月。',
     sourceLinks: [
      { label: 'CLEAR Outcomes（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36876740/' },
      { label: 'ClinicalTrials.gov NCT02993406', url: 'https://clinicaltrials.gov/study/NCT02993406' },
    ], },
  { id: 't11', trial: 'Lp(a)HORIZON', drug: 'Pelacarsen', phase: 'III期', indication: '已确诊心血管疾病且 Lp(a) 升高', endpoint: '主要心血管事件（MACE）', status: '已完成（主要终点未达到）', result: '主要终点 12.3% vs 12.1%，HR 1.02（NEJM 2026-11-07）；开发项目已终止', nct: 'NCT04023552', changeLog: '2026-09 申办方公布 topline 未达终点 → 2026-11-07 AHA 大会公布完整结果并发表于 NEJM → 诺华宣布终止 ASCVD 开发项目。',
     sourceLinks: [
      { label: 'Lp(a)HORIZON（NEJM 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/43001734/' },
      { label: 'ClinicalTrials.gov NCT04023552', url: 'https://clinicaltrials.gov/study/NCT04023552' },
    ], },
  { id: 't12', trial: 'OCEAN(a)-DOSE', drug: 'Olpasiran', phase: 'II期', indication: '已确诊动脉粥样硬化性心血管疾病且 Lp(a) 升高', endpoint: 'Lp(a) 降幅', status: '已完成（结果已公布）', result: '高剂量组 Lp(a) 降幅超过 95%（NEJM 2023）；结局试验 OCEAN(a)-Outcomes 进行中', nct: '', changeLog: '2023-11 结果发表 → III期 OCEAN(a)-Outcomes 进行中，尚未公布关键结果。',
     sourceLinks: [
      { label: 'OCEAN(a)-DOSE · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=OCEAN%28a%29-DOSE+olpasiran' },
    ], },
  { id: 't13', trial: 'ACCLAIM-Lp(a)', drug: 'Lepodisiran', phase: 'III期', indication: '动脉粥样硬化性心血管疾病或高危', endpoint: '主要心血管事件（MACE）', status: '进行中', result: '在研中，尚未公布关键结果', nct: '', changeLog: 'II期显示 Lp(a) 降幅约 94% 且持续 12 个月以上；III期进行中。',
     sourceLinks: [
      { label: 'ACCLAIM-Lp(a) · PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=ACCLAIM-Lp%28a%29+lepodisiran' },
    ], },
  { id: 't14', trial: 'PRECISION', drug: 'Aprocitentan', phase: 'III期', indication: '难治性高血压', endpoint: '4 周诊室收缩压变化', status: '已完成（结果已公布）', result: '安慰剂校正下降约 3.8 mmHg，效果持续至 48 周（Lancet 2022）；2024-03 美国 FDA 批准', nct: '', changeLog: '2022 年结果发表 → 2024-03 FDA 批准用于难治性高血压。',
     sourceLinks: [
      { label: 'PRECISION（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36356632/' },
    ], },
  { id: 't15', trial: 'SPYRAL HTN-ON MED / RADIANCE-HTN', drug: '肾去神经术', phase: 'II–III期', indication: '难治性 / 轻中度高血压', endpoint: '诊室与动态收缩压变化', status: '已完成（结果已公布）', result: '诊室收缩压较对照组多降约 5–10 mmHg；2023-11 美国 FDA 批准两款器械', nct: '', changeLog: '多项试验陆续发表 → 2023-11 FDA 批准器械，纳入临床可选方案。',
     sourceLinks: [
      { label: 'SPYRAL HTN-ON MED（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/35390320/' },
      { label: 'RADIANCE-HTN SOLO（Lancet 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/29803590/' },
    ], },
];

// ---------------- 医学证据分析 ----------------
export const EVIDENCE_SBP = [
  { drug: 'Baxdrostat 2 mg（BaxHTN）', population: '未控制 / 难治性高血压', result: '安慰剂校正 -9.8 mmHg（12 周诊室 SBP）', type: '替代终点', source: 'NEJM 2025',
    sourceLinks: [
      { label: 'BaxHTN（NEJM 2025）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40888730/' },
    ], },
  { drug: 'Zilebesiran 300 mg（KARDIA-1）', population: '轻中度高血压', result: '安慰剂校正 -16.7 mmHg（3 个月 24 h 动态 SBP）', type: '替代终点', source: 'JAMA 2024',
    sourceLinks: [
      { label: 'KARDIA-1（JAMA 2024）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/38363577/' },
    ], },
  { drug: 'Aprocitentan（PRECISION）', population: '难治性高血压', result: '安慰剂校正约 -3.8 mmHg（4 周诊室 SBP）', type: '替代终点', source: 'Lancet 2022',
    sourceLinks: [
      { label: 'PRECISION（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36356632/' },
    ], },
  { drug: '肾去神经术（SPYRAL / RADIANCE）', population: '难治性 / 轻中度高血压', result: '较对照组多降约 5–10 mmHg（诊室 SBP）', type: '替代终点', source: 'SPYRAL HTN-ON MED、RADIANCE-HTN',
    sourceLinks: [
      { label: 'SPYRAL HTN-ON MED（Lancet 2022）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/35390320/' },
      { label: 'RADIANCE-HTN SOLO（Lancet 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/29803590/' },
    ], },
  { drug: '常用单药（ACEI / ARB / CCB / 利尿剂）', population: '高血压', result: '平均降收缩压约 10 mmHg', type: '替代终点', source: '荟萃分析；《中国高血压防治指南（2024 年修订版）》',
    sourceLinks: [
      { label: '中国高血压防治指南（2024年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E9%AB%98%E8%A1%80%E5%8E%8B%E9%98%B2%E6%B2%BB%E6%8C%87%E5%8D%97+2024' },
    ], },
];

export const EVIDENCE_LDL = [
  { drug: '高强度他汀', result: 'LDL-C 降幅 ≥ 50%', note: '一线基础治疗', source: '《中国血脂管理指南（2023 年）》',
    sourceLinks: [
      { label: '中国血脂管理指南（2023年）· PubMed检索', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=%E4%B8%AD%E5%9B%BD%E8%A1%80%E8%84%82%E7%AE%A1%E7%90%86%E6%8C%87%E5%8D%97+2023' },
    ], },
  { drug: '依折麦布（单药）', result: 'LDL-C 降幅约 18%–25%', note: '常与他汀联用', source: '药品说明书；IMPROVE-IT',
    sourceLinks: [
      { label: 'IMPROVE-IT（NEJM 2015）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/26039521/' },
    ], },
  { drug: 'PCSK9 单抗（依洛尤 / 阿利西尤）', result: 'LDL-C 降幅约 50%–60%', note: '皮下注射，两周或一月一次', source: 'FOURIER、ODYSSEY OUTCOMES',
    sourceLinks: [
      { label: 'FOURIER（NEJM 2017）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/28304224/' },
      { label: 'ODYSSEY OUTCOMES（NEJM 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30403574/' },
    ], },
  { drug: '英克司兰（siRNA）', result: 'LDL-C 降幅约 50%', note: '维持期半年注射一次', source: 'ORION-10 / ORION-11（NEJM 2020）',
    sourceLinks: [
      { label: 'ORION-10/11（NEJM 2020）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32187462/' },
    ], },
  { drug: '贝派地酸', result: 'LDL-C 降幅约 21%（6 个月）', note: '他汀不耐受人群', source: 'CLEAR Outcomes（NEJM 2023）',
    sourceLinks: [
      { label: 'CLEAR Outcomes（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36876740/' },
    ], },
  { drug: '依维那库单抗', result: 'LDL-C 降幅约 49%（HoFH）', note: '纯合子家族性高胆固醇血症', source: 'ELIPSE（NEJM 2020）',
    sourceLinks: [
      { label: 'ELIPSE（NEJM 2020）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/32813947/' },
    ], },
  { drug: 'Obicetrapib（在研）', result: 'LDL-C 降幅约 40%', note: 'III期结局试验进行中', source: 'BROOKLYN / BROADWAY',
    sourceLinks: [
      { label: 'BROOKLYN（Nat Med 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41760952/' },
    ], },
];

export const EVIDENCE_MACE = [
  { drug: '依洛尤单抗（FOURIER）', result: 'HR 0.85', note: '主要心血管事件风险下降约 15%', source: 'NEJM 2017',
    sourceLinks: [
      { label: 'FOURIER（NEJM 2017）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/28304224/' },
    ], },
  { drug: '阿利西尤单抗（ODYSSEY OUTCOMES）', result: 'HR 0.85', note: '主要心血管事件风险下降约 15%', source: 'NEJM 2018',
    sourceLinks: [
      { label: 'ODYSSEY OUTCOMES（NEJM 2018）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/30403574/' },
    ], },
  { drug: '贝派地酸（CLEAR Outcomes）', result: 'HR 0.87（四组分）/ 0.85（三组分）', note: '他汀不耐受人群', source: 'NEJM 2023',
    sourceLinks: [
      { label: 'CLEAR Outcomes（NEJM 2023）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/36876740/' },
    ], },
  { drug: '依折麦布 + 他汀（IMPROVE-IT）', result: 'HR 0.936', note: '急性冠脉综合征后', source: 'NEJM 2015',
    sourceLinks: [
      { label: 'IMPROVE-IT（NEJM 2015）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/26039521/' },
    ], },
  { drug: '英克司兰（ORION-4）', result: '达到主要终点（topline，未披露具体数值）', note: '首个 siRNA 疗法的心血管结局证据；完整数据待 2027 年上半年发表', source: '诺华公告 2026-11-23',
    sourceLinks: [
      { label: 'ORION-4 topline 结果 · 诺华公告（2026-11-23）', url: 'https://www.globenewswire.com/news-release/2026/11/23/3408011/0/en/twice-yearly-leqvio-inclisiran-reduced-cardiovascular-event-risk-in-first-outcomes-study-of-an-sirna-therapy-in-ascvd.html' },
      { label: 'ClinicalTrials.gov NCT03705234', url: 'https://clinicaltrials.gov/study/NCT03705234' },
    ], },
  { drug: 'Pelacarsen（Lp(a)HORIZON）', result: 'HR 1.02（未达终点）', note: 'Lp(a) 下降约 78% 但事件未减少', source: 'NEJM 2026-11-07',
    sourceLinks: [
      { label: 'Lp(a)HORIZON（NEJM 2026）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/43001734/' },
    ], },
  { drug: '收缩压每降 10 mmHg（荟萃分析）', result: '主要心血管事件风险比约 0.80', note: '降压治疗的硬终点获益', source: '荟萃分析（Ettehad 等，Lancet 2016）',
    sourceLinks: [
      { label: 'Ettehad 等（Lancet 2016）· PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/26724178/' },
    ], },
];

export const EVIDENCE_NOTE =
  '怎么看这些数字：血压降幅、LDL-C 降幅、达标率属于替代终点——它们能说明药物起效，但不等于直接证明能减少心梗、卒中。' +
  'MACE（主要心血管事件）风险比属于硬终点，直接回答“能不能减少发病”。' +
  '一个药要同时看两类证据：替代终点好、硬终点还没做完的（例如 zilebesiran、olpasiran），结论要等结局试验；' +
  '替代终点好但硬终点未达标的（例如 pelacarsen），要如实记录失败，而不是只写降幅。';
