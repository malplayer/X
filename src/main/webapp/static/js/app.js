/**
 * Created by malcolm on 3/8/14.
 */

String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
var path = $("#path").val();
var markerImagePath = path +"/static/images/icons/";
var markerDefaultImage = markerImagePath + "bigcity.png";
var locationData=null;
var tags=null;
var gmap=null;  //googlemap object
var jqmap=null; //jq google map object
//car
var dirn = new google.maps.DirectionsService();
var step = 5; // metres
var tick = 100; // milliseconds
var poly;
var poly2;
var lastVertex = 0;
var eol;
var car = new google.maps.MarkerImage();
car.image=path+"/static/images/caricon.png";
car.iconSize=new google.maps.Size(32,18);
car.iconAnchor=new google.maps.Point(16,9);
var marker;
var k=0;
var stepnum=0;
var speed = "";




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

    $('#map_canvas').gmap({'center':new google.maps.LatLng(41.057419, -73.537494),  'zoom': 10,'zoom': 5, 'disableDefaultUI':true}).bind('init', function(evt, map){
        $('#map_canvas').gmap('addControl', 'radios', google.maps.ControlPosition.TOP_LEFT);
        // createRadios();
        //createMarkers();

        jqmap = this;



    });
    gmap = $('#map_canvas').gmap('get', 'map');

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


var updatePoly=function(d) {
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (poly2.getVertexCount() > 20) {
        poly2=new GPolyline([poly.getVertex(lastVertex-1)]);
        gmap.addOverlay(poly2)
    }

    if (poly.GetIndexAtDistance(d) < lastVertex+2) {
        if (poly2.getVertexCount()>1) {
            poly2.deleteVertex(poly2.getVertexCount()-1)
        }
        poly2.insertVertex(poly2.getVertexCount(),poly.GetPointAtDistance(d));
    } else {
        poly2.insertVertex(poly2.getVertexCount(),poly.getVertex(lastVertex++));
    }
}

function animate(d) {
    if (d>eol) {
       // document.getElementById("step").innerHTML = "<b>Trip completed<\/b>";
       // document.getElementById("distance").innerHTML =  "Miles: "+(d/1609.344).toFixed(2);
        return;
    }
    var p = poly.GetPointAtDistance(d);
    if (k++>=180/step) {
        gmap.panTo(p);
        k=0;
    }
    marker.setPoint(p);
    //document.getElementById("distance").innerHTML =  "Miles: "+(d/1609.344).toFixed(2)+speed;
    if (stepnum+1 < dirn.getRoute(0).getNumSteps()) {
        if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
            stepnum++;
            var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
            //document.getElementById("step").innerHTML = "<b>Next:<\/b> "+steptext;
            var stepdist = dirn.getRoute(0).getStep(stepnum-1).getDistance().meters;
            var steptime = dirn.getRoute(0).getStep(stepnum-1).getDuration().seconds;
            var stepspeed = ((stepdist/steptime) * 2.24).toFixed(0);
            step = stepspeed/2.5;
            speed = "<br>Current speed: " + stepspeed +" mph";
        }
    } else {
        if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
            //document.getElementById("step").innerHTML = "<b>Next: Arrive at your destination<\/b>";
        }
    }
    updatePoly(d);
    setTimeout("animate("+(d+step)+")", tick);
}

google.maps.event.addListener(dirn,"load", function() {
    //document.getElementById("controls").style.display="none";
    poly=dirn.getPolyline();
    eol=poly.Distance();
    gmap.setCenter(poly.getVertex(0),17);
    gmap.addOverlay(new google.maps.Marker(poly.getVertex(0),G_START_ICON));
    gmap.addOverlay(new google.maps.Marker(poly.getVertex(poly.getVertexCount()-1),G_END_ICON));
    marker = new GMarker(poly.getVertex(0),{icon:car});
    gmap.addOverlay(marker);
    var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
    //document.getElementById("step").innerHTML = steptext;
    poly2 = new google.maps.Polyline([poly.getVertex(0)]);
    gmap.addOverlay(poly2);
    setTimeout("animate(0)",2000);  // Allow time for the initial map display
});

google.maps.event.addListener(dirn,"error", function() {
    alert("Location(s) not recognised. Code: "+dirn.getStatus().code);
});

