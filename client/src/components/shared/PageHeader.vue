<script>
export default {
  name: "WelcomeMessage",

  props: {
    title: {
      required: false,
      default: "",
    },
  },
};
</script>
<template>
  <div class="page-header">
    <h5>{{ title }}</h5>
    <slot name="pageHeaderButton" />
  </div>
</template>

<style lang="scss">
.page-header {
  margin-bottom: 30px;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 0;
  }
}
</style>
