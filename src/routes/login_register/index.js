import React, { useEffect } from 'react';
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
const opt = {
  title: { text: 'Line Chart' },
  tooltip: {},
  toolbox: {
    feature: {
      dataView: {},
      saveAsImage: {
        pixelRatio: 2
      },
      restore: {}
    }
  },
  xAxis: {},
  yAxis: {},
  series: [{
    type: 'line',
    smooth: true,
    data: [[12, 5], [24, 20], [36, 36], [48, 10], [60, 10], [72, 20]]
  }]
}
const IndexPage = (props) => {
  console.log(props, 'props')
  useEffect(() => {

    echarts.init(document.getElementById('pull')).setOption(option)
    echarts.init(document.getElementById('main')).setOption(opt)

  }, [])

  return (
    <div className={styles.normal}>
      111111
      <div id="main" className={styles.main}></div>
      <div id="pull" className={styles.main}></div>
    </div>
  );
}


export default connect((state) => {
  console.log(state)
  const { list } = state.login
  return { list }
})(IndexPage);
