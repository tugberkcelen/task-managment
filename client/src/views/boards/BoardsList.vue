<script>
import PageHeader from "@/components/shared/PageHeader.vue";
import TBtn from "@/components/FormComponents/T-Btn.vue";
import NoDataContent from "@/components/shared/NoDataContent.vue";
import { fetchBoards } from "@/services/common.service.js";
export default {
  name: "BoardsListView",

  data() {
    return {
      boards: [],
    };
  },

  components: {
    PageHeader,
    TBtn,
    NoDataContent,
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
  <div v-if="boards.length > 0" class="boards-list-view">
    <PageHeader :title="$t(`boardslist.PageHeader`)">
      <template #pageHeaderButton>
        <TBtn color="primary">{{ $t("boardslist.pageHeaderButton") }}</TBtn>
      </template>
    </PageHeader>
    <!-- .boards-list-wrapper start -->
    <div class="boards-list-wrapper">
      <!-- .board-box start -->
      <div v-for="board in boards" :key="board.id" class="board-box">
        <h5>{{ board.name }}</h5>
      </div>
      <!-- .board-box finish -->
    </div>
    <!-- .boards-list-wrapper finish -->
  </div>
  <NoDataContent v-else>
    <template #title>
      {{ $t("boardslist.nodatacontent") }}
    </template>
    <template #button>
      <TBtn color="primary">{{ $t("boardslist.pageHeaderButton") }}</TBtn>
    </template>
  </NoDataContent>
</template>
<style lang="scss">
.boards-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .board-box {
    width: calc(33.3% - 20px);
    background: #fff;
    padding: 2rem 1rem;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;

    .t-btn {
      margin-top: 25px;
    }
  }
}
</style>
