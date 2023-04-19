<template>
  <el-pagination
    :small="sm"
    :background="bg"
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :page-sizes.sync="options"
    :total="total"
    :layout="layout"
    @size-change="change"
    @current-change="change"
    v-if="!!total"
  ></el-pagination>
</template>

<script>
export default {
  name: 'AcPage',
  props: {
    sm: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    options: {
      type: Array,
      default: () => [10, 20, 30],
    },
    total: {
      required: true,
      type: Number,
      default: 0,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      },
    },
  },
  methods: {
    change() {
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
