'use strict';
var dice = require('./dice');//Genera un número random entre 0 y 100

function Character(name, features) {
  features = features || {};
    // Extrae del parámetro features cada característica y alamacénala en
  // una propiedad.
  this.name = name;
  this.party = features.party || null;
  this.initiative = features.initiative || 0;
  this._defense = features.defense || 0;
  this.weapon = features.weapon || null;
  this._hp = features.hp || 0;
  this.maxHp = features.maxHp || this._hp || 15;
  this._mp = features.mp || 0;
  this.maxMp = features.maxMp || this._mp;

}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
  // Rellena el cuerpo de esta función
  return(this.hp === 0);
};

Character.prototype.applyEffect = function (effect, isAlly) {
  // Implementa las reglas de aplicación de efecto para modificar las
  // características del personaje. Recuerda devolver true o false según
  // si el efecto se ha aplicado o no.

  //CASO EN EL QUE ES ALIADO
  if(isAlly)
  {
    this.party += effect.party || this.party;
    this._hp += effect.hp || this._hp;
    this.maxHp +=  effect.maxHp || this.maxHp;
    this._mp += effect.mp || this._mp;
    this.maxMp +=  effect.maxMp || this.maxMp;
    this.initiative += effect.initiative || this.initiative;
    this._defense += effect.defense || this._defense;
    return true;
   }
   else //CASO EN EL QUE NO ES ALIADO
   {
      var num = dice.d100();//Generamos un número aleatorio
      //if(num <= this.defense)
      if(num > this._defense){

          this._hp += effect.hp || this._hp;
          this.maxHp +=  effect.maxHp || this.maxHp;
          this._mp += effect.mp || this._mp;
          this.maxMp +=  effect.maxMp || this.maxMp;
          this.initiative += effect.initiative || this.initiative;
          this._defense += effect.defense || this._defense;
          return true;
      }
      else
        return false;
   }
};


//CREO QUE ESTOS METODOS SIRVEN PARA PONER EL RANGO AL QUE TIENE QUE ESTAR CADA VARIABLE
//CREO QUE ES LO MISMO QUE PASA EN *** (ARRIBA) PERO MÁS CORTO

Object.defineProperty(Character.prototype, 'mp', {
  get: function () {
    return this._mp;
  },
  set: function (newValue) {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp));
  }
});

Object.defineProperty(Character.prototype, 'hp', {
  // Puedes usar la mísma ténica que antes para mantener el valor de hp en el
  // rango correcto.
  get: function () {
    return this._hp;
  },
  set: function (newValue) {
    this._hp = Math.max(0, Math.min(newValue, this.maxHp));
  }
});

// Puedes hacer algo similar a lo anterior para mantener la defensa entre 0 y
// 100.

Object.defineProperty(Character.prototype, 'defense', {

  get: function () {
    return this._defense;
  },
  set: function (newValue) {
    this._defense = Math.max(0, Math.min(newValue, 100));
  }
});
module.exports = Character;
