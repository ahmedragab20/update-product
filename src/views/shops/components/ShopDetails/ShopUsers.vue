<template>
  <!--begin::Basic info-->
  <div>
    <div class="product-label d-flex flex-column flex-column-fluid">
      <div class="row">
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div class="card card-flush py-4 mb-4">
              <div class="card-header d-flex align-items-center">
                <div class="card-title">
                  <h2>{{ $t("shopUsers") }}</h2>
                </div>
                <el-select
                  v-model="localPagination.pageSize"
                  style="width: 100px"
                  placeholder="Number Of Item"
                  class="border-1 mx-4"
                >
                  <el-option :value="5">5</el-option>
                  <el-option :value="10">10</el-option>
                  <el-option :value="25">25</el-option>
                  <el-option :value="50">50</el-option>
                  <el-option :value="100">100</el-option>
                </el-select>
              </div>
              <div class="card-body pt-0">
                <label class="required fs-5 fw-bold mb-5 d-inline">
                  {{ $t("users") }}
                </label>
         
                <div class="row justify-content-between pb-5 mb-4">
                  <div class="fv-row col-8 mb-10">
                    <!--begin::Input-->
                    
                    <Field
                      v-slot="{ field }"
                      name="userId"
                      class="form-control form-control-lg form-control-solid"
                    >
                    <el-select
                        class="w-100 form-control-solid border-0"
                        v-bind="field"
                        v-model="userId"
                        
                      >
                      <el-option
                        v-for="item in Users"
                        :key="item.id"
                        :label="`${item.firstName} ${item.lastName}`"
                        :value="item.id"
                        :disabled="
                           usersResult.some((p) => p.id == item.id)
                        "
                      >
                        <span class="mx-2">{{ `${item.firstName} ${item.lastName}` }}</span>
                        <span
                          class="mx-2 text-danger"
                          v-if="
                            usersResult.some((p) => p == item.id)
                          "
                          >{{ $t("alreadySelected") }}</span
                        >
                      </el-option>
                      </el-select>
                    </Field>
                    <label
                      class="col-form-label text-gray-400 fw-normal d-block pt-0"
                    >
                      {{ $t("pleaseEnterUsers") }}
                    </label>
                    
                    <ErrorMessage
                      name="userId"
                      class="fv-plugins-message-container invalid-feedback"
                    />
                    <!--end::Input-->
                  </div>
                  <div class="col-4">
                    <button
                      @click="addUser()"
                      :class="`btn mx-3  d-flex align-items-center ${
                        !!userId
                          ? 'btn-primary'
                          : 'btn-light-primary'
                      }`"
                      :disabled="!userId"
                      type="button"
                    >
                    
                      <span class="indicator-label"
                        >{{ $t("addNewUser") }}
                      </span>
                    </button>
                  </div>
                </div>

                <label>{{ $t("shopUsers") }}</label>
                <el-table :data="usersResult" class="tag-products w-100 pt-4">
                  >
                  <el-table-column width="100" :label="$t('name')">
                    <template #default="scope">
                     
                      {{ Users?.find((x) => x.id == scope.row)?.firstName }}
                      {{ Users?.find((x) => x.id == scope.row)?.lastName }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('roles')">
                    <template #default="scope">
                  
                      {{ Users?.find((x) => x.id == scope.row)?.roles }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('actions')" align="right" width="70">
                    <template #default="scope">
                      <a
                        @click="deleteUser(scope.row)"
                        class="btn btn-icon btn-danger-light btn-active-color-danger btn-sm"
                      >
                        <span class="svg-icon svg-icon-danger">
                          <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                        </span>
                      </a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div :class="['card-footer', 'd-flex' ,form.users.length > 3 ?  'justify-content-between': 'justify-content-end',]">
                <el-pagination
                  v-model:current-page="localPagination.pageNumber"
                  :page-size="localPagination.pageSize"
                  layout="prev, pager, next"
                  :total="form.users.length"
                  :hide-on-single-page="true"
                  background
                >
                </el-pagination>
              
                <!-- <button class="btn btn-primary" type="submit" @click="saveChanges">
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
            {{ $t("pleaseDontForgetToSaveUsersChanges") }}
          </div>
          <div class="crad-body">
            <button type="submit"  @click="saveChanges" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-primary">
              <span class="indicator-label"> {{ $t("saveUsersSetting")}}</span>
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
import Swal from "sweetalert2";

import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Multiselect from "@vueform/multiselect";
import * as yup from "yup";
const store = useStore();
// define interfaces
interface users {
  id: number;
  name: string;
  roles: string;
}
interface shopUsers {
  id: string;
  users: Array<users>;
}
// get id as a prop
let props = defineProps({
  id: String,
});

// define refs
let userId= ref();
const shopUsers = ref<shopUsers>({
  users: [],
  id: "",
});
// define local pagination
const localPagination = reactive({ pageNumber: 1, pageSize: 5 });
const isLoading = ref(false);
const form = reactive(shopUsers);

// get users from store
const Users = computed(() => store.state.Shops.users);
console.log("users", Users);
// save changes and updated shop users
const saveChanges = async (values: any) => {
  isLoading.value = true;
  console.log("form.value.users",form.value.users);
    
  let data={
    id:shopUsers.value.id,
    userIds:usersResult.value
  }
console.log("data",data)
  store.dispatch(Actions.UPDATE_SHOP_USERS, data).then(() => {
    isLoading.value = false;
  });
};
// get shop users from api
onMounted(() => {
  store.dispatch(Actions.GET_USERS);
  store.dispatch(Actions.GET_SHOP_USERS, props.id).then((data) => {
    console.log("shopUsers", data);
    shopUsers.value.users = data.users.map(el=> parseInt(el.id));
    shopUsers.value.id = props.id;
  });
});
// delete user
function deleteUser(id) {
  let filteredUser = shopUsers.value.users.filter(el => {
    return el !== id
  })
  shopUsers.value.users = filteredUser;
  console.log("form.value.users",form.value.users);
}
// add user
function addUser(){
  let findDuplicate = form.value.users.find(element => element.id == userId.value)
  if(findDuplicate){
    Swal.fire({
        text: "This payment method is added before",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-warning",
        }
      })
  }else{
    let filteredUser = Users.value.filter(ele => {
      return ele.id == userId.value
    })
    console.log("userId.value", ...filteredUser);
    
    form.value.users.push(parseInt(userId.value));
    userId.value = "";
  }
}
// set user pagination in table
const usersResult = computed(() =>
  form.value.users
    .slice(
      (localPagination.pageNumber - 1) * localPagination.pageSize,
      localPagination.pageSize * localPagination.pageNumber
    )
);
</script>
<style lang="scss">
@import "@/assets/sass/components/variables.custom";

.product-label {
  &-icon {
    font-size: 56px;
  }
}

.el-table tr {
  cursor: pointe !important;
}

.el-input {
  border-radius: 0.625rem;
}

.el-input__inner {
  border-radius: 0.625rem;
  background-color: #f5f8fa;
  height: 45px;
  border: none;
}

.el-tag {
  background-color: $primary !important;
  color: #fff;

  svg {
    color: #fff;
  }
}
.floating{
  position: fixed;
  bottom: 0px;
}
</style>