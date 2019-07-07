let cfg = {
    main: {
        pop: 5,
        popFactor: 1.17,
        req: {}
    },
    barracks: {
        pop: 7,
        popFactor: 1.17,
        req: {
            main: 3
        }
    },
    stable: {
        pop: 8,
        popFactor: 1.17,
        req: {
            main: 10,
            barracks: 5,
            smith: 5
        }
    },
    garage: {
        pop: 8,
        popFactor: 1.17,
        req: {
            main: 10,
            smith: 10
        }
    },
    church: {
        pop: 5000,
        popFactor: 1.55,
        req: {
            main: 5,
            farm: 5
        }
    },
    church_f: {
        pop: 5,
        popFactor: 1.55,
        req: {}
    },
    snob: {
        pop: 80,
        popFactor: 1.17,
        req: {
            main: 20,
            smith: 20,
            market: 10
        }
    },
    smith: {
        pop: 20,
        popFactor: 1.17,
        req: {
            main: 5,
            barracks: 1
        }
    },
    place: {
        pop: 0,
        popFactor: 1.17,
        req: {}
    },
    statue: {
        pop: 10,
        popFactor: 1.17,
        req: {}
    },
    market: {
        pop: 20,
        popFactor: 1.17,
        req: {
            main: 3,
            storage: 2
        }
    },
    wood: {
        pop: 5,
        popFactor: 1.155,
        req: {}
    },
    stone: {
        pop: 10,
        popFactor: 1.14,
        req: {}
    },
    iron: {
        pop: 10,
        popFactor: 1.17,
        req: {}
    },
    farm: {
        pop: 0,
        popFactor: 1,
        req: {}
    },
    storage: {
        pop: 0,
        popFactor: 1.15,
        req: {}
    },
    hide: {
        pop: 2,
        popFactor: 1.17,
        req: {}
    },
    wall: {
        pop: 5,
        popFactor: 1.17,
        req: {
            barracks: 1
        }
    },
    watchtower: {
        pop: 500,
        popFactor: 1.18,
        req: {
            main: 5,
            farm: 5
        }
    }    
};

export { cfg };