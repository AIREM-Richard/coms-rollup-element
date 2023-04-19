const onlyNumber = {
  name: 'onlyNumber',
  inserted(el, vDir, vNode) {
    // vDir.value 有指令的参数
    let content;
    // 设置输入框的值,触发input事件,改变v-model绑定的值
    const setVal = (val) => {
      if (vNode.componentInstance) {
        // 如果是自定义组件就触发自定义组件的input事件
        vNode.componentInstance.$emit('input', val);
      } else {
        // 如果是原生组件就触发原生组件的input事件
        el.value = val;
        el.dispatchEvent(new Event('input'));
      }
    };
    // 按键按下=>只允许输入数字/小数点
    el.addEventListener('keypress', (event) => {
      const e = event || window.event;
      const inputKey = String.fromCharCode(
        typeof e.charCode === 'number' ? e.charCode : e.keyCode,
      );
      const re = /\d|\./; //  数字/小数点
      content = e.target.value;
      /**
       * @description: 定义方法,阻止输入
       */
      function preventInput() {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
      if (!re.test(inputKey) && !e.ctrlKey) {
        preventInput();
      } else if (content.indexOf('.') > 0 && inputKey === '.') {
        // 已有小数点,再次输入小数点
        preventInput();
      }
    });
    // 按键弹起=>并限制最大最小
    el.addEventListener('keyup', (event) => {
      const e = event || window.event;
      content = parseFloat(e.target.value);
      // console.log('按键弹起',content)

      if (!content || isNaN(content)) {
        content = '';
        return;
      }
      let argMax = '';
      let argMin = '';
      if (vDir.value) {
        argMax = parseFloat(vDir.value.max);
        argMin = parseFloat(vDir.value.min);
      }
      if (argMax !== undefined && content > argMax) {
        setVal(argMax);
        content = argMax;
      }
      if (argMin !== undefined && content < argMin) {
        setVal(argMin);
        content = argMin;
      }
    });
    // 失去焦点=>保留指定位小数
    el.addEventListener('focusout', (event) => {
      // 此处会在 el-input 的 @change 后执行
      const e = event || window.event;
      content = parseFloat(e.target.value);
      if (!content) {
        content = '';
      }
      let argPrecision = 0; // 默认保留至整数
      if (vDir.value.precision) {
        argPrecision = parseFloat(vDir.value.precision);
      }
      if (content) {
        e.target.value = content.toFixed(argPrecision);
        if (vDir.value.special) {
          const reg = new RegExp('^(\\d+)\\.(\\d{' + argPrecision + '}).*$');
          if (e.target.value[e.target.value.length - 1] != '0') {
            e.target.value = e.target.value.replace(reg, '$1.5');
          }
        }
      } else {
        e.target.value = 0;
      }
      setVal(e.target.value);
      // -- callback写法1
      // vNode.data.model.callback = ()=>{
      //     e.target.value = content.toFixed(argPrecision)
      // }
      // vNode.data.model.callback();
      // -- callback 写法2
      // vNode.data.model.callback(
      //     e.target.value = content.toFixed(argPrecision)
      // )
    });
  },
};

onlyNumber.install = (Vue) => Vue.directive('onlyNumber', onlyNumber);

export default onlyNumber;
