import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';
import log from 'loglevel';
import { Observable, tap } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  private url: string = '/api/input';
  private httpOptions = {
    headers: new HttpHeaders({
      'responseType': 'text',
      'Content-Type': 'application/json'
    })
  };
  // TODO: waitingliststock !!!!!!!
  private isAlwaysArray = [
    "results.warehousestock.article",
    "results.inwardstockmovement.order",
    "results.inwardstockmovement.order.batch",
    "results.futureinwardstockmovement.order",
    "results.futureinwardstockmovement.order.batch",
    "results.idletimecosts.workplace",
    "results.idletimecosts.workplace.waitinglist",
    "results.waitinglistworkstations.workplace",
    "results.waitinglistworkstations.workplace.waitinglist",
    "results.ordersinwork.workplace",
    "results.completedorders.order",
    "results.completedorders.order.batch",
    "results.cycletimes.order",
    "results.cycletimes.order.batch"
  ]
  private optionsFastXMLParser = {
    allowBooleanAttributes: false,
    alwaysCreateTextNode: false,
    attributeNamePrefix: '',
    ignoreAttributes: false,
    ignoreDeclaration: true,
    isArray: (_: string, jPath: string) => { 
      if (this.isAlwaysArray.indexOf(jPath) != -1) {
        return true;
      } else {
        return false;
      }
    },
    parseAttributeValue: false,
    parseTagValue: false,
    preserveOrder: false
  };

  constructor(private http: HttpClient, private messageService: MessageService) {
    log.debug('InputService.constructor()');
  }

  public initializeInput(xml: string) {
    let parsedJSON = this.parseXmlToJson(xml);
    let inputJSON = this.buildJSON(parsedJSON);
    this.setInput(inputJSON).subscribe(
      res => log.debug('/api/input response', res),
      err => log.debug('/api/input Error', err),
      () => this.messageService.add('/api/input request completed.')
    );
  }

  private parseXmlToJson(xml: string) {    
    const parser = new XMLParser(this.optionsFastXMLParser);
    let json: Object = parser.parse(xml);
    return json;
  }

  private buildJSON(parsedJSON: any) {

    // delete "results" in json
    let inputJSON = parsedJSON.results;
    
    // delete "order" in inwardstockmovement & futureinwardstockmovement
    inputJSON.inwardstockmovement = parsedJSON.results.inwardstockmovement.order;
    inputJSON.futureinwardstockmovement = parsedJSON.results.futureinwardstockmovement.order;
    
    // delete "workplace" waitinglistworkstations & ordersinwork
    inputJSON.waitinglistworkstations = parsedJSON.results.waitinglistworkstations.workplace;
    inputJSON.ordersinwork = parsedJSON.results.ordersinwork.workplace;

    // delete "order" in completedorders
    inputJSON.completedorders = parsedJSON.results.completedorders.order; 

    // TODO: waitingliststock!!!!!!!!!!!!
    inputJSON.waitingliststock = [
      {
        "id": 12,
        "waitinglist": [
          {
            "period": 6,
            "orderNumber": 38,
            "firstbatch": 9,
            "lastbatch": 14,
            "item": 30,
            "amount": 60,
            "timeNeed": 300
          }
        ]
      }
    ];
    return inputJSON;
  }

  // 
  // HTTP requests
  // 

  private setInput(input: Object): Observable<Object> {
    return this.http
      .post<Object>(this.url, input, this.httpOptions);
  }
}
