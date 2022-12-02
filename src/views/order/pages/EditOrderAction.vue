<template>
  <Form
    ref="brandForm"
    :validation-schema="schema"
    class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
    @submit="onSubmit">
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-9 pb-0">
        <div class="row g-5 g-xxl-8">
          <div class="mb-0">
            <div class="row d-flex flex-stack mb-5 cursor-pointer">
              <div class="col-6 my-3">
                <div>
                  <label class="required fs-5 fw-bold mb-2 d-inline">
                    {{ $t("name") }}</label
                  >
                  <Field
                    class="form-control form-control-lg form-control-solid"
                    :name="`name`"
                    v-model="form.name"
                    type="text"
                    v-slot="{ field, meta }">
                    <input
                      v-bind="field"
                      v-model="form.name"
                      name="resources"
                      type="text"
                      class="form-control form-control-solid form-control-lg" />
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
              <!--end:Description-->
              <div class="col-6">
                <label class="required fs-5 fw-bold mb-2 d-inline">
                  {{ $t("connectedShops") }}</label
                >
                <Field
                  v-slot="{ field }"
                  type="text"
                  class="form-control form-control-lg form-control-solid"
                  name="connectedShops">
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
                    :options="marketShops" />
                </Field>
                <ErrorMessage
                  class="text-danger"
                  name="connectedShops"></ErrorMessage>
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
                    checked=""
                    data-kt-check="false" />
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
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.canRevertAction"
                    checked=""
                    data-kt-check="false" />
                </span>
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
              v-if="!form.canRevertAction">
              <span class="d-flex align-items-center me-2">
                <!--begin::Icon-->
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.canRevertActionAfterCompletion"
                    checked=""
                    data-kt-check="false" />
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
              v-if="!form.mustFollowTheOrder">
              <span class="d-flex align-items-center me-2">
                <!--begin::Icon-->
                <span class="symbol symbol-50px me-6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="form.updateSkippedActionsWithLastActionInformation"
                    checked=""
                    data-kt-check="false" />
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
                    checked=""
                    data-kt-check="false" />
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

    <div class="row">
      <div class="card col-4">
        <div class="card-body">
          <!--begin::order list-->
          <draggable
            class="dragArea list-group"
            tag="ul"
            :list="order"
            item-key="orderStatusId"
            :group="{ name: 'people', put: false }"
            @change="log">
            <template #item="{ element }">
              <div
                :key="element.orderStatusId"
                class="d-flex align-items-center mb-8 drag-item">
                <!--begin::Bullet-->
                <span
                  class="bullet bullet-vertical h-40px bg-primary mx-4"></span>

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
          <!--end::order list-->
        </div>
      </div>

      <div class="col-1" style="text-align: center">
        <i class="fa fa-angle-double-right mt-50" style="font-size: 38px"></i>
      </div>

      <div class="card col-7">
        <!--begin::Action List-->
        <div class="card-body">
          <!--begin::Body-->
          <draggable
            class="dragArea list-group"
            :list="form.actions?.sort((a, b) => a.order - b.order)"
            item-key="orderStatusId"
            group="people"
            @change="log">
            <template #item="{ element }">
              <div class="card shadow-sm mb-5" :key="element.orderStatusId">
                <span
                  class="fs-6 fw-bold text-gray-400 empty-list"
                  v-if="form.actions.length == 0">
                  Drag and Drop OrderStatus
                </span>
                <div class="card-header border-0 mt-5">
                  <h3 class="card-title fw-bolder text-dark">
                    {{ element.name }}
                  </h3>
                  <div class="card-toolbar">
                    <a
                      @click="removeItem(element)"
                      role="button"
                      class="card-toolbar mx-4 my-2 d-flex justify-content-end align-items-center">
                      <span class="svg-icon svg-icon-3 svg-icon-danger">
                        <inline-svg
                          src="/media/icons/duotune/general/gen027.svg" />
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
                    aria-expanded="false">
                    {{ $t("details") }}
                    <span class="ms-2 rotate-180">
                      <span class="svg-icon svg-icon-3">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr072.svg" />
                      </span>
                    </span>
                  </div>
                  <div class="separator separator-dashed my-3"></div>
                </div>

                <div
                  :id="`kt_customer_view_details${element.orderStatusId}`"
                  class="collapse hide"
                  style="padding: 10px">
                  <label class="d-flex flex-stack mb-0 cursor-pointer">
                    <span class="d-flex align-items-center me-2">
                      <!--begin::autoComplete-->

                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="element.autoComplete"
                          checked=""
                          data-kt-check="false" />
                      </span>
                      <!--end::autoComplete-->
                      <!--begin::autoComplete-->
                      <span class="d-flex flex-column">
                        <span
                          class="fw-bolder text-gray-800 text-hover-primary fs-5">
                          {{ $t("autoComplete") }}</span
                        >
                        <span class="fs-6 fw-bold text-gray-400">
                          {{ $t("autoCompleteNotes") }}
                        </span>
                      </span>
                      <!--end:autoComplete-->
                    </span>

                    <!--begin:role-->
                  </label>

                  <div
                    class="col-12 my-3"
                    style="border: 1px solid #04c8c8; padding: 19px"
                    v-for="(e, i) in element.connectedRoles">
                    <label class="required fs-5 fw-bold mb-2 d-inline">
                      {{ $t("roles") }}</label
                    >
                    <Field
                      name="connectedShops"
                      type="text"
                      v-slot="{ field, value }">
                      <el-select
                        v-bind="field"
                        :mode-value="value"
                        class="w-100 form-control-solid border-0"
                        v-model="e.roleId">
                        <el-option
                          v-for="item in roles"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </Field>
                    <ErrorMessage
                      class="text-danger"
                      name="connectedShops"></ErrorMessage>

                    <label class="d-flex cursor-pointer mt-5 mb-1">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="e.sendEmail"
                          checked=""
                          data-kt-check="false" />
                      </span>

                      <span class="d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                          <span
                            class="fw-bolder text-gray-800 text-hover-primary fs-5">
                            {{ $t("sendEmail") }}</span
                          >
                        </span>
                      </span>
                    </label>
                    <label class="d-flex cursor-pointer mt-5 mb-1">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="e.sendSMS"
                          checked=""
                          data-kt-check="false" />
                      </span>
                      <span class="d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                          <span
                            class="fw-bolder text-gray-800 text-hover-primary fs-5">
                            {{ $t("sendSMS") }}</span
                          >
                        </span>
                      </span>
                    </label>

                    <label class="d-flex mb-0 cursor-pointer">
                      <span class="symbol symbol-50px me-6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="e.sendMobileNotification"
                          checked=""
                          data-kt-check="false" />
                      </span>

                      <span class="d-flex align-items-center me-2">
                        <span class="d-flex flex-column">
                          <span
                            class="fw-bolder text-gray-800 text-hover-primary fs-5">
                            {{ $t("sendNotification") }}</span
                          >
                        </span>
                      </span>
                    </label>
                    <a
                      v-if="i != 0"
                      @click="removeConnectedRole(i, element.orderStatusId)"
                      role="button"
                      class="card-toolbar mx-4 my-2 d-flex justify-content-end align-items-center">
                      <span class="svg-icon svg-icon-3 svg-icon-danger">
                        <inline-svg
                          src="/media/icons/duotune/general/gen027.svg" />
                      </span>
                    </a>
                  </div>
                  <div class="d-flex ms-3">
                    <a
                      role="button"
                      class="btn btn-primary"
                      @click="NewConnectedRole(element.orderStatusId)">
                      <span
                        class="svg-icon svg-icon-2 svg-icon-primary me-0 me-md-2">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr075.svg" />
                        {{ $t("addRole") }}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
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
                class="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
            <span v-else>
              {{ $t("update") }}
              <span class="fas fa-plus"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, defineProps } from "vue";
