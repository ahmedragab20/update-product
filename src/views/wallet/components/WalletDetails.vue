<template>
  <!--begin::Customer-->
  <div class="card mb-5">
    <div class="card-body pt-13 pb-0">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-10">
        <div class="flex-grow-1">
          <!--begin::Title-->

          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::wallet-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                  >{{ form.name }}</a
                >
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="/media/icons/duotune/general/gen026.svg" />
                  </span>
                </a>
              </div>
              <!--end::Name-->
            </div>
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      {{ form.availableBalance }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    {{ $t("availableBalance") }}
                  </div>
                  <!--end::Label-->
                </div>
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bolder"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      {{ form.freezedBalance }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    {{ $t("freezedBalance") }}
                  </div>
                  <!--end::Label-->
                </div>
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div class="fs-5 fw-bolder">
                      {{ form.currency }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-bold fs-6 text-gray-400">
                    {{ $t("currency") }}
                  </div>
                  <!--end::Label-->
                </div>
              </div>
              <!--end::Stats-->
            </div>
          </div>
          <!--end::Stats-->
        </div>
      </div>
    </div>
  </div>
  <!--end::Customer-->
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { defineProps, ref } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
const store = useStore();



  interface props {
    id: String,
  shopId: String,
}
interface shopDetailsType {
  name: String;
  availableBalance: String;
  freezedBalance: String;
  currency: String;
}
const form = ref<shopDetailsType>({
  name: '',
  availableBalance: '',
  freezedBalance: '',
  currency: '',
});
const props = defineProps<props>();
function getWallet(id: string) {
  store.dispatch(Actions.GET_WALLET_BY_ID, id).then((data: shopDetailsType) => {

    form.value = data;
    store.commit(Mutations.SET_WALLET_DETAILS, data);
  });
}
getWallet(props.shopId);
</script>
