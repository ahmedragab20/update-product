// start up calls
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";

export default () => {
  // countries api
  store.dispatch(Actions.COUNTRIES);
  store.dispatch(Actions.CURRENCIES);
  store.dispatch(Actions.LANGUAGES);
  store.dispatch(Actions.ACCOUNTS_TYPE);
  store.dispatch(Actions.SHOP_CATEGORIES);
  store.dispatch(Actions.CONDITION_TYPE);
  store.dispatch(Actions.COPMERISON_TYPE);
  store.dispatch(Actions.CLIENTS_CONDITION);
  store.dispatch(Actions.GENDER);
  store.dispatch(Actions.FONTAWESOME_ICONS);

  
  
  store.dispatch(Actions.DELIVERY_CLASSES);
  store.dispatch(Actions.VEHICLE_TYPES);
  store.dispatch(Actions.VEHICLE_SPECIAL_REQUIREMENTS);
  store.dispatch(Actions.DELIVERY_TYPES_CATEGORIES);
  store.dispatch(Actions.VARIATIONS_SELECTION_CONTROL_TYPES);
  store.dispatch(Actions.VARIATIONS_VALUE_TYPES);
  store.dispatch(Actions.OPERATIONS);
  store.dispatch(Actions.CONTROL_TYPES);
  store.dispatch(Actions.FORMULA_CONDITION_TYPES);
  store.dispatch(Actions.PRODUCT_TYPES);
  store.dispatch(Actions.DIGITAL_DELIVERY_WAYS);
  store.dispatch(Actions.PRODUCT_TAX_CLASSES);
  store.dispatch(Actions.DIGITAL_PRODUCT_FILE_LOCATION);

  if (store.getters.isUserAuthenticated) {
    store.dispatch(Actions.USER);
    store.dispatch(Actions.SETTINGS);
    store.dispatch(Actions.MARKET);
    // store.dispatch(Actions.GET_SHOPS);
    store.dispatch(Actions.CATEGORIES);
   
    
  }
};
