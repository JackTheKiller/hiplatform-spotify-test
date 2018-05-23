import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyword = '';
  searchType = 'artist';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.route.firstChild) {
      this.route.firstChild.params.subscribe(params => {
        this.keyword = params['keyword'];
      });
      this.route.firstChild.url.subscribe(segment => {
        this.searchType = segment[0].path;
      });
    }
  }

  search() {
    if (this.keyword.trim().length > 2) {
      this.router.navigate([this.searchType, this.keyword], { relativeTo: this.route });
    }
  }

}
