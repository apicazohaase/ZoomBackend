/*
* SetupZoom2 transaction processor function
* @param  {zoom.app.SetupZoom2} setupZoom2 The SetupZoom2 transaction instance
* @transaction
*/

function setupZoom2(setupZoom2){
    var owner = setupZoom2.vendor;
   return getAssetRegistry('zoom.app.Product')
   .then(function (assetRegistry){
       var product1 = getFactory().newResource('zoom.app', 'Product', '1');
       var product2 = getFactory().newResource('zoom.app', 'Product', '2');
       var product3 = getFactory().newResource('zoom.app', 'Product', '3');
       var product4 = getFactory().newResource('zoom.app', 'Product', '4');
       product1.price = 25.99;
       product1.weight = 1.25;
       product1.description = 'Se trata de un ratón con una iluminación LED';
       product1.status = 'NOTSOLD';
       product1.owner = owner;

       product2.price = 39.99;
       product2.weight = 2.50;
       product2.description = 'Se trata de un teclado mecánico';
       product2.status = 'NOTSOLD';
       product2.owner = owner;

       product3.price = 149.99;
       product3.weight = 3.75;
       product3.description = 'Se trata de un monitor ASUS LED diseñado para Gaming';
       product3.status = 'NOTSOLD';
       product3.owner = owner;

       product4.price = 59.99;
       product4.weight = 1.45;
       product4.description = 'Se trata de unos auriculares Logitech diseñados para experiencia Gaming';
       product4.status = 'NOTSOLD';
       product4.owner = owner;

       return assetRegistry.addAll([product1,product2,product3,product4]);

   })
   .catch(function (error) {
       throw new Error(error);
});
}



