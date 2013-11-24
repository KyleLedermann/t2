document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.splashscreen.hide();
	localStorageApp = new localStorageApp();
	localStorageApp.run();
	  pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
}

function localStorageApp() {
}

localStorageApp.prototype = {
	run:function() {
		var that = this;
		document.getElementById("insertVariable").addEventListener("click", function() {
			that._insertVariable.apply(that, arguments);
		});
		document.getElementById("searchVariable").addEventListener("click", function() {
			that._getVariable.apply(that, arguments);
		});
		document.getElementById("clearLocalStorage").addEventListener("click", function() {
			that._clearLocalStorage.apply(that, arguments);
		});
		document.getElementById("removeVariable").addEventListener("click", function() {
			that._removeVariable.apply(that, arguments);
		});
	},
    
    
	_insertVariable:function() {
		var variableNameInput = document.getElementById("variableNameInput"),
		valueInput = document.getElementById("valueInput");
        
		localStorage.setItem(variableNameInput.value, valueInput.value);
		variableNameInput.value = "";
		valueInput.value = "";
	},
    
	_getVariable:function() {
		var getRemoveVariableNameInput = document.getElementById("getRemoveVariableNameInput"),
		result = document.getElementById("result");
		if (localStorage.getItem(getRemoveVariableNameInput.value) != undefined) {
			result.value = localStorage.getItem(getRemoveVariableNameInput.value);
		}
		else {
			result.value = "No such record!"
		}
	},
    
	_removeVariable:function() {
		var searchRemoveNameInput = document.getElementById("getRemoveVariableNameInput"),
		result = document.getElementById("result");
		if (localStorage.getItem(searchRemoveNameInput.value) != undefined) {
			localStorage.removeItem(searchRemoveNameInput.value);
			result.value = "Deleted";
		}
		else {
			result.value = "No such record!";
		}
	},
    
	_clearLocalStorage:function() {
		localStorage.clear();
	}
}


    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
              destinationType : Camera.DestinationType.FILE_URI, 
          sourceType : Camera.PictureSourceType.CAMERA, 
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true });         
}

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
