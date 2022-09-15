<script>
export default {
  name: "TRadio",

  data() {
    return {};
  },

  props: {
    color: {
      required: false,
      default: "primary",
    },
    value: {
      required: true,
    },
    label: {
      required: false,
      default: "",
    },
    modelValue: {
      required: true,
      default: "",
    },
  },
};
</script>
<template>
  <div class="t-radio__wrapper">
    <input
      class="t-radio__hidden"
      type="radio"
      id="test"
      :value="value"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      name="test"
    />
    <span class="t-radio__type"></span>
    <div class="t-radio__comp"></div>
    <label class="t-radio__label" name="test" for="test">{{ label }} </label>
  </div>
</template>
