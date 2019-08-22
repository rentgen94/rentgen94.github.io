// API class open for users
// Provides operation that can used by mnemo objects
// blink, getModal ect.
var Api = new API(blinkManager);

// API Builder
function API(blinkManager) {
    // Works with blink
    _blinkManager = blinkManager;
}

/**
 * Set Blinking for passed element
 *
 * @param {Object} element - element that will blink
 * @param {string} prop - property that will change
 * @param {number} delay - time when need next blink (ms)
 * @param {Object} value - one or more values for blink states
 *     Example: "red", "green"
 */
API.prototype.blink = function(element, prop, delay, value) {
    if (element._haveBlink) {
        return;
    }

    _blinkManager.addBlink(element, delay);
    var values = Array.prototype.splice.call(arguments, 3);
    _blinkManager.prepareForBlink(element, prop, values);
}

/**
 * Stop blinking at passed element
 *
 * @param {Object} element - element with blinking
 * @param {string} prop - property that will change
 * @param {Object} stopValue - new value after stop
 */
API.prototype.stopBlink = function(element, prop, stopValue) {
    _blinkManager.deleteBlink(element, prop, stopValue);
}

function _fillProperties(element, elemData) {
    var properties = elemData.properties;
    if (element.properties === undefined) {
        element.properties = {};
    }
    for (var x in properties) {
        if (properties.hasOwnProperty(x)) {
            // Init properties item if not exit only!
            if (element.properties[x] === undefined) {
                element.properties[x] = properties[x];
            }
        }
    }
}

function _fillPageSignals(element, elemData) {
    var signals = elemData.signals;
    element.signals = {};
    for (var x in signals) {
        if (signals.hasOwnProperty(x)) {
            var id = signals[x].id;
            if (!id || id.startsWith("blank")) {
                id = "blank" + unwiredId++;
            }

            // Init PageSignals item if not exit only!
            if (pageSignals[id] === undefined) {
                pageSignals[id] = { value: signals[x].value };
            }

            element.signals[x] = pageSignals[id];
        }
    }
}
