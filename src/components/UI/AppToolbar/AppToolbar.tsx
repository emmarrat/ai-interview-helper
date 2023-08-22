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
        </Header>
    );
};

export default AppToolbar;
