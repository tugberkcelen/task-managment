<script>
export default {
  name: "TSelect",

  data() {
    return {
      testData: "item.name",
    };
  },

  props: {
    color: {
      required: false,
      default: "primary",
    },
    label: {
      required: false,
      default: "",
    },
    modelValue: {
      required: true,
    },
    required: {
      default: false,
      required: false,
    },
    items: {
      default: [],
      required: false,
    },
    itemKey: {
      default: "key",
    },
    itemValue: {
      default: "value",
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
};
</script>
<template>
  <div class="tselect-field__wrapper">
    <div class="tselect-field__select">
      <fieldset aria-hidden="true">
        <legend style="width: 63px"></legend>
      </fieldset>
      <div class="text-field__slot">
        <select
          class="t-text__field__input"
          :value="modelValue"
          :required="required"
          @input="(e) => $emit('update:modelValue', e.target.value)"
        >
          <option
            v-for="(item, index) in items"
            :key="index"
            :value="item[itemKey]"
          >
            {{ item[itemValue] }}
          </option>
        </select>
        <label class="input-label">{{ label }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tselect-field {
  &__select {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--borderColor);
    position: relative;
    align-items: center;
    border-radius: 4px;

    fieldset {
      position: absolute;
      left: 0;
    }

    legend {
      text-align: left;
      padding: 0;
    }

    .input-label {
      position: absolute;
      font-size: 0.825rem;
      left: 10px;
      top: 12px;
      transition: 0.3s all ease;
    }

    select {
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
      padding: 8px 10px;
      min-height: 40px;
      transition: 0.3s all ease;
      box-sizing: border-box;

      &:focus {
        + label {
          color: var(--primary);
          left: 10px;
          top: -8px;
          background: #fff;
          padding: 0 10px;
        }

        color: inherit;
      }
    }
  }

  &__slot {
    width: 100%;
  }
}

.t-text__field {
  label {
    left: 10px !important;
    top: -8px !important;
    background: #fff;
    padding: 0 10px;
  }

  input {
    color: inherit;
  }
}
</style>
