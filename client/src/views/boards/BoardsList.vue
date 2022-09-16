<script>
import PageHeader from "@/components/shared/PageHeader.vue";
import TBtn from "@/components/FormComponents/T-Btn.vue";
import TextField from "@/components/FormComponents/TextField.vue";
import NoDataContent from "@/components/shared/NoDataContent.vue";
import Dialog from "@/components/shared/Dialog.vue";
import { fetchBoards, createBoard } from "@/services/common.service.js";
export default {
  name: "BoardsListView",

  data() {
    return {
      boards: [],
      board: {
        name: "",
        desc: "",
      },
      boardDialog: false,
    };
  },

  components: {
    PageHeader,
    TBtn,
    NoDataContent,
    Dialog,
    TextField,
  },

  methods: {
    async getAllBoards() {
      // fetchBoards service
      this.boards = await fetchBoards();
    },

    async createBoard() {
      // createBoard service
      await createBoard(this.board);
      this.getAllBoards();
      this.popupClosed();
    },

    popupClosed() {
      // Popup closed & board form clear
      this.boardDialog = false;
      this.board.name = "";
      this.board.desc = "";
    },
  },

  async created() {
    this.getAllBoards();
  },
};
</script>
<template>
  <div v-if="boards.length > 0" class="boards-list-view">
    <Dialog v-if="boardDialog" max-width="600">
      <template #title>
        <h4>Dialog</h4>
      </template>
      <template #content>
        <form @submit.prevent="" class="form">
          <div class="form-group">
            <TextField v-model="board.name" label="Pano Adı" color="primary" />
          </div>
          <div class="form-group">
            <TextField
              v-model="board.desc"
              label="Pano Açıklaması"
              color="primary"
            />
          </div>
        </form>
      </template>
      <template #footer>
        <TBtn @click="popupClosed" styled="outlined" color="primary">
          Kapat
        </TBtn>
        <TBtn @click="createBoard" styled="filled" color="primary"> Ekle </TBtn>
      </template>
    </Dialog>

    <PageHeader :title="$t(`boardslist.PageHeader`)">
      <template #pageHeaderButton>
        <TBtn @click="boardDialog = true" color="primary">{{
          $t("boardslist.pageHeaderButton")
        }}</TBtn>
      </template>
    </PageHeader>
    <!-- .boards-list-wrapper start -->
    <div class="boards-list-wrapper">
      <!-- .board-box start -->
      <div v-for="board in boards" :key="board.id" class="board-box">
        <h5>{{ board.name }}</h5>
        <p>{{ board.desc }}</p>
        <div class="board-actions"></div>
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
