
"use strict";

(function(){
  angular
  .module ( "oneaux" )
  .factory ( "PlaylistFactory", [
    "$resource",
    PlaylistFactoryFunction
  ]);

  function PlaylistFactoryFunction ( $resource ) {
    return $resource( "https://dry-citadel-69831.herokuapp.com/playlists/:id.json", {}, {
    // this app is great! please rename your heroku app and/ or buy a domain name to go with it!
      update: {method: "PUT"}
    });
  }


})();
