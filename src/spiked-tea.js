// Spiked tea
// @author Anthony Liu
// @author Kyle Bridburg
// @date 2016-08-22

class SNN {
  learn() {
    return 1;
  }
}

var config = require('./config.js');


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
    for (i = 0; i < config.timeDelayMs;i++){
      summation = 0;
      for (j = 0; j < this.inputs.length; j++){
        weight = this.inputs[j][1];
        time_recieved = this.inputs[j][0];
        summation += time_recieved === null ? 0 : config.EvaluateInput(weight, i - time_recieved);
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
    this.inputs = ParseInputs(inputs);
  }
  
  DistributeInputs(){
    //Distribute inputs to the proper neurons based on connections
  }
  
  ParseInputs(inputs){
    //Take the inputs which are in the form of times and normalize them (remember some will be null)
    //normalize
    parsedInputs = [];
    normalizedInputs = []
    min = config.minimum(inputs)
    for (i = 0; i < inputs.length; i++){normalizedInputs.push(inputs[i] === null ? null : inputs[i]%min);}
    //assign weights
    orderedInputs = set(normalizedInputs).sort(config.sortArr);
    for (i = 0; i < inputs.length; i++){
      for (j = 0; j < inputs.length; j++){
        if (orderedInputs[i] === normalizedInputs[j]){
          parsedInputs.push([normalizedInputs[j], i+1]);
        }
      }
    }
    return parsedInputs;
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
  constructor(inputs){
    this.inputs = inputs;
  }
  
  CullInputs(){
    
  }
  
}

class Layer{
  //contains clusters, may have multiple time scales within but has no interconnecting neurons
  constructor(inhibitor : Inhibitor, clusters, inputs){
    this.inhibitor = inhibitor;
    this.clusters = clusters;
    this.inputs = inputs;
  }
}