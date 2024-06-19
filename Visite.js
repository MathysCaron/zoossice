export class Visite {
    constructor(date, heureDebut, heureFin, enclosVisites) {
      this.date = date;
      this.heureDebut = heureDebut;
      this.heureFin = heureFin;
      this.enclosVisites = enclosVisites;
    }
  
    toString() {
      return `Visite(${this.date}, ${this.heureDebut}, ${this.heureFin}, ${this.enclosVisites})`;
    }
  }
  