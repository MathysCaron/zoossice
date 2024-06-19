class Enclos {
    constructor(id, nom, taille, especesAutorisees) {
        this.id = id;
        this.nom = nom;
        this.taille = taille;
        this.especesAutorisees = especesAutorisees;
        this.animaux = [];
    }

    peutAjouterUnAnimal(animal) {
        return this.especesAutorisees.includes(animal.espece);
    }
}

module.exports = Enclos;
