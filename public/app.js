
var apiKey = "25013f564b74ebbbdb9b23b4f7e9372e";

$(document).ready(function () {
  $("button").click(function () {
    event.preventDefault();
    var movieValue = document.getElementById("movieSearch").value;
    var apiKey = "25013f564b74ebbbdb9b23b4f7e9372e";
    var queryURL = "https://cors-anywhere.herokuapp.com/" + "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +
      "&language=en-US&query=" + movieValue + "&page=1&include_adult=false";
   
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#movies-appear-here").empty();
      var searchedMovies = response.results;
    
      for (var i = 0; i < searchedMovies.length; i++) {
        // creating dynamic cards as anchors
        var movieId = searchedMovies[i].id
        var movieCard = $("<div>", {
          class: "card movieCard mx-auto pl-4 pt-3"
        });
        var a = $("<a>", {
          "class": "card-block clearfix",
          "href": "https://www.themoviedb.org/movie/" + searchedMovies[i].id + "-" + searchedMovies[i].title
        })
        // Creating an image tag
        var movieImg = $("<img>", {
          "class": "card-img-top mx-auto",
          "src": 'https://image.tmdb.org/t/p/w300' + searchedMovies[i].poster_path
        });

        var movieTitle = $("<h5>", {
          "class": "card-title text-center"
        }).text("title", searchedMovies[i].title);

        var movieSummary = $("<p>", {
          "class": "card-text text center"
        }).text("overview", searchedMovies[i].overview);

        //append variables for a nice package
        movieCard.append(a);
        a.append(movieImg);
        movieImg.append(movieTitle);
        movieTitle.append(movieSummary);
        $("#movies-appear-here").append(movieCard);
      };
    });
  });
});


function getPopularMovies() {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/" +
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&language=en-US&page=1&append_to_response=videos",
    method: "GET"
  }).then(function (response) {
    var movies = response.results;
    console.log("rd", response.results)
    for (var i = 0; i < movies.length; i++) {
      // Create a col for styling 
      var col = $("<div>", {
        class: "col-sm-auto",
        src: "https://api.themoviedb.org/3/movie/" + movies[i].id + "?api_key=" + apiKey + "&language=en-US"
      });
      var movieId = movies[i].id;
      var movieCard = $("<div>", {
        class: "card movieCard mx-auto pl-4 pt-3",
      });
      var a = $("<a>", {
        "class": "card-block clearfix",
        "href": "https://www.themoviedb.org/movie/" + movies[i].id + "-" + movies[i].title
      })

      // Creating an image tag
      var movieImg = $("<img>", {
        "class": "card-img-top mx-auto",
        "src": 'https://image.tmdb.org/t/p/w300' + movies[i].poster_path
      });

      var movieTitle = $("<h5>", {
        "class": "card-title text-center"
      }).text("title", movies[i].title);

      var movieSummary = $("<p>", {
        "class": "card-text text center"
      }).text("overview", movies[i].overview);

    //append elements to card package
      movieCard.append(a);
      a.append(movieImg);
      movieImg.append(movieTitle);
      // cardBody.append(movieTitle);
      movieTitle.append(movieSummary)
      $("#movies-appear-here").append(movieCard);
    }
  });
}

getPopularMovies();