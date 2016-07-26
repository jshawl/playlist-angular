(function() {
  angular
  .module("oneaux")
  .controller("AddController", [
    "$state",
    "$stateParams",
    "SpotifyFactory",
    "SongFactory",
    "PlaylistFactory",
    "Spotify",
    "$http",
    AddControllerFunction
  ])

  function AddControllerFunction ($state, $stateParams, SpotifyFactory, SongFactory, PlaylistFactory, Spotify, $http) {
    var vm = this;
    vm.playlist_id = localStorage.getItem('playlist-token');
    vm.user_name = localStorage.getItem('username');

    PlaylistFactory.get({id: vm.playlist_id}).$promise.then(function(response) {
        vm.playlist = response;
        console.log(vm.playlist);
        return vm.playlist;
    })


    vm.search = function(query) {
      vm.query = query;
      vm.songs = {};
      vm.results = [];
      vm.songs = SpotifyFactory.get({q: vm.query});
    }

    vm.add_song = function (title, artist, album, image_url, duration, preview, uri) {
        console.log(vm.playlist.spotify_playlist_id);
        console.log(vm.playlist.access_token);
        if (vm.playlist.first_add == false) {
            $http({
              method: "POST",
              url: "https://api.spotify.com/v1/users/"+vm.playlist.spotify_user_id+"/playlists/"+vm.playlist.spotify_playlist_id+"/tracks?uris="+uri,
              headers: {
                  "Accept": "application/json",
                  "Authorization": "Bearer "+vm.playlist.access_token
              }
            }).then(function successCallback(response) {
                console.log(response);
                console.log(vm.playlist.first_add);
                vm.playlist.first_add = true;
                console.log(vm.playlist.first_add);
                vm.playlist.$update({id: vm.playlist.id}).then(function(response){
                    console.log(response);
                });
              }, function errorCallback(response) {
                console.log(response);
              });
          }
          console.log(parseInt(localStorage.getItem('user-song-count')) < vm.playlist.songs_per_user);
          console.log(vm.playlist.songs_per_user == null);
          if ((parseInt(localStorage.getItem('user-song-count')) < vm.playlist.songs_per_user) || vm.songs_per_user === null) {
          vm.new_song = new SongFactory({
            "user": vm.user_name,
            "playlist_id": vm.playlist_id,
            "title": title,
            "artist": artist,
            "album": album,
            "album_art": image_url,
            "duration": duration,
            "audio_url": preview,
            "score": 0,
            "uri": uri
          })

          console.log(vm.new_song);
          vm.new_song.$save({playlist_id: vm.playlist_id}).then(function() {
            localStorage.setItem('user-song-count', parseInt(localStorage.getItem('user-song-count')) + 1);
            console.log(localStorage.getItem('user-song-count'));
          })
          }
          else {
              alert("Only "+vm.playlist.songs_per_user+" songs allowed per user in this playlists!");
          }
      }
  }

})();
