
"use strict";

(function() {
    angular.module ("oneaux", [
            "ui.router",
            "ngResource",
            "spotify",
            "playlists"
        ])
        .config ([
          "$stateProvider",
          RouterFunction
        ])
        .config(function (SpotifyProvider) {
          SpotifyProvider.setClientId('6c399ddd5811422691be5a67e8ce0fcf');
          SpotifyProvider.setRedirectUri('https://at89.github.io/playlist-angular/callback.html');
          SpotifyProvider.setScope('playlist-modify-private playlist-modify-public');
          // If you already have an auth token
          SpotifyProvider.setAuthToken('b4114de99b7f491b943f5eeeaf958e74');
	  // can this be obscured in any way?
        })

        function RouterFunction($stateProvider) {
          $stateProvider
          .state("Home", {
            url: "/",
            templateUrl: "js/playlists/index.html",
            controller: "HomeController",
            controllerAs: "HomeViewModel"
          })
          .state("About", {
            url: "/about",
            templateUrl: "js/playlists/about.html",
            controller: "AboutController",
            controllerAs: "AboutViewModel"
          })
          .state("Join",{
            url:"/join",
            templateUrl:"js/playlists/user/join.html",
            controller: "JoinController",
            controllerAs: "JoinViewModel"
          })
          .state("Add",{
            url:"/add",
            templateUrl:"js/playlists/user/add.html",
            controller:"AddController",
            controllerAs: "AddViewModel",
            params: {
                "playlist_id": null,
                "user": null
            }
	    // whoah did not know you could do this! awesome!
          })
          .state("Create", {
            url: "/create",
            templateUrl: "js/playlists/host/create.html",
            controller: "CreateController",
            controllerAs: "CreateViewModel"
          })
          .state("Edit", {
            url: "/edit",
            templateUrl: "js/playlists/host/edit.html",
            controller: "EditController",
            controllerAs: "EditViewModel"
          })
          .state("Confirmation", {
            url: "/confirmation",
            templateUrl: "js/playlists/host/confirmation.html",
            controller: "ConfirmationController",
            controllerAs: "ConfirmationViewModel",
            params: { "playlist_id": null,
                      "access_token": null }
          })
          .state("Invite", {
            url: "/invite",
            templateUrl: "js/playlists/host/invite.html",
            controller: "InviteController",
            controllerAs: "InviteViewModel",
            params: { "playlist_id": null }
          })
          .state("AdminPlist", {
            url: "/admin/playlist/:id",
            templateUrl: "js/playlists/host/admin_plist.html",
            controller: "AdminPlistController",
            controllerAs: "AdminPlistViewModel"
          })
          .state("CurrentPlaylist",{
              url:"/current/:id",
              templateUrl: "js/playlists/user/playlist.html",
              controller: "CurrentPlaylistViewModel",
              controllerAs: "CurrentPlaylist",
              params: {
                  "playlist_id": null,
                  "user": null
              }
            })

        }

// END OF IIFE
})();
