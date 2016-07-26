
"use strict";

(function(){
  angular
  .module ( "oneaux" )
  .factory ( "SongFactory", [
    "$resource",
    "$stateParams",
    SongFactoryFunction
  ]);

    function SongFactoryFunction ( $resource, $stateParams ) {
        return $resource( "https://dry-citadel-69831.herokuapp.com/playlists/:playlist_id/songs/:id.json", {}, {
	// nice job on implementing the nested resource!
            update: {method: "PUT"}
        });
    }


})();
