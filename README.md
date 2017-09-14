> demo 技术栈：vue2 vue-router2 webpack3 iview2 vuex2 axios express

#### 用户管理后台单页面应用

**特点**
1. `webpack` 的 `chunkhash` 缓存
2. 路由懒加载
3. 公共库代码提取
4. express 模拟api请求
5. 打包桌面应用（./buildNW）

项目启动：
- `git clone https://github.com/zhengjunxiang/automatic-vue2-.git`
- `cd automatic-vue2-`
- `yarn install` 或 `cnpm install` 或 `npm install` (确保已安装'node', 'yarn'或'cnpm')
- `npm run dev` (开发配置)
- `npm run serve` (启动本地api服务：只有少部分的api请求)
- `npm run build` (发布配置)
- `npm run build:nw` (包桌面应用：配置可在builder.js中修改)
