<template>
  <el-select
    v-model="currentSelected"
    :placeholder="placeholder"
    filterable
    remote
    clearable
    v-bind="$attrs"
    v-on="$listeners"
    :remote-method="filter"
    :loading="loading"
    @clear="clear"
    @visible-change="showAndHide"
    v-loadmore="loadMore"
    :size="size"
  >
    <el-option
      v-if="isLoaded && alternative"
      :label="defaultLabel"
      :value="defaultValue"
    ></el-option>
    <el-option
      v-for="(item, index) in options"
      :key="optionskey?item[optionskey]:index"
      :label="item[optionsLabel]"
      :value="item[optionsValue]"
    />
    <!-- 此处加载中的value可以随便设置，只要不与其他数据重复即可 -->
    <el-option v-if="!isLoaded" disabled label="加载中..." value="-10000" />
  </el-select>
</template>

<script>
export default {
  name: "AcSelect",
  data() {
    return {
      keyword: null, // 存储关键字用
      loading: false,
    };
  },
  props: {
    selected: {
      type: [String, Number],
      default: null,
    },
    // 列表数据
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    //  key
    optionskey: {
      type: String,
      // default: "value",
    },
    optionsLabel: {
      type: String,
      default: "label",
    },
    optionsValue: {
      type: String,
      default: "value",
    },
    // 调用页数的接口
    request: {
      type: Function,
      default: () => {},
    },
    // 传入的页码
    page: {
      type: [Number, String],
      default: 1,
    },
    // 是否加载完成
    isLoaded: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    size: {
      type: String,
      default: "middle",
    },
    alternative: {
      type: Boolean,
      default: false,
    },
    defaultLabel: {
      type: String,
      default: "无",
    },
    defaultValue: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    currentSelected: {
      get() {
        return this.selected;
      },
      set(val) {
        this.$emit("update:selected", val);
      },
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
  },
  methods: {
    async fetchRequest(params) {
      let currentParams;
      if (typeof params === "string") {
        this.currentPage = 1;
        currentParams = {
          keyword: params,
        };
      } else {
        currentParams = params;
      }
      if (this.loading) return;
      this.loading = true;

      await this.request(currentParams);

      this.loading = false;
    },
    // 删除选中时，如果请求了关键字，则清除关键字再请求第一页的数据
    clear() {
      if (this.keyword) {
        this.keyword = null;
        this.currentPage = 1;
        let payload = { keyword: this.keyword };
        this.fetchRequest(payload);
      }
    },
    showAndHide(val) {
      if (!val) {
        setTimeout(() => {
          this.keyword = null;
          this.currentPage = 1;
          this.fetchRequest({ keyword: this.keyword });
        }, 200);
      }
    },
    filter(val) {
      this.keyword = val
      this.fetchRequest({keyword: this.keyword})
    },
    loadMore() {
      // 如果没有更多数据，则不请求
      if (this.isLoaded) {
        return;
      }
      this.currentPage += 1;
      this.fetchRequest({
        isConcat: true,
        keyword: this.keyword,
      });
    },
  },
};
</script>
