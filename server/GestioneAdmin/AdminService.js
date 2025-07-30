const {createAdmin, existAdmin} = require ('./AdminDAO')

async function createAdminService(nome, pwd) {
    const bool = await createAdmin(nome, pwd)
    return bool
}

async function loginService(nome, pwd) {
  return await existAdmin(nome, pwd); 
}

module.exports = {createAdminService, loginService}