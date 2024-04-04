import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Zilin Xu',
          title: 'Zilin Xu',
          href: 'http://www.zilinxu.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Z1linXu/API-Open-Platform',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
