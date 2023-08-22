import React from 'react';
import { Layout, Typography } from 'antd';
import styles from './AppToolbar.module.css';

const { Header } = Layout;

const AppToolbar = () => {
    return (
        <Header className={styles.appHeader}>
            <div className={styles.logo}>
                <Typography.Link href="/">
                    <Typography.Title level={3}>
                        AI Interview Helper{' '}
                    </Typography.Title>
                </Typography.Link>
            </div>
            {/*<Menu theme="light" mode="horizontal">*/}
            {/*  <Menu.Item key="1" icon={<HomeOutlined />}>*/}
            {/*    Home*/}
            {/*  </Menu.Item>*/}
            {/*  <Menu.Item key="2" icon={<ProfileOutlined />}>*/}
            {/*    Profile*/}
            {/*  </Menu.Item>*/}
            {/*  <Menu.Item key="3" icon={<SettingOutlined />}>*/}
            {/*    Settings*/}
            {/*  </Menu.Item>*/}
            {/*</Menu>*/}
        </Header>
    );
};

export default AppToolbar;
