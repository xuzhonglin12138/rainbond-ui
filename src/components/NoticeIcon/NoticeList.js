import React from 'react';
import { Avatar, List, Badge } from 'antd';
import logsUtil from '@/utils/logs';
import { Link } from 'dva/router';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({
  data = [],
  onJump,
  onClear,
  name,
  locale,
  emptyText,
  emptyImage,
  tabType
}) {
  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ padding: '20px 0' }}> {emptyImage || null}</div>
        <div style={{ padding: '0 0 20px 0' }}>{emptyText || locale.emptyText}</div>
        <div className={styles.clear} onClick={onClear}>
          查看历史消息
        </div>
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read
          });
          return (
            <List.Item className={itemCls} key={item.ID || i}>
              <List.Item.Meta
                className={styles.meta}
                avatar={
                  item.avatar ? (
                    <Avatar className={styles.avatar} src={item.avatar} />
                  ) : null
                }
                title={
                  <div className={styles.title} onClick={() => onJump(tabType)}>
                    <div className={styles.extra}>
                      {item.is_read === false ? <Badge status="error" /> : null}
                    </div>
                    {logsUtil.fetchLogsContent(item.content)}
                  </div>
                }
                description={
                  <div>
                    {/* <div
                      className={styles.description}
                      title={item.description}
                    >
                      <Link to="/information/management/notice/unread">
                        查看详情
                      </Link>
                    </div> */}
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        })}
      </List>
      <div className={styles.clear} onClick={onClear}>
        查看历史消息
      </div>
    </div>
  );
}
