export class Animal {
    constructor(identifiant, nom, espece, age, enclosId) {
      this.identifiant = identifiant;
      this.nom = nom;
      this.espece = espece;
      this.age = age;
      this.enclosId = enclosId;
    }
  
    toString() {
      return `Animal(${this.identifiant}, ${this.nom}, ${this.espece}, ${this.age}, ${this.enclosId})`;
    }
  }
  