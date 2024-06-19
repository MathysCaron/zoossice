const AnimalService = require('../services/AnimalService');
const Animal = require('../models/Animal');

describe('AnimalService', () => {
    let service;

    beforeEach(() => {
        service = new AnimalService();
    });

    test('ajouter un animal', () => {
        const animal = new Animal(2, 'Babar', 'Elephant', 10, 1);
        service.ajouterUnAnimal(animal);
        expect(service.obtenirUnAnimaux()).toContain(animal);
    });

    test('n\'ajoute pas d\'animal avec un ID identique', () => {
        const animal = new Animal(2, 'Babar', 'Elephant', 10, 1);
        service.ajouterUnAnimal(animal);
        expect(() => service.ajouterUnAnimal(animal)).toThrow('Animal avec cet ID existe déjà.');
    });

    test('modifier un animal', () => {
        const animal = new Animal(2, 'Babar', 'Elephant', 10, 1);
        service.ajouterUnAnimal(animal);
        service.modifierUnAnimal(2, { nom: 'Dumbo' });
        expect(service.obtenirUnAnimaux()[0].nom).toBe('Dumbo');
    });

    test('supprimer un animal', () => {
        const animal = new Animal(2, 'Babar', 'Elephant', 10, 1);
        service.ajouterUnAnimal(animal);
        service.supprimerUnAnimal(2);
        expect(service.obtenirUnAnimaux()).not.toContain(animal);
    });
});
