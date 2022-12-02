<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="Gategories"
    item-key="id"
    :group="{ name: 'g1' }"
    @change="onUnpublishedChange"
  >
    <template #item="{ element }">
      <li :key="element.order">
        <div class="card shadow-sm col-md-8">
          <div class="card-toolbar row">
            <span class="move-icon col-2">
              <inline-svg src="/media/icons/duotune/general/move_icon.svg" />
            </span>

            <div class="fs-6 fw-bolder text-gray-700 col-9">
              {{ element.name }}
            </div>

            <div class="dropdown col-1">
              <button
                type="button"
                class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect
                        x="5"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="14"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                      <rect
                        x="5"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                      <rect
                        x="14"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                    </g>
                  </svg>
                </span>
              </button>
              <div
                aria-labelledby="dropdownMenuButton1"
                class="dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px pb-2"
              >
                <div class="menu-item px-3">
                  <div class="menu-content fs-6 text-dark fw-bolder px-3 py-4">
                    Quick Actions
                  </div>
                </div>

                <div class="separator mb-3 opacity-75"></div>
                <div class="menu-item px-3">
                  <a
                    type="button"
                    class="btn btn-sm btn-light-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_product_table"
                    @click="fetchProduct(element.id)"
                  >
                    <span class="svg-icon svg-icon-3">
                      {{ $t("connectedProducts") }}</span
                    >
                  </a>
                </div>
                <div class="menu-item px-3">
                  <a
                    type="button"
                    class="btn btn-sm btn-light-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_update_categories"
                    @click="updateProduct(element.id)"
                  >
                    <span class="svg-icon svg-icon-3">
                      {{ $t("update") }}
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </a>
                </div>
                <div class="menu-item px-3">
                  <a
                    class="btn btn-sm btn-light-danger"
                    @click="deleteCategory(element.id)"
                  >
                    <span class="svg-icon svg-icon-3 svg-icon-danger">
                      {{ $t("delete") }}
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nested-draggable
          :Gategories="element.Gategories"
          @fetchProduct="fetchProduct"
          @updateProduct="updateNestes"
        />
      </li>
    </template>
  </draggable>
  <!-- <update-categories-form ref="update" />
  @deleteCategory="deleteSubCategory"
          @updateProduct="updateNestes"
          @fetchProduct="fetchProduct" -->
</template>

