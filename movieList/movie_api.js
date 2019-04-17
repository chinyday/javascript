const KEY = "656a8b52d10fe22e254d4689e7618e25";

function getMainMovie_data() {
    fetch(`https://api.themoviedb.org/3/movie/299534?api_key=${KEY}&language=ko-KR`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        paint_main_movie_info(json);
    });
}


// 
function getComingupMovie() {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=ko-KR`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        getComingupMovie_info(json);
    });
}
function getComingupMovie_info(data) {
    for (let i = 0; i < data.results.length; i++) {
       let m_id = data.results[i].id;
       fetch(`https://api.themoviedb.org/3/movie/${m_id}?api_key=${KEY}&language=ko-KR`
       ).then(function(response){
           return response.json();
       }).then(function(json){   
            paint_comingupUl(json);
       });
    }
}

// 
function getTopratedMovie() {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=ko-KR`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        getTopratedMovie_info(json);
    });
}
function getTopratedMovie_info(data) {
    for (let i = 0; i < data.results.length; i++) {
       let m_id = data.results[i].id;
       fetch(`https://api.themoviedb.org/3/movie/${m_id}?api_key=${KEY}&language=ko-KR`
       ).then(function(response){
           return response.json();
       }).then(function(json){   
            paint_topratedUl(json);
       });
    }
}

// 
function getPopularMovie() {
    fetch(`https://api.themoviedb.org/3/discover/movie?page=1&include_adult=false&sort_by=popularity.desc&language=ko-KR&api_key=${KEY}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        getPopularMovie_info(json);
    });
}
function getPopularMovie_info(data) {
    for (let i = 0; i < data.results.length; i++) {
       let m_id = data.results[i].id;
       fetch(`https://api.themoviedb.org/3/movie/${m_id}?api_key=${KEY}&language=ko-KR`
       ).then(function(response){
           return response.json();
       }).then(function(json){ 
            paint_popularUl(json);
       });
    }
}

// 
function getTrendingMovie() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&language=ko-KR`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        getTrendingMovie_info(json);
    });
}
function getTrendingMovie_info(data) {
    for (let i = 0; i < data.results.length; i++) {
       let m_id = data.results[i].id;
       fetch(`https://api.themoviedb.org/3/movie/${m_id}?api_key=${KEY}&language=ko-KR`
       ).then(function(response){
           return response.json();
       }).then(function(json){  
           paint_trendingUl(json);
       });
    }
}


let all_movInfo = "";
function paint_comingupUl(data) {
    let comingup_div = document.querySelector('.comingup_div');
    let list = comingup_div.querySelector('.list');
    
    let movInfo = "";
    var genres = [];
    for (let i = 0; i < data.genres.length; i++) {
        genres.push(data.genres[i].name);
    }

    movInfo += `<li class="m_box item">
            <span class="thum"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img"></span>
            <ul class="info_wrap">
                <li class="m_thum">
                    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img">
                    </li>
                <li class="m_info">
                        <span class="m_title">${data.title}</span>
                        <span class="m_runtime">${data.runtime}분</span>
                        <span class="m_genres">${genres}</span>
                        <span class="m_overview">${data.overview}</span>
                </li>
            </ul>
        </li>`;   

    all_movInfo += movInfo; 
    list.innerHTML = all_movInfo;
    genres = [];
}

let all_movInfo1 = "";
function paint_topratedUl(data) {
    let toprated_div = document.querySelector('.toprated_div');
    let list = toprated_div.querySelector('.list');
    
    let movInfo = "";
    var genres = [];
    for (let i = 0; i < data.genres.length; i++) {
        genres.push(data.genres[i].name);
    }

    movInfo += `<li class="m_box item">
            <span class="thum"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img"></span>
            <ul class="info_wrap">
                <li class="m_thum">
                    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img">
                    </li>
                <li class="m_info">
                        <span class="m_title">${data.title}</span>
                        <span class="m_runtime">${data.runtime}분</span>
                        <span class="m_genres">${genres}</span>
                        <span class="m_overview">${data.overview}</span>
                </li>
            </ul>
        </li>`;   

    all_movInfo1 += movInfo; 
    list.innerHTML = all_movInfo1;
    genres = [];
}

let all_movInfo2 = "";
function paint_popularUl(data) {
    let popular_div = document.querySelector('.popular_div');
    let list = popular_div.querySelector('.list');
    
    let movInfo = "";
    var genres = [];
    for (let i = 0; i < data.genres.length; i++) {
        genres.push(data.genres[i].name);
    }


    movInfo += `<li class="m_box item">
            <span class="thum"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img"></span>
            <ul class="info_wrap">
                <li class="m_thum">
                    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img">
                    </li>
                <li class="m_info">
                        <span class="m_title">${data.title}</span>
                        <span class="m_runtime">${data.runtime}분</span>
                        <span class="m_genres">${genres}</span>
                        <span class="m_overview">${data.overview}</span>
                </li>
            </ul>
        </li>`;   

    all_movInfo2 += movInfo; 
    list.innerHTML = all_movInfo2;
    genres = [];
}

let all_movInfo3 = "";
function paint_trendingUl(data) {
    let trending_div = document.querySelector('.trending_div');
    let list = trending_div.querySelector('.list');
    
    let movInfo = "";
    let genres = [];
    for (let i = 0; i < data.genres.length; i++) {
        genres.push(data.genres[i].name);
    }


    movInfo += `<li class="m_box item">
            <span class="thum"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img"></span>
            <ul class="info_wrap">
                <li class="m_thum">
                    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="img">
                    </li>
                <li class="m_info">
                        <span class="m_title">${data.title}</span>
                        <span class="m_runtime">${data.runtime}분</span>
                        <span class="m_genres">${genres}</span>
                        <span class="m_overview">${data.overview}</span>
                </li>
            </ul>
        </li>`;   

    all_movInfo3 += movInfo; 
    list.innerHTML = all_movInfo3;
    genres = [];
}

let main_movInfo = "";
function paint_main_movie_info(data) {
    console.log(data);
    let main_movie_div = document.querySelector('.main_movie_div');
    let list = main_movie_div.querySelector('.list');
    let movInfo = "";
    
    let genres = [];
    for (let i = 0; i < data.genres.length; i++) {
        genres.push(data.genres[i].name);
    }

    let url = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
    movInfo += ` <div class="info">
                    <div class="title">${data.title}</div>
                    <div class="subinfo">
                        <span>${genres}</span>
                        <span class="line"></span>
                        <span>${data.runtime}분</span>
                        <span class="line"></span>
                        <span>${data.release_date} 개봉</span>
                    </div>
                    <div class="overview">${data.overview}</div>

                </div>
                <div class="bg"></div>
                <div class="img" style="background-image:url('${url}')";></div>
                `;   
                
            //     <div class="img">
            //     <iframe src="https://www.youtube.com/embed/${data.videos.results[7].key}?controls=0&enablejsapi=1&iv_load_policy=3&modestbranding=1&mute=1&rel=0&showinfo=0?autoplay=1&origin=http://example.com" frameborder="0"/>
            // <div>
    main_movInfo += movInfo; 
    list.innerHTML = main_movInfo;
}

function init() {
    getMainMovie_data();
    getComingupMovie();
    getTopratedMovie();
    getPopularMovie();
    getTrendingMovie();
}
init();

