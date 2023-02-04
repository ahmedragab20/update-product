<template>
  <Form
    ref="brandForm"
    :validation-schema="schema"
    class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
    @submit="onSubmit"
  >
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-9 pb-0">
        <div class="row g-5 g-xxl-8">
          <div class="mb-0">
            <div class="row d-flex flex-stack mb-5 cursor-pointer">
              <!--begin:element-->

              <!--begin::name-->
              <div class="col-6 my-3">
                <div>
                  <label class="required fs-5 fw-bold mb-2 d-inline">
                    {{ $t("name") }}</label
                  >
                  <Field
                    class="form-control form-control-lg form-control-solid"
                    :name="`name`"
                    type="text"
                    v-slot="{ field, meta }"
                  >
                    <input
                      v-bind="field"
                      v-model="form.name"
                      name="resources"
                      type="text"
                      class="form-control form-control-solid form-control-lg"
                    />
                  </Field>

                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="`name`" class="text-danger">
                        <span class="text-danger">
                          {{ $t("resourcesValidation") }}
                        </span>
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
              <!--end:name-->
              <div class="col-6">
                <label class="required fs-5 fw-bold mb-2 d-inline">
                  {{ $t("connectedShops") }}</label
                >

                <Field
                  v-slot="{ field }"
                  type="text"
                  class="form-control form-control-lg form-control-solid"
                  name="connectedShops"
                >
                  <Multiselect
                    mode="tags"
                    v-model="form.shops"
                    v-bind="field"
                    :searchable="true"
                    label="name"
                    value-prop="id"
                    :classes="{
                      container:
                        'multiselect-lg form-control form-control-lg form-control-solid',
                      search:
                        'multiselect-search form-control form-control-solid',
                      clear: 'multiselect-lg-clear',
                    }"
                    :options="marketShops"
                  />
                </Field>
                <ErrorMessage
                  class="text-danger"
                  name="connectedShops"
                ></ErrorMessage>
              </div>
            </div>
            <!--begin::mustFollowTheOrder-->
            <label class="d-flex flex-stack mb-5 cursor-pointer mb-7">
              <span class="d-flex align-items-center me-2">
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    v-model="form.mustFollowTheOrder"
                    type="checkbox"
                    data-kt-check="false"
                  />
                </span>

                <span class="d-flex flex-column">
                  <span class="fw-bolder text-gray-800 text-hover-primary fs-5">
                    {{ $t("mustFollowTheOrderStatus") }}
                  </span>
                  <span class="fs-6 fw-bold text-gray-400">
                    {{ $t("mustFollowTheOrderStatusNotes") }}
                  </span>
                </span>
              </span>
            </label>
            <!--end::mustFollowTheOrder-->

            <!--begin:canRevertAction-->
            <label class="d-flex flex-stack mb-0 cursor-pointer mb-7">
              <span class="d-flex align-items-center me-2">
                <!--begin::Icon-->
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.canRevertAction"
                    data-kt-check="false"
                  />
                </span>
                <!--end::Icon-->

                <!--begin::Description-->
                <span class="d-flex flex-column">
                  <span class="fw-bolder text-gray-800 text-hover-primary fs-5">
                    {{ $t("canRevertAction") }}
                  </span>
                  <span class="fs-6 fw-bold text-gray-400">
                    {{ $t("canRevertActionNotes") }}
                  </span>
                </span>
              </span>
            </label>
            <!--end:canRevertAction-->

            <!--begin:canRevertActionAfterCompletion-->
            <label
              class="d-flex flex-stack mb-0 cursor-pointer mb-7"
              v-if="!form.canRevertAction"
            >
              <span class="d-flex align-items-center me-2">
                <!--begin::Icon-->
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.canRevertActionAfterCompletion"
                    data-kt-check="false"
                  />
                </span>

                <span class="d-flex flex-column">
                  <span class="fw-bolder text-gray-800 text-hover-primary fs-5">
                    {{ $t("canRevertActionAfterCompletion") }}</span
                  >
                  <span class="fs-6 fw-bold text-gray-400">
                    {{ $t("canRevertActionAfterCompletionNotes") }}
                  </span>
                </span>
              </span>
            </label>
            <!--end::canRevertActionAfterCompletion-->
            <!--begin:updateSkippedActionsWithLastActionInformation-->
            <label
              class="d-flex flex-stack mb-0 cursor-pointer mb-7"
              v-if="!form.mustFollowTheOrder"
            >
              <span class="d-flex align-items-center me-2">
                <!--begin::Icon-->
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.updateSkippedActionsWithLastActionInformation"
                    data-kt-check="false"
                  />
                </span>

                <span class="d-flex flex-column">
                  <span class="fw-bolder text-gray-800 text-hover-primary fs-5">
                    {{ $t("updateSkippedActionsWithLastActionInformation") }}
                  </span>
                  <span class="fs-6 fw-bold text-gray-400">
                    {{
                      $t("updateSkippedActionsWithLastActionInformationNotes")
                    }}
                  </span>
                </span>
              </span>
            </label>
            <!--end:updateSkippedActionsWithLastActionInformation-->
            <!--begin:isDefault-->
            <label class="d-flex flex-stack mb-0 cursor-pointer mb-7">
              <span class="d-flex align-items-center me-2">
                <!--begin::Icon-->
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.isDefault"
                    data-kt-check="false"
                  />
                </span>

                <span class="d-flex flex-column">
                  <span class="fw-bolder text-gray-800 text-hover-primary fs-5">
                    {{ $t("isDefault") }}
                  </span>
                  <span class="fs-6 fw-bold text-gray-400">
                    {{ $t("isDefaultNotes") }}
                  </span>
                </span>
              </span>
            </label>
            <!--end::isDefault-->
          </div>
        </div>
      </div>
    </div>
    <!--end::Navbar-->

    <div class="row g-5 g-xxl-8">
      <!--begin::order list-->
      <div class="col-4 card ml-10">
        <div class="card-body">
          <draggable
            class="dragArea list-group"
            tag="ul"
            :list="order"
            item-key="orderStatusId"
            :group="{ name: 'people', put: false }"
            @change="log"
          >
            <template #item="{ element }">
              <div
                :key="element.orderStatusId"
                class="d-flex align-items-center mb-8 drag-item"
              >
                <!--begin::Bullet-->
                <span
                  class="bullet bullet-vertical h-40px bg-primary mx-4"
                ></span>

                <div class="flex-grow-1">
                  <a
                    href="#"
                    class="text-gray-800 text-hover-primary fw-bolder fs-6"
                    >{{ element.name }}</a
                  >
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <!--end::order list-->

      <div class="col-1" style="text-align: center">
        <i class="fa fa-angle-double-right" style="font-size: 38px"></i>
      </div>
      <div class="card col-7">
        <!--begin::Action List-->

        <!--begin::Body-->
        <div class="card-body w-65">
          <span
            class="fs-6 fw-bold text-gray-400 empty-list"
            v-if="form.actions.length == 0"
          >
            Drag and Drop OrderStatus
          </span>
          <draggable
            class="dragArea list-group"
            :list="form.actions?.sort((a, b) => a.order - b.order)"
            item-key="orderStatusId"
            group="people"
            @change="log"
          >
            <template #item="{ element }">
              <div class="card shadow-sm mt-2" :key="element.orderStatusId">
                <div class="card-header border-0 mt-5">
                  <h3 class="card-title fw-bolder text-dark">
                    {{ element.name }}
                  </h3>
                  <div class="card-toolbar">
                    <a
                      @click="removeItem(element)"
                      role="button"
                      class="card-toolbar mx-4 my-2 d-flex text-center"
                    >
                      <span class="svg-icon svg-icon-3 svg-icon-danger">
                        <inline-svg
                          src="/media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                    </a>
                  </div>
                </div>
                <div class="text-center fs-4 py-3">
                  <div
                    class="fw-bolder rotate collapsible"
                    data-bs-toggle="collapse"
                    :href="`#kt_customer_view_details${element.orderStatusId}`"
                    role="button"
                    aria-expanded="false"
                  >
                    {{ $t("details") }}
                    <span class="ms-2 rotate-180">
                      <span class="svg-icon svg-icon-3">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr072.svg"
                        />
                      </span>
                    </span>
                  </div>
                  <div class="separator separator-dashed my-3"></div>
                </div>

                <div
                  :id="`kt_customer_view_details${element.orderStatusId}`"
                  class="collapse show"
                  style="padding: 30px"
                >
                  <label class="d-flex flex-stack mb-0 cursor-pointer">
                    <!--begin:element-->
                    <!--begin::autoComplete-->
                    <span class="d-flex align-items-center me-2">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="element.autoComplete"
                          data-kt-check="false"
                        />
                      </span>

                      <span class="d-flex flex-column">
                        <span
                          class="fw-bolder text-gray-800 text-hover-primary fs-5"
                        >
                          {{ $t("autoComplete") }}</span
                        >
                        <span class="fs-6 fw-bold text-gray-400">
                          {{ $t("autoCompleteNotes") }}
                        </span>
                      </span>
                    </span>
                    <!--end::autoComplete-->
                  </label>

                  <!--begin:connectedRoles-->
                  <div
                    class="col-12 my-3"
                    style="border: 1px solid #04c8c8; padding: 19px"
                    v-for="(e, idx) in element.connectedRoles"
                  >
                  
                 
                    <label class="required fs-5 fw-bold mb-2 d-inline">
                      {{ $t("roles") }}</label
                    >
              
                    <Field
                      :name="`connectedRoles[${idx}].role`"
                      type="text"
                      v-slot="{ field, value }"
                    >
                      {{ e.roleId }}
                      <el-select
                        v-bind="field"
                        :mode-value="value"
                        class="w-100 form-control-solid border-0"
                        v-model="e.roleId"
                        
                      >
                        <el-option
                          v-for="item in roles"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                          :disabled="
                             element.connectedRoles.some(
                                (p) => p.roleId == item.id
                              )
                            ">
                        
                        
                        </el-option>
                      </el-select>
                    </Field>
                    <ErrorMessage
                      class="text-danger"
                      :name="`connectedRoles[${idx}].role`"
                    ></ErrorMessage>

                    <label class="d-flex cursor-pointer mt-5 mb-1">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="e.sendEmail"
                          data-kt-check="false"
                        />
                      </span>

                      <span class="d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                          <span
                            class="fw-bolder text-gray-800 text-hover-primary fs-5"
                          >
                            {{ $t("sendEmail") }}
                          </span>
                        </span>
                      </span>
                    </label>
                    <label class="d-flex cursor-pointer mb-1">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="e.sendSMS"
                          data-kt-check="false"
                        />
                      </span>
                      <span class="d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                          <span
                            class="fw-bolder text-gray-800 text-hover-primary fs-5"
                          >
                            {{ $t("sendSMS") }}
                          </span>
                        </span>
                      </span>
                    </label>

                    <label class="d-flex mb-0 cursor-pointer">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="e.sendMobileNotification"
                          data-kt-check="false"
                        />
                      </span>

                      <span class="d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                          <span
                            class="fw-bolder text-gray-800 text-hover-primary fs-5"
                          >
                            {{ $t("sendNotification") }}
                          </span>
                        </span>
                      </span>
                    </label>
                    <a
                      v-if="idx != 0"
                      @click="removeConnectedRole(idx, element.orderStatusId)"
                      role="button"
                      class="card-toolbar mx-4 my-2 d-flex justify-content-end align-items-center"
                    >
                      <span class="svg-icon svg-icon-3 svg-icon-danger">
                        <inline-svg
                          src="/media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                    </a>
                  </div>
                  <div class="d-flex">
                    <a
                      role="button"
                      class="btn btn-primary"
                      @click="NewConnectedRole(element.orderStatusId)"
                    >
                      <span
                        class="svg-icon svg-icon-2 svg-icon-primary me-0 me-md-2"
                      >
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr075.svg"
                        />
                        {{ $t("addRole") }}
                      </span>
                    </a>
                  </div>
                  <!--end:connectedRoles-->
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <!--end::Action List-->
      </div>
    </div>
    <div class="row my-5">
      <div class="col">
        <div class="d-flex justify-content-end w-100">
          <button class="btn btn-light" type="button" @click="$router.go(-1)">
            {{ $t("goBack") }}
          </button>
          <button class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading" class="indicator-progress d-block">
              {{ $t("wait") }}...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              />
            </span>
            <span v-else>
              {{ $t("addOrderAction") }}
              <span class="fas fa-plus"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import Multiselect from "@vueform/multiselect";
