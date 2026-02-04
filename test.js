import { Tree } from "./Tree.js";

function generateArray() {
    const array = [];

    for (let i = 0; i < 8; i++) {
        array.push(Math.floor(Math.random() * 200));
    }

    return array;
}


/*
            30
    12              90

  10   20       40      402
                            1002

*/


const test = Tree(generateArray());

console.log(test.isBalanced());
test.levelOrderForEach((item) => {
    console.log(item);
}
);
test.preOrderForEach((item) => {
    console.log(item);
});
test.inOrderForEach((item) => {
    console.log(item);
});

test.postOrderForEach((item) => {
    console.log(item);
});


test.insert(300);
test.insert(250);
test.insert(172);
test.insert(192);
console.log(test.isBalanced());
test.rebalance();

console.log(test.isBalanced());
test.levelOrderForEach((item) => {
    console.log(test.depth(item), test.height(item));
    console.log(item);
}
);
test.preOrderForEach((item) => {
    console.log(item);
});
test.inOrderForEach((item) => {
    console.log(item);
});

test.postOrderForEach((item) => {
    console.log(item);
});
