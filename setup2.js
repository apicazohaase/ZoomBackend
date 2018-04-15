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
       product1.name = 'Logitech G Pro'
       product1.weight = 0.93;
       product1.description = 'Ratón para gaming (RGB, 6 botones programables) color negro';
       product1.status = 'NOTSOLD';
       product1.owner = owner;

       product2.price = 56.99;
       product2.name = 'Logitech G213'
       product2.weight = 2.50;
       product2.description = 'Teclado para gaming Prodigy con retroiluminación RGB y distribución QWERTY español';
       product2.status = 'NOTSOLD';
       product2.owner = owner;

       product3.price = 222.20;
       product3.weight = 5.75;
       product3.name = 'ASUS MX239H';
       product3.description = 'Monitor de 23" 1920 x 1080 con tecnología LED, color plata';
       product3.status = 'NOTSOLD';
       product3.owner = owner;

       product4.price = 59.99;
       product4.weight = 1.45;
       product4.name = 'Logitech G430';
       product4.description = 'Auriculares gaming (para PC, Xbox One, PS4 y Switch) color negro y azul';
       product4.status = 'NOTSOLD';
       product4.owner = owner;

       return assetRegistry.addAll([product1,product2,product3,product4]);

   })
   .catch(function (error) {
       throw new Error(error);
});
}