<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-xl-row">
    <!--begin::Sidebar-->
    <div class="flex-column flex-lg-row-auto w-100 w-xl-300px mb-10">
      <!--begin::Card-->
      <div class="card mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body pt-15">
          <!--begin::Summary-->
          <div class="d-flex flex-center flex-column mb-5">
            <!--begin::Name-->
            <a
              href="#"
              class="fs-3 text-gray-800 text-hover-primary fw-bolder mb-1"
            >
              {{ form.name }}
            </a>
            <!--end::Name-->

            <!--begin::Position-->
            <!--end::Position-->

            <!--begin::Info-->
            <div class="d-flex flex-wrap flex-center">
              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-20 mb-3"
              >
                <div class="fs-4 fw-bolder text-gray-700">
                  <span class="w-100px">{{ form.totalPoints }}</span>
                </div>
                <div class="fw-bold text-muted">Total Points</div>
              </div>
              <!--end::Stats-->

              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
                style="margin-right: 1rem !important"
              >
                <div class="fs-4 fw-bolder text-gray-700">
                  <span class="w-50px">{{ form.activePoints }}</span>
                </div>
                <div class="fw-bold text-muted">Active Points</div>
              </div>
              <!--end::Stats-->

              <!--begin::Stats-->
              <div
                class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
              >
                <div class="fs-4 fw-bolder text-gray-700">
                  <span class="w-50px">{{ form.usedPoints }}</span>
                  
                </div>
                <div class="fw-bold text-muted">Used Points</div>
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Info-->
          </div>
          <!--end::Summary-->

          <!--begin::Details toggle-->
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bolder rotate collapsible"
              data-bs-toggle="collapse"
              href="#kt_customer_view_details"
              role="button"
              aria-expanded="false"
              aria-controls="kt_customer_view_details"
            >
              Details
              <span class="ms-2 rotate-180">
                <span class="svg-icon svg-icon-3">
                  <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
                </span>
              </span>
            </div>

            <span
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              title="Edit customer details"
            >
              <div class="badge badge-light-info d-inline">Groups Name</div>
            </span>
          </div>
          <!--end::Details toggle-->

          <div class="separator separator-dashed my-3"></div>

          <!--begin::Details content-->
          <div id="kt_customer_view_details" class="collapse show">
            <div class="py-5 fs-6">
              <!--begin::Badge-->

              <!--begin::Badge-->
              <!--begin::Details item-->
              <div class="fw-bolder mt-5">Email</div>
              <div class="text-gray-600">
                <a href="#" class="text-gray-600 text-hover-primary">{{
                  form.email
                }}</a>
                <span
                  class="badge badge-light-primary"
                  v-if="form.emailConfirmed"
                >
                  <inline-svg src="/media/svg/general/icons8-done.svg"
                /></span>
                <span class="badge badge-light-danger" v-else>
                  <inline-svg src="/media/svg/general/icons8-cancel.svg" />
                </span>
              </div>
              <div class="fw-bolder mt-5">Phone Number</div>
              <div class="text-gray-600">
                <a href="#" class="text-gray-600 text-hover-primary">{{
                  form.phoneNumber
                }}</a>
                <span
                  class="badge badge-light-primary"
                  v-if="form.phoneNumberConfirmed"
                >
                  <inline-svg src="/media/svg/general/icons8-done.svg"
                /></span>
                <span class="badge badge-light-danger" v-else>
                  <inline-svg src="/media/svg/general/icons8-cancel.svg" />
                </span>
              </div>

              <!--begin::Details item-->
              <!--begin::Details item-->

              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bolder mt-5">ReferenceNumber</div>
              <div class="text-gray-600">
              {{form.lastOrderReferenceNumber}}
              </div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bolder mt-5">Language</div>
              <div class="text-gray-600">{{language}}</div>
              <!--begin::Details item-->
              <!--begin::Details item-->
              <div class="fw-bolder mt-5">Currency</div>
              <div class="text-gray-600">{{currency}}</div>
              <!--begin::Details item-->
              <!--begin::Details item-->

              <!--begin::Details item-->
            </div>
          </div>
          <!--end::Details content-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->

      <!--begin::Connected Accounts-->

      <!--end::Connected Accounts-->
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <!--begin:::Tabs-->
      <ul
        class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-8"
      >
        <!--begin:::Tab item-->
       
        <!--end:::Tab item-->

        <!--begin:::Tab item-->
        <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4 active"
            data-bs-toggle="tab"
            href="#address"
          >
            Address</a
          >
        </li>
         <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4 "
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_tab"
            @click="getOrder"
           
            >Order</a
          >
        </li>
        <!--end:::Tab item-->

        <!--begin:::Tab item-->
        <li class="nav-item">
          <a
          role="button"
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
             @click="getWishlist"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_statements"
            >Whishlists</a
          >
        </li>
        <li class="nav-item">
          <a
           role="button"
             @click="getAbandoned"
            class="nav-link text-active-primary pb-4"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#Abandoned"
            >Abandoned Carts</a
          >
        </li>
        <!--end:::Tab item-->
        <li class="nav-item">
          <a
          role="button"
            class="nav-link text-active-primary pb-4"
            @click="getDevices"
            data-kt-countup-tabs="true"
            data-bs-toggle="tab"
            href="#Devices"
            >Devices</a
          >
        </li>
        <!--begin:::Tab item-->

        <!--end:::Tab item-->
      </ul>
      <!--end:::Tabs-->

      <!--begin:::Tab content-->
      <div class="tab-content" id="myTabContent">
        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade show "
          id="kt_customer_view_overview_tab"
          role="tabpanel"
        >
          <div class="row mb-6 mb-xl-9">
            <div class="col">
              <!--begin::Card-->
              <div class="card h-md-100 mb-md-0">
                <!--begin::Card header-->
                <div class="border-0" style="padding: 10px">
                  <!--begin::Card title-->
                  <div class="card-title">
                    <h2 class="fw-bold fs-2 mt-5">Active Orders</h2>
                  </div>
                  <!--end::Card title-->
                </div>
                <!--end::Card header-->
                <!--begin::Card body-->
                <div class="card-body order">
                  <!--begin::Svg Icon | path: icons/duotune/general/gen030.svg-->
                  <span
                    class="svg-icon svg-icon-info svg-icon-2x"
                    style="margin-bottom: 11px"
                  >
                    <inline-svg
                      src="/media/icons/duotune/abstract/abs027.svg"
                      width="24"
                      height="24"
                    />
                  </span>
                  <!--end::Svg Icon-->

                  <div class="ms-2" style="font-size: 20px">
                    {{ form.numberOfActiveOrders }}
                    <span class="text-muted fs-4 fw-semibold">Number</span>
                  </div>
                  <div class="ms-2" style="font-size: 20px">
                    {{ form.totalAmountOfActiveOrders }}
                    <span class="text-muted fs-4 fw-semibold">Total</span>
                  </div>
                </div>
                <!--end::Card body-->
              </div>
              <!--end::Card-->
            </div>
            <div class="col">
              <!--begin::Reward Tier-->
              <a href="#" class="card bg-primary hoverable h-md-100">
                <!--begin::Body-->
                <div class="border-0" style="padding: 10px">
                  <!--begin::Card title-->
                  <div class="card-title">
                    <h2 class="text-white fw-bold fs-2 mt-5">Success Orders</h2>
                  </div>
                </div>
                <div class="card-body order">
                  <!-- begin::Svg Icon | path: icons/duotune/general/gen020.svg-->
                  <span class="svg-icon svg-icon-white svg-icon-3x ms-n1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 18V16H10V18L9 20H15L14 18Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.3"
                        d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->

                  <div class="text-black" style="font-size: 20px">
                    {{ form.numberOfSucceededOrders }}
                    <span class="text-white fs-4 fw-semibold">Number</span>
                  </div>
                  <div class="text-black" style="font-size: 20px">
                    {{ form.totalAmountOfSucceededOrders }}
                    <span class="text-white fs-4 fw-semibold">Total</span>
                  </div>
                </div>
                <!--end::Body-->
              </a>
              <!--end::Reward Tier-->
            </div>
            <div class="col">
              <!--begin::Reward Tier-->
              <a href="#" class="card bg-danger hoverable h-md-100">
                <!--begin::Body-->
                <div class="border-0" style="padding: 10px">
                  <!--begin::Card title-->
                  <div class="card-title">
                    <h2 class="text-white fw-bold fs-2 mt-5">Failed Orders</h2>
                  </div>
                </div>
                <div class="card-body order">
                  <!--begin::Svg Icon | path: icons/duotune/general/gen020.svg-->
                  <span class="svg-icon svg-icon-white svg-icon-3x ms-n1">
                    <span class="svg-icon svg-icon-3 svg-icon-white">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr065.svg"
                      />
                    </span>
                  </span>
                  <!--end::Svg Icon-->

                  <div class="text-black" style="font-size: 20px">
                    {{ form.numberOfFailedOrders }}
                    <span class="text-white fs-4 fw-semibold">Number</span>
                  </div>
                  <div class="text-black" style="font-size: 20px">
                    <span> {{ form.totalAmountOfFailedOrders }} </span>
                    <span class="text-white fs-4 fw-semibold">Total</span>
                  </div>
                </div>
                <!--end::Body-->
              </a>
              <!--end::Reward Tier-->
            </div>
          </div>

          <ClientOrder
          ref="Order"
            card-classes="mb-6 mb-xl-9"
            :PhoneNumber="form.phoneNumber"
            :id="form.id"
          ></ClientOrder>
        </div>
        <!--end:::Tab pane-->

        <!--begin:::Tab pane-->
        <div
            class="tab-pane fade show active"
          id="address"
          role="tabpanel"
        >
          <ClientAddress card-classes="mb-6 mb-xl-9" :id="id"></ClientAddress>
        </div>
        <!--end:::Tab pane-->

        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade"
          id="kt_customer_view_overview_statements"
          role="tabpanel"
        >
          <ClientWhishlists
          ref="whishlist"
            card-classes="mb-6 mb-xl-9"
            :id="id"
          ></ClientWhishlists>
        </div>
         <div
          class="tab-pane fade"
          id="Abandoned"
          role="tabpanel"
        >
          <AbandonedCarts
          ref="Abandoned"
            card-classes="mb-6 mb-xl-9"
            :id="id"
          ></AbandonedCarts>
        </div>
        <div
          class="tab-pane fade"
          id="Devices"
          role="tabpanel"
        >
          <ClientDevices
          ref="Devices"
            card-classes="mb-6 mb-xl-9"
            :id="id"
          ></ClientDevices>
        </div>
        <!--end:::Tab pane-->
      </div>
      <!--end:::Tab content-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->

  <NewCardModal></NewCardModal>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import NewCardModal from "@/components/modals/forms/NewCardModal.vue";
