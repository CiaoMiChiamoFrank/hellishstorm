const {createAdmin, existAdmin} = require ('./AdminDAO')

async function createAdminService(nome, pwd) {
    const bool = await createAdmin(nome, pwd)
    return bool
}

async function loginService(nome, pwd) {
    const bool = await existAdmin(nome, pwd)
    return bool
}

module.exports = {createAdminService, loginService}