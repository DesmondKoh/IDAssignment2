var api_key = "6377432a6f5b68b2dd2593d879d1ff91";

$(document).ready(function(){
    var id = checkURLParameter();
    loadMovieDetail(id);
    showVideo(id);
    loadCasts(id);
    loadSimilarMovie(id);
    showReviews(id);
    $(".view-more-text").hide();
    $(".view-less-text").hide();
});

function checkURLParameter(){
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) 
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam)
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);          
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

        if(data.poster_path == null){ poster_path = "images/poster_not_available.png"; }
        else{ poster_path = "https://image.tmdb.org/t/p/w500" + data.poster_path; }

        $.each(data.genres, function() {     
            genre_name.push(" " + this.name);
        }); 

        $('.details-header').css("background", "linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 1) ), url(https://image.tmdb.org/t/p/original" + data.backdrop_path + ")");
        $('#details-poster').html("<img id='d-poster' src='" + poster_path + "'>");
        $('#details-genre').html(genre_name.toString());
        $('#details-title').html(data.original_title);
        $('#details-rating').append(data.vote_average + "/10 (" + data.vote_count + " votes)");
        $('#details-release').append(data.release_date);
        $('#details-status').append(data.status);
        $('#details-runtime').append(data.runtime + " minutes");
        $('#details-overview').html(data.overview);

        $("title").html(data.original_title + " – MovieHouse");
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
            if(this.profile_path == null) profile_path = "'images/poster_not_available.png'"     
            else profile_path = "https://image.tmdb.org/t/p/w500" + this.profile_path;

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
    var count = 0;
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=" + api_key + "&language=en-US&page=1", function(data){
        var count = 0;
            $.each(data.results, function() { 
                if(count < 12){ 
                    var poster_path;
                    var original_title = this.original_title;  
                    var movie_id = this.id;
                    var genre_id = [];    
                    var genre_name = [];

                    if(this.poster_path == null) poster_path = "'images/poster_not_available.png'"        
                    else poster_path = "https://image.tmdb.org/t/p/w500" + this.poster_path;
                    
                    for(var i = 0; i < this.genre_ids.length; i++)
                        genre_id.push(this.genre_ids[i])

                    $.getJSON("https://api.themoviedb.org/3/genre/movie/list?api_key=" + api_key + "&language=en-US", function(data1){
                        $.each(data1.genres, function() {        
                            for(var i = 0; i < genre_id.length; i++)
                                if(genre_id[i] == this.id) genre_name.push(" " + this.name);                                  
                        }); 
                        $('.movies').append(`<div class="col-4 col-md-2">
                                            <div class="row">
                                                <img src=` + poster_path +` id="` + movie_id + `"> 
                                                <h6>` + original_title + `</h6>
                                                <h4>` +  genre_name + `</h4>
                                            </div>
                                        </div> `)   
                    });
                }
                count++;
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

        if(data.poster_path == null) poster_path = "images/poster_not_available.png"    
        else poster_path = "https://image.tmdb.org/t/p/w500" + data.poster_path;
        
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
// | Load Reviews
// +------------------------
function showReviews(id){
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/reviews?api_key=" + api_key + "&language=en-US&page=1", function(data){
        var count = 0;   
        $.each(data.results, function() {     
            var username = this.author_details.username; 
            var rating = this.author_details.rating;
            var avatar_path; 
            var content = this.content.replace(/(?:\r\n|\r|\n)/g, '<br>');

            if(this.author_details.avatar_path == null) avatar_path = "images/avatar.png"         
            else if(this.author_details.avatar_path.substring(0,6) == "/https") 
                avatar_path = this.author_details.avatar_path.substring(1);       
            else avatar_path = "https://image.tmdb.org/t/p/w500" + this.author_details.avatar_path;
            
            $('.reviews').append(`<div class="row border">
                                    <div class="col-md-1"> <img id="avatar" src="`+ avatar_path +`"></div>
                                    <div class="col-md-11 left-margin">
                                        <div class="row">
                                            <div class="col-md-6"> <h5 id="details-release">`+ username +`</h5> </div>
                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div class="col-md-10 rating-star-`+ count +`">
                                                    </div>
                                                    <div class="col-md-1"> <h5 id="details-rating">`+ rating +`</h5> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr id="line">                                   
                                    <h6 id="content">`+ content +`</h6>                            
                                </div> `)

            if(rating % 2 == 0){     
                var star = rating/2;     
                for(var i = 0; i < star; i++){  
                    console.log(star) 
                    $('.rating-star-' + count).prepend('<img id="star" src="images/star_full.png">')                                                                               
                }
            }
            else{
                var star = (rating-1)/2;     
                for(var i = 0; i < star; i++){  
                    console.log(star) 
                    $('.rating-star-' + count).prepend('<img id="star" src="images/star_full.png">')                                                                               
                }
                $('.rating-star-' + count).prepend('<img id="star" src="images/star_half.png">')                                                                                
            }        
            count++;
        });    
    });
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
    if (keycode == "13") window.open("search.html?search=" + $('#search').val());
});

// | Search Button (Search Results)
$("header").on("click", "#search-button", function(){  
    window.open("search.html?search=" + $('#search').val());
});

// | Change Navbar Background to Black on Scroll
$(window).scroll(function(){
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 850);
});
