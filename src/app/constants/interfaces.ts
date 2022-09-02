
export interface IResponse {
    access_token: string;
    scope: string;
    token_type: string;
  }

  
export interface IFilteredData {
  confirmed: string;
  recovered: string;
  deaths: string;
  vaccinated: string;
  newCases: string;
  lastUpdateDate: string;
}
