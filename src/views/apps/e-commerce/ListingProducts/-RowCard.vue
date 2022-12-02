<template>
  <div
    @click="setItemUnderEditId(product.id)"
    class="rounded-3 bg-light shadow w-100"
    style="height: 250px"
  >
    <div class="row h-75 px-2 overflow-hidden w-100">
      <div class="col-sm-5 h-100 p-4">
        <div class="img-div position-relative rounded h-100 w-100 shadow">
          <span
            @click="$refs.editThumbnail.click()"
            class="position-absolute translate-middle badge badge-light rounded-3 shadow p-4 d-flex justify-content-center align-items-center"
            style="cursor: pointer; z-index: 9; top: 20px; left: 20px"
          >
            <i class="bi bi-pencil-square"></i>
          </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            hidden
            ref="editThumbnail"
            @change="uploadImage($event)"
          />
          <div class="w-100 h-100 overflow-hidden position-relative rounded">
            <img
              :src="product.image"
              alt="image"
              class="user-select-none rounded-lg h-100 w-100"
              style="object-fit: cover"
            />
            <div
              v-if="imgLoading && isTheSameProduct"
              class="img-loader position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center rounded overflow-hidden"
            >
              <div
                class="w-75 h-75 d-flex justify-content-center align-items-center"
              >
                <img src="@/assets/green-spinner.gif" class="h-100 m-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-7">
        <div class="pe-4 ps-4 ps-sm-0 py-3">
          <section class="mb-4">
            <div
              v-if="product.labels.length > 1"
              data-bs-toggle="modal"
              data-bs-target="#product-labels-modal"
              class="h3 d-flex editable py-0"
            >
              <div
                v-for="(label, $index) in product.labels"
                :key="label"
                class="text-truncate py-2"
              >
                <span v-if="label.langId === userMarket.languages[0]">
                  {{ label.name }}
                </span>
              </div>
            </div>
            <div v-else class="py-1 d-flex editable w-100 border rounded">
              <div
                v-for="(label, $index) in product.labels"
                :key="label"
                class="text-truncate w-100"
              >
                <span
                  v-if="label.langId === userMarket.languages[0]"
                  class="w-100"
                >
                  <input
                    type="text"
                    :value="label.name"
                    @click="isLabelReadOnly = false"
                    @blur="isLabelReadOnly = true"
                    :readonly="isLabelReadOnly"
                    class="w-100 editable-input h3 py-2"
                    @input="emit('singleLabelInputValue', $event.target.value)"
                  />
                </span>
              </div>
            </div>
          </section>
          <!-- Categories -->
          <section
            data-bs-toggle="modal"
            data-bs-target="#product-categories-modal"
            class="d-flex gap-2 my-3"
          >
            <div v-for="category in product.categories" :key="category">
              <span class="badge badge-dark">{{ category }}</span>
            </div>
          </section>
          <section class="card-text px-1 mb-4">
            <div
              v-if="product.prices.length > 1"
              class="d-flex align-items-center"
              v-for="(price, $index) in product.prices"
            >
              <div
                v-if="price.currencyId === userMarket.currencies[0]"
                data-bs-toggle="modal"
                data-bs-target="#product-prices-modal"
                class="badge badge-light-dark py-2 d-flex justify-content-between"
                style="font-size: 1.2rem"
              >
                <span>
                  {{ price.count }}
                </span>
                <span> .LE </span>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(price, $index) in product.prices"
                :key="price"
                class="d-flex align-items-center"
              >
                <div
                  class="badge badge-light-dark d-flex"
                  style="font-size: 1.2rem"
                  @click="showPriceModal"
                >
                  <span> {{ price.count }} .LE </span>
                </div>
              </div>
            </div>
          </section>
          <!-- Buy Now -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer  -->
    <div
      class="card-footer d-flex justify-content-between align-items-center h-25"
    >
      <button
        :disabled="!isTheSameProduct"
        class="btn btn-primary w-100 btn-sm"
      >
        Save Changes
      </button>
      <Dropdown
        @selectedItem="dropdownSelectedItem"
        :items="options"
        class="w-100"
        headClasses="fw-bold p-3 rounded-3 text-capitalize btn-sm d-flex justify-content-center align-items-center w-100"
        bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize"
      >
        <template #headerContent="{ item }">
          <span class="d-flex justify-content-center align-items-center gap-2">
            <span v-if="selectedOption">
              {{ selectedOption.label }}
            </span>
            <span v-else>More Options</span>
            <strong>
              <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
            </strong>
          </span>
        </template>
        <template #bodyContent="{ item }">
          <span>
            {{ item.label }}
          </span>
        </template>
      </Dropdown>
      <button
        :disabled="!isTheSameProduct"
        class="btn btn-text-danger w-100 btn-sm"
      >
        Remove Product
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Dropdown from "@/components/Reusable/Dropdown.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { computed, reactive, ref } from "vue";

const props = defineProps({
  index: Number,
  product: Object,
  uploadImage: Function,
  setItemUnderEditId: Function,
  itemUnderEditId: Number || String,
  imgLoading: Boolean,
  modalHandler: Function,
  userMarket: Object,
});
const emit = defineEmits(["singleLabelInputValue", "singlePriceInputValue"]);
const isTheSameProduct = computed(
  () => props.product?.id === props.itemUnderEditId
);
const options = reactive([
  { id: 1, label: "published" },
  { id: 2, label: "draft" },
  { id: 3, label: "scheduled" },
  { id: 4, label: "inactive" },
]);

const selectedOption = ref();

const dropdownSelectedItem = (selectedItem: any) => {
  selectedOption.value = selectedItem;
};
const isLabelReadOnly = ref(false);

const showPriceModal = async () => {
  const swalWithBootstrap = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary w-25",
      cancelButton: "btn btn-text-success w-25",
      input: "form-control border border-primary",
    },
    buttonsStyling: false,
  });
  swalWithBootstrap
    .fire({
      title: "Add New Price 💵",
      showCancelButton: true,
      input: "number",
      inputValidator: (result): any => {
        return !result && "You can't submit an empty value!";
      },
    })
    .then((result) => {
      if (result.value) {
        emit("singlePriceInputValue", result.value);
        swalWithBootstrap.fire(
          `DONE!`,
          `Your New price is ${result.value}`,
          "success"
        );
      }
    });
};
</script>
<style lang="scss">
.editable-input {
  border: 0;
  outline: none;
  background-color: transparent;
  margin: 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  resize: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.img-loader {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 245, 248, 0.47);
}
</style>
