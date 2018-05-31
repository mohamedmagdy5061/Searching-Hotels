import { Injectable } from '@angular/core';
import { Http , Response,Headers,URLSearchParams, Jsonp} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class SearchServiceService {

 url="https://api.myjson.com/bins/tl0bp"

  constructor(private  _http: Http) { }

  getAllResult(){
    return this._http.get(this.url).map(res=>{
      return res.json();
    })
  }





}
