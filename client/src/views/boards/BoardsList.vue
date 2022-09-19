<script>
import PageHeader from "@/components/shared/PageHeader.vue";
import TBtn from "@/components/FormComponents/T-Btn.vue";
import TextField from "@/components/FormComponents/TextField.vue";
import NoDataContent from "@/components/shared/NoDataContent.vue";
import Dialog from "@/components/shared/Dialog.vue";
import {
  fetchBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
} from "@/services/board.service.js";
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
      deleteBoardDialog: false,
      createOrUpdateOrDelete: "",
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
    // fetchBoards service
    async getAllBoards() {
      this.boards = await fetchBoards();
    },

    // createBoard popup
    popupOpen() {
      this.createOrUpdateOrDelete = "create";
      this.boardDialog = true;
      this.board.name = "";
      this.board.desc = "";
    },

    // createBoard service
    async createOrUpdateBoard() {
      alert("test");
      if (this.createOrUpdateOrDelete == "create") {
        await createBoard(this.board);
        this.popupClosed();
      } else if (this.createOrUpdateOrDelete == "update") {
        await updateBoardById(this.board);
        this.popupClosed();
      } else {
        await deleteBoardById(this.board);
        this.popupClosed();
      }
    },

    // Popup closed & board form clear
    async popupClosed() {
      this.boardDialog = false;
      this.deleteBoardDialog = false;
      if (this.createOrUpdateOrDelete == "create") {
        this.board.name = "";
        this.board.desc = "";
      }
      this.boards = await fetchBoards();
    },

    // Edit board
    editBoard(board) {
      this.board = board;
      this.createOrUpdateOrDelete = "update";
      this.boardDialog = true;
    },

    // deleteBoardDialog
    deleteBoardDialogFunc(board) {
      this.board = board;
      this.createOrUpdateOrDelete = "delete";
      this.deleteBoardDialog = true;
    },

    // cancelDeleteBoard
    async cancelDeleteBoard() {
      this.deleteBoardDialog = false;
      this.boards = await fetchBoards();
    },
  },

  // Created getAllBoards
  async created() {
    this.getAllBoards();
  },
};
</script>
<template>
  <div v-if="boards.length > 0" class="boards-list-view">
    <Dialog v-if="boardDialog" max-width="600">
      <template #title>
        <h4>Pano Ekle</h4>
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
        <TBtn
          v-if="createOrUpdateOrDelete == 'create'"
          @click="createOrUpdateBoard"
          styled="filled"
          color="primary"
        >
          Ekle
        </TBtn>
        <TBtn
          v-else
          @click="createOrUpdateBoard"
          styled="filled"
          color="primary"
        >
          Güncelle
        </TBtn>
      </template>
    </Dialog>

    <Dialog v-if="deleteBoardDialog" max-width="600">
      <template #title>
        <h4 class="text-center">
          Panoyu Silmek İstediğinize <br />Emin misiniz ?
        </h4>
      </template>
      <template #content>
        <div class="dual-button justify-content-center">
          <TBtn @click="cancelDeleteBoard" styled="outlined" color="primary">
            İptal Et
          </TBtn>
          <TBtn @click="createOrUpdateBoard" styled="filled" color="primary">
            Sil
          </TBtn>
        </div>
      </template>
    </Dialog>

    <PageHeader :title="$t(`boardslist.PageHeader`)">
      <template #pageHeaderButton>
        <TBtn @click="popupOpen" color="primary">{{
          $t("boardslist.pageHeaderButton")
        }}</TBtn>
      </template>
    </PageHeader>
    <!-- .boards-list-wrapper start -->
    <div class="boards-list-wrapper">
      <!-- .board-box start -->
      <div v-for="(board, key) in boards" :key="key" class="board-box">
        <h5>{{ board.name }}</h5>
        <p>{{ board.desc }}</p>
        <div class="board-actions">
          <TBtn
            @click="
              $router.push({
                name: 'board-details',
                params: { id: board._id },
              })
            "
            width="40"
            height="40"
            color="success"
          >
            <i class="fad fa-eye"></i
          ></TBtn>
          <TBtn
            @click="editBoard(board)"
            width="40"
            height="40"
            color="information"
          >
            <i class="fad fa-edit"></i>
          </TBtn>
          <TBtn
            @click="deleteBoardDialogFunc(board)"
            width="40"
            height="40"
            color="error"
          >
            <i class="fad fa-trash-alt"></i>
          </TBtn>
        </div>
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

    .board-actions {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
