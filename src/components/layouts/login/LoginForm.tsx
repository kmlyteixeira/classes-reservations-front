import { Form, Input, Typography, message } from "antd";
import { Button } from "antd/lib";
import styled from "styled-components";

const LoginContent = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid #f0f0f0;
  padding: 1em;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-left: none;
  }
`;

const LoginForm = () => {

  const onFinish = (values: any) => {

    if (values.email !== 'comum' && values.email !== 'admin') {
      message.error('Usuário não encontrado');
      return;
    }

    localStorage?.setItem('user', values.email);
    localStorage?.setItem('token', 'TOKEN__VALIDO');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    
  }

  return (
      <LoginContent>
        <div style={{ marginBottom: '2em'}}>
          <Typography.Title level={2}>Bem-vindo</Typography.Title>
          <Typography.Text>
            Faça login para acessar o sistema
          </Typography.Text>
        </div>
        <Form
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            key="email"
            name="email"
            rules={[{ required: true }]}>
            <Input placeholder='E-mail'/>
          </Form.Item>
          <Form.Item
            key="senha"
            name="senha"
            rules={[{ required: true }]}>
            <Input.Password placeholder='Senha'/>
          </Form.Item>
          <Form.Item>
            <Button type="default" htmlType="submit" style={{ width: '100%'}}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </LoginContent>
    );
}

export default LoginForm;