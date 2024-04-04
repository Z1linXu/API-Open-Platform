import { Footer } from '@/components';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl } from '@umijs/max';
import {  message, Tabs } from 'antd';
import React, { useState } from 'react';
import { createStyles } from 'antd-style';
import {userRegister} from "@/services/api-backend/userController";
import {Link} from "umi";
import { SYSTEM_LOGO} from "@/constant";

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});


const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const intl = useIntl();


  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const {userPassword, checkPassword }= values;
    //Validation
    if(userPassword !==checkPassword)
    {
      message.error('The passwords do not match.')
      return;
    }
    try {
      // Register
      const id = await userRegister(values);
      if (id) {
        const defaultLoginSuccessMessage = 'Account created！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname:'/user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          //这个submitter是表单按钮的名称
          submitter={{
            searchConfig: {
              submitText: 'Register'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="API Open Platform Website"
          subTitle="API Open Platform Solutions for Your Needs"

          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}

        >
          <Tabs activeKey={type}
                onChange={setType}
                centered
          >
            <Tabs.TabPane
              key="account"
              tab='Sign Up'
            />

          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined  />,
                }}
                placeholder='Please enter your account'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userAccount.required"
                        defaultMessage="Please enter your account"
                      />
                    ),
                  },
                  {
                    min:4,
                    type:'string',
                    message: 'length can not smaller than 4',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder='Password'

                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="Please enter your userPassword."
                      />
                    ),
                  },
                  {
                    min:8,
                    type:'string',
                    message: 'length can not smaller than 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder='Please confirm your userPassword.'

                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="Please confirm your userPassword."
                      />
                    ),
                  },
                  {
                    min:8,
                    type:'string',
                    message: 'length can not smaller than 8',
                  },
                ]}
              />



            </>
          )}
          <div
            style={{
              marginBottom: 12,
              float: 'right',
            }}
          >
            <Link to="/user/login">Sign In </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
