<template>
  <div aspectratio w-1-1 :class="$style.banner">
    <div :class="$style.swiper">
      <!-- <Swiper>
        <SwiperItem>1</SwiperItem>
        <SwiperItem>2</SwiperItem>
        <SwiperItem>3</SwiperItem>
        <SwiperItem>4</SwiperItem>
      </Swiper> -->
    </div>
  </div>
</template>

<script>
// import Swiper from "../Swiper/Swiper";
// import SwiperItem from "../Swiper/SwiperItem";

export default {
  components: {
    // Swiper,
    // SwiperItem,
  },
};
</script>

<style lang="less" module>
.banner {
  width: 100%;
}

.swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: blue;
}
</style>
