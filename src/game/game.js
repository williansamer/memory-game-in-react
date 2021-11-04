let cron;

let game = 
    {
    lockMode: false, // paraliza a jogada para verificar se as cartas são iguais ou não
    firstCard: null,
    secondCard: null,

    logos : ["aliexpress", 
    "amazon", 
    "apple", 
    "blue-origin",
    "face",
    "google",
    "spacex",
    "target",
    "tesla",
    "twitter"],

    cards : [],

    name : [],

    moviments: [],

    time : [],
    
    ranking : [],

    hours : 0,
    seconds : 0,
    minutes : 0,
    ms: 1000,
    
    setCard: function(id){ //'id' mostrando qual a carta a ser setada(a carta do evento 'onclick')
      let checkMatch = this.cards.filter(card=>card.id === id)[0]; //retornando para o filter a carta com o id da carta setada
      //console.log(checkMatch)

      if(checkMatch.flipped || this.lockMode){//Se a carta do id já foi virada(flipped) ou se o lockMode é true, retornará false(ou seja, se estiver nestas condições, não irá setar(rodar))
        return false;
      }
      if(!this.firstCard){ //Se a carta ñ estiver flipada ou em lockMode, irá tentar colocar na 1ª carta(firstCard) a carta do id(checkMatch). Se a 1ª carta for null, irá receber a carta
        this.firstCard = checkMatch;
        this.firstCard.flipped = true; //colocar como virada
        this.moviments.push("*");
        //console.log(this.moviments);
        return true; //carta setada
      } else{ //Senão, colocará na 2ª carta(secondCard)
        this.secondCard = checkMatch;// aqui está
        this.secondCard.flipped = true;//colocar como virada
        this.lockMode = true; // E colocará em lockMode para verificação
        this.moviments.push("*");
        //console.log(this.moviments);
        return true; //carta setada
      }
    },

    checkMatch: function (){
      if(!game.firstCard || !game.secondCard){ //Resumindo, se não tiver as duas cartas, não irá checar
        return false;
      }
      return this.firstCard.icon === this.secondCard.icon//Se não tivesse o if, ao clicar na 1º carta, como ainda não temos a 2ª carta, não existe ainda a propriedade icon.
    },

    clearCards: function (){
      this.firstCard = null;
      this.secondCard = null;
      this.lockMode = false;
    },

    unflipCard: function(){
      this.firstCard.flipped = false; //Se Não der Match, desvirar a carta colocando flipped como false
      this.secondCard.flipped = false;
      this.clearCards(); //E limpar as cartas
    },

    checkGameOver : function (){
      return this.cards.filter(card => !card.flipped).length === 0;
    },

    pointings : function(){
      let gameOverLayer = document.querySelector("#gameOver");

      this.times();
      gameOverLayer.style.display = "flex"
    },

    times: function(){
      let yourScore = document.querySelector(".your-score");
      let getRanking = JSON.parse(localStorage.getItem("ranking")) || [];
      
      this.time.push(`${this.returnMinutes()}:${this.returnSeconds()}`);
      
      let eachPlayer = {moviments: this.moviments.length, name: this.name[0], time: this.time[0]};
      //IMPORTANTE: O envio para o time(this.time.push) tem que ser antes da criação da variável 'eachPlayer', para o JS fazer a leitura do envio para time antes.

      getRanking.push(eachPlayer);

      if(getRanking === null){
        localStorage.setItem("ranking", JSON.stringify(getRanking))
      } else{
        localStorage.setItem("ranking", JSON.stringify(getRanking));
      }

      yourScore.innerHTML = `Você ${this.name}, teve ${this.moviments.length} movimentos em um tempo de ${this.returnMinutes()}min e ${this.returnSeconds()}seg`;

      this.podium(getRanking);
    },

    returnMinutes: function(){
      return this.minutes < 10 ? '0' + this.minutes : this.minutes;
    },
    returnSeconds: function(){
      return this.seconds < 10 ? '0' + this.seconds : this.seconds;
    },

    podium : function (getRanking){
      let fpm = document.querySelector(".first-position-m");
      let spm = document.querySelector(".second-position-m");
      let tpm = document.querySelector(".third-position-m");
      let fpt = document.querySelector(".first-position-t");
      let spt = document.querySelector(".second-position-t");
      let tpt = document.querySelector(".third-position-t");
      let mov = [];
      let temp = [];

      getRanking.forEach((m)=>{
        mov.push({name: m.name, moviments: m.moviments});
      })

      getRanking.forEach((t)=>{
        temp.push({name: t.name, time: t.time})
      })

      mov.sort(function(a,b){ //Se 'a' for menor que 'b', o sort não acontecerá. Do contrário, irá efetuar a troca do "a" pelo "b"(efeito do sort)
        if(a.moviments < b.moviments){
          return -1; //Falso
        } else{
          return true;
        }
      })

      temp.sort(function(a,b){
        if(a.time < b.time){
          return -1; //Falso
        } else{
          return true;
        }
      })

      if (getRanking.length <= 1){ fpm.style.display = "block"
                                  spm.style.display = "none"
                                  tpm.style.display = "none"
                                  fpt.style.display = "block"
                                  spt.style.display = "none"
                                  tpt.style.display = "none"
        fpm.innerHTML = `1º - ${mov[0].name} - ${mov[0].moviments} mov`
        fpt.innerHTML = `1º - ${temp[0].name} - ${temp[0].time} seg`};
      if(getRanking.length === 2){ fpm.style.display = "block"
                                  spm.style.display = "block"
                                  tpm.style.display = "none"
                                  fpt.style.display = "block"
                                  spt.style.display = "block"
                                  tpt.style.display = "none"
        fpm.innerHTML = `1º - ${mov[0].name} - ${mov[0].moviments} mov`
        spm.innerHTML = `2º- ${mov[1].name} - ${mov[1].moviments} mov`
        fpt.innerHTML = `1º - ${temp[0].name} - ${temp[0].time} seg`
        spt.innerHTML = `2º- ${temp[1].name} - ${temp[1].time} seg`};
      if(getRanking.length >= 3){ fpm.style.display = "block"
                                  spm.style.display = "block"
                                  tpm.style.display = "block"
                                  fpt.style.display = "block"
                                  spt.style.display = "block"
                                  tpt.style.display = "block"
      fpm.innerHTML = `1º - ${mov[0].name} - ${mov[0].moviments} mov`
      spm.innerHTML = `2º- ${mov[1].name} - ${mov[1].moviments} mov`
      tpm.innerHTML = `3º - ${mov[2].name} - ${mov[2].moviments} mov`
      fpt.innerHTML = `1º - ${temp[0].name} - ${temp[0].time} seg`
      spt.innerHTML = `2º- ${temp[1].name} - ${temp[1].time} seg`
      tpt.innerHTML = `3º - ${temp[2].name} - ${temp[2].time} seg`}
    },

    inicio: function(){
      let inicio = document.querySelector("#inicio");
      let nameInp = document.querySelector("#btn-inp");

      this.name.push(nameInp.value);
      localStorage.setItem("nome", nameInp.value);
      inicio.style.display = "none";
      this.pauseCron();
      cron = setInterval(()=>{this.startCron()}, this.ms);
    },

    startCron: function(){
      this.seconds++;

      if(this.seconds === 60){
        this.seconds = 0;
        this.minutes++;
        if(this.minutes === 60){
          this.minutes = 0;
          this.hours++;
        }
      }
    },

    pauseCron: function(){
      clearInterval(cron);
    },

    restartCron: function(){
      clearInterval(cron);
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    },
    
    createCardFromLogos: function(){
        this.logos.forEach((logo) => {
        this.cards.push(this.createPairFromLogo(logo));
      });
    
    //  console.log(cards.flatMap(pair =>pair));//cards está recebendo do retorno, pares(2 arrays). Podemos dizer que: para cada PAIR(argumento), irá retornar algo(PAIR no caso são 2 elementos) e desmembrado pelo 'flatMap'(voltando 20 arrays. Se fosse no MAP, seria 10 arrays(10 pares))
      this.cards = this.cards.flatMap(pair =>pair);
    //IMPORTANTE:
    //  MAP>>> Ele cria um novo array 
    //  FLATMAP>>> Ele desvincula/desmembra os arrays(se tiver mais de um), criando um array para cada elemento que se encontra no array original(do CARDS por ex)
      this.shuffleCards();
      return this.cards; //Não precisa retornar, pois na function startGame, já está pegando o cards(game.cards) e enviando para pr´xima função(initializeCards(game.cards))
    },
    
    createPairFromLogo: function(logo){
      return [{id: this.createIdFromLogo(logo), //Ao invés de enviar para outra função, pode também colcoar o retorno completo(logo + parseInt(Math.random() * 1000))
              icon: logo,
              flipped: false},
              {id: this.createIdFromLogo(logo),
                icon: logo,
                flipped: false}]
    },
    
    createIdFromLogo: function (logo){
      return logo + parseInt(Math.random() * 1000);
    }, 
  
  
    shuffleCards: function(){
      let currentIndex = this.cards.length;
      let randomIndex = 0;
    
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);//EX> randomIndex = 5
        currentIndex--;//EX> currentIndex = 19
    
        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
      //Invertendo Valores. Fazendo a troca de propriedades do array cards...EX a seguir..
      //1ª RODADA________________________________________________________________
      //EX> cards[randomIndex] = 5;
      //EX> cards[currentIndex] = 19;
      //passa a ser....(=)
      //EX> cards[randomIndex] = 19;
      //EX> cards[currentIndex] = 5;
      //resumindo....
      //ANTERIORMENTE>>>cards[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
      //AGORA É>>>>>>>>>cards[0,1,2,3,4,19,6,7,8,9,10,11,12,13,14,15,16,17,18,5]
        //2ª RODADA________________________________________________________________
      //EX> cards[randomIndex] = 12;
      //EX> cards[currentIndex] = 18;
      //passa a ser....(=)
      //EX> cards[randomIndex] = 18;
      //EX> cards[currentIndex] = 12;
      //resumindo....
      //ANTERIORMENTE>>>cards[0,1,2,3,4,19,6,7,8,9,10,11,12,13,14,15,16,17,18,5]
      //AGORA É>>>>>>>>>cards[0,1,2,3,4,19,6,7,8,9,10,11,18,13,14,15,16,17,12,5]
    
      //e assim por diante.
    
      /* EX se fosse mudança em objetos..
          let obj = [{a: 10}, {b: 20}]
          [obj[0].a, obj[1].b] = [obj[1].b, obj[0].a]
    
          É como se estivessemos fazendo o seguinte:
          obj[0].a = 20 // esse 20 seria o valor de obj[1].b
          obj[1].b = 10 // esse 10 seria o valor de obj[0].a
      */
      }
    },

    flipCard: function(cardId, gameOverCallBack, noMatchCallBack){
      if(this.setCard(cardId)){//vamos mandar o id da carta clicada(this.id(arg)), para o setCard que está no game(game.setCard)
        if(this.secondCard){
          if(this.checkMatch()){
            this.clearCards();
            if(this.checkGameOver()){
              this.pauseCron();
              gameOverCallBack();
              //setTimeout(this.pointings(), 300);
            }
          } else{
            setTimeout(()=>{  
                this.unflipCard();//Se Não der Match, desvirar a carta colocando flipped como false e limpar as cartas
                noMatchCallBack();
            }, 1000);
        }
        }
    }
    }
  }

export default game;