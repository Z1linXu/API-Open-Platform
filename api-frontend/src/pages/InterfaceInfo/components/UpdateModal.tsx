import {
  ProColumns, ProTable,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();

// 防止修改的表单内容一直是同一个内容,要监听values的变化
// 使用React的useEffect在值改变时更新表单的值
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);

// 返回模态框组件
  return (
    // 创建一个Modal组件,通过visible属性控制其显示或隐藏,footer设置为null把表单项的'取消'和'确认'按钮去掉
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      {/* 创建一个ProTable组件,设定它为表单类型,将表单实例绑定到ref,通过columns属性设置表格的列，提交表单时调用onSubmit函数 */}
      <ProTable type="form" formRef={formRef} columns={columns} onSubmit={async (value) => {onSubmit?.(value);}} />
    </Modal>
  );
};

export default UpdateModal;
