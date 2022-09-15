<script>
import TBtn from "@/components/FormComponents/T-Btn.vue";

export default {
  name: "QuickBox",

  components: {
    TBtn,
  },

  props: {
    boxsContent: {
      type: Array,
      required: false,
      default: [],
    },
  },
};
</script>
<template>
  <!-- .quick-box-wrapper start -->
  <div class="quick-box-wrapper">
    <!-- .quick-box start -->
    <div v-for="(box, index) in boxsContent" :key="index" class="quick-box">
      <h5>{{ $t(box.title) }}</h5>
      <p>{{ $t(box.content) }}</p>
      <TBtn @click="this.$router.push($t(box.slug))" color="primary">
        {{ $t(box.buttonText) }}
      </TBtn>
    </div>
    <!-- .quick-box finish -->
  </div>
  <!-- .quick-box-wrapper finish -->
</template>

<style lang="scss">
.quick-box-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .quick-box {
    width: calc(33.3% - 20px);
    background: #fff;
    padding: 1rem;
    border-radius: 6px;
    box-sizing: border-box;

    .t-btn {
      margin-top: 25px;
    }
  }
}
</style>
