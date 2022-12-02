import { Actions, Mutations } from "@/store/enums/StoreEnums";
import Api from "@/utils/ApiHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Tag } from "@/api/data/ProductTagsData";
import Swal from "sweetalert2";
import { Pagination } from "@/types";
import i18n from "@/core/plugins/i18n";

@Module
export default class ProductTags extends VuexModule {
    tags: Array<Tag> = [];
    shops = [];
    products: Array<any> = [];
    connectedProducts: Array<any> = [];
    searchConnectedProducts = [];
    pagination: Pagination = {
        pageNumber: 1,
        totalPages: 0,
        totalCount: 0,
        pageSize: 6,
        hasPreviousPage: true,
        hasNextPage: true,
    };
    tagDto = {
        resources: [
            {
                languageId: "",
                name: "",
            }
        ],
        code: "",
        slug: "",
        order: 0,
        connectedShops: [],
        isPublishedOnJetOrderApp: true,
        isPublishedOnShopLink: true,
    };




    //Mutations
    @Mutation
    [Mutations.UPDATE_TAG_CURRENT_PAGE](currentPage) {
        this.pagination.pageNumber = currentPage;


    }
    @Mutation
    [Mutations.RESET_PAGINATION_TAGS]() {
        this.pagination = {
            pageNumber: 1,
            totalPages: 0,
            totalCount: 0,
            pageSize: 6,
            hasPreviousPage: true,
            hasNextPage: true,
        }


    }
    @Mutation
    [Mutations.UPDATE_TAG_PAGINATION]({ totalPages,
        totalCount,
        pageSize,
        currentPage,
        hasPreviousPage,
        hasNextPage }) {
        this.pagination = {
            totalPages,
            totalCount,
            pageSize,
            pageNumber: currentPage,
            hasPreviousPage,
            hasNextPage
        }

    }

    @Mutation
    [Mutations.SET_PRODUCT_TAGS](tags: Array<Tag>) {
        this.tags = tags;
    }

    @Mutation
    [Mutations.SET_TAG_PRODUCTS](payload) {
        this.connectedProducts = [...payload];

    }

    @Mutation
    [Mutations.DELETE_PRODUCT_FROM_TAG](payload) {
        this.connectedProducts = this.connectedProducts.filter(p => payload.indexOf(p.id) == -1)
    }
    @Mutation
    [Mutations.UPDATE_TABLE_PRODUCT_TAGS](payload) {
        payload.forEach(element => {
            this.connectedProducts.push({ id: element.id, name: element.name, thumbnail: element.thumbnail })
        });
    }
    @Mutation
    [Mutations.SET_SEARCH_PRODUCTS_TAGS](payload) {
        this.searchConnectedProducts = payload;
    }

    @Mutation
    [Mutations.UPDATE_PRODUCT_TAG](payload) {
        this.tagDto = { ...payload };
    }
    @Mutation
    [Mutations.REMOVE_PRODUCT_TAGS](id) {
        this.tags = this.tags.filter(ele => ele.id != id)
    }


