<template>
  <div :class="$style.example">
    这是{{ page }}页面11
    <img src="../assets/ic_hot.jpg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "index",
    };
  },
  mounted() {
    const { a, ...restProps } = { a: 1, b: 2 };
    console.dir(a, restProps);
  },
};
</script>

<style module>
.example {
  color: blue;
  user-select: none;
}
</style>
