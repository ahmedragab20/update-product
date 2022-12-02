<template>
  <div>
    <div class="card-body p-9">
      <div class="row mb-7">
        <label class="col-lg-4 fw-semobold text-muted">{{ $t("clientName") }}</label>
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            ` ${cartDetails.clientFirstName}
                      ${cartDetails.clientLastName}`
          }}</span>
        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semobold text-muted">
          {{ $t("clientPhoneNumber") }}
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="Phone number must be active"
          ></i
        ></label>
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{ cartDetails.clientPhoneNumber }}</span>
        </div>
      </div>
      <div class="row mb-7">
        <label class="col-lg-4 fw-semobold text-muted">{{ $t("clientEmail") }}</label>
        <div class="col-lg-8">
          <a href="#" class="fw-semobold fs-6 text-dark text-hover-primary">{{
            cartDetails.clientEmail
          }}</a>
        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semobold text-muted">
          {{ $t("createdAt") }}
        </label>
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            new Date(cartDetails.createdAt).toLocaleString()
          }}</span>
        </div>
      </div>

      <div class="row mb-7">
        <label class="col-lg-4 fw-semobold text-muted">{{ $t("totalCartAmount") }}</label>
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ cartDetails.totalCartAmount }}</span>
        </div>
      </div>

      <div class="row mb-10">
        <label class="col-lg-4 fw-semobold text-muted">{{ $t("shop") }}</label>
        <div class="col-lg-8">
          <span class="fw-semobold fs-6" v-if="shopName">{{ shopName }}</span>
        </div>
      </div>
    </div>
    <h4 class="mx-5">{{ $t("cartProducts") }}</h4>
    <div class="card-body px-5">
      <!--begin::Item-->
      <div class="d-flex mb-7 px-2" v-for="product in cartDetails.products">
        <!--begin::Symbol-->
        <div class="symbol symbol-60px symbol-2by3 flex-shrink-0 me-4">
          <img :src="product.thumbnail" class="mw-100" alt="" />
        </div>
        <!--end::Symbol-->
        <!--begin::Section-->
        <div class="d-flex align-items-center flex-wrap flex-grow-1 mt-n2 mt-lg-n1">
          <!--begin::Title-->
          <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pe-3">
            <a href="#" class="fs-5 text-gray-800 text-hover-primary fw-bold">{{
              product.name
            }}</a>
            <span class="text-gray-400 fw-semibold fs-7"
              >{{ $t("quantity") }}:
              <a href="#" class="text-primary fw-bold">{{ product.quantity }}</a></span
            >
          </div>
          <!--end::Title-->
          <!--begin::Info-->
          <div class="text-end py-lg-0 py-2">
            <span class="text-gray-800 fw-bolder fs-l3"
              >{{ product.price }} <span class="mx-1 text-primary">$</span></span
            >
          </div>
          <!--end::Info-->
        </div>
        <!--end::Section-->
      </div>
      <!--end::Item-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import AbandonedCart from "@/api/data/AbandonedCart";
import { Market } from "@/types";
import { computed } from "vue";
import { useStore } from "vuex";

const { state, getters } = useStore();

defineProps({
  isLoading: Boolean,
});
const market = computed(() => getters.getMarketData as Market);
const cartDetails = computed((): AbandonedCart => getters.getAbandonedCartDetails);

const shopName = computed(
  () => market.value?.shops?.find((m) => m.id === cartDetails.value.shopId)?.name
);
</script>
