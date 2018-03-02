/*
* Register transaction processor function
* @param  {zoom.app.Register} register The Register transaction instance
* @transaction
*/

function register(register){
    var timestamp = generateId();
    //register.existingClient = existingClient;
  	var name = register.client.name;
  	var password = register.client.password;
  	var confirmPassword = register.client.confirmPassword;
  	var mail = register.client.mail;
  	var number = register.client.number;
  	var city = register.client.city;
  	var localidad = register.client.localidad;
  	var street = register.client.street;
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
        newClient.localidad = localidad;
        newClient.street = street;
        if(newClient.password == newClient.confirmPassword){
                return clientRegistry.add(newClient);
            
        }else{
            throw new Error('Passwords dont match');
        }
    });

}


/*
* Login transaction processor function
* @param  {zoom.app.Login} login The Login transaction instance
* @transaction
*/

function login(login){
    //var accepted=false;
    var user = login.user;
    var password = login.password;
    var name = login.name;


    /*   
    return getParticipantRegistry(user.getFullyQualifiedType()).
    then(function (participantRegistry){
        return participantRegistry.getParticipant(user.id);
    }).then(function (userParticipant){
        if(userParticipant.name==="VENDOR"){
            return getParticipantRegistry("zoom.app.Vendor")
            .then(function (vendorParticipant){
                if(vendorParticipant.password != password || vendorParticipant.name != name){
                    throw new Error('Invalid Credentials');
                }
            });

        }else if(userParticipant.name==="CLIENT"){
            return getParticipantRegistry("zoom.app.Client")
            .then(function (clientParticipant){
                if(clientParticipant.password != password || clientParticipant.name != name){
                    throw new Error('Invalid Credentials');
                }
            });
        }else if(userParticipant.name==="TRANSPORT"){
            return getParticipantRegistry("zoom.app.Client")
            .then(function (transportParticipant){
                if(transportParticipant.password != password || transportParticipant.name != name){
                    throw new Error('Invalid Credentials');
                }
            });
        }
        
    });
}*/

    if(user.participante==="VENDOR"){
        return getParticipantRegistry('zoom.app.Vendor')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.id);
      })
      .then(function (newUser) {
       if(newUser.password != password || newUser.name != name){
          throw new Error('Invalid credentials');
          break;        
      }
     })
    }else if(user.participante==="TRANSPORT"){
      return getParticipantRegistry('zoom.app.Transport')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.id);
      })
      .then(function (newUser) {
       if(newUser.password != password || newUser.name != name){
          throw new Error('Invalid credentials');
          break;         
      }
    })
    }else if(user.participante==="CLIENT"){
      return getParticipantRegistry('zoom.app.Client')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.id);
      })
      .then(function (newUser) {
       if(newUser.password != password || newUser.name != name){
          throw new Error('Invalid credentials');
          break;       
      }
       })
      
}
else{
    throw new Error('It should not get in here');
}
}




//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}