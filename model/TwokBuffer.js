class TwokBuffer {
    #buffer = [];

    getImmutableData() {
        return [...this.#buffer]; // ... is usefull to create a copy of this.#buffer to prevent direct changest to the data structure
    }

    getLength() {
        return this.#buffer.length;
    }

    add(elements) {
        this.#buffer.push(elements);
    }

    reset(elements) {
        this.#buffer = this.#buffer.slice(this.#buffer.length);
        for (let element of elements) {
            this.#buffer.push(element);
        }
    }

    empty() {
        this.#buffer = []
    }
}

export default TwokBuffer;