# com.panasonic.viera
Control Panasonic Viera SmartTV with Homey

**Want to show your appreciation for this app? A donation is possible via http://www.d2c.nl **

App contains the following action cards:
- Send command (contains all keys you can send to the TV)
- Set volume

Conditions:
- TV is (not) muted

Make sure you have the IP address of your Viera TV available (tip: make the IP static in your router), as you will need that to add the TV to Homey. The app does not check for the correctness of the IP.

Sadly, most units do not support Power On via IP. VIERA Link (HDMI CEC) can be used for power if available. 
2012 VT50/GT50/WT50 and 2013 VT60/ZT60/WT60 support Wake on LAN for Full IP Control via Ethernet (US Models Only). You probably first have to turn it on via: Menu > Network > Wake on LAN.
Otherwise, all functions won't work until you turn on the TV using your remote.

Big thanks to https://github.com/THLabs/node-panasonic-viera

**Version 0.0.1:**
- First try