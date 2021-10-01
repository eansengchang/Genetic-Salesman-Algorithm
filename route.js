class Route {
	constructor(route) {
		this.route = route;
		this.calculateDistance();
	}

	display(shortest) {
		stroke(100);
		strokeWeight(1)
		if(shortest){
			stroke(255, 0, 0, 255)
			strokeWeight(2)
		}
		for (let i = 0; i < pointNumber - 1; i++) {
			line(points[this.route[i]].x, points[this.route[i]].y, points[this.route[i+1]].x, points[this.route[i+1]].y)
		}
	}

	calculateDistance(){
		let distance = 0;
		for (let i = 0; i < pointNumber - 1; i++) {
			distance += distanceArray[this.route[i]][this.route[i+1]]
		}
		this.distance = distance
	}
}