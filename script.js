// Altera o elemento de acordo com o ID
const songname = document.getElementById("song-name");
const bandname = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");



// Documento de Identidade para as músicas (conjunto de informações sobre o album)
const SummerBreeze = {
    songname : '10._Summer_Breeze_Cuti' ,
    artista : 'Cuti' ,
    file : '10._Summer_Breeze_Cuti'
};

const GreenGolAnakilie = {
    songname : 'GreenGol_Anakilie' ,
    artista : 'GreenGol' ,
    file : 'GreenGol_Anakilie'
};

const MIX020 = {
    songname : 'MIX020' ,
    artista : 'Three F' ,
    file : 'MIX020'
};

let isplaying = false; // variavel (let) a principio terá seu valor falso, 
//está tocando( sim ou não)

const playlist = [SummerBreeze, GreenGolAnakilie, MIX020];
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

function initializeSong(){
    cover.src = `images/${playlist[index].file}.webp`;
    song.src = `song/${playlist[index].file}.mp3`;
    songname.innerText = playlist[index].songname;
    bandname.innerText = playlist[index].artista;


}

function previousSong(){
    if(index === 0){
        index = playlist.length -1;

    }
    else {
        index -=1;

    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === playlist.length -1){
        index = 0;

    }
    else {
        index +=1;

    }
    initializeSong();
    playSong();
}


initializeSong();


 
//Adiciona evento de tocar a música ao Botão
play.addEventListener("click", playPauseDecider) 
previous.addEventListener("click", previousSong) 
next.addEventListener("click", nextSong) 







