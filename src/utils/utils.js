const setCoordinate = (coordinates, x, y) => {
    if (coordinates[y]) {
        if (!coordinates[y].includes(x)) {
            coordinates[y].push(x);
        }
    } else {
        coordinates[y] = [x];
    }
};

const isValidCoordinate = (x, y, max) => {
    if (x < 0 || y < 0) return false;

    if (x > max || y > max) return false;

    return true;
};

export const generateRandomCoordinates = (gridSize) => {
    const base = gridSize - 1;
    const getRandomCoordinate = () => Math.floor(Math.random() * base);
    const getRandomCoordinates = () => [getRandomCoordinate(), getRandomCoordinate()];
    // generate random number of live cells
    // from 200 up to 400
    const qty = Math.floor(Math.random() * 200 + 200);
    const coordinates = {};
    
    for (let i = 0; i <= qty; i++) {
        const [x, y] = getRandomCoordinates(base);
        setCoordinate(coordinates, x, y);
    }

    return coordinates;
};

export const recalculateCoordinates = (coordinates, gridSize) => {
    const base = gridSize - 1;
    const newCoordinates = {};
    const deadCellsToCheck = {};

    const isCellLive = (x, y) => {
        let isLive = false;
    
        if (coordinates[y] && coordinates[y].includes(x)) {
            isLive = true;
        }
    
        return isLive;
    };

    const getCoordinate = (x, y) => [x, y, isCellLive(x, y)];

    const getSiblings = (x, y) => {
        const siblings = [
            getCoordinate(x - 1, y - 1),
            getCoordinate(x,     y - 1),
            getCoordinate(x + 1, y - 1),
            getCoordinate(x - 1, y),
            getCoordinate(x + 1, y),
            getCoordinate(x - 1, y + 1),
            getCoordinate(x,     y + 1),
            getCoordinate(x + 1, y + 1)
        ];

        return [
            siblings.filter(cell => cell[2]),
            siblings.filter(cell => !cell[2])
        ];
    };

    Object.keys(coordinates).forEach(y => {
        coordinates[y].forEach(x => {
            const [live, dead] = getSiblings(+x, +y);
            const isValid = isValidCoordinate(+x, +y, base);
            
            if (isValid) {
                if (live.length === 2 || live.length === 3) {
                    setCoordinate(newCoordinates, x, y);
                }
            }

            dead.forEach(([x, y]) => {
                if (isValidCoordinate(x, y, base)) {
                    setCoordinate(deadCellsToCheck, x, y);
                }
            });
        });
    });

    Object.keys(deadCellsToCheck).forEach(y => {
        deadCellsToCheck[y].forEach(x => {
            const [live] = getSiblings(+x, +y);
            const isValid = isValidCoordinate(+x, +y, base);
            
            if (isValid && live.length === 3) {
                setCoordinate(newCoordinates, x, y);
            }
        });
    });

    return newCoordinates;
};