<template>
  <div :class="$style.main">
    <Banner />
    <Marketing />
    <Detail />
    <Order />
  </div>
</template>

<script>
import Banner from "@/components/Banner/Banner";
import Marketing from "@/components/Marketing/Marketing";
import Detail from "@/components/Detail/Detail";
import Order from "@/components/Order/Order";

export default {
  components: {
    Banner,
    Marketing,
    Detail,
    Order,
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
