class Point {
	constructor(width, height){
		this.x = width;
		this.y = height;
	}

	display(){
		stroke(255)
		strokeWeight(7)
		point(this.x, this.y);
	}
}