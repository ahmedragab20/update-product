<template>
  <div
    class="min-vh-100 flex-column d-flex justify-content-center align-items-center w-100"
  >
    <div>
      <Note />
    </div>
    <button @click="changeRout" class="btn btn-danger">get out of here</button>
    <div
      class="min-vh-100 d-flex justify-content-center align-items-center w-100"
    >
      <Editor>
        <template #upper>
          <tabs-duplicator
            :items="items"
            div-id="f482ce1f-7784-499d-b58d-d94d495f80e6"
            @selectedItem="setSelectedItem"
          >
            <template #label="{ item }">
              {{ item.label }}
            </template>
          </tabs-duplicator>
        </template>
        <template #fields>
          <div id="f482ce1f-7784-499d-b58d-d94d495f80e6" class="px-5 py-3">
            <div
              v-for="(field, $index) in items"
              :key="$index"
              style="width: 600px"
            >
              <div>
                <InputField
                  v-if="selectedItem && field.id === selectedItem.id"
                  :label="`product name ${field.code}`"
                  styles="text-capitalize my-8"
                  :isRequired="true"
                  @input="log"
                  v-model="product[`product_name_${selectedItem.code}`]"
                />
                <QuillEditor
                  v-if="selectedItem && field.id === selectedItem.id"
                  :toolbar="editorOptions.toolbar"
                  v-model:content="product[`discription_${selectedItem.code}`]"
                  contentType="html"
                  @input="log"
                />
              </div>
            </div>
          </div>
        </template>
      </Editor>
    </div>
    <div>
      <a href="#" class="btn btn-light-info me-2 mb-2">info</a>
      <a
        href="#"
        class="btn btn-bg-dark btn-icon-white btn-text-white me-2 mb-2"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="/media/icons/duotune/general/gen006.svg" />
        </span>
        White
      </a>
      <a href="#" class="btn btn-success me-2 mb-2"
        ><i class="fas fa-envelope-open-text fs-4 me-2"></i> Caption</a
      >
      <a href="#" class="btn btn-flex btn-primary px-6 me-2 mb-2">
        <span class="svg-icon svg-icon-2x">
          <inline-svg src="media/icons/duotune/general/gen006.svg" />
        </span>
        <span class="d-flex flex-column align-items-start ms-2">
          <span class="fs-3 fw-bolder">Caption</span>
          <span class="fs-7">Some description</span>
        </span>
      </a>
      <!-- Default state -->
      <button type="button" class="btn btn-primary me-10" id="kt_button_1">
        <span class="indicator-label"> Submit </span>
        <span class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>

      <!-- Progress enabled state -->
      <button type="button" class="btn btn-primary" data-kt-indicator="on">
        <span class="indicator-label"> Submit </span>
        <span class="indicator-progress">
          Please wait...
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
          ></span>
        </span>
      </button>
      <!-- Alert -->
      <div
        class="alert alert-dismissible bg-info d-flex flex-column flex-sm-row w-100 p-5 mb-10"
      >
        <span class="svg-icon svg-icon-2hx svg-icon-light me-4 mb-5 mb-sm-0">
          <inline-svg src="media/icons/duotune/general/gen007.svg" />
        </span>
        <!--begin::Content-->
        <div class="d-flex flex-column text-light pe-0 pe-sm-10">
          <h4 class="mb-2 text-light">This is an alert</h4>
          <span
            >The alert component can be used to highlight certain parts of your
            page for higher content visibility.</span
          >
        </div>
        <!--end::Content-->
        <!--begin::Close-->
        <button
          type="button"
          class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
          data-bs-dismiss="alert"
        >
          <span class="svg-icon svg-icon-2x svg-icon-light">
            <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
          </span>
        </button>
        <!--end::Close-->
      </div>
    </div>
    <!--begin::Status-->
    <div style="width: 300px" class="mb-10">
      <DropdownTest />
    </div>
    <div class="mb-10">
      <div style="width: 280px" class="" aria-hidden="true">
        <div class="loading-skeleton w-100 d-flex gap-5 flex-column bg-light">
          <div
            v-for="n in 5"
            :key="n"
            class="placeholder-div w-100 py-5 rounded shadow"
          ></div>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <button
        @click="toggleToast"
        class="btn btn-sm btn-text-info border border-info border-dashed bg-hover-light-info"
      >
        Toggle Toast
      </button>
    </div>
    <div class="mb-10">
      <Toast :value="showToast" />
    </div>
    <div style="width: 450px" class="border border-light rounded-3 p-2 my-5">
      <tabs-duplicator
        div-id="633f5cd0-0788-4a33-aebc-a4f15382700a"
        :items="items"
        @selectedItem="inputTextSelectedLangHandler"
        active-btn-classes="py-2 px-4"
        color="text-white"
        body-classes="shadow bg-white"
      >
        <template #label="{ item }">
          {{ item.label }}
        </template>
      </tabs-duplicator>
      <div id="633f5cd0-0788-4a33-aebc-a4f15382700a" class="p-5">
        <input
          v-model="inputText[inputTextSelectedLang.id]"
          type="text"
          class="form-control mt-3"
          placeholder="1- type something..."
        />
        <input
          v-model="inputText2[inputTextSelectedLang.id]"
          type="text"
          class="form-control mt-3"
          placeholder="2- type something..."
        />
      </div>
      <div>
        {{ inputText }}
      </div>
      <div class="mt-2">
        {{ inputText2 }}
      </div>
      <div>
        <button
          @click="submitInputTextField"
          type="button"
          class="btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary d-flex align-items-center gap-2 mt-3"
        >
          Submit text field data
          <i class="bi bi-arrow-right-circle text-primary"></i>
        </button>
      </div>
    </div>
    <!--end::Status-->
    <div class="d-flex justify-content-center align-items-center w-100 vh-100">
      <GoogleMaps @currentLocation="currentLocationF" height="100vh" />
    </div>
    <SearchMultiSelect />
    <div
      class="mt-5 min-vh-100 d-flex justify-content-center align-items-center flex-column"
    >
      <div style="width: 120px; margin-bottom: 20px">
        <img :src="mediaURL" class="img-thumbnail" alt="..." />
      </div>
      <input
        ref="fileUpload"
        accept=".png, .jpg, .jpeg"
        hidden
        type="file"
        @change="uploaderHandler($event)"
      />
      <div v-if="response" class="my-2 mx-auto" style="width: 300px">
        <pre>
          key:
          {{ response.data.data }}
        </pre>
      </div>
      <button
        :disabled="uploading"
        @click="$refs.fileUpload.click()"
        type="button"
        class="btn btn-warning text-black rounded-3"
      >
        <span v-if="!uploading"> UPLOAD A FILE </span>
        <span v-else class="spinner-border spinner-border-sm"></span>
      </button>
    </div>
  </div>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div>
      <h1>Grid Layout</h1>
      <h2>Grid Layout</h2>
      <h3>Grid Layout</h3>
      <h4>Grid Layout</h4>
      <h5>Grid Layout</h5>
      <h6>Grid Layout</h6>
      <p>Grid Layout</p>
    </div>
    <div>
      <h1>1234567890</h1>
      <h2>1234567890</h2>
      <h3>1234567890</h3>
      <h4>1234567890</h4>
      <h5>1234567890</h5>
      <h6>1234567890</h6>
      <p>1234567890</p>
    </div>
    <div>
      <h1>الحمدلله حمدا كثيرا</h1>
      <h2>الحمدلله حمدا كثيرا</h2>
      <h3>الحمدلله حمدا كثيرا</h3>
      <h4>الحمدلله حمدا كثيرا</h4>
      <h5>الحمدلله حمدا كثيرا</h5>
      <h6>الحمدلله حمدا كثيرا</h6>
      <p>الحمدلله حمدا كثيرا</p>
    </div>
    <div>
      <h1>١٢٣٤٥٦٧٨٩٠</h1>
      <h2>١٢٣٤٥٦٧٨٩٠</h2>
      <h3>١٢٣٤٥٦٧٨٩٠</h3>
      <h4>١٢٣٤٥٦٧٨٩٠</h4>
      <h5>١٢٣٤٥٦٧٨٩٠</h5>
      <h6>١٢٣٤٥٦٧٨٩٠</h6>
      <p>١٢٣٤٥٦٧٨٩٠</p>
    </div>
  </div>
  <div class="container text-center">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo nihil quae
    repudiandae veritatis voluptatem. Ab assumenda beatae itaque laudantium
    quaerat sequi sunt suscipit velit! Adipisci excepturi omnis quaerat totam
    unde?
  </div>
  <div class="container">
    <div>
      <h2 class="font-32px text-center mt-5">Colors</h2>
    </div>
    <div class="d-flex gap-3 flex-nowrap overflow-auto w-100 py-5">
      <div>
        <Sketch v-model="color" />
      </div>
      <div>
        <Chrome v-model="color" />
      </div>
      <div>
        <Compact v-model="color" />
      </div>
      <div>
        <Swatches v-model="color" />
      </div>
      <div>
        <Grayscale v-model="color" />
      </div>
      <div>
        <Material v-model="color" />
      </div>
      <div>
        <Photoshop v-model="color" />
      </div>
      <div>
        <Slider v-model="color" />
      </div>
      <div>
        <Twitter v-model="color" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import Editor from "@/components/Reusable/Editor.vue";
