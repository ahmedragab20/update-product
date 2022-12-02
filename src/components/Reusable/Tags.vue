<template>
  <div>
    <form @submit.prevent="tagsHandler">
      <label v-if="!!label" :for="idTarget" class="form-label">
        {{ label }}
      </label>
      <input
        :id="!!label ? idTarget : ''"
        class="form-control"
        type="text"
        :placeholder="placeholder || ''"
        v-model="tag"
        @input="emit('tag', tag)"
      />
    </form>
    <div class="w-100 overflow-auto d-flex pb-2 pt-1">
      <div v-if="!!errorMsg">
        <small class="text-danger">{{ errorMsg }}</small>
      </div>
      <div v-if="tags && tags.length > 0" class="d-flex gap-2 mt-3">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="badge badge-light-dark badge-lg gap-3"
        >
          <span v-text="tag" />
          <i
            @click="removeTagHandler(tag)"
            class="bi bi-trash3 text-danger"
            style="cursor: pointer"
          />
        </div>
      </div>
      <div v-else class="mt-3">
        <small class="fw-bold text-muted">
          {{
            customEmptyStatusMessage ||
            "No items yet, type and press enter to add a new one!"
          }}
        </small>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";

const props = defineProps({
  array: {
    type: Array,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  customError: {
    type: String,
    required: false,
  },
  customEmptyStatusMessage: {
    type: String,
    required: false,
  },
  idTarget: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(["tags", "tag"]);

const tag = ref<any>("");
const tags = ref<any[]>([]);
const errorMsg = ref("");

const tagsHandler = () => {
  if (tags.value && !tags.value.includes(tag.value)) {
    tags.value.push(tag.value);
    tag.value = "";
    errorMsg.value = "";
    emit("tags", tags.value);
  } else {
    errorMsg.value = props.customError || "🥲 sorry, it's already exist!";
    emit("tags", tags.value);
  }
};
const removeTagHandler = (tag) => {
  tags.value = tags.value.filter((i) => i !== tag);
  emit("tags", tags.value);
};

onMounted(() => {
  if (props.array) {
    tags.value = props.array;
  }
});
watch(
  () => props.array,
  (newValue) => {
    if (newValue) {
      tags.value = newValue;
    }
  }
);
</script>
