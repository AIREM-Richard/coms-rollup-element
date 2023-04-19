import {Message, MessageBox} from 'element-ui';
const download = {
  install(Vue, options) {
    const $isJSON = (str) => {
      if (typeof str == 'string') {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      }
    };
    Vue.prototype.$download = (data, msg, successCallback, errCallback) => {
      if (!data) return;
      const reader = new FileReader();
      reader.readAsText(data.data);
      reader.onload = (e) => {
        const isJson = $isJSON(e.currentTarget.result);
        if (isJson) {
          const result = JSON.parse(e.currentTarget.result);
          if (!result.success && result.success === false) {
            Message({
              message: result.message || 'error',
              type: 'error',
            });
            if (errCallback && typeof errCallback === 'function') {
              errCallback();
            }
          } else {
            Message({
              message: result.message || 'ok',
              type: 'success',
            });
            if (successCallback && typeof successCallback === 'function') {
              successCallback();
            }
          }
        } else {
          if (successCallback && typeof successCallback === 'function') {
            successCallback();
          }
          if (msg) {
            MessageBox.alert(msg, '提示', {confirmButtonText: '确定'});
          }
          const fileName = data.headers['content-disposition']
            .match(/filename=(\S*)/)[1]
            .replace(/"/g, '');
          const blob = new Blob([data.data]);
          if ('msSaveBlob' in navigator) {
            console.log('IE10+下载');
            //  window.navigator.msSaveOrOpenBlob  // 提供保存和打开按钮
            navigator.msSaveBlob(blob, fileName); // 只提供一个保存按钮
          } else {
            console.log('非IE下载');
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.target = '_blank';
            link.download = decodeURIComponent(fileName);
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(link.href); // 释放URL 对象
            document.body.removeChild(link);
          }
        }
      };
    };
  },
};

export default download;
