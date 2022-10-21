import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'view-transaction-create',
  templateUrl: './view-transaction-create.component.html',
  styleUrls: ['./view-transaction-create.component.css']
})

export class ViewTransactionCreateComponent {
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
    this.router.navigate([`transaction/${event.index}`])
  }
}
