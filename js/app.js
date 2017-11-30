import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';

$(document).ready(function(){

	// App object to store all app relates metods
	var App = {
		init: function() {
		  // Methods that need to be called on initialization
		  App.setDate();
  		  App.bindEvents();
		},
		bindEvents: function() {
		  $(".get-location-button").on("click", App.getLocation);
		},
		getDate: function(){
			var now = new Date();
			return moment(now).format('MMMM Do YYYY, h:mm:ss a');
		},
		setDate: function(){
			$('#date').text(App.getDate());
		},
		getLocation: function(){
	    	navigator.geolocation.getCurrentPosition(function(position) {
	            const latitude = position.coords.latitude;
	            const longitude = position.coords.longitude;

	            console.log(latitude + ' ' + longitude);
	        });
	    },
		setView: function(viewType) {
		}
	};

  App.init();
});