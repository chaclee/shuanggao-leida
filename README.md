# 双高雷达 · 高血压高血脂科普与记录

高血压 + 高血脂患者版网站，科普 + 自我管理方向，参考 OncoRadar 的骨架但只做患者版。
用 **Vite + React 18 + Ant Design 5** 开发，亮色、日光风格，手机端可用。

## 第一期只做这些

- **数据收集**（数据只存在本机浏览器 localStorage，不上传服务器，换设备不共享）：
  - 血压记录：日期时间、收缩压、舒张压、心率、左/右臂、坐姿、备注；合理范围校验；
    7 天表视图 + 早晚平均，家庭血压 135/85 目标线标出。
  - 血脂化验：日期、TC、LDL-C、HDL-C、TG、ApoB、Lp(a)、体重；按《中国血脂管理指南（2023 年）》
    分层对照 LDL-C 目标（低危 < 3.4、中高危 < 2.6、极高危 < 1.8 且降幅 > 50%、超高危 < 1.4 且降幅 > 50%）。
  - 体重记录：日期、体重 kg。
  - 用药记录：药名、剂量、频次、开始日期、备注；不做用药推荐。
  - 每类记录都可新增、编辑、删除、导出 CSV；内置示例数据明确标为“示例”，可一键清空。
- **信息展示**：
  - 首页概览：最新血压、最新 LDL-C、记录条数、近期趋势卡片。
  - 科普库：13 篇简体中文科普（基础、用药、生活方式、误区），每篇写明依据来源与版本。
  - 正确测压指南：测前准备、坐姿、袖带、早晚对比、晨峰、白大衣效应、手臂与腿的区别（步骤 + 常见问题）。
  - 指南目标页：诊室血压 < 140/90、家庭血压 < 135/85，血脂分层目标同上。
  - 全站页脚与科普页顶部均有免责声明：本站仅提供科普与记录工具，不构成诊疗建议，用药请遵医嘱。

## 第一期明确没做的事

登录、提醒、用药推荐、风险评估、个性化建议、家属共享、医生端、蓝牙血压计对接、
自动爬取数据、D1 云端存储（`schema.sql` 只写好表结构，第二期才用）。

## 本地运行

```bash
npm install
npm run dev      # 开发模式，浏览器打开提示的地址
npm run build    # 构建，产物在 dist/
npm run preview  # 本地预览构建产物
```

## 部署到 Cloudflare Pages（照儿童站那套）

儿童站（kids-drawing-site）就是这么部署的：代码推 GitHub，Cloudflare Pages 连接仓库，
push 到 main 自动部署。本站已按同一模式准备好 `wrangler.toml`（Pages 配置，输出目录 `dist`）。

### 方式 A（推荐，Git 自动部署）

1. 在 GitHub 新建仓库，建议名 `shuanggao-leida`（与本站同名，好认）：
   ```bash
   cd shuanggao-leida
   git init
   git add .
   git commit -m "双高雷达第一期：数据收集 + 信息展示"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/shuanggao-leida.git
   git push -u origin main
   ```
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，
   选刚建的仓库。
3. 构建设置：Framework preset 选 `Vite`（构建命令 `npm run build`，输出目录 `dist`），
   生产分支 `main`，点 Save and Deploy。
4. 部署成功后得到 `https://shuanggao-leida.pages.dev`，可再绑定自定义域名。
5. 以后每次改完，`git push` 到 main 就会自动重新部署。

### 方式 B（CLI 手动部署）

```bash
npm run build
npx wrangler pages deploy dist --project-name=shuanggao-leida
```

## 第二期（不在本期做）

- 接入 D1：先 `wrangler d1 create shuanggao_leida`，记下 database_id 填到 `wrangler.toml`
  注释处，再执行 `wrangler d1 execute shuanggao_leida --remote --file=schema.sql` 建表
  （`bp_readings`、`lipid_tests`、`weights`、`medications` 四张表）。
- 上线前需单独确认账号、登录与隐私方案；不要把任何 token、密钥、密码写进代码或配置文件。

## 隐私

第一期没有账号系统、不收集个人信息、不上传任何记录。所有数据只存在使用者自己的浏览器里；
想彻底删除，在站内“我的数据”页点“一键清空示例数据”，或在浏览器设置里清除本站数据即可。
