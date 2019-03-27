var natural = require('natural');
var classifier = new natural.BayesClassifier();

//Training Dataset - Using Internal Dataset
/*classifier.addDocument("I need to buy a new computer","hardware");
classifier.addDocument("I need to clean the code","software");
classifier.addDocument('We need to buy a new hard drive', 'hardware');
classifier.addDocument('i need a new power supply', 'hardware');
classifier.addDocument('The motherboard is broken', 'hardware');
classifier.addDocument('We are running out of memory storage', 'hardware');
classifier.addDocument('The computer is new', 'hardware');
classifier.addDocument('The unit test failed', 'software');
classifier.addDocument('The code works well', 'software');
classifier.addDocument('I want to refactor the program', 'software');
classifier.addDocument('program', 'software');
classifier.addDocument('You have to push the code to github', 'software');

// Train
classifier.train();

// Apply/Predict
console.log(classifier.classify("The code is faulty"));

*/
//Using External dataset
const data = require('./data_training.json');

data.forEach(item=>{
  classifier.addDocument(item.description,item.incident_type);
});

// Train
classifier.train();

// Apply/Predict
console.log(classifier.classify("O Operador de Empilhadeira movimentava paletes utilizando uma empilhadeira retrátil. Após armazenar o palete no 4º nível da estrutura, ele não observou a distância segura entre o palete e o garfo da empilhadeira. Neste momento, ao retrair a torre, o garfo puxou o palete provocando o tombamento para o nível inferior da estrutura, sem causar avarias."));

// Persisting /Save
//classifier.save('nvclassifier.json',function(err,classifier){});


// Using Your Saved Classifier
//var natural = require('natural');

//natural.BayesClassifier.load('nvclassifier.json',null,function(err,classifier){
  //  console.log(classifier.classify("I need to buy a new hard disk"));
//})
