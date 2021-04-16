use wasm_bindgen::prelude::*;
use web_sys::console;

use ring::digest::SHA256;
use hex;

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

    log(hex::encode(hash(b"abcde")));
    log(hex::encode(encryptAES(b"abcde")));
    log(hex::encode(encryptRSA(b"abcde")));

    Ok(())
}

#[wasm_bindgen]
pub fn hash(message: &[u8]) -> Vec<u8> {
    let mut context = ring::digest::Context::new(&SHA256);
    message.chunks(1024).for_each(|chunk| context.update(chunk));

    context.finish().as_ref().to_vec()
}

#[wasm_bindgen]
pub fn encryptAES(message: &[u8]) -> Vec<u8> {
    message.to_vec()
}

#[wasm_bindgen]
pub fn encryptRSA(message: &[u8]) -> Vec<u8> {
    message.to_vec()
}
