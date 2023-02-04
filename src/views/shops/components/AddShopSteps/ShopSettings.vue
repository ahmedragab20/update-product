<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">{{ $t("shopIdentity") }}</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <!-- <div class="text-gray-400 fw-bold fs-6">
        If you need more info, please check out
        <a href="#" class="text-primary fw-bolder">Help Page</a>.
      </div> -->
      <!--end::Notice-->
    </div>
    <!--end::Heading-->
    <div class="w-100">
      <!--begin::Input group-->
      <div class="row mb-6">
        <!--begin::Label-->
        <label class="col-lg-4 required col-form-label fw-bold fs-6">{{
          $t("logo")
        }}</label>
        <!--end::Label-->

        <!--begin::Col-->

        <div class="col-lg-8">
          <!--begin::Image input-->
          <Field
            type="file"
            v-slot="{ field }"
            class="form-control form-control-lg form-control-solid"
            name="logoKey"
            placeholder=""
            value=""
          >
            <div
              v-bind="field"
              class="image-input image-input-outline"
              data-kt-image-input="true"
              style="background-image: url('@/../public/media/avatars/blank.png')"
            >
              <!--begin::Preview existing logo-->
              <img class="image-input-wrapper w-125px h-125px" :src="logo" />
              <!--end::Preview existing logo-->

              <!--begin::Label-->
              <label
                class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                title="Change logo"
              >
                <i class="bi bi-pencil-fill fs-7" />

                <!--begin::Inputs-->
                <input
                  type="file"
                  name="logoKey"
                  accept=".png, .jpg, .jpeg"
                  @change="handleFileUpload"
                />
                <input type="hidden" name="logo_remove" />
                <!--end::Inputs-->
              </label>
              <!--end::Label-->

              <!--begin::Remove-->
              <span
                class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                data-kt-image-input-action="remove"
                data-bs-toggle="tooltip"
                title="Remove logo"
                @click="removeImage()"
              >
                <i class="bi bi-x fs-2" />
              </span>
              <!--end::Remove-->
            </div>
            <!--end::Image input-->

            <!--begin::Hint-->

            <!--end::Hint-->
          </Field>
          <ErrorMessage
            name="logoKey"
            class="fv-plugins-message-container invalid-feedback"
          />
        </div>
        <!--end::Col-->
      </div>
      
      <!--end::Input group-->
      <div class="mb-6">
        <label class="col-form-label text-gray-400 fw-normal">
          {{ $t("pleaseEnterShopLogo") }}
        </label>
        <editor>
         
          <template #upper>
            <tabs-duplicator
              :items="currentLangs"
              @selectedItem="setSelectedItem"
            >
              <template #label="{ item }">
                {{ item.label }}
              </template>
            </tabs-duplicator>
          </template>
          <template #fields>
            <div
              dir="auto"
              v-for="(item, $index) in resources"
              :key="$index"
            >
              <keep-alive>
                <div
                  class="my-10"
                  v-show="item.languageId == selectedItem.id"
                >
                  <div>
                    <label class="form-label required mb-3">{{
                      $t("name")
                    }}</label>
                    <Field
                      :name="`resources[${$index}].name`"
                      v-model="resources[$index].name"
                      v-slot="{ field, meta }"
                    >
                      <input
                        v-bind="field"
                        type="text"
                        :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }"
                        class="form-control form-control-lg form-control-solid mb-0"
                        @blur="addResource"
                      />
                    </Field>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("pleaseEnterShopName") }}
                    </label>
                    
                  </div>
                  
                  <div class="fv-plugins-message-container">
                              <div class="fv-help-block">
                                <ErrorMessage
                                  :name="`resources[${$index}].name`"
                                  class="text-danger">
                                  <span class="text-danger">
                                    {{ $t("resourcesValidation") }}
                                  </span>
                                </ErrorMessage>
                              </div>
                            </div>


                  <div>
                    <label class="form-label required mb-3">{{
                      $t("description")
                    }}</label>
                    <Field
                      :name="`resources[${$index}].description`"
                      v-model="resources[$index].description"
                      v-slot="{ field, meta }"
                    >
                      <input
                        v-bind="field"
                        type="text"
                        :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }"
                        class="form-control form-control-lg form-control-solid mb-0"
                        @blur="addResource"
                      />
                    </Field>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("pleaseEnterDesc") }}
                    </label>
                    <ErrorMessage
                      :name="`resources[${$index}].description`"
                      class="text-danger d-block"
                    ></ErrorMessage>
                  </div>
                  
                  <div>
                    <label class="form-label required mb-3">{{
                      $t("address")
                    }}</label>
                    <Field
                      :name="`resources[${$index}].address`"
                      v-model="resources[$index].address"
                      v-slot="{ field, meta }"
                    >
                      <input
                        v-bind="field"
                        type="text"
                        :class="{
                          'is-valid': meta.valid,
                          'is-invalid': meta.validated && !meta.valid,
                        }"
                        class="form-control form-control-lg form-control-solid mb-0"
                        @blur="addResource"
                      />
                    </Field>
                    <label class="col-form-label text-gray-400 fw-normal d-block pt-0">
                      {{ $t("pleaseEnterAddress") }}
                    </label>
                    <ErrorMessage
                      :name="`resources[${$index}].address`"
                      class="text-danger d-block"
                    ></ErrorMessage>
                  </div>

                </div>
              </keep-alive>
              <!--  -->
            </div>
          </template>
        </editor>
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts" setup>
import { ErrorMessage, Field } from "vee-validate";
import { computed, watch,ref ,onMounted} from "vue";
import store from "@/store";
import Editor from "@/components/Reusable/Editor.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { Actions,Mutations } from "@/store/enums/StoreEnums";
import api from "@/utils/ApiHelper";
import { upload } from "@/composables/uploader";
interface Lang {
  id?: number;
  code?: string;
  dir?: string;
  label?: string;
  icon?: string;
}
interface resource {
  languageId?: number;
  name?: string;
  description?: string;
  address?: string;
 
}


    let selectedItem = ref({});
    const product = ref([]);
    const logo = ref("/media/avatars/blank.png");
    const logoKey = ref<string>("");
      const langs = computed(() => store.state.LookupQueries.languages?.data);
    const currentLangs = computed(() => {
      let langs =store.getters.getSupportedLanguages;

     

      return langs;
    } );
    const resources =ref<resource[]>([]);
  
const resetData = () => {
  if(langs.value && langs.value.length > 0) {
    selectedItem.value = langs.value[0];
      langs.value.forEach((el :Lang) => {
    resources.value.push({ languageId: el.id, name: "", description: "", address: "" });
  });
}
}

watch(langs, (newValue) => {
  if (newValue) {
    if (newValue && newValue.length > 0) {
    resetData();
    }}
  }
);
onMounted(() => {
  resetData();
});
    const addResource = (): void => {store.commit(Mutations.SET_SHOPS_RESOURCES, resources.value);};

    const setSelectedItem = (payload: any) => {
      selectedItem.value = payload;
    };

    const handleFileUpload = async (event) => {
      logo.value = URL.createObjectURL(event.target.files[0]);
  upload(event).then(res => {
    store.commit(Mutations.SET_SHOPS_LOGO,res.data.data);
  })
    };

    const removeImage = () => {
      logo.value = "media/avatars/blank.png";
    };
    

</script>
