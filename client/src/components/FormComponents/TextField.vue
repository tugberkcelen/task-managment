<script>
export default {
  name: "TextField",

  data() {
    return {};
  },

  props: {
    type: {
      required: false,
      default: "text",
    },

    color: {
      required: false,
      default: "primary",
    },

    label: {
      required: false,
      default: "",
    },
    modelValue: {
      required: false,
      default: "",
    },
    required: {
      required: false,
      default: "",
    },
  },

  mounted() {
    const element = this.$el.querySelector(".text-field__slot");

    if (this.modelValue !== "") {
      element.classList.add("t-text__field");
    } else {
      element.classList.remove("t-text__field");
    }
  },

  methods: {
    inputClick(event) {
      this.$el.querySelector(".text-field__input").style.borderColor =
        this.$opt.themes.light.primary;
    },
    onBlur() {
      this.$el.querySelector(".text-field__input").style.borderColor =
        this.$opt.themes.light.borderColor;
    },
  },

  watch: {
    modelValue: {
      handler(value) {
        const element = this.$el.querySelector(".text-field__slot");
        if (value !== "") {
          element.classList.add("t-text__field");
        } else {
          element.classList.remove("t-text__field");
        }
      },
    },
  },

  computed: {
    //
    count() {
      return this.$store.state.ui.count;
    },
    //
  },
};
</script>
<template>
  <div class="text-field__wrapper">
    <div class="text-field__input">
      <fieldset aria-hidden="true">
        <legend style="width: 63px"></legend>
      </fieldset>
      <div class="text-field__slot">
        <input
          class="t-text__field__input"
          @focus="inputClick($event)"
          @blur="onBlur"
          :type="type"
          :value="modelValue"
          :required="required"
          @input="(e) => $emit('update:modelValue', e.target.value)"
        />
        <label class="input-label">{{ label }}</label>
      </div>
    </div>
  </div>
</template>
