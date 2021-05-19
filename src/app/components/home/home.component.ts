import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieDataService, private http: HttpClient) {}

  // API link of TMdb which is used to fetch recent popular movies:
  ApiLink =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=57f0bfdee1dd128bce2040054c456112';

  // Link to fetch poster image for the TMdb API:
  ImgLink = 'https://image.tmdb.org/t/p/w500';

  // Initialising an array inorder to populate the data which will be fetched from API
  PopularMovies: any[];

  // Function which carries out the process of fetching data from the API and populating that data into our Array:
  getMovieData() {
    
    // fetch(this.ApiLink)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.PopularMovies = data.results;
    //   });

    // Used http get() method instead of fetch() to fetch the movies:

      this.http.get(this.ApiLink).toPromise().then((response)=>{

      this.PopularMovies = JSON.parse(JSON.stringify(response)).results;

    })

  }

  // Function inorder to save the popular movies to the bookmarks:
  OnClick(title, year, poster, imdbId) {
    // Calling a function from MovieDataService:
    this.service.saveMoviesLocal(title, year, poster, imdbId);
  }

  ngOnInit(): void {
    // this function will be called as the page loads:
    this.getMovieData();
  }
}
