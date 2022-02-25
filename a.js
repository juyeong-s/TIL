function main(){
    const limit = 100;
    const n = 5;
    const chosen = Array.from({ length: n });
    
    function solve(curr, cnt){
        if(cnt === n){
            for(const number of chosen){
                console.log(number);
            }
            return;
        }

        for(let i = curr+1; i <= limit; i++){
            chosen[cnt] = i;
            solve(i, cnt+1);
        }
    }
    solve(0, 0);
}

main();