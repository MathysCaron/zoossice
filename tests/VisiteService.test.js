const VisiteService = require('../services/VisiteService');
const Visite = require('../models/Visite');

describe('VisiteService', () => {
    let service;

    beforeEach(() => {
        service = new VisiteService();
    });

    test('ajouter une visite', () => {
        const visite = new Visite(1, '2024-06-19', '10:00', '12:00', [1, 2]);
        service.ajouterUneVisite(visite);
        expect(service.obtenirUneVisite()).toContain(visite);
    });

    test('n\'ajoute pas de visite si il y a plus de 5 enclos', () => {
        const visite = new Visite(1, '2024-06-19', '10:00', '12:00', [1, 2, 3, 4, 5, 6]);
        expect(() => service.ajouterUneVisite(visite)).toThrow('Une visite ne peut inclure plus de 5 enclos.');
    });

    test('modifier une visite', () => {
        const visite = new Visite(1, '2024-06-19', '10:00', '12:00', [1, 2]);
        service.ajouterUneVisite(visite);
        service.modifierUneVisite(1, { heureFin: '13:00' });
        expect(service.obtenirUneVisite()[0].heureFin).toBe('13:00');
    });

    test('ne modifie pas une visite pour inclure plus de 5 enclos', () => {
        const visite = new Visite(1, '2024-06-19', '10:00', '12:00', [1, 2]);
        service.ajouterUneVisite(visite);
        expect(() => service.modifierUneVisite(1, { enclos: [1, 2, 3, 4, 5, 6] })).toThrow('Une visite ne peut inclure plus de 5 enclos.');
    });

    test('annuler une visite', () => {
        const visite = new Visite(1, '2024-06-19', '10:00', '12:00', [1, 2]);
        service.ajouterUneVisite(visite);
        service.annulerUneVisite(1);
        expect(service.obtenirUneVisite()).not.toContain(visite);
    });
});
