<script>
export default {
  name: "NoDataContent",
};
</script>
<template>
  <div class="no-data-content">
    <slot name="title" />
    <slot name="button" />
  </div>
</template>

<style lang="scss">
.no-data-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;

  .t-btn {
    margin: 1rem 0;
  }
}
</style>
