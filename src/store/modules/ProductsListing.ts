import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
// import Api from "@/utils/ApiHelper";

@Module
export default class ProductsListing extends VuexModule {
  Products: any[] = [
    {
      id: 1,
      label: ["Black T-Shirt"],
      prices: [9.99, 84.55, 66.57],
      description: "A black t-shirt with a great design and quality",
      image: "/images/collection/black-shirt.jpg",
    },
    {
      id: 2,
      label: ["Blue T-Shirt", "قميص ازرق"],
      price: [8.78],
      description: "A Blue t-shirt with a great design and quality",
      image: "/images/collection/blue-shirt.jpg",
    },
    {
      id: 3,
      label: ["Dark Blue T-Shirt", "Camiseta Azul Oscuro"],
      price: [11.99, 66.8],
      description: "A Dark-Blue t-shirt with a great design and quality",
      image: "/images/collection/dark-blue-shirt.jpg",
    },
    {
      id: 4,
      label: ["Pink T-Shirt"],
      price: [10.54],
      description: "A Pink t-shirt with a great design and quality",
      image: "/images/collection/pink-shirt.jpg",
    },
  ];
}
