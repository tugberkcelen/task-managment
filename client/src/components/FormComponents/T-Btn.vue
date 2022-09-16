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
    width: {
      required: false,
    },
    height: {
      required: false,
    },
  },
};
</script>

<template>
  <button
    :style="{
      'border-color': `var(--${color})`,
      width: width + 'px',
      height: height + 'px',
    }"
    type="submit"
    :class="color"
    class="t-btn"
  >
    <slot></slot>
  </button>
</template>
