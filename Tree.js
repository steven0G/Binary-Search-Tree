import { Node } from "./Node.js";

function Tree(array) {
    const filteredAndSortedArr = [...new Set(array)].sort((a,b) => a-b);

    const buildTree = (array, start,end) => {
        
        if (start > end) return null;
        let mid = Math.floor((start + end)/2);
        let root = Node(array[mid]);

        root.left = buildTree(array, start, mid-1);
        root.right = buildTree(array, mid+1, end);

        return root;
    };
     
    let root = buildTree(filteredAndSortedArr, 0, filteredAndSortedArr.length - 1);

    const includes = (value) => {
        const array = []
        levelOrderForEach((item) => {
            array.push(item);
        });

        const filtered = array.filter(item => item == value);
        if (filtered.length == 0) return false
        else return true;
        
    };
    
    const insert = (value, node=root) => {
      if (includes(value)) {
        return;
      }
       
       if (node == null) {
        return Node(value);
       } 

       if (value < node.value) {
         node.left = insert(value, node.left);
       } else {
         node.right = insert(value, node.right);
       }
     
       
       return node;

    };
    const getSuccessor = (curr) => {
        curr = curr.right;
        while (curr !== null && curr.left !== null) {
            curr = curr.left;
        }
        return curr;
    }

    const deleteItem = (value, node=root) => {
   

    if (node == null) {
        return node;
    }

    if (value == node.value) {
        if (node.right !== null && node.left !== null) {
            let succ = getSuccessor(node);
            node.value = succ.value;
            node.right = deleteItem(succ.value, node.right);
            return node;


        }
        if (node.left !== null) {
        
            return node.left;
        
        } if (node.right !== null) {
            return node.right;
        } 

        return null;

    }


    if (value > node.value) {
        node.right = deleteItem(value, node.right);
    } else {
        node.left = deleteItem(value, node.left);
    }

    return node;
    
    };



    const levelOrderForEach = (callback) => {
        const node = root;
        const queue = [];
        if (callback == undefined) {
            throw Error("callback is required");
        }
        if (callback == null) {
            return;
        }
        queue.push(node);

        while (queue.length > 0) {
            const curr = queue[0];
            if (curr.left !== null) {
                queue.push(curr.left);
            }
            if (curr.right !== null) {
                queue.push(curr.right);
            }
            callback(curr.value);
            queue.shift();
        }
    }

    const preOrderForEach = (callback, node=root) => {
        if (callback == undefined) {
            throw Error("callback is required");
        }
        if (node == null) {
            return;
        } else {
            callback(node.value);
            preOrderForEach(callback, node.left);
            preOrderForEach(callback, node.right);
             
            
        }
        
        
    };

    const inOrderForEach = (callback, node=root) => {
         if (callback == undefined) {
            throw Error("callback is required");
        }
        if (node == null) {
            return;
        } else {
            
            inOrderForEach(callback, node.left);
            callback(node.value);
            inOrderForEach(callback, node.right);
             
            
        }

    };
    const postOrderForEach = (callback, node=root) => {
        if (callback == undefined) {
            throw Error("callback is required");
        }
        if (node == null) {
            return;
        } else {
            
            postOrderForEach(callback, node.left);
            postOrderForEach(callback, node.right);
            callback(node.value);
            
        }


    };

    const find = (value, node=root) => {
   

        if (node == null) {
            return;
        } 
        if (node.value == value) {
            return node;
         }
        if (value > node.value && node.right !== null) {
            return  find(value, node.right);
        } 
        if (value < node.value && node.left !== null) {
            return find(value, node.left);
        }
      
       
    }
    const height = (value) => {
       
         let currentNode = find(value);
         
         let left = 0;  
         let right = 0;
         let longest = 0;
         if (currentNode == null) {
            return longest;
         }
         if (!currentNode) {
            return undefined;
         }
     
         if (currentNode.left !== null) {
                 left = height(currentNode.left.value);
               
                 left++;
                } 
         if (currentNode.right !== null) {
                  right = height(currentNode.right.value);
            
                  right++;
            }

        if (left > right) {
                longest = left;
            }  
        else {
                longest = right;
            }
          

         return longest;
           
    };

    const depth = (value, node=root) => {
        /* 
        if (value is smaller than root node)
        then go to the left add++

        if value is greater than root
        then go to the right;
        then add++;
        1
            2
                3
            4       5
        6   7
        
        */

        let count = 0;
        let found = includes(value);
      
        if (!found) {
            return undefined;
        }

        if (node == null) {
            return count;
        } 
        while (node !== null) {
        
            if (node.value == value) {
                break;
            } 
            
            if (node.value > value) {
                node = node.left;
                count++;
            } if (node.value < value) {
                node = node.right;
                count++;
            }
            
        }
        return count;
        
        
    };
    const isBalanced = (node=root) => {


       let balanced = true;
       let leftHeight = 0;
       let rightHeight = 0;
       let left = true;
       let right = true;

       if (node == null) {
        return balanced
       } 
       if (node.left !== null && node.right !== null) {
            leftHeight = height(node.left.value);
            rightHeight = height(node.right.value);
       }   
       if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
       }
       if (node.left !== null) {
            left = isBalanced(node.left);
            leftHeight = height(node.value);
       } 
       if (node.right !== null) {
            right = isBalanced(node.right);
            rightHeight = height(node.value);
       }
       
       balanced = left && right;
       return balanced;

    

    };

    const rebalance = () => {
      
        const newTree = [];
        inOrderForEach((item) => {
            newTree.push(item);
        });
        root = buildTree(newTree, 0, newTree.length -1);

        return root;
    }
    return { root, insert, deleteItem, includes, find, levelOrderForEach, preOrderForEach, inOrderForEach, postOrderForEach, height, depth, isBalanced, rebalance};
}

export { Tree };
