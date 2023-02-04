<template>
  <!--begin::Basic info-->
  <div>
    <div class="product-label d-flex flex-column flex-column-fluid">
      <div class="row">
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <div class="card card-flush py-4 mb-4">
            <div class="card-header d-flex align-items-center">
              <div class="card-title">
                <h2>{{ $t("shopCategories") }}</h2>
              </div>
              <el-select
                v-model="localPagination.pageSize"
                style="width: 100px"
                placeholder="Number Of Item"
                class="border-1 mx-4"
              >
                <el-option :value="2">2</el-option>
                <el-option :value="10">10</el-option>
                <el-option :value="25">25</el-option>
                <el-option :value="50">50</el-option>
                <el-option :value="100">100</el-option>
              </el-select>
            </div>
            <div class="card-body pt-0">
              <label class="required fs-5 fw-bold mb-5 d-inline">
                {{ $t("shopCategories") }}
              </label>
              <div class="row justify-content-between pb-5 mb-4">
                <div class="fv-row col-8 mb-10">
                  <!--begin::Input-->
                  <Field
                    v-model="form.productCategories"
                    name="Categories"
                    class="form-control form-control-lg form-control-solid"
                  >
                    <treeselect
                      v-model="GategoriesId"
                      :options="GategoriesOptions"
                    >
                    </treeselect>
                  </Field>
                  <label
                    class="col-form-label text-gray-400 fw-normal d-block pt-0"
                  >
                    {{ $t("pleaseEnterCategories") }}
                  </label>
                  <ErrorMessage
                    name="Categories"
                    class="fv-plugins-message-container invalid-feedback"
                  />
                  <!--end::Input-->
                </div>
                <div class="col-4">
                  <button
                    @click="addGategories(GategoriesId)"
                    class="btn mx-3 d-flex align-items-center btn-light-primary"
                    :disabled="!GategoriesId"
                    type="button"
                  >
                 
                    <span  class="indicator-label"
                      >{{ $t("addshopCategory") }}
                    </span>
                  </button>
                </div>
              </div>
           
              <label class="required fs-5 fw-bold mb-5 d-inline">{{ $t("productCategoriesList") }}</label>
              <el-table
                :data="productCategoriesResult"
                class="tag-products w-100 pt-4"
              >
                >
                <el-table-column width="70" :label="$t('image')">
                  <template #default="scope">
                    <div class="d-flex align-items-center">
                      <img
                        :src="`${
                          GategoriesList?.find((x) => x.id == scope.row)
                            ?.thumbnailPath
                        }`"
                        style="object-fit: cover; height: 35px; width: 35px"
                        class="rounded"
                        alt=""
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('name')">
                  <template #default="scope">
                    {{ GategoriesList?.find((x) => x.id == scope.row)?.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('actions')"
                  align="right"
                  width="70"
                >
                  <template #default="scope">
                  
                    <a
                      @click="deleteGategory(scope.row)"
                      class="btn btn-icon btn-danger-light btn-active-color-danger btn-sm"
                    >
                      <span class="svg-icon svg-icon-danger">
                        <inline-svg
                          src="/media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                    </a>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div
              :class="[
                'card-footer',
                'd-flex',
                form.productCategories.length > 3
                  ? 'justify-content-between'
                  : 'justify-content-end',
              ]"
            >
              <el-pagination
                v-model:current-page="localPagination.pageNumber"
                :page-size="localPagination.pageSize"
                layout="prev, pager, next"
                :total="form.productCategories.length"
                :hide-on-single-page="true"
                background
              >
              </el-pagination>
              <!-- <button
                class="btn btn-primary"
                type="submit"
                @click="saveChanges"
              >
                <span v-if="!isLoading">
                  {{ $t("save") }}
                </span>
                <span v-if="isLoading" class="indicator-progress d-block">
                  {{ $t("wait") }}
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  />
                </span>
              </button> -->
            </div>
          </div>
        </div>

      </div>
      <!--begin::Actions-->
      <div class="d-flex justify-content-center">
        <div class="card col-12 justify-content-center align-items-center floating  py-6 px-9">
          <div class="card-title text-gray-400 fw-normal d-block pt-0">
            {{ $t("pleaseDontForgetToSaveCategoriesChanges") }}
          </div>
          <div class="crad-body">
            <button type="submit"  @click="saveChanges" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-primary">
              <span class="indicator-label"> {{ $t("saveCategoriesSetting")}}</span>
              <span class="indicator-progress">
                {{ $t("pleaseWait")}} ...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <!--end::Actions-->
    </div>
  </div>
  <!--end::Basic info-->
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch, onMounted, watchEffect } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import Treeselect from "vue3-treeselect";
// import the styles
import "vue3-treeselect/dist/vue3-treeselect.css";

import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Swal from "sweetalert2";
// define interfaces
interface productCategories {
  id: number;
  name: string;
}
interface shopCategories {
  id: string;
  productCategories: Array<productCategories>;
}

interface GategoriesOptions {
  id: string;
  label: string;
  children: Array<productCategories>;
}

interface props { 
  id:string,

}
const store = useStore();
// define shopCategories
const shopCategories = ref<shopCategories>({
  productCategories: [],
  id: "",
});
// get id as a prop

const props = defineProps<props>();
// define local pagination
const localPagination = reactive({ pageNumber: 1, pageSize: 5 });
// set pagination 
const productCategoriesResult = computed(() =>
  form.value.productCategories.slice(
    (localPagination.pageNumber - 1) * localPagination.pageSize,
    localPagination.pageSize * localPagination.pageNumber
  )
);
// define refs
const isLoading = ref(false);
const form = reactive(shopCategories);
const GategoriesId = ref();
// add categories
const addGategories = (id) => {
  let findDuplicate = shopCategories.value.productCategories.find(
    (element) => element == id
  );
  if (findDuplicate) {
    Swal.fire({
      text: "This Gategories  is added before",
      icon: "warning",
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      customClass: {
        confirmButton: "btn fw-bold btn-light-warning",
      },
    });
  } else {
    shopCategories.value.productCategories.push(id);
    GategoriesId.value = "";
    
    
  }

};
// get GategoriesOptions from store
const GategoriesOptions = computed(
  () => store.state.ProductCategories.GategoriesOptions
);
// get GategoriesList from store
const GategoriesList = computed(
  () => store.state.ProductCategories.GategoriesList
);
// delete category
const deleteGategory = (id) => {
  shopCategories.value.productCategories =
    shopCategories.value.productCategories.filter((el) => {
      return el !== id;
    });
};
// save changes
const saveChanges = async (values: any) => {
  isLoading.value = true;
 
  store
    .dispatch(Actions.UPDATE_SHOP_CATEGORIES, shopCategories.value)
    .then(() => {
      isLoading.value = false;
    });
};
// get shop category from api
onMounted(() => {

  store.dispatch(Actions.GET_CATEGORIES);
  store.dispatch(Actions.GET_SHOP_CATEGORIES, props.id).then((data) => {
  
    shopCategories.value.productCategories= data.data.productCategories.map(el=> parseInt(el.id))
    shopCategories.value.id = props.id;
  });
});
</script>
<style scoped>
.floating{
  position: fixed;
  bottom: 0px;

}
</style>