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
    product.state = 'SOLD';
    //Compruebo existencia de Cliente, Producto y Vendor
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
                return getAssetRegistry(product.getFullyQualifiedType()).
                then(function (productRegistry){
                    return productRegistry.get(product.id);
                }).then(function (assetRegistry){
                    return assetRegistry.update(product);
                }).then(function (orderRegistry){
                    var order = newResource().getFactory('zoom.app', 'Order', timestamp);
                    order.owner = vendor;
                    order.client = client;
                    order.date = new Date();
                    order.transportAgency = transport;
                    order.status = 'PENDING';
                    order.product = product;
                    return orderRegistry.add(order);
                }) .catch(function (error) {
                    throw new Error(error);
              });
                    

                })
            })
        })
    
    
}


//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}