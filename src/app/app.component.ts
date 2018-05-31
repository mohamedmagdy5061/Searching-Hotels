import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,FormGroup,Validators,FormControl,AbstractControl} from "@angular/forms";
import { SearchServiceService } from './search-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  staticAlertClosed = true;
  days: any=0
  start={year:2020,month:10,day:1};
  end={year:2020,month:12,day:30};
  result=[];
  filterVal;
  empty=true
  searchResults;
  endValue;
  min:number;
  max:number;

  constructor(
      private modalService: NgbModal,
      private _FormBuilder: FormBuilder,
      private _searchService:SearchServiceService
  ){
    // this.selectToday()
  }


// this method to select today in date feild .
  selectToday() { 
    const now = new Date();
    this.start = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.end = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }


//this is the method that calculates the number of days.
totalNight(){
  const startdate = new Date(this.start.year,this.start.month-1,this.start.day).getTime();
  const enddate = new Date(this.end.year,this.end.month-1,this.end.day).getTime();
  let Night=startdate-enddate
  this.days = Math.round(Math.abs(Night/(1000*60*60*24)));
    if(this.days==0){
      this.days=1
    }
}


// sort method by name
sortByName(){
  this.result = this.result.sort((a, b)=>{
    var itemA = a.name.toUpperCase();
    var itemB = b.name.toUpperCase();
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  });
}

//sort method by price
sortByPrice(){
  this.result = this.result.sort((a, b)=>{
    var itemA = a.price;
    var itemB = b.price;
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  });
}

//this method for filter by name 
searchByName(val){
 val = this.filterVal;
 val = val.toLowerCase();
 this.result = this.result.filter((item) => {
    return item.name.toLowerCase().includes(val);
  })
  if (this.filterVal=="") {
    this.result=[];    
    this.searchResults.forEach(x=> this.result.push(x));
  }
}

//this method for filter by price 
valueChanged(){
  this.endValue=Math.floor(this.endValue)
  this.result=this.searchResults
    this.result = this.result.filter((item) => {
      if(item.price<=this.endValue){
        return item
      }
    })
}

//this method for searching by date
Search(){
  const startdate = new Date(this.start.year,this.start.month-1,this.start.day).getTime();
  const enddate = new Date(this.end.year,this.end.month-1,this.end.day).getTime();

if(startdate<=enddate){
  this._searchService.getAllResult().subscribe(res => {
     this.searchResults = res.hotels.filter(hotel =>{
      let temp = false
      hotel.availability.some(date =>
      {
      let fromString = date.from.split('-');
      let toString = date.to.split('-');
      let fromDate = new Date(+fromString[2], +fromString[1]-1, +fromString[0]);
      let toDate = new Date(+toString[2], +toString[1]-1, +toString[0]);
        if(fromDate.getTime() > startdate && toDate.getTime() < enddate)
          {
            temp = true        
          }    
      })
      //this for give days * hotel.price 
        hotel.price= Math.ceil(this.days*hotel.price);
        console.log(hotel.price) 
        return temp
  })  
   this.result=this.searchResults 
   this.empty=false;
  //this for give the min and max for filter by price 
      this.min = Math.min.apply(null, this.result.map((item)=> {
      return item.price;
    })),
    this.max = Math.max.apply(null, this.result.map((item)=> {
      return item.price;
    }));
  })
    }else{
      //this for get alert when choose start date biggest end date and auto Hide after 3s
      this.staticAlertClosed = false
      setTimeout(() => this.staticAlertClosed = true, 3000);
      this.result=[];
      this.empty=true;  
      }
  }
}



