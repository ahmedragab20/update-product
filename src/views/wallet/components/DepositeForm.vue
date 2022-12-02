<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="kt_modal_deposite-1"
    ref="createAppModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Deposit</h2>

          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
            class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
            id="kt_modal_create_app_stepper"
            ref="createAppRef"
          >
            <!--begin::Aside-->
            <div
              class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px"
            >
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::depositAmount-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("depositAmount") }}</h3>
                  </div>
                  <!--end::depositAmount-->
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("accountType") }}</h3>

                    <!-- <div class="stepper-desc">Define your app accountId</div> -->
                  </div>
                  <!--begin::Label-->

                  <!--end::Step 2-->
                </div>
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("accounts") }}</h3>

                    <!-- <div class="stepper-desc">Define your app accountId</div> -->
                  </div>
                  <!--begin::Label-->

                  <!--end::Step 2-->
                </div>
                <!--begin::Step 3-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ $t("notes") }}</h3>

                    <!-- <div class="stepper-desc">Select the app database type</div> -->
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 3-->

                <!--begin::Step 5-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">4</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::reviewAndSubmit-->
                  <div class="stepper-label">
                    <div class="stepper-desc">{{ $t("reviewAndSubmit") }}</div>
                  </div>
                  <!--end::reviewAndSubmit-->
                </div>
                <!--end::Step 5-->
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Form-->
              <form
                class="form"
                :validation-schema="createAppSchema"
                id="kt_modal_create_app_form"
                @submit="handleStep"
              >
                <!--begin::Step 1-->
                <div class="current" data-kt-stepper-element="content">
                  <div class="w-100">
                    <div class="fv-row">
                      <!--begin::currentBalance-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">{{ $t("currentBalance") }}</span>
                      </label>
                      <!--end::currentBalance-->

                      <!--begin:Options-->
                      <div class="fv-row">
                        <!--begin:Option-->
                        <label class="d-flex flex-stack mb-5 cursor-pointer">
                          <!--begin:Label-->
                          <span class="d-flex align-items-center me-2">
                            <!--begin:Icon-->
                            <span class="symbol symbol-50px me-6">
                              <span class="symbol-label bg-light-primary">
                                <span
                                  class="svg-icon svg-icon-1 svg-icon-primary"
                                >
                                  <inline-svg
                                    src="/media/icons/duotune/maps/map004.svg"
                                  />
                                </span>
                              </span>
                            </span>
                            <!--end:Icon-->

                            <!--begin:Info-->
                            <span class="d-flex flex-column">
                              <span class="fw-bolder fs-6">
                                {{ WalletDetails.availableBalance }}</span
                              >
                            </span>
                            <!--end:Info-->
                          </span>
                          <!--end:Label-->
                        </label>
                        <!--end::Option-->

                        <!--end::Option-->
                      </div>
                      <!--end:Options-->
                    </div>
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="">{{ $t("amount") }} </span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Specify your unique app name"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        type="number"
                        class="form-control form-control-lg form-control-solid"
                        name="amount"
                        v-model="depositForm.amount"
                        placeholder=""
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="amount"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->

                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span>{{ $t("selectAccountType") }}</span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Specify your apps accountId"
                        ></i>
                      </label>
                      <!--end::Label-->
                      <div>
                        <!--begin::Wrapper-->
                        <div class="pb-10">
                          <!--begin::Option-->
                          <Field
                            type="radio"
                            class="btn-check"
                            name="accountTypeMthod"
                            value="myAccount"
                            v-model="depositForm.accountTypeMthod"
                            id="kt_modal_two_factor_authentication_option_1"
                            @change="check($event)"
                          />
                          <label
                            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-5"
                            for="kt_modal_two_factor_authentication_option_1"
                          >
                            <span class="svg-icon svg-icon-3x me-5">
                              <inline-svg
                                src="/media/icons/duotune/communication/com005.svg"
                              />
                            </span>

                            <span class="d-block fw-bold text-start">
                              <span class="text-dark fw-bolder d-block fs-3">{{
                                $t("myAccounts")
                              }}</span>
                            </span>
                          </label>
                          <!--end::Option-->

                          <!--begin::Option-->
                          <Field
                            type="radio"
                            v-model="depositForm.accountTypeMthod"
                            class="btn-check"
                            name="accountTypeMthod"
                            value="newAccount"
                            id="kt_modal_two_factor_authentication_option_2"
                            @change="check($event)"
                          />
                          <label
                            class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                            for="kt_modal_two_factor_authentication_option_2"
                          >
                            <span class="svg-icon svg-icon-3x me-5">
                              <inline-svg
                                src="/media/icons/duotune/finance/fin006.svg"
                              />
                            </span>

                            <span class="d-block fw-bold text-start">
                              <span class="text-dark fw-bolder d-block fs-3">{{
                                $t("newAccount")
                              }}</span>
                            </span>
                          </label>
                          <!--end::Option-->
                        </div>
                        <!--end::Options-->
                      </div>
                      <!--begin:Option-->

                      <!--end::Option-->

                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="accountTypeMthod"
                      />
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->

                      <!--begin:Option-->
                      <div
                        :class="[state !== 'myAccount' && 'd-none']"
                        data-kt-element="myAccount"
                      >
                        <!--begin::Heading-->
                        <label
                          class="d-flex flex-stack cursor-pointer mb-5"
                          v-for="account in MyAccounts"
                        >
                          <!--begin:Label-->
                          <span class="d-flex align-items-center me-2">
                            <!--begin:Icon-->
                            <span class="symbol symbol-50px me-6">
                              <span class="symbol-label bg-light-warning">
                                <i class="fab fa-html5 text-warning fs-2x"></i>
                              </span>
                            </span>
                            <!--end:Icon-->

                            <!--begin:Info-->
                            <span class="d-flex flex-column">
                              <span class="fw-bolder fs-6">
                                {{ account.name }}</span
                              >

                              <span class="fs-7 text-muted">{{
                                account.accountSubType
                              }}</span>
                            </span>
                            <!--end:Info-->
                          </span>
                          <!--end:Label-->

                          <!--begin:Input-->
                          <span
                            class="form-check form-check-custom form-check-solid"
                          >
                            <Field
                              class="form-check-input"
                              type="radio"
                              checked
                              name="accountId"
                              :value="account.accountId"
                              v-model="depositForm.accountId"
                            />
                          </span>
                          <!--end:Input-->
                        </label>
                        <!--end::Description-->
                      </div>
                      <div
                        :class="[state !== 'newAccount' && 'd-none']"
                        data-kt-element="newAccount"
                      >
                        <!--begin::Heading-->
                        <h3 class="text-dark fw-bolder fs-3 mb-5">
                          {{ $t("accountInfo") }}
                        </h3>
                        <!--end::Heading-->

                        <!--begin::Notice-->
                        <div class="text-gray-400 fw-bold mb-10">
                          {{ $t("enterYourAccountDetails") }}
                        </div>
                        <!--end::Notice-->

                        <!--begin::Form-->
                        <Form class="form" ref="accountForm">
                          <!--begin::Input group-->
                          {{ accountType }}
                          <div class="mb-10 fv-row">
                            <div class="col-12 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                                >{{ $t("accountName") }}</label
                              >

                              <Field
                                name="name"
                                type="text"
                                v-model="depositForm.name"
                              >
                                <input
                                  v-model="depositForm.name"
                                  class="form-control form-control-solid form-control-lg"
                                  type="text"
                                />
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="name"
                              ></ErrorMessage>
                            </div>
                            <div class="col-12 my-3">
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                                >{{ $t("accountType") }}</label
                              >

                              <Field
                                name="accountType"
                                type="text"
                                v-model="depositForm.accountType"
                              >
                                <el-select
                                  @change="
                                    accountSubtypes(depositForm.accountType)
                                  "
                                  class="w-100 form-control-solid border-0"
                                  v-model="depositForm.accountType"
                                  :placeholder="$t('enterKeyword')"
                                >
                                  <el-option
                                    v-for="item in accountTypes"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="parseInt(item.id)"
                                    :class="{ 'd-none': item.id == 1 }"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="accountType"
                              ></ErrorMessage>
                            </div>
                            <div
                              class="col-12 my-3"
                              v-show="depositForm.accountType != '3'"
                            >
                              <label
                                class="required fs-5 fw-bold mb-2 d-inline"
                                >{{ $t("accountSubType") }}</label
                              >
                              <Field
                                name="accountSubTypeId"
                                type="text"
                                v-model="depositForm.accountSubTypeId"
                              >
                                <el-select
                                  class="w-100 form-control-solid border-0"
                                  v-model="depositForm.accountSubTypeId"
                                  :placeholder="$t('enterKeyword')"
                                >
                                  <el-option
                                    v-for="item in accountSubTypesId"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id"
                                  >
                                  </el-option>
                                </el-select>
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="accountSubTypeId"
                              ></ErrorMessage>
                            </div>
                            <!--end::account subtypes -->
                            <!--start::walletId -->
                            <div
                              v-if="depositForm.accountType == '2'"
                              class="col-12 my-3"
                            >
                              <label class="required fs-5 fw-bold mb-2">{{
                                $t("walletId")
                              }}</label>
                              <Field
                                name="walletId"
                                type="text"
                                v-model="depositForm.walletId"
                                v-slot="{ field, meta }"
                              >
                                <input
                                  v-bind="field"
                                  class="form-control form-control-solid form-control-lg"
                                  type="number"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }"
                                />
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="walletId"
                              ></ErrorMessage>
                            </div>
                            <!--end::walletId -->

                            <!--start::bankIBANNumber -->
                            <div
                              v-if="depositForm.accountType == '4'"
                              class="col-12 my-3"
                            >
                              <label class="required fs-5 fw-bold mb-2">{{
                                $t("bankIBANNumber")
                              }}</label>
                              <Field
                                name="bankIBANNumber"
                                type="text"
                                v-model="depositForm.bankIBANNumber"
                                v-slot="{ field, meta }"
                              >
                                <input
                                  v-bind="field"
                                  class="form-control form-control-solid form-control-lg"
                                  type="number"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }"
                                />
                              </Field>
                              <ErrorMessage
                                class="text-danger"
                                name="bankIBANNumber"
                              ></ErrorMessage>
                            </div>
                            <!--end::bankIBANNumber -->

                            <!--begin::bankCard-->

                            <div
                              v-if="depositForm.accountType == '3'"
                              class="bank-card"
                            >
                              <div class="row">
                                <!--start::bankCardUserName -->

                                <div class="d-flex flex-column mb-7 fv-row">
                                  <!--begin::Label-->
                                  <label
                                    class="required fs-6 fw-bold form-label mb-2"
                                    >{{ $t("cardNumber") }}</label
                                  >
                                  <!--end::Label-->

                                  <!--begin::Input wrapper-->
                                  <div class="position-relative">
                                    <!--begin::Input-->
                                    <Field
                                      @input="
                                        formatCardNumber($event.target.value)
                                      "
                                      class="form-control"
                                      placeholder="Enter card number"
                                      name="bankCardNumber"
                                      v-model="depositForm.bankCardNumber"
                                    />
                                    <div class="fv-plugins-message-container">
                                      <div class="fv-help-block">
                                        <ErrorMessage name="bankCardNumber" />
                                      </div>
                                    </div>
                                    <!--end::Input-->

                                    <!--begin::Card logos-->
                                    <div
                                      class="position-absolute translate-middle-y top-50 end-0 me-5"
                                    >
                                      <img
                                        v-if="visaCard"
                                        src="/media/svg/card-logos/visa.svg"
                                        alt=""
                                        class="h-25px"
                                      />
                                      <img
                                        v-if="masterCard"
                                        src="/media/svg/card-logos/mastercard.svg"
                                        alt=""
                                        class="h-25px"
                                      />
                                      <img
                                        v-if="americanExpressCard"
                                        src="/media/svg/card-logos/american-express.svg"
                                        alt=""
                                        class="h-25px"
                                      />
                                    </div>
                                    <!--end::Card logos-->
                                  </div>
                                  <!--end::Input wrapper-->
                                </div>
                                <!--end::bankCardUserName -->
                              </div>

                              <div class="row">
                                <!--start::bankCardNumber -->
                                <div class="col-6 my-3">
                                  <label class="required fs-5 fw-bold mb-2">{{
                                    $t("bankCardUserName")
                                  }}</label>
                                  <Field
                                    name="bankCardUserName"
                                    type="text"
                                    v-model="depositForm.bankCardUserName"
                                    v-slot="{ field, meta }"
                                  >
                                    <input
                                      v-bind="field"
                                      class="form-control form-control-solid form-control-lg"
                                      type="text"
                                      :class="{
                                        'is-valid': meta.valid,
                                        'is-invalid':
                                          meta.validated && !meta.valid,
                                      }"
                                    />
                                  </Field>
                                  <ErrorMessage
                                    class="text-danger"
                                    name="bankCardUserName"
                                  ></ErrorMessage>
                                </div>
                                <!--end::bankCardNumber -->

                                <!--start::bankCardSecurityNumber -->
                                <div class="col-6 my-3">
                                  <label class="required fs-5 fw-bold mb-2">{{
                                    $t("bankCardSecurityNumber")
                                  }}</label>
                                  <Field
                                    name="bankCardSecurityNumber"
                                    type="text"
                                    v-model="depositForm.bankCardSecurityNumber"
                                    v-slot="{ field, meta }"
                                  >
                                    <input
                                      v-bind="field"
                                      class="form-control form-control-solid form-control-lg"
                                      type="number"
                                      :class="{
                                        'is-valid': meta.valid,
                                        'is-invalid':
                                          meta.validated && !meta.valid,
                                      }"
                                    />
                                  </Field>
                                  <ErrorMessage
                                    class="text-danger"
                                    name="bankCardSecurityNumber"
                                  ></ErrorMessage>
                                </div>
                                <!--end::bankCardSecurityNumber -->
                              </div>
                              <div class="row">
                                <!--begin::bankCardExpiryMonth-->
                                <div class="col-6 my-3">
                                  <label class="required fs-5 fw-bold mb-2">{{
                                    $t("bankCardExpiryMonth")
                                  }}</label>
                                  <Field
                                    name="bankCardExpiryMonth"
                                    type="date"
                                    v-slot="{ field, meta }"
                                  >
                                    <div class="flex-grow-1">
                                      <ElDatePicker
                                        v-model="
                                          depositForm.bankCardExpiryMonth
                                        "
                                        v-bind="field"
                                        type="month"
                                        :placeholder="$t('bankCardExpiryMonth')"
                                        class="w-100"
                                        format="MM"
                                        value-format="MM"
                                        :class="{
                                          'is-valid': meta.valid,
                                          'is-invalid':
                                            meta.validated && !meta.valid,
                                        }"
                                      ></ElDatePicker>
                                    </div>
                                  </Field>
                                  <ErrorMessage
                                    class="text-danger"
                                    name="bankCardExpiryMonth"
                                  ></ErrorMessage>
                                </div>
                                <!--end::bankCardExpiryMonth -->

                                <!--begin::bankCardExpiryYear-->
                                <div class="col-6 my-3">
                                  <label class="required fs-5 fw-bold mb-2">{{
                                    $t("bankCardExpiryYear")
                                  }}</label>
                                  <Field
                                    name="bankCardExpiryYear"
                                    type="date"
                                    v-slot="{ field, meta }"
                                  >
                                    <div class="flex-grow-1">
                                      <ElDatePicker
                                        v-model="depositForm.bankCardExpiryYear"
                                        v-bind="field"
                                        type="year"
                                        :placeholder="$t('bankCardExpiryYear')"
                                        class="w-100"
                                        format="YYYY"
                                        value-format="YYYY"
                                        :class="{
                                          'is-valid': meta.valid,
                                          'is-invalid':
                                            meta.validated && !meta.valid,
                                        }"
                                      ></ElDatePicker>
                                    </div>
                                  </Field>
                                  <ErrorMessage
                                    class="text-danger"
                                    name="bankCardExpiryYear"
                                  ></ErrorMessage>
                                </div>
                                <!--end::bankCardExpiryYear -->
                              </div>
                            </div>
                          </div>
                          <!--end::Input group-->

                          <!--begin::Actions-->
                          <div class="d-flex flex-stack">
                            <!--begin::Label-->
                            <div class="me-5">
                              <label class="fs-6 fw-bold form-label">
                                {{ $t("saveAccountforfurtherbilling?") }}
                              </label>
                            </div>
                            <!--end::Label-->

                            <!--begin::Switch-->
                            <label
                              class="form-check form-switch form-check-custom form-check-solid"
                            >
                              <input
                                class="form-check-input"
                                type="checkbox"
                                v-model="saveAccount"
                              />
                              <span
                                class="form-check-label fw-bold text-gray-400"
                              >
                                {{ $t("saveAccount") }}
                              </span>
                            </label>
                            <!--end::Switch-->
                          </div>
                          <!--end::Actions-->
                        </Form>
                        <!--end::Form-->
                      </div>
                      <!--end::Option-->

                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="accountId"
                      />
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2">
                        {{ $t("yourPassword") }}
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        name="password"
                        placeholder=""
                        v-model="depositForm.password"
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="password"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2">
                        {{ $t("notes") }}
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        type="text"
                        class="form-control form-control-lg form-control-solid"
                        name="notes"
                        placeholder=""
                        v-model="depositForm.notes"
                      />
                      <ErrorMessage
                        class="fv-plugins-message-container invalid-feedback"
                        name="notes"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->

                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">{{ $t("done") }}</h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <div class="text-muted fw-bold fs-3">
                      {{ $t("submitYourInfoToDeposit") }}
                    </div>
                    <!--end::Description-->

                    <!--begin::Illustration-->
                    <div class="text-center px-4 py-15">
                      <img
                        :src="getIllustrationsPath('9.png')"
                        alt=""
                        class="mw-100 mh-300px"
                      />
                    </div>
                    <!--end::Illustration-->
                  </div>
                </div>
                <!--end::Step 5-->

                <!--begin::Actions-->
                <div class="d-flex flex-stack pt-10">
                  <!--begin::Wrapper-->
                  <div class="me-2">
                    <button
                      type="button"
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      @click="previousStep()"
                    >
                      <span class="svg-icon svg-icon-3 me-1">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr063.svg"
                        />
                      </span>
                      {{ $t("back") }}
                    </button>
                  </div>
                  <!--end::Wrapper-->

                  <!--begin::Wrapper-->
                  <div>
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      v-if="currentStepIndex === totalSteps - 1"
                      @click="formSubmit()"
                    >
                      <span class="indicator-label" v-if="!isLoading">
                        {{ $t("submit") }}
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg
                            src="/media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </span>
                      <span v-if="isLoading" class="indicator-progress d-block">
                        {{ $t("wait") }}
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        />
                      </span>
                    </button>

                    <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      v-if="currentStepIndex !== totalSteps - 1"
                    >
                      {{ $t("continue") }}
                      <span class="svg-icon svg-icon-3 ms-1 me-0">
                        <inline-svg
                          src="/media/icons/duotune/arrows/arr064.svg"
                        />
                      </span>
                    </button>
                  </div>
                  <!--end::Wrapper-->
                </div>
                <!--end::Actions-->
              </form>
              <!--end::Form-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f5f8fa;
}