import InputField from "@/components/Reusable/InputField.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import GoogleMaps from "@/components/Reusable/GoogleMaps.vue";
import SearchMultiSelect from "@/views/dummy/-SearchMultiSelect.vue";
import DropdownTest from "./-Dropdown-test.vue";
import Note from "@/components/Reusable/Note.vue";
import Toast from "@/components/Reusable/Toast.vue";
import { QuillEditor } from "@vueup/vue-quill";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { watch } from "@vue/runtime-core";
import { upload } from "@/composables/uploader";
import { useRouter } from "vue-router";

const router = useRouter();

const changeRout = () => {
  router.push("/apps/ecommerce/catalog/edit-product");
};

interface Lang {
  id?: number;
  code?: string;
  dir?: string;
  label?: string;
  icon?: string;
}

const data = reactive({
  ar: {
    product_name: "",
    product_description: "",
  },
  en: {
    product_name: "",
    product_description: "",
  },
});

const items = reactive<Lang[]>([
  {
    id: 1,
    code: "en",
    dir: "ltr",
    label: "english",
    icon: "https://cdn-icons-png.flaticon.com/64/197/197595.png",
  },
  {
    id: 2,
    code: "ar",
    dir: "rtl",
    label: "العربية",
    icon: "https://cdn-icons-png.flaticon.com/64/197/197595.png",
  },
]);
const inputTextSelectedLang = ref({});

