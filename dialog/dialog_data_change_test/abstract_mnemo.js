/**
 * File provide operation with svg shapes.
 *
 * @author Shchurbin Egor (rentgengo.94@gmail.com)
 */

//Last_Modified 2018-03-01 | (YYYY-MM-DD)
/**
 * Ask server for Modal window of input element.
 *
 * On server strings like (%1_OPEN) in Function Block will evaluate with params.
 * For example: user pass parameters = [ "TEST_KKS" ],
 * and Function Block have SIGNAL_NAME = %1_OPEN
 * after evaluation on server it becomes - TEST_KKS_OPEN
 *
 * @param {number} idElem - id of element
 * @param {string} pageKKS - page name in GET-R1
 * @param {Objects[]} parameters - array of params, which evaluate on server
 */
function getModal(idElem, pageKKS, parameters) {
	var modal;
	var modalContent;
	var span;
	var svg;
	var divModalName = '_DivModal';
	var contentName  = '_ModalContent';
	var closeName    = "_Close";
	var svgName      = "_ModalSVG";
	if (document.getElementById(idElem + divModalName) == null) {
		// Get the modal
		modal = document.createElement("div");
		modal.classList.add("modal");
		modal.id = idElem + divModalName;
		modal.draggable = "true";

		// Get the element that opens the modal
		modalContent = document.createElement("div");
		modalContent.classList.add("modal-content");
		modalContent.id = idElem + contentName;
		modal.appendChild(modalContent);

		// Get the close button in modal
		span = document.createElement("span");
		span.classList.add("close");
		span.id = idElem + closeName;
		span.innerHTML = "&times;";
		modalContent.appendChild(span);

		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.id = idElem + svgName;
		svg.setAttribute("preserveAspectRatio", "xMidYMin slice");
		svg.setAttribute("style", "width: 100%; padding-bottom: 100%; height: 1px; overflow: visible");
		modalContent.appendChild(svg);

		document.body.appendChild(modal);
	} else {
		return;
	}

	var element = document.getElementById(idElem);

	// When the user clicks the button, open the modal
	element.addEventListener("click", function(ev) {
		modal.style.display = "block";
	});

	span.onclick = function(ev) {
		modal.style.display = "none";
		ev.stopPropagation();
	}

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            svg.innerHTML = this.responseText;
			initElements(svg.children);
			modal.style.display = "block";

			var width = (svg.getBBox().x + svg.getBBox().width);
			width = width > 100 ? width : 100;
			var height = (svg.getBBox().y + svg.getBBox().height);
			height = height > 50 ? height : 50;
			modalContent.style.width = width + "px";
			modalContent.style.height = height + span.offsetHeight + "px";
			modal.style.width = width/0.9 + modalContent.style.padding + "px";
			svg.style.paddingBottom = (100*height/width) + "%";

			setElementMovable(modal.id, true);
        }
    };

    xhttp.open("POST", "/getModal", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("pageKKS="
        + pageKKS
        + "&parameters="
        + JSON.stringify(parameters)
        + "&modalId="
        + "_for_" + idElem);
}

function getNewPageInModal(idElem, src) {
    var modal;
	var modalContent;
	var span;
	var iframe;
	var divModalName = '_DivModal';
	var closeName = "_Close";
	var iframeName = "_ModalIFrame";
	if (document.getElementById(idElem + divModalName) == null) {
		// Get the modal
		modal = document.createElement("div");
		modal.classList.add("modal");
		modal.id = idElem + divModalName;
		modal.style.position = "absolute";
		modal.style.width = "50%";
		modal.style.height = "100%";
		modal.style.top = "0%";
		modal.style.left = "49%";
		modal.draggable = "true";

		// Get the close button in modal
		span = document.createElement("span");
		span.classList.add("close");
		span.id = idElem + closeName;
		span.style.paddingRight = "15px";
		span.innerHTML = "&times;";
		modal.appendChild(span);

		iframe = document.createElement("iframe");
		iframe.id = idElem + iframeName;
		iframe.setAttribute("src", src);
		iframe.setAttribute("draggable", "false");
		iframe.setAttribute("style", "width: 99%; height: 92%; overflow: visible");
		modal.appendChild(iframe);

		document.body.appendChild(modal);

		var element = document.getElementById(idElem);

		// When the user clicks the button, open the modal
		element.addEventListener("click", function(ev) {
			modal.style.display = "block";
		});

		span.onclick = function(ev) {
			modal.style.display = "none";
			ev.stopPropagation();
		}

		modal.style.display = "block";
		setElementMovable(modal.id, false);
	} else  {
		return;
	}
}


