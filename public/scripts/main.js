window.onload = function () {
    card = {};
    goods = {};
    function loadCardFromStorage(){
    if (localStorage.getItem('card') != undefined){
card=JSON.parse(localStorage.getItem('card'));}
}
loadCardFromStorage();  
    selectedGoodsID = '';
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
            goods = data;
            if (document.getElementById('goods')) {
                document.getElementById('goods').innerHTML += ShowGoods(data);
                renderBasket();


            }
            else if (document.getElementById('goods-content')) {
                document.getElementById('goods-content').innerHTML = ShowOneItem(data);
                renderBasket();

            }
        }
    });
}
document.onclick = function (e) {
    console.log(selectedGoodsID);
    selectedGoodsID = e.target.attributes.data.nodeValue;
    if (e.target.attributes.name.nodeValue == "add_to_card") {
        addToBasket(selectedGoodsID);
    }
    else if (e.target.attributes.name.nodeValue == "block") {
        ShowOneItem(goods)
    }
}
function addToBasket(elem) {
    if (card[elem] !== undefined) {
        card[elem]++;
    }
    else {
        card[elem] = 1;
    }
    console.log(card);
        localStorage.setItem("card",JSON.stringify(card));

    renderBasket();
}

function renderBasket() {
    var content = document.querySelector('.commodity');
    var contentprice = document.getElementById('mainPrice');
    content.innerHTML = "";
    console.log('card'+JSON.stringify(card));
    for (var item in card) {
        var out = ``;
        out += `<div class= "commodity__contents">
             <img src="${goods[item]['gsx$image']['$t']}" alt="${goods[item]['gsx$name']['$t']}">` +
            `<div class="information__about__commodity">` +
            `<a href="" class="link__on__commodity" title="Посилання на товар">${goods[item]['gsx$name']['$t']}</a>` +
            `<div class="cost">` +
            `<div class="price">${goods[item]['gsx$cost']['$t']} грн</div>` +
            `<div class="number">${card[item]} шт.</div>` +
            `<div class="full__price">${goods[item]['gsx$cost']['$t'] * card[item]} <span>грн</span></div></div></div>
             </div>`;
        content.innerHTML += out;
        console.log(out);
        showTotals();
    }
}

function showTotals() {
    var items = document.querySelectorAll(".full__price");
    const total = [];

    items.forEach(function (price) {
        total.push(parseFloat(price.textContent));
    });
    const totalMoney = total.reduce(function (total, item) {
        total += item;
        return total;
    }, 0)
    const finalMoney = totalMoney + ' грн';

    document.getElementById("mainPrice").textContent = finalMoney;
}


function ShowGoods(data) {
    var out = '';
    for (var key in data) {
        out += `<a href = /goods?id=${data[key]['gsx$id']['$t']}> `;
        out += `<div class="card card-deck self-item text-center border-1" style="width: 18rem; cursor:pointer;">`;
        out += `<img data="${data[key]['gsx$id']['$t']}" name="block" class="card-img-top" src="${data[key]['gsx$image']['$t']}" alt="${data[key]['gsx$name']['$t']}">`;
        out += `<div class="card-body ">`;
        out += `<h5  class="card-title">${data[key]['gsx$name']['$t']}</h5>`;
        out += `<p class="card-text ">${data[key]['gsx$cost']['$t']}грн</p>`;
        out += `<p class="card-text">${data[key]['gsx$description']['$t']}</p>`
        out += `<button type="button" class="btn btn-outline-info" data="${data[key]['gsx$id']['$t']}" name="add_to_card">Купити</button>`;
        out += `</div>`;
        out += `</div>`;
        out += `</a>`;
    }
    return out;
}
var urlParams = new URLSearchParams(window.location.search);
// Take ID FROM URL
function ShowOneItem(data) {
    const test = data.find((item) => {
        console.log(item)
        return item.gsx$id.$t === urlParams.get('id')
    });
    var out = '';

    out += `<div class="goods__photos">
                <div class="mySlides" style="display: block;">
                    <img src="${test.gsx$mainimage.$t}" style="width:100%">
                </div>
                    <div class="mySlides">
                        <img src="${test.gsx$imageone.$t}" style="width:100%">
                 </div>

                <div class="mySlides">
                    <img src="${test.gsx$imagetwo.$t}" style="width:100%">
                </div>

                <div class="mySlides">
                    <img src="${test.gsx$imagethree.$t}" style="width:100%">
                </div>

                <div class="caption-container">
                    <p id="caption">${test.gsx$name.$t}</p>
                </div>

                <div class="row">
                    <div class="column">
                        <img class="demo cursor" src="${test.gsx$mainimage.$t}" style="width:100%" onclick="currentSlide(1)" alt="${test.gsx$name.$t}">
                    </div>
                    <div class="column">
                        <img class="demo cursor" src="${test.gsx$imageone.$t}" style="width:100%" onclick="currentSlide(2)" alt="${test.gsx$name.$t}">
                    </div>
                        <div class="column">
                        <img class="demo cursor" src="${test.gsx$imagetwo.$t}" style="width:100%" onclick="currentSlide(3)" alt="${test.gsx$name.$t}">
                    </div>
                    <div class="column">
                        <img class="demo cursor" src="${test.gsx$imagethree.$t}" style="width:100%" onclick="currentSlide(4)" alt="${test.gsx$name.$t}">
                    </div>
                </div>
            </div>
            <div class="goods__wrap">
                <div class="goods__name">${test.gsx$name.$t}</div>
                <div class="goods__price">${test.gsx$cost.$t}грн.</div>
                <div class="goods__title">
                    <h3>${test.gsx$extradescription.$t}</h3>
                </div>
                <div class="goods__buttons">
                    <button class="first__btn">Добавити до корзини</button>
                    <button class="second__btn">Купити в один клік</button>
                </div>
                <div class="goods__links">
                    <a href="#" class="first__link">Доставка і оплата</a>
                    <a href="#" class="second__link">Налічними в магазині</a>
                </div>
            </div>`

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

