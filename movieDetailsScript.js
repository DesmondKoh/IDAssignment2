var api_key = "6377432a6f5b68b2dd2593d879d1ff91";

$(document).ready(function(){
    checkURLParameter();
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
    showMovieDetail(id)
    showVideo(id)
}


// +------------------------
// | Show Movie Details
// +------------------------

function showMovieDetail(id){
    $('#video').html('<img id="trailer_not_avail" src="images/trailer_not_available.png">');
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
        $('#details-poster').html("<img id='poster' src='" + poster_path + "'>")
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
