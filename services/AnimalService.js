const Animal = require('../models/Animal');

class AnimalService {
    constructor() {
        this.animaux = [];
    }

    ajouterUnAnimal(animal) {
        if (this.animaux.find(a => a.id === animal.id)) {
            throw new Error('Animal avec cet ID existe déjà.');
        }
        this.animaux.push(animal);
    }

    modifierUnAnimal(id, animalModifie) {
        const index = this.animaux.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error('Animal non trouvé.');
        }
        this.animaux[index] = { ...this.animaux[index], ...animalModifie };
    }

    supprimerUnAnimal(id) {
        this.animaux = this.animaux.filter(a => a.id !== id);
    }

    obtenirUnAnimaux() {
        return this.animaux;
    }
}

module.exports = AnimalService;
