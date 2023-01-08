<template>
  <div v-if="shops" class="overflow-auto">
    <table class="table gs-3 gy-3 gx-5">
      <thead>
      <tr
        class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
      >
        <th class="text-truncate">Shop name</th>
        <th class="text-truncate">Address</th>
        <th class="text-truncate">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(shop, $index) in shops" :key="shop.shopId">
        <td class="text-truncate">
          <div class="td-holder">
            <div
              v-if="shop.shopId && filterShop(shop.shopId)"
              class="d-flex gap-3 align-items-center"
            >
              <div style="width: 30px; height: 30px">
                <img
                  :src="filterShop(shop.shopId).logoPath"
                  class="rounded-circle w-100 h-100"
                  style="object-fit: cover"
                />
              </div>
              <div>
                {{ filterShop(shop.shopId).name }}
              </div>
            </div>
          </div>
        </td>
        <td class="text-truncate">
          <div
            v-if="shop.shopId && filterShop(shop.shopId)"
            class="td-holder"
          >
            {{ filterShop(shop.shopId).address }}
          </div>
        </td>
        <td class="text-truncate">
          <div class="td-holder">
            <button
              class="btn btn-text-warning btn-sm me-2"
              data-bs-target="#edit-shop-inventory-modal"
              data-bs-toggle="modal"
              @click.prevent="editModal(shop)"
            >
              Edit
            </button>
            <button
              @click="
                  removeShopConfirmation({
                    id: shop.productId,
                    shopId: shop.shopId,
                  })
                "
              class="btn btn-text-danger btn-sm"
              type="button"
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <BootstrapModal
      :btn-disabled="!isShopFormValid"
      :btn-submit="submitShopForm"
      :has-actions="true"
      :is-loading="shopLoading"
      btnText="Save Changes"
      headline="Edit Shop"
      size="modal-lg"
      target="edit-shop-inventory-modal"
    >
      <template #content>
        <div v-if="clickedShop && selectedShop">
          <div v-if="shops" class="mb-3">
            <h4>Choose a shop</h4>
            <div class="py-1 px-0">
              <Dropdown
                :items="generalShops"
                bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
                headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8"
                max-height="300px"
                @selectedItem="dropdownSelectedShop"
                :disabled="true"
              >
                <template #headerContent="{ item }">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div
                      v-if="selectedShop && selectedShop.name"
                      class="d-flex gap-2 align-items-center"
                    >
                      <div style="width: 25px; height: 25px">
                        <img
                          :src="selectedShop.logoPath"
                          class="rounded-circle w-100 h-100"
                          style="object-fit: cover"
                        />
                      </div>
                      <span class="text-capitalize">
                        {{ selectedShop.name }}
                      </span>
                    </div>
                    <span v-else v-text="'Select Shop'" />

                    <strong>
                      <i
                        :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"
                      ></i>
                    </strong>
                  </div>
                </template>
                <template #bodyContent="{ item }">
                  <div v-if="item" class="d-flex gap-2 align-items-center">
                    <div style="width: 25px; height: 25px">
                      <img
                        :src="item.logoPath"
                        class="rounded-circle w-100 h-100"
                        style="object-fit: cover"
                      />
                    </div>
                    <span class="text-capitalize">
                      {{ item.name }}
                    </span>
                  </div>
                </template>
              </Dropdown>
            </div>
          </div>
          <div v-if="shopForm && shopForm.shopId">
            <form class="d-flex flex-column" @submit.prevent>
              <div class="d-flex flex-wrap">
                <div class="form-group my-1 w-50 p-2">
                  <label class="h4" for="available-quantities2">
                    Available Quantities
                  </label>
                  <input
                    id="available-quantities2"
                    v-model.number="shopForm.availableQuantity"
                    class="form-control form-control-white"
                    type="number"
                  />
                </div>
                <div class="form-group my-1 w-50 p-2">
                  <label class="h4" for="maxQuantityPerOrder2">
                    Max Quantity Per Order
                  </label>
                  <input
                    id="maxQuantityPerOrder2"
                    v-model.number="shopForm.maxQuantityPerOrder"
                    class="form-control form-control-white"
                    type="number"
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap">
                <div class="form-group my-1 w-50 p-2">
                  <label class="h4" for="quantityNotificationCountLimit2">
                    Quantity Notification Count Limit
                  </label>
                  <input
                    id="quantityNotificationCountLimit2"
                    v-model.number="shopForm.quantityNotificationCountLimit"
                    class="form-control form-control-white"
                    type="number"
                  />
                </div>
                <div class="form-group my-1 w-50 p-2">
                  <label class="h4" for="maxQuantityPerClientAllThetime2">
                    Max Quantity Per Client All The Time
                  </label>
                  <input
                    id="maxQuantityPerClientAllThetime2"
                    v-model.number="shopForm.maxQuantityPerClientAllThetime"
                    class="form-control form-control-white"
                    type="number"
                  />
                </div>
                <div class="form-group my-1 p-2 w-50">
                  <label class="h4" for="preparingTimeInMinutes2">
                    Preparing Time In Minutes
                  </label>
                  <input
                    id="preparingTimeInMinutes2"
                    v-model.number="shopForm.preparingTimeInMinutes"
                    class="form-control form-control-white"
                    type="number"
                  />
                </div>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  id="isSoldOutOnShopLink2"
                  v-model="shopForm.isSoldOutOnShopLink"
                  class="form-check-input form-control-white"
                  type="checkbox"
                  :checked="shopForm.isSoldOutOnShopLink"
                />
                <label for="isSoldOutOnShopLink2">
                  Is Sold Out On Shop Link
                </label>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  id="isSoldOutOnJetOrder2"
                  v-model="shopForm.isSoldOutOnJetOrder"
                  class="form-check-input form-control-white"
                  type="checkbox"
                  :checked="shopForm.isSoldOutOnJetOrder"
                />
                <label for="isSoldOutOnJetOrder2">
                  Is Sold Out On JetOrder
                </label>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  id="isPublishedOnShopLink2"
                  v-model="shopForm.isPublishedOnShopLink"
                  class="form-check-input form-control-white"
                  type="checkbox"
                  :checked="shopForm.isPublishedOnShopLink"
                />
                <label for="isPublishedOnShopLink2">
                  Is Published On Shop Link
                </label>
              </div>
              <div class="form-group my-1 d-flex gap-2 fw-bold">
                <input
                  id="isPublishedOnJetOrderApplication2"
                  v-model="shopForm.isPublishedOnJetOrderApplication"
                  class="form-check-input form-control-white"
                  type="checkbox"
                  :checked="shopForm.isPublishedOnJetOrderApplication"
                />
                <label for="isPublishedOnJetOrderApplication2">
                  Is Published On JetOrder Application
                </label>
              </div>
            </form>
            <div class="mt-4">
              <span
                :class="
                  addingShopMessage !== 'Shop Added Successfully 😄🙌'
                    ? 'text-danger'
                    : 'text-primary'
                "
                v-text="addingShopMessage"
              />
            </div>
          </div>
        </div>
      </template>
    </BootstrapModal>
  </div>
