/**
 * Created by malcolm on 3/8/14.
 */

String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
var path = $("#path").val();
var markerImagePath = path +"/static/images/icons/";
var markerDefaultImage = markerImagePath + "bigcity.png";
var carimage=path+"/static/images/caricon.png";
var locationData=null;
var tags=null;
var gmap=null;  //googlemap object
var jqmap=null; //jq google map object
//car



var directionDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];
var position;
var marker = null;
var polyline = null;
var poly2 = null;
var speed = 0.000005,wait = 1;
var infowindow = null;

var myPano;
var panoClient;
var nextPanoId;
var timerHandle = null;

var steps = [];

var step = 50; // 5; // metres
var tick = 100; // milliseconds
var eol;
var k=0;
var stepnum=0;
var speed = "";
var lastVertex = 1;




var MarkerImages={};

MarkerImages['Hospital'] = markerImagePath + "hospital-building.png";
MarkerImages['City Department'] = markerImagePath + "administration.png";
MarkerImages['U.S.Military'] = markerImagePath + "military.png";
MarkerImages['Rail'] = markerImagePath + "train.png";
MarkerImages['Bank'] = markerImagePath + "bank.png";
MarkerImages['University'] = markerImagePath + "university.png";
MarkerImages['Public School'] = markerImagePath + "school.png";
MarkerImages['Hotel'] = markerImagePath + "bed_breakfast1.png";
MarkerImages['Health Care Facility'] = markerImagePath + "medicine.png";
MarkerImages['Federal Court Building'] = markerImagePath + "court.png";
MarkerImages['County Government'] = markerImagePath + "administration.png";
MarkerImages['City Government'] = markerImagePath + "administration.png";
MarkerImages['Shopping Mall'] = markerImagePath + "mall.png";
MarkerImages['City Utilities'] = markerImagePath + "waterdrop.png";
MarkerImages['County Utilities'] = markerImagePath + "waterdrop.png";
MarkerImages['Toll Plaza'] = markerImagePath + "tollstation.png";
MarkerImages['Electrical Power Station'] = markerImagePath + "powersubstation.png";
MarkerImages['City Fire Station'] = markerImagePath + "firemen.png";
MarkerImages['City Police'] = markerImagePath + "police.png";
MarkerImages['State Police'] = markerImagePath + "police.png";
MarkerImages['State Auto Inspection'] = markerImagePath + "car.png";
MarkerImages['Auto Gas Station'] = markerImagePath + "fillingstation.png";
MarkerImages['Medical School'] = markerImagePath + "university.png";
MarkerImages['Medical Facility'] = markerImagePath + "medicine.png";
MarkerImages['Subway Station'] = markerImagePath + "underground.png";
MarkerImages['Train Station'] = markerImagePath + "train.png";
MarkerImages['Cell Tower'] = markerImagePath + "mobilephonetower.png";


var getLocationDataAjax = function()
{
    var url = path +"/api/getpoi/";
    //url =encodeURI(url);

    $.ajax({
        dataType: "json",
        url: url,
        async : true,
        cache : true,
        success : function(data){

            locationData=data;
            var temparay=[];
            var len = data.locations.length;

            for(var i=0;i<len;i++)
            {
                temparay.push(data.locations[i].category);
            }
            tags = _.uniq(temparay);
            createRadios();
            createMarkers();


        }
    });
}


/**
 *  Creates and Initialize Google Map
 * */
var createMap=function()
{

    $('#map_canvas').gmap({'center':new google.maps.LatLng(41.057419, -73.537494),  'zoom': 16, 'disableDefaultUI':true,mapTypeId: google.maps.MapTypeId.ROADMAP}).bind('init', function(evt, map){
        $('#map_canvas').gmap('addControl', 'radios', google.maps.ControlPosition.TOP_LEFT);
        // createRadios();
        //createMarkers();

        jqmap = this;



    });
    gmap = $('#map_canvas').gmap('get', 'map');


    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService();



    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
        map: gmap
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();

    polyline = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeWeight: 3
    });
    poly2 = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeWeight: 3
    });

    infowindow = new google.maps.InfoWindow(
        {
            size: new google.maps.Size(150,50)
        });

}

