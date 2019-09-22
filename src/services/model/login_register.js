import request from '../../utils/request';

export async function login(opt) {
  console.log(opt)
  const result = await request('/api/emstu/teacher/login', opt);
  console.log(result)
  return result
}
export async function register(opt) {
  console.log(opt)
  const result = await request('/api/emstu/teacher/register', opt);
  // console.log(result)
  return result
}

