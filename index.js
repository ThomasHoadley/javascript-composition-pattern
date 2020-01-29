// Below is an example of the inhertiance and it's limitations

console.log('Inhertiance pattern');
console.log('\n');

// 1. Firstly we create a base class called superHuman, where we can get the name of it,
// and we can make it fly, because obviously all super humans can fly.

class superHuman {
    constructor(name) {
        this.name = name;
    }
    fly() {
        console.log(`${this.name} is flying`);
    }
}

// 2. we can then extend the superHuman to add new super powers 
// such as shrinking and turning invisible

class laserSuperHuman extends superHuman {
    shrink() {
        console.log(`${this.name} has fired lasers from eyes`);
    }
}

class invisibleSuperHuman extends superHuman {
    turnInvisible() {
        console.log(`${this.name} is now invisible`);
    }
}

// 3. we can then go ahead and create some superhumans

const superHumanTomV1 = new superHuman('Tom V1');
superHumanTomV1.fly();

console.log('\n');

const superHumanTomV2 = new laserSuperHuman('Tom V2');
superHumanTomV2.fly();
superHumanTomV2.shrink();

// This is where we run into an issue with the inheritance pattern.
// What if we want a super human who can turn invisible and shrink? 

// we can't do the following:
// class shrikingInvisibleSuperHuman extends shrinkingSuperHuman , invisibleSuperHuman {
// ... 
// }


// Instead of the Inheritance pattern, we should use the composition pattern

console.log('\n');
console.log('Composition pattern');
console.log('\n');

// create our base super human

function createBaseSuperHuman(name) {
    const superHuman = {
        name: name,
        fly: () => console.log(`${name} is flying`)
    }
    return superHuman
}

const TomV1 = createBaseSuperHuman("Tom v1");
TomV1.fly();
console.log('\n');

// let's create our super powers which can be added to new super humans

function shootLaser({name}) {
    return {
        shootLaser: () => console.log(`${name} shot lasers from eyes`)
    }
}

function turnInvisible({name}) {
    return {
        turnInvisible: () => console.log(`${name} turned invisible`)
    }
}

function grow({name}) {
    return {
        grow: () => console.log(`${name} has grown to 100ft tall`)
    }
}


// create a super human who can fly, shoot lasers and turn invisible

function laserShootingInvisibleSuperHuman(name){
    const superHuman = createBaseSuperHuman(name);
    
    return {
        ...superHuman,
        ...shootLaser(superHuman),
        ...turnInvisible(superHuman)
    }
}

// create an even better super human who can fly, shoot lasers and turn invisible AND grow

function growingLaserShootingInvisibleSuperHuman(name){
    const superHuman = createBaseSuperHuman(name);

    return {
        ...superHuman,
        ...shootLaser(superHuman),
        ...turnInvisible(superHuman),
        ...grow(superHuman),
    }
}

const TomV2 = laserShootingInvisibleSuperHuman('Tom v2');
TomV2.fly();
TomV2.shootLaser();
TomV2.turnInvisible();
console.log('\n');

const TomV3 = growingLaserShootingInvisibleSuperHuman('Tom v3');
TomV3.fly();
TomV3.shootLaser();
TomV3.turnInvisible();
TomV3.grow();
