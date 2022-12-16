<template>


  <div class="d-flex justify-content-between align-items-center w-100">
   
    <!--begin::Filter-->

    <div
      class="d-flex align-items-center justify-content-end my-3"
      style="margin-left: auto"
    >
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        data-bs-target="#kt_modal_add_categories"
      >
        <span class="svg-icon svg-icon-3">
          <inline-svg src="media/icons/duotune/general/gen035.svg" />
        </span>
        {{ $t("addProductCategory") }}
      </button>
    </div>
    <product-table ref="producttable" />

    <add-categories-form />
  </div>

  <!--end::Filter-->
  <update-categories-form ref="update" />

  <!--begin::Card body-->

  <nested-draggable
  v-if="(Gategories.length >0 )"
    :Gategories="Gategories"
    :fetchData="fetchData"
    @fetchProduct="fetchProduct"
    @updateProduct="updateProduct"
  />

  <div v-else>
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span>Loading...</span>
          </div>
        </div>
      </div>
  <!--end::Card body-->
  <!--end::Card-->
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, reactive, computed, ref } from "vue";
import nestedDraggable from "../components/Nested.vue";
import AddCategoriesForm from "../components/AddCategoriesForm.vue";
import { Actions } from "@/store/enums/StoreEnums";
import ProductTable from "../components/ProductTable.vue";
import  {productCategories} from "@/types"
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import i18n from "@/core/plugins/i18n";
import { showModal } from "@/core/helpers/dom";
import UpdateCategoriesForm from "../components/UpdateCategoriesForm.vue";

export default defineComponent({
  name: "product-categories",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable,
    AddCategoriesForm,
    UpdateCategoriesForm,
    ProductTable,
  },

  setup() {
    const showModalForm = ref(true);
    const update = ref();
    const producttable = ref();

    const open = ref(false);
    const ModalUpdateCategories = ref<null | HTMLElement>(null);
    const ModalProductTable = ref<null | HTMLElement>(null);
    const fetchProduct = (id: any): void => {
      showModal(ModalProductTable.value);
      producttable.value.getConnectedProducts(id);
    };
    const updateProduct = (id: any): void => {
      showModal(ModalUpdateCategories.value);
      update.value.getData(id);
    };
    const store = useStore();

    const fetchData = () => {
      return store.dispatch(Actions.GET_CATEGORIES);
    };
    fetchData();
    setCurrentPageBreadcrumbs(i18n.global.t("productCategories") , []);
    const Gategories = computed(
      () =>
        store.state.ProductCategories.Gategories as Array<productCategories>
    );

    return {
      fetchData,
      Gategories,
      updateProduct,
      open,
      update,
      showModalForm,

      producttable,
      fetchProduct,
    };
  },
});
</script>
