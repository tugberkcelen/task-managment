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
  </div>
</template>

<style lang="scss">
.page-header {
  margin-bottom: 30px;
  padding: 1rem 0;
}
</style>
