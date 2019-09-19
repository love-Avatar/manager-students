// 加载这个页面之前   先判断登录态  两周之内自动跳转到对应权限的页面

import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import styles from './index.scss';

let noRepeatCommit = null  //定时器  防抖
const Login_Register = (props) => {
  const { dispatch, loginMsg, registerMsg } = props
  console.log(loginMsg, registerMsg, 'loginMsg', 'registerMsg')
  //  两周之内自动登录    两周之外自动输入用户名和密码 
  //  登录 与 注册   成功或者失败需要进行提示 
  //  注册完成之后切换到 login 并且将账号密码写在 对应位置 
  //  防止多次提交  节流和防抖  禁用按钮 
  //  失去焦点时正则验证规范(忽略)    只验证是否为空    提交时验证不为空即可

  // componentDidMount
  useEffect(() => console.log(props, 'props'), [])

  // 默认提取用户名和密码
  // 本地提取   仓库提取?
  const userInfo = props.userInfo
  // const userInfo = { user_name: "baiyupeng", pass_word: '123456' }
  const { user_name, pass_word } = userInfo ? userInfo : {}
  const [username, setUsername] = useState(user_name ? user_name : '')
  const [password, setPassword] = useState(pass_word ? pass_word : '')
  const [phone, setPhone] = useState('')

  // 默认勾选自动登录
  const [isChecked, setChecked] = useState(true);

  // 登录注册切换  默认登录界面
  const [isActive, setActive] = useState('login');

  // 按钮是否禁用  默认禁用
  const [isAbled, setAbled] = useState(false);

  // 切换到 register 状态时 清空所有文本
  // 切换到 login 状态时 自动添加字段
  useEffect(() => {
    if (isActive === 'register') {
      setUsername('')
      setPassword('')
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const { user_name, pass_word } = userInfo ? userInfo : {}
      user_name && setUsername(user_name)
      pass_word && setPassword(pass_word)
    }
  }, [isActive]);


  // 判断按钮是否禁用
  // 必填文本为空时   禁用
  // 必填文本为真时   可用
  useEffect(() => {
    // console.log(username, password, 'userInfo')
    if (username && password) {
      setAbled(false)
    } else {
      setAbled(true)
    }
  }, [username, password])

  //  登录注册  开始请求之后禁用按钮  请求结束或者 2s 之后再次可用
  const login_register = async (e) => {
    e.preventDefault()
    setAbled(true)  //禁用按钮
    noRepeatCommit = setTimeout(() => {
      setAbled(false)//启用按钮
      noRepeatCommit = null
    }, 1000);
    if (isActive === 'login') {
      console.log('is login')
      // 调用fetch 请求
      const res = (await dispatch({
        type: 'login/login',
        payload: {
          method: 'POST',
          mode: 'cors',
          headers: {
            //  传递的是标准的json字符串，后端可以正常解构出来
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: pass_word, password: password }), // 需要传递的信息
        }
      })).data;
      console.log(res)
      if (res.code === 1) {
        alert(res.msg)
        localStorage.setItem('userInfo', JSON.stringify({
          user_name: username, pass_word: password
        }))
      } else if (res.code === 0) {
        // 登录失败     进行提示    并清空文本框
        alert(res.msg)
      }

      // 触发时机不对  数据走仓库会引发更多的问题
      //  登录成功    保存对应的用户信息    跳转到对应权限的页面
      // if (loginMsg.code === 1) {
      //   alert(loginMsg.msg)
      //   localStorage.setItem('userInfo', JSON.stringify({
      //     user_name: username, pass_word: password
      //   }))
      // } else if (loginMsg.code === 0) {
      //   // 登录失败     进行提示    并清空文本框
      //   alert(loginMsg.msg)
      // }
    } else {
      console.log('is register')
      dispatch({
        type: 'login/register',
        payload: {
          method: 'POST',
          mode: 'cors',
          headers: {
            //  传递的是标准的json字符串，后端可以正常解构出来
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: 'baiyupeng', password: '123456' }), // 需要传递的信息
        }
      });
      //  注册成功    保存对应的用户信息  进行提示   并且切换到 login 状态

      if (registerMsg.code === 1) {
        alert(registerMsg.msg)
        localStorage.setItem('userInfo', JSON.stringify({
          user_name: username, pass_word: password
        }))

        // setActive('login')
      } else if (registerMsg.code === 0) {
        //  注册失败     进行提示    并清空文本框  重新输入       
        alert(registerMsg.msg)

      }
    }
  }

  return (
    <div className={styles.normal}>
      <header className={styles.header}>
        <h3>重点学生日周考成绩录入管理系统</h3>
      </header>
      <main className={styles.main}>

        <div className={styles.content}>

          <p className={styles.title}>网站工程</p>

          <div className={styles.switchTab}>
            <li
              className={styles.switchTab_li}
              className={isActive === 'login' ? styles.switchActive : ''}
              onClick={() => { setActive('login') }}
            >登录</li>
            <li
              className={styles.switchTab_li}
              className={isActive === 'register' ? styles.switchActive : ''}
              onClick={() => { setActive('register') }}
            >注册</li>
          </div>

          <form >
            <p>
              <input
                className={styles.input}
                type="text"
                placeholder="牛牛號/電郵"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </p>
            <p>
              <input
                className={styles.input}
                type="password"
                placeholder="输入密码"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </p>
            {isActive === 'login'
              ? <label htmlFor="autoLogin">
                <p><input
                  type="checkbox"
                  id="autoLogin"
                  checked={isChecked}
                  onChange={() => setChecked(!isChecked)}
                  className={styles.autoLogin} /><span>两周内自动登录</span>
                </p>
              </label>
              : <p>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="输入手机号"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </p>
            }
            <p>
              <input
                type='button'
                onClick={login_register}
                className={styles.loginBtn}
                disabled={isAbled}
                value={isActive === 'login' ? '登录' : '注册'}
              />
            </p>
          </form>

        </div>
      </main>
      <footer className="footer"></footer>
    </div >
  );
}

export default connect((state) => {
  // console.log(state)
  const { userInfo, loginMsg, registerMsg } = state.login
  return { userInfo, loginMsg, registerMsg }
})(Login_Register);