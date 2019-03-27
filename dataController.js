var natural = require('natural');

//INCIDENTS
var classifier = new natural.BayesClassifier();
var incidentsClassifier = new natural.BayesClassifier();
var incidentsNFR_DM = new natural.BayesClassifier();

//INJURIES
var incidentsLTA = new natural.BayesClassifier();
var incidentsMTC = new natural.BayesClassifier();
var incidentsRWC = new natural.BayesClassifier();
var incidentsFAC = new natural.BayesClassifier();

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

                    if(Classify_subincident == "DHL"){

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

                    }if(Classify_subincident == "Terceiro"){

                        res.send("Terceiro")

                    }               

            }if(Classify == "Personal Injury"){



                     //Using External dataset
                    const data_rwc = require('./rwc.json');

                    //TOTAL DE INCIDENTES
                    data_rwc.forEach(data_rwc=>{
                        incidentsRWC.addDocument(data_rwc.description,data_rwc.incident_type);
                    });

                    // Train
                    incidentsRWC.train();

                    // Apply/Predict
                    Classify_RWC = incidentsRWC.classify(req.params.description);

                    if(Classify_RWC == "RWC"){

                        res.send(Classify_RWC)

                    }if(Classify_RWC == "Others Injuries"){

                        //Using External dataset
                        const data_mtc = require('./mtc.json');

                        //TOTAL DE INCIDENTES
                        data_mtc.forEach(data_mtc=>{
                            incidentsMTC.addDocument(data_mtc.description,data_mtc.incident_type);
                        });

                        // Train
                        incidentsMTC.train();

                        // Apply/Predict
                        Classify_MTC = incidentsMTC.classify(req.params.description);

                        if(Classify_MTC == "MTC"){

                            res.send(Classify_MTC)

                        }if(Classify_MTC == "Others Injuries"){

                            //Using External dataset
                            const data_fac = require('./fac.json');

                            //TOTAL DE INCIDENTES
                            data_fac.forEach(data_fac=>{
                                incidentsFAC.addDocument(data_fac.description,data_fac.incident_type);
                            });

                            // Train
                            incidentsFAC.train();

                            // Apply/Predict
                            Classify_FAC = incidentsFAC.classify(req.params.description);

                            if(Classify_FAC == "FAC"){

                                res.send(Classify_FAC)

                            }if(Classify_FAC == "Others Injuries"){

                                res.send("Erro ao classificar incidente. Se o Problema persistir. Contate: fabricio.rocha@dhl.com")

                            }

                        }

                    }

                }

            }
        }