import axios from 'axios'

// 最简单
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL:'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout:5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config =>{
    // console.log(config);
    // 为什么拦截
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求，都希望在界面显示一个请求图标
    // 3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
    return config //拦截完没有return返回的话就没办法调到main.js的120行的console.log(res);undefined
  },error => {
    // console.log(error);
  });
  // 2.2.响应拦截的作用
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data //main.js的120行的console.log(res) 就会只剩下data
  },err => {
    console.log(err);
  })
  // 发送真正的网络请求
  return instance(config)
}


// 第三种
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//     })
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }
// 第二种
// export function request(config) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//   // 发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       // console.log(res);
//       config.success(res)
//     })
//     .catch(err => {
//       // console.log(err);
//       config.failure(err)
//     })
// }

// 第一种
// export function request(config,success,failure) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//   // 发送真正的网络请求
//   instance(config)
//     .then(res => {
//       // console.log(res);
//       success(res)
//     })
//     .catch(err => {
//       // console.log(err);
//       failure(err)
//     })
// }

