import { Actions, Mutations } from "@/store/enums/StoreEnums";

import {ClientGroupType} from '@/api/data/ClientGroupType'

import { Pagination } from "@/interfaces/pagination";
import Api from "@/utils/ApiHelper";
import Swal from "sweetalert2";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class ClientGroup extends VuexModule {
  //? sate
 
  ClientGroups: Array<ClientGroupType> = [];
  AllData: Array<ClientGroupType> = [];
  ClientGroup:{} | undefined;
GroupUpdatePayload:any | undefined;

  pagination: Pagination = {
    totalPages: 100,
    totalCount: 100,
    pageSize: 8,
    pageNumber: 1,
    hasPreviousPage: true,
    hasNextPage: true,
  };
  
  //* Mutations

 
  @Mutation
  [Mutations.SET_CLIENT_GROUP](CLIENTGROUP: Array<ClientGroupType>) {
    // this.ClientGroups = CLIENTGROUP;
    this.AllData=CLIENTGROUP;
   
    console.log(" this.CLIENTGROUP ",CLIENTGROUP )
 
    this.pagination.totalCount = CLIENTGROUP.length;
    this.ClientGroups  = CLIENTGROUP.slice(
      ( this.pagination.pageNumber - 1) *  this.pagination.pageSize,
       this.pagination.pageSize *  this.pagination.pageNumber
    )
    this.pagination.totalCount=CLIENTGROUP.length
    console.log(" this.  this.pagination ",   this.pagination )
    console.log(" this.ClientGroup ", this.ClientGroups )
  }
  
  @Mutation
  [Mutations.UPDATE_PAGINATION_CLIENT_GROUP](value) {
    console.log("v",value)
    console.log("this.AllData",this.AllData)
    this.pagination = {
      pageSize: this.pagination.pageSize,
      pageNumber: this.pagination.pageNumber,
      totalCount: this.pagination.totalCount,
      hasPreviousPage: true,
      hasNextPage: true,
      totalPages: 100,
    };
    this.ClientGroups  = this.AllData.slice(
      ( this.pagination.pageNumber - 1) *  this.pagination.pageSize,
       this.pagination.pageSize *  this.pagination.pageNumber
    )
    this.pagination.totalCount=this.AllData.length
    console.log(" this.  this.pagination ",   this.pagination )
    console.log(" this.ClientGroup ", this.ClientGroups )
  

  }

  @Mutation
  [Mutations.SET_CLIENT_GROUP_BY_ID](item) {
    this.ClientGroup = item;
    
    console.log("single",this.ClientGroup)
  }
  @Mutation
  [Mutations.FILTER_GROUP](id) {
    this.ClientGroups=this.AllData.filter((el) => {
      return el.conditions.some((f) => {
        return f.condition.id ===id;
      })})}
      @Mutation
      [Mutations.SEARCH_GROUP](name) {
        this.ClientGroups=this.AllData.filter(
          (p) =>
            p.name.toLowerCase().indexOf(name.value.toLocaleLowerCase()) != -1 ||
            !name.value
        )
        // console.log("Res",res)
        console.log("name.value",name.value)
        console.log("this.AllData",this.AllData)
      
      }
 

  //! Actions
 
  @Action
  [Actions.GET_CLIENT_GROUP_BY_ID](id) {
    let item :
     { id: string;
   
       name: string;
       icon: string,
       textColorHexa:string,
       backgroundColorHeax: string,
       conditionsOperatorId: {
         id:number,
         name:string
       },
       conditions: Array<
         {
           id:string,
           conditionId:string,
           value:string,
           minValue:string,
           maxValue:string,
           cityId:string,
           countryId:string,
           operationTypeId:string,
         }
       >};
    console.log("is=d",id)
    console.log("i this.ClientGroups", this.ClientGroups)
    // let item=  this.GategoriesList.find(x => x.id === parseInt(id))
    this.ClientGroups.forEach((el) => {
      if (parseInt(el.id) == parseInt(id)) {
        item.name=el.name
        item.id=el.id
    item.icon=el.icon
    item.textColorHexa=el.textColorHexa
    item.backgroundColorHeax=el.backgroundColorHeax
    item.conditionsOperatorId=el.conditionsOperatorId
        item.conditions = el.conditions.map(item => {
          return {
            conditionId: item.condition.id,
            operationTypeId: item.operationType.id,
            value: item.value,
            minValue: item.minValue,
            maxValue: item.maxValue,
            cityId: item.cityId,
            countryId: item.countryId,
            id: item.id
          };
        });
      }
    });

    // this.context.commit(Mutations.SET_CLIENT_GROUP_BY_ID, item);
    return new Promise((resolve, reject) => {
      // console.log("CATEGORIE_BY_ID",payload);

      resolve(item);
    });
  }

  @Action
  [Actions.DELETE_CLIENT_GROUP](payload) {
    Api({
      method: "post",
      url: Actions.DELETE_CLIENT_GROUP,
      payload: { id: payload },
    }).then((res) => {
      Swal.fire({
        text: " Client Group has been Removed !",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#04c8c8",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
    });
  }
  
  @Action
  [Actions.GET_CLIENT_GROUP]({ query, pageSize, pageNumber }) {
    const payload = {
      method: "get",
      url:
        Actions.GET_CLIENT_GROUP 
        +
        `?name=${query}&pageSize=1000000000&pageNumber=${pageNumber}`,
    };
 

    Api(payload).then((response) => {
      this.context.commit(
        Mutations.SET_CLIENT_GROUP,
        response?.data.data as Array<ClientGroupType>
      );
     
      console.log({ kawthar: response?.data });
    });
  }
 
  @Action
  [Actions.UPDATE_CLIENT_GROUP](payload: any)  {
    let conditions=[]
    console.log(payload)
    this.GroupUpdatePayload={
id:payload.id,
name:payload.name,
conditionsOperatorId:payload?.conditionsOperator?.id,
icon:payload.icon,
backgroundColorHeax:payload.backgroundColorHeax,
textColorHexa:payload.textColorHexa,
conditions:[] as any
    }
    payload.conditions.forEach(el=>{
       this.GroupUpdatePayload?.conditions.push({
        id: el.id,
        conditionId: el.condition?.id,
        value: el.value,
        minValue: el.minValue,
        maxValue: el.maxValue,
        operationTypeId: el.operationType.id
      })

    })
    console.log("   this.GroupUpdatePayload",   this.GroupUpdatePayload)
    payload=this.GroupUpdatePayload
   

    Api({ method: "post", url: Actions.UPDATE_CLIENT_GROUP, payload }).then(
      (res) => {
        Swal.fire({
          text: " Client Group has been Updated !",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#04c8c8",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  @Action
  [Actions.ADD_CLIENT_GROUP](payload) {
    console.log(payload);

    Swal.fire({
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#04c8c8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      title: "Your work has been saved",
      showConfirmButton: true,
    });
    Api({ method: "post", url: Actions.ADD_CLIENT_GROUP, payload }).then((res) => {
      console.log(res?.data);
      // let returnedTarget = {} as productModifiersType;
     
    
    });
  }
 
}
