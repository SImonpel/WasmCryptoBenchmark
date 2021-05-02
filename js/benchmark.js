function getRandomBuffer() {
    var randomArray = new Uint8Array(256);
    var bufferArray = new Uint8Array(100000000);

    let crypto = window.crypto;
    crypto.getRandomValues(randomArray);

    var mergedArray = new Uint8Array(randomArray.length + bufferArray.length);
    mergedArray.set(randomArray);
    mergedArray.set(bufferArray, randomArray.length);

    return mergedArray;
}

function benchmark(toMeasure,repeatTimes){
    console.log("Average of " + repeatTimes)

    var completeTime = 0

    for (var i = 0; i < repeatTimes; ++i) {
        var buffer = getRandomBuffer();

        let start_time = new Date().getTime();
        let result = toMeasure(buffer);
        let end_time = new Date().getTime();

        console.log(result);

        completeTime += (end_time - start_time);
    }

    console.log(completeTime/repeatTimes + "ms")
}
async function asyncBenchmark(toMeasure, repeatTimes) {
    console.log("Average of " + repeatTimes)

    var completeTime = 0

    for (var i = 0; i < repeatTimes; ++i) {
        var buffer = getRandomBuffer();

        let start_time = new Date().getTime();
        let result = await toMeasure(buffer);

        let end_time = new Date().getTime();

        console.log(result);

        completeTime += (end_time - start_time);
    }

    console.log(completeTime / repeatTimes + "ms")
}

export function fullBenchmark(toMeasure) {
    benchmark(toMeasure, 1)
    benchmark(toMeasure, 5)
    //benchmark(toMeasure, 40)
    //benchmark(toMeasure, 100)
    //benchmark(toMeasure, 1000)
}

export async function fullAsyncBenchmark(toMeasure) {
    asyncBenchmark(toMeasure, 1)
    asyncBenchmark(toMeasure, 5)
    //asyncBenchmark(toMeasure, 40)
    //asyncBenchmark(toMeasure, 100)
    //asyncBenchmark(toMeasure, 1000)
}