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
                  <label class="required fs-5 fw-bold mb-2">Name</label>
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
                      <input
                        type="color"
                        class="border-0 rounded w-25"
                        v-bind="field"
                      />
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
                      <input
                        type="color"
                        class="border-0 rounded w-25"
                        v-bind="field"
                      />
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
             
               <div class=" card fw-bolder fs-3  mb-7">
                   Clients Condition
               
              <Form @submit="addnewItem" :validation-schema="schema">
                <fieldset
                  v-for="(condition, idx) in formData.conditions"
                  :key="condition.id"
                >
                  <!-- <label :for="`email_${idx}`">Email</label>
                  <Field
                    :id="`email_${idx}`"
                    :name="`conditions[${idx}].email`"
                    type="email"
                  />
                  <ErrorMessage :name="`conditions[${idx}].email`" as="p" />
                -->
<div class="row">
                  <div class="col-6 my-3">
                    <label
                      class="required fs-5 fw-bold mb-2 d-inline"
                      :for="`Condition_${idx}`"
                    >
                      Clients Condition</label
                    >

                    <Field
                      :id="`Condition_${idx}`"
                      :name="`conditions[${idx}].condition`"
                         v-slot="{ field, value }"
                    >
                      <el-select
                          value-key="id"
                        class="w-100 form-control-solid border-0"
                        v-model="condition.condition"
                      >
                        <el-option
                          v-for="item in clientCondition"
                          :key="item.id"
                          :label="item.name"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </Field>
                    <ErrorMessage
                     class="text-danger"
                      :name="`conditions[${idx}].condition`"
                    ></ErrorMessage>
                  </div>
                   <div
                    class="col-6 my-3"
                    v-if="
                      condition.condition != '9' &&
                      condition.condition != '10' &&
                      condition.condition != '11' &&
                      condition.condition != '12'
                    "
                  >
                    <label class="required fs-5 fw-bold mb-2 d-inline">
                      Condition</label
                    >
                    
                    <Field
                      :name="`conditions[${idx}].operationType`"
                      type="text"
                      v-slot="{ field, value }"
                    >
                      <el-select
                        v-bind="field"
                          value-key="id"
                      class="w-100 form-control-solid border-0"
                      v-model="condition.operationType"
                      >
                        <el-option
                          v-for="item in copmerisonType"
                          :key="item.id"
                          :label="item.name"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </Field>
                    <ErrorMessage
                      class="text-danger"
                      :name="`conditions[${idx}].operationType`"
                    ></ErrorMessage>
                  </div>
                  <div class="row mb-7" v-if="condition.operationType.id == '6'">
                    <!--begin::Label-->
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2"
                        >Min Value</label
                      >
                      <div class="position-relative w-auto h-auto">
                        <Field
                          :name="`conditions[${idx}].minValue`"
                          type="text"
                          v-slot="{ field, meta }"
                          v-model="condition.minValue"
                        >
                          <input
                            v-bind="field"
                            class="form-control form-control-solid form-control-lg"
                          />
                        </Field>
                      </div>

                      <ErrorMessage
                        class="text-danger"
                        :name="`conditions[${idx}].minValue`"
                      ></ErrorMessage>
                    </div>
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2"
                        >Max Value</label
                      >
                      <div class="position-relative w-auto h-auto">
                        <Field
                          :name="`conditions[${idx}].maxValue`"
                          type="text"
                          v-slot="{ field, meta }"
                          v-model="condition.maxValue"
                        >
                          <input
                            v-bind="field"
                            class="form-control form-control-solid form-control-lg"
                          />
                        </Field>
                      </div>

                      <ErrorMessage
                        class="text-danger"
                        :name="`conditions[${idx}].maxValue`"
                      ></ErrorMessage>
                    </div>
                    <!--end::Input-->
                  </div>

                  <div class="col-6 mb-7" v-if="condition.condition.id == '8'">
                    <!--begin::date-->

                    <div class="col-12 my-3">
                      <label
                        class="required fs-5 fw-bold mb-2 d-inline"
                        :for="`value${idx}`"
                      >
                        Date</label
                      >
                      <!--begin::Input-->
                      <Field
                        :id="`value${idx}`"
                        :name="`conditions[${idx}].value`"
                        v-slot="{ field, value }"
                      >
                        <el-date-picker
                          v-bind="field"
                          :mode-value="value"
                          v-model="condition.value"
                          placeholder="Select a date"
                          name="dueDate"
                        />
                      </Field>
                      <ErrorMessage
                        :name="`conditions[${idx}].value`"
                      ></ErrorMessage>
                    </div>

                    <!--end::Input-->
                  </div>
                  <div
                    class="col-12 my-3"
                    v-else-if="condition.condition.id == '9'"
                  >
                    <label
                      class="required fs-5 fw-bold mb-2 d-inline"
                      :for="`gender${idx}`"
                    >
                      Gender</label
                    >
                    <Field
                      :id="`gender${idx}`"
                      :name="`conditions[${idx}].value`"
                      type="text"
                       v-model="condition.value"
                    >
                    {{condition.value}}
                      <el-select
                       
                        class="w-100 form-control-solid border-0"
                        v-model="condition.value"
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
                      :name="`conditions[${idx}].value`"
                    ></ErrorMessage>
                  </div>
                  <div 
                    class="col-6 my-3"
                    v-else-if="condition.condition.id == '10'"
                  >
                    <label
                      class="required fs-5 fw-bold mb-2 d-inline"
                      :for="`country${idx}`"
                    >
                      Country</label
                    >
                    <Field
                      :id="`country${idx}`"
                      :name="`conditions[${idx}].value`"
                      type="text"
                      v-slot="{ field, value }"
                    >
                      <el-select
                        v-bind="field"
                        :mode-value="value"
                        class="w-100 form-control-solid border-0"
                        v-model="condition.value"
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
                      :name="`conditions[${idx}].value`"
                    ></ErrorMessage>
                  </div>
                  <div
                    class="col-6 my-3"
                    v-else-if="condition.condition == '11'"
                  >
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        Country</label
                      >
                      <Field
                        name="country"
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
                        name="country"
                      ></ErrorMessage>
                    </div>
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        City</label
                      >
                      <Field
                        :name="`conditions[${idx}].value`"
                        type="text"
                        v-slot="{ field, value }"
                      >
                        <el-select
                          v-bind="field"
                          :mode-value="value"
                          class="w-100 form-control-solid border-0"
                          v-model="condition.value"
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
                        :name="`conditions[${idx}].value`"
                      ></ErrorMessage>
                    </div>
                  </div>
                  <div
                    class="row my-3"
                    v-else-if="condition.condition == '12'"
                  >
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        Country</label
                      >
                      <Field
                        name="country"
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
                        name="country"
                      ></ErrorMessage>
                    </div>
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        City</label
                      >
                      <Field name="city" type="text" v-slot="{ field, value }">
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
                        name="city"
                      ></ErrorMessage>
                    </div>
                    <div class="col-6 my-3">
                      <label class="required fs-5 fw-bold mb-2 d-inline">
                        Area</label
                      >
                      <Field
                        :name="`conditions[${idx}].value`"
                        type="text"
                        v-slot="{ field, value }"
                      >
                        <el-select
                          v-bind="field"
                          :mode-value="value"
                          class="w-100 form-control-solid border-0"
                          v-model="condition.value"
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
                        :name="`conditions[${idx}].value`"
                      ></ErrorMessage>
                    </div>
                  </div>
                  <div class="col-6 mb-7"  v-else>
                    <!--begin::Label-->
                    <label class="required fs-6 fw-bold mb-2">value</label>
                    <!--end::Label-->

                    <!--begin::Input-->
                    <div class="position-relative w-auto h-auto">
                      <Field
                        :name="`conditions[${idx}].value`"
                        type="text"
                        v-slot="{ field, meta }"
                        v-model="condition.value"
                      >
                        <input
                          v-bind="field"
                          class="form-control form-control-solid form-control-lg"
                        />
                      </Field>
                    </div>

                    <ErrorMessage
                      class="text-danger"
                      :name="`conditions[${idx}].value`"
                    ></ErrorMessage>
                  </div>
                  </div>
                 
                  <div class="fv-row mb-10" v-if="idx != 0">
                    <button
                      type="button"
                      class="btn btn-lg btn-secondary"
                      @click="removeItem(idx)"
                    >
                      Remove
                    </button>
                  </div>
                </fieldset>

                <button
                  type="submit"
                  class="btn btn-lg btn-primary add-another-item"
                >
                  Add Conditions
                </button>
              </Form>

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
import { defineComponent, computed, ref, reactive } from "vue";
import { hideModal } from "@/core/helpers/dom";
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
        value: "",
        minValue: "",
        maxValue: "",
        operationType: {
          id: "1",
          name: "Equal",
        },
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

    const removeItem = (index) => {
      formData.value.conditions.splice(index, 1);
      console.log(formData);
    };
    const addnewItem = (i) => {
      formData.value.conditions.push({
        condition: "",
        value: "",
        minValue: "",
        maxValue: "",
        operationType: {
          id: "1",
          name: "Equal",
        },
      });
    };
    const getCities = (id) => {
      store.dispatch(Actions.GET_CITY_BY_COUNTRYID, id);
    };

    const getArea = (id) => {
      store.dispatch(Actions.GET_AREA_BY_CITYID, id);
    };
    const fetchData = (id) => {
      store.dispatch(Actions.GET_CLIENT_GROUP_BY_ID, id).then((res) => {
        formData.value = res;

        // formData.value.conditionsOperatorId = res.conditionsOperator;
        console.log("Res", res);
        console.log("formData.value", formData.value);
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
        operationType:yup.string().default('1'),
        value: yup.string().required().label("Value"),
        minValue: yup.string().when("operationType", (operationType) => {
          console.log("value business : ", operationType);
          if (operationType === "6") {
            return yup.string().required("Min Value required");
          } else {
            return yup.string();
          }
        }),
        maxValue: yup.string().when("operationType", (operationType) => {
          console.log("value business : ", operationType);
          if (operationType === "6") {
            return yup.string().required("Max Value required");
          } else {
            return yup.string();
          }
        }),
      })
    )
    .strict(),
});


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
