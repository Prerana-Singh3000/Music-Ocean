console.log("Welcome to Music Ocean");
// Initialize variables
let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Alone -II ~Alan Walker", filePath: "music/1.mp3", coverPath: "img/cover/1.jpg", dur: "04:06"},
    {songName: "Cheap Thrills ~Sia", filePath: "music/2.mp3", coverPath: "img/cover/2.jpg", dur: "04:22"},
    {songName: "Death Bed ~Powfu", filePath: "music/3.mp3", coverPath: "img/cover/3.jpg", dur: "02:54"},
    {songName: "Faded Alan ~Walker", filePath: "music/4.mp3", coverPath: "img/cover/4.jpg", dur: "03:33"},
    {songName: "Girls Like You ~Maroon 5", filePath: "music/5.mp3", coverPath: "img/cover/5.jpg", dur: "04:31"},
    {songName: "Heading Home ~Alan Walker", filePath: "music/6.mp3", coverPath: "img/cover/6.jpg", dur: "03:32"},
    {songName: "Hold On ~Chord Overstreet", filePath: "music/7.mp3", coverPath: "img/cover/7.jpg", dur: "03:21"},
    {songName: "I Want It That Way ~Backstreet Boys", filePath: "music/8.mp3", coverPath: "img/cover/8.jpg", dur: "03:40"},
    {songName: "Jolly Sailor Bold ~Pirates of Carribean", filePath: "music/9.mp3", coverPath: "img/cover/9.jpg", dur: "04:24"},
    {songName: "Let Me Down Slowly ~Alec Benjamin", filePath: "music/10.mp3", coverPath: "img/cover/10.jpg", dur: "02:58"},
    {songName: "Life is a Highway ~Cars", filePath: "music/11.mp3", coverPath: "img/cover/11.jpg", dur: "04:28"},
    {songName: "Memories ~Maroon 5", filePath: "music/12.mp3", coverPath: "img/cover/12.jpg", dur: "03:16"},
    {songName: "Never Give Up ~Sia", filePath: "music/13.mp3", coverPath: "img/cover/13.jpg", dur: "03:43"},
    {songName: "On My Way ~Alan Walker", filePath: "music/14.mp3", coverPath: "img/cover/14.jpg", dur: "03:37"},
    {songName: "Perfect ~Ed Sheeran", filePath: "music/15.mp3", coverPath: "img/cover/15.jpg", dur: "04:40"},
    {songName: "So am I ~Ava Max", filePath: "music/16.mp3", coverPath: "img/cover/16.jpg", dur: "03:14"},
    {songName: "Someone You Loved ~Lewis Capaldi", filePath: "music/17.mp3", coverPath: "img/cover/17.jpg", dur: "03:07"}
]


// Setting names and covers for each song
songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('timeStamp')[0].innerText = songs[i].dur;
})

// audioElement.play();

// Handle play / pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100 ;
})

// Changing icon when someone clicks to play a song
const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `music/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})

// Setting Previous and next button actions

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=17){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    songItemPlay = document.getElementsByClassName('songItemPlay');
    songItemPlay[songIndex-1].classList.remove('fa-play-circle');
    songItemPlay[songIndex-1].classList.add('fa-pause-circle');
    songItemPlay[songIndex-2].classList.remove('fa-pause-circle');
    songItemPlay[songIndex-2].classList.add('fa-play-circle');
    audioElement.src = `music/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 1;
    }
    else{
        songIndex -= 1;
    }
    songItemPlay = document.getElementsByClassName('songItemPlay');
    songItemPlay[songIndex-1].classList.remove('fa-play-circle');
    songItemPlay[songIndex-1].classList.add('fa-pause-circle');
    songItemPlay[songIndex].classList.remove('fa-pause-circle');
    songItemPlay[songIndex].classList.add('fa-play-circle');
    audioElement.src = `music/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

})

/* To Do's -
  media query
  responsiveness
  play/pause by song-side icons
  autoplay next song
  */