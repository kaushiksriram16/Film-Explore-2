import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {

  saveMoviesLocal(title, year, poster, imdbId) {
    let Movie = {
      Title: title,
      Year: year,
      Poster: poster,
      ImdbId: imdbId,
    };
    let BookmarkedMovies = [];
    let Ids = [];

    if (localStorage.getItem('BookmarkedMovies')) {
      BookmarkedMovies = JSON.parse(localStorage.getItem('BookmarkedMovies'));
      Ids = JSON.parse(localStorage.getItem('Ids'));
      if (!Ids.includes(Movie.ImdbId)) {
        BookmarkedMovies = [Movie, ...BookmarkedMovies];
        Ids = [Movie.ImdbId, ...Ids];
        Swal.fire({
          title: '<b style="color:grey">Bookmarked!</b>',
          text: 'Succesfully Added to your Library',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: '<b style="color:grey">Exists! </b>',
          text: 'This movie is already added to Bookmarks',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    } else {
      BookmarkedMovies = [Movie];
      Ids = [Movie.ImdbId];
    }
    localStorage.setItem('BookmarkedMovies', JSON.stringify(BookmarkedMovies));
    localStorage.setItem('Ids', JSON.stringify(Ids));
  }
}
