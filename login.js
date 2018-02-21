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

}

//Id generado a partir de la fecha actual
function generateId(){
    return String(Math.round(new Date().getTime()/1000));
}