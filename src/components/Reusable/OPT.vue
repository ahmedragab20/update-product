<template>
  <div>
    <v-otp-input
      ref="otpInput"
      input-classes="otp-input"
      separator=" "
      :num-inputs="4"
      :should-auto-focus="true"
      :is-input-num="true"
      :conditionalClass="['one', 'two', 'three', 'four']"
      :placeholder="['*', '*', '*', '*']"
      @on-complete="handleOnComplete"
    />
  </div>
</template>

<script lang="ts" setup>
  import VOtpInput from "vue3-otp-input";

  defineProps({
    handleOnComplete: Function,
  });
</script>

<style>
  .otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  /* Background colour of an input field with value */
  .otp-input.is-complete {
    background-color: #eaeaea65;
    border: 1px solid #0bb783;
  }
  .otp-input::-webkit-inner-spin-button,
  .otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
    opacity: 0.5;
  }
  input:focus {
    outline: none;
    border: 1px solid #04c8c8;
  }
</style>
