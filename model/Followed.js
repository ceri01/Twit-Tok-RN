class Followed {
    #followed = new Map()

    getImmutableData() {
        return [...this.#followed.values()]; // ... is usefull to create a copy of this.#buffer to prevent direct changest to the data structure
    }

    getLength() {
        return this.#followed.size;
    }

    add(elements) {
        console.log(elements.hasOwnProperty("name") && elements.hasOwnProperty("pversion") && elements.hasOwnProperty("uid"))
        if (elements.hasOwnProperty("name") && elements.hasOwnProperty("pversion") && elements.hasOwnProperty("uid"))
        this.#followed.set(elements.uid, elements);
    }

    remove(uid) {
        this.#followed.delete(uid)
    }
}

export default Followed