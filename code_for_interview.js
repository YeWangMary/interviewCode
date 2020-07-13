/*
author: Ye Wang
date: 7/12/2020
description: This program creates a class of Cards, then plays a point 24 game.
 */


class Cards {
    /*
    Constructor for Cards class:
    on initialization, the constructor will initialize the cards property, and push 52 cards into it.
    There are totally 4 suits: 's' for spades, 'd' for diamonds, 'h' for hearts, 'c' for clubs.
    There are totally 13 values in each suits: 2 to 10, and j, q, k, A.
    Each card is represented by a string of two characters, the first one is for the suit and the second one is for the value.
     */
    constructor(){
        this.cards = [];
        const suits = ['s', 'd', 'h', 'c'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
        for(let i = 0; i < suits.length; i++){
            for(let j = 0; j < values.length; j++){
                this.cards.push(suits[i]+values[j]);
            }
        }

    }

    /*
    Method to shuffle the cards into random order:
    this function will loop through this.cards array. At each position, generate a random number in the range of 0 to 51,
    swap the element at current position with the one at the index of the random number.
    Time complexity: O(n),
    Space complexity: O(1).
     */
    shuffleCards() {
        for(let i = 0; i < this.cards.length; i++){
            const rand = Math.floor(Math.random() * 52);
            const temp = this.cards[i];
            this.cards[i] = this.cards[rand];
            this.cards[rand] = temp;
        }

    }

    /*
    Method to return the card on the top of the deck of cards:
    The last element on the array is popped out and returned.
     */
    drawCards(){
        return this.cards.pop();
     }
}



/*
functions to play a game of point 24:
description:
1. initialize a new Cards object
2. shuffle the cards
3. draw four cards with values between 1 to 9
4. calculate the four values with operations of +, -, *, /. each value can only be used once
and every value has to be used. determine if we can get 24 from the four values.

my solution for this problem:
This problem can be represented as a sequence of XyXyXyX, X is for the four values and y is for the operations.
we want to try all the possible sequences for this XyXyXyX to know if we can get a result of 24.
The algorithm is, firstly, generate all the permutations for the four values(represented by X), and then
for each permutation, we apply all the combinations of the operations at the three positions represented by y
in XyXyXyX. This will give us all the possible ways to calculate.
This algorithm is exhaustive because that:
if we try all the combinations of 4 operations at the three positions for one permutation of 4 values, we will
get all the possible ways to calculate the 4 values in a sequential order. But with just one permutation,
we can only calculate them in that sequence and never get some other combinations of the values.
for example: with  8, 5, 3, 1, we can never get the result of, (8 + 3) * 5 + 1.
So we need to get all the permutations of the four values, and then for each of them, apply all the possible combinations
of operations to it, this will give us all the possible ways to calculate the four values with the four operations.
 */



/*Function that generates an array of four card values:
input: an object of Cards as input.
output: array of four integer values.
this function will repeatedly draw a card from the top of the cards until there are
four values within 1 to 9 inclusively in the array and then return the array.
 */

const draw4Cards = function(cards){
    const values = [];
    while(values.length < 4){
        const card = cards.drawCards();
        if(card.charAt(1)<='9'&&card.charAt(1)>='1'){
            values.push(parseInt(card.charAt(1)));
        }
    }
    return values;
}


/*
function to return all the permutations of an array of 4 elements:
input: array of 4 integer values.
output: array of all the permutations of the 4 values.
description: this function will call the helper function to generate all the permutations of
             the input array, and return the result of all permutations.
 */
const generatePermutation = (arr) => {
    let result = [];
    let set = new Set();
    helper([],set, result, arr);
    return result;
}

/*
helper function to generate the permutations of an array of 4 elements:
input: current: the array of the current permutation.
       set: a set of values that has already been added to the current permutation array.
       result: the array that store the final result of all the permutations.
       arr: the original array of the 4 values.
output: no return value.
description: this is a recursive function to generate all the permutations of the original array.
             this function uses a backtracking algorithm. At each index of the permutation, we have four
             choices, they are the four values in the original array. But the values that have been added
             to the current permutation can not be used again. So the search space of all candidate solutions
             is a tree structure. I used a preorder DFS to search the tree, and generate all the permutations.
 */
const helper= (current,set, result, arr) =>{
    if(current.length === 4){        //If the length of the current permutation equals 4, add a copy of it to the final result.
        result.push(current.slice());
    }
    else {
        for(let i =0; i< 4;i++){
            if(set.has(arr[i])){    //when we met a value that has been added, we skip
                continue;
            }
            else {
                current.push(arr[i]); //otherwise, add it to the current permutation.
                set.add(arr[i]);       //add the value to the set.
                helper(current, set ,result, arr);  //proceed to the next index by calling the recursive function.
                set.delete(arr[i]);        //remove the value added at this step and backtrack.
                current.pop();
            }
        }
    }
}

/*
function to return the result of applying all the combinations of operations to one permutation:
input: array of 4 integer values.
output: array of boolean values. Each boolean value represents the result of applying one combination of operations.
description: this function will call the combinationHelper function. The combinationHelper function will apply all the combinations
             of operations to the permutation.
 */
const operatorCombinations = (arr) => {
    let result = [];
    combinationHelper(arr,1,arr[0],result);
    return result;
}


/*
helper function to generate all the combinations of operators:
input: arr: the array of 4 values that represents one permutation of the array.
       steps: integer value that represents how many values we have used.
       preResult: integer value that represents the result of previous calculation.
       booleanResult: array that stores the boolean result of whether the calculation is equal to 24.
output: no return value.
description: This function is similar to the one for permutation above. But not as permutation,
             we don't need a set to check for repetition. At each step, we loop through the four operations,
             apply it to the preResult and current value, then proceed with the updated preResult.



 */
const combinationHelper= (arr, steps, preResult, booleanResult) => {
    if (steps===4){               //base case: if we have calculated 3 steps, we compare the preResult to 24 and store the result in an array.
        let result = preResult ===24;
        booleanResult.push(result);
    }
    else {
        //operations = ['+','-','*','/']. Each operation will be represented by a value of 0 to 3 respectively.
        for (let i = 0; i < 4; i++){
            if(i === 0){                           //0 represents addition.
                preResult += arr[steps];
                combinationHelper(arr, steps+1, preResult, booleanResult); //proceed to next position
                preResult -=arr[steps];                      //remove the value added at this step.
            }
            if(i === 1){
                preResult -=arr[steps];
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult +=arr[steps];
            }
            if(i === 2){
                preResult *=arr[steps];
                //console.log(preResult, i);
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult /=arr[steps];
            }
            if(i === 3){
                preResult /=arr[steps];
                //console.log(preResult, i);
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult *=arr[steps];
            }


        }
    }
}

/*
the function that plays the game automatically.
There are 24 permutations for 4 values, and 4 * 4 * 4 possible combinations of three operators,
so the total number of possible results is 24 * 64 = 1536.
 */
const point24 = () => {
    //initialize a new Cards object.
    const cards = new Cards();

    //Shuffle the cards to a random order.
    cards.shuffleCards();


    //draw four cards from the cards.
    const cardValues = draw4Cards(cards);

    //generate all the permutations of the 4 card values.
    const cardsPermutations = generatePermutation(cardValues);

    let result = false;                         //initialize the final result.
    for(let per of cardsPermutations){
        let calculateResult = operatorCombinations(per);  //for each permutation, get all the result of different combinations of operations.
        for(let res of calculateResult){                  //check if there is a true in all the result.

            if(res){
                result = res;
            }
        }
    }
    console.log(cardValues, result);
}


point24();