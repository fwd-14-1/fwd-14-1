var goods =
{
    "1001": {
        "name": "Ведмедик",
        "cost": "500",
        "image": "img/beer/emilia75.JPG"
    },
    "1002": {
        "name": "Коник",
        "cost": "500",
        "image": "img/horse/emilia90.jpg"
    },
    "1003": {
        "name": "Кубик",
        "cost": "500",
        "image": "img/cube/photo1.JPG"
    },
    "1004": {
        "name": "Лисичка",
        "cost": "500",
        "image": "img/chanterelle/emilia81.jpg"
    },
    "1005": {
        "name": "Мишка",
        "cost": "500",
        "image": "img/mouse/DSC_7709.JPG"
    },
    "1006": {
        "name": "М'ячик",
        "cost": "500",
        "image": "img/ball/emilia71.JPG"
    },
    "1007": {
        "name": "Олень",
        "cost": "500",
        "image": "img/deer/emilia101.jpg"
    }
}
var out = '';
for (var key in goods) {
    out += '<a href="#">'
    out += '<div class="card self-item text-center" style="width: 18rem;">';
    out += '<img class="card-img-top" src="' + goods[key].image + '" alt="' + goods[key].name + '">';
    out += '<div class="card-body">';
    out += '<p class="card-text d-flex justify-content-around">' + goods[key].name + ' <span></span><span>' + goods[key].cost + '</span></p>';
    out += '</div>';
    out += '</div>';
    out += '</a>';
}
document.getElementById('goods').innerHTML += out;