export default interface AccountTypeData {
    id: string;
    value: string;
    logo: string;
    countries?: Array<{
      id: string,
    }>
  }
  