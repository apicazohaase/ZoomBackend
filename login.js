/*
* Login transaction processor function
* @param  {zoom.app.main.Login} login The Login transaction instance
* @transaction
*/

function login(login){
    var accepted=false;
    login.user = user;
    login.password = password;

    if(user.participante==="VENDOR"){
        return getParticipantRegistry('zoom.app.main.Vendor')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.participantId);
      })
      .then(function (user) {
       if(user.password != password){
          throw new Error('Invalid credentials');        
      }
     })
    }else if(user.participante==="TRANSPORT"){
      return getParticipantRegistry('zoom.app.main.Transport')
      .then(function (participantRegistry) {
        return participantRegistry.get(user.participantId);
      })
      .then(function (user) {
       if(user.password != password){
          throw new Error('Invalid credentials');        
      }
     })
    }else if(user.participante==="CLIENT"){
      return getParticipantRegistry('zoom.app.main.Client')
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
* Login transaction processor function
* @param  {zoom.app.main.Register} register The Login transaction instance
* @transaction
*/

function register(register){
    var timestamp = generateId();
    register.existingClient = existingClient;
    register.name = name;
    register.password = password;
    register.confirmPassword = confirmPassword;
    register.mail = mail;
    register.number = number;
    register.city = city;
    register.country = country;
    register.localidad = localidad;
    register.street = street;
    var existingName;

    return getParticipantRegistry(existingClient.getFullyQualifiedType())
    .then(function (participantRegistry){
        return participantRegistry.get(existingClient.id);
    }).then(function (existingClient){
        existingName = existingClient.name;
        return getParticipantRegistry('zoom.app.main.Client')
    }).then(function (clientRegistry){
        var newClient = getFactory().newResource('zoom.app.main', 'Client', timestamp);
        newClient.name = name;
        newClient.password = password;
        newClient.confirmPassword = confirmPassword;
        newClient.mail = mail;
        newClient.number = number;
        newClient.city = city;
        nreClient.country = country;
        newClient.localidad = localidad;
        newClient.street = street;
        if(newClient.password == newClient.confirmPassword){
            if(existingName !== newClient.name){
                clientRegistry.add(newClient);
            }else{
                throw new Error('Existing name');
            }
        }else{
            throw new Error('Passwords dont match');
        }
    });

}

//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}