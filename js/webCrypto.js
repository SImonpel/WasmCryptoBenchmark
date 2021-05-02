const WebCrypto = require('easy-web-crypto')

export async function sha256(buffer) {
    return await crypto.subtle.digest("SHA-256", buffer);
}

export async function signAndCheckECDSA(buffer, publicKey, privateKey) {
    const pub = await WebCrypto.importPublicKey(publicKey, 'p256');
    const sec = await WebCrypto.importPrivateKey(privateKey, 'p256');

    const sig = await WebCrypto.sign(sec, data)
    return await WebCrypto.verify(pub, buffer, sig)
}

export async function encryptAndDecryptAES(buffer, key) {
    const keyBytes = new Uint8Array(key)
    const keyPair = await WebCrypto.genKeyPair()
    const exportedPub = await WebCrypto.exportPublicKey(keyPair.publicKey)
    console.log(exportedPub);
    console.log(keyBytes)

    const aesKey = await WebCrypto.importKey(keyBytes,'raw', 'AES-GCM');
    const encrypted = WebCrypto.encryptBuffer(aesKey, buffer);
    return await WebCrypto.decrypt(aesKey, encrypted);
}
