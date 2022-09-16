<script>
export default {
  name: "Dialog",

  props: {
    maxWidth: {
      type: String,
      default: "600",
      required: false,
    },
  },
};
</script>

<template>
  <!-- .dialog-wrapper start -->
  <div class="dialog-wrapper">
    <!-- .background-wrapper start -->
    <div class="background-wrapper">
      <!-- .dialog-content start -->
      <div :style="{ width: maxWidth + 'px' }" class="dialog-content-wrapper">
        <!-- .dialog-title start -->
        <div class="dialog-title">
          <slot name="title" />
        </div>
        <!-- .dialog-title finish -->
        <!-- .dialog-content start -->
        <div class="dialog-content">
          <slot name="content" />
        </div>
        <!-- .dialog-content finish -->
        <!-- .dialog-footer start -->
        <div class="dialog-footer">
          <slot name="footer" />
        </div>
        <!-- .dialog-footer finish -->
      </div>
      <!-- .dialog-content finish -->
    </div>
    <!-- .background-wrapper finish -->
  </div>
  <!-- .dialog-wrapper finish -->
</template>

<style lang="scss">
.dialog-wrapper {
  position: fixed;
  inset: 0;
  z-index: 999;

  .background-wrapper {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .dialog-content-wrapper {
      background: #fff;
      padding: 1rem;
      box-sizing: border-box;
      border-radius: 6px;

      .dialog-title {
        padding: 1rem 0;
      }

      .dialog-footer {
        display: flex;
        justify-content: right;
        gap: 20px;
      }
    }
  }
}
</style>
