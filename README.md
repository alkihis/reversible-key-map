# ReversibleKeyMap

> A `Map` extended call with support of two keys instead of one, the support of O(1) access to data linked to one of the two keys, with a non-relevant key order.

One `ReversibleKeyMap` object takes two keys in argument when setting a value. Keys are reversible: Order of the two keys is not relevant.
You can also access data stored under one key (in the form of a map storing a `key => value` data) in a constant time.

> This documentation will use TypeScript typing. Remove any type to restore "pure" JavaScript.

## Getting started

```ts
// With a standard Map
const classic_map = new Map<string, string>();
classic_map.set('classic', 'map');

// <type_key1, type_key2, type_value>
const reversible_map = new ReversibleKeyMap<string, number, string[]>();
reversible_map.set('one', 2, ['value', 'other']);

// Key order is not important
reversible_map.set(3, 'four', ['my_values', 'in_this_array']);

reversible_map.get(3, 'four'); // => ['my_values', 'in_this_array']
reversible_map.get('four', 3); // => ['my_values', 'in_this_array']
reversible_map.get(2, 'one'); // => ['value', 'other']
```

Keys can be of any type (like in the `Map` object).

```ts
const other_map = new ReversibleKeyMap<HTMLElement, HTMLElement, Function>();
other_map.set(document.getElementById('hello'), document.getElementById('other-click'), myEventListener);
```

The number of keys allowed is unlimited and their order is not relevant.

To install the package, use:
```bah
$ npm install reversible-key-map
```


## Usage

Main methods are `get`, `set`, `getAllFrom`, `has` and `hasCouple`.

### Instanciation
```ts
import ReversibleKeyMap from 'reversible-key-map';

const map = new ReversibleKeyMap<string, string, number>();
// You can instanciate with an entries array
const from_it = new ReversibleKeyMap([ [['Hello', 'world'], 3], [['Second', 'value'], 5] ]);
```

### Set values
```ts
map.set("one", "two", 3);
map.set("four", "one", 5);
map.set("six", "seven", 8);
// Setters are chainable
map.set("nine", "ten", 11).set("twelve", "thirteen", 14);
```

### Get values
```ts
map.get("two", "one"); // => 3
map.get("four", "one"); // => 5
map.get("six", "one"); // => undefined
// You can all values linked to one key
map.getAllFrom("one"); // => Map(2) {"two" => 3, "four" => 5}
```

### Iteration

Iteration through `.entries()`, `Symbol.iterator`, `.values()`, `.keysCouple()` ensure that getting a value with those methods will not give you duplicates.

With `.keys()`, a call to `.getAllFrom(key)` within the loop will give you the same value **twice**.

```ts
/// Iterate through the map
const entries = Array.from(map.entries() /* map.entries() is a generator */);
// Using Symbol.iterator | .entries()
for (const [keys, value] of map) {
    // ["one", "two"], 3
    // ["one", "four"], 5
    // ["six", "seven"], 8
    // ["nine", "ten"], 11
    // ["twelve", "thirteen"], 14
}

// Iterate through values only
for (const value of map.values()) {
    // 3
    // 5
    // 8
    // 11
    // 14
}

// Iterate through keys couples only
for (const keys of map.keysCouples()) {
    // ["one", "two"]
    // ["one", "four"]
    // ["six", "seven"]
    // ["nine", "ten"]
    // ["twelve", "thirteen"]
    const value = map.get(...keys);
    // use value or keys...
}

// Iterate through keys
for (const key of map.keys()) {
    // one
    // two
    // four
    // six
    // seven
    // nine
    // ten
    // twelve
    // thirteen
    const linked_maps = map.getAllFrom(key);
}
```

### Appartenance
```ts
map.hasCouple("one", "two"); // => true
map.hasCouple("six", "one"); // => false
// Test if one key exists
map.has("one"); // => true
map.has("hello"); // => false
```

### Delete values
```ts
/// Delete values
map.delete("one", "two"); // Deletions are also chainable.
// Delete all values linked to one key
map.deleteAllFrom("one");

console.log(...map); // [["six", "seven"], 8]  [["nine", "ten"], 11]  [["twelve", "thirteen"], 14]
```

# Full reference: ReversibleKeyMap

Map using a couple of keys to reference a value. You can get a map of values using ONE key, and a value using TWO keys.

Key order is not important.

## Index

### Constructors

