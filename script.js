$(document).ready(function() {
    loadMovie();
});

/*Load movie from API*/
function loadMovie(){
    var page = $("#page").val(); 
    var currLoc = page - 1; 
    for(var i = currLoc * 3 + 1; i < currLoc * 3 + 4; i++){
        $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + i, function(data){
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
                    genre_id.push(this.genre_ids[i])
                }
                $.getJSON("https://api.themoviedb.org/3/genre/movie/list?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US", function(data1){
                    $.each(data1.genres, function() {        
                        for(var i = 0; i < genre_id.length; i++){
                            if(genre_id[i] == this.id){  
                                genre_name.push(" " + this.name);     
                            }      
                        }  
                    }); 
                    $('.movies').append(`<div class="col-md-2 col-sm-6">
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
}

$('#popular_1').click(function(){   
    $("input[value]").val(1);
    $("#popular_text").html("Popular Movies")
    $(".series li").removeClass("active");
    $("#popular_1").addClass("active"); 
    $(".movies").empty()
    loadMovie();
}); 

$('#popular_2').click(function(){
    $("input[value]").val(2);
    $("#popular_text").html("Popular Movies – 2")
    $(".series li").removeClass("active");
    $("#popular_2").addClass("active"); 
    $(".movies").empty()
    loadMovie();
}); 

$('#popular_3').click(function(){ 
    $("input[value]").val(3);
    $("#popular_text").html("Popular Movies – 3")
    $(".series li").removeClass("active");
    $("#popular_3").addClass("active");
    $(".movies").empty()
    loadMovie();
}); 

$("#search").keypress(function(event) { 
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        window.open("search.html?search=" + $('#search').val());
    }
});
 
/*Show movie details*/
$("body").on("click", "img", function(){ 
    $('.video').html('<img id="trailer_not_avail" src="images/trailer_not_available.png">');
    var id = this.id;
    var video = 0;


    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US", function(data1){  
        var first_video = false;
        $.each(data1.results, function() {
            video = this.key;        
            first_video = true;
            return (first_video !== true)
        });
    });

    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US", function(data){  
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
        
        if(video != null){
            $('#trailer').html('<button type="button" class="btn btn-outline-light trailer-button" id="' + id + '">Watch Trailer</button>');
        }   
    });
    $('#infoModal').modal('show');
});


$("#trailer").on("click", "button", function(){  
    var id = $(".modal button").attr("id");
    $.getJSON("https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US", function(data1){  
        var first_video = false;
        $.each(data1.results, function() {
            $('.video').html('<iframe width="1157" height="650" src="https://www.youtube.com/embed/' + this.key + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
            first_video = true;
            return (first_video !== true)
        });
    });
    $('#trailerModal').modal('show');
});





