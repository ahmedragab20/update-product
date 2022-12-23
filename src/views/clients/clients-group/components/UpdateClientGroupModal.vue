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
          <h2 class="fw-bolder">Update Client Group</h2>
          <!--end::Modal title-->
          {{ formData }}
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
          :validation-schema="schema"
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

              <!--end::Input group-->

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
                    conditions Operator
                  </label>
                  <Field
                    name="conditionsOperatorId"
                    type="text"
                    v-slot="{ field, value }"
                  >
                    <el-select
                      value-key="id"
                      class="w-100 form-control-solid border-0"
                      v-model="formData.conditionsOperator"
                    >
                      <el-option
                        v-for="item in conditionsOperator"
                        :key="item.id"
                        :label="item.name"
                        :value="item"
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
                      v-slot="{ value, field }"
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
                      <label class="form-label">Client Condition </label>
                      <div>
                        <button
                          @click="toggleAddNewGroupItemDialog"
                          type="button"
                          class="btn btn-sm bg-light-primary text-primary btn-hover-rise rounded-pill"
                        >
                          + Add new Client Condition
                        </button>
                      </div>
                    </div>

                    <table class="table gs-3 gy-3 gx-5">
                      <thead>
                        <tr
                          class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                        >
                          <th class="text-truncate">#</th>
                          <th class="text-truncate">name</th>

                          <th class="text-truncate">Actions</th>
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
                           
                            <div class="td-holder" v-if="!item.condition.id">
                              {{
                                clientCondition?.find(
                                  (x) => x.id == item.condition
                                )?.name
                              }}
                            </div>
                            <div class="td-holder" v-else>
                              {{
                               item.condition?.name
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
                                  setClickedModifier(item),
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
                                @click="removeModifier(item.id)"
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
                    + Add Client Condition
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
                      <Form @submit="addnewItem" :validation-schema="schemaClintCondotion">
                        <div class="row">
                          <div class="col-6 my-3">
                            <label class="required fs-5 fw-bold mb-2 d-inline">
                              {{ $t("clientsCondition") }}</label
                            >
                            {{ itemInstance.condition }}

                            <Field
                              :id="`Condition_`"
                              name="condition"
                              v-slot="{ field, value }"
                            >
                              <el-select
                                v-bind="field"
                                :mode-value="value"
                                class="w-100 form-control-solid border-0"
                                v-model="itemInstance.condition"
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
                              name="condition"
                            ></ErrorMessage>
                          </div>
                          <div
                            class="col-6 my-3"
                            v-if="
                              itemInstance.condition != '9' &&
                              itemInstance.condition != '10' &&
                              itemInstance.condition != '11' &&
                              itemInstance.condition != '12'
                            "
                          >
                            <label class="required fs-5 fw-bold mb-2 d-inline">
                              {{ $t("condition") }}
                            </label>

                            <Field
                            
                              name="operationType"
                              type="text"
                              v-slot="{ field, value }"
                            >
                              <el-select
                              v-bind="field"
                                :mode-value="value"
                                value-key="value"
                                class="w-100 form-control-solid border-0"
                                v-model="itemInstance.operationType"
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
                              name="operationType"
                            ></ErrorMessage>
                          </div>
                          <div
                            class="row mb-7"
                            v-if="itemInstance.operationType == '6'"
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
                              itemInstance?.condition == '8' ||
                              itemInstance?.condition == '7'
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
                            v-else-if="itemInstance.condition == '9'"
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
                            v-if="itemInstance.condition == '10'"
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
                            v-if="itemInstance.condition == '11'"
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
                              >
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="country"
                                  @change="getCities(country)"
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
                            v-else-if="itemInstance.condition == '12'"
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
                              >
                                <el-select
                                  v-bind="field"
                                  :mode-value="value"
                                  class="w-100 form-control-solid border-0"
                                  v-model="country"
                                  @change="getCities(country)"
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
                                  v-model="city"
                                  @change="getArea(city)"
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
                              itemInstance.condition !== '8' &&
                              itemInstance.condition !== '9' &&
                              itemInstance.condition !== '7' &&
                              itemInstance.condition != '10' &&
                              itemInstance.condition !== '11' &&
                              itemInstance.condition !== '12' &&
                              itemInstance.operationType != '6'
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
                            v-if="!clickedModifier"
                            type="submit"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                          >
                            Submit Data
                          </button>
                          <button
                            v-else
                            type="submit"
                            class="btn btn-primary btn-text-white btn-hover-rise shadow-sm"
                          >
                            Edit Data
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
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
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
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { Actions } from "@/store/enums/StoreEnums";
import * as yup from "yup";
import i18n from "@/core/plugins/i18n";
import { useStore } from "vuex";
export default defineComponent({
  name: "update-clientgroup",
  components: {
    Field,
    TabsDuplicator,
    uuid,
    ErrorMessage,

    Form,
  },
  props: {
    id: {
      type: String,
    },
  },
  //                                             Variables and Getters Init
  setup(props) {
    interface screenDimensionsObject {
      availHeight: number;
      availWidth: number;
    }
    interface conditionsType {
      condition: string;
      id?: string;
      value: string;
      minValue: string;
      maxValue: string;
      operationType: string;
    }
    const screenDimensions = (): screenDimensionsObject => {
      const availWidth = window.innerWidth;
      const availHeight = window.innerHeight;

      return { availWidth, availHeight };
    };
    const store = useStore();
    const icons = computed(() => store.getters.getIcons);
    const conditionsOperator = computed(() => store.getters.getConditionType);
    const copmerisonType = computed(() => store.getters.getcopmerisonType);

    const clientCondition = computed(() => store.getters.getclientsCondition);
    const countries = computed(() => store.getters.getCountries);
    const gender = computed(() => store.getters.getGender);
    const cities = computed(() => store.getters.getCities);
    const area = computed(() => store.getters.getAreas);

    console.log("copmerisonType", copmerisonType);
    const formRef = ref<null | HTMLFormElement>(null);
    const updateClientGroupModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const country = ref("");
    const city = ref("");
    const conditions = reactive([
      {
        condition: "",
        id: "",
        value: "",
        countryId: "",
        cityId: "",
        minValue: "",
        maxValue: "",
        operationType: '1'
      },
    ]);
    const formData = ref({
      name: "",
      icon: "",
      textColorHexa: "#2b2b2b",
      backgroundColorHeax: "#ffffff",
      conditionsOperator: "",
      conditions,
    });
    const groupItemDialog = ref(false);
    const confirmationDialog = ref(false);
    const targetRemovedDetails = ref({
      id: null,
      array: "",
    });
    const itemInstance = ref({
      condition: "",
      id: "",
      value: "",
      countryId: "",
      cityId: "",
      minValue: "",
      maxValue: "",
      operationType: '1'
    });
    const toggleConfirmationDialog = (info: { id: any; array: string; }) => {
      targetRemovedDetails.value = info;

      confirmationDialog.value = !confirmationDialog.value;
    };
    const toggleAddGroupItemDialog = () => {
      groupItemDialog.value = !groupItemDialog.value;
    };
    const toggleAddNewGroupItemDialog = () => {
  itemInstance.value = {
    condition: "",
      id: "",
      value: "",
      countryId: "",
      cityId: "",
      minValue: "",
      maxValue: "",
      operationType: '1'
  };
  groupItemDialog.value = !groupItemDialog.value;
};
    const clickedModifier = ref();
    const setClickedModifier = (item: { condition: string; value: string; operationType: string; minValue: string; maxValue: string; }) => {
      clickedModifier.value = item;

      itemInstance.value.condition = item.condition;
      itemInstance.value.value = item.value;
      itemInstance.value.operationType = item.operationType;
      itemInstance.value.minValue = item.minValue;
      itemInstance.value.maxValue = item.maxValue;
    };
    const removeModifier = async (id: string) => {
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

      console.log(clickedModifier);
      if (!clickedModifier.value) {
        console.log("ite", item);
        formData.value.conditions.push({ ...item, id: uuid.v4() });
      } else {
        let targeted = formData.value.conditions.find(
          (el: any) => el.id === clickedModifier.value.id
        );
        targeted.condition = item.condition;
        targeted.value = item.value;
        targeted.minValue = item.minValue;
        targeted.maxValue = item.maxValue;
        targeted.operationType = item.operationType;
      }
      itemInstance.value={
        condition: "",
      id: "",
      value: "",
      countryId: "",
      cityId: "",
      minValue: "",
      maxValue: "",
      operationType: '1'

        }
      toggleAddGroupItemDialog();
      clickedModifier.value = null;
    };
    const getCities = (id: string) => {
      console.log("p-", id);
      store.dispatch(Actions.GET_CITY_BY_COUNTRYID, id);
    };

    const getArea = (id: string) => {
      store.dispatch(Actions.GET_AREA_BY_CITYID, id);
    };
    const fetchData = (id: any) => {
      store.dispatch(Actions.GET_CLIENT_GROUP_BY_ID, id).then((res) => {
        formData.value = res;

        // formData.value.conditionsOperatorId = res.conditionsOperator;
        console.log("Res", res);
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
    const schema = yup.object({
      conditions: yup
        .array()
        .of(
          yup.object().shape({
            condition: yup.object().shape({
              name: yup.string().required(i18n.global.t("fieldRequired")),
              id: yup.string().required(i18n.global.t("fieldRequired")),
            }),
            //  condition: yup.string().required().label("condition"),
            operationType: yup.object().shape({
              name: yup.string(),
              id: yup.string(),
            }),
            // operationType: yup.string().required().label("operationType"),
            minValue: yup.string().when("operationType", (operationType: { id: string; }) => {
              console.log("value business : ", operationType);
              if (operationType.id === "6") {
                return yup.string().required("Min Value required");
              } else {
                return yup.string();
              }
            }),

            maxValue: yup.string().when("operationType", (operationType: { id: string; }) => {
              console.log("operationType ", operationType);
              if (operationType.id === "6") {
                return yup.string().required("Max Value required");
              } else {
                return yup.string();
              }
            }),
            value: yup.string().when("operationType", (operationType: { id: string; }) => {
              console.log("value business : ", operationType);
              if (operationType.id === "6") {
                return yup.string();
              } else {
                return yup.string().required(i18n.global.t("fieldRequired"));
              }
            }),
          })
        )
        .strict(),
    });
const schemaClintCondotion= yup.object().shape({
        condition: yup.string().required(i18n.global.t("fieldRequired")),
        operationType: yup.string().default("1"),
        // value: yup.string().required(i18n.global.t("fieldRequired")),
        minValue: yup.string().when("operationType", (operationType: string) => {
          console.log("value business : ", operationType);
          if (operationType === "6") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return yup.string();
          }
        }),
        date: yup.string().when("condition", (condition: string) => {
          console.log("value business : ", condition);
          if (condition === "8") {
            return yup.date().required(i18n.global.t("fieldRequired"));
          } 
          if (condition === "7") {
            return yup.date().required(i18n.global.t("fieldRequired"));
          } else {
            // return  yup.string().required(i18n.global.t("fieldRequired"))
          }
        }),
        gender: yup.string().when("condition", (condition: string) => {
          
          if (condition === "9") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } 
          else {
            return  yup.string()
          }
        }),
        country: yup.string().when("condition", (condition: string) => {
          console.log("value business : ", condition);
          if (condition === "10") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } 
          else {
            return  yup.string()
          }
        }),
        city: yup.string().when("condition", (condition: string) => {
          console.log("value business : ", condition);
          if (condition === "11") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } 
          else {
            return  yup.string()
          }
        }),
        area: yup.string().when("condition", (condition: string) => {
          
          if (condition === "12") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } 
          else {
            return  yup.string()
          }
        }),
         value: yup.string().when("condition", (condition: string) => {
          
          if (condition === "7" 
          || condition === "10"
          || condition === "11"
          || condition === "12"
          || condition === "8"
          || condition === "9"
          
          
          ) {
            return yup.string()
          } 
          else {
            console.log("else operationType : ", condition);
            return  yup.string().required(i18n.global.t("fieldRequired"))
          }
        }),
        maxValue: yup.string().when("operationType", (operationType: string) => {
          console.log("value operationType : ", operationType);
          if (operationType === "6") {
            return yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return yup.string();
          }
        }),
      })

    const onSubmit = () => {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
        console.log("formData", formData);

        store.dispatch(Actions.UPDATE_CLIENT_GROUP, formData.value).then(() => {
          //   hideModal(updateClientGroupModalRef.value);
        });
      }, 2000);
    };
    return {
      updateClientGroupModalRef,
      screenDimensions,
      toggleConfirmationDialog,
      toggleAddGroupItemDialog,
      toggleAddNewGroupItemDialog,
      setClickedModifier,
      clickedModifier,
      schemaClintCondotion,
      targetRemovedDetails,
      itemInstance,
      groupItemDialog,
      confirmationDialog,
      removeModifier,
      loading,
      country,
      schema,
      city,
      conditions,
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
