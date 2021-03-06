# com.panasonic.viera
Control Panasonic Viera SmartTV with Homey

**Want to show your appreciation for this app? A donation is possible via http://www.d2c.nl **

When you add your TV, please make sure the TV is on and has been for at least a minute (otherwise the built in webserver might not be detectable).

App contains the following action cards:
- Send command (contains all keys you can send to the TV)
- Set volume

Conditions:
- TV is (not) muted
- TV is (not) on

Sadly, most units do not support Power On via IP. VIERA Link (HDMI CEC) can be used for power if available. 
2012 VT50/GT50/WT50 and 2013 VT60/ZT60/WT60 support Wake on LAN for Full IP Control via Ethernet (US Models Only). You probably first have to turn it on via: Menu > Network > Wake on LAN.
Otherwise, all functions won't work until you turn on the TV using your remote.

Big thanks to https://github.com/THLabs/node-panasonic-viera

**Version 0.3.4:**
- Added a "Send command (Manual)" action card to enable dragging tokens into it
- Added devices to "TV" class to enable easier automatic speech integration

**Version 0.3.2:**
- Fixed small bug causing app not to run on homey firmware 0.9.1

**Version 0.3.1:**
- Automatic discovery is now optional

**Version 0.3.0:**
- Added 'TV is on' condition card
- Fixed bug on pairing timeout

**Version 0.2.0:**
- Added discovery of device

**Version 0.1.0:**
- First version