import i18n from "@/core/plugins/i18n";
import { reactive, ref, computed ,unref} from "vue";
import { useStore } from "vuex";
import { ErrorMessage, Field, Form } from "vee-validate";
import draggable from "vuedraggable";
import { Actions } from "@/store/enums/StoreEnums";
import { actionOrderTemplate } from "@/types";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
interface OrderActionTemplateType {
  canRevertAction: boolean;
  mustFollowTheOrder: boolean;
  canRevertActionAfterCompletion: boolean;
  updateSkippedActionsWithLastActionInformation: boolean;
  isDefault: boolean;
  shops: Array<string>;
  name: string;
  actions: Array<actionOrderTemplate>;
}
interface connectedRoles {
  roleId?: string;
  sendEmail: false;
  sendSMS: false;
  sendMobileNotification: false;
}
const store = useStore();
const marketShops = computed(() => store.getters.getMarketData.shops);
const order = computed(() => store.getters.getOrder);
const roles = computed(() => store.getters.getRoles);
const isLoading = ref(false);
const router = useRouter();
const actions = ref<actionOrderTemplate[]>();
store.dispatch(Actions.GET_ORDER_STATUS);
store.dispatch(Actions.GET_ROLES);
const schema = yup.object({
  name: yup
    .string()

    .required(i18n.global.t("fieldRequired")),
  connectedShops: yup
    .array()
    .of(yup.number())
    .required(i18n.global.t("fieldRequired")),
});

