/*
* Login transaction processor function
* @param  {zoom.app.Login} login The Login transaction instance
* @transaction
*/

function login(login){
    var accepted=false;
    login.user = user;
    login.password = password;

    if(user.participante==="VENDOR"){
        return getParticipantRegistry('zoom.app.Vendor')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.participantId);
      })
      .then(function (user) {
       if(user.password != password){
          throw new Error('Invalid credentials');        
      }
     })
    }else if(user.participante==="TRANSPORT"){
      return getParticipantRegistry('zoom.app.Transport')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.participantId);
      })
      .then(function (user) {
       if(user.password != password){
          throw new Error('Invalid credentials');        
      }
     })
    }else if(user.participante==="CLIENT"){
      return getParticipantRegistry('zoom.app.Client')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.participantId);
      })
      .then(function (user) {
       if(member.password != password){
          throw new Error('Invalid credentials');        
      }
       })
}
}

/*
* Register transaction processor function
* @param  {zoom.app.Register} register The Register transaction instance
* @transaction
*/

function register(register){
    var timestamp = generateId();
    //register.existingClient = existingClient;
  	name = register.client.name;
  	password = register.client.password;
  	confirmPassword = register.client.confirmPassword;
  	mail = register.client.mail;
  	number = register.client.number;
  	city = register.client.city;
  	country = register.client.country;
  	localidad = register.client.localidad;
  	street = register.client.street;
    //var existingName;

  	/*
    return getParticipantRegistry(existingClient.getFullyQualifiedType())
    .then(function (participantRegistry){
        return participantRegistry.get(existingClient.id);
    }).then(function (existingClient){
        existingName = existingClient.name;
        */
        return getParticipantRegistry('zoom.app.Client')
    	.then(function (clientRegistry){
        var newClient = getFactory().newResource('zoom.app', 'Client', timestamp);
        newClient.name = name;
      	newClient.participante = 'CLIENT';
        newClient.password = password;
        newClient.confirmPassword = confirmPassword;
        newClient.mail = mail;
        newClient.number = number;
        newClient.city = city;
        newClient.country = country;
        newClient.localidad = localidad;
        newClient.street = street;
        if(newClient.password == newClient.confirmPassword){
                clientRegistry.add(newClient);
            
        }else{
            throw new Error('Passwords dont match');
        }
    });

}

//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}