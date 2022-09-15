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
  },
};
</script>

<template>
  <button type="submit" :class="color" class="t-btn">
    <slot></slot>
  </button>
</template>
