	var refresh=1000; // Refresh rate in milli seconds
	mytime=setInterval('display_ct()',refresh);

	// get the current timestamp - format the clock readout

	function display_ct() {
	var strcount
	var x = new Date()
	var seconds = x.getSeconds();
	var minutes = x.getMinutes();
	var hours = x.getHours();
	var pm = false;
	var utc_adjust = -5;
	var utc_zone = -5;

	// check if the city is in our timezone, if not make the necessary adjustment

	if (utc_zone == -5){
	}else{
		utc_hours = (utc_zone - utc_adjust);
	}

	var adjusted_hours = (hours + utc_hours);
	
	// check if it is am, pm, or am of the next day

	if (adjusted_hours > 12) {
		new_hours = (adjusted_hours - 12); 
		pm = true;
		if (adjusted_hours > 24){
			new_hours = (adjusted_hours - 24);
			pm = false;
			console.log(new_hours);
		}else{}
	}
	else { 
		new_hours = adjusted_hours;
		pm = false;
	}


	// print formatted date

	formatted_time = new_hours+':'+('0'  + minutes).slice(-2)+':'+('0' + seconds).slice(-2);

	document.getElementById('date').innerHTML = formatted_date;

	if (adjusted_hours > 12 && adjusted_hours < 24){ 
			document.getElementById('time').innerHTML = formatted_time + '<span style="padding-left:15px;">PM</span>';}
		else{
			document.getElementById('time').innerHTML = formatted_time + '<span style="padding-left:15px;">AM</span>';
		}
	tt=display_c();
	}

	// refresh clock readout each second

	function display_c(){
	var refresh=1000; // Refresh rate in milli seconds
	mytime=setTimeout('display_ct()',refresh)
	}

	// build array for months of the year

	var m_names = new Array("January", "February", "March", 
	"April", "May", "June", "July", "August", "September", 
	"October", "November", "December");

	// format date readout

	var today = new Date();
	var hours = today.getHours();
	var curr_date = today.getDate();
	var curr_month = today.getMonth();
	var curr_year = today.getFullYear();

	// find out if we need to adjust date for utc

	var utc_adjust = -5;
	var utc_zone = -5;

	if (utc_zone == -5){
		console.log('usa! usa!');
		utc_hours = (utc_zone - utc_adjust);
	}else{
		utc_hours = (utc_zone - utc_adjust);
	}
	
	var adjusted_hours = (hours + utc_hours);

	// create adjustment date

	var tomorrow = new Date(today);
	var tomorrow_date = tomorrow.getDate() + 1;
	var tomorrow_month = tomorrow.getMonth();

	console.log(tomorrow_date);
	console.log(adjusted_hours);

	// print nicely formatted date

	if (adjusted_hours > 24){
		var formatted_date = (m_names[curr_month] + " " + tomorrow_date + "," + " " + curr_year);
	} else {
		var formatted_date = (m_names[tomorrow_month] + " " + curr_date + "," + " " + curr_year);
	}