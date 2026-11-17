import { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Table, message } from 'antd';
import { downloadCSV, toCSV } from '../lib/stats';

// 通用记录管理：新增 / 编辑 / 删除 / 导出 CSV。
// fields: [{ key, label, type, options, min, max, required, placeholder }]
// columns: antd Table columns（不含操作列）；csvColumns: [{ label, value }]

export default function RecordSection({ title, fields, columns, csvColumns, fileName, store, extra }) {
  const { list, add, update, remove, clearAll } = store;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openAdd = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };
  const openEdit = (rec) => {
    setEditing(rec);
    form.setFieldsValue(rec);
    setOpen(true);
  };
  const onOk = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        update(editing.id, values);
        message.success('已更新');
      } else {
        add(values);
        message.success('已新增');
      }
      setOpen(false);
    } catch {
      /* 校验未通过，表单会标红 */
    }
  };
  const onExport = () => {
    if (!list.length) {
      message.warning('暂无数据可导出');
      return;
    }
    downloadCSV(fileName, toCSV(list, csvColumns));
    message.success('已导出 CSV');
  };

  const tableColumns = [
    ...columns,
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 130,
      render: (_, rec) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => openEdit(rec)}>编辑</Button>
          <Popconfirm title="确定删除这条记录吗？" onConfirm={() => { remove(rec.id); message.success('已删除'); }}>
            <Button type="link" size="small" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space wrap style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openAdd}>新增记录</Button>
        <Button onClick={onExport}>导出 CSV</Button>
        <Popconfirm
          title="确定清空本页全部记录吗？清空后无法恢复。"
          onConfirm={() => { clearAll(); message.success('已清空'); }}
        >
          <Button danger disabled={!list.length}>清空全部</Button>
        </Popconfirm>
      </Space>
      {extra}
      <Table
        rowKey="id"
        dataSource={[...list].sort((a, b) => String(b.date || b.datetime || '').localeCompare(String(a.date || a.datetime || '')))}
        columns={tableColumns}
        scroll={{ x: 720 }}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        locale={{ emptyText: '暂无记录，点击“新增记录”开始记第一条' }}
      />
      <Modal
        title={editing ? `编辑${title}` : `新增${title}`}
        open={open}
        onOk={onOk}
        onCancel={() => setOpen(false)}
        okText="保存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          {fields.map((f) => (
            <Form.Item
              key={f.key}
              name={f.key}
              label={f.label}
              rules={[
                { required: !!f.required, message: `请填写${f.label}` },
                ...(f.type === 'number'
                  ? [{ type: 'number', min: f.min, max: f.max, message: `${f.label}应在 ${f.min}～${f.max} 之间` }]
                  : []),
              ]}
            >
              {f.type === 'select' ? (
                <Select options={f.options.map((o) => ({ value: o, label: o }))} placeholder={f.placeholder || `请选择${f.label}`} />
              ) : f.type === 'number' ? (
                <InputNumber style={{ width: '100%' }} placeholder={f.placeholder || ''} step={f.step || 0.1} />
              ) : f.type === 'datetime' ? (
                <Input type="datetime-local" />
              ) : f.type === 'date' ? (
                <Input type="date" />
              ) : (
                <Input placeholder={f.placeholder || ''} />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
}
