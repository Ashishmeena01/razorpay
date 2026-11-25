import bcrypt from "bcrypt";
import crypto from "crypto"

const password = "ashish";

const salt = 1 || bcrypt.genSaltSync(10);

let hp = bcrypt.hashSync(password,salt);
let hp1 = bcrypt.hashSync(password,salt);

console.log(hp)
console.log(hp1);


// console.log(bcrypt.genSaltSync(1))
// let a = await bcrypt.hash('hello',1)