</template>
<script lang="ts" setup>
import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useStore } from "vuex";
import { computed, nextTick, onMounted } from "vue";
import { ref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";

const props = defineProps({
  shops: {
    type: Array,
    required: true
  },
  fetchShops: {
    type: Function,
    required: true
  }
});

const store = useStore();

const clickedShop = ref();
const generalShops = computed(() => store.state.LookupQueries.shops?.data);

const filterShop = (shopId: string | number) => {
  if (
    props.shops &&
    props.shops.length > 0 &&
    shopId &&
    generalShops.value &&
    generalShops.value.length > 0
  ) {
    return generalShops.value?.find((shop) => shop.id === shopId);
  }
};
const shopForm = ref({
  shopId: null,
  availableQuantity: null,
  maxQuantityPerOrder: null,
  quantityNotificationCountLimit: null,
  maxQuantityPerClientAllThetime: null,
  isSoldOutOnShopLink: false,
  isSoldOutOnJetOrder: false,
  isPublishedOnShopLink: false,
  isPublishedOnJetOrderApplication: false,
  preparingTimeInMinutes: null
});
const shopLoading = ref(false);
const addingShopMessage = ref("");
const selectedShop = ref(null);

const dropdownSelectedShop = (selectedItem: any) => {
  selectedShop.value = selectedItem;
};

const isShopFormValid = computed(() => {
  return (
    shopForm.value.shopId &&
    shopForm.value.availableQuantity &&
    shopForm.value.maxQuantityPerOrder &&
    shopForm.value.quantityNotificationCountLimit &&
    shopForm.value.maxQuantityPerClientAllThetime &&
    shopForm.value.preparingTimeInMinutes
  );
});

const submitShopForm = async () => {
  try {
    shopLoading.value = true;
    const payload = {
      id: clickedShop.value?.productId,
      productShopOrderingDataDTO: shopForm.value
    };
    const reqData = {
      method: "post",
      url: "/ProductCommands/update-product-shop",
      payload
    };

    const { data } = await Api(reqData);
    if (data?.succeeded) {
      props.fetchShops();
      addingShopMessage.value = "Shop Added Successfully 😄🙌";
    } else {
      addingShopMessage.value = `${data.message} 🤕`;
    }
  } catch (error) {
    console.error(error);
  } finally {
    shopLoading.value = false;
    setTimeout(() => {
      addingShopMessage.value = "";
    }, 30000);
  }
};
const editModal = (shop) => {
  clickedShop.value = shop;
  nextTick(() => {
    if (shop) {
      shopForm.value.shopId = shop.shopId;
      shopForm.value.availableQuantity = shop.availableQuantity;
      shopForm.value.maxQuantityPerOrder = shop.maxQuantityPerOrder;
      shopForm.value.quantityNotificationCountLimit =
        shop.quantityNotificationCountLimit;
      shopForm.value.maxQuantityPerClientAllThetime =
        shop.maxQuantityPerClientAllThetime;
      shopForm.value.preparingTimeInMinutes = shop.preparingTimeInMinutes;
      shopForm.value.isSoldOutOnShopLink = shop.isSoldOutOnShopLink;
      shopForm.value.isSoldOutOnJetOrder = shop.isSoldOutOnJetOrder;
      shopForm.value.isPublishedOnShopLink = shop.isPublishedOnShopLink;
      shopForm.value.isPublishedOnJetOrderApplication =
        shop.isPublishedOnJetOrderApplication;

      const item = generalShops.value.find(
        (shop) => shop.id === shopForm.value.shopId
      );
      if (item) {
        dropdownSelectedShop(item);
      }
    }
  });
};
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-text-success"
  },
  buttonsStyling: false
});
const removeShopConfirmation = async (payload) => {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your shop has deleted.",
          "success"
        );

        removeShop(payload);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your shop still alive :)",
          "error"
        );
      }
    });
};
const removeShop = async (payload) => {
  try {
    const reqData = {
      method: "post",
      url: "/ProductCommands/remove-product-shop",
      payload
    };
    const { data } = await Api(reqData);
    if (data?.succeeded) {
      props.fetchShops();
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
<style scoped>
.td-holder {
  display: flex;
  align-items: center;
  height: 50px;
}
</style>
