import { IApplicationSetting, IAllSettings } from '../models/global.interface';
import { HttpClient, HttpHandler, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExchangeRatesModel } from '../yachts/models/yacht-search.model';

const getExchangeRatesRequest = () => {
  return `{
    "query": "query BookingQuery {
      currency_rate {
        eUR_Rate, uSD_Rate, aUD_Rate, aED_Rate, gBP_Rate
      }
    }",
    "variables": {
      "toUpper": true
    }
  }`;
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export class AppSettingService {
  http:HttpClient;
  constructor() {
    const injectors = Injector.create({
      providers: [
          { provide: HttpClient, deps: [HttpHandler] },
          { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest }) },
      ],
    });
    this.http = injectors.get(HttpClient);
  }

  private getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
  }

  private getTick = () => {
    return Math.round(new Date().getTime()/(1000*60*1));
  };

  public getApplicationSetting(): Observable<IApplicationSetting> {
    const url = `${this.getBaseUrl()}assets/appsettings.json?${this.getTick()}`;
    return this.http.get<any>(url).pipe(
      map(x => x.AngularEnvironment as IApplicationSetting)
    );
  }

  public getExchangeRates(thisurl:string): Observable<ExchangeRatesModel> {
    const url = `${thisurl}?currency_rate`;
    return this.http.post<any>(url, getExchangeRatesRequest(), httpOptions).pipe(
      map(x => {
        return Object.assign(new ExchangeRatesModel(),x.Currency_rate);
      })
    );
  }

  public getAllSettings():Observable<any> {
    return new Observable((observer: Subscriber<IAllSettings>) => {
      const all={
        settings:{},
        exchangeRates:{}
      } as IAllSettings;
      this.getApplicationSetting().subscribe((result:IApplicationSetting) => {
        all.settings = result;
        const url = `${all.settings.YachtApi.Url}/api/booking`;
        this.getExchangeRates(url).subscribe((result:ExchangeRatesModel) => {
          all.exchangeRates = result;
          observer.next(all);
          observer.complete();
        })
      });
    });
  }
}
