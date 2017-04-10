var camerArray = [];
var constraints = {};
var i = 0;

Ext.define('app.view.UploadImagePanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.myformpanel2',
	
    config: {
        id: 'UploadImagePanel',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Upload Images',
                layout: {
                    pack: 'center',
                    type: 'vbox'
                }
            },
            {
                xtype: 'container',
                height: 300,
                id: 'ImageContainer',
                padding: '5 5 5 5',
                layout: {
                    type: 'vbox'
                },
				items:[
				{
					xtype: 'button',
					id: 'changeSrc',
					flex: 0.5,
					text: 'Change Camera',
					margin: '0 5 5 5',
					handler: function () {
						constraints.sourceId = camerArray[(i%2)].deviceId;
						Ext.getCmp('UploadImagePanel').onUploadImagePanelShow(this, null);
						console.log(camerArray[(i%2)].deviceId+ ' - ' +constraints.deviceId);
						i++;
					}
				},
				{
					xtype: 'container',
					flex:1,
					id: 'videoElementOut',
					html: '<video id="videoElementIn"/>'
				}
				]
            }
        ],
        listeners: [
            {
                fn: 'onUploadImagePanelShow',
                event: 'show'
            }
        ]
    },

	
	changeCamera: function(button){
		constraints.deviceId = camerArray[(i%2)].deviceId;
		this.onUploadImagePanelShow(button, null);
		i++;
	},
	
	
    onUploadImagePanelShow: function(component, options) {
/*
        var imageContainer = Ext.getCmp('ImageContainer');
        var inputItem = Ext.create('Ext.Container',{
            height: 30,
            width: 250,
            html: '<input type="file" accept="image/*" capture="camera" id="' + name + '" name="' + name + '" onchange="onChooseFileEvent(event);" />'
        });
		
		var inputItem = Ext.create('Ext.Container',{
            html: '<video id="videoElement" name="' + name + '"/>'
        });
		
		var button = Ext.create('Ext.Button',{
			text:'Change Camera',
			handler:'changeCamera'
		})
*/		
		
		Quagga.init({		
			numOfWorkers: 4,
			locate: true,
			frequency: 10,
			debug: true,
			inputStream : {
			  name : "Live",
			  type : "LiveStream",
			  target: document.querySelector('#videoElementIn'),
			  constraints: constraints
			},
			decoder : {
			  readers : ["code_128_reader"]
			}
		  }, function(err) {
			  if (err) {
				  console.log(err);
				  return
			  }
			  console.log("Initialization finished. Ready to start");
			  Quagga.start();
		  });
		  
		  Quagga.onDetected(function(data){
			alert('code detected: ' + data.codeResult.code);
		  });
		  	
		navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
			var video = document.querySelector('video');
			video.srcObject = stream;
			video.onloadedmetadata = function(e) {
			video.play();
			};
		}).catch(function(err) {
		  console.log("error! " + err);
		});
/*		
        var imageItem = Ext.create('Ext.Img',{
            id: 'img' + name,
            height: 190,
            width: 190,
            src: null
        });

        var items = [];
        items.push(inputItem);
		imageContainer.add(inputItem);
		items.push(imageItem);
        imageContainer.add(inputItem);
        imageContainer.add(imageItem);
*/
	}
});