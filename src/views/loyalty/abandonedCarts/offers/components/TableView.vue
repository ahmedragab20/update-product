<template>
  <div class="card">
    <div class="card-body">
      <!--begin::Body-->
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr>
              <th class="min-w-150px">{{ $t("emailHeader") }}</th>
              <th class="min-w-140px">{{ $t("createdAt") }}</th>
              <th class="min-w-120px">{{ $t("discount") }}</th>
              <th class="min-w-100px">{{ $t("cartTotal") }}</th>
              <th class="min-w-100px">{{ $t("preview") }}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in items" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="mx-3">
                      {{ item.resources[0].emailHeader }}
                    </span>
                  </div>
                </td>

                <td>
                  <span class="fw-bold d-block fs-7">{{
                    new Date(item.createdAt).toLocaleString()
                  }}</span>
                </td>

                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.prices[0].discount }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.prices[0].cartTotal }}
                    </span>
                  </div>
                </td>

                <td>
                  <a
                    data-bs-toggle="modal"
                    :data-bs-target="`#abandoned-cart-modal`"
                    @click="setFormDto(item)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mx-1"
                  >
                    <span class="svg-icon svg-icon-3">
                      <i class="fas fa-eye" />
                    </span>
                  </a>

                  <a
                    @click="deleteItem(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm mx-2"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                    </span>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref, defineEmits, computed } from "vue";
import { AbandonedCartOffer } from "@/api/data/AbandonedCart";
const { state, commit } = useStore();
let emit = defineEmits(["delete-item", "update-pagination"]);

const OfferForm = computed((): AbandonedCartOffer => state.AbandonedCarts.offerDto);

function deleteItem(id) {
  emit("delete-item", id);
}

function setFormDto(dto) {
  commit("SET_OFFER_DTO", dto);
}
defineProps({
  items: Array as () => Array<AbandonedCartOffer>,
});
</script>

<style scoped></style>
