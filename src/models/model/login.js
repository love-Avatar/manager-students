import service from '../../services'
console.log(service)

const { login, register } = service

export default {

  namespace: 'login',

  state: {
    list: [1, 2, 3,],
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    loginMsg: {},
    registerMsg: {}
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  reducers: {
    savelogin(state, { action }) {
      return { ...state, loginMsg: action };
    },
    saveRegister(state, { action }) {
      return { ...state, registerMsg: action };
    },
  },

  effects: {

    *login({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(login, payload)
      yield put({ type: 'savelogin', action: result.data });
    },

    *register({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(register, payload)
      yield put({ type: 'saveRegister', action: result.data });
    },
  },

};
