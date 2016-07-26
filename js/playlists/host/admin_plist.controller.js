
"use strict";

(function() {
    angular
    .module("oneaux")
    .controller("AdminPlistController", [
        "PlaylistFactory",
        "SongFactory",
        "$state",
        "$stateParams",
        "Spotify",
        "$http",
        "$sce",
        "$scope",
        "$timeout",
        AdminPlistControllerFunction
    ])

    function AdminPlistControllerFunction (PlaylistFactory, SongFactory, $state, $stateParams, Spotify, $http, $sce,$scope,$timeout) {
                var vm = this;
        PlaylistFactory.get({id: $stateParams.id}).$promise.then(function(response) {
            vm.playlist = response;
            vm.play_song = $sce.trustAsHtml("<iframe src='https://embed.spotify.com/?uri=spotify:user:"+vm.playlist.spotify_user_id+":playlist:"+vm.playlist.spotify_playlist_id+"' width='300' height='380' frameborder='0' allowtransparency='true'></iframe>");
	    // can you move this ifram to html, and use spotify info as variables?
	    // maybe even wrap it in a ng-if to prevent showing before songs are in there
        });
        vm.songs = SongFactory.query({playlist_id: $stateParams.id});

        vm.playlistSort = function () {
          console.dir($stateParams.id);
          console.dir(vm.songs[0].id);
            vm.list_of_scores = [];
            console.log(vm.songs[0])
            for (var i = 0; i < vm.songs.length; i++) {
                if (vm.songs[i].active === true) {
                    vm.list_of_scores.push(vm.songs[i].score);
                }
            }
            console.log(vm.list_of_scores);
            vm.max_score = Math.max(...vm.list_of_scores);

            vm.next_song = vm.songs.filter(function( obj ) {
                if (obj.active === true) {
                    return obj.score == vm.max_score;
                }
            })

            if (localStorage.getItem('username') == vm.next_song.user) {
                localStorage.setItem('user-song-count', parseInt(localStorage.getItem('user-song-count')) - 1);
            }

            if(vm.next_song[0].active == true){
                  $http({
                    method: "POST",
                    url:"https://api.spotify.com/v1/users/"+vm.playlist.spotify_user_id+"/playlists/"+vm.playlist.spotify_playlist_id+"/tracks?uris="+vm.next_song[0].uri,
                    headers:{
                      "Accept": "application/json",
                      "Authorization": "Bearer "+vm.playlist.access_token
                    }
		    // maybe you could move this logic to the rails api as well to keep tokens secret.
		    //
		    // e.g. POST rails-api://add-track
                  }).then(function successCallback(response){
                    console.log(response);
                    vm.next_song[0].active = false;
                    console.log(vm.next_song[0]);
                    vm.next_song[0].$update({playlist_id: $stateParams.id, id: vm.next_song[0].id}).then(function(response){
                      console.log(response);
                    });
                  },function errorCallback(response){
                    console.log(response);
                  });
            }//end of IF active function

        }


        vm.refresh_token = function () {
            console.log(vm.playlist.access_token);
            Spotify.login();
            vm.access_token = localStorage.getItem('spotify-token');
            vm.playlist.access_token = vm.access_token;
            vm.playlist.$update({id: vm.playlist.id});
            console.log(vm.playlist.access_token);
        }

        vm.update_score = function (song, net) {
            song.score = parseInt(parseInt(song.score) + parseInt(net));
            song.$update({playlist_id: $stateParams.id, id: song.id});
        }

        vm.remove_song = function (song) {
            song.$delete({playlist_id: vm.playlist.id, id: song.id});
            $state.reload();
        }

        vm.orderByFunction = function(song){
            return parseInt(song.score);
        };

    }


})();
