'use client'

import LoginForm from '@/components/layouts/login/LoginForm';
import { Image } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';

const CustomLoginPlace = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60vh;
  width: 100vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }
`;

const CustomLogoPlace = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  return (
      <Content 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <CustomLoginPlace>
            <CustomLogoPlace>
              <Image
                width={250}
                src="/images/senac-logo.png"
                preview={false}
                alt="Logo Senac"
              />
              <Image
                width={120}
                src="/images/booknow-logo.png"
                preview={false}
                alt="Logo Senac"
              />
            </CustomLogoPlace>
            <LoginForm></LoginForm>
          </CustomLoginPlace>
      </Content>
  );
};

export default Login;