
"use strict";

(function(){
  angular
  .module ( "oneaux" )
  .factory ( "SpotifyFactory", [
    "$resource",
    SpotifyFactoryFunction
  ]);

  function SpotifyFactoryFunction ( $resource ) {
    return $resource( "https://api.spotify.com/v1/search?type=track&limit=10", {}, {
      'query':  {method:'GET', isArray:false} // excellent!!!
    } );
  }


})();
