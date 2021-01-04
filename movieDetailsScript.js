var api_key = "6377432a6f5b68b2dd2593d879d1ff91";

$(document).ready(function(){
    var id = checkURLParameter();
    loadMovieDetail(id);
    showVideo(id);
    loadCasts(id);
    loadSimilarMovie(id);
    $(".view-more-text").hide();
    $(".view-less-text").hide();
});

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
    var id = getUrlParameter("id");
    return id; 
}


// +------------------------
// | Load Movie Details
// +------------------------

function loadMovieDetail(id){
    $('#video').html('<img id="video-size" src="images/trailer_not_available.png" width="887" height="500">');
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

        $('.details-header').css("background", "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 1) ), url(https://image.tmdb.org/t/p/original" + data.backdrop_path + ")")
        $('#details-poster').html("<img id='d-poster' src='" + poster_path + "'>")
        $('#details-genre').html(genre_name.toString());
        $('#details-title').html(data.original_title);
        $('#details-rating').html("<span id='font-light'>Movie rating: </span>" + data.vote_average + "/10 (" + data.vote_count + " votes)")
        $('#details-release').html("<span id='font-light'>Release date: </span> " + data.release_date)
        $('#details-overview').html(data.overview)
    });
}


// +------------------------
// | Show Trailer
// +------------------------

function showVideo(id){
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=" + api_key + "&language=en-US", function(data){  
        var first_video = false;
        $.each(data.results, function() {
            $('#video').html('<iframe id="video-size" width="887" height="500" src="https://www.youtube.com/embed/' + this.key + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
            first_video = true;
            return (first_video !== true)
        });
    });
}

// +------------------------
// | Load Casts
// +------------------------
function loadCasts(id){
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + api_key + "&language=en-US&page=1", function(data){
        count = 1;
        $.each(data.cast, function() {  
            var profile_path;
            if(this.profile_path == null){
                profile_path = "'images/poster_not_available.png'"
            }
            else{
                profile_path = "https://image.tmdb.org/t/p/original" + this.profile_path;
            }

            if(count < 13){
                $('.casts').append(`<div class="col-4 col-md-2">
                                    <div class="row">    
                                        <img src=` + profile_path +` id="` + this.id + `"> 
                                        <h6 id="cast-name">` + this.name + `</h6>
                                        <h6 id="cast-character">` +  this.character + `</h6>                                  
                                    </div>
                                </div> `)  
                count++;
            }
            else{
                $(".view-more-text").show();
                $('.casts-collapse').append(`<div class="col-4 col-md-2">
                                    <div class="row">    
                                        <img src=` + profile_path +` id="` + this.id + `"> 
                                        <h6 id="cast-name">` + this.name + `</h6>
                                        <h6 id="cast-character">` +  this.character + `</h6>                                  
                                    </div>
                                </div> `)  
            }
               
        });
    })          
}


// +------------------------
// | Load Similar Movies
// +------------------------
function loadSimilarMovie(id){
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=" + api_key + "&language=en-US&page=1", function(data){
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

// +------------------------
// | Show Movie Details
// +------------------------

function showMovieDetail(id){
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
        $('#more-info').html('<button type="button" class="btn btn-outline-light" id="' + id + '">More info</button>');
    });
    $('#infoModal').modal('show');
}


// +------------------------
// | Element Clicks
// +------------------------

// | Image Button (Search Results)
$(".series").on("click", "img", function(){ 
    showMovieDetail(this.id);
});

// | More info Button (Movie Details)
$("#more-info").on("click", "button", function(){  
    var id = $(".modal button").attr("id");
    window.open("movieDetails.html?id=" + id);
});

$("#collapseCast").on("hidden.bs.collapse", function(){
    $(".view-more-text").show();
    $(".view-less-text").hide();
})

$("#collapseCast").on("show.bs.collapse", function(){
    $(".view-less-text").show();
    $(".view-more-text").hide();
})

// +------------------------
// | Others
// +------------------------

// | Redirect to search page on "Enter" 
// | Code from https://www.c-sharpcorner.com/blogs/how-to-disable-enter-key-using-jquery1
$("#search").keypress(function(event) { 
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        window.open("search.html?search=" + $('#search').val());
    }
});

// | Search Button (Search Results)
$("header").on("click", "#search-button", function(){  
    window.open("search.html?search=" + $('#search').val());
});

// | Change Navbar Background to Black on Scroll
$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 850);
});
