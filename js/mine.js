// *********************** sidebar ***********************
let sideWidth = $(".sidebar-menu").width();

function closeNav() {
    $(".sidebar-menu").addClass("close-menu").removeClass("open-menu");
    $(".fa-align-justify").toggleClass("fa-times");
    $(".sidebar-header").css("left", 0);
    $(".sidebar-menu li").animate({
        opacity: "0",
        paddingTop: "500px"
    }, 500);

};

function openNav() {
    $(".sidebar-menu").addClass("open-menu").removeClass("close-menu");
    $(".sidebar-menu").width("250px");
    // sideWidth = $(".sidebar-menu").width();
    $(".sidebar-header").css("left", sideWidth);
    $(".fa-align-justify").toggleClass("fa-times");
    $(".sidebar-menu .item1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100);

    $(".sidebar-menu .item2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200);

    $(".sidebar-menu .item3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300);

    $(".sidebar-menu .item4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400);

    $(".sidebar-menu .item5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500);

    $(".sidebar-menu .item6").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1600);
}

// console.log( $(".sidebar-menu").offset().left);
$(".toggle-icon").click(function () {
    if ($(".sidebar-menu").offset().left < 0) {
        openNav()
    } else {
        closeNav()
    }

});

// *********************** Movies ***********************

let row = document.getElementById("rowData")
    , categorylinks = document.getElementsByClassName("nav-category")
    , result = document.getElementById("res")
    , allMoviesByWord = document.getElementById("allMovies")
    , search_bar = document.getElementById("word")
    , trendingURL = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    , popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    , topratedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    , upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    , NowURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    , URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
    , category = "";

getMovies();
for (var i = 0; i < categorylinks.length; i++)
    categorylinks[i].addEventListener("click", function (e) {
        if ("Now playing" == (category = e.target.innerHTML) && (URL = NowURL)) {
            getMovies();
        }
        if ("Popular" == (category = e.target.innerHTML) && (URL = popularURL)) {
            getMovies();
        }
        if ("Top Rated" == (category = e.target.innerHTML) && (URL = topratedURL)) {
            getMovies();
        }
        if ("Trending" == (category = e.target.innerHTML) && (URL = trendingURL)) {
            getMovies();
        }
        if ("Upcoming" == (category = e.target.innerHTML) && (URL = upcomingURL)) {
            getMovies();
        }
    });

let allMovies;
function getMovies() {
    let myhttp = new XMLHttpRequest();
    myhttp.open("get", URL);
    myhttp.send();
    myhttp.onreadystatechange = function () {
        if (myhttp.readyState == 4 && myhttp.status == 200) {
            allMovies = JSON.parse(myhttp.response).results;
            displayMovies();
        }
        else {
            console.log("error");
        }
    }
}

var imgPath = "https://image.tmdb.org/t/p/w500";
function displayMovies() {
    let cartona = ``;
    for (let i = 0; i < allMovies.length; i++)
        cartona += `
        <div class="col-md-6 col-lg-4 my-3 myM  shadow">
            <div class="movie shadow rounded position-relative">
                <div class="post">
                    <img src= "${imgPath + allMovies[i].poster_path}"   + ' class="img-fluid rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-0">
                            <h1>  ${allMovies[i].original_title} </h1>
                            <p> ${allMovies[i].overview}</p>
                            <p> rate: ${allMovies[i].vote_average} </p>
                            <p> ${allMovies[i].release_date}  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    row.innerHTML = cartona
}


// ***********************search ***********************
function getMoviesByWord(e) {
    let a = new XMLHttpRequest();
    var searchhttp = `https://api.themoviedb.org/3/search/movie?query=${e}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`;
    a.open("get", searchhttp);
    a.send();
    a.onreadystatechange = function () {
        if (a.readyState == 4 && a.status == 200) {
            allMovies = JSON.parse(a.response).results;
            displayMovies();
        }
        else {
            console.log("error");
        }
    }
}
allMoviesByWord.onkeyup = function () {
    getMoviesByWord(allMoviesByWord.value)
};



function searchMovie(userWord) {
    var cartona = ``;
    for (var i = 0; i < allMovies.length; i++) {
        if (allMovies[i].original_title.toLowerCase().includes(userWord.toLowerCase())) {

            cartona += `<div class="col-md-6 col-lg-4 my-3 myM  shadow">
            <div class="movie shadow rounded position-relative">
                <div class="post">
                    <img src= "${imgPath + allMovies[i].poster_path}"   + ' class="img-fluid rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-0">
                            <h1>  ${allMovies[i].original_title} </h1>
                            <p> ${allMovies[i].overview}</p>
                            <p> rate: ${allMovies[i].vote_average} </p>
                            <p> ${allMovies[i].release_date}  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        }
    }

    row.innerHTML = cartona
}
search_bar.onkeyup = function () {
    searchMovie(search_bar.value)
}


// contact


let userName = document.getElementById("name")
    , userEmail = document.getElementById("email")
    , userPhone = document.getElementById("phone")
    , userAge = document.getElementById("age")
    , userPassword = document.getElementById("password")
    , userRepassword = document.getElementById("rePassword")

    , userNameAlert = document.getElementById("namealert")
    , userEmailAlert = document.getElementById("emailalert")
    , userPhoneAlert = document.getElementById("phonealert")
    , userAgeAlert = document.getElementById("agealert")
    , userPasswordAlert = document.getElementById("passwordalert")
    , userRepasswordAlert = document.getElementById("repasswordalert")

    , userNameRegex = /^[a-zA-Z0-9]+$/
    , userEmailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    , userPhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    , userAgeRegex = /^[1-9][0-9]?$|^100$/
    , userPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


function userNameValid() {
    if (userNameRegex.test(userName.value)) {
        userNameAlert.style.display = "none";
        return true;
    }
    else {
        userNameAlert.style.display = "block";
        return false;
    }
}

function userEmailValid() {
    if (userEmailRegex.test(userEmail.value)) {
        userEmailAlert.style.display = "none";
        return true;
    }
    else {
        userEmailAlert.style.display = "block";
        return false;
    }
}

function userPhoneValid() {
    if (userPhoneRegex.test(userPhone.value)) {
        userPhoneAlert.style.display = "none";
        return true;
    }
    else {
        userPhoneAlert.style.display = "block";
        return false;

    }
}

function userAgeValid() {
    if (userAgeRegex.test(userAge.value)) {
        userAgeAlert.style.display = "none";
        return true;
    }
    else {
        userAgeAlert.style.display = "block";
        return false;

    }
}

function userPasswordValid() {
    if (userPasswordRegex.test(userPassword.value)) {
        userPasswordAlert.style.display = "none";
        return true;

    }
    else {
        userPasswordAlert.style.display = "block";
        return false;

    }
}

function userRepasswordValid() {
    if (userPassword.value == userRepassword.value) {
        userRepasswordAlert.style.display = "none";
        return true;
    }
    else {
        userRepasswordAlert.style.display = "block";
        return false;
    }
}



userName.addEventListener("keyup", userNameValid),
    userEmail.addEventListener("keyup", userEmailValid),
    userPhone.addEventListener("keyup", userPhoneValid),
    userAge.addEventListener("keyup", userAgeValid),
    userPassword.addEventListener("keyup", userPasswordValid),
    userRepassword.addEventListener("keyup", userRepasswordValid),
    document.getElementById("contact").addEventListener("click", function () {
        if (userNameValid() && userEmailValid() && userPhoneValid() &&
            userAgeValid() && userPasswordValid() && userRepasswordValid()) {
            $("#submitBtn").removeAttr('disabled');
        }
        else {
            $("#submitBtn").prop('disabled', true)
        }

    });



