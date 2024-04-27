class Node{
  constructor(val){
    this.val = val;
    this.next = null;
  }
}

class LinkedList{
  constructor(vals=[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    
    for (let val of vals) {
      this.push(val);
    }
  }
  //  ================================================================
  //    CALLBACK METHODS
  //  ================================================================
  
  getNodeId(id) {
    // starts at the beginning of the list, compares 'id' to 'count'
    //    if id !== count, go to the next node, increment count
    //    when id === count, 'current' is given the 'id' value
    let current = this.head;
    let count = 0;
    
    while (current !== null && count !== id) {
      count += 1;
      current = current.next;
    }
    return current
  }
  
  removeAt(id) {
    //  If the id is more than the amount of nodes or less than 0, it's invalid
    if (id >= this.length || id < 0) {
      throw new Error("Index is out of list range")
    }
    
    //  Replaces the head with the next node in sequence, returns that value
    if (id === 0) {
      let nodeVal = this.head.val;
      this.head = this.head.next;
      
      //  If this leaves the list with only one node, this is both the head and tail
      if (this.length < 2) {
        this.tail = this.head;
      }
      
      this.length -= 1;
      
      return nodeVal
    }
    
    //  All non-head nodes will need to have the node before it updated to reflect their absence
    let previous = this.getNodeId(id - 1)
    
    //  Removes the tail node
    if (id === this.length - 1) {
      let nodeVal = previous.next.val;
      previous.next = null;
      this.tail = previous;
      this.length -= 1;
      return nodeVal
    }
    
    //  If the node is not a special case (middle of the list)
    let nodeVal = previous.next.val;
    //  The node before the deleted node needs an updated 'next' value
    //    The node after the deleted node takes its place
    previous.next = previous.next.next;
    this.length -= 1;
    return nodeVal
  }
  
  getAt(id) {
    if (id >= this.length || id < 0) {
      throw new Error("Index is out of list range")
    }
    
    return this.getNodeId(id).val;
  }
  
  //  ================================================================
  //    TESING METHODS
  //  ================================================================
  
  printAll() {
    let current = this.head;
    
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }
  
  //  ================================================================
  //    MAIN METHODS
  //  ================================================================
  
  push(value) {
    let newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    }else{
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length += 1;
  }
  
  unshift(value) {
    let newNode = new Node(value);
    
    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
    }else{
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length += 1;
  }
  
  pop() {
    return this.removeAt(this.length -1)
  }
  
  shift() {
    return this.removeAt(0)
  }
  
  setAt(id, value) {
    if (id >= this.length || id < 0) {
      throw new Error("Index is out of list range")
    }
    
    let current = this.getNodeId(id);
    current.val = value;
  }
  
  insertAt(id, value) {
    if (id > this.length || id < 0) {
      throw new Error("Index is out of list range")
    }
    
    //  calls back on unshift or pop for head or tail
    if (id === 0) {
      return this.unshift(value)
    }
    if (id === this.length) {
      return this.push(value)
    }
    
    //  Finds the nodes at the id before and after the target index and updates the 'next' attributes
    let previous = this.getNodeId(id - 1);
    
    let newNode = new Node(value);
    newNode.next = previous.next;
    previous.next = newNode;
    
    this.length += 1;
  }
  
  clearList() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

const linkedList = new LinkedList();

linkedList.push(2)
linkedList.push(3)
linkedList.push(4)
linkedList.unshift(1)
linkedList.unshift(0)