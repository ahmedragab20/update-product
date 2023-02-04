<template>
  <div>
    <h3 class="form-label">Array of objects</h3>
    <Dropdown
      @selectedItem="setSelectedItem"
      :items="items"
      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8 bg-white"
      bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize bg-hover-light-danger"
      searchable
      search-target="name"
    >
      <template #headerContent="{ item }">
        <div>
          <span
            v-if="selectedItem && selectedItem.name"
            class="d-flex justify-content-between align-items-center"
          >
            {{ selectedItem.name }}
            <strong>
              <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
            </strong>
          </span>
          <span v-else> Select item </span>
        </div>
      </template>
      <template #bodyContent="{ item }">
        <span v-if="item">
          {{ item.name }}
        </span>
      </template>
    </Dropdown>
  </div>
  <div>
    <h3 class="form-label">Array of Numbers or String</h3>
    <Dropdown
      @selectedItem="setSelectedOneDItem"
      :items="oneDItems"
      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8 bg-white"
      bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize bg-hover-secondary text-hover-white"
      searchable
      search-target="name"
    >
      <template #headerContent="{ item }">
        <div>
          <span
            v-if="selectedOneDItem"
            class="d-flex justify-content-between align-items-center"
          >
            {{ selectedOneDItem }}
            <strong>
              <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
            </strong>
          </span>
          <span v-else> Select item from one dimension [ ] </span>
        </div>
      </template>
      <template #bodyContent="{ item }">
        <span v-if="item">
          {{ item }}
        </span>
      </template>
    </Dropdown>
  </div>
  <div>
    <h3 class="form-label">Select Multiple users:</h3>
    <Dropdown
      @selectedItem="selectUser"
      :items="items"
      :multiSelect="true"
      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8 bg-white"
      bodyClasses="text-capitalize bg-hover-secondary text-hover-white"
      :outter-ids="selectedUsersIds"
    >
      <template #headerContent="{ item }">
        <div>
          <span>
            Select Users
            <span class="text-muted">: {{ selectedUsers.length }}</span>
          </span>
        </div>
      </template>
      <template #bodyContent="{ item }">
        <div
          v-if="item"
          class="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate"
          :class="{
            'bg-secondary text-white': selectedUsersIds.includes(item.id),
          }"
        >
          {{ item.name }}
        </div>
      </template>
    </Dropdown>
    <section
      v-if="selectedUsers && selectedUsers.length > 0"
      class="d-flex gap-2 flex-wrap"
    >
      <div
        v-for="(user, i) in selectedUsers"
        :key="i"
        class="badge badge-secondary gap-2"
      >
        <div
          style="width: 15px; height: 15px"
          class="rounded-circle overflow-hidden"
        >
          <img
            src="https://cdn.dribbble.com/userupload/4355969/file/original-4d30880d629d706ee21c325084f65058.jpg?compress=1&resize=752x"
            alt=""
            width="18"
            class="w-100 h-100"
            style="object-fit: cover"
          />
        </div>
        <span
          class="text-truncate"
          style="max-width: 160px"
          v-text="user.name"
        />
        <div>
          <i
            @click="removeSelectedUser(user)"
            class="bi bi-x-circle cursor-pointer"
          ></i>
        </div>
      </div>
    </section>
  </div>
  <!-- Remote Search with dropdown -->
  <div>
    <h3 class="form-label">Remote Search</h3>
    <Dropdown
      @selectedItem="selectUserSearch"
      :items="usersData"
      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-8 bg-white"
      bodyClasses="px-sm-5 py-sm-3 px-3 py-1 w-100 text-truncate text-capitalize bg-hover-light-danger"
      remoteSearch
      max-height="250px"
      @input="fetchUsers"
      :loading="userDataLoading"
    >
      <template #headerContent="{ item }">
        <div>
          <span
            v-if="
              selectedSearchUser &&
              selectedSearchUser.firstName &&
              selectedSearchUser.lastName
            "
            class="d-flex justify-content-between align-items-center"
          >
            {{
              selectedSearchUser.firstName + " " + selectedSearchUser.lastName
            }}
            <strong>
              <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
            </strong>
          </span>
          <span v-else> Fetch Users </span>
        </div>
      </template>
      <template #bodyContent="{ item }">
        <span v-if="item">
          {{ item.firstName + " " + item.lastName }}
        </span>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import Api from "@/utils/ApiHelper";

import Dropdown from "@/components/Reusable/Dropdown.vue";
import { onBeforeMount, ref } from "vue";
import { Artist } from "./interfaces";

const items = ref<Artist[]>();
const oneDItems = ref<string[]>();
const selectedItem = ref<Artist>();
const selectedOneDItem = ref<string>();
const setSelectedItem = (user: Artist) => {
  selectedItem.value = user;
};
const setSelectedOneDItem = (value: string) => {
  selectedOneDItem.value = value;
};

const selectedUsersIds = ref<any[]>([]); //-> the selected items' IDs
const selectedUsers = ref<any[]>([]); //-> the final result of the selected items (what you're going to use in the template)
const findSelectedDeliveryWays = (ids: Array<any> = []) => {
  selectedUsers.value = items.value?.filter((item) => ids?.includes(item.id));
};
// where you receive the data from the dropdown component
const selectUser = (selectedIds: any[], isGlobal?: boolean) => {
  if (!isGlobal) {
  }
  selectedUsersIds.value = selectedIds;
  findSelectedDeliveryWays(selectedIds);
};

const removeSelectedUser = (user: Artist) => {
  const filteredIds = selectedUsers.value
    ?.filter((i) => i.id !== user.id)
    ?.map((el) => el.id);

  selectUser(filteredIds);
};

const usersData = ref([]);
const userDataLoading = ref(false);
const selectedSearchUser = ref();

const selectUserSearch = (searchItem) => {
  selectedSearchUser.value = searchItem;
};
const fetchUsers = async (searchV: string) => {
  userDataLoading.value = true;
  await fetch(`https://dummyjson.com/users/search?q=${searchV}`)
    .then((res) => res.json())
    .then(({ users }) => {
      console.log({ users });
      usersData.value = users;
      console.log(usersData.value);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      userDataLoading.value = false;
    });
};

const fetchData = async () => {
  try {
    const reqData = {
      url: "https://jsonplaceholder.typicode.com/users",
      method: "get",
    };

    const response = await Api(reqData);

    items.value = response.data;
    oneDItems.value = response.data?.map((i) => i.name);
  } catch (e) {
    console.error(e);
  }
};

onBeforeMount(async () => {
  await fetchData();
});
</script>
