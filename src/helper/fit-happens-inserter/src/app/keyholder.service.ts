import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyholderService {
  key: string = "";
  baseUrl:string = "http://localhost:32771/api";
  constructor() { }

  setKey(key: string) : void {
    this.key = key;
  }
  
  getKey() : string {
    return this.key;
  }

  hasKey() : boolean {
     if (this.key && this.key !== "")
      return true;

     return false;
  }

  getUrl() : string {
    return this.baseUrl;
  }
}
