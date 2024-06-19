class Visite {
    constructor(id, date, heureDebut, heureFin, enclos) {
        this.id = id;
        this.date = date;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.enclos = enclos;
    }

    estValideSiMoinsDe5Enclos() {
        return this.enclos.length <= 5;
    }
}

module.exports = Visite;
