const bcrypt = require('bcrypt')
const { runInContext, cloneWith } = require('lodash')

// bcrypt.genSalt(10) // it will take 2nd argument as a callback instead of callback we can make it promise by putting await infront an put inside async fucntion

async function run(){
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash('1234', salt)

    console.log(salt); // $2b$10$jzpw9.r.Ws/DBf5AAFz/hu
    console.log(hashed); // $2b$10$YUjiqu/7Gde61SOEhDuv6.22Xy2xP2WkN7EtXliOkh0ZEnJqiBfFS

}

run();