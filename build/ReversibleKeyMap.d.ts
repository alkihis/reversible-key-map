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
export default class ReversibleKeyMap<K1, K2, T> {
    protected map: Map<K1 | K2, Map<K1 | K2, T>>;
    constructor(it?: Iterable<[[K1, K2], T]>);
    constructor(it?: Iterable<[[K2, K1], T]>);
    getAllFrom(k1: K1): Map<K2, T>;
    getAllFrom(k1: K2): Map<K1, T>;
    get(k1: K1, k2: K2): T;
    get(k1: K2, k2: K1): T;
    set(k1: K1, k2: K2, value: T): this;
    set(k1: K2, k2: K1, value: T): this;
    /**
     * Return true if key k1 is present.
     *
     * @param {K1 | K2} k1
     * @returns {boolean}
     * @memberof ReversibleKeyMap
     */
    has(k1: K1 | K2): boolean;
    hasCouple(k1: K1, k2: K2): boolean;
    hasCouple(k1: K2, k2: K1): boolean;
    /**
     * Delete all existing values in current instance.
     *
     * @memberof ReversibleKeyMap
     */
    clear(): void;
    /**
     * Delete everythinh linked to key k1.
     *
     * @param {K1 | K2} k1
     * @returns {this}
     * @memberof ReversibleKeyMap
     */
    deleteAllFrom(k1: K1 | K2): this;
    delete(k1: K1, k2: K2): this;
    delete(k1: K2, k2: K1): this;
    entries(): IterableIterator<[[K1 | K2, K1 | K2], T]>;
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
    forEach<This>(callback: (this: This, keys: [K1 | K2, K1 | K2], value: T) => void, thisArg?: This): void;
    /**
     * Get all keys existing in double key map.
     * Do **NOT** return key couples, see `keysCouples` method.
     *
     * @returns {IterableIterator<K1 | K2>}
     * @memberof ReversibleKeyMap
     */
    keys(): IterableIterator<K1 | K2>;
    /**
     * Get existing key couples in double key maps.
     *
     * @memberof ReversibleKeyMap
     */
    keysCouples(): IterableIterator<[K1 | K2, K1 | K2]>;
    /**
     * Get each value inside map.
     *
     * @memberof ReversibleKeyMap
     */
    values(): IterableIterator<T>;
    [Symbol.iterator](): IterableIterator<[[K1 | K2, K1 | K2], T]>;
    /**
     * Get map size using the KEYS. Warning, it count EVERY key.
     * It means that one `set("a", "b", val)` will produce a result of `2`.
     * 0(1) complexity.
     *
     * @readonly
     * @memberof ReversibleKeyMap
     */
    readonly size: number;
    /**
     * Get map size using the VALUES.
     * Warning, it have O(n) complexity.
     *
     * @readonly
     * @memberof ReversibleKeyMap
     */
    readonly count: number;
    readonly [Symbol.toStringTag]: string;
}
