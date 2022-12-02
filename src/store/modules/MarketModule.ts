import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Currency, Language, Market } from "@/types";
import Api from "@/utils/ApiHelper";
// import { Language } from "element-plus/es/locale";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class MarketModule extends VuexModule {
  market = {} as Market;
  cities = [];
  currentSetupLangs = [];
  initSetupData = {};
  // Settings API Get Request
  @Mutation
  [Mutations.SET_MARKET](market) {
    this.market = market;
  }
  @Mutation
  [Mutations.UPDATE_MARKET](market) {
    this.market = market;
  }

  @Mutation
  [Mutations.SET_CURRENT_LANGS](langs) {
    this.currentSetupLangs = langs;
  }

  @Mutation
  [Mutations.SET_SETUP_DATA](obj) {
    this.initSetupData = obj;
  }

  @Action
  [Actions.SET_SETUP_DATA](obj) {
    this.context.commit(Mutations.SET_SETUP_DATA, obj);
  }

  @Action
  [Actions.SET_CURRENT_LANGS](langs) {
    this.context.commit(Mutations.SET_CURRENT_LANGS, langs);
  }
  @Action
  [Actions.MARKET]() {
    const payload = {
      method: "get",
      url: Actions.MARKET,
    };
    Api(payload).then((res) => {
      console.log({ market: res });

      this.context.commit(Mutations.SET_MARKET, res?.data.data);
    });
  }

  @Action
  [Actions.UPDATE_MARKET](obj) {
    const payload = {
      method: "post",
      url: Actions.UPDATE_MARKET,
    };
    Api(payload).then((res) => {
      console.log(
        "%cHELLO WORLD",
        "color: orange; font-size: 1rem; font-weight: bold"
      );
      this.context.commit(Mutations.UPDATE_MARKET, res?.data.data);
    });
  }
  get getMarketData(): Market {
    return this.market;
  }

  get getSupportedCurrencies(): Array<Currency> {
    return this.market.currencies?.map((currId) => {
      return this.context.rootGetters.getCurrencies?.data?.find(
        (c) => c.id === currId
      );
    });
  }

  get getSupportedLanguages(): Array<Language> {
    return this.market.languages?.map((langId) => {
      return this.context.rootGetters.getLanguages.data.find(
        (l) => l.id === langId
      );
    });
  }
}
