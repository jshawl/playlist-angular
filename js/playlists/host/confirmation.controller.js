
"use strict";

(function() {
    angular
    .module("oneaux")
    .controller("ConfirmationController", [
        "PlaylistFactory",
        "$stateParams",
        ConfirmationControllerFunction
    ])

    function ConfirmationControllerFunction (PlaylistFactory, $stateParams) {
        console.log("I'm in the confirmation controller!")
        var vm = this;
        vm.new_playlist_id_key = $stateParams.playlist_id;
	// code comments would be helpful here to understand what this is doing
        var randomString = function(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        localStorage.setItem('admin-token', randomString(10));
        localStorage.setItem('user-song-count', 0);
        localStorage.setItem('playlist-token', vm.new_playlist_id_key);
        localStorage.setItem('username', "Host");
    }

})();
