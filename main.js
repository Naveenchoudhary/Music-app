var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
var willmute =1;



$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});

$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}


$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})


//function for song play and pause
	


	function toggleSong() {
				var song = document.querySelector('audio');
				if(song.paused == true) {
				console.log('Playing');
				$('.play-icon').removeClass('fa-play').addClass('fa-pause');
				song.play();
				}
				else {
				console.log('Pausing');
				$('.play-icon').removeClass('fa-pause').addClass('fa-play');
				song.pause();
				}

} 

//play-pause the song with keypress
	
	
	
  $('body').on('keypress',function(event) {
    var target = event.target;
    if (event.keyCode == 32 && target.tagName !='INPUT')
    {
        toggleSong();
    }
});
	



/* playlist using array
var songList = ['Badri Ki Dulhania (Title Track)','Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song']; 
var fileNames =['song1.mp3','song2.mp3','song3.mp3','song4.mp3',] 
$('#song1 .song-name').text(songList[0]);
$('#song2 .song-name').text(songList[1]);
$('#song3 .song-name').text(songList[2]);
$('#song4 .song-name').text(songList[3]);*/






// click function for all song


        function addSongNameClickEvent(songObj,position) {
			   var songName = songObj.fileName; // New Variable 
               var id = '#song' + position;
               $(id).click(function() {
               var audio = document.querySelector('audio');
               var currentSong = audio.src;
               if(currentSong.search(songName) != -1)
               {
               toggleSong();
                }
               else {
               audio.src = songName;
               toggleSong();
			   changeCurrentSongDetails(songObj);
                }
               });
                }



//function for change the time from sec to min



function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


//function for display current and duration time of song


   function updateCurrentTime() {
      var song = document.querySelector('audio');
        var currentTime = Math.floor(song.currentTime);
        currentTime = fancyTimeFormat(currentTime);
        var duration = Math.floor(song.duration);
        duration = fancyTimeFormat(duration)
        $('.time-elapsed').text(currentTime);
        $('.song-duration').text(duration);
}
//----------for-image--------------
   function changeCurrentSongDetails(songObj) {
     $('.current-song-image').attr('src','images/' + songObj.image)
     $('.current-song-name').text(songObj.name)
     $('.current-song-album').text(songObj.album)
}



             window.onload = function() {
				 changeCurrentSongDetails(songs[0]);
             updateCurrentTime();
             setInterval(function() {
             updateCurrentTime();
			  progressbar(); 
              },1000);

			 $('#songs').DataTable({
             paging: false
             });
			 }
//playlist

var songs = [{  //song1
       'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
       'fileName': 'song1.mp3',
	    'image':'img3.jpg'
    },
    {      //song2
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
		'image':'img2.jpg'
    }, 
    {       //song3
         'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
		'image':'img1.jpg'
    },
    {       //song4
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		'image':'img4.jpg'

    }]
    
	
	
	
	//loop for text and click event  for all songs
	
 for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
    }

	

	

	
	
	
	//welcome screen
	
	
/* old-one
      var button = document.querySelector('.welcome-screen button');
      button.addEventListener('click', function() { 
      var name = document.querySelector('#name-input').value; //to find the thing
      console.log(name)// to show input
      });*/
	
	
	
	
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
	
	//play-pause the song with icon
	
	
    $('.play-icon').on('click', function() {
        
		toggleSong();
		
		
    });
	
	
function progressbar() {
	var song = document.querySelector('audio');
	var ct=  song.currentTime;
	var dt=song.duration;
	var percentage=(ct/dt)*100;
	$(".progress-filled").css('width', percentage+"%");
}













//to mute the song mute function is there

 function mute(){
	 var song = document.querySelector('audio');
	 if(song.muted)
	 {
	 song.muted=false;
	 }
      else
	  {
		  song.muted = true;
		  
		  }
 }

 
//low-high the sound of song volume function is there

 function setvolume(){

	 var song = document.querySelector('audio');
	 song.volume= volumeslider.value/100;
 }

























// click on mute icon 

$('.fa-volume-up ').on('click', function() {
$('.fa-volume-up ').toggleClass('disabled')
    willmute = 1 - willmute;

 mute();

    });






$('.next').on('click',function() {
	
	var next =songs[1];
	var audio = document.querySelector('audio');

        
        audio.src = next.fileName;
        toggleSong();
        changeCurrentSongDetails(next);
    
});


// click on volume icon 

$('#volumeslider').on('mousemove',function() {
    setvolume();
});



$(".fa-step-forward").click(function(){

if( willShuffle == 1)
{
      var audio = document.querySelector('audio');
      var nextSongNumber = randomExcluded(0,6,Playingnumber); // Calling our function from Stackoverflow

      var nextSongObj = songs[nextSongNumber];
      audio.src = nextSongObj.fileName;
      toggleSong();
      changeCurrentSongDetails(nextSongObj);
      Playingnumber = nextSongNumber;


}


else {

          if(Playingnumber == songs.length-1){
          Playingnumber = 0;
          changeSong();
          }

          else {
         // console.log("two");
          console.log(Playingnumber);
            Playingnumber++;
          changeSong();
          }

}

})




$(".fa-step-backward").click(function(){

if(Playingnumber == 0){
console.log("one");
Playingnumber = (songs.length-1);
changeSong();




}

else {
console.log("two");
console.log(Playingnumber);
  Playingnumber--;
changeSong();
}




})