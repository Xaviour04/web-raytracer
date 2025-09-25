export default class Vec3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Computes `this - other` and returns new vector
     */
    sub(other: Vec3) {
        return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    /**
     * Computes `this + other` and returns new vector
     */
    add(other: Vec3) {
        return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    /**
     * Computes `this * scalar` and returns new vector
     */
    mul(scalar: number) {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    /**
     * Computes `this / scalar` and returns new vector
     */
    div(scalar: number) {
        return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar);
    }

    /**
     * Computes and returns the magnitude/length squared of the vector
     */
    mag_sqaured() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }


    /**
     * Computes and returns the magnitude/length of the vector
     */
    mag() {
        return Math.sqrt(this.mag_sqaured());
    }


    /**
     * Computes the dot product of the vectors and returns new vector
     */
    dot(other: Vec3) {
        return new Vec3(
            this.x * other.x,
            this.y * other.y,
            this.z * other.z
        );
    }


    /**
     * Computes the cross product of the vectors and returns new vector
     */
    cross(other: Vec3) {
        new Vec3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    /**
     * Computes and returns the unit vector
     */
    unit() {
        return this.div(this.mag());
    }

    clone() {
        return new Vec3(this.x, this.y, this.z);
    }
}