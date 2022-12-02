import { Views } from '@/shared/enums/Views';
import { Pagination } from '@/types';
import Api from "@/utils/ApiHelper";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AbandonedCart } from "@/types";
import Swal from "sweetalert2";
import i18n from '@/core/plugins/i18n'
import { reactive } from 'vue';
import { AbandonedCartOffer } from '@/api/data/AbandonedCart';

@Module
export default class Loyalty extends VuexModule {
    offerDto = reactive<AbandonedCartOffer>({
        leftDuration: 0,
        leftDurationUnit: "",
        shopIds: [],
        deliveryDiscountPercetnage: 0,
        expirationIn: 0,
        expirationInUnit: "",
        sendSMS: true,
        sendEmail: true,
        deliveryDiscount: true,
        cartSubTotalDiscount: true,
        carts: [],
        prices: [],
        resources: [],
    });

    filterDto = reactive({
        ShopIds: [],
        OperationTypeId: "",
        MinValue: "",
        MaxValue: "",
        Value: "",
    });

    cartDetails = reactive({
        createdAt: "",
        clientFirstName: "",
        clientLastName: "",
        clientPhoneNumber: "",
        clientEmail: "",
        shopId: "",
        products: [
            {
                id: "",
                thumbnail: "",
                name: "",
                price: 0,
                quantity: 0
            }
        ]
    })

    get getAbandonedCartDetails() {
        return this.cartDetails
    }
    abandonedCarts: Array<AbandonedCart> = [];
    abandonedCartsOffers: Array<any> = [];
    activeView = Views.TABLE_VIEW;
    pagination: Pagination = {
        totalPages: 0,
        totalCount: 0,
        pageSize: 6,
        pageNumber: 1,
        hasPreviousPage: true,
        hasNextPage: true,
    }
    @Mutation
    SET_ABANDONED_CART_ACTIVE_VIEW(v: Views) {
        this.activeView = v;
    }

    @Mutation
    SET_OFFER_DTO(payload) {
        if (payload)
            Object.assign(this.offerDto, {
                ...payload, shopIds: payload.shops,
                leftDurationUnit: payload.leftDurationUnitId,
                expirationInUnit: payload.expirationInUnitId
            })
        else
            Object.assign(this.offerDto, {
                leftDuration: 0,
                leftDurationUnit: "",
                shopIds: [],
                deliveryDiscountPercetnage: 0,
                expirationIn: 0,
                expirationInUnit: "",
                sendSMS: true,
                sendEmail: true,
                deliveryDiscount: true,
                cartSubTotalDiscount: true,
                carts: [],
                prices: [],
                resources: [],
                id: null
            })

    }


    @Mutation
    [Mutations.SET_ABANDONED_CARTS_OFFERS](payload) {
        this.abandonedCartsOffers = payload
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
    }
    @Mutation
    [Mutations.SET_ABANDONED_CARTS](payload) {
        this.abandonedCarts = payload;
    }
    @Mutation
    [Mutations.SET_ABANDONED_CART](payload) {
        this.cartDetails = { ...payload };
    }
    @Action
    [Actions.GET_ABANDONED_CARTS]({ pageNumber, pageSize, ShopIds, OperationTypeId, MinValue, MaxValue, Value
    }
    ) {

        let params = `?`;
        params += `pageNumber=${pageNumber}`
        params += `&pageSize=${pageSize}`
        params += `&OperationTypeId=${OperationTypeId}`
        params += `&MinValue=${MinValue}`
        params += `&MaxValue=${MaxValue}`
        params += `&Value=${Value}`
        ShopIds.forEach(element => {
            params += `&ShopIds=${element}`
        });
        Api({ url: Actions.GET_ABANDONED_CARTS + params, method: 'get' }).then(res => {
            this.context.commit(Mutations.SET_ABANDONED_CARTS, res?.data.data.data)
        })
    }
    @Action
    [Actions.CREATE_ABANDONED_CART](payload) {

        return new Promise((resolve) => {

            Api({ url: Actions.CREATE_ABANDONED_CART, method: 'post', payload }).then(res => {
                this.context.dispatch(Actions.GET_ABANDONED_CARTS_OFFERS , {pageSize:this.pagination.pageSize, pageNumber:this.pagination.pageNumber})
                 resolve(res)
                
            })
        })
    }

    @Action
    [Actions.GET_ABANDONED_CARTS_OFFERS](payload) {
        
        let query = '?';
        if(payload)
        for (const key in payload)
            query += `&${key}=${payload[key]}`
        query = query.replace('?&', '?')


        Api({ url: Actions.GET_ABANDONED_CARTS_OFFERS + query, method: 'get' }).then((res) => {
            this.context.commit(Mutations.SET_ABANDONED_CARTS_OFFERS, res?.data.data)
            this.context.commit(Mutations.UPDATE_PAGINATION, res?.data)
        })
    }

    @Action
    [Actions.GET_ABANDONED_CART](id: string) {
        Api({ url: Actions.GET_ABANDONED_CART + `?id=${id}`, method: 'get' }).then(res => {
            this.context.commit(Mutations.SET_ABANDONED_CART, res?.data.data)
        })
    }

    @Action
    [Actions.REMOVE_ABANDONED_OFFER](id) {
        Swal.fire({
            title: i18n.global.t('alertTitle'),
            text: i18n.global.t('deleteAbandonedOfferText'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: i18n.global.t('deleteAlertConfirm'),
            cancelButtonText: i18n.global.t('cancel'),
        }).then(status => {
            if (status.isConfirmed)
                Api({ url: Actions.REMOVE_ABANDONED_OFFER, method: 'post', payload: { id } }).then(() => {
                    this.context.dispatch(Actions.GET_ABANDONED_CARTS_OFFERS)
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
}
