import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './index.scss';


const studentsArr = ['张山', '张山1', '张山2', '张山3', '张山4']
const theader = ['序号', '日期', '理论', '技能', '分析和解决', '是否周考', '操作']
const tbodys = [['11-2-2017', '77', 'sdfsxxfdg', '啊手动阀手动阀你拉看见发射点发生大多数vjva', '否'],
['11-2-2017', '77', 'sdfsxxfdg', '啊手动阀手动阀你拉看见发射点发生大多数vjva', '否']]
const IndexPage = props => {
  // 弹窗类型
  const [addStudentGrade, setStudentGrade] = useState('analysis')//grade analysis  

  // 是否显示弹窗  默认不显示
  const [isShowDialog, setShowDialog] = useState(false)
  const [students, setStudents] = useState(studentsArr)
  const [thead, setThead] = useState(theader)
  const [tbody, setTbody] = useState(tbodys)
  const [isDropSelect, DropSelect] = useState(false)//是否展示下拉菜单
  const [isDayTest, setDayTest] = useState(true)//是否日考
  const [isWeekTest, setWeekTest] = useState(true)//是否周考
  // 删除 还是 修改
  const [isDelete, setCheckDelete] = useState(false)//delete  change

  useEffect(() => {

  }, [])

  useEffect(() => {
    console.log(isShowDialog)
  })

  const Dialog = () =>
    <div className={styles.dialog}>
      {
        isDelete ?
          <div className={styles.dialo_gcon}>
            <div className={styles.dialog_header}>编辑内容</div>
            <div className={styles.dialog_main}>
              <li>
                <span><span>技能</span></span>
                <input type="text" placeholder="数字" />
              </li>
              <li>
                <span><span>理论</span></span>
                <input type="text" placeholder="0-100之间" />
              </li>
              <li><span></span>
                <label htmlFor="isDayTest">
                  <span>
                    <input
                      id='isDayTest'
                      type="checkbox"
                      checked={isDayTest}
                      onChange={() => { setDayTest(!isDayTest) }}
                    /> 日考</span>
                </label>
                <label htmlFor="isWeekTest">
                  <span>
                    <input
                      id='isWeekTest'
                      type="checkbox"
                      checked={isWeekTest}
                      onChange={() => { setWeekTest(!isWeekTest) }}
                    /> 周考</span>
                </label>
              </li>
              <li>
                <span><span>分析解决方案</span></span>
                <textarea name=""></textarea>
              </li>
            </div>
            <div className={styles.dialog_footer}>
              <p></p>
              <button className={styles.cancel}
                onClick={() => setShowDialog(false)}
              >取消</button>
              <button onClick={() => setShowDialog(false)}
              >确定</button>
            </div>
          </div>
          : <div className={styles.dialo_gcon}>
            <div className={styles.delete}>
              <h3>你确定要删除吗？</h3>
              <div></div>
              <li>
                <button className={styles.cancel}
                  onClick={() => setShowDialog(false)}
                >取消</button>
                <button onClick={() => setShowDialog(false)}>确定</button>
              </li>
            </div>
          </div>
      }
    </div>


  const Table = () =>
    <table className={styles.table_com}>
      <thead>
        <tr>{thead.map((item, index) =>
          <th key={index}>{item}</th>)}</tr>
      </thead>
      <tbody>
        {
          tbody.map((item, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              {item.map((it, i) => (<td key={i}>{it}</td>))}
              <td>
                <span onClick={() => {
                  setShowDialog(true);
                  setCheckDelete(true)
                }}
                >编辑</span>
                <span onClick={() => {
                  setShowDialog(true);
                  setCheckDelete(false)
                }}
                >删除</span>
              </td>
            </tr>)
        }
      </tbody>
    </table>


  const changeStudent = () => {
    DropSelect(false)
  }


  const Select = () =>
    <div
      className={styles.isDropSelect}
      onClick={() => DropSelect(!isDropSelect)}
    >快速选择其他学生
      <div>{
        isDropSelect
          ? students.map((item, index) =>
            <p
              onClick={() => changeStudent()}
              key={index}
            >{item}
            </p>
          )
          : null
      }
      </div>
    </div>

  return (
    <div className={styles.normal}>
      <header className={styles.header}>{'xx'}学生日周考成绩统计表</header>
      <div className={styles.main_body}>

        <div className={styles.nav_menu}>
          <div className={styles.teacher}>讲师：{'XXX'}</div>
          <div className={styles.student}>学生：{'XXX'}</div>
          <p></p>
          <div className={styles.change_student}>
            <Select></Select>
          </div>
        </div>

        <div className={styles.table}>
          <Table></Table>
        </div>

      </div>
      {/* 对话框 */}
      {isShowDialog ? <Dialog /> : null}
    </div>
  );
}


export default connect()(IndexPage);
