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

  // 折线图 line_chart  or 柱形图  column_chart
  const [isLineChart, setLineChart] = useState(true)
  // 是否显示 更多学生列表
  const [isShowMore, setShowMore] = useState(true)

  const [isShowMoreIndex, setShowMoreIndex] = useState(0)

  const [studentsMoreDetials, setstudentsMoreDetials] = useState([12345,6789])
  const [studentsList] = useState([123])

  // 切换班级

  useEffect(() => {
    // id 是遍历拼接出来的  

    echarts.init(document.getElementById('echatsView'))
      .setOption(option)

  }, [])

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

        <div className={styles.main_menu}>
          <div className={styles.checkclass}>
            <li>选择班级</li>
            <p>
              <button className={styles.isActive}>1703</button>
              <button className={''}>1703</button>
            </p>
            <div className={styles.switchMode}>
              <div className={styles.juzhong}><LineChart /></div>
              <li>柱形图/线图</li>
            </div>
          </div>

          <div className={styles.main_menu_footer}>
            <p>学生名单:</p>
            <li>adfasdfasdfasd  <span>一共{4}人</span></li>
          </div>

        </div>

        <div className={styles.main}>
          <div className={styles.content}>
            {/* 遍历学生组件详情 */}
            {
              studentsList.map((item, index) => {
                return (
                  <div key={index} className={styles.studentsDetail}>
                    <div id="echatsView" className={styles.echatsView}></div>

                    <div className={styles.echarts_footer}>
                      <div className={styles.left}>
                        <p>2019-08-30</p>
                        <p>今日分析以及解决方案</p>
                        <li onClick={() => { setShowMore(!isShowMore) }}>显示更多</li>
                      </div>
                      <div className={styles.right}>
                        撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好撒的风格好的撒的风格和公司大富大贵好
  
                      </div>
                    </div>
                    {
                      isShowMore ?
                        <div className={styles.echarts_footer_list} >   {
                          studentsMoreDetials.map((item, i) =>
                            <div className={styles.echarts_footer_list_item} key={i}>
                              <p>2019-2-9</p>
                              <p>234567ewrtwertwertwtre89</p>
                            </div>)
                        }  </div>
                        : null
                    }
                  </div>)
              })
            }
          </div>
        </div>

      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
