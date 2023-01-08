// start up calls
import store from "@/store";
import { Actions } from "@/store/enums/StoreEnums";

export default async () => {
  const storedToken = localStorage.getItem("token");
  const stateToken = store.state.AuthModule.token;
  const token = stateToken || storedToken;
  const isLoggedIn = store.getters.isUserAuthenticated || storedToken;


  if (isLoggedIn) {
    await store.dispatch("AUTH_REQUESTS", token);
  }

  await store.dispatch(Actions.COUNTRIES);
  await store.dispatch(Actions.CURRENCIES);
  await store.dispatch(Actions.LANGUAGES);
  await store.dispatch(Actions.ACCOUNTS_TYPE);
  await store.dispatch(Actions.SHOP_CATEGORIES);
  await store.dispatch(Actions.CONDITION_TYPE);
  await store.dispatch(Actions.COPMERISON_TYPE);
  await store.dispatch(Actions.CLIENTS_CONDITION);
  await store.dispatch(Actions.GENDER);
  await store.dispatch(Actions.FONTAWESOME_ICONS);

  await store.dispatch(Actions.DELIVERY_CLASSES);
  await store.dispatch(Actions.VEHICLE_TYPES);
  await store.dispatch(Actions.VEHICLE_SPECIAL_REQUIREMENTS);
  await store.dispatch(Actions.DELIVERY_TYPES_CATEGORIES);
  await store.dispatch(Actions.VARIATIONS_SELECTION_CONTROL_TYPES);
  await store.dispatch(Actions.VARIATIONS_VALUE_TYPES);
  await store.dispatch(Actions.OPERATIONS);
  await store.dispatch(Actions.CONTROL_TYPES);
  await store.dispatch(Actions.FORMULA_CONDITION_TYPES);
  await store.dispatch(Actions.PRODUCT_TYPES);
  await store.dispatch(Actions.DIGITAL_DELIVERY_WAYS);
  await store.dispatch(Actions.PRODUCT_TAX_CLASSES);
  await store.dispatch(Actions.DIGITAL_PRODUCT_FILE_LOCATION);
};
