import $ from 'jquery';
import _ from 'lodash';
import {DateTime} from 'luxon';
import config from '../config';

$(document).ready(function(){

	const ct = DateTime.local();

	// App object to store all app relates metods
	var App = {
		init: function() {
		  App.setDate();
		  App.setTime();
		  App.bindEvents();
		},
		bindEvents: function() {
			console.log('click');
		  $(".get-location-button").bind("click", App.initMap);
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
	            	long : position.coords.longitude
	            };
	        });
	    },
	    initMap: function(){
	    	var position = App.getLocation();
	    	console.log(position);
	        var map = new google.maps.Map(
	        	document.getElementById('map'), {
	        	center: {lat: 45, lng: 45},
	        	zoom: 15
		    });
		}
	};

  	App.init();
});