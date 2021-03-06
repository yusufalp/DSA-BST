class BinarySearchTrees {
  constructor(key = null, parent = null, value = null) {
    this.key = key;
    this.parent = parent;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value
    }
    /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, 
         meaning that if the `left` pointer is empty, 
         then we can just instantiate and insert the new node 
         as the left child of that node, passing `this` as the parent */
      if (this.left === null) {
        this.left = new BinarySearchTrees(key, value, this)
      }
      /* If the node has an existing left child, 
         then we recursively call the `insert` method 
         so the node is added further down the tree */
      else {
        this.left.insert(key, value)
      }
    }
    /* Similarly, if the new key is greater than the node's key 
       then you do the same thing, but on the right-hand side */
    else {
      if (this.right === null) {
        this.right = new BinarySearchTrees(key, value, this)
      } else {
        this.right.insert(key, value)
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key === key) {
      return this.value
    }
    /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key)
    }
    /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key)
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key not found')
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
         then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left)
      }
      /* And similarly if the node only has a right child 
         then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right)
      }
      /* If the node has no children then
         simply remove it and any references to it 
         by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null)
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function preOrder(node){
  if(!node){
      return;
  }
  console.log(node.value)
  preOrder(node.left);
  preOrder(node.right);
}
// preOrder(root)

function inOrder(node){
  if(!node){
      return;
  }
  inOrder(node.left);
  console.log(node.value)
  inOrder(node.right);
}
// inOrder(root);

function posOrder(node){
  if(!node){
      return;
  }
  posOrder(node.left);
  posOrder(node.right);
  console.log(node.value);
}


// Questions below 


let numTree = new BinarySearchTrees();
numTree.insert(3)
numTree.insert(1)
numTree.insert(4)
numTree.insert(6)
numTree.insert(9)
numTree.insert(2)
numTree.insert(5)
numTree.insert(7)

// console.log(numTree)

let letTree = new BinarySearchTrees();
letTree.insert('E')
letTree.insert('A')
letTree.insert('S')
letTree.insert('Y')
letTree.insert('Q')
letTree.insert('U')
letTree.insert('E')
letTree.insert('S')
letTree.insert('T')
letTree.insert('I')
letTree.insert('O')
letTree.insert('N')

// console.log(letTree)

// numTree.remove(3)
// console.log(numTree)

function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right)
}

// console.log(tree(numTree))

function heightOfTree(tree) {
  if (tree == null) {
    return 0;
  } else {
    /* compute the depth of each subtree */
    let lDepth = heightOfTree(tree.left);
    let rDepth = heightOfTree(tree.right);

    /* use the larger one */
    if (lDepth > rDepth)
      return (lDepth + 1);
    else
      return (rDepth + 1);
  }
}

// console.log(heightOfTree(letTree))
// console.log(heightOfTree(numTree))

let numArr = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22];
let numArrBST = new BinarySearchTrees();
for (let item of numArr){
  numArrBST.insert(item)
}

console.log(numArrBST)
/*
            25
          /    \
        /        \
      15          50
    /    \      /    \
   10     24   35     70
  /  \   /    /  \   /  \ 
 4   12 18   31  44 66  90
          \
           22
*/