<script lang="ts">
import UpdateCategoriesForm from "./UpdateCategoriesForm.vue";
import { defineComponent, PropType, computed, ref } from "vue";
import draggable from "vuedraggable";
import Swal from "sweetalert2";
import  {productCategories} from "@/types"
import { UpdateParentOrderType } from "@/api/data/UpdateParentOrderType";
import { Actions } from "@/store/enums/StoreEnums";
import { Payload, useStore } from "vuex";
import { identifier } from "@babel/types";
import { getMemoedVNodeCall } from "@vue/compiler-core";
import { getElementParents } from "@/assets/ts/_utils";
import i18n from "@/core/plugins/i18n";
import { lte } from "lodash";
export default defineComponent({
  name: "nested-draggable",
  props: {
    Gategories: {
      type: Array as PropType<productCategories[]>,
    },
  },
  components: {
    draggable,

    UpdateCategoriesForm,
  },

  setup(props, { emit }) {
    const store = useStore();
    const DataGategories = computed(
      () =>
        store.state.ProductCategories.Gategories as Array<productCategories>
    );
    const open = ref(false);
    const update = ref();
    const updateNestes = (id) => {
      emit("updateProduct", id);
    };
    function updateProduct(id) {
      emit("updateProduct", id);
    }

    const getMoved = (data, id) => {
      let payload: Array<UpdateParentOrderType> = [];
      let filter: Array<UpdateParentOrderType> = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data[i].parentId = parentId;
          filter = FillterData(data);
          filter.forEach((el) => {
            payload.push({
              id: el.id,
              parentId: el.parentId,
              order: el.order,
            });
          });

          store.dispatch(Actions.UPDATE_CATEGORY_PARENT_AND_ORDER, payload);
          return;
        } else {
          getMoved(data[i].Gategories, id);
        }
      }
    };

    const fetchProduct = (id) => {
      emit("fetchProduct", id);
    };
    let parentId = ref(null as any);
    const onUnpublishedChange = (e) => {
      let id = null;
      let order = null;

      if (e.added) {
        id = e.added.element.id;
        order = e.added.element.order;

        if (!props.Gategories) return [];
        else {
        }
      }
      if (e.moved) {
        let payload: Array<UpdateParentOrderType> = [];
        let allData: Array<productCategories> = [];
        id = e.moved.element.id;
        order = e.moved.element.order;
        allData = FillterData(props.Gategories);
        allData.forEach((el) => {
          payload.push({
            id: el.id,
            parentId: el.parentId,
            order: el.order,
          });
        });

        store.dispatch(Actions.UPDATE_CATEGORY_PARENT_AND_ORDER, payload);
      } else if (e.removed) {
        id = e.removed.element.id;
        order = e.removed.element.order;

        if (!props.Gategories) return [];
        else {
          getParent(DataGategories.value, id);
          getMoved(DataGategories.value, id);
        }
      }
    };

    // get New ParentId
    const getParent = (data, id) => {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].Gategories.length; j++) {
          if (data[i].Gategories[j].id === id) {
            parentId = data[i].id;
            return;
          } else {
            getParent(data[i].Gategories, id);
          }
        }
      }
    };
    // filter data by Order
    const FillterData = (data) => {
      if (!data) return [];
      else {
        if (data.length > 1) {
          for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
              if (
                data[i].order == data[j].order ||
                data[i].parentId == data[j].parentId
              ) {
                data[i].order = i + 1;
                data[j].order = j + 1;
              }
            }
          }
        } else {
          data[0].order = 1;
        }

        return data;
      }
    };

    let child = ref();
    let newArray: { id: number }[] = [];
    // get id when Delete an item and keep its children
    const GetIdsUpdate = (arr, key) => {
      arr.forEach(function (item) {
        for (let keys in item) {
          if (keys === "id") {
            newArray.push({ id: item[key] });
          }
        }
      });
    };

    // get id when Delete an item and  children
    const GetIds = (arr, key) => {
      if (arr.length > 0) {
        arr.forEach(function (item) {
          for (let keys in item) {
            if (keys === "id") {
              newArray.push({ id: item[key] });
            }
          }
          GetIds(item.Gategories, key);
        });
      }
    };

    const deleteCategory = (id) => {
      Swal.fire({
        title: i18n.global.t("alertTitle"),
        text: i18n.global.t("deleteCategoryAlertText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: i18n.global.t("deleteAlertConfirm"),
        cancelButtonText: i18n.global.t("cancel"),
      }).then((status) => {
      
        if (status.isConfirmed) {
          // Check if this Product has child
          if (!props.Gategories) return [];
          else {
            child.value = props.Gategories.find((x) => x.id == id);
          }

          if (child.value.Gategories.length > 0) {
            Swal.fire({
              title: i18n.global.t("deleteCategoryChildAlertText"),

              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: i18n.global.t("deleteAlertConfirm"),
              cancelButtonText: i18n.global.t("cancel"),
            }).then((result) => {
              if (result.isConfirmed) {
                if (result.value) {
                  GetIds(child.value.Gategories, "id");

                  newArray.push({ id: id });

                  store
                    .dispatch(Actions.DELETE_CATEGORY, newArray)
                    .then((res) => {
                   
                      store.dispatch(Actions.GET_CATEGORIES);
                      newArray = [];
                    });
                }
              } else {
                GetIdsUpdate(child.value.Gategories, "id");
                let payload: { parentId: number; id: number }[] = [];
                let deleted: { id: number }[] = [];

                newArray.forEach((el) => {
                  payload.push({
                    id: el.id,
                    parentId: child.value.parentId,
                  });
                });
                deleted.push({
                  id: child.value.id,
                });

                store.dispatch(Actions.DELETE_CATEGORY, deleted);
                store
                  .dispatch(Actions.UPDATE_CATEGORY_PARENT_AND_ORDER, payload)
                  .then((res) => {
                    newArray = [];
                    payload = [];
                    deleted = [];

                    store.dispatch(Actions.GET_CATEGORIES);
                  });
              }
            });
          } else {
            let data=[{
              id:child.value.id
            }];
            store.dispatch(Actions.DELETE_CATEGORY,data);
            for (let i = 0; i < props.Gategories.length; i++) {
              if (props.Gategories[i].id === id) {
              
                props.Gategories.splice(i, 1);
              }
            }
          }
        }

        if (!props.Gategories) return [];
        else {
          // store.dispatch(Actions.DELETE_CATEGORY, child.value.id);
          // for (let i = 0; i < props.Gategories.length; i++) {
          //   if (props.Gategories[i].id === id) {
          //     console.log("yes");
          //     props.Gategories.splice(i, 1);
          //   }
          // }
        }
        console.log(props.Gategories);
      });
    };

    return {
      updateProduct,
      // ModalUpdateCategories,
      update,
      onUnpublishedChange,
      open,
      parentId,
      updateNestes,
      deleteCategory,

      fetchProduct,
      GetIdsUpdate,
      FillterData,
      DataGategories,
      getMoved,
      getParent,
    };
  },
});
</script>

<style lang="scss">
.col-md-6.fv-row.order {
  margin-top: 30px;
}
.card-toolbar.row {
  padding: 10px;
}
svg {
  height: 1.5rem;
  margin: 5px;
}
.el-icon.header-icon {
  direction: rtl;
}
.multiselect-tag {
  background: #04c8c8;
}
.menu-item.px-3 {
  margin-bottom: 12px !important;
}
i.el-icon.header-icon {
  /* margin: revert; */
  /* padding: 12px; */
  margin-left: 79%;
  margin-bottom: 27px;
  font-size: 36px;
  /* float: left !important; */
}
.card.shadow-sm.col-md-8 {
  height: 50px;
  margin: 20px;
}
span.move-icon.col-2 {
  max-width: 40px;
}
.fs-6.fw-bolder.text-gray-700.col-9 {
  margin-top: 5px;
}
.dropdown.col-1 {
  margin-left: auto;
}
p.header-name {
  max-width: 50px;
  margin-left: 20px;
}
.btn.btn-light-primary {
  background-color: "none" !important;
}
.card.shadow-sm.col-md-8 {
  cursor: all-scroll;
}

.element-name {
  font-size: 22px;
  margin: 20px !important;
}
</style>
