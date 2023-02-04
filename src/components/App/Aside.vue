<template>
  <div
    style="z-index: 9"
    class="bg-natural-2"
    :class="[
      {
        'vh-100 pt-10vh col-xl-2 position-fixed top-0 overflow-auto':
          !asideActiveSm,
      },
      local === 'en' ? 'start-0 border-r-muted' : 'end-0 border-l-muted',
    ]"
  >
    <div class="w-100 h-100 px-xl-2 secondary-5 natural-6">
      <!-- layer one -->
      <div v-for="(link, i1) in asideLinks" :key="i1">
        <div
          class="font-14px mb-2 text-capitalize link-block"
          v-text="link.label"
        />
        <!-- children -->
        <template v-if="notEmpty(link.children)">
          <div v-for="(child, i2) in link.children" :key="i2" class="px-4 my-1">
            <!-- list of links -->
            <template v-if="notEmpty(child.subs)">
              <div
                @click="expandHandler(child)"
                class="fw-bold link-block rounded secondary-5 text-hover-secondary bg-hover-light-dark"
              >
                <MazIcon
                  class="transition-03s"
                  :style="
                    child.expanded
                      ? `${
                          local === 'en'
                            ? 'transform: rotate(0)'
                            : 'transform: rotate(0)'
                        }`
                      : `${
                          local === 'en'
                            ? 'transform: rotate(-90deg)'
                            : 'transform: rotate(90deg)'
                        }`
                  "
                  name="chevron-down"
                />
                <span v-text="child.label" />
              </div>
              <MazTransitionExpand>
                <template v-if="child.expanded || $route.fullPath === child.to">
                  <div v-for="(sub, i3) in child.subs" :key="i3" class="px-4">
                    <div>
                      <router-link
                        :to="sub.to"
                        class="w-100 secondary-5 text-hover-secondary link-block rounded bg-hover-light-dark mx-3 w-100"
                      >
                        <img src="/icons/Dot.svg" class="hw-6px" alt="" />
                        <span v-text="sub.label" class="text-capitalize" />
                        <span
                          class="span rounded"
                          :class="local === 'en' ? 'end-0' : 'start-0'"
                        ></span>
                      </router-link>
                    </div>
                  </div>
                </template>
              </MazTransitionExpand>
            </template>
            <!-- direct link -->
            <template v-else>
              <div v-if="!!child.to" class="my-3">
                <router-link
                  :to="child.to"
                  exact
                  class="link-block rounded secondary-5 text-hover-secondary bg-hover-light-dark"
                >
                  <img src="/icons/Dot.svg" class="hw-6px" alt="" />
                  <span v-text="child.label" class="text-capitalize" />
                  <span
                    class="span rounded"
                    :class="local === 'en' ? 'end-0' : 'start-0'"
                  ></span>
                </router-link>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uuid } from "vue-uuid";
import MazTransitionExpand from "maz-ui/components/MazTransitionExpand";
import MazIcon from "maz-ui/components/MazIcon";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

// import locales from "@/core/plugins/i18n";

interface Props {
  asideActiveSm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  asideActiveSm: false,
});

const route = useRoute();
const i18n = useI18n();

const local = computed(() => i18n.locale.value);

const asideLinks = ref([
  {
    id: uuid.v4(),
    label: "store & products",
    children: [
      {
        id: uuid.v4(),
        label: i18n.t("dashboard"),
        to: "/dashboard",
        expanded: false,
        subs: [],
      },
      {
        id: uuid.v4(),
        label: "orders",
        to: "/orders",
        expanded: false,
        subs: [],
      },
      {
        id: uuid.v4(),
        label: "products management",
        to: "",
        expanded: false,
        subs: [
          {
            id: uuid.v4(),
            label: "products",
            to: "/apps/ecommerce/catalog/listing-products",
            expanded: false,
            subs: [],
          },
          {
            id: uuid.v4(),
            label: "update product",
            to: "/apps/ecommerce/catalog/edit-product?tab=1",
            expanded: false,
            subs: [],
          },
        ],
      },
      {
        id: uuid.v4(),
        label: "stores management",
        to: "",
        expanded: false,
        subs: [
          {
            id: uuid.v4(),
            label: "products",
            to: "/products",
            expanded: false,
            subs: [],
          },
          {
            id: uuid.v4(),
            label: "categories",
            to: "/categories",
            expanded: false,
            subs: [],
          },
        ],
      },
    ],
  },
  {
    id: uuid.v4(),
    label: "payments",
    children: [
      {
        id: uuid.v4(),
        label: "Financial Management",
        to: "",
        expanded: false,
        subs: [
          {
            id: uuid.v4(),
            label: "test link one",
            to: "/test-link",
            expanded: false,
            subs: [],
          },
        ],
      },
      {
        id: uuid.v4(),
        label: "Reports",
        to: "/reports",
        expanded: false,
        subs: [],
      },
    ],
  },
]);

const notEmpty = (arr: any[]) => arr && arr.length > 0;

const expandHandler = (item) => {
  asideLinks.value?.forEach((link) => {
    const i1 = link.children.find((i) => i.id === item.id);

    if (i1) {
      i1.expanded = !i1.expanded;

      return;
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/components/_variables.custom.scss";

.link-block {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 9px;
  user-select: none;
}

.router-link-active {
  position: relative;
  width: 100%;
  min-height: 37px;
  border-radius: 4px;
  color: #2c2c42;
  background: #e2e2e5 !important;

  .span {
    content: "";
    width: 4px;
    height: 85%;
    top: 7.5%;
    background: $primary;
    position: absolute;
  }
}
</style>
