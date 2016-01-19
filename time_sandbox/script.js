// UPTIME CLOCK
//--------------------------------------------------------------------------//

	setInterval(function() {
		Uptime = getUptime();
		uptimeStr = Uptime.days+'d:'+Uptime.hours+'h:'+Uptime.mins+'m:'+Uptime.secs+'s';
		// console.log(uptimeStr);
		$('#uptime-count').html(uptimeStr);

	}, 1000);

	function getUptime() {
		time1 = new Date(2015, 0, 0, 24, 0, 0);
		time1ms= time1.getTime(time1); //i get the time in ms  
		time2 = new Date();
		time2ms= time2.getTime(time2);
		// alert('time1:'+time1+ ' | time2:'+time2);

		difference= time2ms-time1ms;
		// alert('difference:' +difference);

		lapse=new Date(difference);
		// alert('lapse:'+lapse);

		var Uptime = {'days':000, 'hours':00, 'mins':00, 'secs':00};

		Uptime.days=daysBetween(time1, time2);
		Uptime.hours=lapse.getHours();
		Uptime.mins=lapse.getMinutes();
		Uptime.secs=lapse.getSeconds();
		// console.log(Uptime);

		function daysBetween(first, second) {
		    // Copy date parts of the timestamps, discarding the time parts.
		    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
		    var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

		    // Do the math.
		    var millisecondsPerDay = 1000 * 60 * 60 * 24;
		    var millisBetween = two.getTime() - one.getTime();
		    var days = millisBetween / millisecondsPerDay;

		    // Round down.
		    return Math.floor(days);
		}
		return Uptime;
	}