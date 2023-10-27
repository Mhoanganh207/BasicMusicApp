const audio = document.getElementById('song');
const play = document.getElementById('play-button');
const repeat = document.getElementById('repeat');
let repeatStatus = false;
const shuffle = document.getElementById('shuffle');
let shuffleStatus = false;
const slider = document.getElementById('slider');
let sliderStatus = true;
const mute = document.getElementById('mute');
let muteStatus = false;
let currentSongIndex =0;
let song,artists,thumb;



const like = document.getElementById('like');
let likeStatus = [false,false,false,false,false,false,false,false,false,false];
const likedList = document.getElementById('liked');


let TrackThumb = document.getElementById('track-image');
let TrackAnimation = TrackThumb.animate([{transform: 'rotate(360deg)'}],
    {duration: 10000,iterations: Infinity});
TrackAnimation.pause();

function show(){
   const aside = document.getElementById('aside');
   let status = aside.style.display;
   if(status ==='' || status === 'none'){
      aside.style.display = 'block'; }
   else{
      aside.style.display = 'none';
   }

}


function getSong(link,image,name,artist,index){
    const itemName = document.getElementById('name');
    const itemArtist = document.getElementById('artist');
    const itemImage = document.getElementById('track-image');
    currentSongIndex = Number.parseInt(index);
    audio.setAttribute('src',link);
    itemImage.setAttribute('src',image);
    itemName.innerHTML = name;
    itemArtist.innerHTML = artist;
    song=name;
    artists=artist;
    thumb=image;
    checkLikedSong();
    sliderStatus = false;
    slider.value=0;
    setTimeout(() => {
     startListen();
     sliderStatus = true;
   }, 10);
   playSong();
}

function checkLikedSong(){
    if(likeStatus[currentSongIndex-1]===true){
        like.style.color = "#d91389ff";
    }
    else if(likeStatus[currentSongIndex-1]===false){
        like.style.color = "#afa6a6";
    }
}



function playSong(){
    play.innerHTML = "pause";
    audio.play();
    TrackAnimation.play();


}

function playPause(){
   if(play.innerHTML==="play_arrow"){
      audio.play();
      TrackAnimation.play();
      play.innerHTML = "pause";
   }
   else if(play.innerHTML==="pause"){
      audio.pause();
      TrackAnimation.pause();
      play.innerHTML = "play_arrow";
   }
}


function muteSong(){
    if (muteStatus === false) {
      mute.style.color = "#d91389ff";
      muteStatus = true;
      audio.muted = true;
   }
   else if(muteStatus){
      mute.style.color = "#afa6a6";
      muteStatus = false;
      audio.muted = false;
   }
}


function repeatSong(){

   if (repeatStatus === false) {
      repeat.style.color = "#d91389ff";
      repeatStatus = true;
      audio.loop = true;
        if(shuffleStatus){
                shuffle.style.color = "#afa6a6";
                shuffleStatus = false;
        }
   }
   else if(repeatStatus){
      repeat.style.color = "#afa6a6";
      repeatStatus = false;
      audio.loop = false;
   }
}
function shuffleSong(){

   if (shuffleStatus === false) {
      shuffle.style.color = "#d91389ff";
      shuffleStatus = true;
      if(repeatStatus){
            repeat.style.color = "#afa6a6";
            repeatStatus = false;
            audio.loop = false;
      }
   }
   else if(shuffleStatus){
      shuffle.style.color = "#afa6a6";
      shuffleStatus = false;
   }
}
function startListen(){
audio.addEventListener('timeupdate',function(){
    if (sliderStatus === true) {
        let position = audio.currentTime / audio.duration;
        slider.value = position * 100;
        if (audio.ended){
             play.innerHTML = "play_arrow";
             TrackAnimation.pause();

             if(shuffleStatus){
                 currentSongIndex = Math.floor(Math.random() * 10) + 1;
                 playSongIndex(currentSongIndex);
             }
        }
    }
})
};

slider.addEventListener('mousedown',function(){
   sliderStatus = false;
});

slider.addEventListener('change',function(){
    let value = slider.value;
    audio.currentTime = (value * audio.duration) / 100;
});

slider.addEventListener('mouseup',function(){
    sliderStatus = true;
});


function playSongIndex(index){
     const url = "http://localhost:3000/search/"+index;
    $.ajax({
         url: url,
         type: "GET",
         dataType: "json",
         success: function (song) {
            getSong(song.linkurl,song.imageurl,song.name,song.author,song.index);
         },
         error: function (error) {
            console.log(`Error ${error}`);
         }
      });
}

function likedSong(){

    let index = currentSongIndex-1;
    if(likeStatus[index]===false){
        likeStatus[index]=true;
        like.style.color = "#d91389ff";
        likedList.innerHTML +=
            '<div id="'+ currentSongIndex +'" class="liked-item">'
            +`<img src= ${thumb} >`+
                `<div class="info-item">
                    <div style="white-space: nowrap; text-overflow: fade;">${song}</div>
                    <div style="color: #818181; font-size: 13px" >${artists}</div>
                </div>
            </div>`;
    }
    else if(likeStatus[index]===true){
        likeStatus[index]=false;
        like.style.color = "#afa6a6";
        document.getElementById(currentSongIndex).remove();
    }
}

function nextSong(){
    currentSongIndex++;
    if(currentSongIndex>10){
        currentSongIndex=1;
    }
    playSongIndex(currentSongIndex);
}

function previousSong(){
    currentSongIndex--;
    if(currentSongIndex<1){
        currentSongIndex=10;
    }
    playSongIndex(currentSongIndex);
}





