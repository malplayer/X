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



/* plot stuff */
var plot1;
var updatePeriod = 2;

var fireConst =     [30, 22, 19, 9, 0, 41, 21, 31, 19, 25, 35, 32, 14, 9, 15, 25, 23, 45, 52, 71, 79, 85, 72, 45];
var medicalConst =  [1428, 1823, 1201, 1023, 1780, 2503, 2802, 2907, 3102, 3019, 2973, 2141, 2190, 2342, 2012, 2302, 2212, 2340, 2134, 1934, 1745, 1521, 1329, 1290];
var policeConst =   [4512, 5123, 4102, 3912, 4790, 5123, 5178, 7012, 5127, 4912, 5289, 5185, 7045, 5913, 4790, 5957, 7012, 7103, 7012, 7132, 5901, 4808, 4790, 4577];
var utilityConst =  [3, 5, 1, 3, 7, 8, 2, 6, 2, 1, 6, 8, 4, 2, 5, 4, 7, 3, 2, 1, 10, 4, 5, 2];

//var myVar = setInterval(function () { updateDemo() }, updatePeriod * 1000);
var emerCalls;
var timeArray = new Array();

var fireLastHour = -1;
var firePast = new Array();
var fire = new Array();
var curFire = 0;
var FirstFireCalculation = true;

var utilityLastHour = -1;
var utilityPast = new Array();
var utility = new Array();
var curUtility = 0;
var FirstUtilityCalculation = true;

var medicalLastHour = -1;
var medicalPast = new Array();
var medical = new Array();
var curMedical = 0;
var FirstMedicalCalculation = true;
var medical_trauma;
var medical_respitory;
var medical_illness;
var medical_poisen;
var medical_uncategorized;

var policeLastHour = -1;

var policePast = new Array();
var police = new Array();
var curPolice = 0;
var FirstPoliceCalculation = true;
var medical_trauma_stat;




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

