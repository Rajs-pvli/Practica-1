'use strict';
//Adriana participa
//Constructora de items
function Item(name, effect) {
  this.name = name;
  this.effect = effect;
}

//Constructora de armas
function Weapon(name, damage, extraEffect) {
  extraEffect = extraEffect || new Effect({});

  Item.call(this, name, extraEffect);
  extraEffect.hp = (- damage);

//Suponemos que damage es tanto para hp como para mp
  if (extraEffect.mp !== undefined) {
    extraEffect.mp = (- damage);
  }
}
// Termina de implementar la herencia haciendo que la propiedad prototype de
// Item sea el prototipo de Weapon.prototype y recuerda ajustar el constructor.
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

//Constructora de pergaminos
function Scroll(name, cost, effect) {
  //El método call() llama a una función 
  //con un valor this asignado y argumentos provistos de forma individual.
  //Llamada a la constructora de items
  Item.call(this, name, effect);
  this.cost = cost;
}
Scroll.prototype = Object.create(Item.prototype);
Scroll.prototype.constructor = Scroll;

Scroll.prototype.canBeUsed = function (mp) {
  // El pergamino puede usarse si los puntos de maná son superiores o iguales
  // al coste del hechizo.
  return (mp >= this.cost);//Booleana
};

function Effect(variations) {
  // Copia las propiedades que se encuentran en variations como propiedades de
  // este objeto.
  //Recorremos el array de variations y guardamos cada contenido del array en this
  for(var name in variations)
  {
    this[name] = variations[name];
  }

}

module.exports = {
  Item: Item,
  Weapon: Weapon,
  Scroll: Scroll,
  Effect: Effect
};
