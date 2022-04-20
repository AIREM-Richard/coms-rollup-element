const loadmore = {
  name: 'loadmore',
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap',
    );
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      const condition =
        this.scrollHeight - // eslint-disable-line no-invalid-this
          Math.ceil(this.scrollTop) <= // eslint-disable-line no-invalid-this
        this.clientHeight; // eslint-disable-line no-invalid-this
      if (
        condition &&
        this.scrollTop !== 0 // eslint-disable-line no-invalid-this
      ) {
        binding.value();
      }
    });
  },
};
loadmore.install = Vue => Vue.directive('loadmore', loadmore);
export default loadmore;
