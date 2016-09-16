// Spiked tea
// @author Kyle Bridburg
// @date 2016-08-22

var config = require('./config.js');


module.exports = function() {
  return new SNN();
};

class Neuron{
  constructor(threshold : float){
    this.inputs = [];
    this.threshhold = threshhold;
  }

  SetInputs(newInputs){
    this.inputs = newInputs;
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
  constructor(neurons, inputs){
    this.neurons = neurons;
    this.inputs = ParseInputs(inputs);
  }

  SetInputs(newInputs){
    this.inputs = ParseInputs(newInputs);
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

  DistributeInputs(inputs){
    for (i = 0; i < this.neurons.length; i++){

    }
  }

  GetOutputs(){
    //Given the inputs get the output of each
    outputs = [];
    for (i = 0; i< this.neurons.length; i++){
      outputs.push(this.neurons[i].GetOutput());
    }
    return outputs;
  }

  SimulateCluster(){
    DistributeInputs();
    return GetOutputs();
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
  constructor(inhibitor, clusters, inputs, incomingConnections){
    this.inhibitor = inhibitor;
    this.clusters = clusters;
    this.inputs = inputs; //List of lists
    this.inputConnections = incomingConnections; //List of tuples [[1,2], [1,3], [2,3]]
    this.outputs = [];
  }

  SetInputs(newInputs){
    this.inputs = newInputs;
  }

  SetConnections(connections){
    this.connections = connections;
  }

  DistributeInputs(inputs){
    for (a = 0; a < this.inputConnections.length; a++){
      [x,y] = this.inputConnections[a];
      this.clusters[y].SetInputs(this.inputs[x]);
    }
  }

  GetOutputs(){
    for (i = 0; i < this.clusters.length; i++){this.outputs.push(this.clusters[i].SimulateCluster());}
  }

  SimulateLayer(inputs){
    SetInputs(inputs);
    DistributeInputs(inputs);
    return GetOutputs();
  }
}

class SNN {
  constructor(numLayers, numClusters, numNeurons){
    this.neurons = config.fillArray(Neuron(config.threshhold), numNeurons);
    this.clusters = config.fillArray(Cluster(this.neurons, []), numClusters);
    this.layers = CreateReducingLayers();
    CreateNetworkConnections();
    this.numLayers = numLayers;
    this.slope = (numClusters-1)/numLayers;
  }

  CreateReducingLayers(){
    layers = [];
    for (i = 0; i < this.numLayers; i++){layers.push(Layer(Inhibitor, this.clusters.slice(0, Math.ceil(i*this.slope), [], [])));}
    return layers;
  }

  CreateNetworkConnections(){
    //Something to make a connecting network
    /*Give the first one just straight inputs after than reduce by slope in a manner similar to CreateReducingLayers()
    assign straight connections between most layers then randomly assign the extra that come with slope(i-1)*/
    connections = [];

    //Create first layer and add it to the connections
    layerOne = [];
    for (int i = 0; i < this.numClusters; i++){
      layerOne.push([i,i]);
    }
    connections.push(layerOne);

    //The rest of the layers
    for (int layer = 2; layer < numLayers; layer++){
      layerConnections = []
      int numClustersInCurrentLayer = Math.ceil((layer)*this.slope);
      int numClustersInPreviousLayer = Math.ceil((layer-1)*this.slope);

      for (int j = 0; j < numClustersInCurrentLayer; j++){
        layerConnections.push([j,j]);
      }

      //assign extra clusters to distribute evenly across the next Layer
      for (int k = numClustersInCurrentLaye; k < numClustersInPreviousLayer; k++){
        layerConnections.push([k, numClustersInPreviousLayer-k]);
      }
      connections.push(layerConnections);
    }
    for (int layer = 0; layer < this.numLayers; layer++){
      currentLayer = this.layers[layer];
      currentLayer.SetConnections(connections[layer]);
    }
  }

  SimulateSNN(inputs){
    layerOutput = inputs;
    for  (i = 0; i < this.numLayers; i++){
      layerOutput = this.layers[i].SimulateLayer(layerOutput);
    }
    return layerOutput;
  }
}
