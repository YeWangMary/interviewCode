class Cards {


    constructor(){
        this.cards = [];

        for(let i = 2; i <= 10; i++){
            this.cards.push('s'+i);
            this.cards.push('d'+i);
            this.cards.push('h'+i);
            this.cards.push('c'+i);
        }

        this.cards.push('s'+'j');
        this.cards.push('d'+'j');
        this.cards.push('h'+'j');
        this.cards.push('c'+'j');
        this.cards.push('s'+'q');
        this.cards.push('d'+'q');
        this.cards.push('h'+'q');
        this.cards.push('c'+'q');
        this.cards.push('s'+'k');
        this.cards.push('d'+'k');
        this.cards.push('h'+'k');
        this.cards.push('c'+'k');
        //console.log(this.s);
        this.cards.push('s'+'A');
        this.cards.push('d'+'A');
        this.cards.push('h'+'A');
        this.cards.push('c'+'A');
    }
    shuffleCards() {

        //console.log(this.cards);
        for(let i = 0; i < this.cards.length; i++){
            const rand = Math.floor(Math.random() * 52);
            //console.log(rand);
            let temp = this.cards[i];
            this.cards[i] = this.cards[rand];
            this.cards[rand] = temp;
        }
        //console.log(this.cards);
    }
    drawCards(){
        return this.cards.pop();
     }

}
const cards = new Cards();
cards.shuffleCards();
//console.log(cards.drawCards());
const reach24 = function(cards){
    const values = [];
    while(values.length < 4){
        const card = cards.drawCards();
        if(card.charAt(1)<='9'&&card.charAt(1)>='1'){
            //console.log(card.charAt(1));
            values.push(parseInt(card.charAt(1)));
        }

    }
    //console.log(values);

}
reach24(cards);
const generatePermutation = function(arr) {
    let result = [];
    let set = new Set();
    helper([],set, result, arr);
    //console.log(result);
}
const helper= (current,set, result, arr) =>{
    if(current.length === 4){
        result.push(current.slice());
    }
    else {
        for(let i =0; i< 4;i++){
            if(set.has(arr[i])){
                continue;
            }
            else {
                current.push(arr[i]);
                set.add(arr[i]);
                helper(current, set ,result, arr);
                set.delete(arr[i]);
                current.pop();
            }
        }
    }
}

generatePermutation([ 3, 8, 5, 1 ]);
const allCombinations = (arr) => {
    let result = [];
    combinationHelper(arr,1,arr[0],result);
    console.log(result);
}
const combinationHelper= (arr, steps, preResult, booleanResult) => {
    if (steps===4){
        let result = preResult ===24;
        booleanResult.push(result);
    }
    else {
        const operations = ['+','-','*','/'];
        for (let i = 0; i < 4; i++){
            if(i === 0){
                preResult += arr[steps];
                console.log(preResult, i);
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult -=arr[steps];
            }
            if(i === 1){
                preResult -=arr[steps];
                console.log(preResult, i);
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult +=arr[steps];
            }
            if(i === 2){
                preResult *=arr[steps];
                console.log(preResult, i);
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult /=arr[steps];
            }
            if(i === 3){
                preResult /=arr[steps];
                console.log(preResult, i);
                combinationHelper(arr, steps+1, preResult, booleanResult);
                preResult *=arr[steps];
            }


        }
    }
}

allCombinations([24,1,1,1])