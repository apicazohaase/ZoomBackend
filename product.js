/*
* Register transaction processor function
* @param  {zoom.app.BuyAProduct} buyAProduct The BuyAPRoduct transaction instance
* @transaction
*/

function buyAProduct(buyAProduct){
    var timestamp = generateId();
    var client = buyAProduct.client;
    var transport = buyAProduct.transport;
    var vendor = buyAProduct.vendor;
    //Compruebo existencia de Cliente, Transportista y Vendor
    return getParticipantRegistry('zoom.app.Client').
    then(function (clientRegistry){
        return clientRegistry.getParticipant(clientRegistry.id);
    }).
    then(function(userClient){
        return getParticipantRegistry('zoom.app.Vendor').
        then(function (vendorRegistry){
            return vendorRegistry.getParticipant(vendorRegistry.id);
        }).
        then(function (userVendor){
            return getParticipantRegistry('zoom.app.Transport').
            then(function (transportRegistry){
                return transportRegistry.getParticipant(transportRegistry.id);
            }).
            then(function (userTransport){
                return getAssetRegistry('zoom.app.Product')-
                then(function (assetRegistry){
                    var product = getFactory().newResource('zoom.app', 'Product', timestamp);
                    product.
                })
            })
        })
    })
}


//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}