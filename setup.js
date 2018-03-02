/*
* SetupZoom transaction processor function
* @param  {zoom.app.SetupZoom} setupZoom The SetupZoom transaction instance
* @transaction
*/

function setupDemo(){
  createTransport();
  createVendor();
}


function createVendor(){
  var timestamp = generateId();
  return getParticipantRegistry('zoom.app.Vendor')
  	.then(function (participantRegistry){
    	var vendor = getFactory().newResource('zoom.app','Vendor', timestamp);
    	vendor.name = 'Vendor';
    	vendor.password = '1234';
    	vendor.confirmPassword = '1234';
    	vendor.mail = 'vendor@zoom.com';
    	vendor.participante = 'VENDOR';
    return participantRegistry.add(vendor);
  	})
  .catch(function(error){
    throw new Error(error);
  	});
}

function createTransport(){
  var timestamp = generateId();
  return getParticipantRegistry('zoom.app.Transport')
  	.then(function (participantRegistry){
    	var transportista = getFactory().newResource('zoom.app','Transport', timestamp);
    	transportista.name = 'Transport';
    	transportista.password = '123';
    	transportista.confirmPassword = '123';
    	transportista.mail = 'transport@zoom.com';
    	transportista.participante = 'TRANSPORT';
    return participantRegistry.add(transportista);
  	})
  .catch(function(error){
    throw new Error(error);
  	});
}



//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}




  