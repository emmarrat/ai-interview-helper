import React from 'react';
import { Spin } from 'antd';
import styles from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={styles.spinnerWrapper}>
            <Spin size="large">
                <div className={styles.content} />
            </Spin>
        </div>
    );
};

export default Spinner;
