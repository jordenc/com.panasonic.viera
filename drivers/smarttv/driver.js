var address = '';
var devices = [];
var tempIP = '';

var tv = [];

var PanasonicViera = require('panasonicviera');
	
var allpossibleKeys = [
	
	{	Name: 'POWER',
		friendlyName: 'Power off'
	},
	{	Name: 'CH_DOWN',
		friendlyName: 'Channel down'
	},
	{	Name: 'CH_UP',
		friendlyName: 'Channel up'
	},
	{	Name: 'VOLUP',
		friendlyName: 'Volume up'
	},
	{	Name: 'VOLDOWN',
		friendlyName: 'Volume down'
	},
	{	Name: 'MUTE',
		friendlyName: '(Un)Mute'
	},
	{	Name: 'TV',
		friendlyName: 'TV'
	},
	{	Name: 'INTERNET',
		friendlyName: 'Internet'
	},
	{	Name: 'CHG_INPUT',
		friendlyName: 'Change input'
	},
	{	Name: 'SD_CARD',
		friendlyName: 'SD Card'
	},
	{	Name: 'D1',
		friendlyName: 'Number 1'
	},
	{	Name: 'D2',
		friendlyName: 'Number 2'
	},
	{	Name: 'D3',
		friendlyName: 'Number 3'
	},
	{	Name: 'D4',
		friendlyName: 'Number 4'
	},
	{	Name: 'D5',
		friendlyName: 'Number 5'
	},
	{	Name: 'D6',
		friendlyName: 'Number 6'
	},
	{	Name: 'D7',
		friendlyName: 'Number 7'
	},
	{	Name: 'D8',
		friendlyName: 'Number 8'
	},
	{	Name: 'D9',
		friendlyName: 'Number 9'
	},
	{	Name: 'D0',
		friendlyName: 'Number 0'
	},
	{	Name: 'MENU',
		friendlyName: 'Menu'
	},
	{	Name: 'SUBMENU',
		friendlyName: 'Submenu'
	},
	{	Name: 'RETURN',
		friendlyName: 'Return'
	},
	{	Name: 'ENTER',
		friendlyName: 'Enter'
	},
	{	Name: 'RIGHT',
		friendlyName: 'Right'
	},
	{	Name: 'LEFT',
		friendlyName: 'Left'
	},
	{	Name: 'UP',
		friendlyName: 'Up'
	},
	{	Name: 'DOWN',
		friendlyName: 'Down'
	},
	{	Name: 'DISP_MODE',
		friendlyName: 'Display mode'
	},
	{	Name: 'CANCEL',
		friendlyName: 'Cancel'
	},
	{	Name: 'INDEX',
		friendlyName: 'Index'
	},
	{	Name: 'RED',
		friendlyName: 'Red'
	},
	{	Name: 'GREEN',
		friendlyName: 'Green'
	},
	{	Name: 'YELLOW',
		friendlyName: 'Yellow'
	},
	{	Name: 'BLUE',
		friendlyName: 'Blue'
	},
	{	Name: 'EPG',
		friendlyName: 'TV Guide'
	},
	{	Name: 'TEXT',
		friendlyName: 'Teletext'
	},
	{	Name: 'INFO',
		friendlyName: 'Info'
	},
	{	Name: 'REW',
		friendlyName: 'Rewind'
	},
	{	Name: 'PLAY',
		friendlyName: 'Play'
	},
	{	Name: 'FF',
		friendlyName: 'Fast forward'
	},
	{	Name: 'SKIP_PREV',
		friendlyName: 'Skip previous'
	},
	{	Name: 'PAUSE',
		friendlyName: 'Pause'
	},
	{	Name: 'SKIP_NEXT',
		friendlyName: 'Skip next'
	},
	{	Name: 'STOP',
		friendlyName: 'Stop'
	},
	{	Name: 'REC',
		friendlyName: 'Record'
	},
	{	Name: 'VTOOLS',
		friendlyName: 'VTOOLS'
	},
	{	Name: 'VIERA_LINK',
		friendlyName: 'VIERA_LINK'
	},
	{	Name: 'R_TUNE',
		friendlyName: 'R-TUNE'
	},
	{	Name: '3D',
		friendlyName: '3D'
	},
	{	Name: 'HDMI1',
		friendlyName: 'HDMI 1'
	},
	{	Name: 'HDMI2',
		friendlyName: 'HDMI 2'
	},
	{	Name: 'HMDI3',
		friendlyName: 'HDMI 3'
	}
];

function startsocket(device_id, ipaddress) {
	
	Homey.log('Starting socket for tv[' + device_id + '] -> ' + ipaddress);
	tv[device_id] = new PanasonicViera(ipaddress);
		
}

function sendcommand (device_id, command, callback) {
	
	tv[device_id].sendKey(command, 'ONOFF');
	
	callback (null, true);
	/*
	tv.send(PanasonicViera.POWER_TOGGLE);
	
	tv.setVolume(20);
	*/
	
}


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
		    startsocket(device.id, settings.ipaddress);
		    
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
			},
			capabilities: [
	        	'volume_set'
	        ]
		}];
		
		startsocket(tempIP);
		
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


Homey.manager('flow').on('action.sendcommand', function (callback, args) {
	
	sendcommand (args.device.id, args.key.Name, callback);
	
});

Homey.manager('flow').on('action.setvolume', function (callback, args){
	var targetVolume = args.volume;
	
	if (targetVolume > 100) {
		
		Homey.log ('Target Volume (' + targetVolume + ') is too high (> 100)');
		callback ('Target Volume (' + targetVolume + ') is too high (> 100)', false);
		
	}
	
	Homey.log ('target volume=' + targetVolume);
	
	tv[args.device.id].setVolume(targetVolume);
	
});

Homey.manager('flow').on('condition.muted', function (callback, args) {

	callback (null, tv[args.device.id].getMute());

});


Homey.manager('flow').on('action.sendcommand.key.autocomplete', function (callback, value) {
	var SearchString = value.query;
	var items = searchForCommandsByValue( SearchString );
	callback(null, items);
});


function searchForCommandsByValue (value) {
	var possibleKeys = allpossibleKeys;
	var tempItems = [];
	for (var i = 0; i < possibleKeys.length; i++) {
		var temp = possibleKeys[i];
		if ( temp.friendlyName.toLowerCase().indexOf(value.toLowerCase()) >= 0 ) {
			tempItems.push({ icon: "", name: temp.friendlyName, Name: temp.Name });
		}
	}
	return tempItems;
}