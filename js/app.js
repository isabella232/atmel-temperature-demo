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

	var channel = 'Atmel_Pubnub';

	var bkgd = document.querySelector('.background');
	var temp = document.querySelector('[data-temp]');
	var hg = document.querySelector('[data-temp-ui]');
	var warningText = document.querySelector('.warning');

	var firstRun = true;
	var initTemp = 50;

	var prevTemp = 50;

	function displayTemperature(t) {
		if(!t) return;
		if(t === prevTemp) return;

		// Temperature display in text

		temp.textContent = t;

		// Temperature display as thermometer

		if(temp.classList.contains('alert')) {
			temp.classList.remove('alert');
		}

		var h = (t < 0) ? 0 : t;
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
				warningText.textContent ='Temeperature is rising higher than the plant\'s optimum temperature!';
			}
		} else if(t < prevTemp) { // Temp dripping
			if(t == 75 || t == 65 || t == 60 || t == 55 || t == 50) { 
				temp.classList.add('alert');
				warningText.textContent = 'Temeperature is dropping lower than the plant\'s optimum temperature!';
			}
		}
		

		prevTemp = t;		
	}

	function plotGraph(pubnub) {
		// Eon
		eon.chart({
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
						// },
						max: initTemp + 20,
						min: initTemp - 10,
					},
					x : {
						//type : 'timeseries',
						localtime: true,
						tick: {
						 	format: '%H:%M:%S',
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
				if(firstRun) { 
					initTemp = m.columns[0][1];
					firstRun = false;
				}
				displayTemperature(m.columns[0][1]);
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