<template>
  <div
    class="content d-flex flex-column flex-column-fluid mt-5"
    id="kt_content"
  >
    <!-- Start Table container-->
    <div class="container-xxl" id="kt_content_container">
      <div class="tab-content">
        <div id="kt_project_users_card_pane" class="tab-pane fade show active">
          <div class="row g-6 g-xl-9">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="col-12 col-md-4"
            >
              <div class="card shadow-sm">
                <div
                  class="card-toolbar mx-4 my-2 d-flex justify-content-end align-items-center"
                >
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
                          width="30px"
                          height="30px"
                          viewBox="0 0 20 20"
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
                        <div
                          class="menu-content fs-6 text-dark fw-bolder px-3 py-4"
                        >
                          {{ $t("actions") }}
                        </div>
                      </div>
                      <div class="separator mb-3 opacity-75"></div>

                      <div class="menu-item px-3">
                        <a
                          @click="deletePointSystem(item.id)"
                          data-bs-toggle="modal"
                          data-bs-target="#delete-point-system-modal"
                          class="menu-link px-3 d-flex justify-content-between align-items-center"
                        >
                          <span>{{ $t("delete") }}</span>
                          <span class="svg-icon svg-icon-3">
                            <inline-svg
                              src="/media/icons/duotune/general/gen027.svg"
                            />
                          </span>
                        </a>
                      </div>

                      <div class="menu-item px-3">
                        <a
                          @click="editPointSystem(item.id)"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-point-system-modal"
                          class="menu-link px-3 d-flex justify-content-between align-items-center"
                        >
                          <span>{{ $t("update") }}</span>
                          <span class="svg-icon svg-icon-3">
                            <inline-svg
                              src="/media/icons/duotune/art/art005.svg"
                            />
                          </span>
                        </a>
                      </div>
                      <!--end::Menu item-->
                    </div>
                  </div>
                </div>
                <div
                  class="card-body pt-0 d-flex flex-column align-items-center justify-content-center"
                >
                  <h2 class="text-gray-400">
                    <a
                      href=""
                      @click="editPointSystem(item.id)"
                      data-bs-toggle="modal"
                      data-bs-target="#edit-point-system-modal"
                      class="menu-link pointer px-3 d-flex justify-content-between align-items-center"
                    >
                      {{ item.shopNames }}
                    </a>
                  </h2>

                  <div class="d-flex mt-5">
                    <div
                      class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
                    >
                      <div class="fs-6 fw-bolder text-gray-700">
                        {{ item.currenciesNames }}
                      </div>
                      <div class="fw-bold text-gray-400">
                        {{ $t("currenciesName") }}
                      </div>
                    </div>

                    <div
                      class="border text-center border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3"
                    >
                      <div class="fs-6 fw-bolder text-gray-700">
                        <a
                          v-if="item.enabled == true"
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        >
                          <span class="svg-icon svg-icon-3">
                            <inline-svg
                              src="/media/icons/duotune/general/gen060.svg"
                            />
                          </span>
                        </a>
                        <a
                          v-if="item.enabled == false"
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        >
                          <span class="svg-icon svg-icon-3">
                            <inline-svg
                              src="/media/icons/duotune/general/gen061.svg"
                            />
                          </span>
                        </a>
                      </div>
                      <div class="fw-bold text-gray-400">
                        {{ $t("Enabled") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Table container-->
  </div>

  <!-- Start Pagination -->
  <div class="col-12 d-flex justify-content-end">
    <el-pagination
      v-model:current-page="pagination.pageNumber"
      @current-change="eventFire"
      :page-size="pagination.pageSize"
      layout="prev, pager, next"
      :total="pagination.totalCount"
      :hide-on-single-page="true"
      background
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, computed } from "vue";
import { useStore } from "vuex";

let emit = defineEmits([
  "update-pagination",
  "delete-point-system",
  "edit-point-system",
]);
const store = useStore();

const items = computed(() => store.getters.getPointSystems);
const pagination = computed(() => store.state.PointSystems.pagination);

function eventFire(n) {
  emit("update-pagination", n);
}

const deletePointSystem = (id) => {
  emit("delete-point-system", id);
};

const editPointSystem = (id) => {
  emit("edit-point-system", id);
};
</script>
