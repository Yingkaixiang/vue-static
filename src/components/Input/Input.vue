<template>
  <textarea
    v-if="isTextArea"
    v-model="inputValue"
    ref="textarea"
    class="ct-input"
    :placeholder="placeholder"
    :rows="rows"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
  <input
    v-else
    v-model="inputValue"
    class="ct-input"
    :placeholder="placeholder"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script>
import { removeHTML, trim } from "../util/";

export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: [String, Number],
    type: String,
    placeholder: String,
    rows: {
      type: [String, Number],
      default: 1,
    },
  },
  data() {
    return {
      inputValue: this.format(this.value),
      isTextArea: this.type === "textarea",
    };
  },
  watch: {
    value(newVal) {
      this.inputValue = this.format(newVal);
      if (this.isTextArea) {
        this.$nextTick(this.adjustSize);
      }
    },
  },
  mounted() {
    if (this.isTextArea) {
      this.$nextTick(this.adjustSize);
    }
  },
  methods: {
    onInput() {
      this.$emit("input", this.inputValue);
      this.$parent.$emit("form.change", [this.inputValue]);
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
    onBlur(e) {
      this.$emit("input", this.inputValue);
      this.$emit("blur", e);
      this.$parent.$emit("form.blur", [this.inputValue]);
    },
    format(value) {
      return this.type === "textarea"
        ? removeHTML(value)
        : removeHTML(trim(value));
    },
    adjustSize() {
      const { textarea } = this.$refs;
      textarea.style.height = "auto";
      let height = textarea.scrollHeight;
      textarea.style.height = `${height}px`;
    },
  },
};
</script>

<style lang="less">
.ct-input {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  resize: none;

  &:focus {
    outline: none;
  }
}
</style>
