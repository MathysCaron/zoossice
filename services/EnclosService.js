const Enclos = require('../models/Enclos');

class EnclosService {
    constructor() {
        this.enclos = [];
    }

    ajouterUnEnclos(enclos) {
        if (this.enclos.find(e => e.id === enclos.id)) {
            throw new Error('Enclos avec cet ID existe déjà.');
        }
        this.enclos.push(enclos);
    }

    modifierUnEnclos(id, enclosModifie) {
        const index = this.enclos.findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error('Enclos non trouvé.');
        }
        this.enclos[index] = { ...this.enclos[index], ...enclosModifie };
    }

    supprimerUnEnclos(id) {
        const enclos = this.enclos.find(e => e.id === id);
        if (enclos.animaux.length > 0) {
            throw new Error('Impossible de supprimer un enclos contenant des animaux.');
        }
        this.enclos = this.enclos.filter(e => e.id !== id);
    }

    assignerUnAnimalAUnEnclos(animal) {
        const enclos = this.enclos.find(e => e.id === animal.enclosId);
        if (!enclos || !enclos.peutAjouterUnAnimal(animal)) {
            throw new Error('L\'enclos ne peut pas accueillir cet animal.');
        }
        enclos.animaux.push(animal);
    }

    obtenirUnEnclos() {
        return this.enclos;
    }
}

module.exports = EnclosService;
