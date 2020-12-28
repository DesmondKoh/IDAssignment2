var api_key = "6377432a6f5b68b2dd2593d879d1ff91";

$(document).ready(function(){
    checkURLParameter();
    searchMovie();
});


// +---------------------------
// | Check for Search Parameter
// +---------------------------

function checkURLParameter(){
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    var search = getUrlParameter("search");
    $("#search").val(search); 
}


// +------------------------
// | Search Movies
// +------------------------

function searchMovie(){ 
    $("#search").keyup(function() {
        var search = $('#search').val();
        $('.movies').empty();
        if(search != ""){ $('#results').html("Searching for " + search + "...") }
        else{ $('#results').empty(); }
        for(var i = 1; i < 4; i++){
            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query=" + search +"&page=" + i + "&include_adult=false", function(data){
                $.each(data.results, function() {  
                    var poster_path;
                    var original_title = this.original_title;  
                    var movie_id = this.id;
                    var genre_id = [];    
                    var genre_name = [];

                    if(this.poster_path == null){
                        poster_path = "'images/poster_not_available.png'"
                    }
                    else{
                        poster_path = "https://image.tmdb.org/t/p/w500" + this.poster_path;
                    }

                    for( var i = 0; i < this.genre_ids.length; i++){
                        genre_id.push(this.genre_ids[i])}

                    $.getJSON("https://api.themoviedb.org/3/genre/movie/list?api_key=" + api_key + "&language=en-US", function(data1){
                        $.each(data1.genres, function() {        
                            for(var i = 0; i < genre_id.length; i++){
                                if(genre_id[i] == this.id){  
                                    genre_name.push(" " + this.name);     
                                }      
                            }  
                        }); 
                        $('.movies').append(`<div class="col-4 col-md-2">
                                            <div class="row">
                                                <img src=` + poster_path +` id="` + movie_id + `"> 
                                                <h6>` + original_title + `</h6>
                                                <h4>` +  genre_name + `</h4>
                                            </div>
                                        </div> `)   
                    });
                });
            })
        }
    }).keyup();
}


// +------------------------
// | Show Movie Details
// +------------------------

function showMovieDetail(id){
    $('.video').html('<img id="trailer_not_avail" src="images/trailer_not_available.png">');
    var video = 0;

    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + api_key + "&language=en-US", function(data1){  
        var first_video = false;
        $.each(data1.results, function() {
            video = this.key;        
            first_video = true;
            return (first_video !== true)
        });
    });

    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + api_key + "&language=en-US", function(data){  
        var genre_name = [];
        var poster_path;

        if(data.poster_path == null){
            poster_path = "images/poster_not_available.png"
        }
        else{
            poster_path = "https://image.tmdb.org/t/p/w500" + data.poster_path;
        }

        $.each(data.genres, function() {     
            genre_name.push(" " + this.name)  
        }); 

        $('#poster').html("<img src='" + poster_path + "'>")
        $('#genre').html(genre_name.toString());
        $('#title').html(data.original_title);
        $('#rating').html(data.vote_average + "/10 (" + data.vote_count + " votes)")
        $('#release').html("Release Date: " + data.release_date)
        $('#overview').html(data.overview)
        $('#trailer').html('<button type="button" class="btn btn-outline-light trailer-button" id="' + id + '">Watch Trailer</button>');
    });
    $('#infoModal').modal('show');
}


// +------------------------
// | Element Clicks
// +------------------------

// | Image Button (Search Results)
$("body").on("click", "img", function(){ 
    showMovieDetail(this.id);
});

// | Watch Trailer Button (Movie Details)
$("#trailer").on("click", "button", function(){  
    var id = $(".modal button").attr("id");
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + api_key + "&language=en-US", function(data1){  
        var first_video = false;
        $.each(data1.results, function() {
            $('.video').html('<iframe width="1157" height="650" src="https://www.youtube.com/embed/' + this.key + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
            first_video = true;
            return (first_video !== true)
        });
    });
    $('#trailerModal').modal('show');
});
    

// +------------------------
// | Others
// +------------------------

// | Disable "Enter" Key
$("#search").keypress(function(event) { 
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        event.preventDefault(); 
    }
});
