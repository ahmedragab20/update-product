import type AccountTypeData from "@/api/data/AccountTypeData";
import type ApiResponse from "@/api/data/ApiResponse";
import type AreaData from "@/api/data/AreaData";
import type AuthenticationResponseData from "@/api/data/AuthenticationResponseData";
import type CityData from "@/api/data/CityData";
import type CoordinatesData from "@/api/data/CoordinatesData";
import type CountryData from "@/api/data/CountryData";
import type CurrencyData from "@/api/data/CurrencyData";
import type { JwtHeaderData, JwtPayloadData } from "@/api/data/JwtData";
import type LanguageData from "@/api/data/LanguageData";
import type MarketData from "@/api/data/MarketData";
import type MarketResourceData from "@/api/data/MarketResourceData";
import type BrandResourcesData from "@/api/data/BrandResourcesData";
import type OTPData from "@/api/data/OTPData";
import type SettingsData from "@/api/data/Settings";
import type ShopData from "@/api/data/ShopData";
import type ShopTagData from "@/api/data/ShopTagData";
import type UserData from "@/api/data/UserData";
import type MarketSocialMediaData from "./api/data/MarketSocialMediaData";
import { productModifiersType } from "@/api/data/ProductModifiers";
import type ModifiersItemData from "@/api/data/ModifiersItemData";
import type ModifiersCurrencyData from "@/api/data/ModifiersCurrencyData";
import type ModifiersResourseData from "@/api/data/ModifiersResourseData";
import type ProductLabelType from "@/api/data/ProductLabelData";
import type ProductLabelResourcesData from "@/api/data/ProductLabelResources";
import type ProductCategoriesType from "@/api/data/productCategoriesType";
import type IconType from "@/api/data/IconData";
import type ProductBrands from "@/api/data/ProductBrands";
import type ManageData from "@/api/data/ManageData";
import type PaginationType from "@/interfaces/components-interfaces/Pagination";
import type AbandonedCartType from "./api/data/AbandonedCart";
import type {actionOrderTemplateType} from './api/data/actionOrderTemplate';
import type WishlistType from "./api/data/Wishlist";
import type AccountsType from "./api/data/Accounts";
import type AccountSubTypeDataType from "./api/data/AccountSubTypeData";
import type WalletType from './api/data/Wallet'
import type PointSystems from "@/api/data/PointSystems";


export type Response<T> = ApiResponse<T>;
export type AccountType = AccountTypeData;
export type Area = AreaData;
export type AuthenticationResponse = AuthenticationResponseData;
export type City = CityData;
export type Country = CountryData;
export type Language = LanguageData;
export type Currency = CurrencyData;
export type OTP = OTPData;
export type PaymentMethod = PaymentMethodData;
export type Shop = ShopData;
export type ShopTag = ShopTagData;
export type User = UserData;
export type Settings = SettingsData;
export type JwtHeader = JwtHeaderData;
export type JwtPayload = JwtPayloadData;
export type Market = MarketData;
export type MarketResource = MarketResourceData;
export type BrandResources = BrandResourcesData;
export type MarketSocialMedia = MarketSocialMediaData;
export type Coordinates = CoordinatesData;
export type productModifiers = productModifiersType;
export type ModifiersItem = ModifiersItemData;
export type ModifiersResourse = ModifiersResourseData;
export type ModifiersCurrency = ModifiersCurrencyData;
export type Pagination = PaginationType;
export type ProductLabel = ProductLabelType;
export type ProductLabelResources = ProductLabelResourcesData;
export type Icon = IconType;
export type Brand = ProductBrands;
export type Manage = ManageData;
export type productCategories=ProductCategoriesType;
export type AbandonedCart = AbandonedCartType;
export type actionOrderTemplate=actionOrderTemplateType;
export type Wishlist = WishlistType;
export type Accounts = AccountsType;
export type AccountSubTypeData = AccountSubTypeDataType;
export type Wallet=WalletType;
export type Point = PointSystems;