    //Actions
    @Action
    [Actions.GET_PRODUCT_TAGS]({ query, pageSize, pageNumber }) {
        const payload = {
            method: "get",
            url: Actions.GET_PRODUCT_TAGS + `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
        };
        Api(payload).then((res) => {
            this.context.commit(Mutations.SET_PRODUCT_TAGS, res?.data.data);
            this.context.commit(Mutations.UPDATE_TAG_PAGINATION, res?.data);

        });
    }
    @Action
    [Actions.GET_PRODUCT_TAG]({ id }) {
        return new Promise((resolve, reject) => {
            const payload = {
                method: "get",
                url: Actions.GET_PRODUCT_TAG + `?id=${id}`,
            };
            Api(payload).then((res) => {
                resolve(res?.data.data)
            });
        });
    }
    @Action
    [Actions.GET_TAG_PRODUCTS]({ id }) {
        return new Promise((resolve, reject) => {
            const payload = {
                method: "get",
                url: Actions.GET_TAG_PRODUCTS + `?id=${id}&pageSize=10000&pageNumber=1`,
            };
            Api(payload).then((res) => {
                this.context.commit(Mutations.SET_TAG_PRODUCTS, res?.data.data);
                this.context.commit(Mutations.UPDATE_TAG_PAGINATION, res?.data);
                resolve(res?.data.data)
            });
        });
    }

    @Action
    [Actions.ADD_PRODUCT_TAGS](payload) {
        return new Promise((resolve) => {
            Api({ method: "post", url: Actions.ADD_PRODUCT_TAGS, payload }).then((res) => {
                resolve(res?.data)

            });
        })
    }

    @Action
    [Actions.ADD_TAG_DETAILS_PRODUCT]({ id, connectedProducts }) {
        const payload = { id, connectedProducts: [...connectedProducts].map(ele => ele.id) }
        return new Promise((resolve) => {
            Api({ method: "post", url: Actions.ADD_TAG_DETAILS_PRODUCT, payload }).then((res) => {
                if (res?.data) {
                    this.context.commit(Mutations.UPDATE_TABLE_PRODUCT_TAGS, [...connectedProducts])
                }
                resolve(res?.data)

            });
        })

    }
    @Action
    [Actions.EDIT_PRODUCT_TAG](payload) {
        return new Promise((resolve) => {
            Api({ method: "post", url: Actions.EDIT_PRODUCT_TAG, payload }).then((res) => {
                resolve(res?.data);

            })
        })
    }
    @Action
    [Actions.SEARCH_PRODUCTS_TAGS]({ query, pageSize, pageNumber }) {
        return new Promise((resolve, reject) => {
            Api({ method: 'get', url: Actions.SEARCH_PRODUCTS_TAGS + `?Value=${query}` }).then((res) => {
                this.context.commit(Mutations.SET_SEARCH_PRODUCTS_TAGS, res?.data.data)
                resolve(res?.data)
            })
        })
    }

    @Action
    [Actions.REMOVE_PRODUCT_FROM_TAG](payload) {
        Swal.fire({
            title: i18n.global.t('alertTitle'),
            text: i18n.global.t('deleteProductAlertText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: i18n.global.t('deleteAlertConfirm'),
            cancelButtonText: i18n.global.t('cancel'),
        }).then(status => {
            if (status.isConfirmed)
                Api({ method: 'post', url: Actions.REMOVE_PRODUCT_FROM_TAG, payload: payload }).then(res => {
                    this.context.commit(Mutations.DELETE_PRODUCT_FROM_TAG, payload.connectedProducts)
                    Swal.fire({
                        text: i18n.global.t('deleteSuccess'),
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: i18n.global.t('ok'),
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary",
                        },
                    })
                })
        })
    }
    @Action
    [Actions.DELETE_PRODUCT_TAGS](payload) {
        Swal.fire({
            title: i18n.global.t('alertTitle'),
            text: i18n.global.t('deleteTagAlertText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: i18n.global.t('deleteAlertConfirm'),
            cancelButtonText: i18n.global.t('cancel'),
        }).then(status => {
            if (status.isConfirmed)
                Api({ method: "post", url: Actions.DELETE_PRODUCT_TAGS, payload: { id: payload } }).then((res) => {
                    this.context.commit(Mutations.REMOVE_PRODUCT_TAGS, payload);
                    Swal.fire({
                        text: i18n.global.t('deleteSuccess'),
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: i18n.global.t('ok'),
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary",
                        },
                    })

                })
        })
    }

    @Action
    [Actions.GET_TAG_SHOPS]() {
        return new Promise((resolve, reject) => {
            Api({ url: Actions.GET_TAG_SHOPS, method: "get" }).then(res => {
                reject(res?.data.data)
                this.context.commit(Mutations.SET_TAG_SHOPS)
            })

        })
    }
}