function start() {
    var startpoint = "Philadelphia, PA";
    var endpoint = "Washington DC";
    dirn.loadFromWaypoints([startpoint,endpoint],{getPolyline:true,getSteps:true});
}



$(function() {

    createMap();
    getLocationDataAjax();
});


/*var map = new GMap2(document.getElementById("map"));
 map.addControl(new GMapTypeControl());
 map.setCenter(new GLatLng(0,0),2);
 var dirn = new GDirections();
 var step = 5; // metres
 var tick = 100; // milliseconds
 var poly;
 var poly2;
 var lastVertex = 0;
 var eol;
 var car = new GIcon();
 car.image="caricon.png"
 car.iconSize=new GSize(32,18);
 car.iconAnchor=new GPoint(16,9);
 var marker;
 var k=0;
 var stepnum=0;
 var speed = "";

 function updatePoly(d) {
 // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
 if (poly2.getVertexCount() > 20) {
 poly2=new GPolyline([poly.getVertex(lastVertex-1)]);
 map.addOverlay(poly2)
 }

 if (poly.GetIndexAtDistance(d) < lastVertex+2) {
 if (poly2.getVertexCount()>1) {
 poly2.deleteVertex(poly2.getVertexCount()-1)
 }
 poly2.insertVertex(poly2.getVertexCount(),poly.GetPointAtDistance(d));
 } else {
 poly2.insertVertex(poly2.getVertexCount(),poly.getVertex(lastVertex++));
 }
 }

 function animate(d) {
 if (d>eol) {
 document.getElementById("step").innerHTML = "<b>Trip completed<\/b>";
 document.getElementById("distance").innerHTML =  "Miles: "+(d/1609.344).toFixed(2);
 return;
 }
 var p = poly.GetPointAtDistance(d);
 if (k++>=180/step) {
 map.panTo(p);
 k=0;
 }
 marker.setPoint(p);
 document.getElementById("distance").innerHTML =  "Miles: "+(d/1609.344).toFixed(2)+speed;
 if (stepnum+1 < dirn.getRoute(0).getNumSteps()) {
 if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
 stepnum++;
 var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
 document.getElementById("step").innerHTML = "<b>Next:<\/b> "+steptext;
 var stepdist = dirn.getRoute(0).getStep(stepnum-1).getDistance().meters;
 var steptime = dirn.getRoute(0).getStep(stepnum-1).getDuration().seconds;
 var stepspeed = ((stepdist/steptime) * 2.24).toFixed(0);
 step = stepspeed/2.5;
 speed = "<br>Current speed: " + stepspeed +" mph";
 }
 } else {
 if (dirn.getRoute(0).getStep(stepnum).getPolylineIndex() < poly.GetIndexAtDistance(d)) {
 document.getElementById("step").innerHTML = "<b>Next: Arrive at your destination<\/b>";
 }
 }
 updatePoly(d);
 setTimeout("animate("+(d+step)+")", tick);
 }

 GEvent.addListener(dirn,"load", function() {
 document.getElementById("controls").style.display="none";
 poly=dirn.getPolyline();
 eol=poly.Distance();
 map.setCenter(poly.getVertex(0),17);
 map.addOverlay(new GMarker(poly.getVertex(0),G_START_ICON));
 map.addOverlay(new GMarker(poly.getVertex(poly.getVertexCount()-1),G_END_ICON));
 marker = new GMarker(poly.getVertex(0),{icon:car});
 map.addOverlay(marker);
 var steptext = dirn.getRoute(0).getStep(stepnum).getDescriptionHtml();
 document.getElementById("step").innerHTML = steptext;
 poly2 = new GPolyline([poly.getVertex(0)]);
 map.addOverlay(poly2);
 setTimeout("animate(0)",2000);  // Allow time for the initial map display
 });

 GEvent.addListener(dirn,"error", function() {
 alert("Location(s) not recognised. Code: "+dirn.getStatus().code);
 });

 function start() {
 var startpoint = document.getElementById("startpoint").value;
 var endpoint = document.getElementById("endpoint").value;
 dirn.loadFromWaypoints([startpoint,endpoint],{getPolyline:true,getSteps:true});
 }

 }
 */
