/**
 * @author Shchurbin Egor (rentgengo.94@gmail.com)
 */

function drawAll() {
    var start = Date.now();
    var arr = renderedElements, length = renderedElements.length, i = 0;
    for ( ; length--; ) {
        arr[i++].render();
    }
    blinkManager.update(start);
//    console.log("Total duration: " + (Date.now() - start) + " ms");
    requestAnimationFrame(drawAll);
}

// Start render loop
window.onload = function ready() {
//    initPreviewInJavaFX();
    requestAnimationFrame(drawAll);
}

function allWithWorker() {
    var worker = new Worker('./webworker.js');

    worker.addEventListener('message', function(e) {
        for (var signal in e.data) {
            for (var prop in e.data[signal]) {
                pageSignals[signal][prop] = e.data[signal][prop];
            }
        }
        console.log('Updated');
    }, false);

    worker.postMessage(pageSignals); // Send data to our worker.
}
