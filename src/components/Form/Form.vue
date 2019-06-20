<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      form: this,
    };
  },
  props: {
    rules: {
      type: Object,
    },
    model: {
      type: Object,
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on("form.addField", function(field) {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on("form.removeField", function(field) {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    validate(callback) {
      let error = null;
      this.fields.forEach(field => {
        const res = field.validate();
        if (res) {
          if (!error) {
            error = [];
          }
          error.push(res);
        }
      });

      if (typeof callback === "function") {
        callback(error);
      }
    },
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
  },
};
</script>
