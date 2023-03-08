// Altera o elemento de acordo com o ID
const songname = document.getElementById("song-name");
const bandname = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const likeButton = document.getElementById("like");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const ShuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");




// Documento de Identidade para as músicas (conjunto de informações sobre o album) Array
const SummerBreeze = {
    songname : '10._Summer_Breeze_Cuti' ,
    artista : 'Cuti' ,
    file : '10._Summer_Breeze_Cuti',
    liked:  false,
};

const GreenGolAnakilie = {
    songname : 'GreenGol_Anakilie' ,
    artista : 'GreenGol' ,
    file : 'GreenGol_Anakilie',
    liked: false,
};

const MIX020 = {
    songname : 'MIX020' ,
    artista : ' DJ Three F' ,
    file : 'MIX020',
    liked: false,
};


const Strike = {
    songname : 'Teus_Sinais' ,
    artista : ' Strike' ,
    file : 'Teus_Sinais',
    liked: true,
};
let isplaying = false; // variavel (let) a principio terá seu valor falso, 
//está tocando( sim ou não)

let isShuffle = false; // está embaralhado (sim ou não)

let repeatOn = false; // função de repetir por padrão, começa desabilitada

const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [SummerBreeze,GreenGolAnakilie,MIX020,Strike] ;
let sortedPlaylist = [...originalPlaylist];
let index = 0;


function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isplaying = true; 
 }

 function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isplaying = false;
 }


 function playPauseDecider(){
    if(isplaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function likeButtonRender(){
    if (sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
else{
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');

}
}

function initializeSong(){
    cover.src = `images/${sortedPlaylist[index].file}.webp`;
    song.src = `song/${sortedPlaylist[index].file}.mp3`;
    songname.innerText = sortedPlaylist[index].songname;
    bandname.innerText = sortedPlaylist[index].artista;
    likeButtonRender();


}

function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length -1;

    }
    else {
        index -=1;

    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length -1){
        index = 0;

    }
    else {
        index +=1;

    }
    initializeSong();
    playSong();
}


function updateProgress(){ 
    const barwidth = (song.currentTime /song.duration) *100;
    currentProgress.style.setProperty('--progress', `${barwidth}%`)
    songTime.innerText = toHHSSMM(song.currentTime);



}

function jumpTo(event){
    const widith = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/widith) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preshuffleArray){
        const size = preshuffleArray.length;
        let currentIndex = size -1;
        while(currentIndex > 0 ){
               let randomIndex =  Math.floor(Math.random() *size);
               let aux = preshuffleArray[currentIndex];
               preshuffleArray[currentIndex] = preshuffleArray[randomIndex]
               preshuffleArray[randomIndex] = aux;
               currentIndex -= 1;
        }

}


function ShuffleButtonClicked(){
    if (isShuffle === false){
            isShuffle = true;
            shuffleArray(sortedPlaylist);
            ShuffleButton.classList.add('button-active');



    }

    else {
        isShuffle = false;
            sortedPlaylist = [...originalPlaylist];
            ShuffleButton.classList.remove('button-active');

    }


}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');

    }
}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else {
        playSong();
    }
}

function toHHSSMM(OriginalNumber){
    let hours = Math.floor(OriginalNumber/3600);
    let min = Math.floor((OriginalNumber - hours * 3600) /60);
    let secs = Math.floor(OriginalNumber - hours *3600 - min * 60);

return `${hours .toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;

}




function updateTotalTime(){
    toHHSSMM(song.duration);
    totalTime.innerText = toHHSSMM(song.duration);
    
}

function linkedButtonClicked(){
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true
    }
    else {
        sortedPlaylist[index].liked = false
    }
    likeButtonRender();
    localStorage.setItem('playlist',
    JSON.stringify(originalPlaylist));
}

initializeSong();


 
//Adiciona evento  aos Botões
play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong); 
song.addEventListener('timeupdate',updateProgress);
song.addEventListener('ended' , nextOrRepeat);
song.addEventListener('ended' , nextOrRepeat);
song.addEventListener('ended' , nextOrRepeat);
song.addEventListener('loadedmetadata' , updateTotalTime);
progressContainer.addEventListener('click', jumpTo );
ShuffleButton.addEventListener('click', ShuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', linkedButtonClicked);







