<template>
  <div :class="$style.buyNowButton">
    优惠购买
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" module>
.buyNowButton {
  width: 100%;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(222, 48, 33, 1) 0%,
    rgba(235, 91, 48, 1) 100%
  );
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
