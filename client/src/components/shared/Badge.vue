<script>
export default {
  name: "Badge",

  props: {
    text: {
      default: "",
      required: true,
    },
  },
};
</script>
<template>
  <div class="badge-wrapper">
    <span class="badge-text"> {{ text }} </span>
  </div>
</template>

<style lang="scss">
.badge-wrapper {
  padding: 0.375rem 1rem;
  background: var(--informationRgb);
  border: 1px solid var(--information);
  color: var(--information);
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 4px;
}
</style>
