﻿//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/html/SetAccountPicture.html", {
        ready: function (element, options) {
            hideVisibleHolders();
            document.getElementById("setImage").addEventListener("click", setImage, false);
            document.getElementById("setVideo").addEventListener("click", setVideo, false);
            Windows.System.UserProfile.UserInformation.addEventListener("accountpicturechanged", accountPictureChanged);
        }
    });

    function setImage() {
        hideVisibleHolders();
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        openPicker.fileTypeFilter.replaceAll([".bmp", ".png", ".jpg", ".jpeg"]);

        openPicker.pickSingleFileAsync().done(function (file) {
            if (file) {
                // setAccountPictureAsync() accepts 3 storageFile objects for setting the small image, large image, and video.
                // More than one type can be set in the same call, but small image must be accompanied by a large image and/or video.
                // If only a large image is passed, the small image will be autogenerated.
                // If only a video is passed, the large image and small will be autogenerated.
                // Videos must be convertable to mp4, <=5MB, and height and width >= 448 pixels.
                Windows.System.UserProfile.UserInformation.setAccountPicturesAsync(null, file, null).done(function (result) {
                    // A user might turn off access to the Account Picture in PC Settings, therefore we need to check the result for success.
                    if (result === Windows.System.UserProfile.SetAccountPictureResult.success) {
                        WinJS.log && WinJS.log("Account Picture set successfully.", "sample", "status");
                    } else {
                        // A user might turn off access to the account
                        WinJS.log && WinJS.log("Setting the Account Picture failed.", "sample", "status");
                    }
                });
            } else {
                WinJS.log && WinJS.log("No file was picked.", "sample", "status");
            }
        });
    }

    function setVideo() {
        hideVisibleHolders();
        var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
        openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        openPicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        openPicker.fileTypeFilter.replaceAll([".mov", ".mp4", ".wmv"]);

        openPicker.pickSingleFileAsync().done(function (file) {
            if (file) {
                // setAccountPictureAsync() accepts 3 storageFile objects for setting the small image, large image, and video.
                // More than one type can be set in the same call, but small image must be accompanied by a large image and/or video.
                // If only a large image is passed, the small image will be autogenerated.
                // If only a video is passed, the large image and small will be autogenerated.
                // Videos must be convertable to mp4, <=5MB, and height and width >= 448 pixels.
                Windows.System.UserProfile.UserInformation.setAccountPicturesAsync(null, null, file).done(function (result) {
                    // A user might turn off access to the Account Picture in PC Settings, therefore we need to check the result for success.
                    if (result === Windows.System.UserProfile.SetAccountPictureResult.success) {
                        WinJS.log && WinJS.log("Account Picture set successfully.", "sample", "status");
                    } else {
                        // A user might turn off access to the account
                        WinJS.log && WinJS.log("Setting the Account Picture failed.", "sample", "status");
                    }
                });
            } else {
                WinJS.log && WinJS.log("No file was picked.", "sample", "status");
            }
        });
    }

    // This function is the handler for the AccountPictureChangedEvent, the event listener is added in initialize() below.
    function accountPictureChanged() {
        hideVisibleHolders();

        var smallImage = Windows.System.UserProfile.UserInformation.getAccountPicture(Windows.System.UserProfile.AccountPictureKind.smallImage);
        if (smallImage) {
            document.getElementById("smallImageHolder").src = URL.createObjectURL(smallImage, { oneTimeOnly: true });
            document.getElementById("smallImageHolder").style.visibility = "visible";
        }
        var largeImage = Windows.System.UserProfile.UserInformation.getAccountPicture(Windows.System.UserProfile.AccountPictureKind.largeImage);
        if (largeImage) {
            document.getElementById("largeImageHolder").src = URL.createObjectURL(largeImage, { oneTimeOnly: true });
            document.getElementById("largeImageHolder").style.visibility = "visible";
        }
        var video = Windows.System.UserProfile.UserInformation.getAccountPicture(Windows.System.UserProfile.AccountPictureKind.video);
        if (video) {
            document.getElementById("videoHolder").src = URL.createObjectURL(video, { oneTimeOnly: true });
            document.getElementById("videoHolder").style.visibility = "visible";
        }
    }

    function hideVisibleHolders() {
        document.getElementById("smallImageHolder").style.visibility = "hidden";
        document.getElementById("largeImageHolder").style.visibility = "hidden";
        document.getElementById("videoHolder").style.visibility = "hidden";
        WinJS.log && WinJS.log(" ", "sample", "status");
    }
})();