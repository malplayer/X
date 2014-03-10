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
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyBxsyOG0KqoenUpgsPfRo7xrCPbmbhDA1o&sensor=false"></script>

<script src="<c:url value="/static/js/jquery.ui.map.full.min.js"/>"></script>
<script src="<c:url value="/static/js/epoly.js"/>"></script>

<script src="<c:url value="/static/js/app.js"/>"></script>
</body>
</html>




