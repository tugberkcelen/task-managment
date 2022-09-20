<script>
import { getSingleBoardById } from "@/services/board.service.js";
import {
  getSingleListByIdboard,
  createList,
  updateListById,
  deleteListById,
} from "@/services/list.service.js";
import {
  getSingleCardByIdBoard,
  createCard,
  deleteCardById,
  updateCardById,
} from "@/services/card.service.js";
import PageHeader from "@/components/shared/PageHeader.vue";
import TBtn from "@/components/FormComponents/T-Btn.vue";
import TextField from "@/components/FormComponents/TextField.vue";

import TSelect from "@/components/FormComponents/T-Select.vue";
import Badge from "@/components/shared/Badge.vue";
import draggable from "vuedraggable";
import Dialog from "@/components/shared/Dialog.vue";

export default {
  name: "BoardDetailsView",

  components: {
    PageHeader,
    Badge,
    draggable,
    TBtn,
    Dialog,
    TextField,
    TSelect,
  },

  data() {
    return {
      board: {},
      lists: [],
      list: {
        _id: "",
      },
      cards: [],
      card: {
        name: "",
        desc: "",
        importance: "low",
        image: {
          file: "",
          preview: "",
        },
      },
      createListData: {
        name: "",
        desc: "",
        idBoard: "",
        idBoardTrello: "",
      },
      createOrUpdateOrDialogCardDialogPopup: false,
      createOrUpdateOrDeleteListDialogPopup: false,
      deleteCardDialog: false,
      deleteListDialog: false,
      createOrUpdateOrDeleteCard: "",
      createOrUpdateOrDeleteList: "",
      importances: [
        {
          key: "low",
          value: "Düşük",
        },
        {
          key: "middle",
          value: "Orta",
        },
        {
          key: "high",
          value: "Yüksek",
        },
      ],
    };
  },

  async created() {
    await this.getSingleBoardById();
    await this.getSingleListByIdboard();
    await this.getSingleCardByIdBoard();

    console.log("board", this.board);
  },

  methods: {
    // getSingleBoardById
    async getSingleBoardById() {
      this.board = await getSingleBoardById(this.$route.params.id);
    },
    // getSingleListByIdboard
    async getSingleListByIdboard() {
      this.lists = await getSingleListByIdboard(this.$route.params.id);
    },
    // getSingleCardByIdBoard
    async getSingleCardByIdBoard() {
      this.cards = await getSingleCardByIdBoard(this.$route.params.id);
    },

    // createCardPopup
    createCardPopup(list) {
      this.createOrUpdateOrDeleteCard = "create";
      this.createOrUpdateOrDialogCardDialogPopup = true;
      this.list._id = list._id;
      this.list.idListTrello = list.idListTrello;
      this.card.name = "";
      this.card.desc = "";
      this.card.idBoard = "";
      this.card.importance = "low";
      this.card.status = "";
      this.card.idList = "";
      this.card.idListTrello = "";
      this.card.image = {};
      this.card.image["preview"] = "";
      this.card.image["file"] = "";
    },

    onFileChange(event) {
      this.card.image = {};
      this.card.image["preview"] = "";
      this.card.image["file"] = "";
      this.card.image.preview = URL.createObjectURL(event.target.files[0]);
      this.card.image.file = event.target.files[0];
    },

    // removeImage
    removeImage() {
      this.card.image.preview = "";
      this.card.image.file = "";
    },

    //removeEditedImage
    removeEditedImage() {
      this.card.image = {};
      this.card.image["preview"] = "";
      this.card.image["file"] = "";
    },

    changeTrelloId() {
      this.lists.forEach((list) => {
        if (this.card.idList == list._id) {
          console.log("aa", list.idListTrello);
          this.card.idListTrello = list.idListTrello;
          this.list.idListTrello = list.idListTrello;
        }
      });
    },

    // createOrUpdateOrDeleteCardFunc
    async createOrUpdateOrDeleteCardFunc() {
      if (this.createOrUpdateOrDeleteCard == "create") {
        const data = new FormData();
        data.append("name", this.card.name);
        data.append("desc", this.card.desc);
        data.append("idBoard", this.$route.params.id);
        data.append("importance", this.card.importance);
        data.append("status", true);
        data.append("idList", this.list._id);
        data.append("idListTrello", this.list.idListTrello);

        this.card.image.file.name
          ? data.append("image", this.card.image.file)
          : "";
        await createCard(data);
        this.cardPopupClosed();
      } else if (this.createOrUpdateOrDeleteCard == "update") {
        this.list.idListTrello = this.card.idListTrello;
        const data = new FormData();
        data.append("name", this.card.name);
        data.append("desc", this.card.desc);
        data.append("idBoard", this.$route.params.id);
        data.append("importance", this.card.importance);
        data.append("status", true);
        data.append("idList", this.card.idList);
        data.append("idListTrello", this.list.idListTrello);
        data.append("idCardTrello", this.card.idCardTrello);
        this.card.image?.file?.name
          ? data.append("image", this.card.image.file)
          : "";
        await updateCardById({ data: data, id: this.card._id });
        this.cardPopupClosed();
      } else {
        await deleteCardById(this.card);
        this.cardPopupClosed();
      }
    },

    // cardPopupClosed
    async cardPopupClosed() {
      this.createOrUpdateOrDialogCardDialogPopup = false;
      this.deleteCardDialog = false;
      if (this.createOrUpdateOrDeleteCard == "create") {
        this.card.name = "";
        this.card.desc = "";
        this.card.idBoard = "";
        this.card.importance = "low";
        this.card.status = "";
        this.card.idList = "";
        this.card.image.preview = "";
        this.card.image.file = "";
      }
      await this.getSingleCardByIdBoard();
    },

    //editCard
    editCard(payload) {
      console.log("payloadddburasi", payload);
      this.card = payload.card;
      this.list._id = payload.list._id;
      this.list.idListTrello = payload.list.idListTrello;
      this.createOrUpdateOrDeleteCard = "update";
      this.createOrUpdateOrDialogCardDialogPopup = true;
    },

    // deleteCardDialogFunc
    deleteCardDialogFunc(card) {
      this.card = card;
      this.createOrUpdateOrDeleteCard = "delete";
      this.deleteCardDialog = true;
    },

    // cancelDeleteCard
    async cancelDeleteCard() {
      this.deleteCardDialog = false;
    },

    // listCardPopup
    listCardPopup() {
      this.createOrUpdateOrDeleteList = "create";
      this.createOrUpdateOrDeleteListDialogPopup = true;
      this.createListData.name = "";
      this.createListData.desc = "";
      this.createListData.idBoard = "";
      this.createListData.idListTrello = "";
    },

    // listPopupClosed
    async listPopupClosed() {
      this.createOrUpdateOrDeleteListDialogPopup = false;
      this.deleteListDialog = false;
      await this.getSingleListByIdboard();
    },

    // createOrUpdateOrDeleteListFunc
    async createOrUpdateOrDeleteListFunc() {
      if (this.createOrUpdateOrDeleteList == "create") {
        this.createListData.idBoard = this.$route.params.id;
        this.createListData.idBoardTrello = this.board.idBoardTrello;
        await createList(this.createListData);
        this.listPopupClosed();
      } else if (this.createOrUpdateOrDeleteList == "update") {
        await updateListById(this.createListData);
        this.listPopupClosed();
      } else {
        await deleteListById({
          list: this.createListData,
          idListTrello: this.createListData.idListTrello,
        });
        this.listPopupClosed();
      }
    },

    // deleteCardDialogFunc
    deleteListDialogFunc(list) {
      this.createListData = list;
      this.cards.forEach((card) => {
        if (card.idList == this.createListData._id) {
          console.log("forEachCard", this.card);
          this.card = card;
        }
      });
      this.createOrUpdateOrDeleteList = "delete";
      this.deleteListDialog = true;
    },

    // cancelDeleteCard
    async cancelDeleteCard() {
      this.deleteListDialog = false;
    },

    // editList
    editList(payload) {
      this.createListData = payload;
      this.createOrUpdateOrDeleteList = "update";
      this.createOrUpdateOrDeleteListDialogPopup = true;
    },
  },
};
</script>
<template>
  <div class="board-details-view">
    <PageHeader :title="this.board.name">
      <template #pageHeaderButton>
        <TBtn @click="listCardPopup" color="primary"> Liste ekle </TBtn>
      </template>
    </PageHeader>
    <Dialog
      class="card-accepted-for-delete"
      v-if="deleteCardDialog"
      max-width="600"
    >
      <template #title>
        <h4 class="text-center">
          Kartı Silmek İstediğinize <br />Emin misiniz ?
        </h4>
      </template>
      <template #content>
        <div class="dual-button justify-content-center">
          <TBtn @click="cancelDeleteCard" styled="outlined" color="primary">
            İptal Et
          </TBtn>
          <TBtn
            @click="createOrUpdateOrDeleteCardFunc"
            styled="filled"
            color="primary"
          >
            Sil
          </TBtn>
        </div>
      </template>
    </Dialog>
    <Dialog
      class="card-accepted-for-delete"
      v-if="deleteListDialog"
      max-width="600"
    >
      <template #title>
        <h4 class="text-center">
          Listeyi Silmek İstediğinize <br />Emin misiniz ?
        </h4>
      </template>
      <template #content>
        <div class="dual-button justify-content-center">
          <TBtn @click="cancelDeleteList" styled="outlined" color="primary">
            İptal Et
          </TBtn>
          <TBtn
            @click="createOrUpdateOrDeleteListFunc"
            styled="filled"
            color="primary"
          >
            Sil
          </TBtn>
        </div>
      </template>
    </Dialog>
    <!-- .add-card-dialog start -->
    <Dialog
      v-if="createOrUpdateOrDialogCardDialogPopup"
      class="add-card-dialog"
    >
      <template #title>
        <h4 v-if="createOrUpdateOrDeleteCard == 'create'">Kart Ekle</h4>
        <h4 v-else>Kart Düzenle</h4>
      </template>
      <template #content>
        <!-- .form-group start -->
        <div class="form-group">
          <TextField
            type="text"
            v-model="card.name"
            label="Kart Adı"
            color="primary"
          />
        </div>
        <!-- .form-group finish -->
        <!-- .form-group start -->
        <div class="form-group">
          <TextField
            type="text"
            v-model="card.desc"
            label="Kart Açıklaması"
            color="primary"
          />
        </div>
        <!-- .form-group finish -->
        <!-- .form-group start -->
        <div class="form-group">
          <TSelect
            v-model="card.importance"
            :items="importances"
            color="primary"
            label="Önem Durumu Seçiniz"
          />
        </div>
        <!-- .form-group finish -->
        <!-- .form-group start -->
        <div v-if="createOrUpdateOrDeleteCard == 'update'" class="form-group">
          <TSelect
            v-model="card.idList"
            :items="lists"
            item-key="_id"
            item-value="name"
            color="primary"
            @input="changeTrelloId"
            label="Liste Durumunu Seçin"
          />
        </div>
        <!-- .form-group finish -->
        <!-- .form-group start -->
        <div class="form-group">
          <TextField
            type="file"
            @change="onFileChange($event)"
            ref="inputFile"
            color="primary"
            accept="image/*"
          />
          <!-- .form-group finish -->
          <!-- .form-group start -->
        </div>
        <!-- .form-group finish -->

        <!-- .form-group start -->
        <div class="form-group">
          <!-- .image-preview start -->
          <div v-if="card.image?.preview" class="image-preview">
            <!-- .remove-image start -->
            <TBtn
              @click="removeImage"
              class="remove-image"
              width="30"
              height="40"
              color="error"
            >
              <i class="fad fa-trash-alt"></i>
            </TBtn>
            <!-- .remove-image finish -->
            <img :src="card.image?.preview" alt="" />
          </div>
          <!-- .image-preview finish -->
          <!-- .image-preview start -->
          <div
            v-if="
              card.image?.preview != '' &&
              createOrUpdateOrDeleteCard == 'update'
            "
            class="image-preview preview-1"
          >
            <!-- .remove-image start -->
            <TBtn
              @click="removeEditedImage"
              class="remove-image"
              width="30"
              height="40"
              color="error"
            >
              <i class="fad fa-trash-alt"></i>
            </TBtn>
            <!-- .remove-image finish -->
            <img
              v-if="card.image"
              :src="`http://localhost:3000/uploads/cards/` + card.image"
              :alt="card.name"
            />
          </div>
          <!-- .image-preview finish -->
        </div>
      </template>
      <template #footer>
        <TBtn @click="cardPopupClosed" styled="outlined" color="primary">
          Kapat
        </TBtn>
        <TBtn
          v-if="createOrUpdateOrDeleteCard == 'create'"
          @click="createOrUpdateOrDeleteCardFunc"
          styled="filled"
          color="primary"
        >
          Ekle
        </TBtn>
        <TBtn
          v-else
          @click="createOrUpdateOrDeleteCardFunc"
          styled="filled"
          color="primary"
        >
          Güncelle
        </TBtn>
      </template>
    </Dialog>
    <!-- .add-card-dialog finish -->
    <!-- .add-card-dialog start -->
    <Dialog
      v-if="createOrUpdateOrDeleteListDialogPopup"
      class="add-card-dialog"
    >
      <template #title>
        <h4 v-if="createOrUpdateOrDeleteCard == 'create'">
          Liste Elemanı Ekle
        </h4>
        <h4 v-else>Liste Elemanı Düzenle</h4>
      </template>
      <template #content>
        <!-- .form-group start -->
        <div class="form-group">
          <TextField
            type="text"
            v-model="createListData.name"
            label="Liste Adı"
            color="primary"
          />
        </div>
        <!-- .form-group finish -->
        <!-- .form-group start -->
        <div class="form-group">
          <TextField
            type="text"
            v-model="createListData.desc"
            label="Liste Açıklaması"
            color="primary"
          />
        </div>
        <!-- .form-group finish -->
      </template>
      <template #footer>
        <TBtn @click="listPopupClosed" styled="outlined" color="primary">
          Kapat
        </TBtn>
        <TBtn
          v-if="createOrUpdateOrDeleteList == 'create'"
          @click="createOrUpdateOrDeleteListFunc"
          styled="filled"
          color="primary"
        >
          Ekle
        </TBtn>
        <TBtn
          v-else
          @click="createOrUpdateOrDeleteListFunc"
          styled="filled"
          color="primary"
        >
          Güncelle
        </TBtn>
      </template>
    </Dialog>
    <!-- .add-card-dialog finish -->
    <!-- .list-wrapper start -->
    <div class="list-wrapper">
      <!-- .list-box start -->
      <div
        v-for="(list, index) in lists"
        :key="index"
        class="list-box"
        :style="{ width: `calc(100% / ${lists.length})` }"
      >
        <!-- .list-title start -->
        <h6 class="list-title">{{ list.name }}<br /></h6>
        <!-- .list-title finish -->
        <!-- .list-actions-button start -->
        <div class="list-actions-button dual-button">
          <TBtn
            @click="editList(list)"
            class="circle"
            width="35"
            height="35"
            color="information"
          >
            <i class="fad fa-edit"></i>
          </TBtn>
          <TBtn
            @click="deleteListDialogFunc(list)"
            class="circle"
            width="35"
            height="35"
            color="error"
          >
            <i class="fad fa-trash-alt"></i>
          </TBtn>
        </div>
        <!-- .list-actions-button start -->

        <!-- .card-wrapper start -->
        <div class="card-wrapper">
          <!-- .card start -->
          <template v-for="(card, index) in cards">
            <div v-if="list._id == card.idList" :key="index" class="card-box">
              <!-- .card-content start -->
              <div class="card-content">
                <!-- .title-wrapper start -->
                <div class="title-wrapper">
                  <!-- .card-importance start -->
                  <h6>{{ card.name }}</h6>
                  <div class="card-importance">
                    <Badge :text="card.importance" />
                  </div>
                  <!-- .card-importance finish -->
                </div>
                <!-- .title-wrapper finish -->
                <!-- .card-image start -->
                <div class="card-image">
                  <img
                    v-if="card.image"
                    :src="`http://localhost:3000/uploads/cards/` + card.image"
                    :alt="card.name"
                  />
                </div>
                <!-- .card-image finish -->
                <p>{{ card.desc }}</p>
              </div>
              <!-- .card-content finish -->

              <!-- .card-footer start -->
              <div class="card-footer">
                <!-- .card-actions start -->
                <div class="card-actions dual-button">
                  <TBtn
                    @click="editCard({ card: card, list: list })"
                    width="35"
                    height="35"
                    color="information"
                  >
                    <i class="fad fa-edit"></i>
                  </TBtn>
                  <TBtn
                    @click="deleteCardDialogFunc(card)"
                    width="35"
                    height="35"
                    color="error"
                  >
                    <i class="fad fa-trash-alt"></i>
                  </TBtn>
                </div>
                <!-- .card-actions finish -->
                <!-- .date start -->
                <span class="date">
                  <i class="fad fa-calendar-week"></i>
                  {{ $dayjs(card.createdAt).format("DD.MM.YYYY") }}
                </span>
                <!-- .date finish -->
              </div>
              <!-- .card-footer finish -->
            </div>
          </template>
          <div @click="createCardPopup(list)" class="card-box card-new-item">
            Kart Ekle
          </div>
          <!-- .card start -->
        </div>
        <!-- .card-wrapper finish -->
      </div>
      <!-- .list-box finish -->
    </div>
    <!-- .list-wrapper finish -->
  </div>
</template>

<style lang="scss">
.list-wrapper {
  display: flex;
  gap: 20px;

  .list-box {
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    box-sizing: border-box;
    height: fit-content;
    position: relative;

    .list-title {
      margin-bottom: 20px;
    }

    .list-actions-button {
      position: absolute;
      right: 20px;
      top: 5px;
    }
  }
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .card-box {
    padding: 1rem;
    border: 2px solid var(--borderColor);
    background: var(--borderColor);
    border-radius: 6px;
    position: relative;

    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h6 {
        margin-bottom: 0;
      }
    }

    .card-image {
      margin: 1rem 0;
      img {
        width: 100%;
        height: auto;
        object-fit: contain;
      }
    }

    &.card-new-item {
      text-align: center;
      border-style: dashed;
      background: #fff;
      font-weight: 600;
      transition: 0.3s all ease;
      cursor: pointer;

      &:hover {
        border-color: var(--primary);
        color: var(--primary);
      }
    }

    .card-footer {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px solid #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .date {
        font-size: 0.775rem;
        font-weight: 500;
      }
    }
  }
}

.image-preview {
  width: 220px;
  height: 220px;
  border: 2px dashed var(--borderColor);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .remove-image {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
