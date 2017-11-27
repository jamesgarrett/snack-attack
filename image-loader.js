	function jsonFlickrApi (response) {
	  console.log(
	     "Got response from Flickr-API with the following photos: %o", 
	     response.photos
	     
	  );	
		  	//console.log(response.photos.photo.length);

  	  		for (i = 1; i < 501; ++i) {

		    		console.log(response.photos.photo[i]);

		    		var item = response.photos.photo[i];

			    	//build the url of the photo in order to link to it
				    var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg'

	   			    //turn the photo id into a variable
				    var photoID = item.id;
	 			
						//create an imgCont string variable which will hold all the link location, title, author link, and author name into a text string
	                    var imgCont = '<div class="image-bg hiding colorify" id="' + i + '"style="width:100%;height:100%;background-size:cover;background-repeat:no-repeat;background-position:center;background-image: url(' + photoURL + ');">'+'</div>';
	                    
	                    //append the 'imgCont' variable to the document
		                $(imgCont).appendTo('#image-container');

					console.log(i);

			}

	}

	//assign your api key equal to a variable
	var apiKey = 'b30dc72750a3f089c77c61f800289a1e';
	//specify tags
	var tags ='new%20york%20city';
	//specify number of results
	var per_page = '500';

	url = 'https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key='+ apiKey +'&tags='+ tags +'&format=json&sort=random&per_page='+ per_page +';jsoncallback=?';
	
	$(function(){
				
		//the initial json request to flickr
		console.log(url);
		$.getJSON(url, function(response){
			            
        });
    });


	function makeVisible(){
		var rando = Math.floor((Math.random() * 501) + 1);
		//console.log(rando);
		var element1 = document.getElementById(rando);
		element1.classList.toggle('visible');
		//console.log(element1);
		setTimeout(function(){element1.classList.toggle('visible');},4000);
	}

	 var refresh=6000; // Refresh rate in milli seconds
	 mytime=setInterval('makeVisible()',refresh);

	 $(document).ready(function(){
	 	makeVisible();
	 });