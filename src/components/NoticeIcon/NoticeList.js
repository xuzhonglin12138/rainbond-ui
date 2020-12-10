import React from 'react';
import { Avatar, List, Badge } from 'antd';
import { Link } from 'dva/router';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({
  data = [],
  onJump,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage
}) {
  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div style={{ padding: '50px 0' }}>{emptyText || locale.emptyText}</div>
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
            <List.Item className={itemCls} key={item.key || i}>
              <List.Item.Meta
                className={styles.meta}
                avatar={
                  item.avatar ? (
                    <Avatar className={styles.avatar} src={item.avatar} />
                  ) : null
                }
                title={
                  <div className={styles.title} onClick={() => onJump()}>
                    <div className={styles.extra}>
                      {item.is_read === false ? <Badge status="error" /> : null}
                    </div>
                    {item.title}
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