.el-input__inner {
  background-color: #f5f8fa;
}
</style>

<script lang="ts">
import i18n from "@/core/plugins/i18n";
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  watch,
} from "vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useForm } from "vee-validate";
import { Field, ErrorMessage } from "vee-validate";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { getIllustrationsPath } from "@/core/helpers/assets";
import { useStore } from "vuex";

interface Step1 {
  amount: number;
  shopId: string;
}
interface Step2 {
  accountTypeMthod: string;
}

// interface Step3 {
//   accountId: string;
// }

interface Step4 {
  notes: string;
  password: string;
}

interface Step3 {
  name: string;
  accountId: string;
  accountType: string;
  accountSubTypeId: string;
  walletId: string;
  bankCardUserName: string;
  bankCardNumber: string;
  bankCardExpiryMonth: string;
  bankCardExpiryYear: string;
  bankCardSecurityNumber: string;
  bankIBANNumber: string;
}

interface KTCreateApp extends Step1, Step2, Step3, Step4 {}

export default defineComponent({
  name: "create-app-modal",
  components: {
    Field,

    ErrorMessage,
  },
  setup() {
    const state = ref("");
    const visaCard = ref(false);
    const masterCard = ref(false);
    const americanExpressCard = ref(false);
    const value = ref("myAccount");
    const WalletDetails = computed(
      () => store.state.WalletModule.WalletDetails
    );
    const store = useStore();
    const MyAccounts = computed(
      () => store.state.AllAccounts.InDepositeToWallet
    );

    const _stepperObj = ref<StepperComponent | null>(null);
    const createAppRef = ref<HTMLElement | null>(null);
    const createAppModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);

    let accountType = ref("");
    const depositForm = ref<KTCreateApp>({
      accountSubTypeId: "",
      name: "",
      shopId: "",
      accountTypeMthod: "",
      password: "",
      accountType: "",
      accountId: "",
      amount: 1,
      notes: "",

      walletId: "",
      bankIBANNumber: "",
      bankCardUserName: "",
      bankCardNumber: "",
      bankCardSecurityNumber: "",
      bankCardExpiryMonth: "",
      bankCardExpiryYear: "",
    });
    const saveAccount = ref(false);

    const isLoading = ref(false);

    let form = reactive(depositForm);
    watch(depositForm.value, (newForm) => {
      let visaCardregex = new RegExp("4[0-9 ]{15}(?:[0-9]{3})?$");
      let masterCardregex = new RegExp(
        "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9 ]{15}$"
      );

      let americanExpressCardregex = new RegExp("3[47][0-9 ]{16}$");
      visaCard.value = visaCardregex.test(depositForm.value.bankCardNumber);
      masterCard.value = masterCardregex.test(depositForm.value.bankCardNumber);
      americanExpressCard.value = americanExpressCardregex.test(
        depositForm.value.bankCardNumber
      );

      if (visaCard.value) {
        depositForm.value.accountSubTypeId = "3";
      } else if (masterCard.value) {
        depositForm.value.accountSubTypeId = "4";
      } else if (americanExpressCard.value) {
        depositForm.value.accountSubTypeId = "5";
      }
    });
    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createAppRef.value as HTMLElement
      );
    });

    const createAppSchema = [
      Yup.object({
        amount: Yup.number()
          .lessThan(
            WalletDetails.value.availableBalance,
            "Amount should be less than Current Balanc"
          )
          .required()
          .label("Amount"),
      }),
      Yup.object({
        accountTypeMthod: Yup.string().required().label("accountTypeMthod"),
        // accountId: Yup.string().required().label("accountId"),
      }),
      Yup.object({
        accountId: Yup.string().when("accountTypeMthod", (accountTypeMthod) => {
          if (accountTypeMthod === "myAccount") {
            console.log("accountTypeMthod", accountTypeMthod);
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        name: Yup.string().when("accountTypeMthod", (accountTypeMthod) => {
          if (accountTypeMthod === "newAccount") {
            console.log("accountTypeMthod", accountTypeMthod);
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        accountType: Yup.string().when(
          "accountTypeMthod",
          (accountTypeMthod) => {
            if (accountTypeMthod === "newAccount") {
              console.log("accountTypeMthod", accountTypeMthod);
              return Yup.string().required(i18n.global.t("fieldRequired"));
            } else {
              return Yup.string();
            }
          }
        ),
        accountSubTypeId: Yup.string().when(
          "accountTypeMthod",
          (accountTypeMthod) => {
            if (accountTypeMthod === "newAccount") {
              return Yup.string().required(i18n.global.t("fieldRequired"));
            } else {
              return Yup.string();
            }
          }
        ),
        walletId: Yup.string().when("accountType", (accountType) => {
          if (accountType === "2") {
            console.log("accountTypeyes", accountType);
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        bankIBANNumber: Yup.string().when("accountType", (accountType) => {
          if (accountType === "4") {
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        bankCardUserName: Yup.string().when("accountType", (accountType) => {
          console.log("accountType", accountType);

          if (accountType === "3") {
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        bankCardNumber: Yup.string().when("accountType", (accountType) => {
          if (accountType === "3") {
            return Yup.string()
              .min(13, i18n.global.t("cardNumNotValid"))
              .max(19, i18n.global.t("cardNumNotValid"))
              .required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        bankCardSecurityNumber: Yup.string().when(
          "accountType",
          (accountType) => {
            if (accountType === "3") {
              return Yup.string()
                .min(3, i18n.global.t("cardSecurtyNumNotValid"))
                .max(3, i18n.global.t("cardSecurtyNumNotValid"))
                .required(i18n.global.t("fieldRequired"));
            } else {
              return Yup.string();
            }
          }
        ),
        bankCardExpiryMonth: Yup.string().when("accountType", (accountType) => {
          if (accountType === "3") {
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
        bankCardExpiryYear: Yup.string().when("accountType", (accountType) => {
          if (accountType === "3") {
            return Yup.string().required(i18n.global.t("fieldRequired"));
          } else {
            return Yup.string();
          }
        }),
      }),

      Yup.object({
        notes: Yup.string().required().label("notes"),
        password: Yup.string().required().label("password"),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const { resetForm, handleSubmit } = useForm<Step1 | Step2 | Step3 | Step4>({
      validationSchema: currentSchema,
    });

    const goto = () => {
      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goFirst();
      _stepperObj.value.destroy();
    };
    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };
    const check = (v) => {
      console.log(v);
      state.value = v.target.value;
      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    };
    const handleStep = handleSubmit((values) => {
      if (saveAccount.value && currentStepIndex.value == 2) {
        Object.keys(depositForm.value).forEach((key) => {
          if (depositForm.value[key] === "") {
            delete depositForm.value[key];
          }
        });
        store.dispatch(Actions.ADD_ACCOUNT, depositForm.value).then(() => {
          Swal.fire({
            text: `Account  Added Successfully ! `,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-primary",
            },
          });
        });
      }

      if (currentStepIndex.value < 4) {
        currentStepIndex.value++;
      }

      if (!_stepperObj.value) {
        return;
      }
      // console.log('_stepperObj.value',_stepperObj.value.destroy())

      _stepperObj.value.goNext();
    });

    function removeForm() {
      currentStepIndex.value = 0;
      depositForm.value.accountSubTypeId = "";
      depositForm.value.shopId = "";
      depositForm.value.accountTypeMthod = "";
      depositForm.value.password = "";
      depositForm.value.accountType = "";
      depositForm.value.accountId = "";
      depositForm.value.amount = 0;
      depositForm.value.notes = "";
      depositForm.value.walletId = "";
      depositForm.value.bankIBANNumber = "";
      depositForm.value.bankCardUserName = "";
      depositForm.value.bankCardNumber = "";
      depositForm.value.bankCardSecurityNumber = "";
      depositForm.value.bankCardExpiryMonth = "";
      depositForm.value.bankCardExpiryYear = "";
    }
    const formSubmit = async (values: any) => {
      console.log(values);
      isLoading.value = true;
      depositForm.value.bankCardNumber = depositForm.value.bankCardNumber;
      depositForm.value.shopId = WalletDetails.value.shopId;
      Object.keys(depositForm.value).forEach((key) => {
        if (depositForm.value[key] === "") {
          delete depositForm.value[key];
        }
      });
      store
        .dispatch(Actions.DEPOSITE_TO_WALLET, depositForm.value)
        .then((res) => {
          removeForm();
          goto();
          saveAccount.value = false;

          hideModal(createAppModalRef.value);
          isLoading.value = false;
        });
    };

    const accountTypes = computed(() => store.getters.getAccountTypes);
    const accountSubTypesId = computed(() => store.getters.getAccountSubTypes);
    const accountSubtypes = (id) => {
      store.dispatch(Actions.GET_ACCOUNT_SUBTYPES, {
        accountTypeId: id,
      });
      depositForm.value.accountSubTypeId = "";
      depositForm.value.bankCardExpiryMonth = "";
      depositForm.value.bankCardExpiryYear = "";
      depositForm.value.bankCardNumber = "";
      depositForm.value.bankIBANNumber = "";
      depositForm.value.bankCardSecurityNumber = "";
      depositForm.value.bankCardUserName = "";
      depositForm.value.walletId = "";
    };

    const formatCardNumber = (target) => {
      console.log(target);
      depositForm.value.bankCardNumber = target
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    };

    return {
      removeForm,
      saveAccount,
      formatCardNumber,
      goto,

      accountSubtypes,

      visaCard,
      masterCard,
      americanExpressCard,

      state,
      accountTypes,
      accountSubTypesId,
      accountType,
      isLoading,
      depositForm,
      form,
      check,
      value,
      handleStep,
      WalletDetails,
      formSubmit,

      previousStep,
      createAppRef,
      currentStepIndex,
      totalSteps,
      createAppModalRef,
      getIllustrationsPath,

      MyAccounts,
    };
  },
});
</script>
<style>
.h-25px {
  height: 27px !important;
  margin-bottom: 10px;
}
</style>
