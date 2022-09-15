<script>
import PageTitle from "@/components/shared/PageTitle.vue";
import { fetchBoards } from "@/services/common.service.js";
export default {
  name: "BoardsListView",

  data() {
    return {
      boards: [],
    };
  },

  components: {
    PageTitle,
  },

  methods: {
    async getAllBoards() {
      // fetchBoards service
      this.boards = await fetchBoards();
    },
  },

  async created() {
    this.getAllBoards();
  },
};
</script>
<template>
  <div class="boards-list-view">
    <PageTitle :title="$t(`boardslist.pageTitle`)" />
    <!-- .boards-list-wrapper start -->
    <div class="boards-list-wrapper">
      <!-- .board-box start -->
      <div v-for="board in boards" :key="board.id" class="board-box">
        {{ board.name }}
      </div>
      <!-- .board-box finish -->
    </div>
    <!-- .boards-list-wrapper finish -->
  </div>
</template>
