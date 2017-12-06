import $ from 'jquery';
import _ from 'lodash';
import config from '../config';
import icons from '../icons';
import {DateTime} from 'luxon';
import dayStyles from '../mapStyles';
import nightStyles from '../mapStyles';

$(document).ready(function(){

	var ct = DateTime.local();
	var infoWindow;
	var infoWindow2;
	var map;
	var cp;
	var food;
	var custom = false;

	// App object to store all app relates methods
	var App = {
		init: function() {
		  App.bindEvents();
		  App.getLocation();
		},
		bindEvents: function() {
		  	$('.snack').on('click', function(){
				food = $(this).attr('value');
				custom = false;
		  		App.formatPlacesRequest(food);
		  	});
		  	$('.custom-search').keypress(function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13'){
					food = $('.custom-search').val();
					custom = true;
					App.formatPlacesRequest(food, custom);
				}
			});
		  	$('.cp').on('click', App.getLocation);
			$('.search').on('click', function(){
				$('#popUp').toggleClass('hidden');
			});
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

	    	if (ct.hour > 6 && ct.hour < 18){
		    	// create map instance with day styles
		        map = new google.maps.Map(
		        	document.getElementById('map'), {
		        	center: cp,
		        	zoom: 16,
		        	disableDefaultUI: true,
		        	zoomControl: true,
		        	styles: dayStyles.dayStyles
			    });

	    	} else {
	    		// create map instance with night styles
		        map = new google.maps.Map(
		        	document.getElementById('map'), {
		        	center: cp,
		        	zoom: 16,
		        	disableDefaultUI: true,
		        	zoomControl: true,
		        	styles: nightStyles.nightStyles
			    });
	    	}

		    var eater = '/img/eater.svg';

		    var here = new google.maps.Marker({
		    	map: map,
		    	position: cp,
		    	size: 10,
		    	icon: eater
		    });

		    infoWindow2 = new google.maps.InfoWindow();
		    var contentString = 'You are here.';

	        google.maps.event.addListener(here, 'click', function() {
	            infoWindow2.setContent(contentString);
	            infoWindow2.open(map, this);
	        });

		},
		formatPlacesRequest: function(food){
			console.log(food);

	        // create infowindow for places
		    infoWindow = new google.maps.InfoWindow();
	        var service = new google.maps.places.PlacesService(map);

	        var request = {
	            location: cp,
	            radius: 500,
	            keyword: food
		    };

	        // search for restaurants within radius of current position, make places request
	        service.nearbySearch(request, App.requestPlaces);
		},
		requestPlaces: function(results, status) {
	        if (status === google.maps.places.PlacesServiceStatus.OK) {
	            for (var i = 0; i < results.length; i++) {
	          		var place = results[i];
	            	App.createMarker(place);
	            }
	        }
	        // console.log(results);
	        $('#popUp').toggleClass('hidden');
	    },
	   	createMarker: function(place) {
	        var placeLoc = place.geometry.location;
	        
	        if (custom === true) {
	        	var foodIcon = '/img/pin-2.png';
	        } else {
	        	var foodIcon = `/img/${food}.svg`;
	        }

	        var marker = new google.maps.Marker({
	            map: map,
	            position: placeLoc,
	            size: 10,
	            icon: foodIcon
	        });

	        var contentString = `<h6>${place.name}</h6><p>${place.vicinity}</p>`;

	        google.maps.event.addListener(marker, 'click', function() {
	            infoWindow.setContent(contentString);
	            infoWindow.open(map, this);
	        });
	    }
	};

  	App.init();
});