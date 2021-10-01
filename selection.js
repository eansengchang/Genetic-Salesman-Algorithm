class Selection {
	static truncationSelection(array) {
		let newArray = array.splice(0, ceil(routeNumber * matingPoolFraction));
		return newArray;
	}

	static rouletteWheelSelection(routes) {
		let oldArray = routes
		let newArray = []
		let fitnessArray = routes.map(route => oldArray[oldArray.length - 1].distance - route.distance)

		let sumOfFitness = fitnessArray.reduce((e1, e2) => e1 + e2)
		for (let i = 0; i < ceil(routeNumber * matingPoolFraction); i++) {
			let randomNumu = random(sumOfFitness);
			let j = 0;
			let sum = 0
			while (sum < randomNumu) {
				sum += fitnessArray[j]
				j++
			}
			newArray.push(oldArray[j])
		}
		return newArray
	}

	static stochasticUniversalSampling(array) {
		let fitnessArray = routes.map(route => routes[routes.length - 1].distance - route.distance)
		let sumOfFitness = fitnessArray.reduce((e1, e2) => e1 + e2)
		let num = ceil(routeNumber * matingPoolFraction)
		let distanceBetweenPointers = sumOfFitness / num;
		let start = random(distanceBetweenPointers)

		let pointers = []
		for (let i = 0; i < num; i++) {
			pointers[i] = start + i * distanceBetweenPointers
		}

		return this.rouletteWheelSelection2(array, pointers, fitnessArray)
	}

	static rouletteWheelSelection2(array, points, fitnessArray) {
		let keep = []
		for (let point in points) {
			let i = 0
			let sum = 0
			while (sum < point) {
				sum += fitnessArray[i]
				i++
			}
			keep.push(array[i])
		}
		return keep
	}

	static tournamentSelection(routes){
		let keep = []
		console.log(( matingPoolFraction))
		for (let i = 0; i < ceil(routeNumber * matingPoolFraction); i++) {
			let sum = 0;
			let i = 0;
			while(sum < random()){
				sum += tournamentProbability*pow((1-tournamentProbability), i)
				i++
			}
			keep.push(routes[i-1])
		}
		return keep
	}
}