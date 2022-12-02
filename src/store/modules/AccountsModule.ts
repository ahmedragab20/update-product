import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Api from "@/utils/ApiHelper";
// import { Language } from "element-plus/es/locale";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Accounts , AccountType , AccountSubTypeData } from "@/types";
import { Pagination } from '@/types';
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";
import { reactive } from 'vue';

@Module
export default class AllAccounts extends VuexModule {
  
  //? state
  pagination: Pagination = {
    totalPages: 0,
    totalCount: 0,
    pageSize: 6,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  }
  InDepositeToWallet: Array<any> = [];
  InWithdrawFromWallet: Array<any> = [];
  accounts: Array<Accounts> = [];
  accountTypes: Array<AccountType> = [];
  accountSubTypes: Array<AccountSubTypeData> = [];
  filterDto = {

    UsedAsPaymentMethod: null,
    UsedInDepositeToWallet: null,
    UsedInWithdrawFromWallet: null,
  };
  //* getters
  get getAccounts(): Array<Accounts> {
    return this.accounts;
  }
  get getAccountTypes(): Array<AccountType> {
    return this.accountTypes;
  }
  get getAccountSubTypes(): Array<AccountSubTypeData> {
    return this.accountSubTypes;
  }
  get getAccountsPagination() {
    return this.pagination;
  }

  //* Mutations
  @Mutation
  [Mutations.DELETE_ACCOUNT](id) {
    Swal.fire({
      text: i18n.global.t("deletedSuccess"),
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: i18n.global.t("ok"),
      customClass: {
        confirmButton: "btn fw-bold btn-light-primary",
      },
    })
  }
  @Mutation
  [Mutations.ADD_ACCOUNT](payload) {
    this.accounts.push(payload);
  
  }
  @Mutation
  [Mutations.SET_ACCOUNTS](payload: Accounts[]) {
    this.accounts = payload;
    this.InDepositeToWallet=payload?.filter((el) => el.usedInDepositeToWallet)
    this.InWithdrawFromWallet=payload?.filter((el) => el.usedInWithdrawFromWallet)
    this.InWithdrawFromWallet = this.InWithdrawFromWallet.filter(function (
      item
    ) {
      return item.accountSubType !== "Cash";
    });
    this.InDepositeToWallet = this.InDepositeToWallet.filter(function (item) {
      return item.accountSubType !== "Cash";
    });
    console.log('  this.InWithdrawFromWalle',  this.InWithdrawFromWallet)
  }
  @Mutation
  [Mutations.SET_ACCOUNT_TYPES](payload: AccountType[]) {
    this.accountTypes = payload;
  }
  @Mutation
  [Mutations.SET_ACCOUNT_SUBTYPES](payload: AccountSubTypeData[]) {
    this.accountSubTypes = payload;
  }
  @Mutation
  [Mutations.UPDATE_CURRENT_PAGE](currentPage) {
    this.pagination.pageNumber = currentPage
  }
  @Mutation
  [Mutations.UPDATE_PAGINATION]({ totalPages,
    totalCount,
  }) {
    this.pagination.totalPages = totalPages;
    this.pagination.totalCount = totalCount;
  }
  

  //Actions
  @Action
    [Actions.GET_ACCOUNTS]({ UsedAsPaymentMethod,UsedInDepositeToWallet,UsedInWithdrawFromWallet
      
    }){
        // let params = `?`;
       
        // params += `UsedAsPaymentMethod=${UsedAsPaymentMethod}`
        // params += `&UsedInDepositeToWallet=${UsedInDepositeToWallet}`
        // params += `&UsedInWithdrawFromWallet=${UsedInWithdrawFromWallet}`
        Api({ url: Actions.GET_ACCOUNTS + `?UsedAsPaymentMethod=${UsedAsPaymentMethod}&UsedInDepositeToWallet=${UsedInDepositeToWallet}&UsedInWithdrawFromWallet=${UsedInWithdrawFromWallet}` , method: 'get' }).then(res => {
          console.log(res?.data.data)
            this.context.commit(Mutations.SET_ACCOUNTS, res?.data.data)
            if (res?.status == 200 && res.data.statusCode == 200)
              this.context.commit(Mutations.UPDATE_PAGINATION, res?.data);
        })
    }
  
  @Action
    [Actions.GET_ACCOUNT_TYPES](){
        Api({ url: Actions.GET_ACCOUNT_TYPES , method: 'get' }).then(res => {
            this.context.commit(Mutations.SET_ACCOUNT_TYPES, res?.data.data)
        })
    }
  @Action
    [Actions.GET_ACCOUNT_SUBTYPES]({ accountTypeId }) {
      const payload = {
        method: "get",
        url:
          Actions.GET_ACCOUNT_SUBTYPES + `?accountTypeId=${accountTypeId}`,
      };
  
      Api(payload).then((response) => {
        this.context.commit(Mutations.SET_ACCOUNT_SUBTYPES, response?.data.data);
      });
    }
  @Action
  [Actions.ADD_ACCOUNT](payload) {
   
    return new Promise((resolve, reject) => {
    Api({ method: "post", url: Actions.ADD_ACCOUNT, payload }).then((res) => {
  
      resolve(res?.data.data);
      Swal.fire({
        text: i18n.global.t("addSuccess"),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: i18n.global.t("ok"),
        cancelButtonText: i18n.global.t("cancel"),
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      });
    }) .catch((er) => {
      reject(er);
    })
  })
  }
  @Action
  [Actions.DELETE_ACCOUNT](payload) {
    Api({
      method: "post",
      url: Actions.DELETE_ACCOUNT,
      payload: { accountId: payload },
    }).then((res) => {
      this.context.commit(Mutations.DELETE_ACCOUNT, payload);
    });
  }
}
