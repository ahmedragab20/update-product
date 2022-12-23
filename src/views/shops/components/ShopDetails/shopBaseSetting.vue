<template>
  <!--begin::Basic info-->
  <div>
  <div class="content d-flex flex-column flex-column-fluid" >
    <!--begin::Container-->

    <!--begin::Form-->
    <Form
    id="kt_account_profile_details_form"
          class="form" 
      @submit="saveChanges"
      :validation-schema="ShopDetailsValidator"
    >
      <!--begin::Aside column-->
      <div class="row">
      <div class="col col-lg-4">
        <!--begin::Thumbnail settings-->
        <div class="card card-flush py-4 mb-4">
          <div class="card-body text-center pt-0">
            <!--begin::Image input-->

            <!--begin::Row-->
           
                <Field
                  type="file"
                  v-slot="{ field }"
                  class="form-control form-control-lg form-control-solid"
                  name="logoPath"
                  placeholder=""
                  value=""
                >
              
                  <div
                    v-bind="field"
                    class="image-input image-input-outline"
                    data-kt-image-input="true"
                    style="background-image: url(media/avatars/blank.png)"
                  >
                    <!--begin::Preview existing logo-->
                    <img
                      class="image-input-wrapper w-200px h-200px mt-10"
                      :src="ShopDetails.logoPath"
                    />
                    <!--end::Preview existing logo-->

                    <!--begin::Label-->
                    <label
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                      data-kt-image-input-action="change"
                      data-bs-toggle="tooltip"
                      title="Change logo"
                    >
                      <i class="bi bi-pencil-fill fs-7" />

                      <!--begin::Inputs-->
                      <input
                        type="file"
                        name="logo"
                        accept=".png, .jpg, .jpeg"
                        @change="handleFileUpload"
                      />
                      <input type="hidden" name="logo_remove" />
                      <!--end::Inputs-->
                    </label>
                    <!--end::Label-->

                    <!--begin::Remove-->
                    <span
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                      data-kt-image-input-action="remove"
                      data-bs-toggle="tooltip"
                      title="Remove logo"
                      @click="removeImage()"
                    >
                      <i class="bi bi-x fs-2" />
                    </span>
                    <!--end::Remove-->
                  </div>
                  <!--end::Image input-->

                

              
                </Field>
                <ErrorMessage
                  name="logoPath"
                  class="fv-plugins-message-container invalid-feedback"
                />
              
                <!--end::isAvailableOnJetOrder-->
          

          </div>
        </div>

          <!--end::Thumbnail settings-->
          <div class="card card-flush py-4 mb-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("resources") }}</h2>
              </div>
            </div>
            <div class="card-body pt-0 row">
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-12">
                <editor>
                  <template #upper>
                    <tabs-duplicator
                      :items="currentLangs"
                      @selectedItem="setSelectedItem"
                    >
                      <template #label="{ item }">
                        {{ item.label }}
                      </template>
                    </tabs-duplicator>
                  </template>
                  <template #fields>
                    <div
                      dir="auto"
                      v-for="(item, i) in ShopDetails.resources"
                      :key="i"
                    >
                      <div class="fields">
                        <div
                          class="my-9"
                          v-show="
                            parseInt(item.languageId) ==
                            parseInt(selectedItem?.id)
                          "
                        >
                          <label class="form-label required mb-3">{{ $t("name") }}</label>
                          <Field
                            v-model="ShopDetails.resources[i].name"
                            :name="`resources[${i}].name`"
                            type="text"
                            v-slot="{ field, meta }"
                            :label="`name`"
                          >
                            <input
                              v-bind="field"
                              v-model="ShopDetails.resources[i].name"
                              :dir="selectedItem.dir"
                              type="text"
                              class="form-control form-control-solid form-control-lg"
                            />
                          </Field>
                          <label
                            class="col-form-label text-gray-400 fw-normal d-block pt-0"
                          >
                            {{ $t("pleaseEnterShopName") }}
                          </label>
                          <ErrorMessage
                            :name="`resources[${i}].name`"
                            class="text-danger"
                          >
                          </ErrorMessage>

                          <label class="form-label required mb-3"
                            >{{ $t("detailedAddress") }}</label
                          >
                          <textarea
                            class="form-control form-control-lg form-control-solid"
                            v-model="ShopDetails.resources[i].detailedAddress"
                          />
                          <label
                            class="col-form-label text-gray-400 fw-normal d-block pt-0"
                          >
                            {{ $t("pleaseEnterAddress") }}
                          </label>
                        </div>
                      </div>
                      <!--  -->
                    </div>
                  </template>
                </editor>
              </div>
            </div>
          </div>

          <div class="card card-flush py-4 mb-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("shopContacts") }}</h2>
              </div>
            </div>
            <div
                class="modal fade"
                id="kt_modal_new_shop"
                tabindex="-1"
                aria-hidden="true"
                ref="addContactModalRef"
              >
                <!--begin::Modal dialog-->
                <div class="modal-dialog modal-dialog-centered mw-650px">
                  <!--begin::Modal content-->
                  <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header">
                    
                      <!--begin::Modal title-->
                      <h2>{{ $t("newShopContact") }}</h2>
                      <!--end::Modal title-->
                      <!--begin::Close-->
                      <div
                        class="btn btn-sm btn-icon btn-active-color-primary"
                        data-bs-dismiss="modal"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.5"
                              x="6"
                              y="17.3137"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(-45 6 17.3137)"
                              fill="currentColor"
                            />
                            <rect
                              x="7.41422"
                              y="6"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(45 7.41422 6)"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <!--begin::Form-->
                      <Form
                        id="kt_modal_edit_shop_form"
                        class="form"
                     
                        :validation-schema="shopContactSchema"
                        @submit="addnewShopContacts"
                      >
                        <div class="col-12 row">
                          <!--begin::Row-->

                      <div class="col-6 mb-2">
                        <!--begin::Input-->
                        <Field
                          v-slot="{ field }"
                          type="text"
                          v-model="newShop.contactTypeId"
                          class="form-control form-control-solid"
                          name="contactTypeId"
                        >
                          <Multiselect
                            v-model="newShop.contactTypeId"
                            v-bind="field"
                            :searchable="true"
                            label="code"
                            placeholder="Enter Contact Type"
                            value-prop="id"
                            :classes="{
                              container:
                                'multiselect-lg form-control  form-control-solid',
                              search:
                                'multiselect-search form-control form-control-solid',
                              clear: 'multiselect-lg-clear',
                            }"
                            :options="contactsType"
                          />
                        </Field>
                        <ErrorMessage
                          name="contactTypeId"
                          class="fv-plugins-message-container invalid-feedback"
                        />
                        <!--end::Input-->
                      </div>
                      <div class="col-6 mb-2">
                        <!--begin::Row-->

                        <!--begin::Col-->
                        <Field
                          type="text"
                          name="label"
                          class="form-control form-control-solid mb-3 mb-lg-0"
                          placeholder="Enter Label"
                          v-model="newShop.label"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="label"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                          </div>
                        </div>

                        <!--end::Col-->

                        <!--end::Row-->
                      </div>
                      <div class="col-6 mb-2">
                        <!--begin::Row-->

                        <!--begin::Col-->
                        <Field
                          type="text"
                          placeholder="Enter Value"
                          name="value"
                          class="form-control form-control-solid mb-3 mb-lg-0"
                          v-model="newShop.value"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="value"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                          </div>
                        </div>

                        <!--end::Col-->

                        <!--end::Row-->
                      </div>
                      <div class="col-6 mb-2">
                        <!--begin::Row-->

                        <!--begin::Col-->
                        <Field
                          type="text"
                          placeholder="Enter Notes"
                          name="notes"
                          class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          v-model="newShop.notes"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="notes"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                          </div>
                        </div>

                        <!--end::Col-->

                            <!--end::Row-->
                          </div>
                          <!--end::Row-->
                        </div>
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                          <button
                          type="submit"
                            
                            class="btn btn-primary"
                       
                          >
                            <span >{{ $t("save") }}</span>
                          
                          </button>
                        </div>
                        <!--end::Actions-->
                      </Form>
                      <!--end::Form-->
                    </div>
                    <!--end::Modal body-->
                  </div>
                  <!--end::Modal content-->
                </div>
                <!--end::Modal dialog-->
              </div>
            <div
              class="row gx-9 gy-6 p-6"
              v-for="(item, index) in ShopDetails.shopContacts"
            >
              
              <!--begin::Col-->
              <div
                class="modal fade"
                :id="`kt_modal_edit_shop_${item.id}`"
                tabindex="-1"
                aria-hidden="true"
                
              >
                <!--begin::Modal dialog-->
                <div class="modal-dialog modal-dialog-centered mw-650px">
                  <!--begin::Modal content-->
                  <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header">
                      {{ item.id }}
                      <!--begin::Modal title-->
                      <h2>{{ $t("updateShopContact") }}</h2>
                      <!--end::Modal title-->
                      <!--begin::Close-->
                      <div
                        class="btn btn-sm btn-icon btn-active-color-primary"
                        data-bs-dismiss="modal"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.5"
                              x="6"
                              y="17.3137"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(-45 6 17.3137)"
                              fill="currentColor"
                            />
                            <rect
                              x="7.41422"
                              y="6"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(45 7.41422 6)"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <!--begin::Form-->
                      <Form
                        id="kt_modal_edit_shop_form"
                        class="form"
                        action="#"
                        :validation-schema="shopContactSchema"
                      >
                        <div class="col-12 row">
                          <!--begin::Row-->

                        <div class="col-6 mb-2">
                          <!--begin::Input-->
                          <Field
                            v-slot="{ field }"
                            type="text"
                            v-model="item.contactTypeId"
                            class="form-control form-control-solid"
                            :name="`contactTypeId`"
                          >
                            <Multiselect
                              disabled
                              v-model="item.contactTypeId"
                              v-bind="field"
                              :searchable="true"
                              label="code"
                              placeholder="Enter Contact Type"
                              value-prop="id"
                              :classes="{
                                container:
                                  'multiselect-lg form-control  form-control-solid',
                                search:
                                  'multiselect-search form-control form-control-solid',
                                clear: 'multiselect-lg-clear',
                              }"
                              :options="contactsType"
                            />
                          </Field>
                          <ErrorMessage
                            :name="`contactTypeId`"
                            class="fv-plugins-message-container invalid-feedback"
                          />
                          <!--end::Input-->
                        </div>
                        <div class="col-6 mb-2">
                          <!--begin::Row-->

                          <!--begin::Col-->
                          <Field
                            type="text"
                            :name="`label`"
                            class="form-control form-control-solid mb-3 mb-lg-0"
                            placeholder="Enter Label"
                            v-model="item.label"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage :name="`label`" />
                            </div>
                          </div>

                          <!--end::Col-->

                          <!--end::Row-->
                        </div>
                        <div class="col-6 mb-2">
                          <!--begin::Row-->

                          <!--begin::Col-->
                          <Field
                            type="text"
                            placeholder="Enter Value"
                            :name="`value`"
                            class="form-control form-control-solid mb-3 mb-lg-0"
                            v-model="item.value"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage :name="`value`" />
                            </div>
                          </div>

                          <!--end::Col-->

                          <!--end::Row-->
                        </div>
                        <div class="col-6 mb-2">
                          <!--begin::Row-->

                          <!--begin::Col-->
                          <Field
                            type="text"
                            placeholder="Enter Notes"
                            :name="`notes`"
                            class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            v-model="item.notes"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage :name="`notes`" />
                            </div>
                          </div>

                          <!--end::Col-->

                            <!--end::Row-->
                          </div>
                          <!--end::Row-->
                        </div>
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                          <a
                          role="button"
                            
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            <span class="indicator-label">{{ $t("save") }}</span>
                            
                        </a>
                        </div>
                        <!--end::Actions-->
                      </Form>
                      <!--end::Form-->
                    </div>
                    <!--end::Modal body-->
                  </div>
                  <!--end::Modal content-->
                </div>
                <!--end::Modal dialog-->
              </div>
              <div class="col-xl-12" data-kt-billing-element="card">
                <!--begin::Card-->
                <div
                  class="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6"
                >
                  <!--begin::Info-->
                  <div class="d-flex flex-column py-2">
                    <!--begin::Owner-->

                    <div class="d-flex align-items-center fs-4 fw-bold mb-5">
                      {{
                        contactsType?.find((x) => x.id === item.contactTypeId)?.code
                      }}
                    </div>
                    <!--end::Owner-->
                    <!--begin::Wrapper-->
                    <div class="d-flex align-items-center">
                      <!--begin::Icon-->
                      <img
                  src="/media/svg/brand-logos/github.svg"
                  class="w-30px me-6"
                  alt=""
                />
                      <!--end::Icon-->
                      <!--begin::Details-->
                      <div>
                        <div class="fs-4 fw-bold">{{ item.value }}</div>
                        <div class="fs-6 fw-semibold text-gray-400">
                          {{ item.label }}
                        </div>
                        <div class="fs-6 fw-semibold text-gray-400">
                          {{ item.notes }}
                        </div>
                      </div>
                      <!--end::Details-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Info-->
                  <!--begin::Actions-->
                  <div class="d-flex align-items-center py-2">
                    <button
                    class="btn btn-sm btn-light-danger me-2"
                      @click="removeItemShopContacts(index)"
                    >
                      <!--begin::Indicator label-->
                      <span class="svg-icon svg-icon-danger">
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                      <!--end::Indicator label-->
                    
                      <!--end::Indicator progress-->
                    </button>
                    <a
                    role="button"
                      class="btn btn-sm btn-light btn-active-light-primary"
                      data-bs-toggle="modal"
                      :data-bs-target="`#kt_modal_edit_shop_${item.id}`"
                    >
                    <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                   </span>
                    </a>
                  </div>
                  <!--end::Actions-->
                </div>
                <!--end::Card-->
              </div>
              <!--end::Col-->

              <!--end::Col-->
            </div>
            <div class="card-body pt-0 row">
              <!--end::Label-->
              <label
                class="col-4 col-form-label required fw-bold fs-6"
                v-if="ShopDetails.shopContacts.length == 0"
                >{{ $t("noShopContactAvialable") }}
              </label>

              <!--begin::Col-->

              <!--end::Col-->
              <div class="col-12">
                <a
               
               
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_new_shop"
                  
                  type="button"
                  class="btn btn-lg btn-new"
                >
                  {{ $t("addAnotherShopContact") }}
                </a>
              </div>
            </div>
          </div>

        
        </div>
        <!--end::Aside column-->

        <!--begin::Main column-->
        <div class="col col-lg-8">
          <div class="card card-flush mb-4" >
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>{{ $t("languages") }}</h2>
              </div>
              <!--end::Card title-->
            </div>
            <div class="card-body text-center">
              <!--begin::Input-->
              <Field
                v-slot="{ field }"
                name="languageIds"
                class="form-control form-control-lg form-control-solid"
              >
                <Multiselect
                  v-model="ShopDetails.languages"
                  v-bind="field"
                  label="label"
                  value-prop="id"
                  :classes="{
                    container:
                      'multiselect-tags-lg form-control form-control-lg form-control-solid',
                    search:
                      'multiselect-search form-control form-control-solid',
                    clear: 'multiselect-lg-clear',
                    tagsSearch:
                      'multiselect-tags-search form-control form-control-solid',
                  }"
                  :options="languages"
                  mode="tags"
                />
              </Field>
              <label
                class="col-form-label text-gray-400 fw-normal d-block pt-0"
              >
                {{ $t("pleaseEnterLang") }}
              </label>
              <ErrorMessage
                name="languageIds"
                class="fv-plugins-message-container invalid-feedback"
              />
              <!--end::Input-->

            <!--begin::Col-->
          </div>
        </div>
   <!--end::Languages settings-->

          <div class="card card-flush py-4 mb-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("location") }}</h2>
              </div>
            </div>
            <!--end::Card header-->
            <!--begin::Card body-->
            <div class="card-body pt-0 row">
              <!--begin::Input group-->
              <div class="col-12 mb-6">
                <!--begin::Label-->
                <label class="col-4 col-form-label required fw-bold fs-6"
                  >{{ $t("countries") }}</label
                >
                <!--end::Label-->

              <!--begin::Col-->
              <div class="col-12">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <!--begin::Input-->
                  <Field
                    v-slot="{ field }"
                    type="text"
                    class="form-control form-control-lg form-control-solid"
                    name="countryId"
                    v-model="ShopDetails.countryId"
                  >
                    <Multiselect
                      v-bind="field"
                      v-model="ShopDetails.countryId"
                      :searchable="true"
                      label="name"
                      value-prop="id"
                      :can-clear="false"
                      :classes="{
                        container:
                          'multiselect-lg form-control form-control-lg form-control-solid',
                        search:
                          'multiselect-search form-control form-control-solid',
                      }"
                      :options="countries"
                      @input="onCountryChange"
                    >
                      <template #singlelabel="{ value }">
                        <div class="multiselect-single-label">
                          <div class="flag-container">
                            <img
                              :src="value.icon"
                              :alt="value.name"
                              width="20"
                              height="15"
                            />
                          </div>
                          <div class="dots-text">
                            {{ value.name }}
                          </div>
                        </div>
                      </template>

                        <template #option="{ option }">
                          <div class="flag-container">
                            <img
                              :src="option.icon"
                              :alt="option.name"
                              width="20"
                              height="15"
                            />
                          </div>
                          <div class="dots-text">
                            {{ option.name }}
                          </div>
                        </template>
                      </Multiselect>
                    </Field>
                    <label
                      class="col-form-label text-gray-400 fw-normal d-block pt-0"
                    >
                      {{ $t("pleaseEnterCountry") }}
                    </label>
                    <ErrorMessage
                      name="countryId"
                      class="fv-plugins-message-container invalid-feedback"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="col-12 mb-6">
                <!--begin::Label-->
                <label class="col-4 col-form-label required fw-bold fs-6"
                  >{{ $t("city") }}</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-12">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Input-->
                    <Field
                      v-slot="{ field }"
                      type="text"
                      class="form-control form-control-lg form-control-solid"
                      name="cityId"
                      v-model="ShopDetails.cityId"
                    >
                      <Multiselect
                        v-model="ShopDetails.cityId"
                        v-bind="field"
                        :searchable="true"
                        label="name"
                        value-prop="id"
                        :classes="{
                          container:
                            'multiselect-lg form-control form-control-lg form-control-solid',
                          search:
                            'multiselect-search form-control form-control-solid',
                          clear: 'multiselect-lg-clear',
                        }"
                        :options="cities"
                        @input="onCityChange"
                      />
                    </Field>
                    <label
                      class="col-form-label text-gray-400 fw-normal d-block pt-0"
                    >
                      {{ $t("pleaseEnterCity") }}
                    </label>
                    <ErrorMessage
                      name="cityId"
                      class="fv-plugins-message-container invalid-feedback"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <div class="col-12 mb-6">
                <!--begin::Label-->
                <label class="col-4 col-form-label required fw-bold fs-6"
                  >{{ $t("area") }}</label
                >
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-12">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Input-->
                    <Field
                      v-slot="{ field }"
                      type="text"
                      class="form-control form-control-lg form-control-solid"
                      name="areaId"
                      v-model="ShopDetails.areaId"
                    >
                      <Multiselect
                        v-model="ShopDetails.areaId"
                        v-bind="field"
                        :searchable="true"
                        label="name"
                        value-prop="id"
                        :classes="{
                          container:
                            'multiselect-lg form-control form-control-lg form-control-solid',
                          search:
                            'multiselect-search form-control form-control-solid',
                          clear: 'multiselect-lg-clear',
                        }"
                        :options="areas"
                        @input="onAreaChange"
                      />
                    </Field>
                    <label
                      class="col-form-label text-gray-400 fw-normal d-block pt-0"
                    >
                      {{ $t("pleaseEnterArea") }}
                    </label>
                    <ErrorMessage
                      name="areaId"
                      class="fv-plugins-message-container invalid-feedback"
                    />
                    <!--end::Input-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <div class="mb-10 fv-row">
                <!--begin::Label-->
                <label class="form-label required mb-3"
                  >{{ $t("location") }}
                </label>
                <!--end::Label-->
          
                <Field
                  v-slot="{ field }"
                  type="text"
                  class="form-control form-control-lg form-control-solid"
                  name="location"
                  style="height: 300px !important"
                >
                  <!-- <GoogleMaps @currentLocation="currentLocationF" /> -->
                  <LocationSelector
                    v-bind="field"
                    :center="center"
                    style="height: 300px !important"
                  />
                </Field>
                <ErrorMessage
                  name="location"
                  class="fv-plugins-message-container invalid-feedback"
                />
                <!--end::Input-->
              </div>
            </div>
          </div>
       
          <div class="card card-flush py-4 mb-4">
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("shopSocialMedia") }}</h2>
              </div>
            </div>
            <div
                class="modal fade"
                id="kt_modal_new_shop_social"
                tabindex="-1"
                aria-hidden="true"
                ref="addSocialMediaModalRef"
              >
                <!--begin::Modal dialog-->
                <div class="modal-dialog modal-dialog-centered mw-650px">
                  <!--begin::Modal content-->
                  <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header">
                    
                      <!--begin::Modal title-->
                      <h2>{{ $t("newShopSocialMedia") }}</h2>
                      <!--end::Modal title-->
                      <!--begin::Close-->
                      <div
                        class="btn btn-sm btn-icon btn-active-color-primary"
                        data-bs-dismiss="modal"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.5"
                              x="6"
                              y="17.3137"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(-45 6 17.3137)"
                              fill="currentColor"
                            />
                            <rect
                              x="7.41422"
                              y="6"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(45 7.41422 6)"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <!--begin::Form-->
                      <Form
                        id="kt_modal_edit_shop_form"
                        class="form"
                      
                        @submit="addnewSocialMediaType"
                        :validation-schema="socialMediaSchema"
                      >
                      <div class="row">
                      <div class="col-6 m-b">
                        <!--begin::Input-->
                        <Field
                          v-slot="{ field }"
                          type="text"
                          v-model="newShopSocial.socialMediaId"
                          class="form-control form-control-solid"
                          name="socialMediaId"
                        >
                          <Multiselect
                            v-model="newShopSocial.socialMediaId"
                            v-bind="field"
                            :searchable="true"
                            label="code"
                            value-prop="id"
                            placeholder="Enter Social Media Type "
                            :classes="{
                              container:
                                'multiselect-lg form-control  form-control-solid',
                              search:
                                'multiselect-search form-control form-control-solid',
                              clear: 'multiselect-lg-clear',
                            }"
                            :options="SocialMediaType"
                          />
                        </Field>
                        <ErrorMessage
                          name="socialMediaId"
                          class="fv-plugins-message-container invalid-feedback"
                        />
                        <!--end::Input-->
                      </div>
                      <div class="col-6 m-b">
                        <!--begin::Row-->

                        <!--begin::Col-->
                        <Field
                          type="text"
                          placeholder="Enter Label"
                          name="label"
                          class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          v-model="newShopSocial.label"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="label"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                          </div>

                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <div class="col-6 m-b">
                        <!--begin::Row-->

                        <!--begin::Col-->
                        <Field
                          type="text"
                          name="value"
                          class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          placeholder="Enter Value"
                          v-model="newShopSocial.value"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="value"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                          </div>
                        </div>

                        <!--end::Col-->

                        <!--end::Row-->
                      </div>
                      <div class="col-6 m-b">
                        <!--begin::Row-->

                        <!--begin::Col-->
                        <Field
                          type="text"
                          placeholder="Enter Notes"
                          name="notes"
                          class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                          v-model="newShopSocial.notes"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage
                              name="notes"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                          </div>
                        </div>

                        <!--end::Col-->

                  <!--end::Row-->
                </div>
              </div>
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                          <button
                          type="submit"
                            
                            class="btn btn-primary"
                          >
                            <span class="indicator-label">{{ $t("save") }}</span>
                            <span class="indicator-progress"
                              >{{ $t("pleaseWait") }}...
                              <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                              ></span
                            ></span>
                        </button>
                        </div>
                        <!--end::Actions-->
                      </Form>
                      <!--end::Form-->
                    </div>
                    <!--end::Modal body-->
                  </div>
                  <!--end::Modal content-->
                </div>
                <!--end::Modal dialog-->
              </div>
            <div
              class="row gx-9 gy-6 p-6"
              v-for="(item, index) in ShopDetails.shopSocialMedia"
            >
          
              <!--begin::Col-->
              <div
                class="modal fade"
                :id="`kt_modal_edit_shop_social_${item.id}`"
                tabindex="-1"
                aria-hidden="true"
              >
                <!--begin::Modal dialog-->
                <div class="modal-dialog modal-dialog-centered mw-650px">
                  <!--begin::Modal content-->
                  <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header">
                    
                      <!--begin::Modal title-->
                      <h2>{{ $t("updateShopSocialMedia") }}</h2>
                      <!--end::Modal title-->
                      <!--begin::Close-->
                      <div
                        class="btn btn-sm btn-icon btn-active-color-primary"
                        data-bs-dismiss="modal"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.5"
                              x="6"
                              y="17.3137"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(-45 6 17.3137)"
                              fill="currentColor"
                            />
                            <rect
                              x="7.41422"
                              y="6"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(45 7.41422 6)"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <!--begin::Form-->
                      <Form
                        id="kt_modal_edit_shop_form"
                        class="form"
                        action="#"
                        @submit.prevent
                        :validation-schema="socialMediaSchema"
                      >
                      <div class="row">
                        <div class="col-6 mb-3">
                          <!--begin::Input-->
                          <Field
                            v-slot="{ field }"
                            type="text"
                            v-model="item.socialMediaId"
                            class="form-control form-control-solid"
                            name="socialMediaId"
                          >
                            <Multiselect
                              disabled
                              v-model="item.socialMediaId"
                              v-bind="field"
                              :searchable="true"
                              label="code"
                              value-prop="id"
                              placeholder="Enter Social Media Type "
                              :classes="{
                                container:
                                  'multiselect-lg form-control  form-control-solid',
                                search:
                                  'multiselect-search form-control form-control-solid',
                                clear: 'multiselect-lg-clear',
                              }"
                              :options="SocialMediaType"
                            />
                          </Field>
                          <ErrorMessage
                            name="socialMediaId"
                            class="fv-plugins-message-container invalid-feedback"
                          />
                          <!--end::Input-->
                        </div>
                        <div class="col-6 mb-3">
                          <!--begin::Row-->

                          <!--begin::Col-->
                          <Field
                            type="text"
                            placeholder="Enter Label"
                            name="label"
                            class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            v-model="item.label"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage
                                name="label"
                                class="fv-plugins-message-container invalid-feedback"
                              />
                            </div>

                            <!--end::Col-->
                          </div>
                          <!--end::Row-->
                        </div>
                        <div class="col-6 mb-3">
                          <!--begin::Row-->

                          <!--begin::Col-->
                          <Field
                            type="text"
                            name="value"
                            class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            placeholder="Enter Value"
                            v-model="item.value"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage
                                name="value"
                                class="fv-plugins-message-container invalid-feedback"
                              />
                            </div>
                          </div>

                          <!--end::Col-->

                          <!--end::Row-->
                        </div>
                        <div class="col-6 mb-3">
                          <!--begin::Row-->

                          <!--begin::Col-->
                          <Field
                            type="text"
                            placeholder="Enter Notes"
                            name="notes"
                            class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            v-model="item.notes"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage
                                name="notes"
                                class="fv-plugins-message-container invalid-feedback"
                              />
                            </div>
                          </div>

                          <!--end::Col-->

                          <!--end::Row-->
                        </div>
                      </div>
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                          <a
                          role="button"
                            
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            <span class="indicator-label">{{ $t("save") }}</span>
                            <span class="indicator-progress"
                              >{{ $t("pleaseWait") }}...
                              <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                              ></span
                            ></span>
                        </a>
                        </div>
                        <!--end::Actions-->
                      </Form>
                      <!--end::Form-->
                    </div>
                    <!--end::Modal body-->
                  </div>
                  <!--end::Modal content-->
                </div>
                <!--end::Modal dialog-->
              </div>
              <div class="col-xl-12" data-kt-billing-element="card">
                <!--begin::Card-->
                <div
                  class="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6"
                >
                  <!--begin::Info-->
                  <div class="d-flex flex-column py-2">
                    <!--begin::Owner-->

                    <div class="d-flex align-items-center fs-4 fw-bold mb-5">
                      {{
                        SocialMediaType?.find((x) => x.id === item.socialMediaId)?.code
                      }}
                    </div>
                    <!--end::Owner-->
                    <!--begin::Wrapper-->
                    <div class="d-flex align-items-center">
                      <!--begin::Icon-->
                      <img
                  src="/media/svg/brand-logos/github.svg"
                  class="w-30px me-6"
                  alt=""
                />
                      <!--end::Icon-->
                      <!--begin::Details-->
                      <div>
                        <div class="fs-4 fw-bold">{{ item.value }}</div>
                        <div class="fs-6 fw-semibold text-gray-400">
                          {{ item.label }}
                        </div>
                        <div class="fs-6 fw-semibold text-gray-400">
                          {{ item.notes }}
                        </div>
                      </div>
                      <!--end::Details-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Info-->
                  <!--begin::Actions-->
                  <div class="d-flex align-items-center py-2">
                    <button
                    class="btn btn-sm btn-light-danger me-2"
                      @click="removeItemSocialMediaType(index)"
                    >
                    
                      <span class="svg-icon svg-icon-danger">
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                     
                    </button>
                    <a
                    role="button"
                      class="btn btn-sm btn-light btn-active-light-primary"
                      data-bs-toggle="modal"
                      :data-bs-target="`#kt_modal_edit_shop_social_${item.id}`"
                    >
                    <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                   </span>
                  </a>
                  </div>
                  <!--end::Actions-->
                </div>
                <!--end::Card-->
              </div>
              <!--end::Col-->

              <!--end::Col-->
            </div>
            <div class="card-body pt-0 row">
              <!--end::Label-->
              <label
                class="col-4 col-form-label required fw-bold fs-6"
                v-if="ShopDetails.shopSocialMedia.length == 0"
                >{{ $t("noSocialMediaAvialable") }}
              </label>

              <!--begin::Col-->

              <!--end::Col-->
              <div class="col-12">
                <a
              
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_new_shop_social"
                  
                  type="button"
                  class="btn btn-lg btn-new"
                >
                {{ $t("addAnotherSocialMedia") }}
                </a>
              </div>
            </div>
          </div>
          <div
            class="card card-flush py-4 mb-4"
            data-select2-id="select2-data-132-t92u"
          >
            <!--begin::Card header-->
            <div class="card-header">
              <div class="card-title">
                <h2>{{ $t("shopWorkingDays") }}</h2>
              </div>
            </div>
            <div
                class="modal fade"
                id="kt_modal_new_shop_working_days"
                tabindex="-1"
                aria-hidden="true"
                ref="addshopWorkingModalRef"
              >
                <!--begin::Modal dialog-->
                <div class="modal-dialog modal-dialog-centered mw-650px">
                  <!--begin::Modal content-->
                  <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header">
                    
                      <!--begin::Modal title-->
                      <h2>{{ $t("newShopWorkingDays") }}</h2>
                      <!--end::Modal title-->
                      <!--begin::Close-->
                      <div
                        class="btn btn-sm btn-icon btn-active-color-primary"
                        data-bs-dismiss="modal"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.5"
                              x="6"
                              y="17.3137"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(-45 6 17.3137)"
                              fill="currentColor"
                            />
                            <rect
                              x="7.41422"
                              y="6"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(45 7.41422 6)"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <!--begin::Form-->
                      <Form
                        id="kt_modal_edit_shop_form"
                        class="form"
                       
                        :validation-schema="shopWorkingDaysSchema"
                        @submit="addnewshopWorkingDays"
                      >
                        {{newShopSocial}}
                        <div class="row">
                          <div class="col-6  mb-3">
                            <!--begin::Input-->
                            <label  class="required fs-5 fw-bold mb-2">day</label>
                            <Field
                              name="day"
                              type="number"
                              v-model="newShopWorkingDays.day"
                            >
                              <input
                                type="number"
                                class="form-control form-control-solid form-control-lg"
                                placeholder="Enter Day "
                                v-model="newShopWorkingDays.day"
                              />
                            </Field>
                            <ErrorMessage
                              name="day"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                            <!--end::Input-->
                          </div>
                          <div class="col-6 mb-3">
                            <!--begin::Col-->
                            <label  class="required fs-5 fw-bold mb-2">startWorkingTime</label>
                            <Field
                              placeholder="Enter startWorkingTime "
                              name="startWorkingTime"
                              type="date"
                              v-model="newShopWorkingDays.startWorkingTime"
                              v-slot="{ field, meta }"
                            >
                              <div class="flex-grow-1">
                                <ElDatePicker
                                  v-model="newShopWorkingDays.startWorkingTime"
                                  v-bind="field"
                                  type="datetime"
                                  class="w-100"
                                  format="HH:mm:ss"
                                  value-format="HH:mm:ss"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }"
                                ></ElDatePicker>
                              </div>
                            </Field>
                            <ErrorMessage
                              class="text-danger"
                              name="startWorkingTime"
                            ></ErrorMessage>

                          <!--end::Col-->
                        </div>
                        <div class="col-6 mb-3">
                          <!--begin::Col-->
                          <label  class="required fs-5 fw-bold mb-2">endWorkingTime</label>
                          <Field
                            placeholder="Enter endWorkingTime "
                            name="endWorkingTime"
                            type="date"
                            v-model="newShopWorkingDays.endWorkingTime"
                            v-slot="{ field, meta }"
                          >
                            <div class="flex-grow-1">
                              <ElDatePicker
                                v-model="newShopWorkingDays.endWorkingTime"
                                v-bind="field"
                                type="datetime"
                                class="w-100"
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }"
                              ></ElDatePicker>
                            </div>
                          </Field>
                          <ErrorMessage
                            class="text-danger"
                            name="endWorkingTime"
                          ></ErrorMessage>

                          <!--end::Col-->
                        </div>
                        <div class="col-6 mb-3">
                          <!--begin::Col-->
                          <label  class="required fs-5 fw-bold mb-2">Notes</label>
                          <Field
                            type="text"
                            placeholder="Enter Notes "
                            name="notes"
                            class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                            v-model="newShopWorkingDays.notes"
                          />
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                              <ErrorMessage name="notes" class="text-danger" />
                            </div>
                          </div>

                            <!--end::Col-->
                          </div>
                          <div class="col-12 mb-3">
                            <div class="form-check form-check-solid">
                              <input
                                class="form-check-input"
                                v-model="newShopWorkingDays.isWorking"
                                type="checkbox"
                                data-kt-check="false"
                              /><label class="form-check-label ps-2">
                                {{ $t("isWorking") }}
                              </label>
                            </div>
                          </div>
                        </div>
                      
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                          <button
                            type="submit"
                            id="kt_modal_edit_st"
                            class="btn btn-primary"
                          >
                              <span class="indicator-label">{{ $t("save") }}</span>
                             
                          </button>
                        </div>
                        <!--end::Actions-->
                    </Form>
                      <!--end::Form-->
                    </div>
                    <!--end::Modal body-->
                  </div>
                  <!--end::Modal content-->
                </div>
                <!--end::Modal dialog-->
              </div>
            <div
              class="row gx-9 gy-6 p-6"
              v-for="(item, index) in ShopDetails.shopWorkingDays"
            >
           
              <!--begin::Col-->
              <div
                class="modal fade"
                :id="`kt_modal_edit_shop_working_${item.id}`"
                tabindex="-1"
                aria-hidden="true"
              >
                <!--begin::Modal dialog-->
                <div class="modal-dialog modal-dialog-centered mw-650px">
                  <!--begin::Modal content-->
                  <div class="modal-content">
                    <!--begin::Modal header-->
                    <div class="modal-header">
                    
                      <!--begin::Modal title-->
                      <h2>{{ $t("updateShopWorkingDays") }}</h2>
                      <!--end::Modal title-->
                      <!--begin::Close-->
                      <div
                        class="btn btn-sm btn-icon btn-active-color-primary"
                        data-bs-dismiss="modal"
                      >
                        <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
                        <span class="svg-icon svg-icon-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.5"
                              x="6"
                              y="17.3137"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(-45 6 17.3137)"
                              fill="currentColor"
                            />
                            <rect
                              x="7.41422"
                              y="6"
                              width="16"
                              height="2"
                              rx="1"
                              transform="rotate(45 7.41422 6)"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <!--end::Svg Icon-->
                      </div>
                      <!--end::Close-->
                    </div>
                    <!--end::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
                      <!--begin::Form-->
                      <Form
                        id="kt_modal_edit_shop_form"
                        class="form"
                        action="#"
                        :validation-schema="shopWorkingDaysSchema"
                      >
                        <div class="row">
                          <div class="col-6 mb-3">
                            <!--begin::Input-->
                            <Field
                              name="day"
                              type="number"
                              v-model="item.day"
                            >
                              <input
                                type="number"
                                class="form-control w-100 form-control-solid form-control-lg"
                                placeholder="Enter Day "
                                v-model="item.day"
                              />
                            </Field>
                            <ErrorMessage
                              name="day"
                              class="fv-plugins-message-container invalid-feedback"
                            />
                            <!--end::Input-->
                          </div>
                          <!--begin::Col-->
                          <div class="col-6 mb-3">
                            <Field
                              placeholder="Enter startWorkingTime "
                              name="startWorkingTime"
                              type="date"
                              v-model="item.startWorkingTime"
                              v-slot="{ field, meta }"
                            >
                              <div class="flex-grow-1">
                                <ElDatePicker
                                  v-model="item.startWorkingTime"
                                  v-bind="field"
                                  type="datetime"
                                  class="w-100"
                                  format="HH:mm:ss"
                                  value-format="HH:mm:ss"
                                  :class="{
                                    'is-valid': meta.valid,
                                    'is-invalid': meta.validated && !meta.valid,
                                  }"
                                ></ElDatePicker>
                              </div>
                            </Field>
                            <ErrorMessage
                              class="text-danger"
                              name="startWorkingTime"
                            ></ErrorMessage>

                          <!--end::Col-->
                        </div>
                        <!--begin::Col-->
                        <div class="col-6 mb-3">
                          <Field
                            placeholder="Enter endWorkingTime "
                            name="endWorkingTime"
                            type="date"
                            v-model="item.endWorkingTime"
                            v-slot="{ field, meta }"
                          >
                            <div class="flex-grow-1">
                              <ElDatePicker
                                v-model="item.endWorkingTime"
                                v-bind="field"
                                type="datetime"
                                class="w-100"
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                :class="{
                                  'is-valid': meta.valid,
                                  'is-invalid': meta.validated && !meta.valid,
                                }"
                              ></ElDatePicker>
                            </div>
                          </Field>
                          <ErrorMessage
                            class="text-danger"
                            name="endWorkingTime"
                          ></ErrorMessage>

                            <!--end::Col-->
                          </div>
                          <!--begin::Col-->
                          <div class="col-6 mb-3">
                            <Field
                              type="text"
                              placeholder="Enter Notes "
                              name="notes"
                              class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                              v-model="item.notes"
                            />
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block">
                                <ErrorMessage
                                  name="notes"
                                  class="text-danger"
                                />
                              </div>
                            </div>
                            <!--end::Col-->
                            </div>
                            <div class="col-12 mb-3">
                                <div class="form-check form-check-solid">
                                  <input
                                    class="form-check-input"
                                    v-model="item.isWorking"
                                    type="checkbox"
                                    data-kt-check="false"
                                  /><label class="form-check-label ps-2">
                                    {{ $t("isWorking") }}
                                  </label>
                                </div>
                            </div>
                        </div>
                        <!--begin::Actions-->
                        <div class="text-center pt-15">
                          <a
                          role="button"
                          data-bs-dismiss="modal"
                            class="btn btn-primary"
                          >
                            <span class="indicator-label">{{ $t("save") }}</span>
                            <span class="indicator-progress"
                              >{{ $t("pleaseWait") }}...
                              <span
                                class="spinner-border spinner-border-sm align-middle ms-2"
                              ></span
                            ></span>
                          </a>
                        </div>
                        <!--end::Actions-->
                      </Form>
                      <!--end::Form-->
                    </div>
                    <!--end::Modal body-->
                  </div>
                  <!--end::Modal content-->
                </div>
                <!--end::Modal dialog-->
              </div>
              <div class="col-xl-12" data-kt-billing-element="card">
                <!--begin::Card-->
                <div
                  class="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6"
                >
                  <!--begin::Info-->
                  <div class="d-flex flex-column py-2">
                    <!--begin::Owner-->

                    <div class="d-flex align-items-center fs-4 fw-bold mb-5"> Day
                      {{
                        item.day
                      }}
                    </div>
                    <!--end::Owner-->
                    <!--begin::Wrapper-->
                    <div class="d-flex align-items-center">
                      <!--begin::Icon-->
                      <img
                  src="/media/svg/brand-logos/github.svg"
                  class="w-30px me-6"
                  alt=""
                />
                      <!--end::Icon-->
                      <!--begin::Details-->
                      <div>
                        <div class="fs-4 fw-bold"> startWorkingTime {{ item.startWorkingTime }}</div>
                        <div class="fs-6 fw-semibold text-gray-400"> endWorkingTime
                          {{ item.endWorkingTime }}
                        </div>
                        <div class="fs-6 fw-semibold text-gray-400">
                          {{ item.notes }}
                        </div>
                        <label class="form-check-label ps-2">
                            {{ $t("isWorking") }}
                          </label>
                      </div>
                      <!--end::Details-->
                    </div>
                    <!--end::Wrapper-->
                  </div>
                  <!--end::Info-->
                  <!--begin::Actions-->
                  <div class="d-flex align-items-center py-2">
                    <button
                    class="btn btn-sm btn-light-danger me-2"
                      @click="removeItemshopWorkingDays(index)"
                    >
                    <span class="svg-icon svg-icon-danger">
                      <inline-svg
                        src="/media/icons/duotune/general/gen027.svg"
                      />
                    </span>
                    </button>
                    <a
                    role="button"
                      class="btn btn-sm btn-light btn-active-light-primary"
                      data-bs-toggle="modal"
                      :data-bs-target="`#kt_modal_edit_shop_working_${item.id}`"
                    >
                    <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                   </span>
                  </a>
                  </div>
                  <!--end::Actions-->
                </div>
                <!--end::Card-->
              </div>
              <!--end::Col-->

              <!--end::Col-->
            </div>
            <div class="card-body pt-0 row">
              <!--end::Label-->
              <label
                class="col-4 col-form-label required fw-bold fs-6"
                v-if="ShopDetails.shopWorkingDays.length == 0"
                >{{ $t("noShopWorkingDaysAvialable") }}
              </label>

            <!--begin::Col-->

              <!--end::Col-->
              <div class="col-12">
                <a
              
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_new_shop_working_days"
                  
                  type="button"
                  class="btn btn-lg btn-new"
                >
                {{ $t("addAnotherShopWorkingDay") }}
                </a>
              </div>
            </div>
            <div class="card-body pt-0">
              <label
                class="col-4 col-form-label required fw-bold fs-6"
                v-if="ShopDetails.shopWorkingDays.length == 0"
                >{{ $t("noShopWorkingDaysAvialable") }}
              </label>

              <!--begin::Col-->

           
            </div>
          </div>
          
        </div>
      </div>
      <!--end::Main column-->
      <!--begin::Actions-->
      <div class="d-flex justify-content-center">
        <div class="card col-12 align-items-center justify-content-center floating  py-6 px-9">
          <div class="card-title text-gray-400 fw-normal pt-0">
          {{ $t("pleaseDontForgetToSaveBaseChanges") }}
          </div>
          <div class="crad-body">
            <button type="submit" class="btn btn-primary">
              <span v-if="!isLoading">
                {{ $t("saveBaseSetting") }}
              </span>
              <span v-if="isLoading" class="indicator-progress d-block">
                {{ $t("wait") }}
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      
      
    </Form>
    <!--end::Form-->
  </div>
  </div>
  <!--end::Basic info-->
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, toRaw, computed } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Multiselect from "@vueform/multiselect";
import { hideModal } from "@/core/helpers/dom";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import Editor from "@/components/Reusable/Editor.vue";
import LocationSelector from "@/components/Reusable/LocationSelector.vue";
import * as Yup from "yup";
import {
  City,
  Country,
  Area,
  shopContacts,
  Language,
  ShopsSocialMedia,
  Market,
  ShopWorkingDays,
  Coordinates,
} from "@/types";
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";
// start interfaces
interface Langs { 
  id:string,
  name:string
}
interface ShopDetails {
  id: string;
  latitude: number;
  longitude: number;
  isAvailableOnJetOrder: boolean;
  countryId: string;
  cityId: string;
  areaId: string;
  languages: Array<Langs>;
  resources: [];
  shopContacts: Array<shopContacts>;
  shopSocialMedia: Array<ShopsSocialMedia>;
  shopWorkingDays: Array<ShopWorkingDays>;
  currencyIds: [];
  logoPath: string;
}

