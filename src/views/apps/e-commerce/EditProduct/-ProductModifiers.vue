<template>
  <div class="card card-flush">
    <div class="card-header border-0">
      <div class="card-title">Product Modifiers</div>
    </div>
    <div class="card-body">
      <div class="card-content">
        <Dropdown
          :items="modifiers"
          :multiSelect="true"
          :outter-ids="selectedModifiersIds"
          bodyClasses="w-100 text-truncate text-capitalize"
          headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg mb-3"
          max-height="200px"
          @selectedItem="selectModifier"
        >
          <template #headerContent="{ item }">
            <span class="d-flex justify-content-between align-items-center">
              <span class="w-100 text-truncate">
                select your modifiers
                <small
                  class="text-muted"
                  v-if="selectedModifiersIds && selectedModifiersIds.length"
                >
                  ({{ selectedModifiersIds.length }})
                </small>
              </span>
              <strong>
                <i :class="item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
              </strong>
            </span>
          </template>
          <template #bodyContent="{ item }">
            <div
              :style="[
                selectedModifiersIds.includes(item.id)
                  ? 'background-color: #1bc5bd; color: #fff;'
                  : '',
              ]"
              class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex gap-2 align-items-center"
            >
              <div v-text="item.name" />
              <i
                v-if="selectedModifiersIds.includes(item.id)"
                class="bi bi-check text-white ms-auto"
                style="font-size: large"
              ></i>
            </div>
          </template>
        </Dropdown>
        <!-- Tags -->
        <div class="d-flex gap-3 flex-wrap my-4">
          <span
            v-for="(item, $index) in selectedModifiers"
            :key="$index"
            class="badge badge-secondary"
          >
            {{ item.name }}
          </span>
        </div>

        <div v-if="updateModifierBtnShown" class="my-5">
          <div v-if="updateModifierErrorMsg">
            <p
              class="badge badge-light-danger"
              v-text="`${updateModifierErrorMsg} 👀`"
            />
          </div>
          <button
            @click="updateModifier"
            type="button"
            class="btn btn-sm rounded-3 bg-light-success text-success btn-hover-scale"
          >
            <span v-if="!reqLoading">
              <i class="bi bi-check-circle-fill text-success text-base"></i>
              Save changes
            </span>
            <span
              v-else
              class="spinner-border spinner-border-sm align-middle"
            />
          </button>
        </div>
      </div>
      <div class="card-content">
        <div v-if="modifiersTable && modifiersTable.length > 0">
          <div class="d-flex justify-content-end">
            <button
              class="btn bg-light-primary text-primary btn-sm btn-hover-scale"
              type="button"
              @click="toggleAddModifierDialog"
              :disabled="reqLoading"
            >
              + Add New Modifier
            </button>
          </div>
        </div>
        <el-dialog
          v-model="addModifierDialog"
          title="Add Modifier"
          :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
          top="5vh"
        >
          <template #default>
            <section
              style="max-height: 70vh; overflow: auto; overflow-x: hidden"
              class="scroller px-3"
            >
              <label for="modifierName" class="form-label">Name</label>
              <tabs-duplicator
                v-if="languages && languages.length > 0"
                :items="languages"
                active-tab-design="btn btn-bg-light btn-color-info rounded-3"
                tab-btn-classes="text-nowrap"
                @selectedItem="setSelectedLanguage"
                class="mb-3"
              >
                <template #label="{ item }">
                  <span>
                    {{ item.label }}
                  </span>
                </template>
              </tabs-duplicator>
              <div class="row">
                <div class="col-12 col-sm-12 mb-1">
                  <div v-if="selectedLanguage && selectedLanguage.id">
                    <input
                      type="text"
                      id="modifierName"
                      class="form-control"
                      placeholder="Modifier Name"
                      v-model="
                        modifierForm.modifierResources[selectedLanguage.id]
                      "
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-12 my-3">
                  <div>
                    <Dropdown
                      :items="shops"
                      :multiSelect="true"
                      :outter-ids="selectedShopsIds"
                      bodyClasses="w-100 text-truncate text-capitalize"
                      headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg"
                      max-height="200px"
                      @selectedItem="selectShops"
                    >
                      <template #headerContent="{ item }">
                        <span
                          class="d-flex justify-content-between align-items-center"
                        >
                          <span class="w-100 text-truncate">
                            connected shops
                            <small
                              class="text-muted"
                              v-if="selectedShopsIds && selectedShopsIds.length"
                            >
                              ({{ selectedShopsIds.length }})
                            </small>
                          </span>
                          <strong>
                            <i
                              :class="
                                item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'
                              "
                            ></i>
                          </strong>
                        </span>
                      </template>
                      <template #bodyContent="{ item }">
                        <div
                          :style="[
                            selectedShopsIds.includes(item.id)
                              ? 'background-color: #1bc5bd; color: #fff;'
                              : '',
                          ]"
                          class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex gap-2 align-items-center"
                        >
                          <img
                            :src="item.logoPath"
                            alt=""
                            width="22"
                            height="22"
                            class="rounded-circle"
                            style="object-fit: cover"
                          />
                          <div v-text="item.name" />
                          <i
                            v-if="selectedShopsIds.includes(item.id)"
                            class="bi bi-check text-white ms-auto"
                            style="font-size: large"
                          ></i>
                        </div>
                      </template>
                    </Dropdown>
                    <!-- Tags -->
                    <div
                      v-if="selectedShops && selectedShops.length > 0"
                      class="d-flex gap-3 flex-wrap my-4"
                    >
                      <span
                        v-for="(item, $index) in selectedShops"
                        :key="$index"
                        class="badge badge-secondary"
                      >
                        <img
                          :src="item.logoPath"
                          alt=""
                          width="18"
                          height="18"
                          class="rounded-circle me-1"
                          style="object-fit: cover"
                        />
                        {{ item.name }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-6 mb-1">
                  <div>
                    <label for="modifierCode" class="form-label">Code</label>
                    <input
                      type="text"
                      id="modifierCode"
                      class="form-control"
                      placeholder="Modifier Code"
                      v-model="modifierForm.modifierCode"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-6 mb-1">
                  <div>
                    <label for="modifierOrder" class="form-label">Order</label>
                    <input
                      type="number"
                      id="modifierOrder"
                      class="form-control"
                      placeholder="Modifier Order"
                      v-model="modifierForm.modifierOrder"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-6 mb-1">
                  <div>
                    <label for="modifierMaxSelectionValue" class="form-label"
                      >Maximum Selection Value</label
                    >
                    <input
                      type="number"
                      id="modifierMaxSelectionValue"
                      class="form-control"
                      placeholder="Maximum Selection Value"
                      v-model="modifierForm.modifierMax"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-6 mb-1">
                  <div>
                    <label for="modifierMinSelectionValue" class="form-label">
                      Minimum Selection Value
                    </label>
                    <input
                      type="number"
                      id="modifierMinSelectionValue"
                      class="form-control"
                      placeholder="Minimum Selection Value"
                      v-model="modifierForm.modifierMin"
                    />
                  </div>
                </div>
                <div class="col-12 mt-5">
                  <div>
                    <div class="d-flex flex-column flex-wrap gap-3">
                      <div class="form-check form-check-solid">
                        <input
                          id="onJetOrder"
                          class="form-check-input"
                          type="checkbox"
                          checked
                          v-model="modifierForm.onJetOrder"
                        />
                        <label class="form-check-label" for="onJetOrder">
                          Published On JetOrder
                        </label>
                      </div>
                      <div class="form-check form-check-solid">
                        <input
                          id="onShopLink"
                          class="form-check-input"
                          type="checkbox"
                          checked
                          v-model="modifierForm.onShopLink"
                        />
                        <label for="onShopLink" class="form-check-label">
                          Published On ShopLink
                        </label>
                      </div>
                      <div class="form-check form-check-solid">
                        <input
                          id="isMendatory"
                          class="form-check-input"
                          type="checkbox"
                          checked
                          v-model="modifierForm.isMendatory"
                        />
                        <label for="isMendatory" class="form-check-label">
                          Mandatory
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="modifierGroupItems && modifierGroupItems.length > 0"
                class="mt-5"
              >
                <section>
                  <div
                    class="d-flex justify-content-between gap-1 align-items-center flex-wrap"
                  >
                    <label class="form-label">Modifiers Group items</label>
                    <div>
                      <button
                        @click="toggleAddGroupItemDialog"
                        type="button"
                        class="btn btn-sm bg-light-primary text-primary btn-hover-rise rounded-pill"
                      >
                        + Add new modifier group item
                      </button>
                    </div>
                  </div>
                  <table class="table gs-3 gy-3 gx-5">
                    <thead>
                      <tr
                        class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                      >
                        <th class="text-truncate">#</th>
                        <th class="text-truncate">name</th>
                        <th class="text-truncate">price</th>
                        <th class="text-truncate">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in modifierGroupItems"
                        :key="item.id"
                      >
                        <td class="text-truncate">
                          <div class="td-holder" v-text="index + 1" />
                        </td>
                        <td class="text-truncate">
                          <div
                            class="td-holder"
                            v-text="item.resources[0].name"
                            :title="item.resources[0].name"
                          />
                        </td>
                        <td class="text-truncate">
                          <div
                            class="td-holder"
                            v-text="item.prices[0].price"
                          />
                        </td>
                        <td>
                          <div class="td-holder gap-2" style="max-width: 60px">
                            <button
                              type="button"
                              class="btn btn-sm btn-bg-light rounded-pill btn-text-info"
                              title="edit"
                              @click="
                                setClickedModifier(item),
                                  toggleAddGroupItemDialog()
                              "
                            >
                              <i
                                class="bi bi-pencil-square text-info"
                                style="font-size: 1rem"
                              ></i>
                            </button>
                            <button
                              @click="
                                toggleConfirmationDialog({
                                  id: item.id,
                                  array: 'modifierGroupItems',
                                })
                              "
                              type="button"
                              class="btn btn-sm btn-bg-light rounded-pill btn-text-danger"
                              title="remove"
                            >
                              <i
                                class="bi bi-trash3 text-danger"
                                style="font-size: 1rem"
                              ></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
              <div v-else class="mt-5">
                <button
                  @click="toggleAddGroupItemDialog"
                  type="button"
                  class="btn bg-light-success text-success btn-hover-rise btn-sm"
                >
                  + Add modifier group item
                </button>
              </div>
              <div class="mt-5">
                <p
                  v-if="!!reqErrorMsg"
                  v-text="`${reqErrorMsg} 🤕`"
                  class="badge badge-light-danger"
                />
              </div>
              <div class="w-100">
                <button
                  @click="submitAll"
                  type="button"
                  class="btn bg-light-primary text-primary btn-hover-rise w-100"
                  :disabled="!isSubmitAllValid"
                >
                  <span v-if="!reqLoading">
                    <i
                      class="bi bi-bag-check text-primary"
                      style="font-size: 1rem"
                    ></i>
                    Submit
                  </span>
                  <span
                    v-else
                    class="spinner-border spinner-border-sm align-middle"
                  />
                </button>
              </div>
            </section>
          </template>
        </el-dialog>
        <el-dialog
          v-model="groupItemDialog"
          :title="
            !clickedModifier
              ? 'Add Group Item Modifier'
              : clickedModifier.resources[0].name
          "
          :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
          top="5vh"
        >
          <template #default>
            <section
              style="max-height: 70vh; overflow: auto; overflow-x: hidden"
            >
              <div>
                <div>
                  <div>
                    <label for="modifierItem1Name" class="form-label mb-0 mt-3">
                      Name
                    </label>
                    <tabs-duplicator
                      v-if="languages && languages.length > 0"
                      :items="languages"
                      active-tab-design="btn btn-bg-light btn-color-info rounded-3"
                      tab-btn-classes="text-nowrap"
                      @selectedItem="setSelectedGroupItemLanguage"
                      class="mb-3"
                    >
                      <template #label="{ item }">
                        <span>
                          {{ item.label }}
                        </span>
                      </template>
                    </tabs-duplicator>
                    <input
                      type="text"
                      id="modifierItem1Name"
                      class="form-control"
                      placeholder="Modifier Name"
                      v-model="
                        itemInstance.resources[selectedGroupItemLanguage.id]
                      "
                    />
                  </div>

                  <div>
                    <label
                      for="modifierItem1Price"
                      class="form-label mb-0 mt-3"
                    >
                      Price
                    </label>
                    <tabs-duplicator
                      v-if="currencies && currencies.length > 0"
                      :items="currencies"
                      active-tab-design="btn btn-bg-light btn-color-success rounded-3"
                      tab-btn-classes="text-nowrap"
                      @selectedItem="setSelectedGroupItemCurrency"
                      class="mb-3"
                    >
                      <template #label="{ item }">
                        <span>
                          {{ item.label }}
                        </span>
                      </template>
                    </tabs-duplicator>
                    <input
                      type="number"
                      id="modifierItem1Price"
                      class="form-control"
                      placeholder="Modifier Price"
                      v-model="
                        itemInstance.prices[selectedGroupItemCurrency.id]
                      "
                    />
                  </div>

                  <div>
                    <label
                      for="modifierItem1Order"
                      class="form-label mb-0 mt-3"
                    >
                      Order
                    </label>
                    <input
                      type="number"
                      id="modifierItem1Order"
                      class="form-control"
                      placeholder="Modifier Order"
                      v-model="itemInstance.order"
                    />
                  </div>

                  <div class="separator my-5 border-3 rounded-pill" />

                  <div>
                    <div
                      class="form-check form-switch form-check-custom form-check-solid me-10"
                    >
                      <input
                        class="form-check-input h-20px w-30px active"
                        type="checkbox"
                        value=""
                        id="isSelectedModifier"
                        v-model="itemInstance.selected"
                      />
                      <label class="form-check-label" for="isSelectedModifier">
                        Selected
                      </label>
                    </div>
                  </div>
                </div>
                <div class="mt-7">
                  <button
                    v-if="!clickedModifier"
                    type="button"
                    class="btn btn-bg-dark btn-text-white btn-hover-rise shadow-sm"
                    :disabled="!isAddModifierGroupFormValid"
                    @click="pushNewModifierGroupItems"
                  >
                    Submit Data
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-bg-dark btn-text-white btn-hover-rise shadow-sm"
                    :disabled="!isAddModifierGroupFormValid"
                    @click="editModifierGroupItem"
                  >
                    Edit Data
                  </button>
                </div>
              </div>
            </section>
          </template>
        </el-dialog>
      </div>
      <!-- Modifiers Table -->
      <div
        v-if="modifiersTable && modifiersTable.length > 0"
        class="card-content mt-5"
      >
        <ModifiersTable
          :items="modifiersTable"
          :editToggle="editModifierDialogToggle"
          :removeModifier="toggleConfirmationDialog"
        />
      </div>
      <div
        v-else-if="modifiersTable && modifiersTable.length === 0"
        class="d-flex justify-content-center align-items-center flex-column gap-3"
      >
        <div class="text-center">
          <h3>you haven't created any modifiers yet</h3>
          <p class="fw-bold text-muted">click Add New Modifier to Create One</p>
        </div>
        <div>
          <button
            class="btn btn-lg bg-light-primary text-primary btn-hover-scale"
            type="button"
            @click="toggleAddModifierDialog"
            :disabled="reqLoading"
          >
            + Add New Modifier
          </button>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center align-items-center py-5">
        <span class="spinner-border text-primary"></span>
      </div>
    </div>

    <!-- General dialogs -->
    <!-- Edit Modifier -->
    <el-dialog
      v-model="editModifierDialog"
      :title="
        editTarget && editTarget.resources
          ? editTarget.resources[0].name
          : 'Edit Modifier'
      "
      :width="screenDimensions().availWidth > 480 ? '480px' : '95%'"
      top="5vh"
    >
      <template #default>
        <section
          style="max-height: 70vh; overflow: auto; overflow-x: hidden"
          class="scroller px-3"
        >
          <label for="modifierName" class="form-label">Name</label>
          <tabs-duplicator
            v-if="languages && languages.length > 0"
            :items="languages"
            active-tab-design="btn btn-bg-light btn-color-info rounded-3"
            tab-btn-classes="text-nowrap"
            @selectedItem="setSelectedLanguage"
            class="mb-3"
          >
            <template #label="{ item }">
              <span>
                {{ item.label }}
              </span>
            </template>
          </tabs-duplicator>
          <div class="row">
            <div class="col-12 col-sm-12 mb-1">
              <div v-if="selectedLanguage && selectedLanguage.id">
                <input
                  type="text"
                  id="modifierName"
                  class="form-control"
                  placeholder="Modifier Name"
                  v-model="modifierForm.modifierResources[selectedLanguage.id]"
                />
              </div>
            </div>
            <div class="col-12 col-sm-12 my-3">
              <div>
                <Dropdown
                  :items="shops"
                  :multiSelect="true"
                  :outter-ids="selectedShopsIds"
                  bodyClasses="w-100 text-truncate text-capitalize"
                  headClasses="fw-bold p-3 rounded-3 shadow-sm text-capitalize btn-lg"
                  max-height="200px"
                  @selectedItem="selectShops"
                >
                  <template #headerContent="{ item }">
                    <span
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span class="w-100 text-truncate">
                        connected shops
                        <small
                          class="text-muted"
                          v-if="selectedShopsIds && selectedShopsIds.length"
                        >
                          ({{ selectedShopsIds.length }})
                        </small>
                      </span>
                      <strong>
                        <i
                          :class="
                            item.isOpened ? 'bi-arrow-up' : 'bi-arrow-down'
                          "
                        ></i>
                      </strong>
                    </span>
                  </template>
                  <template #bodyContent="{ item }">
                    <div
                      :style="[
                        selectedShopsIds.includes(item.id)
                          ? 'background-color: #1bc5bd; color: #fff;'
                          : '',
                      ]"
                      class="px-sm-5 py-sm-3 px-3 py-1 w-100 d-flex gap-2 align-items-center"
                    >
                      <img
                        :src="item.logoPath"
                        alt=""
                        width="22"
                        height="22"
                        class="rounded-circle"
                        style="object-fit: cover"
                      />
                      <div v-text="item.name" />
                      <i
                        v-if="selectedShopsIds.includes(item.id)"
                        class="bi bi-check text-white ms-auto"
                        style="font-size: large"
                      ></i>
                    </div>
                  </template>
                </Dropdown>
                <!-- Tags -->
                <div
                  v-if="selectedShops && selectedShops.length > 0"
                  class="d-flex gap-3 flex-wrap my-4"
                >
                  <span
                    v-for="(item, $index) in selectedShops"
                    :key="$index"
                    class="badge badge-secondary"
                  >
                    <img
                      :src="item.logoPath"
                      alt=""
                      width="18"
                      height="18"
                      class="rounded-circle me-1"
                      style="object-fit: cover"
                    />
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 mb-1">
              <div>
                <label for="modifierCode" class="form-label">Code</label>
                <input
                  type="text"
                  id="modifierCode"
                  class="form-control"
                  placeholder="Modifier Code"
                  v-model="modifierForm.modifierCode"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6 mb-1">
              <div>
                <label for="modifierOrder" class="form-label">Order</label>
                <input
                  type="number"
                  id="modifierOrder"
                  class="form-control"
                  placeholder="Modifier Order"
                  v-model="modifierForm.modifierOrder"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6 mb-1">
              <div>
                <label for="modifierMaxSelectionValue" class="form-label"
                  >Maximum Selection Value</label
                >
                <input
                  type="number"
                  id="modifierMaxSelectionValue"
                  class="form-control"
                  placeholder="Maximum Selection Value"
                  v-model="modifierForm.modifierMax"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6 mb-1">
              <div>
                <label for="modifierMinSelectionValue" class="form-label">
                  Minimum Selection Value
                </label>
                <input
                  type="number"
                  id="modifierMinSelectionValue"
                  class="form-control"
                  placeholder="Minimum Selection Value"
                  v-model="modifierForm.modifierMin"
                />
              </div>
            </div>
            <div class="col-12 mt-5">
              <div>
                <div class="d-flex flex-column flex-wrap gap-3">
                  <div class="form-check form-check-solid">
                    <input
                      id="onJetOrder"
                      class="form-check-input"
                      type="checkbox"
                      checked
                      v-model="modifierForm.onJetOrder"
                    />
                    <label class="form-check-label" for="onJetOrder">
                      Published On JetOrder
                    </label>
                  </div>
                  <div class="form-check form-check-solid">
                    <input
                      id="onShopLink"
                      class="form-check-input"
                      type="checkbox"
                      checked
                      v-model="modifierForm.onShopLink"
                    />
                    <label for="onShopLink" class="form-check-label">
                      Published On ShopLink
                    </label>
                  </div>
                  <div class="form-check form-check-solid">
                    <input
                      id="isMendatory"
                      class="form-check-input"
                      type="checkbox"
                      checked
                      v-model="modifierForm.isMendatory"
                    />
                    <label for="isMendatory" class="form-check-label">
                      Mandatory
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="modifierGroupItems && modifierGroupItems.length > 0"
            class="mt-5"
          >
            <section>
              <div
                class="d-flex justify-content-between gap-1 align-items-center flex-wrap"
              >
                <label class="form-label">Modifiers Group items</label>
                <div>
                  <button
                    @click="toggleAddGroupItemDialog"
                    type="button"
                    class="btn btn-sm bg-light-primary text-primary btn-hover-rise rounded-pill"
                  >
                    + Add new modifier group item
                  </button>
                </div>
              </div>
              <table class="table gs-3 gy-3 gx-5">
                <thead>
                  <tr
                    class="fw-bold fs-5 text-gray-800 border-bottom border-gray-200 text-capitalize"
                  >
                    <th class="text-truncate">#</th>
                    <th class="text-truncate">name</th>
                    <th class="text-truncate">price</th>
                    <th class="text-truncate">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in modifierGroupItems"
                    :key="item.id"
                  >
                    <td class="text-truncate">
                      <div class="td-holder" v-text="index + 1" />
                    </td>
                    <td class="text-truncate">
                      <div
                        class="td-holder"
                        v-text="item.resources[0].name"
                        :title="item.resources[0].name"
                      />
                    </td>
                    <td class="text-truncate">
                      <div class="td-holder" v-text="item.prices[0].price" />
                    </td>
                    <td>
                      <div class="td-holder gap-2" style="max-width: 60px">
                        <button
                          type="button"
                          class="btn btn-sm btn-bg-light rounded-pill btn-text-info"
                          title="edit"
                          @click="
                            setClickedModifier(item), toggleAddGroupItemDialog()
                          "
                        >
                          <i
                            class="bi bi-pencil-square text-info"
                            style="font-size: 1rem"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-bg-light rounded-pill btn-text-danger"
                          title="remove"
                          @click="
                            toggleConfirmationDialog({
                              id: item.id,
                              array: 'modifierGroupItems',
                            })
                          "
                        >
                          <i
                            class="bi bi-trash3 text-danger"
                            style="font-size: 1rem"
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          <div v-else class="mt-5">
            <button
              @click="toggleAddGroupItemDialog"
              type="button"
              class="btn bg-light-success text-success btn-hover-rise btn-sm"
            >
              + Add modifier group item
            </button>
          </div>
          <div>
            <p
              v-if="!!reqErrorMsg"
              v-text="`${reqErrorMsg} 🤕`"
              class="badge badge-light-danger"
            />
          </div>
          <div class="mt-5 w-100">
            <button
              @click="editModifier"
              type="button"
              class="btn bg-light-info text-info btn-hover-rise w-100"
              :disabled="!isSubmitAllValid"
            >
              <span v-if="!reqLoading">
                <i
                  class="bi bi-pencil-square text-info"
                  style="font-size: 1rem"
                ></i>
                Edit
              </span>
              <span
                v-else
                class="spinner-border spinner-border-sm align-middle"
              />
            </button>
          </div>
        </section>
      </template>
    </el-dialog>

    <!-- Delete modifier -->
    <el-dialog v-model="confirmationDialog" title="" width="320px">
      <template #default>
        <div
          class="d-flex justify-content-center align-items-center flex-column gap-3"
        >
          <div class="text-danger h2">You will Remove this modifier</div>
          <small class="text-muted fw-bold">
            this can't be reverted anymore
          </small>
          <div v-if="!!reqErrorMsg" class="mt-4">
            <small
              class="fw-bold bg-light-danger text-danger p-1 rounded-3"
              v-text="`${reqErrorMsg} 🤕`"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <section v-if="!reqLoading">
          <button
            @click="toggleConfirmationDialog"
            class="btn btn-text-dark me-1"
            type="button"
          >
            No, Cancel
          </button>
          <button
            @click="removeModifier"
            class="btn btn-text-danger me-1 bg-light-danger"
            type="button"
          >
            yes, delete
          </button>
        </section>
        <section
          v-else
          class="d-flex justify-content-center align-items-center"
        >
          <p class="user-select-none">
            deleting...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </p>
        </section>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import ModifiersTable from "./-ModifiersTable.vue";
