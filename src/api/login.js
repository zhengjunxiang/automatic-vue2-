import fetch from '@/utils/fetch';

export function login(loginName, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      loginName,
      password
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'get'
  });
}
