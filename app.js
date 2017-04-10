Ext.Loader.setConfig({
    enabled: true
});

Ext.application({

    requires: [
        ('app.view.UploadImagePanel'), 
    ],
    viewport: {
        autoMaximize: true
    },

    views: [
        'UploadImagePanel'
    ],
    name: 'app',

    launch: function() {
		
		camerArray = [];
		constraints = {video:true};
		
		navigator.mediaDevices.enumerateDevices()
						.then(function(devices) {
						  devices.forEach(function(device) {
							console.log(device.kind + ": " + device.label +
										" id = " + device.deviceId);
							if(device.kind == 'videoinput')
								camerArray.push(device);
						  });
						
							constraints.sourceId = camerArray[0].deviceId;
							i++;
						})
						.catch(function(err) {
						  console.log(err.name + ": " + err.message);
						});
		Ext.create('app.view.UploadImagePanel', {fullscreen: true});
    }

});
