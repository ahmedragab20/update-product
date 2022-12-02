<template>
  <div class="card card-flush py-4 px-3">
    <div
      v-if="dynamicTags && dynamicTags.length > 0"
      class="d-flex gap-2 mb-5 flex-wrap"
    >
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="mx-1 fw-bold rounded shadow-sm"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
    </div>
    <div v-else class="text-center mb-5">No tags yet</div>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="mx-1 shadow-sm"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else
      class="button-new-tag rounded shadow-sm mx-1"
      size="small"
      @click="showInput"
    >
      + New Tag?!
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref } from "vue";
  import { ElInput } from "element-plus";

  const inputValue = ref("");
  const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
  const inputVisible = ref(false);
  const InputRef = ref<InstanceType<typeof ElInput>>();

  const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  };

  const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
      InputRef.value!.input!.focus();
    });
  };

  const handleInputConfirm = () => {
    if (inputValue.value) {
      dynamicTags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = "";
  };
</script>
