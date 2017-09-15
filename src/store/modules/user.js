import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth'
import { SET_TOKEN } from '../mutation-types'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    [SET_TOKEN]: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const loginName = userInfo.loginName.trim();
      return new Promise((resolve, reject) => {
        login(loginName, userInfo.password).then(response => {
          const data = response.data;
          if (data.result) {
            setToken(data.token);
            commit('SET_TOKEN', data.token);
          }
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(response => {
          commit('SET_TOKEN', '');
          // commit('SET_ROLES', []);
          removeToken();
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }

  }
};

export default user;
