<template>
  <div
    class="modal fade"
    id="kt_modal_update_client"
    ref="updateClientGroupModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bolder">{{ $t("updateClientGroup") }}</h2>
          <!--end::Modal title-->
          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <Form
          ref=""
          class="form fv-plugins-bootstrap5 fv-plugins-framework p-5"
          @submit="onSubmit"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_customer_scroll">
              <!--begin::Input group-->
              <div class="row">
                <div class="col-6 my-3">
                  <label class="required fs-5 fw-bold mb-2">
                    {{ $t("name") }}</label
                  >
                  <div class="position-relative w-auto h-auto">
                    <Field
                      name="groupname"
                      type="text"
                      v-slot="{ field, meta }"
                      v-model="formData.name"
                    >
                      <input
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                      />
                    </Field>
                  </div>

                  <ErrorMessage
                    class="text-danger"
                    name="groupname"
                  ></ErrorMessage>
                </div>
                <div class="col-6 my-3">
                  <label class="required fs-5 fw-bold mb-2"></label>
                  <div class="position-relative w-auto h-auto">
                    <Field
                      name="groupname"
                      type="text"
                      v-slot="{ field, meta }"
                      v-model="formData.name"
                    >
                      <input
                        readonly
                        v-bind="field"
                        class="form-control form-control-solid form-control-lg"
                        :style="`background-color:${formData.backgroundColorHeax};color:${formData.textColorHexa}`"
                      />
                    </Field>
                  </div>
                </div>
              </div>
              <!--end::Input-->

              <!--start:: Icons -->
              <div class="row">
                <div class="col-6 my-3">
                  <label class="required fs-5 fw-bold mb-2 d-inline">
                    {{ $t("icon") }}
                  </label>
                  <Field name="icon" type="text" v-slot="{ field, value }">
                    <el-select
                      :model-value="value"
                      v-bind="field"
                      class="w-100 form-control-solid border-0"
                      v-model="formData.icon"
                    >
                      <el-option
                        v-for="item in icons"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                        <div
                          class="d-flex w-100 justify-content-between align-items-center"
                        >
                          <span>{{ item.name }}</span>
                          <i :class="item.code"></i>
                        </div>
                      </el-option>
                    </el-select>
                  </Field>
                  <ErrorMessage class="text-danger" name="icon"></ErrorMessage>
                </div>

                <!--end:: Icons -->
                <!--start:: condition -->
                <div class="col-6 my-3">
                  <label class="required fs-5 fw-bold mb-2 d-inline">
                    {{ $t("conditionsOperator") }}
                  </label>
                  <Field
                    name="conditionsOperatorId"
                    type="text"
                    v-slot="{ field, value }"
                  >
                    <el-select
                      :model-value="value"
                      v-bind="field"
                      class="w-100 form-control-solid border-0"
                      v-model="formData.conditionsOperatorId"
                    >
                      <el-option
                        v-for="item in conditionsOperator"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </Field>
                  <ErrorMessage
                    class="text-danger"
                    name="conditionsOperatorId"
                  ></ErrorMessage>
                </div>
              </div>
              <!--begin::color and backgrounf form-->
              <div class="row">
                <div class="col-6 my-3">
                  <label class="required fs-5 fw-bold">
                    {{ $t("textColor") }}
                  </label>
                  <div
                    class="form-control form-control-solid form-control-lg d-flex align-items-center justify-content-between"
                  >
                    <Field
                      v-model="formData.textColorHexa"
                      name="textColorHexa"
                      value="#000000"
                      type="color"
                      v-slot="{ value, field }"
                    >
                      <el-color-picker v-model="formData.textColorHexa" />
                      <input
                        type="text"
                        class="border-0 rounded"
                        style="width: 75px"
                        v-bind="field"
                      />
                    </Field>
                  </div>
                  <ErrorMessage
                    class="text-danger"
                    name="textColorHexa"
                  ></ErrorMessage>
                </div>
                <!--end::text-color-->
                <!--begin::background-color-->
                <div class="col-6 my-3">
                  <label class="required fs-5 fw-bold">
                    {{ $t("backgroundColor") }}
                  </label>
                  <div
                    class="form-control form-control-solid form-control-lg d-flex align-items-center justify-content-between"
                  >
                    <Field
                      v-model="formData.backgroundColorHeax"
                      name="backgroundColorHeax"
                      value="#ffffff"
                      type="color"
                      v-slot="{ field }"
                    >
                      <el-color-picker v-model="formData.backgroundColorHeax" />
                      <input
                        type="text"
                        class="border-0 rounded"
                        style="width: 75px"
                        v-bind="field"
                      />
                    </Field>
                  </div>
                  <ErrorMessage
                    class="text-danger"
                    name="backgroundColorHeax"
                  ></ErrorMessage>
                </div>
              </div>
              <!--end::color and background form-->
              <!--end:: condition -->

              <div class="fw-bolder fs-3 mb-7">
                <div
                  v-if="formData.conditions && formData.conditions.length > 0"
                  class="mt-5"
                >
                  <section>
                    <div
                      class="d-flex justify-content-between gap-1 align-items-center flex-wrap"
                    >
                      <label class="form-label">{{
                        $t("clientsCondition")
                      }}</label>
                      <div>
                        <button
                          @click="toggleAddNewGroupItemDialog"
                          type="button"
                          class="btn btn-sm bg-light-primary text-primary btn-hover-rise rounded-pill"
                        >
                          + {{ $t("addNewClientCondition") }}
                        </button>
                      </div>
                    </div>

                    <table class="table gs-3 gy-3 gx-5">
                      <thead>
                        <tr
                          class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                        >
                          <th class="text-truncate">#</th>
                          <th class="text-truncate">{{ $t("name") }}</th>

                          <th class="text-truncate">{{ $t("actions") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in formData.conditions"
                          :key="item.id"
                        >
                          <td class="text-truncate">
                            <div class="td-holder" v-text="index + 1" />
                          </td>
                          <td class="text-truncate">
                            <div class="td-holder">
                              {{
                                clientCondition?.find(
                                  (x) => x.id == item.conditionId
                                )?.name
                              }}
                            </div>
                          </td>

                          <td>
                            <div class="td-holder gap-2">
                              <button
                                type="button"
                                class="btn btn-sm btn-bg-light rounded-pill btn-text-info me-2"
                                title="edit"
                                @click="
                                  setClickedCondition(item),
                                    toggleAddGroupItemDialog()
                                "
                              >
                                <i
                                  class="bi bi-pencil-square text-info"
                                  style="font-size: 1rem"
                                ></i>
                              </button>
                              <button
                                type="button"
                                class="btn btn-sm btn-bg-light rounded-pill btn-text-danger"
                                title="remove"
                                @click="removeClientCondition(item.id)"
                              >
                                <i
                                  class="bi bi-trash3 text-danger"
                                  style="font-size: 1rem"
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </section>
                </div>
                <div v-else class="mt-5">
                  <button
                    @click="toggleAddNewGroupItemDialog"
                    type="button"
                    class="btn bg-light-success text-primary btn-hover-rise btn-sm mb-5"
                  >
                    + {{ $t("addClientCondition") }}
                  </button>
                  <span class="text-danger row">
                    {{ $t("Client must have one Condition at least") }}
                  </span>
                </div>
                <el-dialog
                  class="modal fade"
                  v-model="groupItemDialog"
                  :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
                  top="5vh"
                >
                  <template #default>
                    <section
                      style="
                        max-height: 70vh;
                        overflow: auto;
                        overflow-x: hidden;
                      "
                    >
                      <Form
                        @submit="addnewItem"
                        :validation-schema="schemaClintCondotion"
                      >
                        <div class="row">
                          <div class="col-6 my-3">
                            <label class="required fs-5 fw-bold mb-2 d-inline">
                              {{ $t("clientsCondition") }}</label
                            >
                            <Field
                              name="conditionId"
                              v-slot="{ field, value }"
                              v-model="itemInstance.conditionId"
                            >
                              <el-select
                                v-bind="field"
                                :mode-value="value"
                                class="w-100 form-control-solid border-0"
                                v-model="itemInstance.conditionId"
                              >
                                <el-option
                                  v-for="item in clientCondition"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </Field>
                            <ErrorMessage
                              class="text-danger"
                              name="conditionId"
                            ></ErrorMessage>
                          </div>
                          <div
                            class="col-6 my-3"
                            v-if="
                              itemInstance.conditionId != '9' &&
                              itemInstance.conditionId != '10' &&
                              itemInstance.conditionId != '11' &&
                              itemInstance.conditionId != '12'
                            "
                          >
                            <label class="required fs-5 fw-bold mb-2 d-inline">
                              {{ $t("condition") }}
                            </label>

                            <Field
                              name="operationTypeId"
                              type="text"
                              v-slot="{ field, value }"
                            >
                              <el-select
                                v-bind="field"
                                :mode-value="value"
                                value-key="value"
                                class="w-100 form-control-solid border-0"
                                v-model="itemInstance.operationTypeId"
                              >
                                <el-option
                                  v-for="item in copmerisonType"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </Field>
                            <ErrorMessage
                              class="text-danger"
                              name="operationTypeId"
                            ></ErrorMessage>
                          </div>
                          <div
                            class="row mb-7"
                            v-if="itemInstance.operationTypeId == '6'"
                          >
                            <!--begin::Label-->
                            <div class="col-6 my-3">
                              <label class="required fs-5 fw-bold mb-2">
                                {{ $t("minValue") }}</label
                              >
                              <div class="position-relative w-auto h-auto">
                                <Field
                                  name="minValue"
                                  type="text"
                                  v-slot="{ field, meta }"
                                  v-model="itemInstance.minValue"
                                >
                                  <input
                                    v-bind="field"
                                    class="form-control form-control-solid form-control-lg"
                                  />
                                </Field>
                              </div>

                              <ErrorMessage
                                class="text-danger"
                                name="minValue"
                              ></ErrorMessage>
                            </div>
                            <div class="col-6 my-3">
                              <label class="required fs-5 fw-bold mb-2">{{
                                $t("maxValue")
                              }}</label>
                              <div class="position-relative w-auto h-auto">
                                <Field
                                  name="maxValue"
                                  type="text"
                                  v-slot="{ field, meta }"
                                  v-model="itemInstance.maxValue"
                                >
                                  <input
                                    v-bind="field"
                                    class="form-control form-control-solid form-control-lg"
                                  />
                                </Field>
                              </div>

                              <ErrorMessage
                                class="text-danger"
                                name="maxValue"
                              ></ErrorMessage>
                            </div>
                            <!--end::Input-->
                          </div>

                          <div
                            class="col-6 mb-7"
                            v-if="
                              itemInstance?.conditionId == '8' ||
                              itemInstance?.conditionId == '7'
                            "
                          >
                            <!--begin::date-->

                            <label
                              class="required fs-5 fw-bold mb-2 d-inline"
                              :for="`value`"
                            >
                              {{ $t("date") }}
                            </label>
                            <div class="position-relative w-auto h-auto">
                              <!--begin::Input-->
                              <Field
                                :id="`value`"
                                name="date"
                                v-slot="{ field, value }"
                              >
                                <el-date-picker
                                  v-bind="field"
                                  type="datetime"
                                  v-model="itemInstance.value"
                                  placeholder="Select a date"
                                  name="dueDate"
                                />
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="date"
                              ></ErrorMessage>
                            </div>

                            <!--end::Input-->
                          </div>
                          <div
                            class="col-6 my-3"
                            v-else-if="itemInstance.conditionId == '9'"
                          >
                            <label
                              class="required fs-5 fw-bold mb-2 d-inline"
                              :for="`gender`"
                            >
                              {{ $t("sex") }}</label
                            >
                            <Field
                              :id="`gender`"
                              name="gender"
                              type="text"
                              v-model="itemInstance.value"
                            >
                              <el-select
                                class="w-100 form-control-solid border-0"
                                v-model="itemInstance.value"
                              >
                                <el-option
                                  v-for="item in gender"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </Field>
                            <ErrorMessage
                              class="text-danger"
                              name="gender"
                            ></ErrorMessage>
                          </div>

                          <div
                            class="col-6 my-3"
                            v-if="itemInstance.conditionId == '10'"
                          >
                            <label
                              class="required fs-5 fw-bold mb-2 d-inline"
                              :for="`country`"
                            >
                              {{ $t("country") }}
                            </label>
                            <Field
                              :id="`country`"
                              name="country"
                              type="text"
                              v-slot="{ field, value }"
                            >
                              <el-select
                                v-bind="field"
                                :mode-value="value"
                                class="w-100 form-control-solid border-0"
                                v-model="itemInstance.value"
                              >
                                <el-option
                                  v-for="item in countries"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                                >
                                </el-option>
                              </el-select>
                            </Field>
                            <ErrorMessage
                              class="text-danger"
                              name="country"
                            ></ErrorMessage>
                          </div>

                          <div
                            class="row my-3"
                            v-if="itemInstance.conditionId == '11'"
                          >
                            <div class="col-6 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                              >
                                {{ $t("country") }}</label
                              >

                              <Field
                                name="countryCity"
                                type="text"
                                v-slot="{ field, value }"
                                v-model="itemInstance.countryId"
                              >
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="itemInstance.countryId"
                                  @change="getCities(itemInstance.countryId)"
                                >
                                  <el-option
                                    v-for="item in countries"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="countryCity"
                              ></ErrorMessage>
                            </div>
                            <div class="col-6 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                              >
                                {{ $t("city") }}</label
                              >

                              <Field
                                name="city"
                                type="text"
                                v-model="itemInstance.value"
                                v-slot="{ field, value }"
                              >
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="itemInstance.value"
                                >
                                  <el-option
                                    v-for="item in cities"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="city"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div
                            class="row my-3"
                            v-else-if="itemInstance.conditionId == '12'"
                          >
                            <div class="col-6 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                              >
                                {{ $t("country") }}</label
                              >

                              <Field
                                name="countryArae"
                                type="text"
                                v-slot="{ field, value }"
                                v-model="itemInstance.countryId"
                              >
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="itemInstance.countryId"
                                  @change="getCities(itemInstance.countryId)"
                                >
                                  <el-option
                                    v-for="item in countries"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="countryArae"
                              ></ErrorMessage>
                            </div>
                            <div class="col-6 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                              >
                                {{ $t("city") }}</label
                              >

                              <Field
                                name="Areacity"
                                type="text"
                                v-slot="{ field, value }"
                              >
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="itemInstance.cityId"
                                  @change="getArea(itemInstance.cityId)"
                                >
                                  <el-option
                                    v-for="item in cities"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="Areacity"
                              ></ErrorMessage>
                            </div>
                            <div class="col-6 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                              >
                                {{ $t("area") }}</label
                              >
                              <Field
                                name="area"
                                type="text"
                                v-slot="{ field, value }"
                              >
                                <!-- {{  getArea(condition.cityId)}} -->
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="itemInstance.value"
                                >
                                  <el-option
                                    v-for="item in area"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="area"
                              ></ErrorMessage>
                            </div>
                          </div>
                          <div
                            class="col-6 mb-7"
                            v-if="
                              itemInstance.conditionId !== '8' &&
                              itemInstance.conditionId !== '9' &&
                              itemInstance.conditionId !== '7' &&
                              itemInstance.conditionId != '10' &&
                              itemInstance.conditionId !== '11' &&
                              itemInstance.conditionId !== '12' &&
                              itemInstance.operationTypeId != '6'
                            "
                          >
                            <!--begin::Label-->
                            <label class="required fs-6 fw-bold mb-2">
                              {{ $t("value") }}</label
                            >
                            <!--end::Label-->

                            <!--begin::Input-->
                            <div class="position-relative w-auto h-auto">
                              <Field
                                name="value"
                                type="text"
                                v-slot="{ field, meta }"
                                v-model="itemInstance.value"
                              >
                                <input
                                  v-bind="field"
                                  class="form-control form-control-solid form-control-lg"
                                />
                              </Field>
                            </div>

                            <ErrorMessage
                              class="text-danger"
                              name="value"
                            ></ErrorMessage>
                          </div>
                        </div>

                        <div class="mt-7">
                          <button
                            v-if="!clickedCondition"
                            type="submit"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                          >
                            {{ $t("submitData") }}
                          </button>
                          <button
                            v-else
                            type="submit"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                          >
                            {{ $t("editData") }}
                          </button>
                        </div>
                      </Form>
                    </section>
                  </template>
                </el-dialog>
              </div>
            </div>
          </div>
          <!--end::Scroll-->

          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
           
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :disabled="!isSubmitAllValid"
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                {{ $t("update") }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                {{ $t("pleaseWait") }}...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </Form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, reactive } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { uuid } from "vue-uuid";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Form, Field, ErrorMessage } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import * as yup from "yup";
import { screenDimensions } from "@/utils/helpers";
import i18n from "@/core/plugins/i18n";
import { useStore } from "vuex";
export default defineComponent({
  name: "update-clientgroup",
  components: {
    Field,
    uuid,
    ErrorMessage,
    Form,
  },
  props: {
    id: {
      type: String,
    },
  },
  //   Variables and Getters Init
  setup(props, { emit }) {
    interface conditionsType {
      condition: string;
      id?: string;
      value: string;
      minValue: string;
      maxValue: string;
      operationType: string;
    }
    interface UpdateFormType {
      id: string;

      name: string;
      icon: string;
      textColorHexa: string;
      backgroundColorHeax: string;
      conditionsOperatorId: string;
      conditions: Array<{
        id: string;
        conditionId: string;
        value: string;
        minValue: string;
        maxValue: string;
        cityId: string;
        countryId: string;
        operationTypeId: string;
      }>;
    }

    const store = useStore();
    const icons = computed<any>(() => store.getters.getIcons);
    const conditionsOperator = computed<any>(
      () => store.getters.getConditionType
    );
    const copmerisonType = computed<any>(() => store.getters.getcopmerisonType);
    const clientCondition = computed<any>(
      () => store.getters.getclientsCondition
    );
    const countries = computed<any>(() => store.getters.getCountries);
    const gender = computed<any>(() => store.getters.getGender);
    const cities = computed<any>(() => store.getters.getCities);
    const area = computed<any>(() => store.getters.getAreas);

    const formRef = ref<null | HTMLFormElement>(null);
    const updateClientGroupModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const country = ref<string>("");
    const city = ref<string>("");

    const formData = ref<UpdateFormType>({
      id: "",
      name: "",
      icon: "",
      textColorHexa: "#2b2b2b",
      backgroundColorHeax: "#ffffff",
      conditionsOperatorId: "",
      conditions: [],
    });
    const groupItemDialog = ref<boolean>(false);
    const confirmationDialog = ref<boolean>(false);
    const targetRemovedDetails = ref({
      id: null,
      array: "",
    });
    const itemInstance = ref({
      conditionId: "",
      id: "",
      value: "",
      countryId: "",
      cityId: "",
      minValue: "",
      maxValue: "",
      operationTypeId: "1",
    });
    const toggleConfirmationDialog = (info: { id: any; array: string }) => {
      targetRemovedDetails.value = info;

      confirmationDialog.value = !confirmationDialog.value;
    };
    const toggleAddGroupItemDialog = () => {
      groupItemDialog.value = !groupItemDialog.value;
    };
    const toggleAddNewGroupItemDialog = () => {
      itemInstance.value = {
        conditionId: "",
        id: "",
        value: "",
        countryId: "",
        cityId: "",
        minValue: "",
        maxValue: "",
        operationTypeId: "1",
      };
      clickedCondition.value = null;

      groupItemDialog.value = !groupItemDialog.value;
    };
    const clickedCondition = ref();
    const setClickedCondition = (item: {
      conditionId: string;
      value: string;
      operationTypeId: string;
      minValue: string;
      maxValue: string;
      countryId: string;
      cityId: string;
    }) => {
      clickedCondition.value = item;

      itemInstance.value.conditionId = item.conditionId;
      itemInstance.value.value = item.value;
      itemInstance.value.operationTypeId = item.operationTypeId;
      itemInstance.value.minValue = item.minValue;
      itemInstance.value.maxValue = item.maxValue;
      itemInstance.value.countryId = item.countryId;
      itemInstance.value.cityId = item.cityId;
    };
    const removeClientCondition = async (id: string) => {
      Swal.fire({
        title: i18n.global.t("alertText"),
        text: i18n.global.t("deleteModifierAlertText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: i18n.global.t("cancel"),
        confirmButtonText: i18n.global.t("yesSure"),
      }).then((status) => {
        if (status.isConfirmed) {
          formData.value.conditions = formData.value.conditions.filter(
            (i) => i.id !== id
          );
          console.log("ee", formData.value.conditions);
          toggleConfirmationDialog({ id: null, array: "" });
        }
      });
    };
    const removeItem = (index: number) => {
      formData.value.conditions.splice(index, 1);
      console.log(formData);
    };
    const addnewItem = (values: any) => {
      const item = unref(itemInstance.value);

      if (!clickedCondition.value) {
        formData.value.conditions.push({ ...item, id: uuid.v4() });
      } else {
        let targeted = formData.value.conditions.find(
          (el: any) => el.id === clickedCondition.value.id
        );
        targeted.conditionId = item.conditionId;
        targeted.value = item.value;
        targeted.minValue = item.minValue;
        targeted.maxValue = item.maxValue;
        targeted.operationTypeId = item.operationTypeId;
      }
      itemInstance.value = {
        conditionId: "",
        id: "",
        value: "",
        countryId: "",
        cityId: "",
        minValue: "",
        maxValue: "",
        operationTypeId: "1",
      };
      toggleAddGroupItemDialog();
      clickedCondition.value = null;
    };

    const getCities = (id: string) => {
      itemInstance.value.cityId = "";
      itemInstance.value.value = "";
      store.dispatch(Actions.GET_CITY_BY_COUNTRYID, id);
    };

    const getArea = (id: string) => {
      itemInstance.value.value = "";
      store.dispatch(Actions.GET_AREA_BY_CITYID, id);
    };
    const isSubmitAllValid = computed(() => {
      const item = unref(formData.value);
      const conditionsOperatorId = item.conditionsOperatorId;
      const name = item.name;
      const icon = item.icon;

      const conditionsLength = item.conditions.length > 0;

      return conditionsOperatorId && name && icon && conditionsLength;
    });
    const fetchData = (id: any) => {
      store.dispatch(Actions.GET_CLIENT_GROUP_BY_ID, id).then((res) => {
        formData.value.id = res.id;
        formData.value.name = res.name;
        formData.value.icon = res.icon;
        formData.value.textColorHexa = res.textColorHexa;
        formData.value.backgroundColorHeax = res.backgroundColorHeax;
        formData.value.conditionsOperatorId = res.conditionsOperator.id;
        formData.value.conditions = res.conditions.map((res) => {
          return {
            conditionId: res.condition.id,
            operationTypeId: res.operationType.id,
            value: res.value,
            minValue: res.minValue,
            maxValue: res.maxValue,
            cityId: res.cityId,
            countryId: res.countryId,
            id: res.id,
          };
        });
        // formData.value.conditionsOperatorId = res.conditionsOperator;
        console.log("formData.value", formData.value);
        formData.value.conditions.forEach((el) => {
          if (el.countryId) {
            getCities(el.countryId);
          }
          if (el.cityId) {
            getArea(el.cityId);
          }
        });
        // getCities(1)
      });
    };

    const schemaClintCondotion = yup.object().shape({
      conditionId: yup.string().required(i18n.global.t("fieldRequired")),
      operationTypeId: yup.string().default("1"),
      // value: yup.string().required(i18n.global.t("fieldRequired")),
      minValue: yup
        .string()
        .when("operationTypeId", (operationTypeId: string) => {
          if (operationTypeId === "6") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return yup.string();
          }
        }),
      date: yup.string().when("conditionId", (conditionId: string) => {
        if (conditionId === "8") {
          return yup.date().required(i18n.global.t("fieldRequired"));
        }
        if (conditionId === "7") {
          return yup.date().required(i18n.global.t("fieldRequired"));
        } else {
          // return  yup.string().required(i18n.global.t("fieldRequired"))
        }
      }),
      gender: yup.string().when("conditionId", (conditionId: string) => {
        if (conditionId === "9") {
          return yup.string().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
      country: yup.string().when("conditionId", (conditionId: string) => {
        if (conditionId === "10") {
          return yup.string().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
      city: yup.string().when("conditionId", (conditionId: string) => {
        if (conditionId === "11") {
          return yup.string().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
      area: yup.string().when("conditionId", (conditionId: string) => {
        if (conditionId === "12") {
          return yup.string().required(i18n.global.t("fieldRequired"));
        } else {
          return yup.string();
        }
      }),
      value: yup
        .string()
        .when("conditionId", (conditionId: string) => {
          if (
            conditionId === "7" ||
            conditionId === "10" ||
            conditionId === "11" ||
            conditionId === "12" ||
            conditionId === "8" ||
            conditionId === "9"
          ) {
            return yup.string();
          } else {
            console.log("else conditionId : ", conditionId);
            return yup.string().when("operationTypeId", (operationTypeId: string) => {
          if (operationTypeId === "6") {
            return yup.string();
          } else {
            return yup.string().required(i18n.global.t("fieldRequired"));
          }
        })
          }
        })
        ,
      maxValue: yup
        .string()
        .when("operationTypeId", (operationTypeId: string) => {
          if (operationTypeId === "6") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return yup.string();
          }
        }),
    });

    const onSubmit = () => {
      loading.value = true;
      store
        .dispatch(Actions.UPDATE_CLIENT_GROUP, formData.value)
        .then((res) => {
          emit("fetchData");
          hideModal(updateClientGroupModalRef.value);
          loading.value = false;
        });
    };

    return {
      updateClientGroupModalRef,
      isSubmitAllValid,
      screenDimensions,
      toggleConfirmationDialog,
      toggleAddGroupItemDialog,
      toggleAddNewGroupItemDialog,
      setClickedCondition,
      clickedCondition,
      schemaClintCondotion,
      targetRemovedDetails,
      itemInstance,
      groupItemDialog,
      confirmationDialog,
      removeClientCondition,
      loading,
      country,
      city,

      formData,
      addnewItem,
      removeItem,
      getCities,
      getArea,
      icons,
      onSubmit,
      copmerisonType,
      fetchData,
      conditionsOperator,

      clientCondition,
      countries,
      gender,
      cities,
      area,
    };
  },
});
</script>
