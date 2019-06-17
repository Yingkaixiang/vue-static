<template>
  <div :class="$style.notification">
    <div :class="$style['notification-avatar']"></div>
    <div>上海陈**购买了该商品s，7分钟前</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" module>
.notification {
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  padding: 4px 8px 4px 4px;

  &-avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    margin-right: 4px;
  }
}
</style>
