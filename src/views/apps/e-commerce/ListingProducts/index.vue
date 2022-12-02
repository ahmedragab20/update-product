<template>
  <div class="my-5">
    <div
      class="card-header py-5 rounded-3 d-flex justify-content-between align-items-center"
    >
      <h4 class="card-title h2">Listing Products</h4>
      <div class="d-flex justify-content-center align-items-center gap-3">
        <AddProduct
          :availableLanguages="availableLanguages"
          :availableCurrencies="availableCurrencies"
        />
        <button
          class="btn p-1"
          v-for="mode in previewModes"
          :key="mode.id"
          @click="selectPreviewMode(mode)"
        >
          <i
            :class="`bi text-primary ${mode.icon}`"
            style="font-size: 1.5rem; transform: rotate(90deg)"
          ></i>
        </button>
      </div>
    </div>
  </div>
  <section v-if="userMarket && userMarket.languages && userMarket.currencies">
    <div v-if="selectedPreviewMode.id === 'grid'" class="row flex-wrap">
      <div
        class="col-sm-6 col-xl-4 col-12 my-3"
        v-for="(product, $index) in products"
        :key="product.id"
      >
        <GridCard
          :index="$index"
          :product="product"
          :uploadImage="onFileSelected"
          :setItemUnderEditId="setItemUnderEditId"
          :itemUnderEditId="itemUnderEditId"
          :imgLoading="uploadMediaLoading"
          :userMarket="userMarket"
          @singleLabelInputValue="singleLabelInputValueHandler"
          @singlePriceInputValue="singlePriceInputValueHandler"
        />
      </div>
    </div>
    <div v-if="selectedPreviewMode.id === 'row'" class="row flex-wrap">
      <div
        class="col-12 col-xl-6 my-3"
        v-for="(product, $index) in products"
        :key="product.id"
      >
        <RowCard
          :index="$index"
          :product="product"
          :uploadImage="onFileSelected"
          :setItemUnderEditId="setItemUnderEditId"
          :itemUnderEditId="itemUnderEditId"
          :imgLoading="uploadMediaLoading"
          :userMarket="userMarket"
          @singleLabelInputValue="singleLabelInputValueHandler"
          @singlePriceInputValue="singlePriceInputValueHandler"
        />
      </div>
    </div>
  </section>
  <div v-else class="text-center">
    <img
      src="@/assets/green-spinner.gif"
      width="100"
      class="mx-auto"
      style="margin-bottom: -15px"
    />
    <h4>loading...</h4>
  </div>
  <BootstrapModal
    target="product-labels-modal"
    headline="Product Labels"
    :hasActions="true"
    btnText="Submit"
    :btnSubmit="submitNewLabels"
    :btnDisabled="
      !getItemUnderEditLanguages ||
      (getItemUnderEditLanguages &&
        newProductLabels &&
        Object.keys(newProductLabels).length < getItemUnderEditLanguages.length)
    "
    :isLoading="false"
    size="modal-md"
  >
    <template #content>
      <div>
        <tabs-duplicator
          :items="getItemUnderEditLanguages"
          @selectedItem="setItemUnderEditTab"
        >
          <template #label="{ item }">
            <span>
              {{ item.label }}
            </span>
          </template>
        </tabs-duplicator>
        <div v-if="selectedItemUnderEditTab" class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            id="product-label"
            :placeholder="`Product Label in ${selectedItemUnderEditTab.label}`"
            v-model="newProductLabels[selectedItemUnderEditTab.id]"
          />
        </div>
      </div>
    </template>
  </BootstrapModal>
  <BootstrapModal
    target="product-prices-modal"
    headline="Product Prices"
    :hasActions="true"
    btnText="Submit"
    :btnSubmit="submitNewPrices"
    :btnDisabled="
      !getItemUnderEditCurrencies ||
      (getItemUnderEditCurrencies &&
        newProductPrices &&
        Object.keys(newProductPrices).length <
          getItemUnderEditCurrencies.length)
    "
    :isLoading="false"
    size="modal-md"
  >
    <template #content>
      <div>
        <tabs-duplicator
          :items="getItemUnderEditCurrencies"
          @selectedItem="setItemUnderEditTab"
        >
          <template #label="{ item }">
            <span>
              {{ item.label }}
            </span>
          </template>
        </tabs-duplicator>
        <div v-if="selectedItemUnderEditTab" class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            id="product-label"
            :placeholder="`Product Price for ${selectedItemUnderEditTab.label} currency`"
            v-model="newProductPrices[selectedItemUnderEditTab.id]"
          />
        </div>
      </div>
    </template>
  </BootstrapModal>
  <BootstrapModal
    target="product-categories-modal"
    headline="Product Categories"
    size="modal-md"
  >
    <template #content>
      <div v-if="getItemUnderEditById" style="height: 180px">
        <multiselect
          v-model="multiselectCategoriesValue"
          :options="getItemUnderEditById.categories"
          :searchable="true"
          :maxHeight="150"
          :taggable="true"
          :loading="false"
          :classes="{
            container:
              'multiselect-tags-lg form-control form-control-lg form-control-solid',
            search: 'multiselect-search form-control form-control-solid',
            clear: 'multiselect-lg-clear',
            tagsSearch:
              'multiselect-tags-search form-control form-control-solid',
          }"
          mode="tags"
        ></multiselect>
      </div>
    </template>
  </BootstrapModal>
