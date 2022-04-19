import AcPage from './Page/index.js'
import AcUplaod from './Upload/index.js'

// 放组件
const components = {
  AcPage,
  AcUplaod
}

// 放指令
const directives = {
}

// 工具函数
const params = {

}

const install = function(Vue){
  if(install.installed) return 
  install.installed = true
  Object.values(components).map(component => {
    Vue.component(component.name,component)
  })
  Object.values(directives).map(directive=>{
    Vue.directive(directive.name,directive)
  })
  Object.values(params).map(param=>{
    Vue.myParams = function(){
      return params
    }
  })
}

/** 支持使用标签方式引入 */
if(typeof window != 'undefined' && window.Vue){
  install(window.Vue)
}

export default install
export {
  AcPage,
  AcUplaod
}