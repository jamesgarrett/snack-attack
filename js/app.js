import $ from 'jquery';
import _ from 'lodash';
import config from '../config';
import icons from '../icons';
import mapStyles from '../mapStyles';

$(document).ready(function(){

	var infoWindow;
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
	        	var foodIcon = `/img/${food}.png`;
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