</template>
<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import BootstrapModal from "@/components/Reusable/BootstrapModal.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import GridCard from "./-GridCard";
import RowCard from "./-RowCard";
import AddProduct from "./-AddProduct.vue";
import { ref } from "@vue/reactivity";
import Api from "@/utils/ApiHelper";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { watch, watchEffect } from "@vue/runtime-core";

const store = useStore();
// Basics
const userMarket = computed(() => store.state.MarketModule.market);
const availableLanguages = computed(
  () => store.state.LookupQueries.languages?.data
);
const availableCurrencies = computed(
  () => store.state.LookupQueries.currencies?.data
);
const products = ref<any[]>([
  {
    id: 1,
    labels: [
      {
        name: "Black T-Shirt",
        langId: "1",
      },
    ],
    prices: [
      {
        count: 88.78,
        currencyId: "1",
      },
      {
        count: 78.78,
        currencyId: "2",
      },
    ],
    categories: ["one", "two", "three"],
    image: "/images/collection/black-shirt.jpg",
  },
  {
    id: 2,
    labels: [
      {
        name: "Blue T-Shirt",
        langId: "1",
      },
      {
        name: "قميص ازرق",
        langId: "2",
      },
    ],
    prices: [
      {
        count: 8.78,
        currencyId: "1",
      },
    ],
    categories: ["one", "two"],
    image: "/images/collection/blue-shirt.jpg",
  },
  {
    id: 3,
    labels: [
      {
        name: "Dark Blue T-Shirt",
        langId: "1",
      },
      {
        name: "Camiseta Azul Oscuro",
        langId: "2",
      },
    ],
    prices: [
      {
        count: 40.78,
        currencyId: "1",
      },
      {
        count: 6.78,
        currencyId: "2",
      },
    ],
    categories: ["four", "two"],
    image: "/images/collection/dark-blue-shirt.jpg",
  },
  {
    id: 4,
    labels: [
      {
        name: "Pink T-Shirt",
        langId: "1",
      },
    ],
    prices: [
      {
        count: 10.78,
        currencyId: "1",
      },
      {
        count: 8.78,
        currencyId: "2",
      },
      {
        count: 6.78,
        currencyId: "3",
      },
    ],
    categories: ["one", "two", "five"],
    image: "/images/collection/pink-shirt.jpg",
  },
]);
const productsClone = ref<any>(JSON.parse(JSON.stringify(products.value)));
const previewModes = ref([
  {
    id: "grid",
    name: "Grid",
    icon: "bi-grid-3x2",
  },
  {
    id: "row",
    name: "Row",
    icon: "bi-layout-three-columns",
  },
]);
const selectedPreviewMode = ref(previewModes.value[0]);
const selectPreviewMode = (mode) => {
  selectedPreviewMode.value = mode;
};
const itemUnderEditId = ref(null);
const setItemUnderEditId = (id) => {
  itemUnderEditId.value = id;
};
const getItemUnderEditById = computed(() => {
  return products.value.find((item) => item.id === itemUnderEditId.value);
});
const getItemUnderEditLanguages = computed(() => {
  if (getItemUnderEditById.value) {
    const itemLanguages = getItemUnderEditById.value.labels.map(
      (label) => label.langId
    );
    return availableLanguages.value.filter((language) =>
      itemLanguages.includes(language.id)
    );
  }
});
const getItemUnderEditCurrencies = computed(() => {
  if (getItemUnderEditById.value) {
    const itemCurrencies = getItemUnderEditById.value.prices.map(
      (price) => price.currencyId
    );
    return availableCurrencies.value.filter((currency) =>
      itemCurrencies.includes(currency.id)
    );
  }
});
const selectedItemUnderEditTab = ref();
const setItemUnderEditTab = (tab) => {
  selectedItemUnderEditTab.value = tab;
};
const newProductLabels = ref<any>({
  1: "سنتيانتشسيشسي",
  2: "m,sdhjkasndad"
});
const submitNewLabels = () => {
  Object.keys(newProductLabels.value).forEach((newLabelId) => {
    getItemUnderEditById.value?.labels.forEach((label) => {
      if (label.langId === newLabelId) {
        label.name = newProductLabels.value[newLabelId];
      }
    });
  });
  let item = products.value.find(
    (product) => product.id === itemUnderEditId.value
  );

  item = { ...item, labels: getItemUnderEditById.value.labels };
};
const newProductPrices = ref<any>({});
const submitNewPrices = () => {
  Object.keys(newProductPrices.value).forEach((newPriceId) => {
    getItemUnderEditById.value?.prices.forEach((price) => {
      if (price.currencyId === newPriceId) {
        price.count = newProductPrices.value[newPriceId];
      }
    });
  });
  let item = products.value.find(
    (product) => product.id === itemUnderEditId.value
  );

  item = { ...item, prices: getItemUnderEditById.value.prices };
};

