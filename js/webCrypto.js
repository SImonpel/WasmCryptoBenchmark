const WebCrypto = require('easy-web-crypto')

async function sha256(buffer) {
    await WebCrypto.hash(buffer)
}

async function signAndCheckECDSA(buffer, publicKey, privateKey) {
    const pub = await WebCrypto.importPublicKey(publicKey, 'p256');
    const sec = await WebCrypto.importPrivateKey(privateKey, 'p256');

    const sig = await WebCrypto.sign(sec, data)
    const isValid = await WebCrypto.verify(pub, buffer, sig)
}

async function encryptAES(buffer, key) {
    const aesKey = await WebCrypto.importKey(key);
    const encrypted = WebCrypto.encryptBuffer(aesKey, buffer)
    const val = await WebCrypto.decrypt(key, encrypted)
}
