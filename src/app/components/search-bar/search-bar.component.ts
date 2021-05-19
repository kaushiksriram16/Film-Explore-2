import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieDataService } from 'src/app/services/movie-data.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  constructor(private service: MovieDataService, private http:HttpClient) {}

  // Initialising array to populate movies which we will get on searching:
  Movies: any[];

  // API link of TMdb which is used to fetch the movies which the user searches:
  getMovieData(val) {

    let ApiLink = 'https://omdbapi.com/?apikey=9848bbf1&type=movie&r=json&s=' + val;

    // fetch('https://omdbapi.com/?apikey=9848bbf1&type=movie&r=json&s=' + val)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.Movies = data.Search;
    //   });

    // Used http get() method instead of fetch() to fetch the movies:
      this.http.get(ApiLink).toPromise().then((response)=>{
      this.Movies = JSON.parse(JSON.stringify(response)).Search;
    })
  }

  // Function inorder to save the movies to the bookmarks which are fetched on searching:
  OnClick(title, year, poster, imdbId) {
    this.service.saveMoviesLocal(title, year, poster, imdbId);
  }

  ngOnInit(): void {}
}
