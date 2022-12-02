<template>
  <div class="m-0">
    <h1 class="text-gray-800 text-capitalize fw-bold mb-6 mx-5">
      {{ $t(title) }}
    </h1>
    <div
      class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 h-100"
    >
      <template v-for="(menuItem, i) in items" :key="i">
        <div
          v-if="menuItem.sectionTitle"
          :class="{ show: hasActiveChildren(menuItem.route) }"
          class="menu-item menu-accordion"
          data-kt-menu-sub="accordion"
          data-kt-menu-trigger="click"
        >
          <span class="menu-link">
            <span class="menu-icon">
              <i :class="menuItem.icon" class="bi fs-3"></i>
            </span>
            <span class="menu-title">{{ menuItem.sectionTitle }}</span>
            <span class="menu-arrow"></span>
          </span>
          <div
            :class="{ show: hasActiveChildren(menuItem.route) }"
            class="menu-sub menu-sub-accordion show"
          >
            <template v-for="(item2, k) in menuItem.sub" :key="k">
              <div class="menu-item">
                <router-link class="menu-link" active-class="active" :to="item2.route">
                  <span class="menu-bullet">
                    <span class="bullet bullet-dot"></span>
                  </span>
                  <span class="menu-title">{{ item2.heading }}</span>
                </router-link>
              </div>
            </template>
          </div>
        </div>
        <div class="mb-4 menu-item" v-else>
          <router-link :to="menuItem.link" class="menu-link" active-class="active">
            <span class="menu-icon">
              <i class="bi fs-3" :class="menuItem.icon"></i>
            </span>
            <span class="px-3 text-capitalize">{{ menuItem.name }}</span>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hasActiveChildren(match) {
      return this.$route.path.indexOf(match) !== -1;
    },
  },
};
</script>
