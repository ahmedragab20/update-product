<template>
  <div>
    <div v-if="props.langs && props.langs.length > 0" class="card-body pt-0">
      <Editor v-if="langs">
        <template #upper>
          <tabs-duplicator :items="langs" @selectedItem="setSelectedLang">
            <template #label="{ item }: any">
              <span>
                {{ item.label }}
              </span>
            </template>
          </tabs-duplicator>
        </template>
        <template #fields>
          <keep-alive>
            <div v-for="field in props.langs" :key="field.id" dir="auto">
              <div :dir="field.label === 'العربية' ? 'rtl' : 'auto'">
                <InputField
                  v-if="selectedLang && field.id === selectedLang.id"
                  v-model="product[`name-${selectedLang.id}`]"
                  :isRequired="true"
                  :label="
                    field.label === 'العربية' ? 'أسم المنتج' : 'Product name'
                  "
                  styles="text-capitalize my-8"
                  @input="editor_info"
                />
                <div v-for="(n, $index) in 3" :key="$index" class="my-3">
                  <QuillEditor
                    v-if="selectedLang && field.id === selectedLang.id"
                    v-model:content="product[activeResourceEditor(n)]"
                    :placeholder="editors[$index]"
                    :toolbar="editorOptions.toolbar"
                    contentType="html"
                    @input="editor_info(n)"
                  />
                </div>
              </div>
            </div>
          </keep-alive>
        </template>
      </Editor>
      <div v-if="editorErrorMsg" class="my-4">
        <span class="fw-bold text-danger">
          <i class="bi bi-cone text-danger"></i>
          {{ editorErrorMsg }}
        </span>
      </div>
      <SaveChangeBtn
        :btn-reverse-submit="reverseEditorChanges"
        :btnSubmit="saveEditorChange"
        :elChanged="editorChanged"
        :elLoading="editorLoading"
        :fullWidth="true"
        :no-cancel="true"
        :payload="product"
      />
    </div>
    <div v-else class="p-5 d-flex justify-content-center align-items-center">
      <img src="@/assets/content-loading.gif" width="300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import Api from "@/utils/ApiHelper";

import Editor from "@/components/Reusable/Editor.vue";
import InputField from "@/components/Reusable/InputField.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import SaveChangeBtn from "./-SaveChangeBtn.vue";
import { QuillEditor } from "@vueup/vue-quill";

import { Language, Product } from "@/types";

interface Props {
  langs: Language[];
  product: Product;
}

const props = defineProps<Props>();

const product = ref({});
const productData = ref({});

let selectedLang = ref();
const editorChanged = ref<any>(false);
const editorLoading = ref(false);
const editors = reactive([
  "short description",
  "long description",
  "purchase note",
]);
const editor_info = (length: number): void => {
  editorChanged.value = true;
};

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

const setSelectedLang = (payload: any): void => {
  selectedLang.value = payload;
  
  setEditorContent();
};

const activeResourceEditor = (index: number) => {
  props.langs?.forEach((lang: any): any => {
    product[`name-${lang.id}`] = productData.value[`name-${lang.id}`];
    if (index === 1) {
      editorChanged.value
        ? product.value[`shortDescription-${lang.id}`]
        : (product.value[`shortDescription-${lang.id}`] =
            productData.value[`shortDescription-${lang.id}`]);
    } else if (index === 2) {
      editorChanged.value
        ? product.value[`longDescription-${lang.id}`]
        : (product.value[`longDescription-${lang.id}`] =
            productData.value[`longDescription-${lang.id}`]);
    } else if (index === 3) {
      editorChanged.value
        ? product.value[`purchaseNote-${lang.id}`]
        : (product.value[`purchaseNote-${lang.id}`] =
            productData.value[`purchaseNote-${lang.id}`]);
    }
  });
  if (index === 1) return `shortDescription-${selectedLang.value.id}`;
  else if (index === 2) return `longDescription-${selectedLang.value.id}`;
  else if (index === 3) return `purchaseNote-${selectedLang.value.id}`;
};
const editorErrorMsg = ref<string>("");

const saveEditorChange = async (content: any) => {
  editorLoading.value = true;

  let resourcesArr: any[] = [];

  props.langs?.forEach((lang: any) => {
    resourcesArr.push({
      languageId: lang.id,
      name: product.value[`name-${lang.id}`],
      longDescription: content[`longDescription-${lang.id}`],
      purchaseNote: content[`purchaseNote-${lang.id}`],
      shortDescription: content[`shortDescription-${lang.id}`],
    });
  });

  const payload = {
    id: props.product.id,
    resources: resourcesArr,
  };
  const reqData = {
    method: "post",
    url: "/ProductCommands/update-product-resources",
    payload,
  };
  try {
    const { data }: any = await Api(reqData);

    if (!data.succeeded) editorErrorMsg.value = data.message;
    else editorChanged.value = "done";
  } catch (error) {
    console.error(error);
  } finally {
    editorLoading.value = false;
  }
};

const reverseEditorChanges = () => {
  product.value = {};
  const editorContext = document.querySelectorAll(".ql-editor");

  editorContext.forEach((el) => {
    el.textContent = "";
  });

  editorChanged.value = false;
};

const setEditorContent = () => {
  props.product?.resources?.forEach((resource: any) => {
    if (resource.name) {
      product.value[`name-${resource.languageId}`] = resource.name;
    }
    if (resource.longDescription) {
      productData.value[`longDescription-${resource.languageId}`] =
        resource.longDescription;
    }
    if (resource.purchaseNote) {
      productData.value[`purchaseNote-${resource.languageId}`] =
        resource.purchaseNote;
    }
    if (resource.shortDescription) {
      productData.value[`shortDescription-${resource.languageId}`] =
        resource.shortDescription;
    }
  });
  if (Object.keys(productData.value).length > 0) {
    product.value = {
      ...product.value,
      ...productData.value,
    };
  }
};

watch(
  () => props.product,
  (newValue) => {
    if (newValue && newValue.resources) {
      const editorTargets = [
        "shortDescription",
        "longDescription",
        "purchaseNote",
      ];
      newValue.resources.forEach((el: any) => {
        editorTargets.forEach((target) => {
          if ([null, undefined].includes(el[target])) {
            el[target] = "<p><br/><br/></p>";
          }
        });
      });
    }
  }
);

onMounted(() => {
  if (props.langs && props.langs.length > 0) {
    setSelectedLang(props.langs[0]);
  }
});
watch(
  () => props.langs,
  (newV) => {
    if (newV && newV.length > 0) {
      setSelectedLang(newV[0]);
    }
  }
);
</script>
