<script>
import Logo from "@/components/Logo.vue";
import NavList from "@/components/NavList.vue";
export default {
  name: "LeftSideBar",

  components: {
    Logo,
    NavList,
  },

  data() {
    return {
      navListData: [
        {
          name: "sideBar.navLists1.title",
          icon: "fa-sliders-v-square",
          slug: "/",
        },
        {
          name: "sideBar.navLists2.title",
          icon: "fa-clipboard",
          slug: "/boards/list",
        },
      ],
    };
  },
};
</script>
<template>
  <div class="sidebar-wrapper">
    <!-- #logo start -->
    <Logo />
    <!-- #logo finish -->
    <!-- #nav-list start -->
    <NavList :navListData="navListData" />
    <!-- #nav-list finish -->
  </div>
</template>

<style lang="scss">
.sidebar-wrapper {
  border-right: 2px solid var(--borderColor);
  width: 18%;
  background: #fff;
  display: flex;
  flex-direction: column;
}
</style>
