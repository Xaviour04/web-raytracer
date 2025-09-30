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
    sub(other: Vec3): Vec3 {
        return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    /**
     * Computes `this + other` and returns new vector
     */
    add(other: Vec3) : Vec3 {
        return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    /**
     * Computes `this * scalar` and returns new vector
     */
    mul(scalar: number): Vec3 {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    /**
     * Computes `this / scalar` and returns new vector
     */
    div(scalar: number): Vec3 {
        return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar);
    }

    /**
     * Computes and returns the magnitude/length squared of the vector
     */
    mag_sqaured(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * Computes and returns the magnitude/length of the vector
     */
    mag(): number {
        return Math.sqrt(this.mag_sqaured());
    }

    /**
     * Computes the dot product of the vectors and returns new vector
     */
    dot(other: Vec3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    /**
     * Computes the cross product of the vectors and returns new vector
     */
    cross(other: Vec3): Vec3 {
        return new Vec3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    /**
     * Computes and returns the unit vector
     */
    unit(): Vec3 {
        return this.div(this.mag());
    }

    clone(): Vec3 {
        return new Vec3(this.x, this.y, this.z);
    }
}

export function color(r: number, g: number, b: number): Vec3 {
    return new Vec3(r, g, b);
}

export function point(x: number, y: number, z: number): Vec3 {
    return new Vec3(x, y, z);
}