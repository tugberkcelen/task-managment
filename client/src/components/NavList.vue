<script>
export default {
  name: "NavList",

  props: {
    navListData: {
      type: Array,
      required: false,
      default: [],
    },
  },
};
</script>
<template>
  <div id="nav-list" class="nav-list-container">
    <!-- .list-wrapper start -->
    <nav class="list-wrapper">
      <!-- .item start -->
      <router-link
        v-for="(list, index) in navListData"
        :key="index"
        class="item"
        :to="list.slug"
      >
        <i :class="`fad ${list.icon}`"></i>
        <span class="name"> {{ $t(list.name) }} </span>
      </router-link>
      <!-- .item finish -->
    </nav>
    <!-- .list-wrapper finish -->
  </div>
</template>

<style lang="scss">
#nav-list {
  display: flex;
  padding: 0 0.5rem;
  justify-content: center;
  margin-top: 35px;

  .list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
      font-size: 1rem;
      font-weight: 500;
      transition: 0.3s all ease;

      &.router-link-active {
        color: var(--primary);
      }

      i {
        font-size: 26px;
      }

      &:hover {
        color: var(--primary);
      }
    }
  }
}
</style>
