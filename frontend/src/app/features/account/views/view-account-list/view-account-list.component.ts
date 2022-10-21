import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'view-account-list',
  templateUrl: './view-account-list.component.html',
  styleUrls: ['./view-account-list.component.css']
})
export class ViewAccountListComponent implements OnInit {

  tabIdx: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let tab_idx = params.get('tab_idx');
      if (tab_idx == null) {
        return;
      }
      this.tabIdx = +tab_idx;

    });
  }

  onSelectTab(event: any) {
    this.router.navigate([`account/${event.index}`])

  }
}