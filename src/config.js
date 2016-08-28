module.exports = {
  'timeDelayMs': 64
  'T_r' : 10
  'T_f' : 40
  'y' : 2
  'threshhold' : 2.5
  
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
  
  function EvaluateInput(input : float, time_since_recieved : float) : float{
    if (time_since_recieved < 0){
      return 0;
    } else if (time_since_recieved < config.T_r+config.y(input-1)){
      return input*time_since_recieved/config.T_r;
    } else if (time_since_recieved < config.T_r+config.T_f+config.y(input-1)){
      return input*(1-time_since_recieved/(config.T_r + config.T_f));
    } else {
      return 0;
    } 
  }
};