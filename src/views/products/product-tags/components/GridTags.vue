<template>
  <div class="card-product-tags row g-4">
    <div v-for="tag in tags" :key="tag.id" class="col-lg-4 col-md-6">
      <div class="card shadow-sm">
        <div
          class="pb-0 border-0 pt-5 px-5 d-flex justify-content-end align-items-center"
        >
          <div class="card-toolbar px-3">
            <div class="dropdown">
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
                <!--end::Svg Icon-->
              </button>
              <div
                aria-labelledby="dropdownMenuButton1"
                class="dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px pb-2"
              >
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <div class="menu-content fs-6 text-dark fw-bolder px-3 py-4">
                    {{ $t("actions") }}
                  </div>
                </div>
                <!--end::Menu item-->
                <!--begin::Menu separator-->
                <div class="separator mb-3 opacity-75"></div>
                <!--end::Menu separator-->

                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <a
                    @click="deleteTag(tag.id)"
                    class="menu-link px-3 d-flex justify-content-between align-items-center"
                  >
                    <span>{{ $t("delete") }}</span>
                    <span class="svg-icon svg-icon-danger svg-icon-3">
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </a>
                </div>
                <!--end::Menu item-->

                <!--begin::Menu item-->
                <div class="menu-item px-3">
                  <router-link
                    :to="`/products/tags/${tag.id}`"
                    class="menu-link px-3 d-flex justify-content-between align-items-center"
                  >
                    <span>{{ $t("update") }}</span>
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </router-link>
                </div>
                <!--end::Menu item-->
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-body pt-0 d-flex flex-column align-items-center justify-content-center"
        >
          <router-link class="link-details" :to="`/products/tags/${tag.id}`">
            {{ tag.name }}
          </router-link>
          <small class="text-gray-400">{{ tag.code }}</small>

          <div class="d-flex mt-5">
            <div
              class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
            >
              <div class="fs-6 fw-bolder text-gray-700">
                {{ tag.numberOfConnectedProducts }}
              </div>
              <div class="fw-bold text-gray-400">
                {{ $t("connectedProducts") }}
              </div>
            </div>

            <div
              class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
            >
              <div class="fs-6 fw-bolder text-gray-700">
                {{ tag.numberOfConnectedShops }}
              </div>
              <div class="fw-bold text-gray-400">
                {{ $t("connectedShops") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <el-pagination
        background
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        :total="pagination.totalCount"
        v-model:current-page="pagination.pageNumber"
        @current-change="eventFire"
      />
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, defineEmits } from "vue";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Pagination } from "@/types";
const store = useStore();
const tags = computed(() => {
  return store.state.ProductTags.tags;
});

const pagination = computed(() => store.state.ProductTags.pagination);

let emit = defineEmits(["delete-product-tag", "update-pagination"]);
function deleteTag(id) {
  emit("delete-product-tag", id);
}
function eventFire(n) {
  // console.log(n);
  store.commit(Mutations.UPDATE_TAG_CURRENT_PAGE, n);
  emit("update-pagination", n);
}
</script>
<style lang="scss">
.card-product-tags {
  a.link-details {
    font-size: 20px;
    font-weight: bold;
  }
  .dropdown-menu {
    inset: 0px auto auto -12.5rem !important;
  }
}
</style>
