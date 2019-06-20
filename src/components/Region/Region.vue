<template>
  <div>
    <select v-model="province" @blur="onBlur">
      <option v-for="item in provinceList" :key="item.id" :value="item.id">
        {{ item.text }}
      </option>
    </select>
    <select v-model="city" @blur="onBlur">
      <option v-for="item in cityList" :key="item.id" :value="item.id">
        {{ item.text }}
      </option>
    </select>
    <select v-model="district" @blur="onBlur">
      <option v-for="item in districtList" :key="item.id" :value="item.id">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>
import { find } from "../util/";

const defaultRegion = [
  {
    id: -1,
    text: "请选择",
  },
];

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: Array,
  },
  data() {
    const provinceList = defaultRegion.concat(this.options);
    return {
      province: -1,
      provinceList,
      city: -1,
      cityList: defaultRegion,
      district: -1,
      districtList: defaultRegion,
    };
  },
  watch: {
    province(newVal) {
      const option = find(this.provinceList, item => {
        return item.id === newVal;
      });
      if (option.children) {
        this.city = option.children[0].id;
        this.cityList = option.children;
      }
      this.onChange();
    },
    city(newVal) {
      const option = find(this.cityList, item => {
        return item.id === newVal;
      });
      if (option.children) {
        this.district = option.children[0].id;
        this.districtList = option.children;
      }
      this.onChange();
    },
    district(newVal) {
      this.district = newVal;
      this.onChange();
    },
  },
  methods: {
    onBlur() {
      const res = this.getResult();
      this.$emit("change", res);
      this.$parent.$emit("form.blur", res);
    },
    onChange() {
      const res = this.getResult();
      this.$emit("change", res);
      this.$parent.$emit("form.change", res);
    },
    getResult() {
      const province = find(this.provinceList, item => {
        return item.id === this.province;
      });
      const city = find(this.cityList, item => {
        return item.id === this.city;
      });
      const district = find(this.districtList, item => {
        return item.id === this.district;
      });
      return [province, city, district];
    },
  },
};
</script>

<style></style>
