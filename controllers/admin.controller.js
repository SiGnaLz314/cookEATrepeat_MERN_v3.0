"use strict";

let AdminCtrl = (User)=>{
    let AdminObj = {};
    
    AdminObj.GetProfiles = (req, res, next) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    
    return AdminObj;
}

module.exports = AdminCtrl;