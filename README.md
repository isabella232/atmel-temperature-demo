# Xplained Pro: Realtime Temperature Sensor Display Demo


This demo showcases a data visualization using the actual data sent from Atmel's Xplained Pro.

The Atmel temperature sensor monitors temperatures and streams the data to this live-updating dashboard in realtime. The temperature sensor measures the ambient temperature connect to the WiFi using ATWINC1500 module, and publishes it as a data stream to a channel via the PubNub Data Stream Network. This is made possible with the PubNub SDK running on the D21 MCU chip.

Then this web-based visual display subscribes to this channel to visualize the data stream.


## Running this Demo

This demo is optimized only for Chrome browser on a large display screen.

[Try it on your browser][demo]

This demo required a physical device running.
Also, the UI is optimized for large display (2560 x 1440) for tradeshow demo.

If you see a blank graph with purple background, the hardware is not running properly.

![Screenshot](http://www.pubnub.com/blog/wp-content/uploads/2015/05/xplained_pro_demo_gif.gif "Screenshot")

## Xplained Pro Turorial

[Atmel Xplained Pro: Realtime Temperature Sensor](http://www.pubnub.com/blog/atmel-xplained-pro-real-time-temperature-sensor/) by Bhavana Srinivas

![concept](http://www.pubnub.com/blog/wp-content/uploads/2015/05/demofunctionality.png "The concept")

## Subscribing Data from the Hardware

![photo](http://www.pubnub.com/blog/wp-content/uploads/2015/05/atmel1-1024x576.jpg "Xplained Pro")

To plat a graph, instead of just sending raw data from the sensor, the data is sent in JSON format like this:

```json
{"columns": [
    ["temperature", "55.00"]
  ]
}
```

Normally, you can subscribe messages using PubNub Subscribe API as following:

```javascript
pubnub.subscribe({
  channel: channel,
  callback: function(m) { 
    console.log(m.columns[0]);	
    // do something
  }
});
```

*However*, in this demo, you are not using the subscribe API, but instead, using **EON** Chart framework that lets you subscribe *and* generate a graph all together.

### Data Visualization with EON

[EON][eon] is an open-source data visualization library that built on top of C3.js, which is a D3.js wrapper, and helps you to generate realtime charts and graphs easily.

So instead of use subscribe API, use EON to plot a graph while subscribing:

```javascript
eon.chart({
  channel: 'Atmel_Pubnub,
  generate: {
    bindto: '#chart',
    data: {
      colors: {
          temperature: 'white'
      }
    },
    size: {
      height: 440
    },
    //... more config for data visualization
  },
  connect: function(m) {
   // callback function to call when the initial connection is established
  },
  message: function(m) {
   // callback function to call each time message is received
  }
});
```




[demo]: http://pubnub.github.io/atmel-temperature-demo
[eon]: http://www.pubnub.com/developers/eon/?source=atmel-temperature-demo&medium=github
