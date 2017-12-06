import $ from 'jquery';
import _ from 'lodash';
import {DateTime} from 'luxon';
import config from '../config';
import icons from '../icons';
import mapStyles from '../mapStyles';

$(document).ready(function(){

	var ct = DateTime.local();
	var infoWindow;
	var map;
	var cp;
	var food;

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
			$('.search').on('click', function(){
				$('.right').toggleClass('hidden');
			});
			$('.snack').on('click', function(){
				$('.right').toggleClass('hidden');
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

	    	// create map instance
	        map = new google.maps.Map(
	        	document.getElementById('map'), {
	        	center: cp,
	        	zoom: 16,
	        	disableDefaultUI: true,
	        	zoomControl: true,
	        	styles: mapStyles
		    });

		    var here = new google.maps.Marker({
		    	map: map,
		    	position: cp
		    });

		},
		formatPlacesRequest: function(){
			food = $(this).attr('value');
			// food = _.find('-')_.replace(' ');

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
			console.log('places requested');
			console.log(results)
	        if (status === google.maps.places.PlacesServiceStatus.OK) {
	            for (var i = 0; i < results.length; i++) {
	          		var place = results[i];
	            	App.createMarker(place);
	            }
	        }
	    },
	   	createMarker: function(place) {
	        var placeLoc = place.geometry.location;
	        var foodIcon = '/img/' + food + '-mini.png';
	        console.log('place location' + placeLoc);
	        var marker = new google.maps.Marker({
	            map: map,
	            position: placeLoc,
	            size: 10,
	            icon: foodIcon
	        });
	        console.log('marker: ' + marker.position);

	        google.maps.event.addListener(marker, 'click', function() {
	            infoWindow.setContent(place.name);
	            infoWindow.open(map, this);
	        });
	    },
	    setView: function(viewType) {
			var $popup = $('#popUp');
			var $closePopUp = $('.closePopUp');
			if (viewType === 'loader') {
				$popup.removeClass('hidden');
				$closePopUp.addClass('hidden');
				$popup.addClass('loader');
			}
			else if (viewType === 'map') {
				$popup.removeClass('hidden');
				$closePopUp.removeClass('hidden');
				$popup.removeClass('loader');
			}
			else if (viewType === 'search') {
				$popup.addClass('hidden');
				$closePopUp.addClass('hidden');
			}
	    }
	};

  	App.init();
});