import Dropdown from "@/components/Reusable/Dropdown.vue";
import TabsDuplicator from "@/components/Reusable/TabsDuplicator.vue";
import { onMounted, ref, unref, watchEffect } from "vue";
import { useStore } from "vuex";
import { computed, watch } from "@vue/runtime-core";
import { screenDimensions } from "@/utils/helpers";
import { uuid } from "vue-uuid";
import Api from "@/utils/ApiHelper";

const props = defineProps(["modifiers", "product", "productModifiers"]);

const store = useStore();

const currencies = computed(() => {
  const allCurrencies = store.state.LookupQueries.currencies?.data;
  const marketCurrencies = store.state.MarketModule.market?.currencies;

  return allCurrencies?.filter((currency) =>
    marketCurrencies?.find(
      (marketCurrencyId) => marketCurrencyId === currency.id
    )
  );
});

const languages = computed(() => {
  const allLanguages = store.state.LookupQueries.languages?.data;
  const marketLanguages = store.state.MarketModule.market?.languages;

  return allLanguages?.filter((lang) =>
    marketLanguages?.find((marketLangId) => marketLangId === lang.id)
  );
});

const selectedLanguage = ref();
const setSelectedLanguage = (lang: any) => {
  selectedLanguage.value = lang;
};

const modifiersTable = ref<any[]>([]);

