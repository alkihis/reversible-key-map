"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Map using a couple of keys to reference a value.
 * You can get a map of values using ONE key,
 * and a value using TWO keys.
 *
 * Key order is not important.
 *
 * @export
 * @class ReversibleKeyMap
 * @template K
 * @template T
 */
class ReversibleKeyMap {
    /**
     * Creates an instance of ReversibleKeyMap.
     * You can give an iterable providing a tuple containaing a tuple of two keys
     * and one value to initialize the instance.
     *
     * @param {Iterable<[[K, K], T]>} [it]
     * @memberof ReversibleKeyMap
     */
    constructor(it) {
        this.map = new Map;
        if (it) {
            for (const [keys, value] of it) {
                // @ts-ignore
                this.set(keys[0], keys[1], value);
            }
        }
    }
    /**
     * Give all keys and values mapped to k1.
     * Results are returned wrapped into a Map object.
     *
     * @param {K1 | K2} k1
     * @returns {Map<K1 | K2, T> | undefined}
     * @memberof ReversibleKeyMap
     */
    getAllFrom(k1) {
        return this.map.get(k1);
    }
    /**
     * Get one value according to a couple of keys.
     * Order of keys does NOT have any influence.
     *
     * @param {K1 | K2} k1
     * @param {K1 | K2} k2z
     * @returns {T | undefined}
     * @memberof ReversibleKeyMap
     */
    get(k1, k2) {
        return this.map.has(k1) ? this.map.get(k1).get(k2) : undefined;
    }
    /**
     * Set one value according to two keys.
     *
     * @param {K1 | K2} k1
     * @param {K1 | K2} k2
     * @param {T} value
     * @returns {this} Current instance.
     * @memberof ReversibleKeyMap
     */
    set(k1, k2, value) {
        if (this.map.has(k1)) {
            this.map.get(k1).set(k2, value);
        }
        else {
            this.map.set(k1, new Map([
                [k2, value]
            ]));
        }
        if (this.map.has(k2)) {
            this.map.get(k2).set(k1, value);
        }
        else {
            this.map.set(k2, new Map([
                [k1, value]
            ]));
        }
        return this;
    }
    /**
     * Return true if key k1 is present.
     *
     * @param {K1 | K2} k1
     * @returns {boolean}
     * @memberof ReversibleKeyMap
     */
    has(k1) {
        return this.map.has(k1);
    }
    /**
     * Return true if couple [k1, k2] is present.
     *
     * @param {K1 | K2} k1
     * @param {K1 | K2} k2
     * @returns {boolean}
     * @memberof ReversibleKeyMap
     */
    hasCouple(k1, k2) {
        if (this.map.has(k1)) {
            return this.map.get(k1).has(k2);
        }
        return false;
    }
    /**
     * Delete all existing values in current instance.
     *
     * @memberof ReversibleKeyMap
     */
    clear() {
        this.map.clear();
    }
    /**
     * Delete everythinh linked to key k1.
     *
     * @param {K1 | K2} k1
     * @returns {this}
     * @memberof ReversibleKeyMap
     */
    deleteAllFrom(k1) {
        if (this.has(k1)) {
            for (const [key,] of this.getAllFrom(k1)) {
                this.delete(k1, key);
            }
        }
        return this;
    }
    /**
     * Delete a double key pair.
     *
     * @param {K1 | K2} k1
     * @param {K1 | K2} k2
     * @returns {this}
     * @memberof ReversibleKeyMap
     */
    delete(k1, k2) {
        if (this.hasCouple(k1, k2)) {
            const k1map = this.map.get(k1);
            k1map.delete(k2);
            if (k1map.size === 0) {
                this.map.delete(k1);
            }
            const k2map = this.map.get(k2);
            k2map.delete(k1);
            if (k2map.size === 0) {
                this.map.delete(k2);
            }
        }
        return this;
    }
    *entries() {
        // Enregistre les couples déjà visités
        const couples = new Map();
        for (const [key1, map] of this.map.entries()) {
            if (!couples.has(key1)) {
                couples.set(key1, new Set);
            }
            const k1set = couples.get(key1);
            for (const [key2, value] of map.entries()) {
                // Crée le set pour key2
                if (!couples.has(key2)) {
                    couples.set(key2, new Set);
                }
                // Vérifie si k1set contient key2
                if (!k1set.has(key2)) {
                    yield [[key1, key2], value];
                }
                // Enregistre les opérations
                k1set.add(key2);
                couples.get(key2).add(key1);
            }
        }
    }
    /**
     * Apply function `callback` for each `[key1, key2] => value` pair in ReversibleKeyMap object.
     * Insertion order / key order is not guaranteed. If `thisArg` is provided,
     * it will be used as `this` value for each callback call.
     *
     * @template This
     * @param {(this: This, keys: [K1 | K2, K1 | K2], value: T) => void} callback
     * @param {This} [thisArg]
     * @memberof ReversibleKeyMap
     */
    forEach(callback, thisArg) {
        for (const [keys, value] of this) {
            callback.call(thisArg, keys, value);
        }
    }
    /**
     * Get all keys existing in double key map.
     * Do **NOT** return key couples, see `keysCouples` method.
     *
     * @returns {IterableIterator<K1 | K2>}
     * @memberof ReversibleKeyMap
     */
    keys() {
        return this.map.keys();
    }
    /**
     * Get existing key couples in double key maps.
     *
     * @memberof ReversibleKeyMap
     */
    *keysCouples() {
        for (const [keys,] of this) {
            yield keys;
        }
    }
    /**
     * Get each value inside map.
     *
     * @memberof ReversibleKeyMap
     */
    *values() {
        for (const [, value] of this) {
            yield value;
        }
    }
    *[Symbol.iterator]() {
        yield* this.entries();
    }
    /**
     * Get map size using the KEYS. Warning, it count EVERY key.
     * It means that one `set("a", "b", val)` will produce a result of `2`.
     * 0(1) complexity.
     *
     * @readonly
     * @memberof ReversibleKeyMap
     */
    get size() {
        return this.map.size;
    }
    /**
     * Get map size using the VALUES.
     * Warning, it have O(n) complexity.
     *
     * @readonly
     * @memberof ReversibleKeyMap
     */
    get count() {
        return [...this.values()].length;
    }
    get [Symbol.toStringTag]() {
        return "ReversibleKeyMap";
    }
}
exports.default = ReversibleKeyMap;
