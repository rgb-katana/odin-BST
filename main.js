"use strict";

const arr = [1, 2, 3, 4, 5, 6];

// find middle and make it root, then perform the same operation
// on the lft subarray for the roots left child
// the same operation for the right subbarray for root's right child

// Set The middle element of the array as root.
// Recursively do the same for the left half and right half.
// Get the middle of the left half and make it the left child of the root created in step 1.
// Get the middle of the right half and make it the right child of the root created in step 1.

class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

let root = null;

function sortedArrayToBST(arr, start, end) {
  // Base case
  if (start > end) {
    return null;
  }
  /* Get the middle element and make it root */
  const mid = parseInt((start + end) / 2);
  console.log(mid);
  const node = new Node(arr[mid]);
  // Recursively constuct the left subtree and make it left child of root
  node.left = sortedArrayToBST(arr, start, mid - 1);
  // Recursively constuct the right subtree and make it right child of root
  node.right = sortedArrayToBST(arr, mid + 1, end);
  console.log(node);
  return node;
}

const arr1 = [1, 2, 3, 4, 5, 6, 7];
