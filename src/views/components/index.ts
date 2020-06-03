/*
使用webpack打包api实现组件自动注册,
在global里的组件可以不用在外面使用import或者require来导入并注册,
可在项目中直接使用
*/
import Vue from 'vue';

// 自动加载global文件夹下面的所有js文件
const componentContext = require.context('./global', true, /\.ts$/);

componentContext.keys().forEach(component => {
    const componentConfig = componentContext(component);
    const ctrl = componentConfig.default || componentConfig;
    Vue.component(ctrl.name, ctrl);
})
