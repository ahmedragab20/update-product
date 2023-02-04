import { Pagination } from "@/types";
import Api from "@/utils/ApiHelper";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Wallet } from "@/types";
import Swal from "sweetalert2";
import i18n from "@/core/plugins/i18n";

@Module
export default class WalletModule extends VuexModule {
  WalletList: Array<Wallet> = [];
  WalletDetails: Wallet;
  shops = [];

  WalletTransactionTable: Array<any> = [];

  InDepositeToWallet: Array<any> = [];
  InWithdrawFromWallet: Array<any> = [];

  pagination: Pagination = {
    totalPages: 0,
    totalCount: 0,
    pageSize: 6,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  };
  get getWalletDetails() {
    return this.WalletDetails;
  }

  @Mutation
  [Mutations.SET_WALLET_TRANSACTIONS_BY_ID](payload) {
    this.WalletTransactionTable = payload;
  }

  
  @Mutation
  [Mutations.SET_WALLET_DETAILS](item) {
    this.WalletDetails = item;
  }
  @Mutation
  [Mutations.UPDATE_CURRENT_PAGE_TRANSACTION_TABLE](currentPage) {
    this.pagination.pageNumber = currentPage;
  }
  @Mutation
  [Mutations.UPDATE_TRANSACTION_TABLE]({
    totalPages,
    totalCount,
    pageSize,
    currentPage,
    hasPreviousPage,
    hasNextPage,
  }) {
    this.pagination = {
      totalPages,
      totalCount,
      pageSize,
      pageNumber: currentPage,
      hasPreviousPage,
      hasNextPage,
    };
  }
  @Mutation
  [Mutations.SET_WALLET_LIST](Wallet: Array<Wallet>) {
    this.WalletList = [...Wallet];
  }
  
  @Action
  [Actions.DEPOSITE_TO_WALLET](payload) {
    return new Promise((resolve, reject) => {
      Api({ url: Actions.DEPOSITE_TO_WALLET, method: "post", payload })
        .then((res) => {
          console.log(res);
          resolve(res?.data);
          if (res?.data.statusCode == 200) {
            Swal.fire({
              text: `Deposite To Wallet  Successfully ! `,
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            }).then(() => {
              resolve(res?.data.data);
            });
          } else {
            Swal.fire({
              text: res?.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
          }
        })
        .catch((er) => {
          reject(er);
        });
    });
  }

  @Action
  [Actions.WITHDRAW_TO_WALLET](payload) {
    console.log(payload);

    return new Promise((resolve, reject) => {
      Api({ url: Actions.WITHDRAW_TO_WALLET, method: "post", payload })
        .then((res) => {
          console.log(res);

          if (res?.data.statusCode == 200) {
            Swal.fire({
              text: i18n.global.t("withdrawFromWalletSuccessfully"),
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            }).then(() => {
              resolve(res?.data.data);
            });
          } else {
            Swal.fire({
              text: res?.data.message,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
          }

          
        })
        .catch((er) => {
          reject(er);
        });
    });
  }

  @Action
  [Actions.GET_WALLET_BY_ID](id) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url: Actions.GET_WALLET_BY_ID + `?shopId=${id}`,
      };

      Api(payload).then((response) => {
        resolve(response?.data.data);

        console.log({ product: response?.data });
      });
    });
  }
  @Action
  [Actions.SET_DEFAULT_ACCOUNT_DEPOSITE](payload) {
    console.log(payload);
    Api({
      method: "post",
      url: Actions.SET_DEFAULT_ACCOUNT_DEPOSITE,
      payload,
    }).then((res) => {
      if (res?.data.statusCode == 200) {
        Swal.fire({
          text: ` `,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      } else {
        Swal.fire({
          text: res?.data.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      }
    });
  }
  @Action
  [Actions.SET_DEFAULT_ACCOUNT_WITHDRAW](payload) {
    console.log(payload);
    Api({
      method: "post",
      url: Actions.SET_DEFAULT_ACCOUNT_WITHDRAW,
      payload,
    }).then((res) => {
      if (res?.data.statusCode == 200) {
        Swal.fire({
          text: ` `,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      } else {
        Swal.fire({
          text: res?.data.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      }
    });
  }


  @Action
  [Actions.GET_WALLET_TRANSACTIONS_BY_ID]({ id, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      const payload = {
        method: "get",
        url:
          Actions.GET_WALLET_TRANSACTIONS_BY_ID +
          `?&WalletId=${id}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      };

      Api(payload).then((response) => {
        this.context.commit(
          Mutations.SET_WALLET_TRANSACTIONS_BY_ID,
          response?.data.data
        );
        console.log({ product: response?.data });
        this.context.commit(Mutations.UPDATE_TRANSACTION_TABLE, response?.data);
      });
    });
  }

  @Action
  [Actions.GET_WALLET_LIST]({ query, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      let data: Array<Wallet> = [];

      const payload = {
        method: "get",
        url:
          Actions.GET_WALLET_LIST +
          `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      };
      Api(payload).then((res) => {
        res?.data.data?.map((wallet) => {
          this.context.rootGetters.getMarketData.shops.map((c) => {
            if (parseInt(c.id) === parseInt(wallet.shopId)) {
              data.push({
                name: `${c.name}-${wallet.name}`,
                key: wallet.key,
                id: wallet.id,
                shopId: wallet.shopId,
                description: wallet.description,
                availableBalance: wallet.availableBalance,
                freezedBalance: wallet.freezedBalance,
                currency: wallet.currency,
                defaultDepositeAccountId:wallet.defaultDepositeAccountId,
                defaultWithdrawAccountId:wallet.defaultWithdrawAccountId,
              });
            }
          });
        });
        this.context.commit(Mutations.SET_WALLET_LIST, data);
      });
    });
  }
}