/* Modifiers MultiSelect */
const selectedModifiersIds = ref<any[]>([]); //-> the selected items' IDs
const selectedModifiers = ref<any[]>([]); //-> the final result of the selected items (what you're going to use in the template)
const findSelectedModifiers = (ids: Array<any> = []) => {
  selectedModifiers.value = props.modifiers?.filter((item) =>
    ids?.includes(item.id)
  );
};
// where you receive the data from the dropdown component
const selectModifier = (selectedItemsCallback: any, isGlobal?: boolean) => {
  if (!isGlobal) {
    updateModifierBtnShown.value = true;
  }
  selectedModifiersIds.value = selectedItemsCallback;
  findSelectedModifiers(selectedItemsCallback);
};

const updateModifierErrorMsg = ref("");
const updateModifierBtnShown = ref(false);
const updateModifier = async () => {
  try {
    reqLoading.value = true;
    const reqData = {
      url: "/ProductCommands/update-product-modifiers",
      method: "post",
      payload: {
        id: props.product.id,
        modifiers: selectedModifiersIds.value,
      },
    };
    const { data }: any = await Api(reqData);
    if (!data.succeeded) {
      updateModifierErrorMsg.value = data.message;
    } else {
      updateModifierBtnShown.value = false;
      updateModifierErrorMsg.value = "";
    }
  } catch (error) {
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};

const addModifierDialog = ref<boolean>(false);

const toggleAddModifierDialog = () => {
  addModifierDialog.value = !addModifierDialog.value;
};

const shops = computed(() => store.state.MarketModule.market?.shops);

const selectedShopsIds = ref<any[]>([]); //-> the selected items' IDs
const selectedShops = ref<any[]>([]); //-> the final result of the selected items (what you're going to use in the template)
const findSelectedShops = (ids: Array<any> = []) => {
  selectedShops.value = shops.value?.filter((item) => ids.includes(item.id));
};
// where you receive the data from the dropdown component
const selectShops = (selectedItemsCallback: any, isGlobal?: boolean) => {
  if (!isGlobal) {
  }
  selectedShopsIds.value = selectedItemsCallback;
  findSelectedShops(selectedItemsCallback);
};
const itemInstance = ref({
  resources: {},
  prices: {},
  order: null,
  selected: false,
  image: "",
});

const modifierForm = ref({
  modifierResources: {},
  connectedShops: [],
  modifierCode: "",
  modifierOrder: null,
  modifierMax: null,
  modifierMin: null,
  onJetOrder: true,
  onShopLink: true,
  isMendatory: true,
});

const modifierGroupItems = ref<any[]>();
watch(modifierGroupItems, (newV) => {
  console.log({ newV });
});
const groupItemDialog = ref(false);

const toggleAddGroupItemDialog = () => {
  groupItemDialog.value = !groupItemDialog.value;
};

const selectedGroupItemLanguage = ref();
const setSelectedGroupItemLanguage = (lang: any) => {
  selectedGroupItemLanguage.value = lang;
};

const selectedGroupItemCurrency = ref();

const setSelectedGroupItemCurrency = (currency: object) => {
  selectedGroupItemCurrency.value = currency;
};

const isAddModifierGroupFormValid = computed(() => {
  const item = unref(itemInstance.value);
  const langValid =
    Object.keys(item.resources).length === languages.value?.length;
  const priceValid =
    Object.keys(item.prices).length === currencies.value?.length;
  const isOrderValid = !!item.order && typeof +item.order === "number";

  return langValid && priceValid && isOrderValid;
});

const pushNewModifierGroupItems = () => {
  const item = unref(itemInstance.value);
  console.log(item);
  let resources: any[] = [];
  let prices: any[] = [];

  Object.keys(item.resources).forEach((langId: any) => {
    resources.push({
      languageId: langId,
      name: item.resources[langId],
    });
  });
  Object.keys(item.prices).forEach((currencyId: any) => {
    prices.push({
      currencyId: currencyId,
      price: item.prices[currencyId],
    });
  });

  if (!modifierGroupItems.value) modifierGroupItems.value = [];

  modifierGroupItems.value?.push({
    id: uuid.v4(),
    selected: item.selected,
    order: item.order,
    prices,
    resources,
  });

  console.log(modifierGroupItems.value);

  toggleAddGroupItemDialog();
  itemInstance.value = {
    resources: {},
    prices: {},
    order: null,
    selected: false,
    image: "",
  };
};

const clickedModifier = ref();
const setClickedModifier = (item) => {
  console.log(item);
  clickedModifier.value = item;

  itemInstance.value.order = item.order;
  itemInstance.value.selected = item.selected;

  item.resources?.forEach((el) => {
    itemInstance.value.resources[el.languageId] = el.name;
  });
  item.prices?.forEach((el) => {
    itemInstance.value.prices[el.currencyId] = el.price;
  });
};

const editModifierGroupItem = () => {
  if (clickedModifier.value) {
    const item = unref(itemInstance);
    let resources: any[] = [];
    let prices: any[] = [];

    let targeted = modifierGroupItems.value?.find(
      (el: any) => el.id === clickedModifier.value.id
    );

    Object.keys(item.resources).forEach((langId: any) => {
      resources.push({
        languageId: langId,
        name: item.resources[langId],
      });
    });
    Object.keys(item.prices).forEach((currencyId: any) => {
      prices.push({
        currencyId: currencyId,
        price: item.prices[currencyId],
      });
    });

    targeted.order = item.order;
    targeted.selected = item.selected;
    targeted.resources = resources;
    targeted.prices = prices;

    toggleAddGroupItemDialog();
  }
};

const isSubmitAllValid = computed(() => {
  const langValid =
    Object.keys(modifierForm.value.modifierResources).length ===
    languages.value?.length;
  const selectedShops = selectedShopsIds.value.length > 0;
  const code = modifierForm.value.modifierCode;
  const order = modifierForm.value.modifierOrder;
  const minV = modifierForm.value.modifierMin;
  const maxV = modifierForm.value.modifierMax;
  const groupItems = modifierGroupItems.value?.length > 0;

  return (
    langValid && selectedShops && code && order && minV && maxV && groupItems
  );
});
const reqLoading = ref<boolean>(false);
const reqErrorMsg = ref("");

const submitAll = async () => {
  try {
    reqLoading.value = true;

    let resources: any[] = [];

    let payload: any = {
      productId: props.product.id,
      code: modifierForm.value.modifierCode,
      isMendatory: modifierForm.value.isMendatory,
      isPublishedOnShopLink: modifierForm.value.onShopLink,
      isPublishedOnJetOrder: modifierForm.value.onJetOrder,
      minimumSelectionValue: modifierForm.value.modifierMin,
      maximumSelectionValue: modifierForm.value.modifierMax,
      order: modifierForm.value.modifierOrder,
      isGenericModifier: false,
      connectedShops: [...selectedShopsIds.value],
      resources: [],
      modifierGroupItems: [...modifierGroupItems.value],
    };

    Object.keys(modifierForm.value.modifierResources).forEach((langId: any) => {
      resources.push({
        languageId: langId,
        name: modifierForm.value.modifierResources[langId],
      });
    });

    payload.resources = resources;

    const reqData = {
      url: "/ProductModifierCommands/create-modifier",
      method: "post",
      payload,
    };

    const { data }: any = await Api(reqData);
    if (data.succeeded) {
      modifiersTable.value.push({
        id: data.data.id,
        ...payload,
      });
      toggleAddModifierDialog();
      modifierForm.value = {
        modifierResources: {},
        connectedShops: [],
        modifierCode: "",
        modifierOrder: null,
        modifierMax: null,
        modifierMin: null,
        onJetOrder: true,
        onShopLink: true,
        isMendatory: true,
      };
      selectShops([], true);
      modifierGroupItems.value = [];
    } else {
      reqErrorMsg.value = data.message;
    }
  } catch (error) {
    reqErrorMsg.value = "something went wrong. please try again later";
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};

const editTarget = ref<any>();
const editModifierDialog = ref(false);
const editModifierDialogToggle = (target: any) => {
  editTarget.value = target;
  setEditTargetedModifier();
  editModifierDialog.value = !editModifierDialog.value;
};

const setEditTargetedModifier = () => {
  const target = unref(editTarget);
  if (target) {
    let resources = {};

    target.resources?.forEach((lang) => {
      resources[lang.languageId] = lang.name;
    });

    modifierForm.value = {
      modifierResources: resources,
      connectedShops: target.connectedShops || [],
      modifierCode: target.code,
      modifierOrder: target.order,
      modifierMax: target.maximumSelectionValue,
      modifierMin: target.minimumSelectionValue,
      onJetOrder: target.isPublishedOnJetOrder,
      onShopLink: target.isPublishedOnShopLink,
      isMendatory: target.isMendatory,
    };
    selectShops(target.connectedShops, true);
    modifierGroupItems.value = target.modifierGroupItems || [];
  }
};

const editModifier = async () => {
  try {
    reqLoading.value = true;

    let resources: any[] = [];

    let payload: any = {
      id: editTarget.value?.id,
      code: modifierForm.value.modifierCode,
      isMendatory: modifierForm.value.isMendatory,
      isPublishedOnShopLink: modifierForm.value.onShopLink,
      isPublishedOnJetOrder: modifierForm.value.onJetOrder,
      minimumSelectionValue: modifierForm.value.modifierMin,
      maximumSelectionValue: modifierForm.value.modifierMax,
      order: modifierForm.value.modifierOrder,
      isGenericModifier: false,
      connectedShops: [...selectedShopsIds.value],
      resources: [],
      modifierGroupItems: [...modifierGroupItems.value],
    };

    Object.keys(modifierForm.value.modifierResources).forEach((langId: any) => {
      resources.push({
        languageId: langId,
        name: modifierForm.value.modifierResources[langId],
      });
    });

    payload.resources = resources;
    modifiersTable.value = modifiersTable.value.flatMap((el, index, array) => {
      if (el.id === payload.id) {
        array[index] = payload;
      }
      return array;
    });

    modifiersTable.value = modifiersTable.value.filter(
      (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
    );

    const reqData = {
      url: "/ProductModifierCommands/update-modifier",
      method: "post",
      payload,
    };

    const { data }: any = await Api(reqData);

    if (data.succeeded) {
      reqErrorMsg.value = "";
      editModifierDialogToggle({});
      modifierForm.value = {
        modifierResources: {},
        connectedShops: [],
        modifierCode: "",
        modifierOrder: null,
        modifierMax: null,
        modifierMin: null,
        onJetOrder: true,
        onShopLink: true,
        isMendatory: true,
      };
      selectShops([], true);
      modifierGroupItems.value = [];
    } else {
      reqErrorMsg.value = data.message;
    }
  } catch (error) {
    reqErrorMsg.value = "something went wrong. pls try again later!";
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};

const confirmationDialog = ref(false);

const targetRemovedDetails = ref({
  id: null,
  array: "",
});

const toggleConfirmationDialog = (info) => {
  targetRemovedDetails.value = info;

  confirmationDialog.value = !confirmationDialog.value;
};

const removeModifier = async () => {
  try {
    reqLoading.value = true;
    const targetInfo = unref(targetRemovedDetails);

    if (targetInfo.array === "modifiersTable") {
      const reqData = {
        method: "post",
        url: "/ProductModifierCommands/remove-modifier",
        payload: {
          id: targetInfo.id,
        },
      };

      const { data }: any = await Api(reqData);
      if (data.data) {
        modifiersTable.value = modifiersTable.value.filter(
          (i) => i.id !== targetInfo.id
        );
        toggleConfirmationDialog({ id: null, array: "" });
      } else {
        reqErrorMsg.value = data.message;
      }
    } else {
      let groupItems: any[] = [];

      if (editTarget.value && editTarget.value.modifierGroupItems) {
        groupItems = editTarget.value.modifierGroupItems?.filter(
          (i) => i.id !== targetInfo.id
        );
        editTarget.value["modifierGroupItems"] = groupItems;
        modifierGroupItems.value = groupItems;
      } else {
        modifierGroupItems.value = modifierGroupItems.value?.filter(
          (i) => i.id !== targetInfo.id
        );
      }

      toggleConfirmationDialog({ id: null, array: "" });
    }
  } catch (error) {
    reqErrorMsg.value = "something went wrong, please try again later!";
    console.error(error);
  } finally {
    reqLoading.value = false;
  }
};

watch(editModifierDialog, (newV) => {
  if (!newV) {
    modifierForm.value = {
      modifierResources: {},
      connectedShops: [],
      modifierCode: "",
      modifierOrder: null,
      modifierMax: null,
      modifierMin: null,
      onJetOrder: true,
      onShopLink: true,
      isMendatory: true,
    };
    selectShops([], true);
    modifierGroupItems.value = [];
    reqErrorMsg.value = "";
  }
});

watch(groupItemDialog, (newV) => {
  if (!newV) {
    clickedModifier.value = undefined;
    itemInstance.value = {
      resources: {},
      prices: {},
      order: null,
      selected: false,
      image: "",
    };
  }
});
watch(addModifierDialog, (newV) => {
  if (!newV) reqErrorMsg.value = "";
});
watch(confirmationDialog, (newV) => {
  if (!newV) reqErrorMsg.value = "";
});
const resetData = () => {
  if (props.modifiers) {
    if (languages.value && languages.value.length > 0) {
      setSelectedLanguage(languages.value[0]);
      setSelectedGroupItemLanguage(languages.value[0]);
    }
    if (currencies.value && currencies.value.length > 0) {
      setSelectedGroupItemCurrency(currencies.value[0]);
    }
  }
  if (props.product && props.product.modifiers) {
    selectModifier(props.product.modifiers, true);
  }
  if (props.productModifiers) {
    modifiersTable.value = props.productModifiers;
  }
};

onMounted(() => {
  resetData();
});
watchEffect(() => {
  resetData();
});
</script>
