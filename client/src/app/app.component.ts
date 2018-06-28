import { Component, NgModule, OnInit } from '@angular/core';
import { PriceService } from './price.service';
import { Action } from './model/action';
import { Event } from './model/event';
import { Message } from './model/message';
import { User } from './model/user';
import { WebSocketService } from './websocket.service';
import { PriceTable } from './model/price-table';
export interface PriceElement {
  code: string;
  company: number;
  price: number;
  volume: number;
  value: number;
  change: number;
  percentChange: number;
  changeType: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@NgModule({
  imports: [

  ]
})

export class AppComponent implements OnInit {
  action = Action;
  user: User;
  ioConnection: any;
  title = 'Dash board';
  displayedColumns: string[] = ['code', 'company', 'price', 'value', "change", "percentChange"];
  dataSourceGain: any;
  dataSourceLose: any;
  constructor(private _priceService: PriceService, private socketService: WebSocketService) { }

  ngOnInit() {
    this.getListData();
    this.initIoConnection();

  }

  getListData(): any {
    var self = this;
    this._priceService.getListData().subscribe(
      data => {
        var arrayData = data as PriceElement[]
        arrayData.sort(function (a, b) { return b.value - a.value });
        this.dataSourceGain = arrayData.slice(0, 20);
        arrayData.sort(function (a, b) { return a.value - b.value });
        this.dataSourceLose = arrayData.slice(0, 20);
      },
      err => {
        console.log(err)
      },
      () => { console.log('done loading data') }
    )
  }

  private initIoConnection(): void {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onReBoundData()
      .subscribe((data: PriceTable[]) => {
        data.sort(function (a, b) { return b.value - a.value });
        this.dataSourceGain = data.slice(0, 20);
        data.sort(function (a, b) { return a.value - b.value });
        this.dataSourceLose = data.slice(0, 20);
      });
    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

}

