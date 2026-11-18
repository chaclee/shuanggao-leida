import { Typography } from 'antd';

const { Text } = Typography;

// 统一渲染可点击的来源链接：label 是来源名，点开到原始出处。
// links 为空时不渲染任何内容，不破坏原有版面。
export default function SourceLinks({ links, prefix = '来源', style }) {
  if (!links || !links.length) return null;
  return (
    <span style={style}>
      {prefix}：
      {links.map((l, i) => (
        <span key={`${l.url}-${i}`}>
          {i > 0 && ' · '}
          <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
        </span>
      ))}
    </span>
  );
}

// 保留原文字来源、只在后面补链接的用法（雷达、药物详情、文章详情）。
export function SourceText({ text, links, prefix = '来源链接' }) {
  return (
    <span>
      <Text type="secondary">{text}</Text>
      {links && links.length > 0 && (
        <>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            <SourceLinks links={links} prefix={prefix} />
          </Text>
        </>
      )}
    </span>
  );
}
