class Crossover {
	static partiallyMappedCrossover(p1, p2) {
		//Choose a random sub-sequence from P1 and copy it to F1:
		let f1 = new Array(p1.length)
		let subsequenceLength = floor(random(3, 8))
		let subsequenceIndex = floor(random(0, 4))

		for (let i = 0; i < subsequenceLength; i++) {
			f1[subsequenceIndex + i] = p1[subsequenceIndex + i];
		}

		//left part of the subsequence
		for (let i = 0; i < subsequenceIndex; i++) {
			let element = p2[i]
			while (f1.includes(element)) {
				element = p2[p1.indexOf(element)]
			}
			f1[i] = element
		}

		//right part of the subsequence
		for (let i = subsequenceIndex + subsequenceLength; i < f1.length; i++) {
			let element = p2[i]
			while (f1.includes(element)) {
				element = p2[p1.indexOf(element)]
			}
			f1[i] = element
		}

		return f1;
	}

	static orderCrossover(p1, p2) {
		//Choose a random sub-sequence from P1 and copy it to F1:
		let f1 = new Array(p1.length)
		let subsequenceLength = floor(random(3, 8))
		let subsequenceIndex = floor(random(0, 4))
		subsequenceIndex = 1
		subsequenceLength = 5

		for (let i = 0; i < subsequenceLength; i++) {
			f1[subsequenceIndex + i] = p1[subsequenceIndex + i];
		}

		//adding the rest of p2
		let index = subsequenceIndex + subsequenceLength
		for (let i = 0; i < f1.length; i++) {
			let index2 = subsequenceIndex + subsequenceLength + i;
			if (!f1.includes(p2[index2 % f1.length])) {
				f1[index % f1.length] = p2[index2 % f1.length]
				index += 1
			}
		}
		return f1;
	}

	static cycleCrossover(p1, p2) {
		let firstElement = p1[0];
		let element = p2[0]
		let f1 = new Array(p1.length)

		//first step always happens
		f1[0] = p1[0]
		while (firstElement != element) {
			let index = p1.indexOf(element)
			f1[index] = p1[index]
			//this the next element
			element = p2[index]
		}

		//next is fill in remaining holes with p2
		for (let i = 0; i < p2.length; i++) {
			if (!f1.includes[p2[i]]) {
				f1[i] = p2[i]
			}
		}
		return(f1)
	}
}

