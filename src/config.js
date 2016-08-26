module.exports = {
  'timeDelayMs': 64
  'T_r' : 10
  'T_f' : 40
  'y' : 2
  
  function minimum(a){
    var min = a[0]; for(var i = 0, j = a.length; i < j; i++){min = (a[i] < min) ? a[i] : min;}
    return min;
  }

  function maximum(a){
    var max = a[0]; for(var i = 0 , j = a.length; i<j; i++){max = (a[i] > max) ? a[i] : max;}
    return max;
  }

  function sortArr(a, b){
    return b-a;
  }
};