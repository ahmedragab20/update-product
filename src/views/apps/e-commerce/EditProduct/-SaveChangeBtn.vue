<template>
  <div v-if="elChanged && elChanged !== 'done'" :class="buttonsHolderClasses">
    <button
      v-if="elChanged !== 'done'"
      @click="submitFunction"
      type="button"
      class="submit-button rounded-2"
      :class="submitBtnClasses"
      :disabled="elLoading"
    >
      <span v-if="elLoading" class="spinner-border-sm spinner-border" />
      <span v-else v-text="submitBtnText" />
    </button>
    <button
      v-if="!noCancel || elChanged === 'done'"
      @click="btnReverseSubmit"
      type="button"
      class="rounded-2"
      :class="reverseBtnClasses"
      :disabled="elLoading"
      v-text="reverseBtnText"
    />
  </div>
  <div v-if="elChanged === 'done'" class="text-success btn-lg fw-bold">
    <i class="fas fa-check text-success"></i>
    <span class="m-1">Saved</span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  elChanged: boolean | string;
  elLoading: boolean;
  btnSubmit: Function;
  btnReverseSubmit?: Function;
  noCancel?: boolean;
  payload?: any;
  submitBtnClasses?: string;
  reverseBtnClasses?: string;
  buttonsHolderClasses?: string;
  submitBtnText?: string;
  reverseBtnText?: string;
  completionMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  submitBtnClasses: "btn btn-light-primary btn-sm",
  reverseBtnClasses: "btn btn-light btn-sm",
  buttonsHolderClasses: "d-flex flex-wrap gap-2",
  submitBtnText: "Save Changes",
  reverseBtnText: "decline",
  completionMessage: "Done",
  noCancel: false,
});

const submitFunction = () => {
  if (props.elChanged === "done") {
    return;
  }

  props.payload ? props.btnSubmit(props.payload) : props.btnSubmit();
};
</script>

<style scoped>
.submit-button {
  animation: activeButton 0.4s alternate infinite;
}

@keyframes activeButton {
  0% {
    transform: scale(0);
  }
  0% {
    transform: scale(1.05);
  }
}
</style>