const inputTextSelectedLangHandler = (payload) => {
  console.log({ payload });
  inputTextSelectedLang.value = payload;
};

const inputText = ref({});
const inputText2 = ref({});
const submitInputTextField = () => {
  let items: any = [];
  let items2: any = [];

  Object.keys(inputText.value).forEach((el, i, array) => {
    items.push({
      langId: el,
      name: inputText.value[el],
    });
  });
  Object.keys(inputText2.value).forEach((el, i, array) => {
    items2.push({
      langId: el,
      name: inputText2.value[el],
      description: inputText.value[el],
    });
  });

  console.log(items2, items);
};

const product = ref([]);
const editorOptions = ref({
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
});

const log = (): void => console.log(product.value);

let selectedItem = ref<Lang>({});

const setSelectedItem = (payload: any) => {
  console.log({ payload });

  selectedItem.value = payload;

  console.log({ selectedItem: selectedItem.value });
};

selectedItem.value = items[0];

const quillEditorContentEn = (callback: string) => {
  data.en.product_description = callback;
  console.log({ EnCallback: callback });
};
const quillEditorContentAr = (callback: string) => {
  data.ar.product_description = callback;
  console.log({ ArCallback: callback });
};

const currentLocationF = (payload) => {
  console.log(payload);
};
const mediaURL = ref(
  "https://images.unsplash.com/photo-1671690872526-f8057e9ac97d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
);
const response = ref();
const uploading = ref(false);
const uploaderHandler = (e) => {
  uploading.value = true;
  mediaURL.value = URL.createObjectURL(e.target.files[0]);

  upload(e)
    .then((res) => {
      response.value = res;
    })
    .finally(() => {
      uploading.value = false;
    });
};

const color = ref("#56a5f6");

onMounted(() => {
  if (items && items.length > 0) {
    inputTextSelectedLangHandler(items[0]);
  }
});
watch(
  () => items,
  (newValue, oldValue) => {
    console.log({ newValue, oldValue });

    if (newValue && newValue.length > 0) {
      inputTextSelectedLangHandler(items[0]);
    }
  }
);

const showToast = ref(true);

const toggleToast = () => {
  showToast.value = !showToast.value;
};
</script>

<style lang="scss">
.ql-editor {
  text-align: justify;
}

.ql-toolbar .ql-snow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
