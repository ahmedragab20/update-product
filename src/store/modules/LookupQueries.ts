import { Actions, Mutations } from "@/store/enums/StoreEnums";
import {
  AccountType,
  Area,
  Country,
  Currency,
  Language,
  Settings,
  ShopTag,
  Icon,
  Categories,
} from "@/types";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class LookupQueries extends VuexModule {
  //? sate
  icons = [] as Icon[];
  countries = [] as Country[];
  areas = [] as Area[];
  languages = [] as Language[];
  currencies = [] as Currency[];
  settings = {} as Settings;
  accountsType = [] as AccountType[];
  shopCategories = [] as ShopTag[];
  cities = [];
  shops = [] as any[];
  categories = [] as Categories[];
  brands = [] as any[];
  deliveryClasses = [] as any[];
  vehicleTypes = [] as any[];
  vehicleSpecialRequirements = [] as any[];
  deliveryTypeCategories = [] as any[];
  productVariationsSelectionControlTypes = [] as any[];
  variationValueTypes = [] as any[];
  operations = [];
  controlTypes = [];
  formulaConditionTypes = [];
  productTypes = [];
  digitalDeliveryWays = [];
  digitalProductFileLocation = [];
  productTaxClasses = [];
  timeUnits = [];
  operationTypes = [] as Array<{ id: string; value: number | string }>;
  //* Mutations

  @Mutation
  [Mutations.COUNTRIES](payload: Array<Country>) {
    this.countries = payload;
  }

  @Mutation
  [Mutations.CURRENCIES](payload: Currency[]) {
    this.currencies = payload;
  }

  @Mutation
  [Mutations.LANGUAGES](payload: Language[]) {
    this.languages = payload;
  }

  @Mutation
  [Mutations.ACCOUNTS_TYPE](payload: AccountType[]) {
    this.accountsType = payload;
  }

  @Mutation
  [Mutations.SHOP_CATEGORIES](payload: ShopTag[]) {
    this.shopCategories = payload;
  }

  @Mutation
  [Mutations.SET_CITIES](cities) {
    this.cities = cities;
  }

  @Mutation
  [Mutations.SET_AREAS](areas) {
    this.areas = areas;
  }

  @Mutation
  [Mutations.SET_ICONS](payload: Icon[]) {
    this.icons = payload;
  }

  @Mutation
  [Mutations.GET_SHOPS](payload) {
    this.shops = payload;
  }

  @Mutation
  [Mutations.CATEGORIES](payload) {
    this.categories = payload;
  }

  @Mutation
  [Mutations.BRANDS](payload) {
    this.brands = payload;
  }

  @Mutation
  [Mutations.DELIVERY_CLASSES](payload) {
    this.deliveryClasses = payload;
  }
  @Mutation
  [Mutations.VEHICLE_TYPES](payload) {
    this.vehicleTypes = payload;
  }
  @Mutation
  [Mutations.VEHICLE_SPECIAL_REQUIREMENTS](payload) {
    this.vehicleSpecialRequirements = payload;
  }

  @Mutation
  [Mutations.DELIVERY_TYPES_CATEGORIES](payload) {
    this.deliveryTypeCategories = payload;
  }

  @Mutation
  [Mutations.SET_TIME_UNITS](payload) {
    this.timeUnits = payload;
  }

  @Mutation
  [Mutations.SET_OPERATION_TYPES](payload) {
    this.operationTypes = payload;
  }

  @Mutation
  [Mutations.VARIATIONS_SELECTION_CONTROL_TYPES](payload) {
    this.productVariationsSelectionControlTypes = payload;
  }

  @Mutation
  [Mutations.VARIATIONS_VALUE_TYPES](payload) {
    this.variationValueTypes = payload;
  }
  @Mutation
  [Mutations.SET_OPERATIONS](payload) {
    this.operations = payload;
  }
  @Mutation
  [Mutations.CONTROL_TYPES](payload) {
    this.controlTypes = payload;
  }
  @Mutation
  [Mutations.FORMULA_CONDITION_TYPES](payload) {
    this.formulaConditionTypes = payload;
  }
  @Mutation
  [Mutations.PRODUCT_TYPES](payload) {
    this.productTypes = payload;
  }
  @Mutation
  [Mutations.DIGITAL_DELIVERY_WAYS](payload) {
    this.digitalDeliveryWays = payload;
  }
  @Mutation
  [Mutations.DIGITAL_PRODUCT_FILE_LOCATION](payload) {
    this.digitalProductFileLocation = payload;
  }
  @Mutation
  [Mutations.PRODUCT_TAX_CLASSES](payload) {
    this.productTaxClasses = payload;
  }

  //! Actions

  @Action
  [Actions.GET_CITY_BY_COUNTRYID](countryId) {
    const payload = {
      method: "get",
      url: Actions.GET_CITY_BY_COUNTRYID + "?countryId=" + countryId,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.SET_CITIES, res?.data.data);
    });
  }

  @Action
  [Actions.GET_AREA_BY_CITYID](cityId) {
    const payload = {
      method: "get",
      url: Actions.GET_AREA_BY_CITYID + "?cityId=" + cityId,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.SET_AREAS, res?.data.data);
    });
  }

  @Action
  [Actions.COUNTRIES]() {
    const payload = {
      method: "get",
      url: Actions.COUNTRIES,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.COUNTRIES, response?.data);
    });
  }

  @Action
  [Actions.CURRENCIES]() {
    const payload = {
      method: "get",
      url: Actions.CURRENCIES,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.CURRENCIES, response?.data);
    });
  }
  @Action
  [Actions.DELIVERY_CLASSES]() {
    const reqData = {
      method: "get",
      url: Actions.DELIVERY_CLASSES,
    };
    Api(reqData).then((res) => {
      this.context.commit(Mutations.DELIVERY_CLASSES, res?.data.data);
    });
  }

  @Action
  [Actions.LANGUAGES]() {
    const payload = {
      method: "get",
      url: Actions.LANGUAGES,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.LANGUAGES, response?.data);
    });
  }

  @Action
  [Actions.ACCOUNTS_TYPE]() {
    const payload = {
      method: "get",
      url: Actions.ACCOUNTS_TYPE,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.ACCOUNTS_TYPE, response?.data);
    });
  }

  @Action
  [Actions.SHOP_CATEGORIES]() {
    const payload = {
      method: "get",
      url: Actions.SHOP_CATEGORIES,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.SHOP_CATEGORIES, response?.data);
    });
  }

  @Action
  [Actions.GET_SHOPS]() {
    const payload = {
      method: "get",
      url: Actions.GET_SHOPS,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.GET_SHOPS, response?.data);
    });
  }

  // Settings API Get Request
  @Mutation
  [Mutations.SET_SETTINGS](settings) {
    this.settings = settings;
  }

  @Action
  [Actions.SETTINGS]() {
    const payload = {
      method: "get",
      url: Actions.SETTINGS,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.SET_SETTINGS, res?.data.data);
    });
  }

  @Action
  [Actions.FONTAWESOME_ICONS]() {
    Api({ url: Actions.FONTAWESOME_ICONS, method: "get" }).then((res) => {
      this.context.commit(Mutations.SET_ICONS, res?.data.data);
    });
  }

  @Action
  async [Actions.GET_PRODUCT_BRANDS]() {
    try {
      const payload = {
        method: "get",
        url: Actions.GET_PRODUCT_BRANDS,
      };
      const res = await Api(payload);
      this.context.commit(Mutations.BRANDS, res?.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  @Action
  [Actions.CATEGORIES]() {
    const payload = {
      method: "get",
      url: Actions.CATEGORIES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.CATEGORIES, res?.data.data);
    });
  }
  @Action
  [Actions.VEHICLE_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.VEHICLE_TYPES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.VEHICLE_TYPES, res?.data.data);
    });
  }
  @Action
  [Actions.VEHICLE_SPECIAL_REQUIREMENTS]() {
    const payload = {
      method: "get",
      url: Actions.VEHICLE_SPECIAL_REQUIREMENTS,
    };
    Api(payload).then((res) => {
      this.context.commit(
        Mutations.VEHICLE_SPECIAL_REQUIREMENTS,
        res?.data.data
      );
    });
  }
  @Action
  [Actions.DELIVERY_TYPES_CATEGORIES]() {
    const payload = {
      method: "get",
      url: Actions.DELIVERY_TYPES_CATEGORIES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.DELIVERY_TYPES_CATEGORIES, res?.data.data);
    });
  }
  @Action
  [Actions.VARIATIONS_SELECTION_CONTROL_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.VARIATIONS_SELECTION_CONTROL_TYPES,
    };
    Api(payload).then((res) => {
      this.context.commit(
        Mutations.VARIATIONS_SELECTION_CONTROL_TYPES,
        res?.data.data
      );
    });
  }
  @Action
  [Actions.VARIATIONS_VALUE_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.VARIATIONS_VALUE_TYPES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.VARIATIONS_VALUE_TYPES, res?.data.data);
    });
  }
  @Action
  [Actions.CONTROL_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.CONTROL_TYPES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.CONTROL_TYPES, res?.data.data);
    });
  }
  @Action
  [Actions.FORMULA_CONDITION_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.FORMULA_CONDITION_TYPES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.FORMULA_CONDITION_TYPES, res?.data.data);
    });
  }
  @Action
  [Actions.PRODUCT_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.PRODUCT_TYPES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.PRODUCT_TYPES, res?.data.data);
    });
  }
  @Action
  [Actions.DIGITAL_DELIVERY_WAYS]() {
    const payload = {
      method: "get",
      url: Actions.DIGITAL_DELIVERY_WAYS,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.DIGITAL_DELIVERY_WAYS, res?.data.data);
    });
  }
  @Action
  [Actions.DIGITAL_PRODUCT_FILE_LOCATION]() {
    const payload = {
      method: "get",
      url: Actions.DIGITAL_PRODUCT_FILE_LOCATION,
    };
    Api(payload).then((res) => {
      this.context.commit(
        Mutations.DIGITAL_PRODUCT_FILE_LOCATION,
        res?.data.data
      );
    });
  }
  @Action
  [Actions.PRODUCT_TAX_CLASSES]() {
    const payload = {
      method: "get",
      url: Actions.PRODUCT_TAX_CLASSES,
    };
    Api(payload).then((res) => {
      this.context.commit(Mutations.PRODUCT_TAX_CLASSES, res?.data.data);
    });
  }

  @Action
  [Actions.GET_TIME_UNITS]() {
    Api({ url: Actions.GET_TIME_UNITS, method: "get" }).then((res) => {
      this.context.commit(Mutations.SET_TIME_UNITS, res?.data.data);
    });
  }

  @Action
  [Actions.GET_OPERATION_TYPES]() {
    const payload = {
      method: "get",
      url: Actions.GET_OPERATION_TYPES,
    };

    Api(payload).then((response) => {
      this.context.commit(Mutations.SET_OPERATION_TYPES, response?.data.data);
      this.context.commit(Mutations.SET_OPERATIONS, response?.data.data);
    });
  }

  get getCurrencies(): Array<Currency> {
    return this.currencies;
  }

  get getCountries(): Array<Country> {
    return this.countries;
  }

  get getLanguages(): Array<Language> {
    return this.languages;
  }

  get getAreas(): Array<Area> {
    return this.areas;
  }

  get getAccountsType(): Array<AccountType> {
    return this.accountsType;
  }

  get getShopCategories(): Array<ShopTag> {
    return this.shopCategories;
  }

  get getSettings(): Settings {
    return this.settings;
  }

  get getCities() {
    return this.cities;
  }

  get getIcons() {
    return this.icons;
  }

  get getTimeUnits() {
    return this.timeUnits;
  }
  get getOperationTypes() {
    return this.operationTypes;
  }
}
