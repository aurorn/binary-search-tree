// Node class definition
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // Tree class definition
  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      array = [...new Set(array)].sort((a, b) => a - b);
      return this._buildTree(array, 0, array.length - 1);
    }
  
    _buildTree(array, start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
      node.left = this._buildTree(array, start, mid - 1);
      node.right = this._buildTree(array, mid + 1, end);
      return node;
    }
  
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) return;
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  
    insert(value, node = this.root) {
      if (node === null) return new Node(value);
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
      return node;
    }
  
    deleteItem(value, node = this.root) {
      if (node === null) return node;
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        node.data = this._minValue(node.right);
        node.right = this.deleteItem(node.data, node.right);
      }
      return node;
    }
  
    _minValue(node) {
      let min = node.data;
      while (node.left !== null) {
        min = node.left.data;
        node = node.left;
      }
      return min;
    }
  
    find(value, node = this.root) {
      if (node === null || node.data === value) return node;
      if (value < node.data) return this.find(value, node.left);
      return this.find(value, node.right);
    }
  
    levelOrder(callback = null) {
      const result = [];
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        if (callback) callback(node);
        else result.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      return callback ? null : result;
    }
  
    inOrder(callback = null, node = this.root, result = []) {
      if (node !== null) {
        this.inOrder(callback, node.left, result);
        if (callback) callback(node);
        else result.push(node.data);
        this.inOrder(callback, node.right, result);
      }
      return callback ? null : result;
    }
  
    preOrder(callback = null, node = this.root, result = []) {
      if (node !== null) {
        if (callback) callback(node);
        else result.push(node.data);
        this.preOrder(callback, node.left, result);
        this.preOrder(callback, node.right, result);
      }
      return callback ? null : result;
    }
  
    postOrder(callback = null, node = this.root, result = []) {
      if (node !== null) {
        this.postOrder(callback, node.left, result);
        this.postOrder(callback, node.right, result);
        if (callback) callback(node);
        else result.push(node.data);
      }
      return callback ? null : result;
    }
  
    height(node = this.root) {
      if (node === null) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node, current = this.root, depth = 0) {
      if (current === null) return -1;
      if (current === node) return depth;
      const left = this.depth(node, current.left, depth + 1);
      if (left !== -1) return left;
      return this.depth(node, current.right, depth + 1);
    }
  
    isBalanced(node = this.root) {
      if (node === null) return true;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  
    rebalance() {
      const values = this.inOrder();
      this.root = this.buildTree(values);
    }
  
    gatherResults() {
      const results = {};
      results.isBalanced = this.isBalanced();
      results.levelOrder = this.levelOrder();
      results.preOrder = this.preOrder();
      results.postOrder = this.postOrder();
      results.inOrder = this.inOrder();
      return results;
    }
  
    printResults(results) {
      console.log('Is balanced:', results.isBalanced);
      console.log('Level Order:', results.levelOrder);
      console.log('Pre Order:', results.preOrder);
      console.log('Post Order:', results.postOrder);
      console.log('In Order:', results.inOrder);
    }
  }
  
  // Driver script
  const randomArray = (length, max) => 
    Array.from({ length }, () => Math.floor(Math.random() * max));
  
  const bst = new Tree(randomArray(15, 100));
  bst.prettyPrint();
  let results = bst.gatherResults();
  bst.printResults(results);
  
  [101, 102, 103, 104, 105].forEach(num => bst.insert(num));
  bst.prettyPrint();
  results = bst.gatherResults();
  bst.printResults(results);
  
  bst.rebalance();
  bst.prettyPrint();
  results = bst.gatherResults();
  bst.printResults(results);
  