// init refs
const countries = ref<Country[] | null>();
const cities = ref<City[] | null>();
const areas = ref<Area[] | null>();
const lookupQueries = store.state.LookupQueries;
const languages = ref<Language[] | null>();

let selectedItem = ref({});
const ImageUrl=ref('')
let contactsType = ref<shopContacts[]>();
let SocialMediaType = ref<ShopsSocialMedia[]>();
const addContactModalRef = ref(null);
const addSocialMediaModalRef = ref(null);
const addshopWorkingModalRef = ref(null);
const logoKey =ref("/media/svg/files/blank-image.svg")
const isLoading = ref(false);

let newShop = {} as shopContacts;
let newShopSocial = {} as ShopsSocialMedia;
let newShopWorkingDays = {} as ShopWorkingDays;

// shopContact Schema
const shopContactSchema = Yup.object().shape({
  contactTypeId: Yup.string().required("required"),
  label: Yup.string().required("required"),
  notes: Yup.string(),
  value: Yup.string().when("contactTypeId", (contactTypeId) => {
    if (contactTypeId == "2") {
      return Yup.string().email().required("fieldRequired");
    } else if (contactTypeId == "1") {
      return Yup.number().required("fieldRequired");
    } else {
      return Yup.string().required("fieldRequired");
    }
  }),
});
// socialMedia Schema
const socialMediaSchema = Yup.object().shape({
  socialMediaId: Yup.string().required("required"),
  label: Yup.string().required("required"),
  value: Yup.string().required("required"),
  notes: Yup.string().required("required"),
});
// shopWorkingDays Schema
const shopWorkingDaysSchema = Yup.object().shape({
  day: Yup.number().required("required"),
  startWorkingTime: Yup.string().required("required"),
  endWorkingTime: Yup.string().required("required"),

});
// ShopDetailsValidator Schema
const ShopDetailsValidator = Yup.object().shape({
  countryId: Yup.string().required().label("Country"),
  cityId: Yup.string().required().label("City"),
  areaId: Yup.string().required().label("Area"),
 
  ShopDetails: Yup.object().shape({

  }),

});
// define ShopDetails// Handle Image
const removeImage = () => {
  ShopDetails.value.logoPath = "media/avatars/blank.png";
};
const ShopDetails = ref<ShopDetails>({
  id: "",
  isAvailableOnJetOrder: false,
  latitude: 0,
  longitude: 0,
  countryId: "",
  cityId: "",
  areaId: "",
  languages: [],
  shopContacts: [],
  shopSocialMedia: [],
  shopWorkingDays: [],
  resources: [],
  currencyIds: [],
  logoPath: "",
});

