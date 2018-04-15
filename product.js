/*
* Register transaction processor function
* @param  {zoom.app.BuyAProduct} buyAProduct The BuyAPRoduct transaction instance
* @transaction
*/

function buyAProduct(buyAProduct){
    var timestamp = generateId();
    var client = buyAProduct.client;
    var product = buyAProduct.product;
    var vendor = buyAProduct.vendor;
    var transport = buyAProduct.transport;
  	var direccion;
    //product.status = 'SOLD';
    
    //Compruebo existencia de Cliente, Producto y Vendor
    /*
    return getParticipantRegistry(client.getFullyQualifiedType()).
    then(function (clientRegistry){
        return clientRegistry.get(clientRegistry.id);
    }).
    then(function(userClient){
        return getParticipantRegistry(vendor.getFullyQualifiedType()).
        then(function (vendorRegistry){
            return vendorRegistry.get(vendorRegistry.id);
        }).
        then(function (userVendor){
            return getParticipantRegistry(transport.getFullyQualifiedType()).
            then(function (transportRegistry){
                return transportRegistry.get(transportRegistry.id);
            }).
            then(function (existingProduct){
                */
               /*
                return getAssetRegistry('zoom.app.Product').
                then(function (productAsset){
                    return productAsset.update(product);
                }).then(function (order){
                    */
  return getParticipantRegistry('zoom.app.Client').
    then(function (clientRegistry){
        return clientRegistry.get(client.id);
    }).
    then(function(userClient){
    	direccion = userClient.street;
        return getAssetRegistry('zoom.app.Order')
        .then(function (orderRegistry){
                        var order = getFactory().newResource('zoom.app', 'Order', timestamp);
                        order.owner = vendor;
                        order.client = client;
                        order.date = new Date();
                        order.transportAgency = transport;
                        order.status = 'PENDING';
                        order.product = product;
                      	order.location = direccion;
                        return orderRegistry.add(order);
                    })
                    
                 .catch(function (error) {
                    throw new Error(error);
              });
                    

                })
       
}

/*
* Register transaction processor function
* @param  {zoom.app.ConfirmationOrder} confirmationOrder The ConfirmationOrder transaction instance
* @transaction
*/

function confirmationOrder(confirmationOrder){
    var order = confirmationOrder.order;
    var vendor = confirmationOrder.vendor;
    var product = confirmationOrder.product;
  	var NS_PRODUCT = 'zoom.app.Product';
  	var NS_ORDER = 'zoom.app.Order';
  	var sePuede = 'YES';
/*
    return getAssetRegistry(NS_ORDER)
    .then(function (assetOrder){
    */
      return getAssetRegistry(NS_PRODUCT)
      .then(function (assetProduct){
      		product.status = 'SOLD';
        return assetProduct.update(product);
      })
  		.then(function (orderRegistry){
        	return getAssetRegistry(NS_ORDER)
        	.then(function (registry){
              
        		order.status = 'CONFIRMED';
        		
        return registry.update(order);
  })
})
  
}


/*
* Register transaction processor function
* @param  {zoom.app.ChangeStatusToInTransit} changeStatusToInTransit The ChangeStatusToInTransit transaction instance
* @transaction
*/

function changeStatusToInTransit(changeStatus){
    var order = changeStatus.order;
    order.status='INTRANSIT';
    return getAssetRegistry('zoom.app.Order')
            .then(function (registry) {
                  return registry.update(order);
            });
}

/*
* Register transaction processor function
* @param  {zoom.app.ChangeStatusToDelivered} changeStatusToDelivered The ChangeStatusToDelivered transaction instance
* @transaction
*/

function changeStatusToDelivered(changeStatus){
    var order = changeStatus.order;
    order.status='DELIVERED';
    return getAssetRegistry('zoom.app.Order')
            .then(function (registry) {
                  return registry.update(order);
            });
}


//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}