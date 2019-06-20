<template>
  <div :class="$style.marketing">{{ name }}</div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.name;
    },
  },
};
</script>

<style lang="less" module>
.marketing {
  width: 100%;
  height: 64px;
  background: linear-gradient(
    315deg,
    rgba(249, 218, 73, 1) 0%,
    rgba(242, 170, 60, 1) 100%
  );
}
</style>
