import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import LoginRegister from './routes/login_register';
import ManagerView from './routes/manager_view';
import StudentDetails from './routes/student_details';
import TeacherView from './routes/teacher_view';

function RouterConfig({ history }) {
  console.log(history, 'history')
  return (
    <Router history={history}>
      <Switch>
        <Route path="/loginRegister" history={history} exact component={LoginRegister} />
        <Route path="/managerView" history={history} exact component={ManagerView} />
        <Route path="/studentsDetails" history={history} exact component={StudentDetails} />
        <Route path="/teacherView" history={history} exact component={TeacherView} />
        <Redirect from='/' to='/loginRegister' />>
      </Switch>
    </Router>
  );
}

export default RouterConfig;


// 需要修改为递归路由表
