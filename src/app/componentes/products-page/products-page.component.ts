import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {
    public config:any;

    constructor(private route: ActivatedRoute) {
      this.config = this.route.snapshot.data['config'];
    }

    ngOnInit() {
      console.log(this.config)
    }
}
