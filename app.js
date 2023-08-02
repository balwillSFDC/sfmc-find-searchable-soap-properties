// ==============================================================
// SETUP
// ==============================================================

// Require Marketing Cloud Packages + Parameters
const dotenv = require('dotenv').config();
const ET_Client = require('sfmc-fuelsdk-node');
const clientId = process.env.SFMC_CLIENTID;
const clientSecret = process.env.SFMC_CLIENTSECRET;
const stack = process.env.SFMC_STACK;
const origin = process.env.SFMC_ORIGIN;
const authOrigin = process.env.SFMC_AUTHORIGIN;
const soapOrigin = process.env.SFMC_SOAPORIGIN;
const parentBU = process.env.SFMC_PARENT;

console.log('RESULTS START HERE: ');

// Instantiating Node Class
const sfmcNode = new ET_Client(clientId, clientSecret, stack, {
  origin,
  authOrigin,
  soapOrigin,
  authOptions: {
    authVersion: 2,
    applicationType: 'server'
  }
});

// CODE THAT HELPS YOU SEE WHAT PROPERTIES ARE RETRIEVABLE IN API OBJECT

function findSearchableParameters(object) {
  sfmcNode.SoapClient.describe(object, (err, response) => {
    if (response) {
      let properties = response.body.ObjectDefinition.Properties;
      let propertyArray = [];
      properties.forEach((property) => {
        if (property.IsRetrievable == 'true') {
          propertyArray.push(property.Name);
        }
      });

      console.log(`These are the retrieveable properties for ${object}: `);
      console.log(propertyArray);
    } else if (err) {
      console.log(err);
    }
  });
}

// USE FUNCTION TO OUTPUT RETRIEVABLE PROPERTIES ON SFMC SOAP OBJECTS
// https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/soap_web_service_objects.html
findSearchableParameters('filteractivity');

function findAllParameters(object) {
  sfmcNode.SoapClient.describe(object, (err, response) => {
    if (response) {
      let properties = response.body.ObjectDefinition.Properties;
      let propertyArray = [];
      properties.forEach((property) => {
        propertyArray.push(property);
      });

      console.log(`These are the properties for ${object}: `);
      console.log(propertyArray);
    } else if (err) {
      console.log(err);
    }
  });
}

// FUNCTION USED TO RETRIEVE DATA USING PROPERTIES 
function retrieveSfmcObject(object, properties) {
  sfmcNode.SoapClient.retrieve(object, properties, (err, response) => {
    if (response) {
      console.log(response.body);
    } else if (err) {
      console.log(err);
    }
  });
}

// DEFINE PROPERTIES HERE
let props = [
  'ObjectID',
  'DefinitionObjectID',
  'Client.ID',
  'Name',
  'CustomerKey',
  'Description',
  'DestinationObjectID',
  'DestinationTypeID',
  'SourceObjectID',
  'SourceTypeID',
  'StatusID',
  'CreatedDate',
  'ModifiedDate'
]

try {
  // RUN FUNCTION HERE TO OUTPUT RESULTS 
  retrieveSfmcObject('filteractivity', props);
} catch (e) {
  console.log(e);
}
