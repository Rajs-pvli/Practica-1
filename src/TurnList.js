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

  var turn = {};

  //No afecta aquí los personajes muertos
  this.turnNumber++;
  turn.number = this.turnNumber;

  this._turnIndex = (this._turnIndex + 1) % this.list.length;
  this.activeCharacterId = this.list[this._turnIndex];
  turn.activeCharacterId = this.activeCharacterId;


  while (this._turnIndex < this.list.length && 
   this._charactersById[turn.activeCharacterId].isDead())
  {
      this.activeCharacterId = this.list[this._turnIndex];
      turn.activeCharacterId = this.activeCharacterId;
      this._turnIndex++;
  }

  //turno efectivo
 
  turn.activeCharacterId = this.activeCharacterId;

  turn.party = this._charactersById[turn.activeCharacterId].party;
  
  return turn;
  // Haz que calcule el siguiente turno y devuelva el resultado
  // según la especificación. Recuerda que debe saltar los personajes
  // muertos.
};

TurnList.prototype._sortByInitiative = function () {

  var lista1 = [];
  var lista2 = [];


  for(var nombre in this._charactersById)
  {
    lista1.push({name:nombre, initiative:this._charactersById[nombre].initiative});
  }

  lista1.sort(function(a,b){
    if(a.initiative > b.initiative) return -1;
    else if(a.initiative < b.initiative) return 1;
    return 0;
  })

  for(var nombre2 in lista1)
  {
    lista2.push(lista1[nombre2].name);
  }


  // Utiliza la función Array.sort(). ¡No te implementes tu propia
  // función de ordenación!
  return lista2;
};

module.exports = TurnList;
