import { Component, OnInit } from '@angular/core';
import { BankService } from './bank.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bankdata: any[];
  title = 'difuzeVox';
  constructor(private service: BankService){

  }

  ngOnInit(): void {
   this.getData();
  }
  private getData(){
    this.service.getBankDetails().subscribe((data:any) => {
      this.bankdata = data;
      console.log(this.bankdata);
    }, (err) => {
      //  log error;
    }, () => {
      console.log("done");
    });
  }

}