const removeItem = (el: actionOrderTemplate) => {
  form.value.actions.splice(
    form.value.actions.findIndex(function (i) {
      return i.orderStatusId == el.orderStatusId;
    }),
    1
  );

  order.value.push(el);
  order.value.sort((a, b) => a.order - b.order);
};
const itemInstance = ref<connectedRoles>({
  roleId: "",
  sendEmail: false,
  sendMobileNotification: false,
  sendSMS: false,
});

const NewConnectedRole = (id: string) => {
  form.value.actions.forEach((e) => {
    if (parseInt(e.orderStatusId) == parseInt(id)) {
      e.connectedRoles.push(itemInstance.value);
    }
  });
  itemInstance.value={
    roleId: "",
  sendEmail: false,
  sendMobileNotification: false,
  sendSMS: false,
  }
};
const removeConnectedRole = (index, id) => {
  form.value.actions.forEach((e) => {
    if (parseInt(e.orderStatusId) == parseInt(id)) {
      e?.connectedRoles.splice(index, 1);
    }
  });
};
const OrderActionTemplate = ref<OrderActionTemplateType>({
  canRevertAction: false,
  mustFollowTheOrder: false,
  canRevertActionAfterCompletion: false,
  updateSkippedActionsWithLastActionInformation: false,
  isDefault: false,
  shops: [],
  name: "",
  actions: [],
});
const form = reactive(OrderActionTemplate);

const onSubmit = () => {
  if (form.value.actions.length == 0) {
    Swal.fire({
      text: i18n.global.t("order template must have one action at least"),
      icon: "warning",

      confirmButtonColor: "#3085d6",

      confirmButtonText: i18n.global.t("ok"),
    });
  } else {
    let bool = true;
    for (let i = 0; i < form.value.actions.length; i++) {
      for (let j=0; j < form.value.actions[i].connectedRoles.length;j++) {
        if (form.value.actions[i].connectedRoles[j].roleId == ""){
        console.log("jij")
        Swal.fire({
          text: i18n.global.t("You Have to select   All Role !!"),
          icon: "warning",

          confirmButtonColor: "#3085d6",

          confirmButtonText: i18n.global.t("ok"),
        });
        bool = false;
        break;
      }}
    }
    if (bool) {
      isLoading.value = true;
      store.dispatch(Actions.ADD_ORDER_ACTION, form.value).then(() => {
        isLoading.value = false;
      });
    }
  }
};
</script>
<style>
.drag-item {
  cursor: all-scroll;
}
</style>
