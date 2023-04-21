import AcPage from './components/Page/index.js';
import AcUplaod from './components/Upload/index.js';
import AcSelect from './components/Select/index.js';
import Download from './Download/index.js';
import loadmore from './directives/load-more/index.js';
import onlyNumber from './directives/only-number/index.js';

// 放组件
const components = {
  AcPage,
  AcUplaod,
  AcSelect,
};

// 放指令
const directives = {
  loadmore,
  onlyNumber,
};

// 绑定到Vue实例下的方法
const vueInstanceFun = {
  Download,
};

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.values(components).map(component => {
    Vue.component(component.name, component);
  });
  Object.values(directives).map(directive => {
    Vue.directive(directive.name, directive);
  });
  Object.values(vueInstanceFun).map(fun => {
    Vue.use(fun);
  });
};

/** 支持使用标签方式引入 */
if (typeof window != 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install;
export {AcPage, AcUplaod, Download, loadmore, onlyNumber};
