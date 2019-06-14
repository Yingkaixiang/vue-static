<template>
  <div id="#app">
    <div :class="$style.main">
      <Notification />
      <Banner />
      <Marketing />
      <Detail />
      <Order />
    </div>
  </div>
</template>

<script>
import Banner from "@components/Banner/Banner";
import Marketing from "@components/Marketing/Marketing";
import Detail from "@components/Detail/Detail";
import Order from "@components/Order/Order";
import Notification from "@components/Notification/Notification";

export default {
  components: {
    Banner,
    Marketing,
    Detail,
    Order,
    Notification,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" module>
.main {
  width: 375px;
}
</style>
