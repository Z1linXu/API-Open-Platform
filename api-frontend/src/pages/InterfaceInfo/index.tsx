import { removeRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer,  message } from 'antd';
import React, { useRef, useState } from 'react';
import {
  addInterfaceInfo, deleteInterfaceInfo,
  listInterfaceInfoByPage,
  updateInterfaceInfo
} from "@/services/api-backend/interfaceInfoController";
import {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/InterfaceInfo/components/UpdateModal";






const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('Loading...');
    try {
      await addInterfaceInfo({ ...fields });
      hide();
      message.success('Added successfully');
      handleUpdateModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('Adding failed, please try again!' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    if(!currentRow){
      return ;
    }
    const hide = message.loading('loading');
    try {
      await updateInterfaceInfo({
        id: currentRow.id,
          ...fields
      }
      );
      hide();
      message.success('Update successful');
      return true;
    } catch (error: any) {
      hide();
      message.error('Update failed, please try again!'+ error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfo({
        id:record.id
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('Delete failed, please try again' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps:{
        rules: [{
          required: true,
        }]

      }

      // 可以添加注释等信息
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'Method',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: 'RequestHeader',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: 'ResponseHeader',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'Default', status: 'Default' },
        1: { text: 'Processing', status: 'Processing' },
      },
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm:true,
    },
    {
      title: 'UpdateTime',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm:true,

    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="config" onClick={() => { handleUpdateModalOpen(true); setCurrentRow(record); }}>
          Edit
        </a>,
        <a
          key = "config"
          onClick = {()=> {
            handleRemove(record);
          }}
        >
          Delete
        </a>
      ],
    },
  ];


  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
          const res: any = await listInterfaceInfoByPage({...params});
          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res.data.total || 0,
            };
          }
          else {
            return {
              data: [],
              success: false,
              total:0,
            }
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      {/* 创建一个CreateModal组件，用于在点击新增按钮时弹出 */}
      <CreateModal
        columns={columns}
        // 当取消按钮被点击时,设置更新模态框为false以隐藏模态窗口
        onCancel={() => {handleModalOpen(false);}}
        // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据
        // (这里的报错不用管,可能里面组件的属性和外层的不一致)
        onSubmit={(values) => {handleAdd(values);}}
        // 根据更新窗口的值决定模态窗口是否显示
        visible={createModalOpen}
      />

    </PageContainer>
  );
};

export default TableList;
