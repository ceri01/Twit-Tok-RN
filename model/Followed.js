class Followed {
    #followed = new Map()

    getImmutableData() {
        return [...this.#followed.values()]; // ... is usefull to create a copy of this.#buffer to prevent direct changest to the data structure
    }

    getLength() {
        return this.#followed.size;
    }

    add(uid, element) {
        if (element.hasOwnProperty("name") && element.hasOwnProperty("pversion") && element.hasOwnProperty("uid")) {
            this.#followed.set(uid, element);
        }
    }

    remove(uid) {
        this.#followed.delete(uid)
    }
}

export default Followed