var createRadios=function()
{
    $.each(tags, function(i, tag) {
        //$('#tags').append(('<option value="{0}">{1}</option>').format(tag, tag));
        $('#radios').append(('<label style="margin-right:5px;display:block;"><input type="checkbox" style="margin-right:3px" value="{0}"/>{1}</label>').format(tag, tag));
    });

    $('input:checkbox').on('click',function() {
        $('#map_canvas').gmap('closeInfoWindow');
        $('#map_canvas').gmap('set', 'bounds', null);
        var filters = [];
        $('input:checkbox:checked').each(function(i, checkbox) {
            filters.push($(checkbox).val());
        });
        if ( filters.length > 0 ) {
            $('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': filters, 'operator': 'OR' }, function(marker, found) {
                if (found) {
                    $('#map_canvas').gmap('addBounds', marker.position);
                }
                marker.setVisible(found);
            });
        } else {
            $.each($('#map_canvas').gmap('get', 'markers'), function(i, marker) {
                $('#map_canvas').gmap('addBounds', marker.position);
                marker.setVisible(true);
            });
        }
    });

}
var createMarkers=function()
{
    var len = locationData.locations.length;

    for(var i=0;i<len;i++)
    {

        var  position = new google.maps.LatLng(locationData.locations[i].longitude, locationData.locations[i].latitude);
        var image ="";
        var category = locationData.locations[i].category;
        var name = locationData.locations[i].name;




        if(MarkerImages[category] !== undefined)
            image = MarkerImages[category];
        else
            image = markerDefaultImage;
        var infowindow = new google.maps.InfoWindow({
            content: '<div><h1 style="color: red; font-size: 14px; margin: 0; padding: 0;">'+name+'</h1><br/><p><b>Category: '+category+
                '</b></p><br/><p><b>Latitude: '+ locationData.locations[i].latitude+'</b></p><br/><p><b>Longitude: '+ locationData.locations[i].longitude+'</b></p></div>' });



        $('#map_canvas').gmap('addMarker', { 'icon': image, 'tags':category, 'bound':true, 'position': position,'dataIndex': i,'title':name } ).click(function() {
            $('#map_canvas').gmap('openInfoWindow', infowindow, this);
        });
    }


}

var createMarker= function(latlng, label, html) {
    // alert("createMarker("+latlng+","+label+","+html+","+color+")");
    var contentString = '<b>'+label+'</b><br>'+html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: gmap,
        title: label,
        icon: carimage,
        zIndex: Math.round(latlng.lat()*-100000)<<5
    });
    marker.myname = label;
    // gmarkers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map,marker);
    });
    return marker;
}

var calcRoute=function(){

    if (timerHandle) { clearTimeout(timerHandle); }
    if (marker) { marker.setMap(null);}
    polyline.setMap(null);
    poly2.setMap(null);
    directionsDisplay.setMap(null);
    polyline = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeWeight: 3
    });
    poly2 = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeWeight: 3
    });
    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
        map: gmap
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    //var start = document.getElementById("start").value;
    //var end = document.getElementById("end").value;
    var start = "41.057419, -73.537494";
    var end = "Washington DC";
    var travelMode = google.maps.DirectionsTravelMode.DRIVING

    var request = {
        origin: start,
        destination: end,
        travelMode: travelMode
    };

    // Route the directions and pass the response to a
    // function to create markers for each step.
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(response);

            var bounds = new google.maps.LatLngBounds();
            var route = response.routes[0];
            startLocation = new Object();
            endLocation = new Object();

            // For each route, display summary information.
            var path = response.routes[0].overview_path;
            var legs = response.routes[0].legs;
            for (i=0;i<legs.length;i++) {
                if (i == 0) {
                    startLocation.latlng = legs[i].start_location;
                    startLocation.address = legs[i].start_address;
                    // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                    marker = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
                }
                endLocation.latlng = legs[i].end_location;
                endLocation.address = legs[i].end_address;
                var steps = legs[i].steps;
                for (j=0;j<steps.length;j++) {
                    var nextSegment = steps[j].path;
                    for (k=0;k<nextSegment.length;k++) {
                        polyline.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);



                    }
                }
            }
            polyline.setMap(gmap);
            gmap.fitBounds(bounds);
            gmap.setZoom(18);
            gmap.setCenter(new google.maps.LatLng(41.057419, -73.537494));
            startAnimation();
        }
    });
}







//=============== animation functions ======================
var updatePoly=function(d) {
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (poly2.getPath().getLength() > 20) {
        poly2=new google.maps.Polyline([polyline.getPath().getAt(lastVertex-1)]);
        // map.addOverlay(poly2)
    }

    if (polyline.GetIndexAtDistance(d) < lastVertex+2) {
        if (poly2.getPath().getLength()>1) {
            poly2.getPath().removeAt(poly2.getPath().getLength()-1)
        }
        poly2.getPath().insertAt(poly2.getPath().getLength(),polyline.GetPointAtDistance(d));
    } else {
        poly2.getPath().insertAt(poly2.getPath().getLength(),endLocation.latlng);
    }
}


var animate=function(d) {
    if (d>eol) {
        gmap.panTo(endLocation.latlng);
        marker.setPosition(endLocation.latlng);
        return;
    }
    var p = polyline.GetPointAtDistance(d);
    gmap.panTo(p);
    marker.setPosition(p);
    updatePoly(d);
    timerHandle = setTimeout("animate("+(d+step)+")", tick);
}


function startAnimation() {
    eol=polyline.Distance();
    gmap.setCenter(polyline.getPath().getAt(0));
    poly2 = new google.maps.Polyline({path: [polyline.getPath().getAt(0)], strokeColor:"#0000FF", strokeWeight:10});
    setTimeout("animate(50)",2000);  // Allow time for the initial map display
}


//=============== ~animation funcitons =====================




$(function() {

    createMap();
    getLocationDataAjax();
    $("#btnStart").click(function(e)
    {
        calcRoute();
    });
});

