const Visite = require('../models/Visite');

class VisiteService {
    constructor() {
        this.visites = [];
    }

    ajouterUneVisite(visite) {
        if (!visite.estValideSiMoinsDe5Enclos()) {
            throw new Error('Une visite ne peut inclure plus de 5 enclos.');
        }
        this.visites.push(visite);
    }

    modifierUneVisite(id, visiteModifiee) {
        const index = this.visites.findIndex(v => v.id === id);
        if (index === -1) {
            throw new Error('Visite non trouvée.');
        }
        if (visiteModifiee.enclos && visiteModifiee.enclos.length > 5) {
            throw new Error('Une visite ne peut inclure plus de 5 enclos.');
        }
        this.visites[index] = { ...this.visites[index], ...visiteModifiee };
    }

    annulerUneVisite(id) {
        this.visites = this.visites.filter(v => v.id !== id);
    }

    obtenirUneVisite() {
        return this.visites;
    }
}

module.exports = VisiteService;
