use wasm_bindgen::prelude::*;
use web_sys::console;

use ring::digest::SHA256;
use ring::aead::*;
use hex;
use instant::Instant;




// Verification


use p256::ecdsa::{SigningKey, VerifyingKey, Signature, signature::Signer, signature::Verifier};

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: String);
}

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    Ok(())
}

#[wasm_bindgen]
pub fn sha_256(message: &[u8]) -> Vec<u8> {

    let now = instant::Instant::now();
    let hex_digest = hash(message);
    let new_now = instant::Instant::now();

    log(new_now.duration_since(now).as_millis().to_string());

    hex_digest
}

fn hash(message: &[u8]) -> Vec<u8> {
    let mut context = ring::digest::Context::new(&SHA256);
    context.update(message);

    context.finish().as_ref().to_vec()
}

//#[wasm_bindgen]
//pub fn sign_and_verify_ECDSA(message: &[u8]) {
//
//
//
//    // Signing
//    let signing_key = SigningKey::random(&mut OsRng); // Serialize with `::to_bytes()`
//    let signature = signing_key.sign(message);
//
//
//    let verify_key = VerifyingKey::from(&signing_key); // Serialize with `::to_encoded_point()`
//    verify_key.verify(message, &signature);
//
//}
//
//#[wasm_bindgen]
//pub fn encrypt_and_decrypt_AES(message: &mut [u8], key: &[u8]) -> Vec<u8> {
//
//     // Ring uses the same input variable as output
//     let mut in_out = message.clone();
//     let unboundKey = UnboundKey::new(&AES_128_GCM, key).unwrap();
//     // Opening key used to decrypt data
//
//     // Random data must be used only once per encryption
//     let nonce = Nonce::assume_unique_for_key([0; 12]);
//
//     let opening_key = OpeningKey::new(unboundKey.clone(), &nonce_sequence);
//
//     // Sealing key used to encrypt data
//     let sealing_key = SealingKey::new(unboundKey, &nonce_sequence);
//
//     // Encrypt data into in_out variable
//     let output_size = seal_in_place(&sealing_key, &nonce, &additional_data, &mut in_out,
//                                     AES_128_GCM.tag_len()).unwrap();
//
//     println!("Encrypted data's size {}", output_size);
//
//     open_in_place(&opening_key, &nonce, &additional_data, 0, &mut in_out).unwrap()
// }
