<template>
  <div aspectratio w-1-1 :class="$style.banner">
    <div :class="$style.swipe">
      <Swipe>
        <SwipeItem>
          <div :class="$style['swipe-item']">1</div>
        </SwipeItem>
        <SwipeItem>
          <div :class="$style['swipe-item']">2</div>
        </SwipeItem>
        <SwipeItem>
          <div :class="$style['swipe-item']">3</div>
        </SwipeItem>
        <SwipeItem>
          <div :class="$style['swipe-item']">4</div>
        </SwipeItem>
      </Swipe>
      <div :class="$style['swipe-media']">
        <div
          :class="[
            $style['swipe-media-btn'],
            $style['swipe-media-btn-selected'],
          ]"
        >
          <div :class="$style['swipe-media-btn-triangle']"></div>
          视频
        </div>
        <div :class="$style['swipe-media-btn']">文字</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from "@components/Swipe/Swipe";
import SwipeItem from "@components/Swipe/SwipeItem";

export default {
  components: {
    Swipe,
    SwipeItem,
  },
};
</script>

<style lang="less" module>
.banner {
  width: 100%;
}

.swipe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &-item {
    width: 100%;
    height: 100%;
    background: #364d79;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }

  &-media {
    width: 100%;
    position: absolute;
    bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 24px;
      background: rgba(173, 173, 173, 1);
      border-radius: 12px;
      font-size: 10px;
      color: #fff;

      &-selected {
        background: linear-gradient(
          90deg,
          rgba(222, 48, 33, 1) 0%,
          rgba(235, 91, 48, 1) 100%
        );
      }

      &-triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4px 0 4px 6px;
        border-color: transparent transparent transparent #ffffff;
        margin-right: 4px;
      }

      &:last-child {
        margin-left: 16px;
      }
    }
  }
}
</style>
