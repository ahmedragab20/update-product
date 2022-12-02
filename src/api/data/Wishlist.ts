export default interface Wishlist {
    id: string;
    deviceId: string;
    productCounts: number,
    shopId?: string,
    products?: Array<{
        id: string,
        thumbnail: string,
        name: string,
        price: number,
        quantity: number
    }>
}
