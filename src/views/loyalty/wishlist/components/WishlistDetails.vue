<template>
    <div>
      <div class="card-body p-9">
        <div class="row mb-10">
          
          <div class="col-lg-8">
            <span class="fw-semobold fs-6">{{ shopName(wishlistDetails.shopId) }}</span>
          </div>
          <div class="col-lg-8">
            <span class="fw-semobold fs-6">{{ wishlistDetails.deviceId }}</span>
          </div>
        </div>
      </div>
      <h4 class="mx-5">{{ $t("WishlistProducts") }}</h4>
      <div class="card-body px-5">
        <!--begin::Item-->
        <div class="d-flex mb-7 px-2" v-for="product in wishlistDetails.products" :key="product.id">
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
  import Wishlist from "@/api/data/Wishlist";
  import { Market } from "@/types";
  import { computed, onMounted, onUpdated } from "vue";
  import { useStore } from "vuex";
  
  const { state, getters } = useStore();
  
  defineProps({
    isLoading: Boolean,
  });
  const market = computed(() => getters.getMarketData as Market);
  const wishlistDetails = computed((): Wishlist => getters.productWishlistDetails);
  const details = onUpdated(
    ()=>{console.log("details",wishlistDetails)}
  )
  function shopName(id) {
    return market.value?.shops?.find((m) => m.id === id)?.name
  }
  </script>
  