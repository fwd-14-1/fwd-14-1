window.onload = function () {
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
            console.log(data);
            document.getElementById('goods').innerHTML += ShowGoods(data);
        }
    });
}


function ShowGoods(data) {
    var out = '';
    for (var key in data) {
        out += `<a href="#">`
        out += `<div class="card card-deck self-item text-center border-0" style="width: 18rem;">`;
        out += `<img class="card-img-top" src="${data[key]['gsx$image']['$t']}" alt="${data[key]['gsx$name']['$t']}">`;
        out += `<div class="card-body ">`;
        out += `<h5 class="card-title">${data[key]['gsx$name']['$t']}</h5>`;
        out += `<p class="card-text ">${data[key]['gsx$cost']['$t']}грн</p>`;
        out += `<p class="card-text">${data[key]['gsx$description']['$t']}</p>`
        out += `<button type="button" class="btn btn-outline-info">Купити</button>`;
        out += `</div>`;
        out += `</div>`;
        out += `</a>`;
    }
    return out;
}
document.onclick = function (e) {
    console.log(e);
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
            $('#hidden-header').css({ 'border-bottom': '2px solid white','background-color': '#fff',
            'box-shadow': '0 0 10px rgba(0,0,0,0.5)' });
        } else {
            $('#hidden-header').css({ border: 'none' , 'background-color':'transparent','box-shadow':'none'});
        }



    });
});
