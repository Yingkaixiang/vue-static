<template>
  <div id="app">
    <div :class="$style.main">
      <Notification />
      <Banner />
      <Marketing />
      <Detail />
      <Order />
      <BuyNowButton />
    </div>
  </div>
</template>

<script>
import Banner from "./Banner/Banner";
import Marketing from "./Marketing/Marketing";
import Detail from "./Detail/Detail";
import Order from "./Order/Order";
import Notification from "./Notification/Notification";
import BuyNowButton from "./BuyNowButton/BuyNowButton";

export default {
  components: {
    Banner,
    Marketing,
    Detail,
    Order,
    Notification,
    BuyNowButton,
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
