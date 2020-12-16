import { LocationStrategy } from '@angular/common';

export interface YachtPhotos {
    ThumbnailUrl: string;
}

export interface YachtLocation {
    CurrentPort: string;
    Area: string;
    Latitude: number;
    Longitude: number;
}

export interface Location {
    RegionId: number;
    RealmId: number;
    PortId?: any;
}

export interface Availability {
    CalculatedCurrencyCode?: string;
    CurrencyCode: string;
    DateFrom: Date;
    DateTo: Date;
    HourlyRate: number;
    HourlyRetailRate: number;
    ID: number;
    IsSpecialRate: boolean;
    LocationAvailability: Location[];
    RetailRate: number;
    WeeklyRate: number;
}

export interface YachtRates {
    CurrencyCode: string;
    WeeklyRate: number;
    HourlyRate: number;
    Season: string;
    priceSet:string;
    RetailWeeklyRate: number;
    RetailHourlyRate: number;
    CalculatedCurrencyCode: string;
}

export interface YachtsSearch {
    Active?: boolean,
    APA: number;
    AcceptsDayCharters: boolean;
    AcceptsWeeklyCharters: boolean;
    AccountType?:string 
    AhoyFee?: number;
    AllInclusive: boolean;
    Amenities:string;
    Availabilities: Availability[];
    Available: boolean;
    Bathrooms: number;
    Bedrooms: number;
    BuiltBy: string;
    BuiltYear: number;
    CabinConfiguration: string;
    CharterLicenseIds:any;
    CAStatus: boolean;
    CRM_yacht_id: string;
    Captain: string;
    CruiseSpeed: number;
    Entertainments:string;
    Featured: boolean;
    Fees?: YachtFees;
    Flag:string;
    DailyFees?: YachtDailyFees;
    ID: number;
    IsForSale: boolean;
    IsMember: boolean;
    KeyHighlights: string;
    Length: number;
    MaxCrew: number;
    MaxPassengers: number;
    MaxPassengersCruising: number;
    Name: string;
    PetPolicy: string;
    Pets: boolean;
    RefitYear?: number;
    RetailFee?: number;
    SaleCurrency?: any;
    SalePrice: number;
    Savings?: number;
    SecurityDeposit: number;
    SilentMember: boolean;
    SpecialActive: boolean;
    SpecialDescription?: any;
    SummerOperatingArea: string;
    Tier: number;
    TopSpeed: number;
    Toys: string;
    WinterOperatingArea: string;
    YachtCategory: string;
    YachtType: string;
    PrimaryImage: IYachtPrimaryImage;
    YachtImages:YachtImage[];
    YachtPosition: YachtLocation;
    YachtRates: YachtRates[];
    YachtLocations: Location[];
    Food: number;
    Beverage: number;
    WharfFee: number;
    AdditionalCharges: number;
    AdditionalStaff: number;
    GSTVAT: number;
    canBeAddedToProposal:boolean;
    AhoyInspected:boolean;
    BeneficialOwnerId:any;
    YachtOwnerId:any;
    YachtManagementId:any;
    CentralAgentId:any;
}

export interface Charters {
    id: number;
}

export interface YachtDailyFees {
    CharterFee: number;
    Food: number;
    Beverage: number;
    WharfFees: number;
    GST_VAT: number;
    AdditionalStaff: number;
    AdditionalCharges: number;
    TotalAmount: number;
    MinimumHours: number;
    CharterFeePlusVAT: number;
    Duration: number;
    OriginalCharterFee: number;
    RetailTotal: number;
}

export interface YachtFees {
    CharterFee: number;
    VatRate: number;
    CharterFeePlusVAT: number;
    ApaAmount: number;
    TotalAmount: number;
    OriginalCharterFee: number;
    RetailTotal: number;
}

export interface YachtAvailability {
    ID: number;
    Charters: Charters[];
    Fees?: YachtFees;
    DailyFees?: YachtDailyFees;
}

export interface ExchangeRates {
  EUR_Rate:number,
  USD_Rate:number,
  AUD_Rate:number,
  AED_Rate:number,
  GBP_Rate:number
}

export class ExchangeRatesModel implements ExchangeRates {
  EUR_Rate:number;
  USD_Rate:number;
  AUD_Rate:number;
  AED_Rate:number;
  GBP_Rate:number;

  currency_map = {
    EUR_Rate:"EURO",
    USD_Rate:"USD",
    AED_Rate:"AED",
    AUD_Rate:"AUD",
    GBP_Rate:"GBP",
  };

  getCurrencyRate(code):number {
    switch (code) {
      case "EURO":{
        return this.EUR_Rate;
        break;
      }
      case "USD":{
        return this.USD_Rate;
        break;
      }
      case "AED":{
        return this.AED_Rate;
        break;
      }
      case "AUD":{
        return this.AUD_Rate;
        break;
      }
      case "GBP":{
        return this.GBP_Rate;
        break;
      }
      default:{
        return this.USD_Rate;
        break;
      }

    }
  }

  convert(fromCurrency,toCurrency,amount) {
      const frate = this.getCurrencyRate(fromCurrency);
      const trate = this.getCurrencyRate(toCurrency);
      const result = amount / frate * trate;
      return result;
  }
}

export interface IYachtPrimaryImage {
    ThumbnailUrl: string;
}

export interface YachtImage {
  IsMain: boolean;
  URL:string;
}

export interface Email {
    Email: string;
    Date: Date;
}

export interface RootYacht {
    Yachts_search: YachtsSearch[];
    Yachts_search_availability: YachtAvailability[];
    Exchange_rates: ExchangeRates;
    Yachts_search_availability_fees: YachtAvailability[];
    Yachts_search_all: IYachtsSearchItem[];
    headers:any;
}

export interface IYachtsResponse {
  first:number;
  after:number;
  Yachts_search_all:IYachtsSearchItem[];
}

export interface IYachtsSearchItem {
  Active?: boolean,
  AcceptsDayCharters: boolean;
  AcceptsWeeklyCharters: boolean;
  AccountType?:string; 
  AllInclusive: boolean;
  Amenities:string;
  Availabilities: Availability[];
  Available: boolean;
  Bathrooms: number;
  Bedrooms: number;
  BuiltBy: string;
  BuiltYear: number;
  CharterLicenseIds:any;
  CRM_yacht_id: string;
  Entertainments:string;
  Featured: boolean;
  Flag:string;
  ID: number;
  IsMember: boolean;
  KeyHighlights: string;
  Length: number;
  MaxCrew: number;
  MaxPassengers: number;
  MaxPassengersCruising: number;
  Name: string;
  PetPolicy: string;
  Pets: boolean;
  RefitYear?: number;
  SilentMember: boolean;
  SpecialActive: boolean;
  SpecialDescription?: any;
  Tier: number;
  TopSpeed: number;
  Toys: string;
  Fees?: YachtFees;
  DailyFees?: YachtDailyFees;
  YachtCategory: string;
  YachtType: string;
  PrimaryImage: IYachtPrimaryImage;
  YachtImages:YachtImage[];
  YachtPosition: YachtLocation;
  YachtRates: YachtRates[];
  YachtLocations: Location[];
  canBeAddedToProposal:boolean;
  AhoyInspected:boolean;
  BeneficialOwnerId:any;
  YachtOwnerId:any;
  YachtManagementId:any;
  CentralAgentId:any;
}
