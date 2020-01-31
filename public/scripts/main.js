window.onload = function () {
    card={};
    let getJSON = function (url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status == 200) {
                callback(null, xhr.response)
            }
            else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    }

    getJSON('https://spreadsheets.google.com/feeds/list/1bLe6_mQakrnM6NCYyQr8llzPNo8C0jDOFXeluF7nx3E/od6/public/values?alt=json', function (err, data) {
        console.log(data);
        if (err != null) {
            console.log('Error:');
        }
        else {
            data = data['feed']['entry'];
            if (document.getElementById('goods')) {
                document.getElementById('goods').innerHTML += ShowGoods(data);
            }
            else {
                document.getElementById('goods-content').innerHTML += ShowOneItem(data);

            }

        }
    });
    document.onclick = function(e){
        console.log(e.target.attributes.name.nodeValue);
        if (e.target.attributes.name.nodeValue=="add_to_card")
        addToBasket(e.target.attributes.data.nodeValue);
    }   
function addToBasket(elem){
    if(card[elem]!== undefined){
        card[elem]++;
    }
    else {
        card[elem]=1;
    }
    console.log(card);
}
}


function ShowGoods(data) {
    var out = '';
    for (var key in data) {
        out += `<a>`
        out += `<div class="card card-deck self-item text-center border-0" style="width: 18rem;">`;
        out += `<img class="card-img-top" src="${data[key]['gsx$image']['$t']}" alt="${data[key]['gsx$name']['$t']}">`;
        out += `<div class="card-body ">`;
        out += `<h5 class="card-title">${data[key]['gsx$name']['$t']}</h5>`;
        out += `<p class="card-text ">${data[key]['gsx$cost']['$t']}грн</p>`;
        out += `<p class="card-text">${data[key]['gsx$description']['$t']}</p>`
        out += `<button type="button" class="btn btn-outline-info" data="${data[key]['gsx$article']['$t']}" name="add_to_card">Купити</button>`;
        out += `</div>`;
        out += `</div>`;
        out += `</a>`;
    }
    return out;
}



function ShowOneItem() {
    var out = '';
    out += `<div class="goods__photos">`;
    out += `<div class="mySlides" style="display: block;">`;
    out += ` <img src="../public/img/ball/emilia71.JPG" style="width:100%">`;
    out += ` </div>`;
    out += `   <div class="mySlides">`;
    out += `   <img src="../public/img/ball/emilia72 (1 of 1).JPG" style="width:100%">`;
    out += `</div>`;

    out += `<div class="mySlides">`;
    out += `<img src="../public/img/ball/emilia73 (1 of 1).JPG" style="width:100%">`;
    out += `</div>`;

    out += `<div class="mySlides">`;
    out += `  <img src="../public/img/ball/emilia74 (1 of 1).JPG" style="width:100%">`;
    out += `</div>`;

    out += `<div class="caption-container">`;
    out += `<p id="caption">М'яч Монтессорі</p>`;
    out += `</div>`;

    out += `<div class="row">`;
    out += `  <div class="column">`;
    out += `  <img class="demo cursor" src="../public/img/ball/emilia71.JPG" style="width:100%"             onclick="currentSlide(1)" alt="М'яч Монтессорі">`;
    out += `   </div>`;
    out += `<div class="column">`;
    out += `<img class="demo cursor" src="../public/img/ball/emilia72 (1 of 1).JPG" style="width:100%"              onclick="currentSlide(2)" alt="М'яч Монтессорі">`;
    out += `</div>`;
    out += `<div class="column">`;
    out += `<img class="demo cursor" src="../public/img/ball/emilia73 (1 of 1).JPG" style="width:100%"              onclick="currentSlide(3)" alt="М'яч Монтессорі">`;
    out += `</div>`;
    out += `<div class="column">`;
    out += `<img class="demo cursor" src="../public/img/ball/emilia74 (1 of 1).JPG" style="width:100%"              onclick="currentSlide(4)" alt="М'яч Монтессорі">`;
    out += `</div>`;
    out += ` </div>`;
    out += `</div>`;
    out += `<div class="goods__wrap">`;
    out += `<div class="goods__name">М'яч Монтессорі </div>`;
    out += `<div class="goods__price">380 грн.</div>`;
    out += `<div class="goods__title">`;
    out += `<h3>         Діаметр м"яча 13 см. Всередині іграшки є брязкальце (звук ніжний). Мяч повністю охайнозшитий, не містить жодних дрібних деталей. Також є мотузка (звязана з 100% нитки бавовни),нею можна кріпити іграшки до автокрісла, візочка, дитячого ліжечка чи манежу.Іграшку можна прати у пральній машинці на делікатному пранні (як і всі наші іграшки)</h3>`;
    out += ` </div >`;
    out += `<div class="goods__buttons">`;
    out += `<button class="first__btn">Добавити до корзини</button>`;
    out += `<button class="second__btn">Купити в один клік</button>`;
    out += `</div>`;
    out += `<div class="goods__links">`;
    out += `<a href="#" class="first__link">Доставка і оплата</a>`;
    out += `<a href="#" class="second__link">Налічними в магазині</a>`;
    out += `</div>`;
    out += `</div >`;
    console.log(out);
    return out;
}




function MiniBasket() {
    var self = this;


    this.content_container = document.getElementById('mini-basket__hover_content');
    this.display_link = document.getElementById('mini-basket__background');


    if (this.content_container) {

        if (this.display_link) {
            this.display_link.onmouseover = function () { self.Show(); }
            this.display_link.onmouseout = function () { self.Hide(); }
        }



        this.content_container.style.display = 'none';
    }
}


MiniBasket.prototype.Show = function () {
    var self = this;

    this.content_container.style.display = 'block';

}


MiniBasket.prototype.Hide = function () {
    this.content_container.style.display = 'none';

    window.onresize = null;
}


var minibasket = new MiniBasket();




$(document).ready(function () {
    const $window = $(window);


    $(window).scroll(function () {
        if ($(window).scrollTop() >= $window.height()) {
            $('#hidden-header').css({
                'border-bottom': '2px solid white', 'background-color': '#fff',
                'box-shadow': '0 0 10px rgba(0,0,0,0.5)'
            });
        } else {
            $('#hidden-header').css({ border: 'none', 'background-color': 'transparent', 'box-shadow': 'none' });
        }



    });
});



  // GOODS CARUSEL
  var slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
      showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
      showSlides(slideIndex = n);
  }
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
};