// Single item Edit
const singleLabelInputValueHandler = (text) => {
  newProductLabels.value[getItemUnderEditLanguages.value[0].id] = text;
  submitNewLabels();
};
const singlePriceInputValueHandler = (text) => {
  newProductPrices.value[getItemUnderEditCurrencies.value[0].id] = text;
  submitNewPrices();

  console.log(
    "%cNewProductPrice + Products",
    "color: orange; font-size: 1.2rem;",
    newProductPrices.value,
    products.value,
    text
  );
};

/* Categories Multiselect */
const multiselectCategoriesValue = ref<any>();

/* Upload Image */
const photo = ref<File | any>();
const url = ref();
const uploadMediaDone = ref<any>(false);
const uploadMediaLoading = ref<any>(false);
let key = ref<string>("");

const onFileSelected = async (event) => {
  uploadMediaDone.value = false;
  photo.value = event.target.files[0];
  url.value = URL.createObjectURL(photo.value);

  const product = products.value.find(
    (item) => item.id === itemUnderEditId.value
  );
  product.image = url.value;
  await onUpload();
};

const onUpload = async () => {
  try {
    uploadMediaLoading.value = true;
    const fd = new FormData();
    fd.append("file", photo.value);

    const reqData = {
      method: "post",
      url: "/ManageCommands/upload-file",
      payload: fd,
    };

    const response = await Api(reqData);
    if (response?.data?.succeeded) {
      uploadMediaDone.value = true;
      key.value = response?.data.data;
    } else uploadMediaDone.value = "failed";
  } catch (error) {
    console.error(error);
  } finally {
    uploadMediaLoading.value = false;
  }
};

const cancel = () => {
  url.value = null;
};

const saveChanges = () => {
  console.log(
    "%cProducts + Clone: ",
    "color: pink; font-weight: bold; font-size: 1.2rem",
    products.value,
    productsClone.value
  );
};

watch(itemUnderEditId, (newValue) => {
  if (newValue) {
    newProductPrices.value = {};
    newProductLabels.value = {};
    selectedItemUnderEditTab.value = null;
  }
});
onMounted(() => {
  console.log({ userMarket: userMarket.value });
});
</script>
<style lang="scss">
.editable {
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  border: 2px solid #eee;

  &:hover {
    background: rgba(147, 145, 145, 0.2);
  }
}
</style>
