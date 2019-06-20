<template>
  <div class="ct-form-item" :class="formItemClass">
    <div class="ct-form-item-label">
      <span class="ct-form-item-required" v-if="required">*</span>
      <span class="ct-form-item-label-text">{{ label }}</span>
    </div>
    <div class="ct-form-item-content">
      <slot />
    </div>
  </div>
</template>

<script>
import xValidator from "../util/validator";

export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      default: "vertical",
    },
    prop: String,
    showRequired: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 错误信息
      error: "",
      requiredInValidator: false,
    };
  },
  computed: {
    required() {
      return this.showRequired && this.requiredInValidator;
    },
    formItemClass() {
      return {
        [`ct-form-item-${this.mode}`]: true,
        "ct-form-item-error": this.error,
      };
    },
  },
  created() {
    // 在 Form 组件里注册当前实例
    this.$parent.$emit("form.addField", this);
    // 监听表单控件
    this.addValidateEvents();
    // 判断是否为必填表单
    this.checkIsRequiredInValidator();
    // 设置当前表单域的初始值，用于重置表单
    this.setInitialValue();
  },
  destroyed() {
    this.$parent.$emit("form.removeField", this);
    this.removeValidateEvents();
  },
  methods: {
    // 获取校验规则
    getRules() {
      const { rules } = this.form;
      if (rules) {
        if (this.prop) {
          return rules[this.prop] || [];
        }
      }
      return [];
    },
    // 获取表单数据
    getData() {
      const { model } = this.form;
      if (model) {
        if (this.prop) {
          return model[this.prop];
        }
      }
      return undefined;
    },
    // 判断是否为必填表单域
    checkIsRequiredInValidator() {
      const rules = this.getRules();
      for (let i = 0; i < rules.length; i += 1) {
        if (rules[i].type === "required") {
          this.requiredInValidator = true;
          break;
        }
      }
    },
    addValidateEvents() {
      const rules = this.getRules();
      if (rules.length) {
        this.$on("form.change", this.onFieldChange);
        this.$on("form.blur", this.onFieldBlur);
      }
    },
    removeValidateEvents() {
      this.$off();
    },
    validate() {
      const data = this.getData();
      const rules = this.getRules();
      if (rules) {
        for (let i = 0; i < rules.length; i += 1) {
          let valid = false;
          const rule = rules[i];
          const { type, message, validator, ...params } = rule;
          if (validator) {
            valid = validator(data, params);
          } else {
            valid = xValidator(type, data, params);
          }
          if (!valid) {
            this.error = message || "您输入的数据有误";
            return rule;
          } else {
            this.error = "";
          }
        }
      }
      return;
    },
    resetField() {
      if (this.prop) {
        const { model } = this.form;
        if (model) {
          model[this.prop] = this.initialValue;
        }
      }
    },
    onFieldChange() {
      this.validate();
    },
    onFieldBlur() {
      this.validate();
    },
    setInitialValue() {
      let initialValue = this.getData();
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue);
      }
      Object.defineProperty(this, "initialValue", {
        value: initialValue,
      });
    },
  },
};
</script>

<style lang="less">
.ct-form-item {
  line-height: 1;

  &-horizontal {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-required {
    font-size: 12px;
    color: red;
    margin-right: 2px;
  }

  &-error {
    background: red;
  }

  &-content {
    flex: 1;
  }
}
</style>
