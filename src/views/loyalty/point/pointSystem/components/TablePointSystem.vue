<template>
  <div class="card">
    <div class="card-body">
      <!-- Start Table container-->
      <div class="table-responsive">
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!-- Start Table Header -->
          <thead>
            <tr>
              <th class="min-w-140px">{{ $t("shopsName") }}</th>
              <th class="min-w-150px">{{ $t("currenciesName") }}</th>
              <th class="min-w-80px">{{ $t("Enabled") }}</th>
              <th class="min-w-100px">{{ $t("actions") }}</th>
            </tr>
          </thead>
          <!-- End Table Header -->

          <!-- Start Table Body -->
          <tbody>
            <template v-for="(item, index) in items" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="mx-3">
                      {{ item.shopNames != "" ? item.shopNames : "__" }}
                    </span>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-column w-100 me-2">
                    <span class="me-2 fs-7 fw-bold">
                      {{ item.currenciesNames }}
                    </span>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-column w-100 me-2">
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
                </td>

                <td>
                  <a
                    @click="editPointSystem(item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#edit-point-system-modal"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </a>

                  <a
                    @click="deletePointSystem(item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-point-system-modal"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <span class="svg-icon svg-icon-3">
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!-- End Table Body -->
        </table>
      </div>
      <!-- End Table container-->
    </div>
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
