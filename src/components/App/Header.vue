<template>
  <transition name="nav" appear>
    <div
      v-if="!showAside"
      style="z-index: 999"
      class="bg-natural-transparent-50 blur border-b-muted position-fixed top-0 start-0 w-100 h-63px pt-3"
    >
      <div
        class="position-absolute w-100 top-0 user-select-none"
        oncontextmenu="return false"
      >
        <img
          src="/general/nav-top-bar.svg"
          alt=""
          class="w-100 position-absolute top-0"
          style="top: -10px"
        />
      </div>
      <div class="container-fluid h-100 d-flex align-items-center">
        <div class="row w-100">
          <div class="col-6 col-xl-2">
            <div
              class="d-flex align-items-center justify-content-xl-center gap-4 gap-xl-0"
            >
              <div>
                <i
                  @click="showAsideToggle"
                  class="bi bi-list d-block d-xl-none font-24px text-black cursor-pointer"
                />
              </div>
              <div>
                <router-link to="/dashboard">
                  <img src="/Full_logo.svg" width="96" class="logo-img" />
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-6 col-xl-10">
            <div
              class="container d-flex align-items-center justify-content-end w-100 h-100"
              :class="{ 'justify-content-xl-between': breadcrumbs }"
            >
              <!--begin::Breadcrumb-->
              <ul
                v-if="breadcrumbs"
                class="breadcrumb fw-bold fs-base my-1 d-none d-xl-flex"
              >
                <li class="breadcrumb-item text-muted">
                  <router-link to="/dashboard" class="text-muted">
                    {{ $t("dashboard") }}
                  </router-link>
                </li>
                <template v-for="(item, index) in breadcrumbs" :key="index">
                  <li class="breadcrumb-item text-dark">
                    {{ item }}
                  </li>
                </template>
                <li class="breadcrumb-item text-dark">
                  {{ pageTitle }}
                </li>
              </ul>
              <!--end::Breadcrumb-->
              <!-- control section -->
              <section>
                <div class="d-flex gap-3 align-items-center">
                  <div>
                    <Dropdown
                      @selectedItem="setSelectedLanguage"
                      :items="websiteLanguages"
                      headClasses=""
                      bodyClasses="text-truncate text-capitalize d-flex justify-content-center align-items-center p-1"
                      body-holder-classes="py-1 bg-white shadow"
                      width="auto"
                      position="right"
                    >
                      <template #headerContent="{ item }">
                        <div class="p-2 cursor-pointer">
                          <img
                            src="/icons/Language.svg"
                            alt=""
                            class="hw-16px user-select-none"
                          />
                        </div>
                      </template>
                      <template #bodyContent="{ item }">
                        <div
                          class="px-3 py-1 rounded"
                          :class="
                            selectedLanguage && selectedLanguage.id === item.id
                              ? 'bg-primary text-white shadow-xs fw-boldest'
                              : 'bg-hover-light-primary'
                          "
                          v-text="item.label"
                        />
                      </template>
                    </Dropdown>
                  </div>
                  <div>
                    <div class="p-2 cursor-pointer">
                      <img
                        src="/icons/Alarm.svg"
                        alt=""
                        class="hw-16px user-select-none"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="p-2 cursor-pointer">
                      <router-link to="/crafted/account">
                        <img
                          src="/icons/User.svg"
                          alt=""
                          class="hw-16px user-select-none"
                        />
                      </router-link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <MazDrawer variant="left" v-model="showAside">
    <template #title>
      <div class="d-flex align-items-center gap-4">
        <div v-if="!showAside">
          <i
            @click="showAsideToggle"
            class="bi bi-list d-block d-xl-none font-24px text-black cursor-pointer"
          />
        </div>
        <div>
          <img src="/Full_logo.svg" width="96" class="logo-img" />
        </div>
      </div>
    </template>
    <template #default="{ close }">
      <div>
        <Aside v-if="showAside" :aside-active-sm="showAside" />
      </div>
    </template>
  </MazDrawer>
</template>

<script setup lang="ts">
import MazDrawer from "maz-ui/components/MazDrawer";
import Dropdown from "@/components/Reusable/Dropdown.vue";

import Aside from "./Aside.vue";

import locales from "@/core/plugins/i18n";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

const store = useStore();
const i18n = useI18n();

const local = computed(() => i18n.locale.value);
const websiteLanguage = computed(() => store.state.websiteLanguage);
const pageTitle = computed(() => {
  return store.getters.pageTitle;
});

const breadcrumbs = computed(() => {
  return store.getters.pageBreadcrumbPath;
});

/// Navbar
const websiteLanguages = [
  { id: "ar-JO", label: "Arabic", dir: "rtl" },
  { id: "en-US", label: "English", dir: "ltr" },
];

const selectedLanguage = ref();

const setSelectedLanguage = (lng, isGlobal?: boolean) => {
  if (!isGlobal) {
    location.reload();
  }

  selectedLanguage.value = lng;
  languageToggle(lng);
};

const initHtmlStyle = (lng) => {
  const lngCode = lng.id.slice(0, 2);

  store.commit("SET_WEBSITE_LANGUAGE", lng.id);
  document.documentElement.lang = lngCode;
  document.documentElement.dir = lng.dir;
};

const languageToggle = (lng) => {
  localStorage.setItem("website-lang", JSON.stringify(lng));

  const lngCode = lng.id.slice(0, 2);
  locales.global.locale.value = lngCode;

  initHtmlStyle(lng);
};

/// Aside
const showAside = ref(false);

const showAsideToggle = () => {
  showAside.value = !showAside.value;
};
onBeforeMount(() => {
  const storedLang = JSON.parse(localStorage.getItem("website-lang"));

  if (storedLang) {
    setSelectedLanguage(storedLang, true);

    return;
  }

  const enLng = websiteLanguages.find(i => i.id === 'en-US')

  setSelectedLanguage(enLng || websiteLanguages[0], true);
});
</script>

<style scoped lang="scss">
.logo-img {
  @media (min-width: 480px) {
    width: 96px;
  }
  @media (max-width: 479px) {
    width: 55px;
  }
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
}

.nav-enter-active,
.nav-leave-active {
  transition: opacity 0.4s ease;
}
</style>
