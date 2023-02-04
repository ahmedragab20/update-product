<template>
  <div>
    <div class="d-flex justify-content-between align-items-center gap-2 mb-3">
      <h2 class="w-75 text-truncate font-24px">
        {{ title }}
      </h2>
      <button
        type="button"
        class="rounded-2 px-4 py-2 bg-natural-4 text-black d-flex justify-content-center align-items-center"
        @click="close ? close() : ''"
      >
        <MazIcon name="x" />
      </button>
    </div>
    <!-- Body -->
    <div class="my-3">
      <div class="row">
        <div class="col-md-3 col-sm-4 mb-3">
          <div
            class="position-relative border border-dashed border-natural-5 overflow-hidden h-114px w-100 rounded-3 cursor-pointer"
          >
            <template v-if="type === 'image'">
              <div
                @click="$refs.fileUpload.click()"
                class="d-flex justify-content-center align-items-center flex-column h-100 w-100"
                :style="`cursor: ${uploading ? 'not-allowed' : 'pointer'}`"
              >
                <template v-if="!imgURL">
                  <div>
                    <div class="d-flex justify-content-center">
                      <MazIcon name="photograph" />
                    </div>
                    <div>Upload image</div>
                  </div>
                </template>
                <template v-else>
                  <div class="h-100 w-100">
                    <!--                    <div-->
                    <!--                      v-if="uploading"-->
                    <!--                      class="position-absolute top-0 start-0 w-100 h-100 img-loader d-flex justify-content-center align-items-center"-->
                    <!--                    >-->
                    <!--                      <span class="spinner-border spinner-border-sm"></span>-->
                    <!--                    </div>-->
                    <img :src="imgURL" alt="" class="img-contain" />
                  </div>
                </template>
                <input
                  :disabled="uploading"
                  ref="fileUpload"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  type="file"
                  @change="uploaderHandler($event)"
                />
              </div>
            </template>
          </div>
        </div>
        <div class="col-md-9 col-sm-8">
          <div class="d-flex flex-column gap-4">
            <div>
              <tabs-duplicator
                :items="languages"
                div-id="4b4fc18f-8a4c-4189-b8b2-77c12e98db49"
                body-classes="px-5 pt-3 pb-4 bg-natural-1"
                tab-btn-classes="px-5 pt-2 pb-1"
                active-tab-design="bg-natural-1"
                color="natural-4"
                @selectedItem="setSelectedLanguage"
                :white-spaces="false"
              >
                <template #label="{ item }">
                  <div class="d-flex gap-2">
                    <div>
                      <img :src="item.icon" alt="" width="14" />
                    </div>
                    <p v-text="item.label" />
                  </div>
                </template>
              </tabs-duplicator>
              <div id="4b4fc18f-8a4c-4189-b8b2-77c12e98db49">
                <div v-if="language">
                  <label
                    for="resources-input"
                    class="form-label required"
                    v-text="resourcesTitle"
                  />
                  <maz-input
                    id="resources-input"
                    v-model="resources[language.id]"
                    :label="resourcesTitle"
                  />
                </div>
              </div>
            </div>
            <div>
              <tabs-duplicator
                :items="currencies"
                div-id="5912569e-9f20-11ed-a8fc-0242ac2"
                body-classes="px-5 pt-3 pb-4 bg-natural-1"
                tab-btn-classes="px-5 pt-2 pb-1"
                active-tab-design="bg-natural-1"
                color="natural-4"
                @selectedItem="setSelectedCurrency"
                :white-spaces="false"
              >
                <template #label="{ item }">
                  <div class="d-flex gap-2">
                    <div>
                      <img :src="item.icon" alt="" width="14" />
                    </div>
                    <p v-text="item.label" />
                  </div>
                </template>
              </tabs-duplicator>
              <div id="5912569e-9f20-11ed-a8fc-0242ac2">
                <div v-if="currency">
                  <label
                    for="prices-input"
                    class="form-label required"
                    v-text="pricesTitle"
                  />
                  <MazInputPrice
                    id="prices-input"
                    v-model="prices[currency.id]"
                    :currency="currency.code"
                    locale="en-US"
                    no-icon
                    @formatted="formattedPrice = $event"
                  />
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center flex-wrap gap-3">
              <MazBtn
                class="px-5 py-3"
                color="primary"
                size="xs"
                :loading="loading"
                :disabled="valid"
                @click="saveChanges"
              >
                <div
                  class="d-flex justify-content-center align-items-center gap-2"
                >
                  <MazIcon name="plus" size="1.1rem" />
                  Add option
                </div>
              </MazBtn>
              <MazBtn @click="close ? close() : ''" color="transparent">
                Cancel
              </MazBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MazInput from "maz-ui/components/MazInput";
