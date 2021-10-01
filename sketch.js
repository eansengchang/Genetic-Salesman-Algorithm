let selection;
let crossover;
let newGenBut;
let frameRateP;
let lengthP;
let pointNumInput;
let mutationSlider;
let poolFracSlider;

let pointNumber = 20
let routeNumber = 200
let mutationRate = 0.15

let matingPoolFraction = 0.5
let tournamentProbability = 0.3;

let points = [];
let routes = [];
let distanceArray;

function randomRoute() {
	let array = [...Array(pointNumber).keys()];
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

function setup() {
	createCanvas(600, 600)
	background(51)

	newGenBut = createButton("Restart Simulation").size(300, 100).position(620, 500)
	newGenBut.mousePressed(restart)

	selection = createSelect().size(200, 40).position(620, 450)
	selection.option("Truncation Selection")
	selection.option("Roulette Wheel Selection")
	selection.option("Stochastic Universal Sampling")
	selection.option("Tournament Selection")
	selection.selected("Tournament Selection")

	crossover = createSelect().size(200, 40).position(840, 450)
	crossover.option("Partially Mapped Crossover")
	crossover.option("Order Crossover")
	crossover.option("Cycle Crossover")
	crossover.selected("Order Crossover")

	mutationSlider = createSlider(0, 1, 0.15, 0.01).position(620, 300).size(190, 20)
	createP("Mutation pool percentage").position(840, 260)

	poolFracSlider = createSlider(0.01, 1, 0.5, 0.01).position(840, 300).size(190, 20)
	createP("Mutation rate").position(620, 260)

	pointNumInput = createInput(20).position(620, 400).size(190, 20)
	createP("Number of points").position(620, 360)

	instanceNumInput = createInput(200).position(840, 400).size(190, 20)
	createP("Number of trials").position(840, 360)

	frameRateP = createP(`Framerate: ${frameRate()} generations per second`)
	lengthP = createP()

	restart()
}

function restart() {
	background(51)
	routes = []
	points = []
	pointNumber = parseInt(pointNumInput.value())
	routeNumber = parseInt(instanceNumInput.value())

	//create random points
	for (let i = 0; i < pointNumber; i++) {
		points.push(new Point(random(width), random(height)))
	}
	//create distance 2d array
	create2dArray()

	for (let i = 0; i < routeNumber; i++) {
		routes.push(new Route(randomRoute()))
	}

	for (let route of routes) {
		route.display()
	}

	let shortest = routes[0];
	for (let route of routes) {
		if (shortest.distance > route.distance) {
			shortest = route
		}
	}
	// shortest.display(true);

	for (let dot of points) {
		dot.display()
	}
}

function draw() {
	nextGeneration()
	frameRateP.html(`Framerate: ${round(frameRate())} generations per second`)
	mutationRate = mutationSlider.value()
	matingPoolFraction = poolFracSlider.value()
}

function updateStuff() {
	background(51)
	for (let route of routes) {
		route.display()
	}

	let shortest = routes[0];
	for (let route of routes) {
		if (shortest.distance > route.distance) {
			shortest = route
		}
	}
	shortest.display(true);
	lengthP.html(`Shortest path: ${round(shortest.distance)}`)

	for (let dot of points) {
		dot.display()
	}
}

function nextGeneration() {
	// EVALUATE (sort the array)

	routes.sort((firstEl, secondEl) => firstEl.distance - secondEl.distance)
	//this sorts from lowest to highest

	routes[0].display(true)

	// SELECT mutation pool
	let mutationPool
	if (selection.value() == "Truncation Selection") {
		mutationPool = Selection.truncationSelection(routes);
	} else if (selection.value() == "Roulette Wheel Selection") {
		mutationPool = Selection.rouletteWheelSelection(routes);
	} else if (selection.value() == "Stochastic Universal Sampling") {
		mutationPool = Selection.stochasticUniversalSampling(routes)
	} else {
		mutationPool = Selection.tournamentSelection(routes);
	}

	//create the new routes, starting with mutation pool
	let newRoutes = mutationPool;

	let crossoverOption
	if (crossover.value() == "Partially Mapped Crossover") {
		crossoverOption = Crossover.partiallyMappedCrossover
	} else if (crossover.value() == "Order Crossover") {
		crossoverOption = Crossover.orderCrossover
	} else if (crossover.value() == "Cycle Crossover") {
		crossoverOption = Crossover.cycleCrossover
	}

	// CROSSOVER
	while (newRoutes.length < routeNumber) {
		// add new routes through crossover untill it reaches route number
		//first, randomly pick 2 routes to crossover
		let route1 = random(mutationPool).route;
		let route2 = random(mutationPool).route;

		//create the new route and add it to the route array
		newRouteArray = crossoverOption(route1, route2)

		// MUTATE
		if (random() < mutationRate) {
			let randomIndex = floor(random(newRouteArray.length))
			let randomIndex2 = floor(random(newRouteArray.length))
			let temp = newRouteArray[randomIndex];
			newRouteArray[randomIndex] = newRouteArray[randomIndex2];
			newRouteArray[randomIndex2] = temp;
		}
		if (random() < mutationRate) {
			let randomIndex = floor(random(newRouteArray.length))
			let randomIndex2 = floor(random(newRouteArray.length - 1))
			let temp = newRouteArray[randomIndex];
			newRouteArray.splice(randomIndex, 1);
			newRouteArray.splice(randomIndex2, 0, temp)
		}

		let newRoute = new Route(newRouteArray)
		newRoutes.push(newRoute)
	}

	routes = newRoutes
	//finally update the canvas
	updateStuff()
}


function create2dArray() {
	distanceArray = new Array(pointNumber);
	for (var i = 0; i < distanceArray.length; i++) {
		distanceArray[i] = new Array(pointNumber);
	}
	for (let i = 0; i < points.length; i++) {
		for (let j = 0; j < points.length; j++) {
			let point1 = points[i];
			let point2 = points[j];
			distanceArray[i][j] = dist(point1.x, point1.y, point2.x, point2.y)
		}
	}
}