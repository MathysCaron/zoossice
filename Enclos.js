export class Enclos {
    constructor(identifiant, nom, taille, especesAcceptes) {
      this.identifiant = identifiant;
      this.nom = nom;
      this.taille = taille;
      this.especesAcceptes = especesAcceptes;
      this.animaux = [];
    }
  
    peutAccueillir(espece) {
      return this.especesAcceptes.includes(espece);
    }
  
    toString() {
      return `Enclos(${this.identifiant}, ${this.nom}, ${this.taille}, ${this.especesAcceptes})`;
    }
  }
  