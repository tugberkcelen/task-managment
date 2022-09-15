<script>
import TSelect from "@/components/FormComponents/T-Select.vue";

export default {
  name: "LanguageSwitch",
  components: {
    TSelect,
  },

  data() {
    return {
      language: "TR",
      languages: [
        {
          key: "TR",
          value: "TR",
        },
        {
          key: "EN",
          value: "EN",
        },
      ],
    };
  },

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>
<template>
  <div class="language-switch-wrapper">
    <TSelect
      v-model="language"
      :items="languages"
      color="primary"
      label="🌐 Dil Seçiniz"
      @click="setLocale(language)"
    />
  </div>
</template>

<style lang="scss">
.language-switch-wrapper {
  width: 12%;
  margin-left: auto;
}
</style>
