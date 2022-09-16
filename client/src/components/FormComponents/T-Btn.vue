<script>
export default {
  name: "T-Btn",

  data() {
    return {};
  },

  props: {
    color: {
      required: false,
      default: "primary",
    },
    styled: {
      required: false,
      default: "filled",
    },
  },
};
</script>

<template>
  <button type="submit" :class="(styled, color)" class="t-btn">
    <slot></slot>
  </button>
</template>
