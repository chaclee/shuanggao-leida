-- 双高雷达 · D1 表结构（第二期才用）
-- 第一期不依赖本文件、不接后端，数据只存在本机浏览器 localStorage。
-- 第二期启用云端存储时再执行：
--   wrangler d1 create shuanggao_leida
--   wrangler d1 execute shuanggao_leida --remote --file=schema.sql
-- 注意：第二期上线前需单独确认账号、登录与隐私方案；不要把任何密钥写进本文件。

CREATE TABLE IF NOT EXISTS bp_readings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT '',
  datetime TEXT NOT NULL,          -- ISO 本地时间，如 2026-11-17T07:30
  sys INTEGER NOT NULL,            -- 收缩压 mmHg
  dia INTEGER NOT NULL,            -- 舒张压 mmHg
  hr INTEGER,                      -- 心率 次/分
  arm TEXT NOT NULL DEFAULT '左臂', -- 左臂 / 右臂
  posture TEXT NOT NULL DEFAULT '坐姿', -- 坐姿 / 平躺 / 站立
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_bp_user_time ON bp_readings(user_id, datetime);

CREATE TABLE IF NOT EXISTS lipid_tests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,              -- 化验日期 YYYY-MM-DD
  tc REAL NOT NULL,                -- 总胆固醇 mmol/L
  ldl REAL NOT NULL,               -- LDL-C mmol/L
  hdl REAL,                        -- HDL-C mmol/L
  tg REAL,                         -- 甘油三酯 mmol/L
  apob REAL,                       -- ApoB g/L
  lpa REAL,                        -- Lp(a) mg/L
  weight REAL,                     -- 体重 kg
  risk TEXT NOT NULL DEFAULT '中高危', -- 低危 / 中高危 / 极高危 / 超高危
  baseline_ldl REAL,               -- 基线 LDL-C（用于算降幅）
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_lipid_user_date ON lipid_tests(user_id, date);

CREATE TABLE IF NOT EXISTS weights (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,              -- YYYY-MM-DD
  weight REAL NOT NULL,            -- kg
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_weights_user_date ON weights(user_id, date);

CREATE TABLE IF NOT EXISTS medications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,              -- 药名
  dose TEXT NOT NULL,              -- 剂量，如 20mg
  freq TEXT NOT NULL,              -- 频次，如 每晚 1 次 / 半年 1 次
  start_date TEXT NOT NULL,        -- 开始日期 YYYY-MM-DD
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_med_user ON medications(user_id);