import { useStore } from "vuex";
import { ErrorMessage, Field, Form } from "vee-validate";
import draggable from "vuedraggable";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import Multiselect from "@vueform/multiselect";
import i18n from "@/core/plugins/i18n";
import { actionOrderTemplate } from "@/types";
import Swal from "sweetalert2";

const store = useStore();
// drop down lists
store.dispatch(Actions.GET_ORDER_STATUS);
store.dispatch(Actions.GET_ROLES);
const marketShops = computed(() => store.getters.getMarketData.shops);
const order = computed(() => store.getters.getOrder);
const roles = computed(() => store.getters.getRoles);
const isLoading = ref(false);
let actions: any = [];
let props = defineProps({
  id: String,
});

const OrderAction = ref({
  canRevertAction: false,
  mustFollowTheOrder: false,
  canRevertActionAfterCompletion: false,
  updateSkippedActionsWithLastActionInformation: false,
  isDefault: false,
  shops: [],
  name: "",
  actions,
});

const removeConnectedRole = (index: Number, id: string) => {
  OrderAction.value.actions.forEach((e) => {
    if (parseInt(e.orderStatusId) == parseInt(id)) {
      e?.connectedRoles.splice(index, 1);
    }
  });
};
const form = reactive(OrderAction);

const getData = (id) => {
  let ActionData: any = [];
  store.dispatch(Actions.GET_ORDER_ACTION_TEMPLATE_BY_ID, id).then((data) => {
    if (order.value.length > 0) {
      data.actions.forEach((el) => {
        ActionData.push({
          id: el.id,
          orderStatusId: el.orderStatusId,
          connectedRoles: el.connectedRoles,
          order: el.order,
          autoComplete: el.autoComplete,

          name: order.value.find(
            (x) => parseInt(x.orderStatusId) === parseInt(el.orderStatusId)
          ).name,
        });
      });
    }

    OrderAction.value = data;
    OrderAction.value.actions = ActionData;

    console.log("a", OrderAction.value);
  });
};
getData(props.id);
// remove order and return it to list if not exists
const isFound = (id: number) => {
  let result = false;
  order.value.some((element) => {
    if (element.orderStatusId === id) {
      result = true;
    }
  });
  return result;
};
const removeItem = (el) => {
  form.value.actions.splice(
    form.value.actions.findIndex(function (i) {
      return i.orderStatusId === el.orderStatusId;
    }),
    1
  );
  if (!isFound(el.orderStatusId)) {
    order.value.push(el);
  }

  order.value.sort((a, b) => a.order - b.order);
};

const NewConnectedRole = (id) => {
  let item = {
    roleId: "",
    sendEmail: false,
    sendSMS: false,
    sendMobileNotification: false,
  };
  form.value.actions.forEach((e) => {
    if (parseInt(e.orderStatusId) == parseInt(id)) {
      e.connectedRoles = [...e.connectedRoles, item];
    }
  });
};

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
      if (form.value.actions[i].connectedRoles[0].roleId === "") {
        Swal.fire({
          text: i18n.global.t("You Have to select Role !!"),
          icon: "warning",

          confirmButtonColor: "#3085d6",

          confirmButtonText: i18n.global.t("ok"),
        });
        bool = false;
        break;
      }
    }
    if (bool) {
      isLoading.value = true;
      store
        .dispatch(Actions.UPDATE_ORDER_ACTION_TEMPLATE, form.value)
        .then(() => {
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
