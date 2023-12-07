var names = document.getElementById('name').innerHTML.split(',')
var addresses= document.getElementById('address').innerHTML.split('|')
var types= document.getElementById('type').innerHTML.split(',');
var deps= document.getElementById('department').innerHTML.split('|');
var latlong= document.getElementById('coord').innerHTML.replace(/\s+/g, '').replace(/\n/g, '').split('|');


var latlongArray = latlong.map(function(coordPair) {
    var latlongs = coordPair.split(',');
    var lat = parseFloat(latlongs[0]);
    var long = parseFloat(latlongs[1]);
    return [lat, long];
});



Category = ['외과','정형외과', '신경외과', '흉부외과', '성형외과', '내과', '산부인과', '신경과', '안과', '이비인후과','치과', '피부과', '정신건강의학과', '가정의학과', '결핵과', '비뇨', '소아청소년과', '재활의학과',   '한방']
Category2 = ['종합병원', '병원', '의원', '치과병원', '치과의원', '한방병원', '한의원', '요양병원', '정신병원', '보건소', '보건지소', '보건진료소', '약국']


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
        level: 8,
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

var img = ['/static/img/dot9.png','/static/img/dot9-1.png','/static/img/dot9-2.png','/static/img/dot9-3.png','/static/img/dot9-4.png', '/static/img/dot10.png', '/static/img/dot11.png', '/static/img/dot12.png', '/static/img/dot13.png', '/static/img/dot14.png','/static/img/dot3.png', '/static/img/dot15.png', '/static/img/dot8.png', '/static/img/dot16.png', '/static/img/dot17.png', '/static/img/dot18.png', '/static/img/dot19.png', '/static/img/dot20.png','/static/img/dot5.png']
var img2 = ['/static/img/dot1.png', '/static/img/dot1-1.png', '/static/img/dot4.png', '/static/img/dot3.png', '/static/img/dot3-3.png', '/static/img/dot5.png', '/static/img/dot5-5.png', '/static/img/dot2.png', '/static/img/dot8.png', '/static/img/dot7.png', '/static/img/dot7-7.png','/static/img/dot7-77.png', '/static/img/dot6.png']


for (let i = 0; i < Category.length; i++) {
    for (let j = 0; j < names.length; j++) {
                if (deps[j].includes(Category[i])) {

                            var coords = new kakao.maps.LatLng(latlongArray[j][0],latlongArray[j][1] );
                            var imageSrc = img[i],
                                imageSize = new kakao.maps.Size(21, 23);
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });


                            allcoords[i].push(coords);
                            markers[i].push(marker);

                            kakao.maps.event.addListener(marker, 'click', function() {
                            displayPlaceInfo(names[j], coords);
                            });


                 }
           }
      }
for (let i = 0; i < Category2.length; i++) {
    for (let j = 0; j < names.length; j++) {
                if (types[j].trim() === Category2[i]) {

                            var coords = new kakao.maps.LatLng(latlongArray[j][0],latlongArray[j][1]);

                            var imageSrc = img2[i],
                                imageSize = new kakao.maps.Size(21, 23);
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });


                            allcoords[i+19].push(coords);
                            markers[i+19].push(marker);

                            kakao.maps.event.addListener(marker, 'click', function() {
                            displayPlaceInfo(names[j], coords);
                            });



                 }
           }
      }

var currMarker =""

var clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 5,

});


function displayPlaceInfo (name, coord) {
    var content = '<div class="placeinfo">' +
                    '<a href="https://map.kakao.com/link/map/'+name+','+coord.Ma+','+coord.La +'" target="_blank">' +
    '<span class="title">'+ name +'</span>'+
    '</a>' +
    '</div>';

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
    clusterer.clear();
    for (var i = 0; i < currCategory.length; i++) {
        var currentCategory = currCategory[i];
        var currentOrder = document.getElementById(currentCategory).getAttribute('data-order');
          for ( var j=0; j < allcoords[currentOrder].length; j++ ) {
            markers[currentOrder][j].setMap(map);
            }
            if (currCategory.indexOf(currentCategory) !== -1) {
            clusterer.addMarkers(markers[currentOrder]);
        }

    }
 }


function removeMarker(order) {
            for (var i = 0; i < markers[order].length; i++) {
                        markers[order][i].setMap(null);
                    }
                    clusterer.removeMarkers(markers[order]);
                }



function addCategoryClickEvent() {
    var category = document.getElementById('category'),
        children = category.children;
    var category2 = document.getElementById('category2'),
        children2 = category2.children;
    var category3 = document.getElementById('category3'),
        children3 = category3.children;

    for (var i=0; i<children.length; i++) {
        children[i].onclick = onClickCategory;
    }
    for (var i=0; i<children2.length; i++) {
        children2[i].onclick = onClickCategory;
    }
    for (var i=0; i<children3.length; i++) {
        children3[i].onclick = onClickCategory;
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

