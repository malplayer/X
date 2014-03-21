<%--
  Created by IntelliJ IDEA.
  User: MXP2559
  Date: 12/11/13
  Time: 3:31 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <title>VinTech Demo</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap-theme.min.css">

    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link href="//cdn.jsdelivr.net/jqplot/1.0.8/jquery.jqplot.css" rel="stylesheet">


    <link rel="stylesheet" href="<c:url value="/static/css/app.css"/>">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="//oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <style>

        body {
            padding-top: 70px;
        }
        .starter-template {
            padding: 40px 15px;
            text-align: center;
        }


    </style>



</head>
<body>
<input type="hidden" id="path" value="${pageContext.request.contextPath}"/>
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">VinTech Demo</a>
        </div>

    </div>
</div>

<div class="container">

<div class="row">
    <div id="mapContainer">
        <div class="item rounded dark row">
            <div id="map_canvas" class="map rounded"></div>
        </div>
        <div id="radios" class="item gradient rounded shadow" style="margin:5px;padding:5px 5px 5px 10px;overflow-y: scroll;height: 600px"></div>

    </div>
</div>

<div class="row">
    <div class="col-md-2">
        <button  type="button" id="btnStart" class=" btn btn-success" data-toggle="modal" data-target="#demModal">Start</button>
    </div>
</div>
<div class="row" >

    <!-- Chart widget -->
    <div class="col-md-12">
        <div class="widget wblack">
            <!-- Widget title -->
            <div class="widget-head">
                <div class="pull-left">Alert Chart</div>
                <div class="widget-icons pull-right">
                    <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                    <a href="#" class="wsettings"><i class="fa fa-wrench"></i></a>
                    <a href="#" class="wclose"><i class="fa fa-times"></i></a>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="widget-content">
                <!-- Widget content -->
                <div class="padd">
                    <div class="stats_bar">
                        <div id="chart6" class="chart_block">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</div>
<div class="row" >

<!-- Medical Chart widget -->
<div class="col-md-3">
    <div class="widget wblack">
        <!-- Widget title -->
        <div class="widget-head">
            <div class="pull-left"><span class="glyphicon glyphicon-stats"></span>&nbsp;Medical</div>
            <div class="widget-icons pull-right">
                <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                <a href="#" class="wsettings"><i class="fa fa-wrench"></i></a>
                <a href="#" class="wclose"><i class="fa fa-times"></i></a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="widget-content">
            <!-- Widget content -->
            <div class="padd">
                <div class="stat_block">
                    <h4 style="text-align:center"><span id="medical_problems"></span> Medical Alerts</h4>
                    <table>
                        <tbody>
                        <tr>
                            <td>Trauma
                            </td>
                            <td><span id="medical_trauma_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="bar" id="medical_trauma_stat">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Respitory
                            </td>
                            <td><span id="medical_respitory_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Illnes
                            </td>
                            <td><span id="medical_illnes_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Poisen
                            </td>
                            <td><span id="medical_poisen_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Unknown
                            </td>
                            <td><span id="medical_unknown_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Fire Chart widget -->
<div class="col-md-3">
    <div class="widget wblack">
        <!-- Widget title -->
        <div class="widget-head">
            <div class="pull-left"><span class="glyphicon glyphicon-stats"></span>&nbsp;Fire</div>
            <div class="widget-icons pull-right">
                <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                <a href="#" class="wsettings"><i class="fa fa-wrench"></i></a>
                <a href="#" class="wclose"><i class="fa fa-times"></i></a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="widget-content">
            <!-- Widget content -->
            <div class="padd">
                <div class="stat_block">
                    <h4 style="text-align:center"><span id="fire_problems"></span> Fire Alerts</h4>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Residential
                            </td>
                            <td>
                                <span id="fire_residential_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="bar" id="fire_residential_stat">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Commercial
                            </td>
                            <td>
                                <span id="fire_commercial_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Government
                            </td>
                            <td>
                                <span id="fire_government_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Vehicle
                            </td>
                            <td>
                                <span id="fire_vehicle_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Wild
                            </td>
                            <td>
                                <span id="fire_wild_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Unknown
                            </td>
                            <td>
                                <span id="fire_unknown_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Police Chart widget -->
<div class="col-md-3">
    <div class="widget wblack">
        <!-- Widget title -->
        <div class="widget-head">
            <div class="pull-left"><span class="glyphicon glyphicon-stats"></span>&nbsp;Police</div>
            <div class="widget-icons pull-right">
                <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                <a href="#" class="wsettings"><i class="fa fa-wrench"></i></a>
                <a href="#" class="wclose"><i class="fa fa-times"></i></a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="widget-content">
            <!-- Widget content -->
            <div class="padd">
                <div class="stat_block">
                    <h4 style="text-align:center"><span id="police_problems"></span> Police Alerts</h4>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Criminal
                            </td>
                            <td>
                                <span id="police_criminal_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="bar" id="police_criminal_stat">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Accident
                            </td>
                            <td>
                                <span id="police_accident_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Alarm
                            </td>
                            <td>
                                <span id="police_alarm_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Unknown
                            </td>
                            <td>
                                <span id="police_unknown_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>

<!-- Utility Chart widget -->
<div class="col-md-3">
    <div class="widget wblack">
        <!-- Widget title -->
        <div class="widget-head">
            <div class="pull-left"><span class="glyphicon glyphicon-stats"></span>&nbsp;Utility</div>
            <div class="widget-icons pull-right">
                <a href="#" class="wminimize"><i class="fa fa-chevron-up"></i></a>
                <a href="#" class="wsettings"><i class="fa fa-wrench"></i></a>
                <a href="#" class="wclose"><i class="fa fa-times"></i></a>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="widget-content">
            <!-- Widget content -->
            <div class="padd">
                <div class="stat_block">
                    <h4 style="text-align:center"><span id="utility_problems"></span> Utility Alerts</h4>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Electric
                            </td>
                            <td>
                                <span id="utility_electric_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="bar" id="utility_electric_stat">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Water
                            </td>
                            <td>
                                <span id="utility_water_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gas
                            </td>
                            <td>
                                <span id="utility_gas_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Data
                            </td>
                            <td>
                                <span id="utility_data_amount"></span>
                            </td>
                            <td class="min_chart">
                                <span class="line">20,30,50,200,250,280,350</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>




</div>




</div><!-- /.container -->

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<!-- Latest compiled and minified JavaScript -->
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/jquery.jqplot.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.dateAxisRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/qplot.cursor.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.logAxisRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.canvasTextRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.highlighter.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.pieRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.barRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.categoryAxisRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.pointLabels.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.meterGaugeRenderer.min.js"></script>
<script src="//cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.pointLabels.min.js"></script>
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyBxsyOG0KqoenUpgsPfRo7xrCPbmbhDA1o&sensor=false"></script>

<script src="<c:url value="/static/js/jquery.ui.map.full.min.js"/>"></script>
<script src="<c:url value="/static/js/epoly.js"/>"></script>
<script src="<c:url value="/static/js/jquery.peity.min.js"/>"></script>

<script src="<c:url value="/static/js/app.js"/>"></script>
</body>
</html>




