export default interface UserData {
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  phoneCountryCode?: string;
  countryId?: string;
  otp?: string;
  deviceId?: string;
  password?: string;
}
