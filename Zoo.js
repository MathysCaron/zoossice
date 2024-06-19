import { Animal } from './Animal.js';
import { Enclos } from './Enclos.js';
import { Visite } from './Visite.js';

export class Zoo {
  constructor() {
    this.animaux = {};
    this.enclos = {};
    this.visites = [];
  }

  ajouterEnclos(identifiant, nom, taille, especesAcceptes) {
    if (this.enclos[identifiant]) {
      throw new Error("Cet id d'enclos existe déjà.");
    }
    this.enclos[identifiant] = new Enclos(identifiant, nom, taille, especesAcceptes);
  }

  ajouterAnimal(identifiant, nom, espece, age, enclosId) {
    if (this.animaux[identifiant]) {
      throw new Error("Un animal avec cet identifiant existe déjà.");
    }
    if (!this.enclos[enclosId] || !this.enclos[enclosId].peutAccueillir(espece)) {
      throw new Error("L'enclos spécifié n'existe pas ou ne peut pas accueillir cette espèce.");
    }
    const animal = new Animal(identifiant, nom, espece, age, enclosId);
    this.animaux[identifiant] = animal;
    this.enclos[enclosId].animaux.push(animal);
  }

  modifierAnimal(identifiant, nom, espece, age, enclosId) {
    if (!this.animaux[identifiant]) {
      throw new Error("Aucun animal trouvé avec cet identifiant.");
    }
    const animal = this.animaux[identifiant];
    if (nom) animal.nom = nom;
    if (espece) {
      if (enclosId && !this.enclos[enclosId].peutAccueillir(espece)) {
        throw new Error("L'enclos spécifié ne peut pas accueillir cette espèce.");
      }
      animal.espece = espece;
    }
    if (age) animal.age = age;
    if (enclosId) {
      if (!this.enclos[enclosId].peutAccueillir(animal.espece)) {
        throw new Error("L'enclos spécifié ne peut pas accueillir cette espèce.");
      }
      // Remove animal from old enclosure and add to new one
      const oldEnclos = this.enclos[animal.enclosId];
      oldEnclos.animaux = oldEnclos.animaux.filter(a => a.identifiant !== identifiant);
      animal.enclosId = enclosId;
      this.enclos[enclosId].animaux.push(animal);
    }
  }

  supprimerAnimal(identifiant) {
    if (!this.animaux[identifiant]) {
      throw new Error("Aucun animal trouvé avec cet identifiant.");
    }
    const animal = this.animaux[identifiant];
    const enclos = this.enclos[animal.enclosId];
    enclos.animaux = enclos.animaux.filter(a => a.identifiant !== identifiant);
    delete this.animaux[identifiant];
  }

  ajouterVisite(date, heureDebut, heureFin, enclosVisites) {
    if (enclosVisites.length > 5) {
      throw new Error("Une visite ne peut pas inclure plus de 5 enclos.");
    }
    this.visites.push(new Visite(date, heureDebut, heureFin, enclosVisites));
  }

  modifierVisite(index, date, heureDebut, heureFin, enclosVisites) {
    if (index < 0 || index >= this.visites.length) {
      throw new Error("Aucune visite trouvée à cet index.");
    }
    const visite = this.visites[index];
    if (date) visite.date = date;
    if (heureDebut) visite.heureDebut = heureDebut;
    if (heureFin) visite.heureFin = heureFin;
    if (enclosVisites) {
      if (enclosVisites.length > 5) {
        throw new Error("Une visite ne peut pas inclure plus de 5 enclos.");
      }
      visite.enclosVisites = enclosVisites;
    }
  }

  annulerVisite(index) {
    if (index < 0 || index >= this.visites.length) {
      throw new Error("Aucune visite trouvée à cet index.");
    }
    this.visites.splice(index, 1);
  }

  supprimerEnclos(identifiant) {
    if (!this.enclos[identifiant]) {
      throw new Error("Aucun enclos trouvé avec cet identifiant.");
    }
    if (this.enclos[identifiant].animaux.length > 0) {
      throw new Error("L'enclos ne peut pas être supprimé s'il contient des animaux.");
    }
    delete this.enclos[identifiant];
  }

  afficherAnimaux() {
    Object.values(this.animaux).forEach(animal => console.log(animal.toString()));
  }

  afficherEnclos() {
    Object.values(this.enclos).forEach(enclos => console.log(enclos.toString()));
  }

  afficherVisites() {
    this.visites.forEach(visite => console.log(visite.toString()));
  }
}
