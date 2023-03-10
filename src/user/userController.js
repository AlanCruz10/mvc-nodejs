var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        //console.log(req.body + "3")
        result = await userService.searchUserDBService(req.body);
        console.log(result)
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        //console.log(req.body + "3")
        result = await userService.deleteUserDBService(req.body);
        console.log(result)
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);

    let email = req.params.email;

    console.log(req.params.email);
    console.log(email);
    var status = await userService.updateUserDBService(email, req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Usuario Actualizado" });
    } else {
        res.send({ "status": false, "message": "Error Actualizando usuario" });
    }
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchUserControllerFunc, deleteUserControllerFunc, updateUserControllerFunc };