import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'view-account-create',
  templateUrl: './view-account-create.component.html',
  styleUrls: ['./view-account-create.component.css']
})

export class ViewAccountCreateComponent implements OnInit {

  constructor(
    private router: Router   
  ) {
  }
  
  ngOnInit(): void {
  }
}
