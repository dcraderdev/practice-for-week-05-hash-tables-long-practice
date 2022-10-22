function anagrams(str1, str2) {
  let set1 = new Set(str1)
  let set2 = new Set(str2)

if(set1.size === set2.size){

for(const item of set1){
  if(!set2.has(item)){
    return false
  }

  return true
}
}
return false
}


function commonElements(arr1, arr2) {
  let set1 = new Set(arr1)
  let set2 = new Set(arr2)
  let arr = new Array

  for(const item of set1){
    if(set2.has(item)){
      arr.push(item)
    }
  }
    return arr

}


function duplicate(array) {





}

console.log(duplicate([7,2,4,9,5,4,8]));
;     // => 4


function twoSum(nums, target) {
  // Your code here
}


function wordPattern(pattern, strings) {
  // Your code here
}



anagrams('elvis', 'lives');     // => true







module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];