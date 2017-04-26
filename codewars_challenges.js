// ==================================================================== //
function validBraces(braces){
  var parens, curls, bracks, arr, char, allPass = true, result = false;
      parens = 0;
      curls = 0;
      bracks = 0;
      arr = braces.split("");

    for (var i = 0; i < arr.length; i++) {

      if (arr[i]=='(') parens++;
      else if (arr[i]==')') parens--;
      else if (arr[i]=='{') curls++;
      else if (arr[i]=='}') curls--;
      else if (arr[i]=='[') bracks++;
      else if (arr[i]==']') bracks--;

      if (parens < 0 || curls < 0 || bracks < 0)
        allPass = false;

    }

    if (braces.includes("{]") || braces.includes("{)") || braces.includes("[}") || braces.includes("[)") || braces.includes("(}") || braces.includes("(]"))
      allPass = false;

    if (parens==0 && curls==0 && bracks==0 && allPass)
      result = true;

    // console.log(parens, curls, bracks);
    return result
}


console.log(validBraces("{}[]()")); // should return true
console.log(validBraces("[(])")); // should return false

// ==================================================================== //
