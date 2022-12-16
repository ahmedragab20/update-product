<template>
  <div
    class="modal fade"
    id="kt_modal_product_table"
    ref="ModalProductTable"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-600px">
      <div class="modal-content rounded">
        <div class="modal-header p-6 border justify-content-between">
          <h2 class="modal-title px-10 border-">
            {{ $t("connectedProducts") }}
          </h2>
        </div>
        <!--begin::Modal body-->

        <div class="card card-flush py-4">
          <div class="card-body pt-0">
            <!--begin::Connected Shops-->

            <!--end::Connected Shops-->

            <!--begin::Connected Products-->
            <div class="col-12 mt-5">
              <div class="d-flex" style="margin-bottom: 13px">
                <Field
                  name="connectedProductsSelect"
                  type="text"
                  v-slot="{ field, value }"
                >
                  <el-select
                    class="w-100 form-control-solid border-0"
                    v-model="connectedProductsSelect"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    :placeholder="$t('enterKeyword')"
                    :remote-method="getProducts"
                    :loading="productsLoading"
                  >
                    <el-option
                      v-if="someproduct"
                      v-for="item in productsList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="
                        itemsConnectedProduct.some((p) => p.id == item.id)
                      "
                    >
                      <img
                        :src="item.thumbnail"
                        style="object-fit: cover; height: 35px; width: 35px"
                        class="rounded"
                        alt=""
                      />
                      <span class="mx-2">{{ item.name }}</span>
                      <span
                        class="mx-2 text-danger"
                        v-if="
                          itemsConnectedProduct.some((p) => p.id == item.id)
                        "
                        >{{ $t("alreadySelected") }}</span
                      >
                    </el-option>
                  </el-select>
                </Field>
                <button
                  type="button"
                  @click="saveProduct"
                  class="btn mx-3 d-flex align-items-center"
                  :class="
                    connectedProductsSelect.length
                      ? 'btn-primary'
                      : 'btn-light-primary'
                  "
                  :disabled="!connectedProductsSelect.length"
                >
                  <span
                    v-if="productsLoading"
                    class="indicator-progress d-block"
                  >
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    />
                  </span>
                  <span v-else> {{ $t("save") }}</span>

                  
                </button>
              </div>

              <ErrorMessage class="text-danger" name="icon"></ErrorMessage>
              <productTable
                @deleteProduct="deleteProduct"
                :id="CategoryId"
                :itemsConnectedProduct="itemsConnectedProduct"
                @updatePagination="updatePagination"
              ></productTable>
            </div>
            <!--end::Connected Products-->
          </div>
        </div>
        <div class="modal-footer flex-center">
          <!--begin::Button-->
          <button
            type="button"
            class="btn btn-lg btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ $t("close") }}
          </button>
          <!--end::Button-->

          <!--begin::Button-->

          <!--end::Button-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductTable from "./Table";
import { useStore } from "vuex";
import { Form, Field } from "vee-validate";
import { ref, defineProps, computed, defineExpose } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";
const productsLoading = ref<boolean>(false);
const connectedProductsSelect = ref([]);
const store = useStore();
const CategoryId = ref(null);
const someproduct = ref(true);

const productsList = computed(() => store.state.ProductCategories.products);
const ModalProductTable = ref<null | HTMLElement>(null);
const itemsConnectedProduct = computed(
  () => store.state.ProductCategories.connectedProducts
);
function getProducts(qury) {
  productsLoading.value = true;
  store
    .dispatch(Actions.SEARCH_PRODUCTS, {
      query: qury,
    })
    .then(() => {
      productsLoading.value = false;
      someproduct.value = true;
    });
}
defineExpose({
  getConnectedProducts,
});
const pageSize = ref(3);
const updatePagination = (val) => {
  itemsConnectedProduct.value.slice(
    pageSize.value * val.value - pageSize.value,
    pageSize.value * val.value
  );

};
function deleteProduct(id) {
  let payload = {
    id: CategoryId.value,
    connectedProducts: [id],
  };
  Swal.fire({
    title: i18n.global.t("alertTitle"),
    text: i18n.global.t("deleteProductAlertText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: i18n.global.t("deleteAlertConfirm"),
    cancelButtonText: i18n.global.t("cancel"),
  }).then((status) => {
    if (status.isConfirmed){
      store.dispatch(Actions.REMOVE_PRODUCTS_FOMR_CATEGORY, payload);
      for (let i = 0; i < itemsConnectedProduct.value.length; i++) {
        if (itemsConnectedProduct.value[i].id === id) {
          itemsConnectedProduct.value.splice(i, 1);
        }
      }
      getConnectedProducts(CategoryId.value)
    }else{
      return null;
    }
    
  });
}
function saveProduct() {
  someproduct.value = false;
  productsList.value = [];
  store
    .dispatch(Actions.ADD_PRODUCTS_TO_CATEGORY, {
      id: CategoryId.value,
      connectedProducts: connectedProductsSelect.value,
    })
    .then(() => {
      connectedProductsSelect.value = [];
      getConnectedProducts(CategoryId.value)
    });
}

function getConnectedProducts(id) {
  CategoryId.value = id;
  store
    .dispatch(Actions.GET_CATEGORY_PRODUCTS, id)

    .then((res) => {
    });
}
</script>
