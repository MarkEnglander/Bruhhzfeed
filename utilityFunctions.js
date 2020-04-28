// Functions for simplying randomness
function randRange(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function randRangeList(a, b, n) {
    let r = [];
    for (let i = 0; i < n; i++) {
        while (true) {
            let x = randRange(a, b);
            if (!r.includes(x)) {
                r.push(x);
                break;
            }
        }
    }
    return r;
}

// The following returns true if an image is to be excluded from the array.
function exclude(url){
  for(let i = 0; i < exclusionArr.length; i++) {
    if(url == exclusionArr[i]) { return true; }
  }
  return false;
}

// The following is a filter to only allow excluded urls in an array
function filterExclusion(Arr){
  let newArr = [];
  for(let i = 0; i < Arr.length; i++) {
    if(!exclude(Arr[i])) { newArr.push(Arr[i]); }
  }
  if(newArr.length > 0) {return newArr; }
  else {
    newArr.push(binImage);
    return newArr;
  }
}
