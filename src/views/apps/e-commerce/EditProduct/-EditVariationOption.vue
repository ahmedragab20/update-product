<template>
  <div v-if="item">
    <div class="d-flex justify-content-between align-items-center gap-2 mb-3">
      <h2 class="w-75 text-truncate">
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
            class="border border-dashed border-natural-5 overflow-hidden h-114px w-100 rounded-3 cursor-pointer position-relative"
          >
            <template v-if="item.image">
              <div
                v-if="!item.image"
                class="d-flex justify-content-center align-items-center flex-column h-100"
              >
                <div>
                  <img src="/icons/image.svg" alt="" width="24" />
                </div>
                <div>Upload image</div>
              </div>
              <div v-else class="h-100 position-relative">
                <div
                  v-if="uploading"
                  class="img-loader position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center rounded overflow-hidden"
                >
                  <span
                    class="spinner-border spinner-grow text-secondary"
                  ></span>
                </div>
                <div class="w-100 h-100">
                  <img
                    :src="imgURL || optionImage(item)"
                    alt=""
                    class="img-contain"
                    @click="$refs.fileUpload.click()"
                  />
                  <button
                    v-if="!uploading"
                    type="button"
                    class="position-absolute top-0 end-0 bg-natural-4 shadow bg-white cursor-pointer rounded py-1 px-3"
                    @click="setClickedImage(imgURL || item.image)"
                  >
                    <i class="bi bi-arrows-angle-expand text-black"></i>
                  </button>
                </div>
                <input
                  :disabled="uploading"
                  ref="fileUpload"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  type="file"
                  @change="uploaderHandler($event)"
                />
              </div>
              <ImageViewer
                v-model:value="viewImage"
                :handler="imageViewerToggle"
              >
                <img :src="optionImage(item)" class="image-viewer" />
              </ImageViewer>
            </template>
            <template v-else>
              <div
                @click="editColorDialog = true"
                class="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                :style="`background-color: ${!!colorHex ? colorHex : '#eee'}`"
              >
                <div
                  class="position-absolute top-0 start-0 w-100 h-100 faded-white-bg blur d-flex justify-content-center align-items-center show-on-hover transition-03s"
                >
                  <i class="bi bi-pencil-square h4 text-white"></i>
                </div>
              </div>
              <Modal
                v-model:modal-value="editColorDialog"
                box-width-class=""
                :close="() => (editColorDialog = false)"
              >
                <div class="d-flex gap-3 flex-nowrap overflow-auto w-100">
                  <div>
                    <Sketch v-model="colorPickerValue" />
                  </div>
                </div>
                <MazBtn class="mt-5" block size="sm" @click="saveColor">
                  Done
                </MazBtn>
              </Modal>
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
                div-id="5912569e-9f20-11ed-a8fc-0242ac120002"
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
              <div id="5912569e-9f20-11ed-a8fc-0242ac120002">
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
                  <MazIcon name="pencil-alt" size="1.1rem" />
                  Edit Option
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
  <div
    v-else
    class="d-flex justify-content-center align-items-center flex-column gap-3"
  >
    <div class="d-flex justify-content-center align-items-center flex-column">
      <span class="spinner-border spinner-grow"></span>
      <p>loading the option....</p>
    </div>
    <div>
      <strong class="text-muted">
        If that took a long time, then please try again later
      </strong>
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

const props = defineProps({
  title: String,
  close: Function,
  submit: Function,
  resourcesTitle: String,
  pricesTitle: String,
  item: Object,
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

  await upload(e)
    .then((res) => {
      imageKey.value = res?.data?.data;
      console.log(res);
    })
    .finally(() => {
      uploading.value = false;
    });
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
    connectionId: props.item["connectionId"] || 0,
    resources: finalResources,
    prices: finalPrices,
    image: imageKey.value || "",
    colorHexa: colorHex.value || "",
    imgURL: imgURL.value || props.item.image || undefined,
  });
};

const initComponent = () => {
  if (props.type === "edit") {
    props.item?.resources?.forEach((resource) => {
      resources.value[resource.languageId] = resource.label;
    });

    colorHex.value = props.item?.colorHexa;
    colorPickerValue.value = props.item?.colorHexa;
  }
};

onMounted(() => {
  if (languages.value && languages.value.length > 0) {
    setSelectedLanguage(languages.value[0]);
  }
  if (currencies.value && currencies.value.length > 0) {
    setSelectedCurrency(currencies.value[0]);
  }
  if (props.item && props.item.connectionId) {
    initComponent();
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
