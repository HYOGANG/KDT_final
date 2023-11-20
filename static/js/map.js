var names = document.getElementById('name').innerHTML.split(',')
var addresses= document.getElementById('address').innerHTML.split(',')
var types= document.getElementById('type').innerHTML.split(',');
var deps= document.getElementById('department').innerHTML.split('|');

Category = ['외과','내과', '산부인과', '신경과', '안과', '이비인후과','치과', '피부과', '정신건강의학과', '가정의학과', '결핵과', '비뇨기과', '소아청소년과', '재활의학과',   '한방']
Category2 = ['종합병원', '병원', '의원', '치과병원', '치과의원', '한방병원', '한의원', '요양병원', '정신병원', '보건진료소', '보건지소', '약국']


var currCategory = [];
var allcoords = Array.from(
                            { length: Category.length + Category2.length },
                            () => []);
var markers = Array.from(
                            { length: Category.length + Category2.length },
                            () => []);


var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}),
    contentNode = document.createElement('div')

var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(36.5331357, 127.2454549),
        level: 8
    };


var map = new kakao.maps.Map(mapContainer, mapOption);

var geocoder = new kakao.maps.services.Geocoder();

kakao.maps.event.addListener(map, 'idle', searchPlaces);

contentNode.className = 'placeinfo_wrap';

addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

placeOverlay.setContent(contentNode);

addCategoryClickEvent();

function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}

for (let i = 0; i < Category.length; i++) {
    for (let j = 0; j < names.length; j++) {
                if (deps[j].includes(Category[i])) {
                    (function (index) {
                      geocoder.addressSearch(addresses[index], function(result, status) {

                        if (status === kakao.maps.services.Status.OK) {

                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                            var imageSrc = '/static/img/dot.png',
                                imageSize = new kakao.maps.Size(21, 23);
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });


                            allcoords[i].push(coords);


                            kakao.maps.event.addListener(marker, 'click', function() {
                            displayPlaceInfo(names[j], coords);
                            });
                        }
                     });
                   })(j);
                 }
           }
      }
for (let i = 0; i < Category2.length; i++) {
    for (let j = 0; j < names.length; j++) {
                if (types[j].trim() === Category2[i]) {
                    (function (index) {
                      geocoder.addressSearch(addresses[index], function(result, status) {

                        if (status === kakao.maps.services.Status.OK) {

                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            var imageSrc = '/static/img/dot.png',
                                imageSize = new kakao.maps.Size(21, 23);
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });


                            allcoords[i+15].push(coords);
                            markers[i+15].push(marker);

                            kakao.maps.event.addListener(marker, 'click', function() {
                            displayPlaceInfo(names[j], coords);
                            });

                        }
                     });
                   })(j);
                 }
           }
      }
var currMarker =""

function displayPlaceInfo (name, coord) {
    var content = '<div class="placeinfo">' + name+ '</div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(coord);

    if (currMarker === coord) {
            placeOverlay.setMap(null);
            currMarker = ""
    } else{
            placeOverlay.setMap(map);
            currMarker = coord;
            }
}


function searchPlaces() {

       displayPlaces();
}



 function displayPlaces(places) {

    for (var i = 0; i < currCategory.length; i++) {
        var currentCategory = currCategory[i];
        var currentOrder = document.getElementById(currentCategory).getAttribute('data-order');
          for ( var j=0; j < allcoords[currentOrder].length; j++ ) {
            markers[currentOrder][j].setMap(map);

            }
    }
 }



function removeMarker(order) {
            for (var i = 0; i < markers[order].length; i++) {
                        markers[order][i].setMap(null);

                    }
                }



function addCategoryClickEvent() {
    var category = document.getElementById('category'),
        children = category.children;
    var category2 = document.getElementById('category2'),
        children2 = category2.children;

    for (var i=0; i<children.length; i++) {
        children[i].onclick = onClickCategory;
    }
    for (var i=0; i<children2.length; i++) {
        children2[i].onclick = onClickCategory;
    }
}


function onClickCategory() {
    var id = this.id,
        index = currCategory.indexOf(id);
    placeOverlay.setMap(null);
    if (index !== -1) {

        currCategory.splice(index, 1);

        var currentOrder = document.getElementById(id).getAttribute('data-order');
        removeMarker(currentOrder);
    } else {
        currCategory.push(id);

        searchPlaces();
    }

    changeCategoryClass(this);
}



function changeCategoryClass(el) {
    if (el.classList.contains('on')) {

        el.classList.remove('on');
    } else {
   
        el.classList.add('on');
    }
}