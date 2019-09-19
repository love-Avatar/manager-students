import React, { useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import * as echarts from 'echarts';

const IndexPage = () => {

  useEffect(() => {

  }, [])

  const dialog = () => {
    return
  }

  return (
    <div className={styles.normal}>
      <header className={styles.header}>
        <h3>重点关注学生考试成绩统计图</h3>
      </header>
      <div className={styles.checkclass}>
        <li><button>切换班级</button></li>
        <div className={styles.classList}>
          <button className={styles.isActive}>1703</button>
          <button className={''}>1703</button>
          <button className={''}>1703</button>
        </div>
        <p><button>添加班级+</button></p>
      </div>
      <div className={styles.addStudent}>
        <p>添加学生：</p>
        <input type="text" placeholder="输入姓名" />
        <input type="text" placeholder="输入姓名" />
        <input type="text" placeholder="输入姓名" />
        <button>添加</button>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          {/* 遍历学生组件详情 */}
          <div className={styles.studentsDetail}>
            <div id="" className={styles.echatsView}>
            </div>
            <div className={styles.echatsFooter}>
              <button>添加成绩+</button>
              <button>添加分析和解决方案+</button>
              <li></li>
              <button>查看和编辑该生所有成绩</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
