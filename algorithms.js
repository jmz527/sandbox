// SORTING ALGORITHMS
module.exports = {

	//BUBBLE SORT

	//SELECTION SORT



	//INSERTION SORT
	insertionSort: function(arr){
	  var i, len = arr.length, el, j;

	  for(i = 1; i<len; i++){
	    el = arr[i];
	    j = i;

	    while(j>0 && arr[j-1]>el){
	      arr[j] = arr[j-1];
	      j--;
	   }

	   arr[j] = el;
	  }

	  return arr;
	},

	//MERGE SORT
	mergeSort: function(arr) {
	   var len = arr.length;
	   if(len <2)
	      return arr;
	   var mid = Math.floor(len/2),
	       left = arr.slice(0,mid),
	       right =arr.slice(mid);
	   //send left and right to the mergeSort to broke it down into pieces
	   //then merge those
	   return this.merge(this.mergeSort(left),this.mergeSort(right));
	},

	merge: function(left, right){
	  var result = [],
	      lLen = left.length,
	      rLen = right.length,
	      l = 0,
	      r = 0;
	  while(l < lLen && r < rLen){
	     if(left[l] < right[r]){
	       result.push(left[l++]);
	     }
	     else{
	       result.push(right[r++]);
	    }
	  }  
	  //remaining part needs to be addred to the result
	  return result.concat(left.slice(l)).concat(right.slice(r));
	}

}