* [constructor](README.md#constructor)

### Properties

* [map](README.md#map)

### Accessors

* [__@toStringTag](README.md#___tostringtag)
* [count](README.md#count)
* [size](README.md#size)

### Methods

* [__@iterator](README.md#___iterator)
* [clear](README.md#clear)
* [delete](README.md#delete)
* [deleteAllFrom](README.md#deleteallfrom)
* [entries](README.md#entries)
* [forEach](README.md#foreach)
* [get](README.md#get)
* [getAllFrom](README.md#getallfrom)
* [has](README.md#has)
* [hasCouple](README.md#hascouple)
* [keys](README.md#keys)
* [keysCouples](README.md#keyscouples)
* [set](README.md#set)
* [values](README.md#values)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ReversibleKeyMap**(it?: *`Iterable`<[[`K1`, `K2`], `T`]>*): [ReversibleKeyMap](README.md)

⊕ **new ReversibleKeyMap**(it?: *`Iterable`<[[`K2`, `K1`], `T`]>*): [ReversibleKeyMap](README.md)

Creates an instance of ReversibleKeyMap. You can give an iterable providing a tuple containaing a tuple of two keys and one value to initialize the instance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` it | `Iterable`<[[`K1`, `K2`], `T`]> |

**Returns:** [ReversibleKeyMap](README.md)

___

## Properties

<a id="map"></a>

### `<Protected>` map

**● map**: *`Map`<`K1` \| `K2`, `Map`<`K1` \| `K2`, `T`>>* =  new Map

___

## Accessors

<a id="___tostringtag"></a>

###  __@toStringTag

**get __@toStringTag**(): `string`

**Returns:** `string`

___
<a id="count"></a>

###  count

**get count**(): `number`

Get map size using the VALUES. Warning, it have O(n) complexity.

*__readonly__*: 

**Returns:** `number`

___
<a id="size"></a>

###  size

**get size**(): `number`

Get map size using the KEYS. Warning, it count EVERY key. It means that one `set("a", "b", val)` will produce a result of `2`. 0(1) complexity.

*__readonly__*: 

**Returns:** `number`

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(): `IterableIterator`<[[`K1` \| `K2`, `K1` \| `K2`], `T`]>

**Returns:** `IterableIterator`<[[`K1` \| `K2`, `K1` \| `K2`], `T`]>

___
<a id="clear"></a>

###  clear

▸ **clear**(): `void`

Delete all existing values in current instance.

**Returns:** `void`

___
<a id="delete"></a>

###  delete

▸ **delete**(k1: *`K1`*, k2: *`K2`*): `this`

▸ **delete**(k1: *`K2`*, k2: *`K1`*): `this`

Delete a double key pair.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` |  \- |
| k2 | `K2` |  \- |

**Returns:** `this`

___
<a id="deleteallfrom"></a>

###  deleteAllFrom

▸ **deleteAllFrom**(k1: *`K1` \| `K2`*): `this`

Delete everything linked to key k1.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` \| `K2` |  \- |

**Returns:** `this`

___
<a id="entries"></a>

###  entries

▸ **entries**(): `IterableIterator`<[[`K1` \| `K2`, `K1` \| `K2`], `T`]>

**Returns:** `IterableIterator`<[[`K1` \| `K2`, `K1` \| `K2`], `T`]>

___
<a id="foreach"></a>

###  forEach

▸ **forEach**<`This`>(callback: *`function`*, thisArg?: *`This`*): `void`

Apply function `callback` for each `[key1, key2] => value` pair in ReversibleKeyMap object. Insertion order / key order is not guaranteed. If `thisArg` is provided, it will be used as `this` value for each callback call.

*__template__*: This

**Type parameters:**

#### This 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callback | `function` |  \- |
| `Optional` thisArg | `This` |

**Returns:** `void`

___
<a id="get"></a>

###  get

▸ **get**(k1: *`K1`*, k2: *`K2`*): `T`

▸ **get**(k1: *`K2`*, k2: *`K1`*): `T`

Get one value according to a couple of keys. Order of keys does NOT have any influence.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` |  \- |
| k2 | `K2` |

**Returns:** `T`

___
<a id="getallfrom"></a>

###  getAllFrom

▸ **getAllFrom**(k1: *`K1`*): `Map`<`K2`, `T`>

▸ **getAllFrom**(k1: *`K2`*): `Map`<`K1`, `T`>

Give all keys and values mapped to k1. Results are returned wrapped into a Map object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` |  \- |

**Returns:** `Map`<`K2`, `T`>

___
<a id="has"></a>

###  has

▸ **has**(k1: *`K1` \| `K2`*): `boolean`

Return true if key k1 is present.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` \| `K2` |  \- |

**Returns:** `boolean`

___
<a id="hascouple"></a>

###  hasCouple

▸ **hasCouple**(k1: *`K1`*, k2: *`K2`*): `boolean`

▸ **hasCouple**(k1: *`K2`*, k2: *`K1`*): `boolean`

Return true if couple \[k1, k2\] is present.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` |  \- |
| k2 | `K2` |  \- |

**Returns:** `boolean`

___
<a id="keys"></a>

###  keys

▸ **keys**(): `IterableIterator`<`K1` \| `K2`>

Get all keys existing in double key map. Do **NOT** return key couples, see `keysCouples` method.

**Returns:** `IterableIterator`<`K1` \| `K2`>

___
<a id="keyscouples"></a>

###  keysCouples

▸ **keysCouples**(): `IterableIterator`<[`K1` \| `K2`, `K1` \| `K2`]>

Get existing key couples in double key maps.

**Returns:** `IterableIterator`<[`K1` \| `K2`, `K1` \| `K2`]>

___
<a id="set"></a>

###  set

▸ **set**(k1: *`K1`*, k2: *`K2`*, value: *`T`*): `this`

▸ **set**(k1: *`K2`*, k2: *`K1`*, value: *`T`*): `this`

Set one value according to two keys.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| k1 | `K1` |  \- |
| k2 | `K2` |  \- |
| value | `T` |  \- |

**Returns:** `this`
Current instance.

___
<a id="values"></a>

###  values

▸ **values**(): `IterableIterator`<`T`>

Get each value inside map.

**Returns:** `IterableIterator`<`T`>

___

