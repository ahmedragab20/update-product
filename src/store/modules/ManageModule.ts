import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Manage } from "@/types";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ManageModule extends VuexModule {
  //? sate
  file = {} as Manage;

  //* Mutations

  //! Actions



  get getFile(): Manage {
    return this.file;
  }
}
