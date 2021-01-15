let cfg = {
    main: {
        maxLevel: 30,
        minLevel: 1,
        pop: 5,
        popFactor: 1.17,
        req: {}
    },
    barracks: {
        maxLevel: 25,
        minLevel: 0,
        pop: 7,
        popFactor: 1.17,
        req: {
            main: 3
        }
    },
    stable: {
        maxLevel: 20,
        minLevel: 0,
        pop: 8,
        popFactor: 1.17,
        req: {
            main: 10,
            barracks: 5,
            smith: 5
        }
    },
    garage: {
        maxLevel: 15,
        minLevel: 0,
        pop: 8,
        popFactor: 1.17,
        req: {
            main: 10,
            smith: 10
        }
    },
    church: {
        maxLevel: 3,
        minLevel: 0,
        pop: 5000,
        popFactor: 1.55,
        req: {
            main: 5,
            farm: 5
        }
    },
    church_f: {
        maxLevel: 1,
        minLevel: 0,
        pop: 5,
        popFactor: 1.55,
        req: {}
    },
    snob: {
        maxLevel: 3,
        minLevel: 0,
        pop: 80,
        popFactor: 1.17,
        req: {
            main: 20,
            smith: 20,
            market: 10
        }
    },
    smith: {
        maxLevel: 20,
        minLevel: 0,
        pop: 20,
        popFactor: 1.17,
        req: {
            main: 5,
            barracks: 1
        }
    },
    place: {
        maxLevel: 1,
        minLevel: 0,
        pop: 0,
        popFactor: 1.17,
        req: {}
    },
    statue: {
        maxLevel: 1,
        minLevel: 0,
        pop: 10,
        popFactor: 1.17,
        req: {}
    },
    market: {
        maxLevel: 25,
        minLevel: 0,
        pop: 20,
        popFactor: 1.17,
        req: {
            main: 3,
            storage: 2
        }
    },
    wood: {
        maxLevel: 30,
        minLevel: 0,
        pop: 5,
        popFactor: 1.155,
        req: {}
    },
    stone: {
        maxLevel: 30,
        minLevel: 0,
        pop: 10,
        popFactor: 1.14,
        req: {}
    },
    iron: {
        maxLevel: 30,
        minLevel: 0,
        pop: 10,
        popFactor: 1.17,
        req: {}
    },
    farm: {
        maxLevel: 30,
        minLevel: 1,
        pop: 0,
        popFactor: 1,
        req: {}
    },
    storage: {
        maxLevel: 30,
        minLevel: 1,
        pop: 0,
        popFactor: 1.15,
        req: {}
    },
    hide: {
        maxLevel: 10,
        minLevel: 0,
        pop: 2,
        popFactor: 1.17,
        req: {}
    },
    wall: {
        maxLevel: 20,
        minLevel: 0,
        pop: 5,
        popFactor: 1.17,
        req: {
            barracks: 1
        }
    },
    watchtower: {
        maxLevel: 20,
        minLevel: 0,
        pop: 500,
        popFactor: 1.18,
        req: {
            main: 5,
            farm: 5
        }
    }    
};

export { cfg };