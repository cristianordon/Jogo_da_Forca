/*
 Descricao : 
      Classe criada para funcionalidades á janela e informa ao usuário se ele ganhou ou perdeu no fim da partida.
 Aluno : 
      Cristiano Rodrigues de Oliveira Neto
 Data :
      20/06/2021
 */


import {gameAlert} from "./currentgame.js";

export class Word {

    constructor(word) {
        this.characters = word.split("");
        this.boxes = this.characters.map(char => {return "_"});
        this.mistakes = 0;
        this.corrects = 0;
        
        //Create boxes
        const currentWordDiv = document.querySelector("#current-word");
        currentWordDiv.innerHTML = "";
        this.boxes.forEach(box => {
            currentWordDiv.innerHTML += `<span class="letter"></span>`
        });
        
        this.currentWordSpaces = document.querySelectorAll("#current-word .letter")
        this.hangmanImg = document.querySelector("#hangman-image img");
        this.hangmanImg.src = `forca-${this.mistakes}.png`;
    }

    checkCharacter(char, keyButton){
        let gotRight = false;
        for(let i = 0; i < this.boxes.length; i++) {
            if (char == this.characters[i]) {
                if (char !== this.boxes[i]) {
                    this.corrects++
                }
                this.boxes[i] = char;
                this.currentWordSpaces[i].innerHTML = char;
                gotRight = true;
            }
        }

        if (keyButton.classList.contains("pressed") == false) {
            if (gotRight == false) {
                this.mistakes++
                this.hangmanImg.src = `forca-${this.mistakes}.png`;
            };

            keyButton.classList.add("pressed");
        }

        if (this.mistakes == 6) {
            gameAlert("Que pena! Você Perdeu!")
            
        } else {
            if (this.corrects == this.characters.length) {
                gameAlert("Parabéns! Você Ganhou! :D")
            }
        }
    }
}