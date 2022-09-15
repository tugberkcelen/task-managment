<script>
import LanguageSwitch from "@/components/LanguageSwitch.vue";
export default {
  name: "PanelHeader",

  components: {
    LanguageSwitch,
  },
};
</script>

<template>
  <div class="panel-header-wrapper">
    <LanguageSwitch />
  </div>
</template>

<style lang="scss">
.panel-header-wrapper {
  min-height: 46px;
  background: #fff;
  border-bottom: 1px solid var(--borderColor);
  padding: 1rem 1.8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
