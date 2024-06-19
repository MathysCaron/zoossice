const EnclosService = require('../services/EnclosService');
const Enclos = require('../models/Enclos');
const Animal = require('../models/Animal');

describe('EnclosService', () => {
    let service;

    beforeEach(() => {
        service = new EnclosService();
    });

    test('ajouter un enclos', () => {
        const enclos = new Enclos(1, 'Grand Enclos', 'grand', ['Elephant', 'Girafe']);
        service.ajouterUnEnclos(enclos);
        expect(service.obtenirUnEnclos()).toContain(enclos);
    });

    test('n\'ajoute pas l\'enclos si un ID est déjà existant', () => {
        const enclos = new Enclos(1, 'Grand Enclos', 'grand', ['Elephant', 'Girafe']);
        service.ajouterUnEnclos(enclos);
        expect(() => service.ajouterUnEnclos(enclos)).toThrow('Enclos avec cet ID existe déjà.');
    });

    test('modifier un enclos', () => {
        const enclos = new Enclos(1, 'Grand Enclos', 'grand', ['Elephant', 'Girafe']);
        service.ajouterUnEnclos(enclos);
        service.modifierUnEnclos(1, { nom: 'Petit Enclos' });
        expect(service.obtenirUnEnclos()[0].nom).toBe('Petit Enclos');
    });

    test('ne supprime pas un enclos contenant des animaux', () => {
        const enclos = new Enclos(1, 'Grand Enclos', 'grand', ['Elephant', 'Girafe']);
        const animal = new Animal(1, 'Babar', 'Elephant', 10, 1);
        enclos.animaux.push(animal);
        service.ajouterUnEnclos(enclos);
        expect(() => service.supprimerUnEnclos(1)).toThrow('Impossible de supprimer un enclos contenant des animaux.');
    });

    test('assigner un animal à un enclos approprié', () => {
        const enclos = new Enclos(1, 'Grand Enclos', 'grand', ['Elephant', 'Girafe']);
        const animal = new Animal(1, 'Babar', 'Elephant', 10, 1);
        service.ajouterUnEnclos(enclos);
        service.assignerUnAnimalAUnEnclos(animal);
        expect(enclos.animaux).toContain(animal);
    });

    test('n\'assigne pas l\'animal à un enclos inapproprié', () => {
        const enclos = new Enclos(1, 'Petit Enclos', 'petit', ['Lion']);
        const animal = new Animal(1, 'Babar', 'Elephant', 10, 1);
        service.ajouterUnEnclos(enclos);
        expect(() => service.assignerUnAnimalAUnEnclos(animal)).toThrow('L\'enclos ne peut pas accueillir cet animal.');
    });
});
