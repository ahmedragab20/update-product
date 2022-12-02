export default interface AbandonedCart {
    id: string;
    createdAt: string;
    clientFirstName: string,
    clientLastName: string,
    clientPhoneNumber: string,
    clientEmail: string,
    totalCartAmount: number,
    shopId?: string,
    products?: Array<{
        id: string,
        thumbnail: string,
        name: string,
        price: number,
        quantity: number
    }>
}

export interface AbandonedCartOffer {
    id?: string,
    createdAt?: string
    leftDuration: number;
    leftDurationUnit: string;
    shopIds: Array<string>;
    deliveryDiscountPercetnage: number;
    expirationIn: number;
    expirationInUnit: string;
    sendSMS: true;
    sendEmail: true;
    deliveryDiscount: true;
    cartSubTotalDiscount: true;
    carts: Array<AbandonedCart | string | number>;
    prices: Array<{ discount: number, cartTotal: number, currencyId: string }>;
    resources: Array<{ emailHeader: string, body: string, languageId: string }>;
}

