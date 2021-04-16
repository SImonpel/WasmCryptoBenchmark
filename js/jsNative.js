const sfjs = require('sjcl')

function sha256(buffer) {
    sjcl.hash.sha256.hash(buffer)
}

function signAndCheckECDSA(buffer, publicKey, privateKey) {
    pub = sjcl.codec.base64.fromBits(publicKey)
    sec = sjcl.codec.base64.fromBits(privateKey)

    var sig = pair.sec.sign(sjcl.hash.sha256.hash(buffer))
    var ok = pair.pub.verify(sjcl.hash.sha256.hash(buffer), sig)
}

function encryptAES(buffer, key) {
    ciphertext = sjcl.encrypt(key, buffer, {mode : "gcm"})
    sjcl.decrypt(key, ciphertext)
}