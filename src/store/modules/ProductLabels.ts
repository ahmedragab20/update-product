import { Pagination } from '@/types';
import Api from "@/utils/ApiHelper";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ProductLabel } from "@/types";
import Swal from "sweetalert2";
import i18n from '@/core/plugins/i18n'

@Module
export default class ProductLabels extends VuexModule {
    ProductLabels: Array<ProductLabel> = [];
    shops = []
    products: Array<any> = []
    connectedProducts: Array<any> = []

    pagination: Pagination = {
        totalPages: 0,
        totalCount: 0,
        pageSize: 6,
        pageNumber: 1,
        hasPreviousPage: true,
        hasNextPage: true,
    }


    get getPagination(): Pagination {
        return this.pagination
    }
    @Mutation
    [Mutations.UPDATE_CURRENT_PAGE](currentPage) {
        this.pagination.pageNumber = currentPage
    }
    @Mutation
    [Mutations.UPDATE_PAGINATION]({ totalPages,
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
        console.log(this.pagination)
    }
    @Mutation
    [Mutations.SET_PRODUCT_LABELS](labels: Array<ProductLabel>) {
        this.ProductLabels = [...labels];
    }
    @Mutation
    [Mutations.SET_LABEL_SHOPS](payload) {
        this.shops = payload;
    }
    @Mutation
    [Mutations.ADD_PRODCUCT_LABEL](payload) {
        this.ProductLabels.push(payload)
    }
    @Mutation
    [Mutations.DELETE_PRODUCT_LABEL](id) {
        this.ProductLabels = this.ProductLabels.filter(l => {
            l.id != id
        })
    }
    @Mutation
    [Mutations.SET_LABEL_PRODUCTS](products) {

        this.connectedProducts = products.data
    }
    @Mutation
    [Mutations.SET_PRODUCTS_LIST](payload) {
        this.products = payload.data
    }
    @Mutation
    [Mutations.UPDATE_LABEL_PRODUCTS](payload) {
        payload.forEach(element => {
            this.connectedProducts.push({ id: element.id, name: element.name, thumbnail: element.thumbnail })
        });
    }
    @Mutation
    [Mutations.FILTER_LABEL_PRODUCTS](payload) {
        console.log(payload);

        this.connectedProducts = this.connectedProducts.filter(p => payload.indexOf(p.id) == -1)
    }
    @Action
    [Actions.ADD_PRODUCT_FOR_LABEL]({ id, connectedProducts }) {
        const payload = { id, connectedProducts: [...connectedProducts].map(el => el.id) }
        return new Promise((resolve) => {

            Api({ url: Actions.ADD_PRODUCT_FOR_LABEL, method: 'post', payload }).then(res => {
                if (res?.data)
                    this.context.commit(Mutations.UPDATE_LABEL_PRODUCTS, [...connectedProducts])
                resolve(res?.data)
            })
        })
    }
    @Action
    [Actions.UPDATE_PRODUCT_LABEL](payload) {



        Swal.fire({
            title: i18n.global.t('alertTitle'),
            text: i18n.global.t('updateLabelAlertText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: i18n.global.t('cancel'),

            cancelButtonColor: '#d33',
            confirmButtonText: i18n.global.t('update'),
        }).then(status => {
            if (status.isConfirmed) {

                Api({ url: Actions.UPDATE_PRODUCT_LABEL, payload, method: 'post' }).then(res => {
                    Swal.fire({
                        text: i18n.global.t('updateSuccess'),
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: i18n.global.t('ok'),
                        cancelButtonText: i18n.global.t('cancel'),
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary",
                        },
                    })
                })
            }

        })



    }
    @Action
    [Actions.REMOVE_PRODUCT_FROM_LABEL](payload) {
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
                Api({ method: 'post', url: Actions.REMOVE_PRODUCT_FROM_LABEL, payload: payload }).then(res => {
                    this.context.commit(Mutations.FILTER_LABEL_PRODUCTS, payload.connectedProducts)
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
    [Actions.SEARCH_PRODUCTS]({ query, pageSize, pageNumber }) {
        return new Promise((resolve, reject) => {

            Api({ url: Actions.SEARCH_PRODUCTS + `?value=${query}`, method: 'get' }).then(res => {
                this.context.commit(Mutations.SET_PRODUCTS_LIST, res?.data)
                resolve(res?.data)
            }).catch(er => {
                reject(er)
            })
        })
    }
    @Action
    [Actions.GET_PRODUCT_LABELS]({ query, pageSize, pageNumber }) {
        return new Promise((resolve, reject) => {

            const payload = {
                method: "get",
                url: Actions.GET_PRODUCT_LABELS + `?name=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}`

            }
            Api(payload).then(
                (res) => {
                    this.context.commit(Mutations.SET_PRODUCT_LABELS, res?.data.data as Array<ProductLabel>)
                    this.context.commit(Mutations.UPDATE_PAGINATION, res?.data)

                }
            );
        })
    }
    @Action
    [Actions.GET_PRODUCT_LABEL]({ id }) {
        return new Promise((resolve, reject) => {

            const payload = {
                method: "get",
                url: Actions.GET_PRODUCT_LABEL + `?id=${id}`

            }
            Api(payload).then(
                (res) => {

                    resolve(res?.data.data)

                }
            );
        })
    }
    @Action
    [Actions.GET_LABEL_SHOPS]() {
        return new Promise((resolve, reject) => {

            Api({ url: Actions.GET_LABEL_SHOPS, method: "get" }).then(res => {
                reject(res?.data.data)
                this.context.commit(Mutations.SET_LABEL_SHOPS)
            })

        })
    }
    @Action
    [Actions.GET_LABEL_PRODUCTS]({ id }) {
        Api({ method: 'get', url: Actions.GET_LABEL_PRODUCTS + `?id=${id}&pageSize=${100000}&pageNumber=${1}` }).then(res => {
            this.context.commit(Mutations.SET_LABEL_PRODUCTS, res?.data)

        })

    }
    @Action
    [Actions.ADD_PRODUCT_LABEL](payload) {
        console.log(payload);

        return new Promise((resolve, reject) => {
            Api({ url: Actions.ADD_PRODUCT_LABEL, method: "post", payload }).then((res) => {
                console.log(res);

                resolve(res?.data.data)
                Swal.fire({
                    text: `${payload.resources[0].name} has added Successfully ! `,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary",
                    },
                })
                // this.context.commit(Mutations.ADD_PRODCUCT_LABEL)

            }).catch(er => {
                reject(er)
            })

        })
    }
    @Action
    [Actions.DELETE_PRODUCT_LABEL](payload) {
        Swal.fire({
            title: i18n.global.t('alertTitle'),
            text: i18n.global.t('deleteLabelAlertText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: i18n.global.t('deleteAlertConfirm'),
            cancelButtonText: i18n.global.t('cancel'),
        }).then(status => {
            if (status.isConfirmed)
                Api({ method: 'post', url: Actions.DELETE_PRODUCT_LABEL, payload: { id: payload } }).then(res => {
                    if (res?.data.statusCode == 200) {

                        this.context.dispatch(Actions.GET_PRODUCT_LABELS, { query: '', pageSize: this.pagination.pageSize, pageNumber: this.pagination.pageNumber })
                        Swal.fire({
                            text: `  ${i18n.global.t('deleteLabelAlertText')}`,
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-light-primary",
                            },
                        })
                    }
                    else {
                        Swal.fire({
                            text: res?.data.message,
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-light-primary",
                            },
                        })

                    }
                })
        })
    }
}
