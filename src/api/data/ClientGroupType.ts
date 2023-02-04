
export default interface ClientGroupData {
  id?: string;

  name: string;
  icon: string,
  textColorHexa:string,
  backgroundColorHeax: string,
  conditionsOperatorId: {
    id:number,
    name:string
  },
  conditions: [
    {
      id: string,
      condition: {
        id:string,
        name:string
      },
      cityId?:string,
      countryId?:string,
      value: string,
      minValue: string,
      maxValue: string,
      operationType: {
        id:string,
        name:string
      }
    }
  ]
}