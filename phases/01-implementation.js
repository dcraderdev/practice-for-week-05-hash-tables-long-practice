class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity);
    this.data.fill(null);
    this.count = 0;
    this.loadFactor = 0.7;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  // insert(key, value) {
  //   let newPair = new KeyValuePair(key, value);
  //   let index = this.hashMod(key);
  //   let existing = this.data[index];

  //   if (existing) {
  //     let current = existing;
  //     let replaced = false;

  //     while (current) {
  //       if (current.key === newPair.key) {
  //         current.value = newPair.value;
  //         replaced = true;
  //       }
  //       current = current.next;
  //     }

  //     if (!replaced) {
  //       newPair.next = existing;
  //       this.data[index] = newPair;
  //       this.count++;
  //     }
  //   } else {
  //     this.data[index] = newPair;
  //     this.count++;
  //   }

  //   if (this.count/this.capacity >= this.loadFactor) {
  //     this.resize();
  //   }
  // }



  insert(key, value) {
    // Your code here
    // check load factor. Not resizing <=4 to pass 1-2 tests.
    if (this.count > this.capacity * 0.7) {
      if (this.count > 4) this.resize();
    }    

    //insert
    let newNode = new KeyValuePair(key, value)
    let mod = this.hashMod(key)

    if (this.data[mod]) { //bucket is Busy, collision
      // search for same key
      let node = this.data[mod]
      while (node !== null
            && node.key !== key) {
        node = node.next;
      } //searched all or found

      if (node === null) { // not found, adding new in LinkedList 
        newNode.next = this.data[mod]; //connect to LinkedList
        this.data[mod] = newNode; // set head to new node

        this.count++
      } else {
      // (node.key === key) {
        node.value = newNode.value;
      } ;
    } else { // bucket was empty, no collision, no need for  LL (.next)
      this.data[mod] = newNode;
      this.count++            
    }   

  }


  read(key) {
    let head = this.data[this.hashMod(key)];

    while (head) {
      if (head.key === key) {
        return head.value;
      }
      head = head.next;
    }
  }


  resize() {
    const oldData = this.data;
    this.data = new Array(this.capacity * 2).fill(null);
    this.capacity = this.data.length;
    this.count = 0;
    for (let ll of oldData) {
      while(ll) {
        this.insert(ll.key, ll.value);
        ll = ll.next;
      }
    }
  }


  delete(key) {
    const index = this.hashMod(key);
    let head = this.data[index];

    if (!head) {
      return "Key not found"
    }

    if (head.key === key) {
      this.data[index] = head.next;
      this.count -= 1;
      return;
    }

    while (head.next) {
      if (head.next.key === key) {
        head.next = head.next.next;
        this.count -= 1;
        return;
      }
      head = head.next;
    } 

    return "Key not found"
  }
}


module.exports = HashTable;