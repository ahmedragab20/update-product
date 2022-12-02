export interface JwtHeaderData {
  alg: string;
  kid: string;
  typ: string;
  x5t: string;
}

export interface JwtPayloadData {
  aud?: string[] | string;
  auth_time: number;
  client_id: string;
  exp: number;
  iat: number;
  idp: string;
  is_market_ready: string;
  iss: string;
  jti: string;
  market_country_currency_id: string;
  market_id: string;
  nbf: number;
  number_of_shops_per_market: string;
  roles: string;
  scope: Array<string>;
  sub: string;
  user_id: string;
  user_store_owner_id: string;
}
