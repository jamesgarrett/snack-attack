import $ from 'jquery';
import _ from 'lodash';
import {DateTime} from 'luxon';
import config from '../config';

$(document).ready(function(){

	var ct = DateTime.local();
	var infoWindow;
	var map;

	// App object to store all app relates methods
	var App = {
		init: function() {
		  App.setDate();
		  App.setTime();
		  App.bindEvents();
		},
		bindEvents: function() {
		  	$(".get-location-button").on("click", App.getLocation);
		},
		getTime: function(ct){
			var time = ct.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
			return time;
		},
		getDate: function(ct){
			var date = ct.toLocaleString(DateTime.DATE_HUGE);
			return date;
		},
		setTime: function(){
			$('#time').text(App.getTime(ct));
		},
		setDate: function(){
			$('#date').text(App.getDate(ct));
		},
		getLocation: function(){
			console.log('click');
	    	navigator.geolocation.getCurrentPosition(function(position) {
	            var coords = {
	            	lat : position.coords.latitude,
	            	lng : position.coords.longitude
	            };
	            // debugger;
                App.requestMap(coords);
	        });
	    },
	    requestMap: function(coords){
	    	// current position
	    	var cp = coords;

	    	// create map instance
	        var map = new google.maps.Map(
	        	document.getElementById('map'), {
	        	center: cp,
	        	zoom: 15
		    });

		    var here = new google.maps.Marker({
		    	map: map,
		    	position: cp
		    });

	        // create infowindow for places
		    infoWindow = new google.maps.InfoWindow();
	        var service = new google.maps.places.PlacesService(map);

	        // search for restaurants within radius of current position, make places request
	        service.nearbySearch({
	          location: cp,
	          radius: 500,
	          type: ['pizza']
	        }, App.requestPlaces);
		},
		requestPlaces: function(results, status) {
	        if (status === google.maps.places.PlacesServiceStatus.OK) {
	          for (var i = 0; i < results.length; i++) {
	          	var place = results[i];
	          	console.log(place);
	            App.createMarker(place);
	          }
	        }
	    },
	   	createMarker: function(place) {
	   		// debugger;
	        var placeLoc = place.geometry.location;
	        var marker = new google.maps.Marker({
	          map: map,
	          position: place.geometry.location
	        });

	        google.maps.event.addListener(marker, 'click', function() {
	          infoWindow.setContent(place.name);
	          infoWindow.open(map, this);
	        });
	    }
	};

  	App.init();
});