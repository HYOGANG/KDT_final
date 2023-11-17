var names = document.getElementById('name').innerHTML.split(',')
var addresses= document.getElementById('address').innerHTML.split(',')
var types= document.getElementById('type').innerHTML.split(',');
var deps= document.getElementById('department').innerHTML.split('|');

//Category = ['외과', '내과', '피부과', '이비인후과', '정형외과', '신경외과', '흉부외과', '성형외과', '신경과', '정신건강의학과', '마취통증의학과', '산부인과', '소아청소년과', '안과',   '비뇨기과', '영상의학과', '병리과', '진단검사의학과', '결핵과', '재활의학과', '핵의학과', '가정의학과', '직업환경의학과', '치과', '한방', '일반의']
Category = ['외과','내과', '산부인과', '신경과', '안과', '이비인후과','치과', '피부과', '정신건강의학과', '가정의학과', '결핵과', '비뇨기과', '소아청소년과', '재활의학과',   '한방']
Category2 = ['종합병원', '병원', '의원', '치과병원', '치과의원', '한방병원', '한의원', '요양병원', '정신병원', '보건진료소', '보건지소', '약국']

//Category = ['외과'['신경외과' , '정형외과' ,  '흉부외과', '성형외과'], '내과', '산부인과', '신경과', '안과', '이비인후과','치과', '피부과', '정신건강의학과', '가정의학과', '결핵과', '비뇨기과', '소아청소년과', '재활의학과',   '한방']
//document.getElementById("category").innerHTML = Category;

var currCategory = [];
var allcoords = Array.from(
                            { length: Category.length + Category2.length },
                            () => []);
var markers = Array.from(
                            { length: Category.length + Category2.length },
                            () => []);
/*
var infowindows = Array.from(
                            { length: Category.length + Category2.length },
                            () => []);
*/


var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}),
    contentNode = document.createElement('div')

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(36.5331357, 127.2454549), // 지도의 중심좌표
        level: 8 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 지도에 idle 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', searchPlaces);

// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
contentNode.className = 'placeinfo_wrap';

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

// 커스텀 오버레이 컨텐츠를 설정합니다
placeOverlay.setContent(contentNode);

// 각 카테고리에 클릭 이벤트를 등록합니다
addCategoryClickEvent();

// 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}

//console.log('1');
//console.log(Category);
for (let i = 0; i < Category.length; i++) {
    for (let j = 0; j < names.length; j++) {
                if (deps[j].includes(Category[i])) {
                    (function (index) {
                      geocoder.addressSearch(addresses[index], function(result, status) {

                        if (status === kakao.maps.services.Status.OK) {

                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                            var imageSrc = '/static/img/dot.png', // 마커이미지의 주소입니다
                                imageSize = new kakao.maps.Size(21, 23); // 마커이미지의 크기입니다
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });
                            /*
                            var Content = '<div style="padding:5px;">'+names[j]+'<br>'// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

                            var infowindow = new kakao.maps.InfoWindow({
                                position : coords,
                                content : Content
                            });
                            */

                            allcoords[i].push(coords);
                            markers[i].push(marker);
                            //infowindows[i].push(infowindow);

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

                            var imageSrc = '/static/img/dot.png', // 마커이미지의 주소입니다
                                imageSize = new kakao.maps.Size(21, 23); // 마커이미지의 크기입니다
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

                            var marker = new kakao.maps.Marker({
                                position: coords,
                                image: markerImage
                            });
                            /*
                            var Content = '<div style="padding:5px; text-align: center;">'+names[j]+'<br>'// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

                            var infowindow = new kakao.maps.InfoWindow({
                                position : coords,
                                content : Content
                            });
                            */

                            allcoords[i+15].push(coords);
                            markers[i+15].push(marker);
                            //infowindows[i+15].push(infowindow);

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
//클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
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

// 카테고리 검색을 요청하는 함수입니다
function searchPlaces() {
        /*
        if (currCategory.length === 0) {
        removeAllMarkers();
            return;
        }
        placeOverlay.setMap(null);

    // 선택된 카테고리에 해당하는 마커들을 지도에서 제거
    for (var i = 0; i < currCategory.length; i++) {
        var currentOrder = document.getElementById(currCategory[i]).getAttribute('data-order');
        removeMarker(currentOrder);
    }
    */
       displayPlaces();
}
// 지도 위에 표시되고 있는 모든 마커를 제거하는 함수
/*
function removeAllMarkers() {
    for (var i = 0; i < markers.length; i++) {
        removeMarker(i);
    }

}
*/


 function displayPlaces(places) {

    for (var i = 0; i < currCategory.length; i++) {
        var currentCategory = currCategory[i];
        var currentOrder = document.getElementById(currentCategory).getAttribute('data-order');
          for ( var j=0; j < allcoords[currentOrder].length; j++ ) {
            markers[currentOrder][j].setMap(map);
            //infowindows[currentOrder][j].open(map, markers[currentOrder][j]);
            /*
                var marker = markers[currentOrder][j],
                    name = names[currentOrder][j],
                    coord = allcoords[currentOrder][j];

            (function(marker, name, coord) {
                kakao.maps.event.addListener(marker, 'click', function() {
                    displayPlaceInfo(name, coord);
                });
            });
            */
            }
    }
 }



// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker(order) {
            for (var i = 0; i < markers[order].length; i++) {
                        markers[order][i].setMap(null);
                        //infowindows[order][i].close();
                        //placeOverlay.setMap(null);
                    }
                }




// 각 카테고리에 클릭 이벤트를 등록합니다
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

// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory() {
    var id = this.id,
        index = currCategory.indexOf(id);
    placeOverlay.setMap(null);
    if (index !== -1) {
        // 이미 선택된 카테고리라면 제거
        currCategory.splice(index, 1);
        // 선택된 카테고리에 해당하는 마커 제거
        var currentOrder = document.getElementById(id).getAttribute('data-order');
        removeMarker(currentOrder);
    } else {
        // 선택되지 않은 카테고리라면 추가
        currCategory.push(id);
        // 선택된 카테고리에 해당하는 장소 표시
        searchPlaces();
    }

    changeCategoryClass(this);
}



// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el) {
    if (el.classList.contains('on')) {
        // 선택된 카테고리라면 클래스 제거
        el.classList.remove('on');
    } else {
        // 선택되지 않은 카테고리라면 클래스 추가
        el.classList.add('on');
    }
}