<template>
  <div class="ct-stepper">
    <button class="ct-stepper-btn" @click="minus">-</button>
    <input
      type="text"
      class="ct-stepper-btn"
      v-model="inputValue"
      :disabled="disableInput"
      @input="onInput"
      @blur="onBlur"
    />
    <button class="ct-stepper-btn" @click="plus">+</button>
  </div>
</template>

<script>
export default {
  props: {
    disableInput: {
      type: Boolean,
      default: false
    },
    value: [String, Number]
  },
  data() {
    return {
      inputValue: this.value || 0
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    onInput() {
      this.$emit("input", this.inputValue);
      this.$parent.$emit("form.change", {
        value: this.inputValue
      });
    },
    onBlur() {
      this.$parent.$emit("form.blur", {
        value: this.inputValue
      });
    },
    plus() {
      this.inputValue++;
      this.onChange();
    },
    minus() {
      if (this.inputValue < 1) return;
      this.inputValue--;
      this.onChange();
    },
    onChange() {
      this.$emit("input", this.inputValue);
      this.$emit("change", this.inputValue);
      this.$parent.$emit("form.change", this.inputValue);
    }
  }
};
</script>

<style lang="less">
.ct-stepper-btn {
  border: 0;
  background: transparent;
  outline: 0;

  &:nth-child(2) {
    margin: 0 8px;
    text-align: center;
  }
}
</style>
