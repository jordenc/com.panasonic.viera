var address = '';
var devices = [];
var tempIP = '';

/*
var PanasonicViera = require('./panasonicviera');

var tv = new PanasonicViera('<ip_address>');

tv.send(PanasonicViera.POWER_TOGGLE);

tv.setVolume(20);
*/


module.exports.settings = function( device_data, newSettingsObj, oldSettingsObj, changedKeysArr, callback ) {

    Homey.log ('Changed settings: ' + JSON.stringify(device_data) + ' / ' + JSON.stringify(newSettingsObj) + ' / old = ' + JSON.stringify(oldSettingsObj));
    
    try {
	    changedKeysArr.forEach(function (key) {
		    devices[device_data.id].settings[key] = newSettingsObj[key];
		});
		
		callback(null, true);
		
    } catch (error) {
	    
      callback(error);
      
    }

};

module.exports.init = function(devices_data, callback) {
	
	devices_data.forEach(function initdevice(device) {
	    
	    Homey.log('add device: ' + JSON.stringify(device));
	    devices[device.id] = device;
	    
	    module.exports.getSettings(device, function(err, settings){
		    
		    devices[device.id].settings = settings;
		    
		});
		
	});
	
	Homey.log('Driver Init done');
	callback (null, true);
	
};

module.exports.deleted = function( device_data ) {
    
    Homey.log('deleted: ' + JSON.stringify(device_data));
    
    devices[device_data.id] = [];
	
};

module.exports.pair = function (socket) {
	// socket is a direct channel to the front-end

	// this method is run when Homey.emit('list_devices') is run on the front-end
	// which happens when you use the template `list_devices`
	socket.on('list_devices', function (data, callback) {

		Homey.log("Panasonic Viera app - list_devices tempIP is " + tempIP);
		
		var devices = [{
			name				: tempIP,
			data: {
				id				: tempIP,
			},
			settings: {
				"ipaddress" 	: tempIP
			}
		}];

		callback (null, devices);

	});

	// this is called when the user presses save settings button in start.html
	socket.on('get_devices', function (data, callback) {

		// Set passed pair settings in variables
		tempIP = data.ipaddress;
		Homey.log ( "Panasonic Viera app - got get_devices from front-end, tempIP =" + tempIP );

		// assume IP is OK and continue
		socket.emit ('continue', null);

	});

	socket.on('disconnect', function(){
		Homey.log("Panasonic Viera app - User aborted pairing, or pairing is finished");
	})
}






function searchForCommandsByValue (value) {
	var possibleKeys = allpossibleKeys;
	var tempItems = [];
	for (var i = 0; i < possibleKeys.length; i++) {
		var tempInput = possibleKeys[i];
		if ( tempInput.friendlyName.toLowerCase().indexOf(value.toLowerCase()) >= 0 ) {
			tempItems.push({ icon: "", name: tempInput.friendlyName, inputName: tempInput.inputName });
		}
	}
	return tempItems;
}