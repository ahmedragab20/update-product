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
              <th class="min-w-150px">{{ $t("name") }}</th>
              <th class="min-w-140px">{{ $t("clientEmail") }}</th>
              <th class="min-w-120px">{{ $t("clientPhoneNumber") }}</th>
              <th class="min-w-100px">{{ $t("totalCartAmount") }}</th>
              <th class="min-w-100px">{{ $t("createdAt") }}</th>
              <th class="min-w-100px">{{ $t("preview") }}</th>
              <th class="min-w-100px">
                <input
                  class="form-check-input h-20px w-20px"
                  @input="selectAll"
                  type="checkbox"
                />
              </th>
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
                      {{ item.clientFirstName + " " + item.clientLastName }}
                    </span>
                  </div>
                </td>

                <td>
                  <span class="fw-bold d-block fs-7">{{ item.clientEmail }}</span>
                </td>

                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.clientPhoneNumber }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.totalCartAmount }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ new Date(item.createdAt).toLocaleString() }}
                    </span>
                  </div>
                </td>

                <td>
                  <a
                    data-bs-toggle="modal"
                    :data-bs-target="`#abandoned-cart-details`"
                    @click="getCartDetails(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <span class="svg-icon svg-icon-3">
                      <i class="fas fa-eye"></i>
                    </span>
                  </a>
                </td>
                <td>
                  <input
                    class="form-check-input h-20px w-20px"
                    :value="item.id"
                    v-model="OfferForm.carts"
                    type="checkbox"
                  />
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
import { computed } from "vue";
import { AbandonedCart, Pagination } from "@/types";
import { AbandonedCartOffer } from "@/api/data/AbandonedCart";
import { Actions } from "@/store/enums/StoreEnums";
const props = defineProps({
  items: Array as () => Array<AbandonedCart>,
});
const { state, dispatch } = useStore();
const OfferForm = computed((): AbandonedCartOffer => state.AbandonedCarts.offerDto);

function getCartDetails(id: string) {
  dispatch(Actions.GET_ABANDONED_CART, id);
}

function selectAll(event: any) {
  const value = event.target.checked;

  if (value) {
    OfferForm.value.carts = props.items.map((cart) => cart.id);
  } else OfferForm.value.carts = [];
}
</script>

<style scoped></style>
