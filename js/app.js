/* 
 *  Atmel WINC-1500 x PubNub Demo
 *  Displaying the data sent by Atmel WINC-1500 temperature and ambient sensors
 *  https://github.com/pubnub/atmel-demo
 * 
 *  @girlie_mac
 *  License: MIT
 */

(function() {
	'use strict';

	var channel = (typeof channelName === 'undefined') ? 'Atmel_Pubnub' : channelName;

	var bkgd = document.querySelector('.background');
	var temp = document.querySelector('[data-temp]');
	var hg = document.querySelector('[data-temp-ui]');
	var warningText = document.querySelector('.warning');

	var firstRun = true;
	var initTemp = 0;

	var prevTemp = 0;
	var max = 80;

	function displayTemperature(currentTemp) { 
;		if(!currentTemp) return;
		if(currentTemp === prevTemp) return;

		var t = currentTemp >>> 0;

		// Temperature display in text

		temp.textContent = parseInt(currentTemp).toFixed(1);

		// Temperature display as thermometer

		if(temp.classList.contains('alert')) {
			temp.classList.remove('alert');
		}

		var h = (t < 8) ? 8 : t; // UI looks bad when under 8.
		h = (t <=100) ? t : 100;

		hg.style.width = h + '%';

		// Background toggle
		var newImg;
		
		if(t < 50) {
			newImg = 'chilly';
		} else if (t >= 50 && t < 55) { // Azaleas
			newImg = 'cool';
		} else if (t >= 55 && t < 60) { // Tulips
			newImg = 'moderate';
		} else if (t >= 60 && t < 65) { // Poinsettias
			newImg = 'comfy';
		} else if (t >= 65 && t < 75) { // Bird of paradise
			newImg = 'warm';
		} else { //cuctus
			newImg = 'hot'; 
		}

		bkgd.className = 'background ' + newImg;

		if(t > prevTemp) { // Temperature rising
			if(t == 49 || t == 54 || t == 59 || t == 64 || t == 69 || t == 74) { 
				temp.classList.add('alert');
				warningText.textContent ='Temperature is rising above the plant\'s optimum temperature!';
			} else {
				warningText.textContent = '';
			}
		} else if(t < prevTemp) { // Temp dripping
			if(t == 75 || t == 65 || t == 60 || t == 55 || t == 50) { 
				temp.classList.add('alert');
				warningText.textContent = 'Temperature is dropping below the plant\'s optimum temperature!';
			} else {
				warningText.textContent = '';
			}
		} 

		prevTemp = currentTemp;
	}

	function plotGraph(pubnub) {
		// Eon
		var chart = eon.chart({
			channel: channel,
			padding: {
				left: 100
			},
			flow: {
				duration: 10
			},
			limit: 20,
			generate: {
				bindto: '#chart',
				data: {
					//x: 'x',
					//labels: true,
					colors: {
						temperature: 'white'
					}
				},
				size: {
					height: 440
				},
				legend: {
					show: false
				},
				tooltip: {
					show: false
				},
				point: {
					show: false
				},
				axis : {
					y: {
						// tick: {
						// 	format: function (d) { return d + '°'; }
						// 	}
						// show: false,
						// label: {
						// 	text: 'Temperature [F°]',
						// 	position: 'outer-top'
						// }
					},
					x : {
						//type : 'timeseries',
						//localtime: true,
						tick: {
						 	//format: '%H:%M:%S',
							culling: {
								max: 20
							}
						},
						//show: false
					}
				}
			},
			connect: function(m) {
				console.log('eon connected to: '+ m);
			},
			message: function(m) {
				var currentTemp = m.columns[0][1];

				if(firstRun) { 
					max = parseInt(currentTemp) + 20; 
					chart.axis.max({y: max});
					chart.axis.min({y: max - 35});
					firstRun = false;
				}

				if(currentTemp > max) { 
					chart.axis.max({y: parseInt(currentTemp) + 5});
				}
				displayTemperature(currentTemp);
			},
			pubnub: pubnub
		});
		
	}

	function connect() {
		var pubnub = PUBNUB.init({
			subscribe_key: 'sub-c-2a73818c-d2d3-11e3-9244-02ee2ddab7fe',
			publish_key:   'pub-c-6dbe7bfd-6408-430a-add4-85cdfe856b47',
			//uuid: uuid
		});

		// pubnub.subscribe({
		// 	channel: channel,
		// 	callback: function(m) { 
		// 		//console.log(m.columns[0]);
				
		// 		plotGraph(pubnub, m);
		// 	}
		// });

		plotGraph(pubnub);		
		
	}

	connect();

})();