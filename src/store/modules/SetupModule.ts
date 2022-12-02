import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class SetupModule extends VuexModule {
  currentSetupLangs = [];
  initSetupData = {};
  initResources = {};
  logoKey = "";

  domainHost = "http://54.217.194.128:6644"
  mediaHost = "https://mfproductimages.s3.amazonaws.com"
  // Settings API Get Request
  @Mutation
  [Mutations.SET_CURRENT_LANGS](langs) {
    this.currentSetupLangs = langs;
  }

  @Mutation
  [Mutations.SET_SETUP_DATA](obj) {
    this.initSetupData = obj;
  }

  @Mutation
  [Mutations.SET_SETUP_RESOURCES](obj) {
    this.initResources = obj;
  }

  @Mutation
  [Mutations.ADD_SETUP_LOGO](logoKey) {
    this.logoKey = logoKey;
  }

  @Action
  [Actions.SET_SETUP_DATA](obj) {
    this.context.commit(Mutations.SET_SETUP_DATA, obj);
  }

  @Action
  [Actions.SET_SETUP_RESOURCES](obj) {
    this.context.commit(Mutations.SET_SETUP_RESOURCES, obj);
  }

  @Action
  [Actions.SET_CURRENT_LANGS](langs) {
    this.context.commit(Mutations.SET_CURRENT_LANGS, langs);
  }

  @Action({ rawError: true })
  [Actions.SEND_SETUP_DATA]() {
    const data = JSON.parse(
      JSON.stringify({
        ...this.initSetupData,
        resources: this.initResources,
        logoKey: this.logoKey,
      })
    );
    const { lat, lng } = data["location"];
    delete data.location;
    data["latitude"] = lat;
    data["longitude"] = lng;

    const payload = {
      method: "post",
      url: Actions.SEND_SETUP_DATA,
      payload: data,
    };

    return new Promise((resolve, reject) => {
      Api(payload)
        .then((res) => {
          if (res?.data.succeeded) {
            resolve(res);
          } else {
            reject(res?.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  @Action
  [Actions.ADD_SETUP_LOGO](payload) {
    const vals = {
      method: "post",
      url: Actions.ADD_SETUP_LOGO,
      payload,
    };
    Api(vals).then((res) => {
      const logoKey = res?.data.data;
      this.context.commit(Mutations.ADD_SETUP_LOGO, logoKey);
    });
  }

  get getInitSetupData() {
    return this.initSetupData;
  }

  get getResources() {
    return JSON.parse(JSON.stringify(this.initResources));
  }

  get getDomain() {
    return this.domainHost
  }
  get getMediaHost() {
    return this.mediaHost
  }
}
