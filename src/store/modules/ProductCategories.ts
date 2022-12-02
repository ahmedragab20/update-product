import { Actions, Mutations } from "@/store/enums/StoreEnums";
import ProductCategoriesType from "@/api/data/productCategoriesType";
import { ConnectedProduct } from "@/api/data/ConnectedProduct";
import { Pagination } from "@/interfaces/pagination";
import parentList from "@/api/data/parentList"
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2";
import i18n from '@/core/plugins/i18n'
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ProductCategories extends VuexModule {
  //? sate
  Gategories: Array<ProductCategoriesType> = [];

  GategoriesList: Array<ProductCategoriesType> = [];
  parentList : Array<parentList>=[]

  products: Array<any> = [];
  ProductCategorie: ProductCategoriesType | undefined;

  connectedProducts: Array<ConnectedProduct> = [];

  pagination = {
    pageSize: 5,
    pageNumber: 1,

    total: 5,
  };
  messageIsValidSlug = "slug Must be Unique";

  messageIsValidCode = "code Must be Unique";
  isValidSlug = false;
  isValidCode = false;
 

  //* Mutations

  @Mutation
  [Mutations.GET_CATEGORIES](CATEGORIES: Array<ProductCategoriesType>) {
    this.Gategories = CATEGORIES;
  }
  @Mutation
  [Mutations.GET_CATEGORIES_LIST](CATEGORIES: Array<ProductCategoriesType>) {
    this.GategoriesList = CATEGORIES;

CATEGORIES.forEach(el=>{
  this.parentList?.push({
    id:el.id,
    name:el.name
  })
})




   
  }
  @Mutation
  [Mutations.SET_PRODUCTS_LIST](payload) {
    this.products = payload.data;
  }

  @Mutation
  [Mutations.ADD_CATEGORIES](payload) {
    let Gategories = {} as ProductCategoriesType;

    Gategories = payload;
    this.Gategories.push(Gategories);
  }
  @Mutation
  [Mutations.SET_MESSAGE_ISVALID](payload) {
    if (payload) {
      this.messageIsValidSlug = "this Slug is already used";
    }
  }

  @Mutation
  [Mutations.SET_MESSAGE_ISVALIDCODE](payload) {
    this.messageIsValidCode = payload;
  }
  @Mutation
  [Mutations.ISVALID_SLUG](payload) {
    this.isValidSlug = payload;
  }

  @Mutation
  [Mutations.ISVALID_CODE](payload) {
    this.isValidCode = payload;
  }
  @Mutation
  [Mutations.GET_CATEGORY_PRODUCTS](products) {
    let product = [];
 
    this.pagination.total = products.length;
    product = products.slice(
      this.pagination.pageSize * this.pagination.pageNumber -
        this.pagination.pageSize,
      this.pagination.pageSize * this.pagination.pageNumber
    );
  

    this.connectedProducts = product;
  }
  @Mutation
  [Mutations.SET_PRODUCT_Categorie_BY_ID](item) {
    this.ProductCategorie = item;
  }
  @Mutation
  [Mutations.UPDATE_CATEGORY_PRODUCT](payload) {
    payload.forEach((element) => {
      this.connectedProducts.push(
        this.products.find((el) => el?.id == element)
      );
    });
  }
  @Mutation
  [Mutations.UPDATE_PAGINATION](value) {


    this.pagination = {
      pageSize: this.pagination.pageSize,
      pageNumber: value,
      total: this.pagination.total,
    };
 
  }

  //! Actions
  @Action
  [Actions.IS_VALID_CODE_PRODUCT_CATEGORY](payload) {
    return new Promise((resolve) => {
      Api({
        method: "post",
        url: Actions.IS_VALID_CODE_PRODUCT_CATEGORY,
        payload,
      }).then((res) => {
        this.context.commit(Mutations.ISVALID_CODE, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.ADD_CATEGORIES](payload) {
    console.log(payload);
    (payload?.parentId=='') ? payload.parentId=null :payload.parentId=payload.parentId
    return new Promise((resolve) => {
    Api({ method: "post", url: Actions.ADD_CATEGORIES, payload }).then(
      (res) => {
        resolve(res?.data.data);
        Swal.fire({
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#04c8c8",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
          text: `${payload.resources[0].name} has added Successfully ! `,
          showConfirmButton: true,
        });
      
        this.context.dispatch(Actions.GET_CATEGORIES);
        let newItem: Object = {};

  
        newItem = {
          id: res?.data.data.id,
          name: payload.resources[0].name,
        };

        const returnedTarget: ProductCategoriesType = Object.assign(
          payload,
          newItem
        );

        let newCategories = Object.assign({}, returnedTarget);

        this.context.commit(Mutations.ADD_CATEGORIES, newCategories);
      }
    );
    })
  }
  @Action
  [Actions.GET_CATEGORY_PRODUCTS](id) {
    return new Promise((resolve, reject) => {
      Api({ method: "get", url: Actions.GET_CATEGORY_PRODUCTS + `?id=${id}` })
        .then((res) => {
          this.context.commit(Mutations.GET_CATEGORY_PRODUCTS, res?.data.data);
       
          resolve(res?.data.data);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  @Action
  [Actions.IS_VALID_SLUG_PRODUCT_CATEGORIES](payload) {
    return new Promise((resolve) => {
      Api({
        method: "post",
        url: Actions.IS_VALID_SLUG_PRODUCT_CATEGORIES,
        payload,
      }).then((res) => {
      
        this.context.commit(Mutations.ISVALID_SLUG, res?.data.data);
        this.context.commit(Mutations.SET_MESSAGE_ISVALID, res?.data.data);
        resolve(res?.data.data);
      });
    });
  }
  @Action
  [Actions.UPDATE_CATEGORIS](payload: ProductCategoriesType) {
    (payload?.parentId=='0') ? payload.parentId=null :payload.parentId=payload.parentId
    return new Promise((resolve) => {
    Api({ method: "post", url: Actions.UPDATE_CATEGORIS, payload }).then(
      (res) => {
        this.context.dispatch(Actions.GET_CATEGORIES);
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
      
     resolve(res?.data.data);
  });
})
  }
  @Action
  [Actions.REMOVE_PRODUCTS_FOMR_CATEGORY](payload) {
    Api({
      method: "post",
      url: Actions.REMOVE_PRODUCTS_FOMR_CATEGORY,
      payload,
    }).then((res) => {});
  }
  @Action
  [Actions.ADD_PRODUCTS_TO_CATEGORY]({ id, connectedProducts }) {
    const payload = { id, connectedProducts: [...connectedProducts] };
 
  
    Api({
      method: "post",
      url: Actions.ADD_PRODUCTS_TO_CATEGORY,
      payload,
    }).then((res) => {
      Swal.fire({
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#04c8c8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
        title: "Your work has been saved",
        showConfirmButton: true,
      });
      this.context.commit(Mutations.UPDATE_CATEGORY_PRODUCT, [
        ...connectedProducts,
      ]);
    });
  }
  @Action
  [Actions.UPDATE_CATEGORY_PARENT_AND_ORDER](payload) {
 
    for (const obj of payload) {
      if (obj.parentId === undefined || obj.parentId === null) {
        obj.parentId = "0";
      }
    }


    Api({
      method: "post",
      url: Actions.UPDATE_CATEGORY_PARENT_AND_ORDER,
      payload,
    }).then((res) => {
      console.log("Res", res);
    });
  }
  @Action
  [Actions.GET_CATEGORIE_PRODUCTS](id) {
    return new Promise((resolve, reject) => {
      Api({ method: "get", url: Actions.GET_CATEGORIE_PRODUCTS + `?id=${id}` })
        .then((res) => {
          this.context.commit(Mutations.GET_CATEGORIE_PRODUCTS, res?.data.data);
          resolve(res?.data.data);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
  @Action
  [Actions.SEARCH_PRODUCTS]({ query, pageSize, pageNumber }) {
    return new Promise((resolve, reject) => {
      Api({ url: Actions.SEARCH_PRODUCTS + `?value=${query}`, method: "get" })
        .then((res) => {
          this.context.commit(Mutations.SET_PRODUCTS_LIST, res?.data);
          resolve(res?.data);
        })
        .catch((er) => {
          reject(er);
        });
    });
  }

  @Action
  [Actions.DELETE_CATEGORY](payload) {
    return new Promise((resolve, reject) => {
    Api({
      method: "post",
      url: Actions.DELETE_CATEGORY,
      payload:payload,
    }).then((res) => {
      Swal.fire({
        text: i18n.global.t('deleteSuccess'),
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: i18n.global.t('ok'),
        customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
        },
    })
    resolve(res?.data);
  })
  .catch((er) => {
    reject(er);
  });
});
  }
  @Action
  [Actions.GET_CATEGORIES]() {
    const payload = {
      method: "get",
      url: Actions.GET_CATEGORIES + `?name=&pageSize=10000000`,
      // `?name=&pageSize=6&pageNumber=1`,
    };

    let CategoriesResult: Array<ProductCategoriesType> = [];

    Api(payload).then((response) => {
      this.context.commit(Mutations.GET_CATEGORIES_LIST, response?.data.data);
 
      const parent = response?.data.data.filter(
        (x) => x.parentId == 0 || x.parentId == null
      );
      const CategoriesChild = response?.data.data.filter(
        (x) => x.parentId !== 0
      );

      parent.forEach((el) => {
        return CategoriesResult.push({
          id: el.id,
          name: el.name,
          code: el.code,
          thumbnailPath: el.thumbnailPath,
          thumbnail: el.thumbnail,
          parentId: el.parentId,
          order: el.order,
          Gategories: GenerateCategoriesTree(CategoriesChild, el),
        });
      });
      console.log("CategoriesResult", CategoriesResult);

      this.context.commit(
        Mutations.GET_CATEGORIES,
        CategoriesResult as Array<ProductCategoriesType>
      );
    });
  }
  @Action
  [Actions.GET_PRODUCT_Categorie_BY_ID](id) {
    let item = {};
    // let item=  this.GategoriesList.find(x => x.id === parseInt(id))
    this.GategoriesList.forEach((el) => {
      if (el.id == parseInt(id)) {
        item = el;
      }
    });

    this.context.commit(Mutations.SET_PRODUCT_Categorie_BY_ID, item);
    return new Promise((resolve, reject) => {
      console.log("CATEGORIE_BY_ID",item);

      resolve(item);
    });
  }

  @Action
  [Actions.UPLOAD_FILE](data: any) {
    const payload = {
      method: "post",
      url: Actions.UPLOAD_FILE,
      payload: data,
    };

    return Api(payload);
  }
}
function GenerateCategoriesTree(Array1: Array<any>, object: any) {
  let list: Array<ProductCategoriesType> = [];

  Array1.forEach((el) => {
    // console.log("Array1",Array1)
    // console.log("Array1",typeof(object.id))

    object.id = parseInt(object.id);

    //el.parentId==object.id
    if (el.parentId == object.id) {
      list.push({
        id: el.id,
        name: el.name,
        code: el.code,
        thumbnailPath: el.thumbnailPath,
        thumbnail: el.thumbnail,
        parentId: el.parentId,
        order: el.order,
        Gategories: GenerateCategoriesTree(Array1, el),
      });
    }
  });

  return list;
}
