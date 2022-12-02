<template>
  <div class="table-responsive overflow-auto">
    <table
      class="table table-row-dashed table-row-gray-300 gy-7"
      style="min-width: 320px"
    >
      <thead>
        <tr
          class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
        >
          <th>Modifiers name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, $index) in items" :key="$index" class="fs-5">
          <td class="td">
            <div class="w-225px text-truncate">
              <span
                v-if="item && item.resources && item.resources.length > 0"
                v-text="item.resources[0].name"
              />
            </div>
          </td>
          <td class="td">
            <div class="d-flex gap-2">
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-text-info bg-light-info rounded-3"
                  style="width: 90px"
                  @click="editToggle(item)"
                >
                  <i class="bi bi-pencil-square text-base text-info"></i>
                  edit
                </button>
              </div>
              <div>
                <button
                  @click="
                    removeModifier({
                      id: item.id,
                      array: 'modifiersTable',
                    })
                  "
                  style="width: 100px"
                  type="button"
                  class="btn btn-sm btn-text-danger bg-light-danger rounded-3"
                >
                  <i class="bi bi-trash3 text-base text-danger"></i>
                  remove
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: [],
  },
  editToggle: {
    type: Function,
    required: true,
    default: (): void => {},
  },
  removeModifier: {
    type: Function,
    required: true,
    default: (): void => {},
  },
});
</script>

<style>
.max-w-120px {
  max-width: 120px;
}
.w-225px {
  width: 225px;
}
.text-base {
  font-size: 1rem;
}
</style>