import ClientOrder from "../components/ClientOrder.vue";
import ClientAddress from "../components/ClientAddress.vue";
import ClientWhishlists from "../components/ClientWhishlists.vue";
import AbandonedCarts from "../components/AbandonedCarts.vue"
import ClientDevices from "../components/ClientDevices.vue"

import Earnings from "@/components/customers/cards/statments/Earnings.vue";
import Statement from "@/components/customers/cards/statments/Statement.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, defineProps, computed, reactive } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { string } from "yup";
const store = useStore();
const route = useRoute();
const whishlist=ref()
const Devices=ref()
const Order=ref()
const Abandoned=ref()
let form = ref({
  name: "",
  email: "",
  id: "",
  name: "",
  phoneNumber: "",
  totalPoints: 0,
  usedPoints: 0,
  activePoints: 0,
  emailConfirmed: true,
  phoneNumberConfirmed: false,
  numberOfSucceededOrders: 0,
  numberOfActiveOrders: 0,
  totalAmountOfActiveOrders: 0,
  totalAmountOfFailedOrders: 0,
  totalAmountOfSucceededOrders: 0,
  numberOfFailedOrders: 0,
  lastSelectedLanguageId:0,
  lastSelectedCurrencyId:0,
  lastOrderReferenceNumber:0
});
const lookupQueries = store.state.LookupQueries;
console.log("lookupQueries", lookupQueries);