import MazInputPrice from "maz-ui/components/MazInputPrice";
import MazBtn from "maz-ui/components/MazBtn";
import MazIcon from "maz-ui/components/MazIcon";

import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import ImageViewer from "@/components/Reusable/ImageViewer.vue";
import { computed } from "@vue/runtime-core";
import { Currency, Language } from "@/types";

import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { upload } from "@/composables/uploader";
import Modal from "@/components/Reusable/Modal.vue";
import { uuid } from "vue-uuid";

const props = defineProps({
  title: String,
  close: Function,
  submit: Function,
  resourcesTitle: String,
  pricesTitle: String,
  valid: Boolean,
  loading: Boolean,
  type: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["variation-option-data"]);

const store = useStore();

// language
const languages = computed(() => {
  const allLanguages = store.state.LookupQueries?.languages?.data;
  const marketLanguages = store.state.MarketModule?.market?.languages;

  return allLanguages?.filter((lang: Language) =>
    marketLanguages?.find((marketLangId: string) => marketLangId === lang.id)
  );
});

const language = ref();

const setSelectedLanguage = (lng: Language) => {
  language.value = lng;
};
const resources = ref({});

// extra price
const currencies = computed(() => {
  const allCurrencies = store.state.LookupQueries.currencies?.data;
  const marketCurrencies = store.state.MarketModule.market?.currencies;

  return allCurrencies?.filter((currency) =>
    marketCurrencies?.find(
      (marketCurrencyId) => marketCurrencyId === currency.id
    )
  );
});

const currency = ref<Currency>();

const setSelectedCurrency = (payload: Currency) => {
  currency.value = payload;
};
const formattedPrice = ref();
const prices = ref({});
watch(formattedPrice, (newV, oldV) => {
  console.log({ newV, oldV });
});
// color
const editColorDialog = ref(false);
const colorPickerValue = ref<any>("#7ED321");
const colorHex = ref("");
const saveColor = () => {
  colorHex.value = colorPickerValue.value?.hex;
  editColorDialog.value = false;
};
// image
const optionImage = (option) => {
  const baseURL = "https://mfproductimages.s3.amazonaws.com/";
  return option.image?.includes("http")
    ? option.image
    : `${baseURL}${option.image}`;
};
const uploading = ref(false);
const imgURL = ref();
const imageKey = ref();
const uploaderHandler = async (e) => {
  uploading.value = true;
  imgURL.value = URL.createObjectURL(e.target.files[0]);

  // only upload on save button!

  // await upload(e)
  //   .then((res) => {
  //     imageKey.value = res?.data?.data;
  //   })
  //   .finally(() => {
  //     uploading.value = false;
  //   });
};

const clickedImage = ref();
const viewImage = ref(false);
const imageViewerToggle = () => {
  viewImage.value = !viewImage.value;
};
const setClickedImage = (path) => {
  clickedImage.value = path;

  imageViewerToggle();
};

const saveChanges = () => {
  const finalResources: any[] = [];
  Object.keys(resources.value)?.forEach((lngId) => {
    finalResources.push({
      languageId: lngId,
      label: resources.value[lngId],
    });
  });
  const finalPrices: any[] = [];
  Object.keys(prices.value)?.forEach((currencyId) => {
    finalPrices.push({
      currencyId: currencyId,
      price: prices.value[currencyId],
    });
  });

  emit("variation-option-data", {
    connectionId: uuid.v4(),
    resources: finalResources,
    prices: finalPrices,
    image: imageKey.value || "",
    colorHexa: colorHex.value || "",
    imgURL: imgURL.value || props.item.image || undefined,
  });
};

const initComponent = () => {
  //
};

onMounted(() => {
  initComponent();
  if (languages.value && languages.value.length > 0) {
    setSelectedLanguage(languages.value[0]);
  }
  if (currencies.value && currencies.value.length > 0) {
    setSelectedCurrency(currencies.value[0]);
  }
});

watch(languages, (newV) => {
  if (newV && newV.length > 0) {
    setSelectedLanguage(newV[0]);
  }
});

watch(currencies, (newV) => {
  if (newV && newV.length > 0) {
    setSelectedCurrency(newV[0]);
  }
});
watch(
  () => props.item,
  (newV) => {
    if (newV && newV.connectionId) {
      initComponent();
    }
  }
);
</script>
