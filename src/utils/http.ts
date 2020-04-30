const ajax = function ajax(ajaxObject: any) {
  //作用为：检查参数对象属性值是否为空，如果为空，给其设置默认值
  var method = ajaxObject.method || "get";
  var url = ajaxObject.url || "http://tlck.bjtltt.com";
  var header = ajaxObject.header;
  var parobj = ajaxObject.parobj || {};
  var token = ajaxObject.token;
  var success = ajaxObject.success;
  var error = ajaxObject.error; //表示失败后，要执行的回调函数

  var xhr = new XMLHttpRequest(); //创建xhr实例对象

  //如果是get请求，就将参数对象解析为字符串形式附加到url后面
  if (method == "get") {
    url += "?";
    for (let i in parobj) {
      url += i + "=" + parobj[i] + "&"; //将参数对象拼接为http://www.baidu.com?name='zs'&sex='nv'的形式
    }
    url = url.slice(0, -1); //将最后一个&符号去掉
    xhr.open(method, url); //创建ajax请求
    xhr.send(); //发送get请求
  }

  //如果是post请求就将参数对象解析为一个字符串，作为send方法的参数传递到后台去
  if (method == "post") {
    // var parstr = "";
    // for (let i in parobj) {
    //   parstr += i + "=" + parobj[i] + "&"; //将参数对象拼接为www.baidu,com?name='zs'&sex='nv'的形式
    // }
    // parstr = parstr.slice(0, -1); //将最后一个&符号去掉
    // console.log(parstr);

    xhr.open(method, url); //创建ajax请求
    if (header) {
      // xhr.setRequestHeader('Content-Type', "multipart/form-data")
    } else {
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8"); //post传参需要加上这句话Z
    }
    xhr.send(parobj); //发送post请求
  }

  xhr.onreadystatechange = function () { //接收所请求的数据并进行处理
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        //readyState为4，对应常量"DONE"，表示服务器数据已经完全接收，或者本次接收已经失败了
        //status为200, 对应常量"OK"，访问正常
        var v = JSON.parse(xhr.responseText); //获取返回的数据
        // if (v.code == 401) {
        //   // window.location.href='http://192.168.1.7:1225';
        //   window.location.href='http://192.168.1.77:9999';
        // }

        // 如果v的状态码是401,则返回登录页
        // if (v.code == 401) {
        //   document.addEventListener('UniAppJSBridgeReady', function () {
        //     //向uniapp传值
        //     uni.postMessage({
        //       data: {
        //         code: '401'
        //       }
        //     });
        //     uni.getEnv(function (res) {
        //       console.log('当前环境：' + JSON.stringify(res));
        //     });
        //   });
        // }
        if (!success) {
          console.info(v);
        } else
          success(v); //通过这个回调函数进行我们想要的操作
      } else if (xhr.status == 401) {
        console.log(401);
        // 401返回登录页
        if (!error) {
          console.info(v);
        } else
          error(xhr.responseText); //通过这个回调函数进行我们想要的操作
      } else {

        if (!error) {
          console.info(v);
        } else
          error(xhr.responseText); //通过这个回调函数进行我们想要的操作
      }
    }
  }
}
export default ajax;
