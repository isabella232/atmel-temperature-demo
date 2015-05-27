# Xplained Pro: Realtime Temperature Sensor Display Demo


This demo showcases a data visualization using the actual data sent from Atmel's Xplained Pro.

The Atmel temperature sensor monitors temperatures and streams the data to this live-updating dashboard in realtime. The temperature sensor measures the ambient temperature connect to the WiFi using ATWINC1500 module, and publishes it as a data stream to a channel via the PubNub Data Stream Network. This is made possible with the PubNub SDK running on the D21 MCU chip.

Then this web-based visual display subscribes to this channel to visualize the data stream.

## Turorial

[Atmel Xplained Pro: Realtime Temperature Sensor](http://www.pubnub.com/blog/atmel-xplained-pro-real-time-temperature-sensor/) by Bhavana Srinivas

![concept](http://www.pubnub.com/blog/wp-content/uploads/2015/05/demofunctionality.png "The concept")

## Running this Demo

This demo is optimized only for Chrome browser on a large display screen.

[Try it on your browser][demo]

This demo required a physical device running.
Also, the UI is optimized for large display (2560 x 1440) for tradeshow demo.

If you see a blank graph with purple background, the hardware is not running properly.

 
![Screenshot](http://www.pubnub.com/blog/wp-content/uploads/2015/05/xplained_pro_demo_gif.gif "Screenshot")


[demo]: http://pubnub.github.io/atmel-temperature-demo
