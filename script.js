// Altera o elemento de acordo com o ID
const songname = document.getElementById("song-name");

//Altera o elemento de acordo com o ID 
const song = document.getElementById("audio");

//Altera o elemento de acordo com o ID
const play = document.getElementById("play");

songname.innerText = "good vibes";


function playSong(){
    song.play();
 }

play.addEventListener("click", playSong) 
// adiciona evento de tocar a música ao Botão






