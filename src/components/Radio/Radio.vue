<template>
  <div class="ct-radio" :class="className" @click="onSelect">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Number, Boolean],
      required: true,
    },
    selectedClass: [Object, String, Array],
    value: [String, Number],
  },
  data() {
    return {
      isSelected: this.value === this.label,
    };
  },
  computed: {
    className() {
      return this.isSelected ? this.selectedClass : undefined;
    },
  },
  watch: {
    value() {
      this.isSelected = this.value === this.label;
    },
  },
  methods: {
    onSelect() {
      this.$emit("input", this.label);
      this.$emit("select", this.isSelected, this.label);
      this.$parent.$emit("form.change", {
        value: this.label,
      });
    },
  },
};
</script>

<style lang="less">
.ct-radio {
  display: inline-block;
  user-select: none;
}
</style>
