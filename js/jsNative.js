const sjcl = require('sjcl')
const createHash = require("sha256-uint8array").createHash;


export function sha256(buffer) {
    return createHash().update(buffer).digest();
}

//export function signAndCheckECDSA(buffer, publicKey, privateKey) {
//    const pub = sjcl.codec.base64.fromBits(publicKey)
//    const sec = sjcl.codec.base64.fromBits(privateKey)
//
//    const sig = pair.sec.sign(sjcl.hash.sha256.hash(buffer))
//    return pair.pub.verify(sjcl.hash.sha256.hash(buffer), sig)
//}
//
//export function encryptAndDecryptAES(buffer, key) {
//    const keyBytes = new Uint8Array(key)
//    const ciphertext = sjcl.encrypt(keyBytes, buffer, {mode : "gcm"})
//    return sjcl.decrypt(key, ciphertext)
//}