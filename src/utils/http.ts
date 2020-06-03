import Axios from 'axios';
// import { getToken } from './auth';

const http = (opts: any) => {
  const httpDefaultOpts = { // http默认配置
    method: opts.method,  // 测试
    url: opts.url,
    timeout: 100000,
    params: opts.params,
    data: opts.params,
    headers: opts.method == 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'token': '',
    } : {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': '',
      },
  };
  // if (getToken()) {
  //   const token: any = getToken();
  //   httpDefaultOpts.headers.token = token;
  // }
  if (opts.method == 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }
  const promise = new Promise(function (resolve, reject) {
    Axios(httpDefaultOpts).then(
      (res) => {
        if (res.data.code == -3) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      },
    ).catch(
      (response) => {
        reject(response);
      },
    );
  });
  return promise;
};

export default http;
