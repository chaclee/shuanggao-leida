import { useEffect, useState } from 'react';

// 第一期：数据只存在本机浏览器 localStorage，不上传服务器，换设备不共享。
// 键名 sgld_*，第二期接 D1 时再按 schema.sql 的表结构迁移。

const KEYS = {
  bp: 'sgld_bp_readings',
  lipid: 'sgld_lipid_tests',
  weight: 'sgld_weights',
  med: 'sgld_medications',
  seeded: 'sgld_sample_seeded',
  cleared: 'sgld_sample_cleared',
};

function isCleared() {
  try {
    return localStorage.getItem(KEYS.cleared) === '1';
  } catch {
    return false;
  }
}

export function loadList(key, fallback) {
  try {
    const raw = localStorage.getItem(KEYS[key]);
    if (raw) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : fallback;
    }
    // 用户已一键清空示例：刷新后不再用示例数据回填。
    return isCleared() ? [] : fallback;
  } catch {
    return fallback;
  }
}

export function useRecords(key, sample) {
  const [list, setList] = useState(() => loadList(key, sample));
  const [isSample, setIsSample] = useState(() => {
    try {
      return localStorage.getItem(KEYS.seeded) === '1' && !localStorage.getItem(KEYS[key]);
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(KEYS[key], JSON.stringify(list));
    } catch {
      // 浏览器存储空间不足等情况：只提示，不丢数据（内存里仍可用）
    }
  }, [key, list]);

  const add = (item) => {
    setList((prev) => [...prev, { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }]);
    setIsSample(false);
  };
  const update = (id, item) => {
    setList((prev) => prev.map((r) => (r.id === id ? { ...r, ...item } : r)));
    setIsSample(false);
  };
  const remove = (id) => {
    setList((prev) => prev.filter((r) => r.id !== id));
    setIsSample(false);
  };
  const clearAll = () => {
    setList([]);
    setIsSample(false);
  };
  // 恢复示例数据（仅用于演示；示例数据全部是虚构的，与任何真实个人无关）
  const restoreSample = () => {
    setList(sample);
    setIsSample(true);
    try {
      localStorage.removeItem(KEYS.cleared);
      localStorage.setItem(KEYS.seeded, '1');
    } catch {
      /* ignore */
    }
  };
  return { list, add, update, remove, clearAll, restoreSample, isSample };
}

export function useSampleFlag() {
  const [flag, setFlag] = useState(() => {
    try {
      return localStorage.getItem(KEYS.seeded) === '1';
    } catch {
      return false;
    }
  });
  return [flag, setFlag];
}

// 首次打开且本地没有任何记录时，写入示例数据并打上“示例”标记。
export function seedIfEmpty(sampleMap) {
  try {
    const anyData = Object.keys(KEYS)
      .filter((k) => k !== 'seeded')
      .some((k) => localStorage.getItem(KEYS[k]));
    if (anyData || localStorage.getItem(KEYS.seeded)) return false;
    Object.entries(sampleMap).forEach(([k, v]) => {
      localStorage.setItem(KEYS[k], JSON.stringify(v));
    });
    localStorage.setItem(KEYS.seeded, '1');
    return true;
  } catch {
    return false;
  }
}

export function clearAllSampleData() {
  try {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    localStorage.setItem(KEYS.cleared, '1');
  } catch {
    /* ignore */
  }
}
