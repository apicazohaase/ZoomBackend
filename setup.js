/*
* SetupZoom transaction processor function
* @param  {zoom.app.SetupZoom} setupZoom The SetupZoom transaction instance
* @transaction
*/


function createVendor(){
  return getParticipantRegistry('zoom.app.Vendor')
  	.then(function (participantRegistry){
    	var vendor = getFactory().newResource('zoom.app','Vendor', '1');
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
  return getParticipantRegistry('zoom.app.Transport')
  	.then(function (participantRegistry){
    	var transport = getFactory().newResource('zoom.app','Transport', '2');
    	transport.name = 'Transport';
    	transport.password = '1234';
    	transport.confirmPassword = '1234';
    	transport.mail = 'transport@zoom.com';
    	transport.participante = 'TRANSPORT';
    return participantRegistry.add(transport);
  	})
  .catch(function(error){
    throw new Error(error);
  	});
}

function setupDemo(){
  
  
  createTransport();
  createVendor();
}




  