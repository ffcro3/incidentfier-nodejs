var natural = require('natural');
var classifier = new natural.BayesClassifier();
var incidentsClassifier = new natural.BayesClassifier();
var incidentsNFR_DM = new natural.BayesClassifier();

module.exports = {

    async teste_route(req, res){
    
        res.send("Rota Alcançada");
    return  console.log("Rota alcançada");


    },

    async category_incidente(req, res){

        //Using External dataset
        const data = require('./data_all.json');

        //TOTAL DE INCIDENTES
        data.forEach(item=>{
        classifier.addDocument(item.description,item.incident_type);
        });

        // Train
        classifier.train();

        // Apply/Predict
        Classify = classifier.classify(req.params.description);

            if(Classify == "Incident"){

                //Using External dataset
                const data_incidents = require('./data_incidents.json');

                //TOTAL DE INCIDENTES
                data_incidents.forEach(item_incidents=>{
                    incidentsClassifier.addDocument(item_incidents.description,item_incidents.incident_type);
                });

                // Train
                incidentsClassifier.train();

                // Apply/Predict
                Classify_subincident = incidentsClassifier.classify(req.params.description);

                    if(Classify_subincident === "DHL"){

                        //Using External dataset
                        const data_nfr_dm = require('./nearmiss_dm.json');

                        //TOTAL DE INCIDENTES
                        data_nfr_dm.forEach(item_nfr_dm=>{
                            incidentsNFR_DM.addDocument(item_nfr_dm.description,item_nfr_dm.incident_type);
                        });

                        // Train
                        incidentsNFR_DM.train();

                        // Apply/Predict
                        Classify_nfr_dm = incidentsNFR_DM.classify(req.params.description);

                        res.send(Classify_nfr_dm)

                    }if(Classify_subincident === "Terceiro"){

                        res.send("Terceiro")

                    }               

            }if(Classify == "Personal Injury"){

                res.send("Injury")

            }

    }

}