var calcRoute=function(startPoint,endPoint){

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
    var start = startPoint;
    var end = endPoint;
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



/*chart funtions */

var fillTimeArray = function() {
    var current = new Date().getHours();
    timeArray = new Array();
    var milhr;
    var hours;
    for (var h = 11; h >= 0; h--) {
        milhr = current - h;
        if (milhr < 0) {
            milhr += 24;
        }
        suffex = (milhr >= 12) ? 'pm' : 'am';

        hours = (milhr > 12) ? milhr - 12 : milhr;

        //if 00 then it is 12 am
        hours = (milhr == '00') ? 12 : hours;
        timeArray.push(hours + ":00 " + suffex);
    }
}



var fillFire=function()
{
    var durDate = new Date();
    var currentHour = durDate.getHours();
    fire = [];
    if (FirstFireCalculation)
    {
        var perc = durDate.getMinutes()/60;
        curFire = Math.floor(fireConst[durDate.getHours()] * perc);
        FirstFireCalculation = false;
        fireLastHour = currentHour;
    }

    if (currentHour != fireLastHour) {
        fireLastHour = currentHour;
        firePast.push(curFire);
        curFire = 0;
    }

    for (var h = 11; h - firePast.length >= 1; h--) {
        cur = durDate.getHours() - h;
        if (cur < 0)
        {
            cur += 24;
        }
        fire.push(fireConst[cur]);
    }

    //The amount of times this function is called per hour
    var CalledPerHour = (3600 / updatePeriod);

    //The amount of fires that occur this hour
    var FireThisHour = fireConst[durDate.getHours()];


    var AverageFirePerCall = (((FireThisHour / CalledPerHour) * 2) - 1);

    if (AverageFirePerCall > 0) {
        curMedical += Math.floor((Math.random() * AverageFirePerCall) + 1);
    } else {
        var random = Math.floor((Math.random() * 100) + 1);
        var numUnder = (fireConst[durDate.getHours()] / CalledPerHour) * 100;
        if (random < numUnder) {
            curFire++;
        }
    }

    fire_residential = Math.ceil(curFire * .2);
    fire_commercial = Math.ceil(curFire * .08);
    fire_government = Math.ceil(curFire * .05);
    fire_vehicle = Math.ceil(curFire * .3);
    fire_wild = Math.ceil(curFire * .09);

    fire_unknown = curFire - (fire_residential + fire_commercial + fire_government + fire_vehicle +fire_wild);
    if (fire_unknown < 0) {

        fire_unknown = 0;
    }


    $('#fire_problems').text(curFire);
    $('#fire_residential_amount').text(fire_residential);
    $('#fire_commercial_amount').text(fire_commercial);
    $('#fire_government_amount').text(fire_government);
    $('#fire_vehicle_amount').text(fire_vehicle);
    $('#fire_wild_amount').text(fire_wild);
    $('#fire_unknown_amount').text(fire_unknown);


    fire.push(curFire);
}





var fillMedical=function() {
    var durDate = new Date();
    var currentHour = durDate.getHours();
    medical = [];
    if (FirstMedicalCalculation) {
        var perc = durDate.getMinutes() / 60;
        curMedical = Math.floor(medicalConst[durDate.getHours()] * perc);

        FirstMedicalCalculation = false;
        medicalLastHour = currentHour;
    }

    if (currentHour != medicalLastHour) {
        medicalLastHour = currentHour;
        medicalPast.push(curMedical);
        curMedical = 0;
    }

    for (var h = 11; h - medicalPast.length >= 1; h--) {
        cur = durDate.getHours() - h;
        if (cur < 0)
        {
            cur += 24;
        }
        medical.push(medicalConst[cur]);
    }

    //The amount of times this function is called per hour
    var CalledPerHour = (3600 / updatePeriod);

    //The amount of fires that occur this hour
    var MedicalThisHour = medicalConst[durDate.getHours()];

    //Percent of hour that has fire
    var PercentMedical = (MedicalThisHour / 60) * 100;

    var AverageMedicalPerCall = (((MedicalThisHour / CalledPerHour) * 2) - 1);

    var AddedMedical;

    var tmp;
    if (AverageMedicalPerCall > 0) {

        AddedMedical = Math.floor((Math.random() * AverageMedicalPerCall) + 1);
        curMedical += AddedMedical;


    } else
    {
        var random = Math.floor((Math.random() * 100) + 1);
        var numUnder = (medicalConst[durDate.getHours()] / CalledPerHour)*100;
        if (random < numUnder) {
            curMedical++;
        }
    }

    medical_trauma = Math.ceil(curMedical * .3);
    medical_respitory = Math.ceil(curMedical * .2);
    medical_illness = Math.ceil(curMedical * .2);
    medical_poisen = Math.ceil(curMedical * .1);
    medical_uncategorized = curMedical - (medical_trauma + medical_respitory + medical_illness + medical_poisen);
    if (medical_uncategorized < 0) {

        medical_uncategorized = 0;
    }

    medical.push(curMedical);

    $('#medical_problems').text(curMedical);
    $('#medical_trauma_amount').text(medical_trauma);
    $('#medical_respitory_amount').text(medical_respitory);
    $('#medical_illnes_amount').text(medical_illness);
    $('#medical_poisen_amount').text(medical_poisen);
    $('#medical_unknown_amount').text(medical_uncategorized);
    //medical_trauma_stat.text(medical_trauma.join(",")).change();

}



var fillPolice=function() {
    var durDate = new Date();
    var currentHour = durDate.getHours();
    police = [];
    if (FirstPoliceCalculation) {
        var perc = durDate.getMinutes() / 60;
        curPolice = Math.floor(policeConst[durDate.getHours()] * perc);
        FirstPoliceCalculation = false;
        policeLastHour = currentHour;
    }

    if (currentHour != policeLastHour) {
        policeLastHour = currentHour;
        policePast.push(curPolice);
        curPolice = 0;
    }

    for (var h = 11; h - policePast.length >= 1; h--) {
        cur = durDate.getHours() - h;
        if (cur < 0)
        {
            cur += 24;
        }
        police.push(policeConst[cur]);
    }

    //The amount of times this function is called per hour
    var CalledPerHour = (3600 / updatePeriod);

    //The amount of fires that occur this hour
    var PoliceThisHour = policeConst[durDate.getHours()];

    //Percent of hour that has fire
    var PercentPolice = (PoliceThisHour / 60) * 100;

    var AveragePolicePerCall = (((PoliceThisHour / CalledPerHour) * 2) - 1)

    if (AveragePolicePerCall > 0) {
        curPolice += Math.floor((Math.random() * AveragePolicePerCall) + 1);
    } else {
        var random = Math.floor((Math.random() * 100) + 1);
        var numUnder = (policeConstv[durDate.getHours()] / CalledPerHour) * 100;
        if (random < numUnder) {
            curPolice++;
        }
    }

    police.push(curPolice);
}



var fillUtility=function() {
    var durDate = new Date();
    var currentHour = durDate.getHours();
    utility = [];
    if (FirstUtilityCalculation) {
        var perc = durDate.getMinutes() / 60;
        curUtility = Math.floor(utilityConst[durDate.getHours()] * perc);
        FirstUtilityCalculation = false;
        utilityLastHour = currentHour;
    }

    if (currentHour != utilityLastHour) {
        utilityLastHour = currentHour;
        utilityPast.push(curUtility);
        curUtility = 0;
    }

    for (var h = 11; h - utilityPast.length >= 1; h--) {
        cur = durDate.getHours() - h;
        if (cur < 0) {
            cur += 24;
        }
        utility.push(utilityConst[cur]);
    }

    //The amount of times this function is called per hour
    var CalledPerHour = (3600 / updatePeriod);

    //The amount of fires that occur this hour
    var UtilityThisHour = utilityConst[durDate.getHours()];

    //Percent of hour that has fire
    var PercentUtility = (UtilityThisHour / 60) * 100;

    var AverageUtilityPerCall = (((UtilityThisHour / CalledPerHour) * 2) - 1)

    if (AverageUtilityPerCall > 0) {
        curUtility += Math.floor((Math.random() * AverageUtilityPerCall) + 1);
    } else {
        var random = Math.floor((Math.random() * 100) + 1);
        var numUnder = (utilityConst[durDate.getHours()] / CalledPerHour) * 100;
        if (random < numUnder) {
            curUtility++;
        }
    }

    utility.push(curUtility);
}

var  updateDemo = function() {
    fillTimeArray();
    fillFire();
    fillMedical();
    fillPolice();
    fillUtility();

    if(plot1)
    {
        plot1.destroy();
    }

    var utility = [4, 9, 2, 13, 12, 4, 12, 9, 12, 11, 3, 0];

    plot1 = $.jqplot("chart6", [medical, fire, police, utility], {
        // Tell the plot to stack the bars.
        seriesDefaults: {
            pointLabels: { show: true },
            showMarker:false
        },
        captureRightClick: true,
        series: [
            {
                // Change our line width and use a diamond shaped marker.
                lineWidth: 2,
                color: '#B0171F',
                label: 'Medical'
            },
            {
                // Don't show a line, just show markers.
                // Make the markers 7 pixels with an 'x' style

                color: '#FF4500',
                label: 'Fire'
            },
            {
                // Use (open) circlular markers.

                color: '#0000FF',
                label: 'Police'
            },
            {
                // Use a thicker, 5 pixel line and 10 pixel
                // filled square markers.

                color: '#66CDAA',
                label: 'Utility'
            }
        ],
        axes: {
            xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer,
                label: 'Time (local)',
                ticks: timeArray
            },
            yaxis: {
                // Don't pad out the bottom of the data range.  By default,
                // axes scaled as if data extended 10% above and below the
                // actual range to prevent data points right on grid boundaries.
                // Don't want to do that here.

                label: 'Alerts'
            }
        },
        legend: {
            show: true,
            placement: 'outsideGrid'
        }
    });
}


$(function() {

    createMap();
    getLocationDataAjax();
    $("#btnStart").click(function(e)
    {
        var start = "41.057419, -73.537494";
        var end = "Washington DC";
        calcRoute(start,end);
    });

    /* Widget close */

    $('.wclose').click(function(e){
        e.preventDefault();
        var $wbox = $(this).parent().parent().parent();
        $wbox.hide(100);
    });

    /* Widget minimize */

    $('.wminimize').click(function(e){
        e.preventDefault();
        var $wcontent = $(this).parent().parent().next('.widget-content');
        if($wcontent.is(':visible'))
        {
            $(this).children('i').removeClass('icon-chevron-up');
            $(this).children('i').addClass('icon-chevron-down');
        }
        else
        {
            $(this).children('i').removeClass('icon-chevron-down');
            $(this).children('i').addClass('icon-chevron-up');
        }
        $wcontent.slideToggle(300);
    });

    $(".line").peity("line", { fill: ['#B017F'] });
    $(".bar").peity("bar", { fill: ['#B017F'] });
    updateDemo();
    //setInterval(function () { updateDemo() }, updatePeriod * 1000);
});














