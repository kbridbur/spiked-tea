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
  
  GetOutput(inputs){
    //find the value of time that the inputs, when passed into the input function
    for (i = 0; i < 64;i++){
      summation = 0;
      for (j = 0; j < this.inputs.length; j++){
        weight = this.inputs[j][1];
        time_recieved = this.inputs[j][0];
        summation += time_recieved === null ? 0 : GetTimeAlteredInputValue(weight, i - time_recieved);
      }
      if (summation >= threshhold){
        return i;
      }
    }
  return null;
  }
}

class Cluster{
  //group of neurons all on the same global time scale
  constructor(neurons, connections, inputs){
    this.neurons = neurons;
    this.connections = connections;
    this.inputs = NormalizeInputs(inputs);
  }
  
  DistributeInputs(){
    //Distribute inputs to the proper neurons based on connections
  }
  
  NormalizeInputs(inputs){
    //Take the inputs which are in the form of times and normalize them (remember some will be null)
    min = minimum(inputs)
  }
  
  GetOutputs(){
    //Given the inputs get the output of each
    outputs = [];
    for (i = 0; i< this.neurons.length; i++){
      outputs.push(this.neurons[i].GetOutput());
    }
    return outputs;
  }
}

class Inhibitor{
  //culls inputs between layers of neurons based on strength
  constructor(){
    
  }
}

class Layer{
  //contains clusters, may have multiple time scales within but has no interconnecting neurons
  constructor(inhibitor : Inhibitor, clusters, inputs){
    
  }
}

function EvaluateInput(input : float, time_since_recieved : float) : float{
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

function minimum(a) {
  var min=a[0]; for(var i=0,j=a.length;i<j;i++){min = (a[i] < min) && (a[i] !== null) ? a[i] : min;}
  return min;
}

function maximum(a) {
  var max=a[0]; for(var i=0,j=a.length;i<j;i++){max = (a[i] > max) && (a[i] !== null) ? a[i] : max;}
  return max;
}