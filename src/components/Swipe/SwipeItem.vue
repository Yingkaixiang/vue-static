<template>
  <div
    class="ct-swipe-item"
    :style="{
      width: $parent.computedWidth + 'px',
      height: '100%',
      transform: `translateX(${offset}px)`,
    }"
    @on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
    };
  },
  beforeCreate() {
    this.$parent.swipes.push(this);
  },
  destroyed() {
    this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
  },
};
</script>
