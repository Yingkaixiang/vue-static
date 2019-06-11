<template>
  <div class="ct-swipe" :style="style">
    <div
      ref="track"
      :style="trackStyle"
      class="ct-swipe-track"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot />
    </div>
  </div>
</template>

<script>
// 无限循环原理：
// 当轮播播放到最后一张图片时修改第一张图片的 translateX 值
// 将其放在最后一张图片的右边
// 同理，播放到第一张图片时将最后一张放在它的左边
// 位置变化时需要关闭 transition 动画
export default {
  props: {
    width: Number,
    height: Number,
    autoplay: Number,
    initialSwipe: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },

  data() {
    return {
      // 轮播组件宽度
      computedWidth: 0,
      // 包裹容器的位移距离
      offset: 0,
      // 当前显示的轮播索引
      active: 0,
      // 手指在横坐标的位移量
      deltaX: 0,
      // 手指在纵坐标的位移量
      deltaY: 0,
      // 子轮播实例
      swipes: [],
      // 开启 transition 动画
      swiping: false,
      // 手指滑动方向
      direction: "",
    };
  },

  computed: {
    count() {
      return this.swipes.length;
    },

    delta() {
      return this.deltaX;
    },

    size() {
      return this.computedWidth;
    },

    trackSize() {
      return this.count * this.size;
    },

    activeIndicator() {
      return (this.active + this.count) % this.count;
    },

    isCorrectDirection() {
      return this.direction === "horizontal";
    },

    style() {
      return {
        width: this.width ? `${this.width}px` : "",
        height: this.height ? `${this.height}px` : "",
      };
    },

    trackStyle() {
      return {
        width: `${this.trackSize}px`,
        height: this.height ? `${this.height}px` : "",
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translateX(${this.offset}px)`,
      };
    },
  },

  watch: {
    swipes() {
      this.initialize();
    },

    initialSwipe() {
      this.initialize();
    },

    autoplay(autoplay) {
      if (!autoplay) {
        this.clear();
      } else {
        this.autoPlay();
      }
    },
  },

  mounted() {
    this.initialize();
    window.addEventListener("resize", this.onResize, true);
  },

  destroyed() {
    this.clear();
    window.removeEventListener("resize", this.onResize, true);
  },

  methods: {
    initialize(active = this.initialSwipe) {
      clearTimeout(this.timer);
      if (this.$el) {
        const rect = this.$el.getBoundingClientRect();
        this.computedWidth = this.width || rect.width;
      }
      this.swiping = true;
      this.active = active;
      this.offset = this.count > 1 ? -this.size * this.active : 0;
      this.swipes.forEach(swipe => {
        swipe.offset = 0;
      });
      this.autoPlay();
    },

    onResize() {
      this.initialize(this.activeIndicator);
    },

    onTouchStart(event) {
      this.clear();
      this.swiping = true;
      this.touchStart(event);
      this.correctPosition();
    },

    onTouchMove(event) {
      if (!this.swiping) return;

      this.touchMove(event);

      if (this.isCorrectDirection) {
        this.preventDefault(event, true);
        this.move({
          offset: Math.min(Math.max(this.delta, -this.size), this.size),
        });
      }
    },

    onTouchEnd() {
      if (!this.swiping) return;

      if (this.delta && this.isCorrectDirection) {
        this.move({
          pace: this.offsetX > 0 ? (this.delta > 0 ? -1 : 1) : 0,
          emitChange: true,
        });
      }

      this.swiping = false;
      this.autoPlay();
    },

    stopPropagation(event) {
      event.stopPropagation();
    },

    preventDefault(event, isStopPropagation) {
      if (typeof event.cancelable !== "boolean" || event.cancelable) {
        event.preventDefault();
      }

      if (isStopPropagation) {
        this.stopPropagation(event);
      }
    },

    move({ pace = 0, offset = 0, emitChange }) {
      const { delta, active, count, swipes, trackSize } = this;
      const atFirst = active === 0;
      const atLast = active === count - 1;
      const outOfBounds =
        !this.loop &&
        ((atFirst && (offset > 0 || pace < 0)) ||
          (atLast && (offset < 0 || pace > 0)));

      if (outOfBounds || count <= 1) {
        return;
      }

      if (swipes[0]) {
        swipes[0].offset = atLast && (delta < 0 || pace > 0) ? trackSize : 0;
      }

      if (swipes[count - 1]) {
        swipes[count - 1].offset =
          atFirst && (delta > 0 || pace < 0) ? -trackSize : 0;
      }

      if (pace && active + pace >= -1 && active + pace <= count) {
        this.active += pace;

        if (emitChange) {
          this.$emit("change", this.activeIndicator);
        }
      }

      this.offset = Math.round(offset - this.active * this.size);
    },

    swipeTo(index) {
      this.swiping = true;
      this.resetTouchStatus();
      this.correctPosition();
      setTimeout(() => {
        this.swiping = false;
        this.move({
          pace: (index % this.count) - this.active,
          emitChange: true,
        });
      }, 30);
    },

    correctPosition() {
      if (this.active <= -1) {
        this.move({ pace: this.count });
      }
      if (this.active >= this.count) {
        this.move({ pace: -this.count });
      }
    },

    clear() {
      clearTimeout(this.timer);
    },

    autoPlay() {
      const { autoplay } = this;

      if (autoplay && this.count > 1) {
        this.clear();
        this.timer = setTimeout(() => {
          this.swiping = true;
          this.resetTouchStatus();
          this.correctPosition();

          setTimeout(() => {
            this.swiping = false;
            this.move({
              pace: 1,
              emitChange: true,
            });
            this.autoPlay();
          }, 30);
        }, autoplay);
      }
    },

    touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },

    touchMove(event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction =
        this.direction || this.getDirection(this.offsetX, this.offsetY);
    },

    resetTouchStatus() {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },

    getDirection(x, y) {
      const MIN_DISTANCE = 10;
      if (x > y && x > MIN_DISTANCE) {
        return "horizontal";
      }
      if (y > x && y > MIN_DISTANCE) {
        return "vertical";
      }
      return "";
    },
  },
};
</script>

<style lang="less">
.ct-swipe {
  position: relative;
  overflow: hidden;
  user-select: none;

  & img {
    width: 100%;
    display: block;
  }

  &-track {
    height: 100%;
  }
}
</style>
