var all= document.getElementById('all').innerHTML.split('||');

var allArray = all.map(function(alls){
    var allPair = alls.split('|');
    var names = allPair[0];
    var addresses = allPair[1];
    var types = allPair[2];
    var deps = allPair[3].slice(0,-1);
    var phones = allPair[4];
    var latlong = allPair[5].split(',');
    var lat = parseFloat(latlong[1]);
    var long = parseFloat(latlong[0]);
    return [names, addresses, types, deps, phones, [lat, long]];
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

var keymarkers = [],
    pindex = [];



var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(36.5331357, 127.2454549),
        level: 8,
    };


var map = new kakao.maps.Map(mapContainer, mapOption);


kakao.maps.event.addListener(map, 'idle',displayPlaces);



addCategoryClickEvent();

function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}

var img = ['/static/img/dot9.png','/static/img/dot9-1.png','/static/img/dot9-2.png','/static/img/dot9-3.png','/static/img/dot9-4.png', '/static/img/dot10.png', '/static/img/dot11.png', '/static/img/dot12.png', '/static/img/dot13.png', '/static/img/dot14.png','/static/img/dot3.png', '/static/img/dot15.png', '/static/img/dot8.png', '/static/img/dot16.png', '/static/img/dot17.png', '/static/img/dot18.png', '/static/img/dot19.png', '/static/img/dot20.png','/static/img/dot5.png']
var img2 = ['/static/img/dot1.png', '/static/img/dot1-1.png','/static/img/dot4.png', '/static/img/dot3.png', '/static/img/dot3-3.png', '/static/img/dot5.png', '/static/img/dot5-5.png', '/static/img/dot2.png', '/static/img/dot8.png', '/static/img/dot7.png', '/static/img/dot7-7.png','/static/img/dot7-77.png', '/static/img/dot6.png']


for (let i = 0; i < Category.length; i++) {
    for (let j = 0; j < allArray.length; j++) {
                if (allArray[j][3].includes(Category[i])) {
                            var coords = new kakao.maps.LatLng(allArray[j][5][0],allArray[j][5][1] );
                            var imageSrc = img[i],
                                imageSize = new kakao.maps.Size(21, 23);
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });


                            allcoords[i].push(coords);
                            markers[i].push(marker);


                            (function (marker, coords) {
                                kakao.maps.event.addListener(marker, 'click', function () {
                                    displayPlaceInfo(allArray[j][0], coords, allArray[j][1], allArray[j][4], allArray[j][3] );
                                });
                            })(marker, coords);


                 }
           }
      }
for (let i = 0; i < Category2.length; i++) {
    for (let j = 0; j < allArray.length; j++) {
                if (allArray[j][2].trim() === Category2[i]) {

                            var coords = new kakao.maps.LatLng(allArray[j][5][0],allArray[j][5][1]);

                            var imageSrc = img2[i],
                                imageSize = new kakao.maps.Size(21, 23);
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });

                            allcoords[i+19].push(coords);
                            markers[i+19].push(marker);

                           (function (marker, coords) {
                                kakao.maps.event.addListener(marker, 'click', function () {
                                    displayPlaceInfo(allArray[j][0], coords, allArray[j][1], allArray[j][4], allArray[j][3]);
                                });
                            })(marker, coords);



                 }
           }
      }

//검색기능 추가
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        document.getElementById('menu_wrap').style.height = '35px';
        document.getElementById('menu_wrap').style.overflowY = 'hidden';

        //alert('키워드를 입력해주세요!');



        return false;
    }

        // 검색 목록과 마커를 표출합니다
        displayKewordPlaces(keyword);
        document.getElementById('sidebar').style.top = '350px';
        document.getElementById('menu_wrap').style.height = '280px';
        document.getElementById('menu_wrap').style.overflowY = 'auto';
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayKewordPlaces(keyword) {

    var listEl = document.getElementById('placesList'),
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(),
    bounds = new kakao.maps.LatLngBounds(),
    listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removePlaceMarker();

    pindex = [];

    // 공백을 기준으로 키워드를 분리합니다
    var keywords = keyword.split(/\s+/);

    for (let i = 0; i < allArray.length; i++) {
        // 모든 키워드가 존재하는지 확인합니다
        if (keywords.every(keyword => all[i].includes(keyword))) {
            pindex.push(i);
        }
    }

    for (let i = 0; i < pindex.length; i++) {
        var p = pindex[i];
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(allArray[p][5][0], allArray[p][5][1]),
            marker = addMarker(placePosition, i ),
            itemEl = getListItem(i, allArray[p]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(name, coords, address, phone, dep) {

            marker.onmouseover =  function () {
                displayName(name);
            };

            kakao.maps.event.addListener(marker, 'click', function() {
                displayPlaceInfo(name, coords, address, phone, dep);
            });

            itemEl.onmouseover =  function () {
                displayPlaceInfo(name, coords, address, phone, dep);
            };





        })(allArray[p][0],placePosition, allArray[p][1], allArray[p][4], allArray[p][3]);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places[0] + '</h5>';

        itemStr += '    <span>' +  places[1]  + '</span>';

      itemStr += '  <span class="tel">' + places[4]  + '</span>' +
                '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    keymarkers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removePlaceMarker() {
    for ( var i = 0; i < keymarkers.length; i++ ) {
        keymarkers[i].setMap(null);
    }
    keymarkers = [];
}



 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

var currMarker =""

var clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 5,

});

    var placeOverlay = new kakao.maps.CustomOverlay({
        zIndex:1
    });
    var contentNode = document.createElement('div');

    placeOverlay.setContent(contentNode);

    function displayName (name) {
    var content = '<div class="placeinfo"><span class="title">'+ name +'</span></a><hr>';
    contentNode.innerHTML = content;

    placeOverlay.setPosition(coords);
    placeOverlay.setContent(content);
    placeOverlay.setMap(map);
    }

    function displayPlaceInfo (name, coords, address, phone, dep) {
    var content = '<div class="placeinfo"><span class="title">'+ name +'</span></a><hr>';

    content += '    <span>' + address + '</span>';
    if (dep != 0) {
        content += '<span class="dep">진료과(전문의 有): ' + dep + '</span>';
    }  else {
        content += '';
    }
    content += '<span class="tel"><span style="color:black; display:inline-block;">TEL : </span><span style="display:inline-block">' + phone + '</span></span></div>';


    contentNode.innerHTML = content;

    placeOverlay.setPosition(coords);
    placeOverlay.setContent(content);
    placeOverlay.setMap(map);

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

        displayPlaces();
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

kakao.maps.event.addListener(map, 'click', function () {
                                    placeOverlay.setMap(null);
                                });