function setElementMovable(elementId, isAppend) {
	var element = document.getElementById(elementId);

    element.ondragstart = function(e) {
        moveElem(e);
    }

	element.addEventListener('touchmove', function(e) {
		moveElem(e);
    }, false);

	element.onselectstart = function (evt) {
		return false;
	}

	function moveElem(e) {
        var coords = getCoords(element);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        element.style.position = 'absolute';
		if (isAppend) {
			document.body.appendChild(element);
		}
        moveAt(e);

        element.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            element.style.left = e.pageX - shiftX + 'px';
            element.style.top = e.pageY - shiftY + 'px';
        }

		element.ondragend = function(e) {
			moveAt(e);
			element.style.zIndex = 1;
		};

		document.addEventListener("dragover", function(event) {
            event.preventDefault();
		});
	}
}

function initElement(element, notShowWarn) {
    var elemData = JSON.parse(element.getAttribute("data-vars"));
    _fillProperties(element, elemData);
    _fillPageSignals(element, elemData);

    // Init this element
    if (window["init" + element.classList[0]] !== undefined) {
        element.initFunc = window["init" + element.classList[0]];
        element.initFunc();
    } else if (notShowWarn) {
    } else {
        console.warn("For element "
            + element.classList[0]
            + " and id: " + element.id
            + " initFunction doesn't exist!"
        );
    }

    // Set Render Function
    if (window["render" + element.classList[0]] !== undefined) {
        element.render = window["render" + element.classList[0]];
        renderedElements.push(element);
    } else if (notShowWarn) {
    } else {
        console.warn("For element "
            + element.classList[0]
            + " and id: " + element.id
            + " renderFunction doesn't exist!"
        );
    }

}

/*
 * Init array of passed elements
 */
function initElements(elements) {
    for (var i = 0; i < elements.length; i++) {
        initElement(elements[i]);
    }
}

/*
 * Init element inside preview dialog on GET-R1
 */
function addPreview() {
    // Clean preview
    renderedElements.length = 0;

    // Get first element
    // In preview myst shows only one element
    var element = document.getElementById(0);
    initElement(element, true);

    // Clear blinks if they exist
    blinkManager.clear();
}

// Class to Manages all Blinks
function BlinkManager() {
    this._blinkId = 0;
    this.blinkMap = Object.create(null);
}

// Adds
BlinkManager.prototype.addBlink = function(element, delay) {
    // Check created blinks, if not exist - create
    if (this.blinkMap[delay] === undefined) {
        this.blinkMap[delay] = {
            nextStart: Date.now(),
            elements: Object.create(null),
            needSync: false,
        }
    }

    // Simply add element to existing Blink
    element["blinkId"] = this._blinkId;
    this.blinkMap[delay].elements[this._blinkId] = element;
    this._blinkId++;

    // Synchronize animations
    this.blinkMap[delay].needSync = true;
}

// Delete Blink for element
BlinkManager.prototype.deleteBlink = function(element, prop, stopValue) {
    if (element._haveBlink === false || element._haveBlink === undefined) {
        return;
    } else {
        for (var delay in this.blinkMap) {
            if (this.blinkMap[delay].elements[element.blinkId] !== undefined) {
                this.blinkMap[delay].elements[element.blinkId]._haveBlink = false;
                element[prop] = stopValue;
                delete this.blinkMap[delay].elements[element.blinkId];
            }
        }
    }
}

// Prepare Element for blinking
// set _haveBlink = true
// set _changeProp
// set _curState = 0;
// fill _blinkStates array;
BlinkManager.prototype.prepareForBlink = function(element, prop, values) {
    element._haveBlink = true;
    element._changeProp = prop;
    element._curState = 0;
    element._blinkStates = values;
}

BlinkManager.prototype.synchronizeAnimations = function(element, delay) {
    if (!this.blinkMap[delay].needSync) {
        return;
    } else {
        element._curState = 0;
    }
}

// Update state of Element
BlinkManager.prototype.updateElement = function(element, delay) {
    if (element._haveBlink === false) {
        return;
    } else {
        this.synchronizeAnimations(element, delay);

        // Set new State for element
        element[element._changeProp] = element._blinkStates[element._curState];
        element._curState++;
        if (element._curState >= element._blinkStates.length) {
            element._curState = 0;
        }
    }
}

// Update states in blinks
BlinkManager.prototype.update = function(startTime) {
    // Loop throught various of frequencies
    for (var delay in this.blinkMap) {
        if (startTime > this.blinkMap[delay].nextStart) {
            // update next start
            this.blinkMap[delay].nextStart = startTime + +delay;

            // Loop throught elements
            for (var elem in this.blinkMap[delay].elements) {
                this.updateElement(
                    this.blinkMap[delay].elements[elem],
                    delay
                );

            }

            // When update all elements they all synced
            // disable sync
            this.blinkMap[delay].needSync = false;
        } else {
            continue;
        }
    }
}

// Clear Blink for new animations
BlinkManager.prototype.clear = function() {
    for (var delay in this.blinkMap) {
        for (var elem in this.blinkMap[delay].elements) {
            this.blinkMap[delay].elements[elem]._haveBlink = false;
        }
        this.blinkMap[delay].elements = Object.create(null);
    }
}

// Create BlinkManager Instance
var blinkManager = new BlinkManager();
