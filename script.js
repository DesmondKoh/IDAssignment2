$(document).ready( function() {
    //Display movies - Latest 20
    $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1", function(data){
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


    //Display movies - Next 20
    $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2", function(data){
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

    //Display movies - Next 20
    $.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=6377432a6f5b68b2dd2593d879d1ff91&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3", function(data){
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

});
