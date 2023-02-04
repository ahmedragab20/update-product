<template>
  <div>
    <div
      v-if="props.languages && props.languages.length > 0"
      class="card-body py-0"
    >
      <section>
        <tabs-duplicator
          :items="languages"
          @selectedItem="setSelectedLang"
          div-id="49a39ded-c2e9-41b6-a5af-882c8d46b9fe"
          body-classes="p-4 px-5 bg-natural-1"
          tab-btn-classes="py-4 px-5"
          active-tab-design="bg-natural-1"
        >
          <template #label="{ item }">
            <span class="d-flex gap-2">
              <div class="hw-16px">
                <img :src="item.icon" alt="" width="14" class="img-contain" />
              </div>
              {{ item.label }}
            </span>
          </template>
        </tabs-duplicator>
        <div id="49a39ded-c2e9-41b6-a5af-882c8d46b9fe">
          <!-- fields -->
          <template v-if="selectedLang && selectedLang.id">
            <!-- product name -->
            <div class="mt-5">
              <label
                :for="`product-label-${selectedLang.id}`"
                class="form-label required"
              >
                Product Name
              </label>
              <MazInput
                :id="`product-label-${selectedLang.id}`"
                v-model="resourcesFields[selectedLang.id]['name']"
                @input="resourcesChanged = true"
              />
            </div>
            <!-- product long description -->
            <div class="mt-5">
              <label
                :for="`long-description-${selectedLang.id}`"
                class="form-label required"
              >
                Long Description
              </label>
              <MazTextarea
                :id="`long-description-${selectedLang.id}`"
                v-model="resourcesFields[selectedLang.id]['longDescription']"
                @input="resourcesChanged = true"
              />
            </div>
            <!-- product short description -->
            <div class="mt-5">
              <label
                :for="`short-description-${selectedLang.id}`"
                class="form-label required"
              >
                Short Description
              </label>
              <MazTextarea
                :id="`short-description-${selectedLang.id}`"
                v-model="resourcesFields[selectedLang.id]['shortDescription']"
                @input="resourcesChanged = true"
              />
            </div>
            <!-- purchase note -->
            <div class="mt-5">
              <label
                :for="`purchase-note-${selectedLang.id}`"
                class="form-label"
              >
                Purchase Note
              </label>
              <MazTextarea
                :id="`purchase-note-${selectedLang.id}`"
                v-model="resourcesFields[selectedLang.id]['purchaseNote']"
                @input="resourcesChanged = true"
              />
            </div>
          </template>

          <!-- Api handlers -->
          <div v-if="responseErrorMessage" class="my-4">
            <span class="fw-bold text-danger">
              <i class="bi bi-cone text-danger"></i>
              {{ responseErrorMessage }}
            </span>
          </div>
          <div class="my-4">
            <SaveChangeBtn
              :btn-reverse-submit="reverseResourceChanges"
              :btnSubmit="saveResourcesChanges"
              :elChanged="resourcesChanged"
              :elLoading="resourcesLoading"
            />
          </div>
        </div>
      </section>
    </div>
    <div v-else class="p-5 d-flex justify-content-center align-items-center">
      <img src="@/assets/content-loading.gif" width="300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MazInput from "maz-ui/components/MazInput";
import MazTextarea from "maz-ui/components/MazTextarea";

import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";

import Api from "@/utils/ApiHelper";
import { ref, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";

import { Language, Product } from "@/types";

const store = useStore();

interface Props {
  languages: Language[];
  product: Product;
}

const props = defineProps<Props>();

const updateProduct = computed(() => store.state.UpdateProduct);

const updateChangedSections = ({ sectionId, remove }) => {
  store.commit("ADD_CHANGED_SECTIONS", {
    sectionId,
    remove,
  });
};
const initializeComponentsData = ({ name, content }) => {
  store.commit("INITIALIZE_DATA", {
    name,
    content,
  });
};

const productResources = ref([]);
const resourcesFields = ref({});

const initResourceFields = (languages: Language[], content: any[]) => {
  if (!content && languages && languages.length > 0) {
    languages?.forEach((lng: Language) => {
      resourcesFields.value[lng.id] = {
        name: "",
        longDescription: "",
        shortDescription: "",
        purchaseNote: "",
      };
    });

    return;
  }

  content?.forEach((cnt) => {
    resourcesFields.value[cnt.languageId] = {
      name: cnt.name,
      longDescription: cnt.longDescription,
      shortDescription: cnt.shortDescription,
      purchaseNote: cnt.purchaseNote,
    };
  });
};

const selectedLang = ref();
const resourcesChanged = ref<any>(false);
const resourcesLoading = ref(false);

const setSelectedLang = (payload: any): void => {
  selectedLang.value = payload;
};

const responseErrorMessage = ref<string>("");

const generateResources = () => {
  const resources: any[] = [];

  props.languages?.forEach((lng: Language) => {
    resources.push({
      languageId: lng.id,
      ...resourcesFields.value[lng.id],
    });
  });

  return resources;
};

const saveResourcesChanges = async () => {
  resourcesLoading.value = true;

  const payload = {
    id: props.product.id,
    resources: generateResources(),
  };
  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-resources",
    payload,
  };
  try {
    const { data }: any = await Api(reqData);

    if (!data.succeeded) responseErrorMessage.value = data.message;
    else {
      resourcesChanged.value = "done";
      productResources.value = payload.resources;
      initializeComponentsData({
        name: "resources",
        content: payload.resources,
      });
      responseErrorMessage.value = "";
    }
  } catch (error) {
    console.error(error);
  } finally {
    resourcesLoading.value = false;
  }
};

const reverseResourceChanges = () => {
  initResourceFields(props.languages, updateProduct.value.resources);
  resourcesChanged.value = false;
  responseErrorMessage.value = "";
};

watch(
  () => props.languages,
  (newV) => {
    if (newV && newV.length > 0) {
      setSelectedLang(newV[0]);
    }
  }
);

watch(
  () => props.product,
  (newValue) => {
    if (newValue && newValue.resources) {
      initResourceFields(props.languages, newValue.resources);

      initializeComponentsData({
        name: "resources",
        content: props.product?.resources,
      });
    }
  }
);

watch(
  () => resourcesChanged.value,
  (newV, oldValue) => {
    if ((newV && !oldValue) || (newV && oldValue === "done")) {
      updateChangedSections({
        sectionId: "resources",
        remove: false,
      });
    } else {
      updateChangedSections({
        sectionId: "resources",
        remove: true,
      });
    }
  }
);

onMounted(() => {
  if (props.languages && props.languages.length > 0) {
    setSelectedLang(props.languages[0]);
  }
  if (props.product && props.product.resources) {
    initializeComponentsData({
      name: "resources",
      content: props.product.resources,
    });
    productResources.value = props.product.resources;
    initResourceFields(props.languages, props.product.resources);
  }
});
</script>
