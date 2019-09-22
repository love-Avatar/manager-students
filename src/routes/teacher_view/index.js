import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import * as echarts from 'echarts';

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
};

const IndexPage = props => {
  const { history } = props
  // 弹窗类型
  const [addStudentGrade, setStudentGrade] = useState('analysis')//grade analysis  

  // 是否显示弹窗  默认不显示
  const [isShowDialog, setShowDialog] = useState(false)

  // 折线图 line_chart  or 柱形图  column_chart
  const [isLineChart, setLineChart] = useState(true)

  // 切换班级

  useEffect(() => {
    echarts.init(document.getElementById('echatsView'))
      .setOption(option)
  }, [])

  useEffect(() => {
    console.log(isShowDialog)
  })
  const Dialog = () =>
    <div className={styles.dialog}>{
      addStudentGrade === 'grade' ?
        <div className={styles.dialo_gcon}>
          <div className={styles.dialog_header}>新添成绩--同学</div>
          <div className={styles.dialog_main}>
            <p>
              <input type="text" />
              <button>昨天</button>
            </p>
            <li>
              <span><span>技能</span></span>
              <input type="text" placeholder="数字" />
            </li>
            <li>
              <span><span>理论</span></span>
              <input type="text" placeholder="0-100之间" />
            </li>
          </div>
          <div className={styles.dialog_footer}>
            <p></p>
            <button className={styles.cancel}
              onClick={() => setShowDialog(false)}
            >取消</button>
            <button onClick={() => setShowDialog(false)}>确定</button>
          </div>
        </div>
        : <div className={styles.dialo_gcon}>
          <div className={styles.dialog_header}>新添分析--同学</div>
          <div className={styles.dialog_main}>
            <p>
              <input type="text" />
              <button>昨天</button>
            </p>
            <li>
              <span><span>技能</span></span>
              <textarea name="" ></textarea>
            </li>
            <li>
              <span><span>理论</span></span>
              <textarea name=""></textarea>
            </li>
          </div>
          <div className={styles.dialog_footer}>
            <p></p>
            <button className={styles.cancel}
              onClick={() => setShowDialog(false)}
            >取消</button>
            <button onClick={() => setShowDialog(false)}>确定</button>
          </div>
        </div>
    }
    </div>

  // switch 切换按钮
  const LineChart = () => <div className={styles.line_chart}>
    <div>
      <p onClick={() => setLineChart(!isLineChart)}
        style={isLineChart ? { left: 0 } : { right: 0 }}></p>
    </div>
  </div>

  return (
    <div className={styles.normal}>
      <header className={styles.header}>重点关注学生考试成绩统计图</header>

      <div className={styles.mainbody}>
        <div className={styles.checkclass}>
          <li>切换班级</li>
          <p>
            <button className={styles.isActive}>1703</button>
            <button className={''}>1703</button>
          </p>
          <li><button className={styles.addClass}>添加班级+</button></li>
          <div className={styles.switchMode}>
            <div className={styles.juzhong}><LineChart /></div>
            <li>柱形图/线图</li>
          </div>
        </div>

        <div className={styles.addStudent}>
          <p>添加学生：</p>
          <li>
            <input type="text" placeholder="输入姓名" />
            <input type="text" placeholder="末位次数" />
            <input type="text" placeholder="结对子帮扶对象" />
            <button>添加</button>
          </li>

        </div>

        <div className={styles.main}>
          <div className={styles.content}>
            {/* 遍历学生组件详情 */}
            <div className={styles.studentsDetail}>
              <div id="echatsView" className={styles.echatsView}>
              </div>
              <div className={styles.echatsFooter}>
                <button onClick={() => {
                  setStudentGrade('grade')
                  setShowDialog(true)
                }}>添加成绩+</button>
                <button onClick={() => {
                  setStudentGrade('analysis')
                  setShowDialog(true)
                }}>添加分析和解决方案+</button>
                <li></li>
                <button onClick={() => {
                  history.push('/studentsDetails')
                }}>查看和编辑该生所有成绩</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* 对话框 */}
      {isShowDialog ? <Dialog /> : null}

    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
