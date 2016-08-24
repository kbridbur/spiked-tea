// Spiked tea
// @author Anthony Liu
// @author Kyle Bridburg
// @date 2016-08-22

class SNN {
  learn() {
    return 1;
  }
}

module.exports = function() {
  return new SNN();
};

class Neuron{
  constructor(threshold : float){
    this.inputs = [];  
    this.threshhold = threshhold;
  }
  
  OnRecieveInput(input){
    time_recieved = //something to tell the time
    //find the value of time that the inputs, when passed into the input function
    this.inputs.push(input);
    for (i = 0; i < /*some amount of time so that the newest input = 0*/;i += /*Increment by milliseconds*/){
      summation = 0;
      for (j = 0; j < this.inputs.length; j++){
        summation += GetTimeAlteredInputValue(this.inputs[j][0], i - this.inputs[j][0]);
      }
      if (summation >= threshhold){
        Output(i);
        return;
      }
    }
  }
  
  Output(time : float){
    
    
    this.inputs = [];
  }

}

class Cluster{
  //group of neurons all on the same global time scale
  
}

class Inhibitor{
  //culls inputs between layers of neurons based on strength
  
}

class Layer{
  //contains clusters, may have multiple time scales within but has no interconnecting neurons
  
}




function EvaluateInput(input : float, time_since_recieved : float) : float{
  if (input < 0){
    return 0;
  }
  if (time_since_recieved < 0){
    return 0;
  } else if (time_since_recieved < 10+2(input-1)){
    return input*time_since_recieved/10;
  } else if (time_since_recieved < 50+2(input-1)){
    return input*(1-time_since_recieved/50);
  } else {
    return 0;
  }
  
}