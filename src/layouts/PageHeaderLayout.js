import { DefaultFooter } from '@ant-design/pro-layout';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import React from 'react';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

export default ({
  isFooter,
  children,
  wrapperClassName,
  top,
  ...restProps
}) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
    {!isFooter && (
      <DefaultFooter
        copyright="2020 北京好雨科技有限公司出品"
        links={[
          {
            key: 'Rainbond',
            title: 'Rainbond',
            href: 'https://www.rainbond.com',
            blankTarget: true,
          },
          {
            key: 'github',
            title: <Icon type="github" />,
            href: 'https://github.com/goodrain/rainbond',
            blankTarget: true,
          },
        ]}
      />
    )}
  </div>
);
