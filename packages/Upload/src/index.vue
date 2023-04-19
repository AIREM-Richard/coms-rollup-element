<template>
  <div class="upload-wrap">
    <input ref="upload" type="file" :accept="accept" @change="change" />
    <el-button
      :type="type"
      :size="size"
      :round="round"
      @click="upload"
      v-if="show"
    >
      {{ text }}
    </el-button>
    <span v-else @click="upload">{{ fileName }}</span>
  </div>
</template>

<script>
export default {
  name: 'AcUplaod',
  data() {
    return {
      show: true,
      fileName: null,
    };
  },
  props: {
    accept: {
      type: String,
    },
    before: {},
    text: {
      type: String,
      default: '点击上传',
    },
    type: {
      type: String,
      default: 'text',
    },
    size: {
      type: String,
      default: 'medium',
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // appear(){
    //   return !!this.fileName
    // }
  },
  methods: {
    change(e) {
      if (!e.target.files.length) return;
      const fileData = e.target.files[0];
      this.fileName = fileData.name;
      this.show = false;
      this.$emit('upload', {file: fileData});
    },
    upload() {
      if (this.before && !this.before()) return;
      this.$refs.upload.click();
    },
  },
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
