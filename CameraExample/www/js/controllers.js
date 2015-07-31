angular.module('starter.controllers', [])

.controller("CameraController", 
	function($scope, $cordovaCamera, $rootScope) {
		
		$scope.takePicture = function() 
		{
			var options = 
			{
				quality : 100, 
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : false,
				encodingType: Camera.EncodingType.JPEG,
				correctOrientation: true,
				saveToPhotoAlbum: true,
				cameraDirection: Camera.Direction.FRONT,
//					targetWidth: 300,
//					targetHeight: 300,
				popoverOptions: CameraPopoverOptions,saveToPhotoAlbum: false
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				console.log("Camera photo URL: "+imageData);
				$rootScope.$broadcast("addPicture",imageData);
			}, function(err) {
				// An error occured. Show a message to the user
			});
			
			var options = {
				uri: imageData,
				folderName: "thumbnails",
				quality: 90,
				width: 300,
				height: 300};
			
			window.ImageResizer.resize(options,function(image) 
			{
			   console.log("Thumbnail URL: "+imageData);
			   $rootScope.$broadcast("addPicture",imageData);
			}, function() {});
		}
		
		$scope.placeKitten = function() 
		{
			var w = 100 + Math.floor(Math.random() * 200);
			w -= w % 5;
			var h = 150 + Math.floor(Math.random() * 100);
			h -= h % 5;
			var imageData='http://placekitten.com/' + w + '/' + h;
			$rootScope.$broadcast("addPicture",imageData);
		}
	}
)

.controller("TimelineController", 
	function($scope) {
		var photos=[];

	  	for (var i = 0; i < 0; i++) {
		    var w = 100 + Math.floor(Math.random() * 200);
		    w -= w % 5;
		    var h = 150 + Math.floor(Math.random() * 100);
		    h -= h % 5;
			photos.push({
			  width: 300,
			  height: 300,
			  src: 'http://placekitten.com/' + w + '/' + h
			});
		}

		$scope.$on("addPicture",function (event, imageData)
		{
			console.log(imageData);
			photos.push({
			  width: 300,
			  height: 300,
			  src: imageData
			});
    	});

		this.getPictures=function()
		{
			console.log("Getting pictures: "+photos.length);
			return photos;
		};
	}
);
