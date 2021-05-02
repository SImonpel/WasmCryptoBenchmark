const JsNative = require('./jsNative')
const WebCrypto = require('./webCrypto')
const Benchmark = require('./benchmark')

import("../pkg/index.js").then(Wasm => {
    //const aesKey = new ArrayBuffer(16);

    (function () {
        var old = console.log;
        var logger = document.getElementById('log');
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
            } else {
                logger.innerHTML += message + '<br />';
            }
            old(message)
        }
    })();

    console.log("WASM Benchmark")
    Benchmark.fullBenchmark((buffer) => Wasm.sha_256(buffer))
    console.log("JsNative Benchmark")
    Benchmark.fullBenchmark((buffer) => JsNative.sha256(buffer))
    console.log("WebCrypto Benchmark")
    Benchmark.fullAsyncBenchmark((buffer) => WebCrypto.sha256(buffer))

    //console.log(wasm.sign_and_verify_ECDSA(buffer, '8d5c2593645eb2ab6c9ec7873970331de87ac6c8e101308916233d17858a90c', '0466885e94bcc4b5f56985c78d2f413bed07e5db73eeaf367b4e178831489dcfda69c57683ba1ad2d00769f35db5b4705818d9a2acc5c1fab44855f58dbfb1c21c'));
    //WebCrypto.signAndCheckECDSA(buffer, aesKey).then(value => console.log(value));
    //console.log(JsNative.signAndCheckECDSA(buffer, aesKey));

    //console.log(wasm.encrypt_and_decrypt_AES(buffer, aesKey));
    //WebCrypto.encryptAndDecryptAES(buffer, aesKey).then(value => console.log(value));
    //console.log(JsNative.encryptAndDecryptAES(buffer, aesKey));

}).catch(console.error);
