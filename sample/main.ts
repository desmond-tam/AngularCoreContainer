import { enableProdMode, Injector }               from '@angular/core';
import { platformBrowserDynamic }       from '@angular/platform-browser-dynamic';

import { AppModule }                    from './app/app.module';

import { environment, yachtapi, ahoyclubwebsite } from './environments/environment';

import { IApplicationSetting, IAllSettings } from './app/models/global.interface';
import {Injectable, ReflectiveInjector } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppSettingService } from '../src/app/auth/app.service';
import { IAppState } from './app/store/state/app.state';
import { ExchangeRatesModel, ExchangeRates } from './app/yachts/models/yacht-search.model';

var settings:IApplicationSetting;
var exchangeRates:ExchangeRatesModel;

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}


export function getAhoyclubBaseUrl() {
  return settings.AhoyclubWebsite.Url;
}

export function getWhitelabelBaseUrl() {
  return settings.WhitelabelWebsite.Url;
}

export function getYachtApiUrl() {
  return settings.YachtApi.Url + '/api/yacht';
 //return yachtapi.url + '/api/yacht';
}

export function getExchangeApiUrl() {
  return settings.YachtApi.Url + '/api/booking';
}

export function getAvailabilityApiUrl() {
  return settings.YachtApi.Url + '/api/yacht';
}

export function getRegionApiUrl() {
  return settings.YachtApi.Url + '/api/region';
}

export function getAgentApiUrl() {
  return settings.YachtApi.Url + '/api/agent';
}

export function getCrmApiUrl() {
  return settings.YachtApi.Url + '/api/crmdata';
}

export function getAccountUrl() {
  return settings.AhoyclubWebsite.Url + '/account';
}

export function getEmailPdfUrl() {
  return settings.AhoyclubWebsite.Url + '/api/emailpdf/sendProposalEmail';
}

export function getFileUploadUrl() {
  return settings.YachtApi.Url + '/api/upload';
}

export function getOptionsSetUrl() {
  return settings.YachtApi.Url + '/api/optionset';
}

export function getSettings():IApplicationSetting {
  return settings;
}

export function getExchangeRates():ExchangeRatesModel {
  return exchangeRates;
}
export function getAzureCDNUrl(){
  return settings.azureCDNUrl.Url;
}

const providers = [
  { provide: 'APP_SETTINGS'     , useFactory: getSettings, deps:[] },
  { provide: 'EXCHANGE_RATES'   , useFactory: getExchangeRates, deps:[] },
  { provide: 'BASE_URL',          useFactory: getBaseUrl, deps: [] },
  { provide: 'AHOYCLUB_BASE_URL', useFactory: getAhoyclubBaseUrl, deps: [] },
  { provide: 'YACHT_API',         useFactory: getYachtApiUrl, deps: [] },
  { provide: 'EXCHANGE_API',      useFactory: getExchangeApiUrl, deps: [] },
  { provide: 'AVAILABILITY_API',  useFactory: getAvailabilityApiUrl, deps: [] },
  { provide: 'BOOKING_API',       useFactory: getExchangeApiUrl, deps: [] },
  { provide: 'REGION_API',        useFactory: getRegionApiUrl, deps: [] },
  { provide: 'AGENT_API',         useFactory: getAgentApiUrl, deps: [] },
  { provide: 'CRM_API',           useFactory: getCrmApiUrl, deps: [] },
  { provide: 'ACCOUNT_API',       useFactory: getAccountUrl, deps: [] },
  { provide: 'EMAIL_PDF_API',     useFactory: getEmailPdfUrl, deps: [] },
  { provide: 'UPLOAD_API',        useFactory: getFileUploadUrl, deps: [] },
  { provide: 'OPTIONSSET_API',    useFactory: getOptionsSetUrl, deps: [] },
  { provide: 'AZURE_CDN_URL',     useFactory: getAzureCDNUrl, deps: [] },
  { provide: 'WHITELABEL_BASE_URL', useFactory: getWhitelabelBaseUrl, deps: []},
];

if (environment.production) {
  enableProdMode();
}

const appService = new AppSettingService();

appService.getAllSettings().subscribe((result:IAllSettings) => {
  settings = result.settings;
  exchangeRates = result.exchangeRates;
  platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));
});

