<script>
import LeftSideBar from "@/components/layouts/LeftSideBar.vue";
import PanelHeader from "@/components/layouts/PanelHeader.vue";
export default {
  components: { LeftSideBar, PanelHeader },

  created() {
    // Main.js in global opt
    Object.entries(this.$opt.themes.light).forEach((color) => {
      const [key, value] = color;
      document.documentElement.style.setProperty(`--${key}`, `${value}`);
    });
  },
};
</script>

<template>
  <div id="app-wrapper">
    <LeftSideBar />
    <main class="main-app">
      <PanelHeader />
      <div id="router-view-wrapper">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style lang="scss"></style>
