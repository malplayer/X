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
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Home Depot Calculator POC - Concrete</a>
        </div>

    </div>
</div>

<div class="container">


    <div class="row">

        <!-- Navigation Buttons -->
        <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked" id="myTabs">
                <li class="active"><a href="#concreteMix">Concrete Mix</a></li>
                <li><a href="#mortarmix">Mortar Mix</a></li>
                <li><a href="#fastsettingconcretemix">Fast-Setting Concrete Mix</a></li>
            </ul>
        </div>

        <!-- Content -->
        <div class="col-md-9">
            <div class="tab-content">

                <div class="tab-pane active" id="concreteMix">

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Concrete Mix</h3>
                        </div>
                        <div class="panel-body">

                            <div class="row">
                                <p>Enter the size of the slab you want to build in square feet. The calculator will indicate the number of 60 or 80 pound bags of QUIKRETE® Concrete Mix you need to build a 4" or a 6" slab. (All yields are approximate and do not include allowance for uneven subgrade, waste, etc.)</p>
                            </div>
                            <div class="row">


                                <div class="col-md-8">
                                    <div class="input-group margin-bottom-sm">
                                        <span class="input-group-addon"><i class="fa fa-tachometer fa-fw"></i></span>
                                        <input id="concrete_sqft" class="form-control" type="text" placeholder="Enter Number of Square Feet Desired">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button id="concrete_calBtn" type="button" class="btn btn-primary">Calculate Total</button>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-4"><strong>For a 4" Slab:</strong></div>
                                <div class="col-md-4">Number of 60# Bags:  <input id="concrete_noof60for4" class="form-control" type="text" readonly></div>
                                <div class="col-md-4">Number of 80# Bags:  <input id="concrete_noof80for4" class="form-control" type="text" readonly></div>
                            </div>

                            <div class="row">
                                <div class="col-md-4"><strong>For a 6" Slab:</strong></div>
                                <div class="col-md-4">Number of 60# Bags:  <input id="concrete_noof60for6" class="form-control" type="text" readonly></div>
                                <div class="col-md-4">Number of 80# Bags:  <input id="concrete_noof80for6" class="form-control" type="text" readonly></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" id="mortarmix">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Mortar Mix</h3>
                        </div>
                        <div class="panel-body">

                            <div class="row">
                                <p>Enter the number of 8" x 2" x 4" bricks or 8" x 8" x 16" blocks you plan to use for your project. The calculator will indicate the number of 60 or 80 pound bags of QUIKRETE® Mortar Mix you need to construct your project with a 3/8" mortar joint. (All yields are approximate and do not include allowance for uneven subgrade, waste, etc.)</p>
                            </div>

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="input-group margin-bottom-sm">
                                        <span class="input-group-addon"><i class="fa fa-tachometer fa-fw"></i></span>
                                        <input id="mortar_bricks" class="form-control" type="text" placeholder="Enter Number of Bricks or Blocks Desired">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button id="mortar_calBtn" type="button" class="btn btn-primary">Calculate Total</button>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-4"><strong>For 8"x2"x4" Bricks:</strong></div>
                                <div class="col-md-4">Number of 60# Bags:  <input id="mortar_noof60for824" class="form-control" type="text" readonly></div>
                                <div class="col-md-4">Number of 80# Bags:  <input id="mortar_noof80for824" class="form-control" type="text" readonly></div>
                            </div>

                            <div class="row">
                                <div class="col-md-4"><strong>For 8"x8"x16" Blocks:</strong></div>
                                <div class="col-md-4">Number of 60# Bags:  <input id="mortar_noof60for8816" class="form-control" type="text" readonly></div>
                                <div class="col-md-4">Number of 80# Bags:  <input id="mortar_noof80for8816" class="form-control" type="text" readonly></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" id="fastsettingconcretemix">

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Fast-Setting Concrete Mix</h3>
                        </div>
                        <div class="panel-body">

                            <div class="row">
                                <p>Enter the approximate depth of the post hole you want to dig in inches. Remember, the depth of the post hole should be one-half of the above-ground post height. (Example: For a 6' above ground post, use a post with an overall height of 9 feet and place 3 feet in the ground). The calculator will indicate the number of 50 lb. bags of QUIKRETE® Fast-Setting Concrete you need.</p>
                            </div>

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="input-group margin-bottom-sm">
                                        <span class="input-group-addon"><i class="fa fa-tachometer fa-fw"></i></span>
                                        <input id="fastconcrete_inches" class="form-control" type="text" placeholder="Enter Hole Depth in inches">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button id="fastconcrete_calBtn" type="button" class="btn btn-primary">Calculate Total</button>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col-md-4">For 2" post diameter / 6" hole diameter:  <input id="fastconcrete_noof50for2in" class="form-control" type="text" readonly></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">For 3" post diameter / 9" hole diameter:  <input id="fastconcrete_noof50for3in" class="form-control" type="text" readonly></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">For 4" post diameter / 12" hole diameter:  <input id="fastconcrete_noof50for4in" class="form-control" type="text" readonly></div>
                            </div>
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



<script type="text/javascript">


    var calculateConcreteMix= function()
    {

        var val = parseInt($("#concrete_sqft").val());

        if (!_.isNumber(val) || _.isNaN(val) ) {
            alert("You must enter a number!");
        }
        else
        {
            $("#concrete_noof60for4").empty().val(Math.floor((74/100 * val)+1));
            $("#concrete_noof80for4").empty().val(Math.floor((56/100 * val)+1));
            $("#concrete_noof60for6").empty().val(Math.floor((111/100 * val)+1));
            $("#concrete_noof80for6").empty().val(Math.floor((83/100 * val)+1));

        }

    }

    var calculateMortarMix= function()
    {

        var val = parseInt($("#mortar_bricks").val());

        if (!_.isNumber(val) || _.isNaN(val) ) {
            alert("You must enter a number!");
        }
        else
        {
            $("#mortar_noof60for824").empty().val(Math.floor((val/28)+1));
            $("#mortar_noof80for824").empty().val(Math.floor((val/37)+1));
            $("#mortar_noof60for8816").empty().val(Math.floor((val/9)+1));
            $("#mortar_noof80for8816").empty().val(Math.floor((val/12)+1));
        }

    }

    var calculateFastConcreteMix= function()
    {

        var val = parseInt($("#fastconcrete_inches").val());

        if (!_.isNumber(val) || _.isNaN(val) ) {
            alert("You must enter a number!");
        }
        else
        {
            $("#fastconcrete_noof50for2in").empty().val(Math.floor((.0145 * (val-4))/.375+1));
            $("#fastconcrete_noof50for3in").empty().val(Math.floor((.032725 * (val-4))/.375+1));
            $("#fastconcrete_noof50for4in").empty().val(Math.floor((.05817777777778 * (val-4))/.375+1));
        }

    }



    $(function() {

        $('#myTabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        $("#concrete_calBtn").click(function(e){
            calculateConcreteMix();
        });

        $("#mortar_calBtn").click(function(e){
            calculateMortarMix();
        });

        $("#fastconcrete_calBtn").click(function(e){
            calculateFastConcreteMix();
        });
    });
</script>
</body>
</html>




