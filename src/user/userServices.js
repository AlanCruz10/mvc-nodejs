var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({email:userDetails.email}, function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined || result !=null) {
               resolve(false);
            }
            else {
               var userModelData = new userModel();
               
               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               userModelData.password = userDetails.password;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;
               
               userModelData.save(function resultHandle(error, result) {

                  if (error) {
                     resolve(false);
                  } else {
                     resolve(true);
                  }
               });
            }
         }
      })
       
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      //console.log(userDetails + "2")
      userModel.findOne({email: userDetails.email}, function getresult(errorvalue, result){
         //console.log(result)
         if(errorvalue) {
            reject({status: false, msg: "No existe"});
         }
         else {
            //console.log(result)
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario Encontrado " + " : " + userDetails.email});
            }
            else {
               reject({status: false,msg: "Usuario "+ userDetails.email +" No Existe"});
            }
         }
      })
   });
}

module.exports.deleteUserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      //console.log(userDetails + "2")
      userModel.findOneAndDelete({email: userDetails.email}, function getresult(errorvalue, result){
         //console.log(result)
         if(errorvalue) {
            reject({status: false, msg: "No existe"});
         }
         else {
            //console.log(result)
            if(result !=undefined &&  result !=null) {
               resolve({status: true,msg: "Usuario eliminado " + " : " + userDetails.email});
            }
            else {
               reject({status: false,msg: "Usuario "+ userDetails.email +" No Existe"});
            }
         }
      })
   });
}