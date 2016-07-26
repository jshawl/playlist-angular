#OneAux
-OneAux was created by James Graham, Tyson Green and Anh Truong. 

-We decided to make an app that would dynamically sort a playlist to encourage people to share music and enjoy new music. 

-We used the Spotify api to get the information of the song, and use that to let players add the song(s) to the 'playlist'. The actual
playlist on Spotify would only add the top voted song at either the click button or on a set time (some amount of seconds before duration of song (can get duration from API) on setInterval)

-This way the host can have a saved playlist that they can share later.

-We think this makes music more interactive and fun rather than just fighting the for the aux cord or bluetooth connection

#How it works
-OneAux uses Spotify in the the background to play songs, so Spotify has to be running.

-A host creates a playlist with a unique access code, that access code is given to friends to join and add songs.

-Songs are searched by users and query results are from Spotify API

-Users add the songs to the playlist and all users who have the access code can view the playlist

-Users are able to vote up or down the song. For now, we have it to unlimited votes.

-The host then clicks a button to update the playlist, this sends the top voted song to the actual Spotify playlist so it can be queued





#Planning
##Overview
![Planning1](http://i.imgur.com/mq8mmiK.jpg)
-This is our initial map of all the states we would need. We figured that we could just pass the songs URL in an array, we could sort
 the array order by max votes, shift the first value.. however this caused some problems so we decided to go with just adding the top voted songs to the Spotify playlist
 
 
![Stretch goals](http://i.imgur.com/4FSkC2l.jpg)
-Some of our ambitious goals here, how we wanted the user playlist to actually look. 

-Some additional functionality such as audio sources from Soundcloud, Youtube etc (would be viable if we were still choosing to pass URLs through)

![The big picture](http://i.imgur.com/VQciAHh.jpg)
-This is the big picture of our visual map. 


-We knew that we had to have 2 'views' for the Admin/Host and the users when they see the playlist and the host can delete songs.



#Dependencies
-Angular JS

-Bootstrap CSS (solves media queries)

-Rails 5 (--api mode is amazing)

-Spotify-angular module

-Spotify API

-Spotify

Awesome readme! please include local setup instructions as well.
