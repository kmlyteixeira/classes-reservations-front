import { useSearchFilter } from "@/commons/hooks/search-filter/useSearchFilter";
import ConfirmModal from "@/commons/modal/ConfirmModal";
import RecordDrawer, { RequestType } from "@/components/drawer/RecordDrawer";
import RecordForm, { GroupedFormItem } from "@/components/form/RecordForm";
import AppPage from "@/components/layouts/app/AppPage";
import MainBreadcrumb from "@/components/layouts/main-breadcrumb/MainBreadcrumb";
import { ProfilesType, profiles, profilesTagColor } from "@/interfaces/profiles/ProfilesType";
import { UsersType, attributeDescriptions } from "@/interfaces/users/UsersType";
import { useGetClasses } from "@/services/classes/classes-api";
import { useGetUsers, usePostUser, usePutUser } from "@/services/users/user-api";
import { PlusOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Select, Space, Spin, Table, TableColumnsType, Tag, Typography, message } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import FormItem from "antd/lib/form/FormItem";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

const CustomContent = styled(Content)`
    background-color: var(--color-secondary);
    margin: 0 10px 10px 10px;
    border-radius: 10px;
    max-height: 84%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const Users = () => {
  const { users, refetchUsers, loading } = useGetUsers();
  const { classes } = useGetClasses();
  const { create, createPending } = usePostUser();
  const { update, updatePending } = usePutUser();

  const [requestType, setRequestType] = React.useState<RequestType | null>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState<UsersType | undefined>(undefined);
  const [classesIsDisabled, setClassesIsDisabled] = React.useState(true);
  const [formInstance, setFormInstance] = React.useState<any>(null);
  const { searchFilter } = useSearchFilter<UsersType>('name', attributeDescriptions);
  const pathname = usePathname();

  const showConfirm = (record: UsersType) => {
    return ConfirmModal({
      title: 'Tem certeza que deseja inativar este usuário?',
      message: 'Ao inativar este usuário, todas as reservas vinculadas a ele serão canceladas.',
      onConfirm: () => handleInativeUser(record),
      onCancel: () => {}
    });
  }
  
  const handleEdit = (record: UsersType) => {
    setSelectedRecord(record);
    setRequestType('edit');
    setOpenDrawer(true);
  }

  const handleCreate = () => {
    setSelectedRecord(undefined);
    setRequestType('create');
    setOpenDrawer(true);
  }

  const handleForm = (form: any) => {
    setFormInstance(form);
  };

  const handleInativeUser = (record: UsersType) => {
    const user = { ...record, status: 'Inativo' };
    update(user).then(() => {
      refetchUsers();
      message.success('Usuário inativado com sucesso!');
    })
    .catch((error) => {
      message.error('Erro ao inativar usuário: ' + error);
    });
  }

  const handleSave = async () => {
    if (formInstance) {
      const values = formInstance.getFieldsValue();
      const user: Partial<UsersType> = values;

      try {
        if (requestType === 'create') {
          await create(user as UsersType).then(() => {
            refetchUsers();
          });
        }

        if (requestType === 'edit') {
          user.id = selectedRecord?.id;
          await update(user as UsersType).then(() => {
            refetchUsers();
          })
        }

        message.success('Usuário salvo com sucesso!');
      } catch (error) {
        message.error('Erro ao salvar usuário: ' + error);
      }
    }
  
    setOpenDrawer(false);
  }

  const profileOptions = profiles.map((profile) => ({
    value: profile.value,
    label: profile.label
  }));

  const columns: TableColumnsType<UsersType> = [
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <Badge status={text === 'Ativo' ? 'success' : 'error'} text={text}></Badge>
      )
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...searchFilter()
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Perfil',
      dataIndex: 'profile',
      key: 'profile',
      render: (text) => {
        const profile = profiles.find(profile => profile.value === text)?.label;
        const color = profilesTagColor[text as ProfilesType['value']];
        return (
          <Tag color={color}>{profile}</Tag>
        )
      }
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record) => (
        <Space style={{ color: 'var(--color-blue)' }}>
          <Button type="link" onClick={() => handleEdit(record)}>Editar</Button>
          <Button type="link" onClick={() => showConfirm(record)}>Inativar</Button>
        </Space>
      )
    }
  ];

  return (
    <AppPage>
      <MainBreadcrumb path={pathname}></MainBreadcrumb>
      <CustomContent>
        <Space style={{ minWidth: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ margin: '18px', paddingLeft: '15px' }}>
            <Title level={4}>Usuários</Title>
          </Typography>
          <Button
            type="default"
            style={{ margin: '10px' }}
            icon={<PlusOutlined />}
            onClick={handleCreate}>
            Novo Usuário
          </Button>
        </Space>
        <Spin spinning={loading}>
          <Table
            style={{ padding: '25px' }}
            size="middle"
            pagination={{ pageSize: 8 }}
            dataSource={users}
            columns={columns}>
          </Table>
        </Spin>
      </CustomContent>
        <RecordDrawer
          open={openDrawer}
          title="Usuário"
          onClose={() => setOpenDrawer(false)}
          onSave={() => handleSave()}
          requestType={requestType}>
            <Spin spinning={createPending || updatePending}>
            <RecordForm data={selectedRecord} onForm={handleForm}>
              <GroupedFormItem>
                <FormItem
                  key="name"
                  name="name"
                  rules={[{ required: true }]}>
                  <Input placeholder="Nome Completo" style={{ minWidth: '300px' }} />
                </FormItem>
                <FormItem
                  key="email"
                  name="email"
                  rules={[{ required: true }]}>
                  <Input placeholder="E-mail" style={{ minWidth: '300px' }} />
                </FormItem>
              </GroupedFormItem>
              <GroupedFormItem>
                <FormItem
                  key="profile"
                  name="profile"
                  rules={[{ required: true }]}>
                  <Select
                    onChange={(value) => {
                      if (value === 'master') {
                        setClassesIsDisabled(false);
                      } else {
                        setClassesIsDisabled(true);
                      }
                    }}
                    defaultValue={profileOptions.filter((profile) => profile.value === 'comum')[0].label}
                    style={{ width: 200 }}
                    options={profileOptions} />
                </FormItem>
                <FormItem
                  key="classes"
                  name="classes"
                  rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    style={{ width: 200 }}
                    placeholder="Selecione as Salas"
                    disabled={classesIsDisabled}
                    options={(classes || []).map((classes) => ({
                      value: classes.name,
                      label: classes.name
                    })
                    )}
                  />
                </FormItem>
              </GroupedFormItem>
            </RecordForm>
            </Spin>
        </RecordDrawer>
    </AppPage>
  );
}

export default Users;