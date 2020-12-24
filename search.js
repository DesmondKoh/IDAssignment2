$(document).ready(function(){
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


/*Search for movies*/
    $("#search").keyup(function() {
        var search = $('#search').val();
        $('.movies').empty();
        if( search != ""){   
            $('#results').html("Searching for " + search + "...")
        }
        else{
            $('#results').empty();
        }
        
        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&query=" + search +"&page=1&include_adult=false", function(data){
            $.each(data.results, function() {  
                var poster_path = this.poster_path;
                var original_title = this.original_title;  
                var genre_id = [];    
                var genre_name = [];
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
                                            <img src=https://image.tmdb.org/t/p/w500` + poster_path +`> 
                                            <h6>` + original_title + `</h6>
                                            <h4>` +  genre_name + `</h4>
                                        </div>
                                    </div> `)   
                });
            });
        })
    
        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&query=" + search +"&page=2&include_adult=false", function(data){
            $.each(data.results, function() {  
                var poster_path = this.poster_path;
                var original_title = this.original_title;  
                var genre_id = [];    
                var genre_name = [];
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
                                            <img src=https://image.tmdb.org/t/p/w500` + poster_path +`> 
                                            <h6>` + original_title + `</h6>
                                            <h4>` +  genre_name + `</h4>
                                        </div>
                                    </div> `)   
                });
            });
        })
    
        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&query=" + search +"&page=3&include_adult=false", function(data){
            $.each(data.results, function() {  
                var poster_path = this.poster_path;
                var original_title = this.original_title;  
                var genre_id = [];    
                var genre_name = [];
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
                                            <img src=https://image.tmdb.org/t/p/w500` + poster_path +`> 
                                            <h6>` + original_title + `</h6>
                                            <h4>` +  genre_name + `</h4>
                                        </div>
                                    </div> `)   
                });
            });
        })
    }).keyup();

});