const language = ref("");
const currency = ref("");


const id = route.params.id;
const getData = (id) => {
  console.log("ud", id);

  store.dispatch(Actions.GET_CLIENT_BY_ID, id).then((data) => {
    console.log("data", data);

    form.value = data;
    console.log("form.value.lastSelectedLanguageId",form.value.lastSelectedLanguageId)
     console.log(" lookupQueries.countries?.data?", lookupQueries.languages.data)
    language.value = lookupQueries.languages?.data?.find(

  (x) => parseInt(x.id) === form.value.lastSelectedLanguageId
).label;
 currency.value = lookupQueries.currencies?.data?.find(

  (x) => parseInt(x.id) === form.value.lastSelectedCurrencyId
).label;
console.log("country",currency.value)

    // selectedItem.value = form.value.resources[0];
  });
};




 const getWishlist=()=>{
  console.log("getWishlist")
  whishlist.value.fetchData()
}
 const getDevices=()=>{
  console.log("Devices")
  Devices.value.fetchData()
}

 const getAbandoned=()=>{
  console.log("Devices")
  Abandoned.value.fetchData()
}
const getOrder=()=>{
    Order.value.fetchData(1)
}
getData(id);
</script>
<style>
a.text-gray-600.text-hover-primary {
  margin-right: 14px;
}
.fs-4.fw-bolder.text-gray-700 {
  text-align: center;
}
span.col-2 {
  width: 10px !important;
}
.border.border-gray-300.border-dashed.rounded.py-3.px-3.mb-3.succeeded {
  text-align: center;
  width: 50%;
}
.card .card-body.order {
  padding: 6px !important;
}
.svg-icon.svg-icon-2x svg {
  height: 3rem !important;
  width: 2rem !important;
}
</style>
