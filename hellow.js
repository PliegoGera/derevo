/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
 var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
 var config = {
 	host: window.location.hostname,
 	prefix: prefix,
 	port: window.location.port,
 	isSecure: window.location.protocol === "https:"
 };
 require.config( {
 	
 	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
 } );

 require( ["js/qlik"], function ( qlik ) {
 	var app;
 	qlik.setOnError( function ( error ) {
 		$( '#popupText' ).append( error.message + "<br>" );
 		$( '#popup' ).fadeIn( 1000 );
 	} );
 	$( "#closePopup" ).click( function () {
 		$( '#popup' ).hide();
 	} );


 	function getApp() {
 		//optener la app de qlik
 		return qlik.openApp('Consumer Sales.qvf', config);	
 	}

 	var sampleApp = angular.module ("sampleApp",['ngRoute']);

 	sampleApp.config( function ($routeProvider){
 		$routeProvider
 		.when('/dos',{
 			controller:'Dos',
 			templateUrl:'views/dos.html'
 		})
 		.when('/tres',{
 			controller : 'Tres',
 			templateUrl: 'views/tres.html'
 		})
 		.otherwise({
 			controller : 'Main',
 			templateUrl: 'views/main.html'
 		});
 	});

 	sampleApp.controller( "Main", ['$scope', function ( $scope ) {
 		if ( !app ) {
 			app = getApp();
 		}
 		app.getObject('QV01','CLfuxL');
 		app.getObject('QV02','CLfuxL');

 	}] );

 	sampleApp.controller('Dos', ['$scope', function($scope){
 		if ( !app) {
 			app =  getApp();
 		}

 		app.getObject('QV03','fNGRa');
 		app.getObject('QV04','fNGRa');
 		app.getObject('QV05','fNGRa');
 		app.getObject('QV06','JaYmku');
 		var dato = app.getObject('QV06','JaYmku');
 		console.log("dato", dato);
 		 


 	}]);


 	sampleApp.controller('Tres', ['$scope', function($scope){
 		if (!app) {
 			app = getApp();
 		}

 		app.getObject('QV07','PyQXKt');
 		app.getObject('QV08','KnASd');

 	}]);

 	sampleApp.controller('fecha', ['$scope', function($scope){
 		$scope.CurrentDate = new Date();
 	}]);




 	angular.bootstrap( document, ["sampleApp", "qlik-angular"] );
 	qlik.setOnError( function ( error ) {
 		$( "#errmsg" ).html( error.message ).parent().show();
 	} );

 } );
