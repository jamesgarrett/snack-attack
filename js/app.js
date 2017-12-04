import $ from 'jquery';
import _ from 'lodash';
import {DateTime} from 'luxon';
import config from '../config';

$(document).ready(function(){

	var ct = DateTime.local();
	var infoWindow;
	var map;
	var cp;

	// App object to store all app relates methods
	var App = {
		init: function() {
		  App.setDate();
		  App.setTime();
		  App.bindEvents();
		  App.getLocation();
		},
		bindEvents: function() {
		  	$('.snack').on('click', App.formatPlacesRequest);
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
	    	cp = coords;

	    	// create map instance
	        map = new google.maps.Map(
	        	document.getElementById('map'), {
	        	center: cp,
	        	zoom: 16,
		    });

		    var here = new google.maps.Marker({
		    	map: map,
		    	position: cp
		    });
		},
		formatPlacesRequest: function(){
			var food = $(this).attr('value');

	        // create infowindow for places
		    infoWindow = new google.maps.InfoWindow();
	        var service = new google.maps.places.PlacesService(map);

	        var request = {
	          location: cp,
	          radius: 500,
	          query: food
		    };

	        // search for restaurants within radius of current position, make places request
	        service.nearbySearch(request, App.requestPlaces);
		},
		requestPlaces: function(results, status) {
			console.log('places requested');
	        if (status === google.maps.places.PlacesServiceStatus.OK) {
	          for (var i = 0; i < results.length; i++) {
	          	var place = results[i];
  		   		// debugger;
	            App.createMarker(place);
	          }
	        }
	    },
	   	createMarker: function(place) {
	        var placeLoc = place.geometry.location;
	        console.log('place location' + placeLoc);
	        var marker = new google.maps.Marker({
	          map: map,
	          position: placeLoc,
	          title: 'hello world'
	        });
	        console.log('marker: ' + marker.position);

	        google.maps.event.addListener(marker, 'click', function() {
	          infoWindow.setContent(place.name);
	          infoWindow.open(map, this);
	        });
	    }
	};

  	App.init();
});