// get id as a prop
let props = defineProps({
  id: String,
});

// get supported langs
const currentLangs = computed(() => store.getters.getSupportedLanguages);
// set location center
const center = ref<Coordinates>({ lat: 0, lng: 0 });
// get city and set location when country change
const onCountryChange = async (countryId: string) => {
  const country = countries.value?.find((x) => x.id === countryId);
  if (country) {
    center.value = {
      lat: country?.latitude,
      lng: country?.longitude,
    };
    // ShopDetails.value.cityId= null;
    // ShopDetails.value.areaId= null;
  }
  await store.dispatch(Actions.GET_CITY_BY_COUNTRYID, countryId);
  watchEffect(() => (cities.value = store.getters.getCities));
};
// get area and set location when city change
const onCityChange = async (cityId: string) => {
  const city = cities.value?.find((x) => x.id === cityId);

  if (city) {
    center.value = {
      lat: city?.latitude,
      lng: city?.longitude,
    };

    // ShopDetails.value.areaId= null;
  }
  await store.dispatch(Actions.GET_AREA_BY_CITYID, cityId);
  watchEffect(() => (areas.value = store.getters.getAreas));
};
const image = (path) => {
  return `https://mfproductimages.s3.amazonaws.com/` + ImageUrl.value;
};
// handleFileUpload image logo 
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target?.files;
  if (files && files?.length > 0) {
    const file: File = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const target: any = e.target;
      const data = target.result;
      ShopDetails.value.logoPath = data;
    };

    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("file", file);

    store.dispatch(Actions.ADD_SETUP_LOGO, formData).then((res) => {
      console.log(res);
       ImageUrl.value = res[1].data.data;
      ShopDetails.value.logoPath =  image(ImageUrl);;
      // imageUrl.value = image(url);
    });
  }
};
// save changes function 
const saveChanges = async (values: any) => {
  isLoading.value = true;
  logoKey.value=ImageUrl.value
 
  ShopDetails.value.latitude = center.value.lat;
  ShopDetails.value.longitude = center.value.lng;
  ShopDetails.value.areaId= ShopDetails.value.areaId.toString() 
  ShopDetails.value.countryId= ShopDetails.value.countryId.toString() 
  ShopDetails.value.cityId=ShopDetails.value.cityId.toString() 
  store
    .dispatch(Actions.UPDATE_SHOP_BASE_SETTINGS,{...ShopDetails.value,
    logoKey:logoKey.value} )
    .then(() => {
      isLoading.value = false;
    });
};
// set selected item when tap duoblicator changes
const setSelectedItem = (payload: any) => {
  selectedItem.value = payload;
};

