'use strict';

function TurnList() {}

TurnList.prototype.reset = function (charactersById) {
  this._charactersById = charactersById;
  this._turnIndex = -1;
  this.turnNumber = 0;
  this.activeCharacterId = null;
  this.list = this._sortByInitiative();
};

TurnList.prototype.next = function () {
/*
  var turn = {};

  //No afecta aquí los personajes muertos
  this.turnNumber++;
  turn.number = this.turnNumber;

  this._turnIndex = (this._turnIndex + 1) % this.list.length;
  this.activeCharacterId = this.list[this._turnIndex];
  turn.activeCharacterId = this.activeCharacterId;

  var contador = 0;
  while (contador < this.list.length && 
   this._charactersById[turn.activeCharacterId].isDead())
  {
      this.activeCharacterId = this.list[this._turnIndex];
      turn.activeCharacterId = this.activeCharacterId;
      this._turnIndex = (this._turnIndex + 1) % this.list.length;
      contador++;
  }

  //turno efectivo
 
  turn.activeCharacterId = this.activeCharacterId;
  turn.party = this._charactersById[turn.activeCharacterId].party;
*/
 var turn = {};
  
  
 var i = 0;
 if(this.list.length > this._turnIndex && this._turnIndex != -1 )i = this._turnIndex;

  var parada = false;
  //console.log(this.list.length);
  while(!parada && (i < this.list.length)){
   if(!this._charactersById[this.list[i]].isDead())parada = true;
    i++;
    //console.log(this.list[i]);

  }
   this._turnIndex = i;
  i--;
 

  turn.activeCharacterId = this.list[i];
  
  turn.party = this._charactersById[this.list[i]].party;
  this.activeCharacterId = turn.activeCharacterId;
   this.turnNumber++;
  turn.number = this.turnNumber;
  return turn;
  // Haz que calcule el siguiente turno y devuelva el resultado
  // según la especificación. Recuerda que debe saltar los personajes
  // muertos.

};

TurnList.prototype._sortByInitiative = function () {

  var listaAux = [];
  var listaFinal = [];


  for(var nombre in this._charactersById)
  {
    listaAux.push({name:nombre, initiative:this._charactersById[nombre].initiative});
  }

  listaAux.sort(function(a,b){
    if(a.initiative > b.initiative) return -1;
    else if(a.initiative < b.initiative) return 1;
    return 0;
  })

  for(var nombre in listaAux)
  {
    listaFinal.push(listaAux[nombre].name);
  }

  // Utiliza la función Array.sort(). ¡No te implementes tu propia
  // función de ordenación!
  return listaFinal;
};

module.exports = TurnList;
