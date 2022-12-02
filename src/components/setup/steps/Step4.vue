<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-15">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">{{ $t("marketIdentity") }}</h2>
      <!--end::Title-->

      <!--begin::Notice-->
      <div class="text-gray-400 fw-bold fs-6">
        If you need more info, please check out
        <a href="#" class="text-primary fw-bolder">Help Page</a>.
      </div>
      <!--end::Notice-->
    </div>
    <!--end::Heading-->
    <div class="w-100">
      <!--begin::Input group-->
      <div class="row mb-6">
        <!--begin::Label-->
        <label class="col-lg-4 col-form-label fw-bold fs-6">{{
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
              style="background-image: url(media/avatars/blank.png)"
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
                  name="logo"
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
        <label class="col-form-label fw-bold fs-6">
          {{ $t("pleaseEnterMarketAllLangs") }}
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
              v-for="(field, $index) in currentLangs"
              :key="$index"
            >
              <keep-alive>
                <div
                  class="my-10"
                  v-if="selectedItem && field.id === selectedItem.id"
                >
                  <label class="form-label required mb-3">{{
                    $t("name")
                  }}</label>
                  <input
                    class="form-control form-control-lg form-control-solid mb-3"
                    @blur="addResource"
                    v-model="product[`name-${selectedItem.id}`]"
                  />
                  <div
                    class="mb-2 fv-plugins-message-container invalid-feedback"
                    v-if="!product[`name-${selectedItem.id}`]"
                  >
                    {{ $t("fieldRequired") }}
                  </div>

                  <label class="form-label required mb-3">{{
                    $t("description")
                  }}</label>
                  <textarea
                    class="form-control form-control-lg form-control-solid"
                    @blur="addResource"
                    v-model="product[`description-${selectedItem.id}`]"
                  />
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

<script lang="ts">
  import { ErrorMessage, Field } from "vee-validate";
  import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
  import store from "@/store";
  import Editor from "@/components/Reusable/Editor.vue";
  import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
  import { Actions } from "@/store/enums/StoreEnums";

  interface Lang {
    id?: number;
    code?: string;
    dir?: string;
    label?: string;
    icon?: string;
  }

  export default defineComponent({
    name: "step-4",
    components: {
      ErrorMessage,
      Field,
      Editor,
      TabsDuplicator,
    },
    setup() {
      let selectedItem = ref({});
      const product = ref([]);
      const logo = ref<string>("media/avatars/blank.png");
      const logoKey = ref<string>("");

      const currentLangs = computed(() => {
        let langs = JSON.parse(
          JSON.stringify(store.state.SetupModule.currentSetupLangs)
        );

        if (langs.length > 0) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          selectedItem.value = langs[0];
        }

        return langs;
      });

      const addResource = (): void => {
        const mySet1 = new Set();
        Object.keys(product.value).forEach((e) => {
          const id = e.split("-")[1];
          mySet1.add(id);
        });
        const arr = [{}];
        mySet1.forEach((s) => {
          const obj = {};
          Object.keys(product.value).forEach((n) => {
            if (n.split("-")[1] === s) {
              obj["languageId"] = s;
              obj[n.split("-")[0]] = product.value[n];
            }
          });
          arr.push(obj);
        });
        let resources = arr.filter((value) => Object.keys(value).length !== 0);
        store.dispatch(Actions.SET_SETUP_RESOURCES, resources);
      };

      const setSelectedItem = (payload: any) => {
        selectedItem.value = payload;
      };

      const handleFileUpload = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target?.files;
        if (files && files?.length > 0) {
          const subdomain = store.state.SetupModule.initSetupData.subdomain;
          const file: File = files[0];
          const reader = new FileReader();

          reader.onload = function (e) {
            const target: any = e.target;
            const data = target.result;
            logo.value = data;
          };

          reader.readAsDataURL(file);
          let formData = new FormData();
          formData.append("file", file);
          formData.append("subdomain", subdomain);
          store.dispatch(Actions.ADD_SETUP_LOGO, formData);
        }
      };

      const removeImage = () => {
        logo.value = "media/avatars/blank.png";
      };
      return {
        logo,
        handleFileUpload,
        removeImage,
        currentLangs,
        logoKey,
        selectedItem,
        setSelectedItem,
        product,
        addResource,
      };
    },
  });
</script>