// set location when area select
const onAreaChange = (areaId: string) => {
  const area = cities.value?.find((x) => x.id === areaId);

  if (area) {
    center.value = {
      lat: area?.latitude,
      lng: area?.longitude,
    };
  }
};
// addnewShopContacts
const addnewShopContacts = () => {
  hideModal(addContactModalRef.value);
  ShopDetails.value.shopContacts.push(newShop);
};
// removeItemShopContacts
const removeItemShopContacts = (index) => {
  ShopDetails.value.shopContacts.splice(index, 1);
};
// addnewSocialMediaType
const addnewSocialMediaType = () => {
  hideModal(addSocialMediaModalRef.value);
  ShopDetails.value.shopSocialMedia.push(newShopSocial);
};
//removeItemSocialMediaType
const removeItemSocialMediaType = (index) => {
  ShopDetails.value.shopSocialMedia.splice(index, 1);
};
// addnewshopWorkingDays
const addnewshopWorkingDays = () => {
  hideModal(addshopWorkingModalRef.value);
  ShopDetails.value.shopWorkingDays.push(newShopWorkingDays);
  newShopWorkingDays = {} as ShopWorkingDays;
};
// removeItemshopWorkingDays
const removeItemshopWorkingDays = (index) => {
  ShopDetails.value.shopWorkingDays.splice(index, 1);
};
// get shop base settings from api and set it
const getData = async () => {
  await store.dispatch(Actions.GET_SOCIAL_MEDIA_TYPE);
  watchEffect(() => (SocialMediaType.value = lookupQueries.ShopsSocialMedia));
  await store.dispatch(Actions.GET_CONTACT_TYPE);
  watchEffect(() => (contactsType.value = lookupQueries.contactsType));
};
// load when mounted
onMounted(() => {
  getData();

  selectedItem.value = currentLangs.value[0];
  languages.value = store.state.LookupQueries.languages.data;
  countries.value = lookupQueries.countries?.data;
  store.dispatch(Actions.GET_SHOPS_BASE_SETTINGS, props.id).then((data) => {
    console.log(data);
    ShopDetails.value = data;
    ShopDetails.value.id = props.id;
    ShopDetails.value.countryId = parseInt(data.countryId);
    ShopDetails.value.cityId = parseInt(data.cityId);
    ShopDetails.value.areaId = parseInt(data.areaId);
    logoKey.value=data.logoPath
    onCountryChange(ShopDetails.value.countryId);
    onCityChange(ShopDetails.value.cityId);
    center.value = {
      lat: data?.latitude,
      lng: data?.longitude,
    };
    ShopDetails.value.languages= data.languages.map((el) => { return el.language})
   
  });
   // set setCurrentPageBreadcrumbs
  setCurrentPageBreadcrumbs("Shops", ["Shop Base Settings"]);
});
</script>

<style lang="scss" scoped>
.multiselect-lg {
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
}
.multiselect-dropdown-lg {
  width: 200px;
}

.vue-map {
  height: 250px;
}

.country-flag {
  margin-right: 10px;
  top: 21px;
  left: 11px;
}
.flag-container {
  margin-right: 10px;
}
a.btn.btn-lg.btn-new {
  border: 1px solid #04c8c8 !important;
  color: #04c8c8;
}
button.btn.btn-lg.btn-remove {
  border: 1px solid red !important;
  color: red;
}
.calling-code {
  width: 45px;
  color: #747474;
}
.flex-fixed {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}
.dots-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.floating{
  position: fixed;
  bottom: 0px;

}
</style>
