<template>
  <div class="ct-toast" v-show="visible">{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: [String, Number]
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less">
.ct-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(50, 50, 51, 0.88);
  padding: 8px 12px;
}
</style>
