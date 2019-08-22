// List of common functions
/*
 * Uppper Case for first symbol.
 * @param {string} word - word that will cahnged
 * @return for input word return - Word
 */
function firstUp(word) {
	return word.charAt(0).toUpperCase()
        + word.substr(1, word.length).toLowerCase();
}

/*
 * Prototype startWith for IE8
 */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

/*
 * Look inside site cookies and get value.
 * @param {string} name - cookie name.
 * @return existing cookie value or undefined.
 */
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback, delay, retryId) {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                if(callback != null){
                    callback();
                }
                return;

            } else if (retryId > 5) {
				return;
			} else {
                console.log("Wait for connection " + delay + "ms...")
                waitForSocketConnection(socket, callback, delay + 25, ++retryId);
            }

        }, delay); // wait 25 milisecond for the connection...
}

/*
 * Get coordinates in window
 */
function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

// Alias of requestAnimationFrame for JavaFX
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame   || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
             window.setTimeout(callback, 1000 / 60);
        };
})();

// Repair handlers inside JavaFX webView
function initPreviewInJavaFX() {
    function fillArrayOfElementsWithPointInside(x, y, elem, arrBouns, z) {
        var level = z;
        for (var i = 0; i < elem.children.length; i++) {
            var childBounds = elem.children[i].getBoundingClientRect();
            if (isPointInside(x, y, childBounds)) {
                elem.children[i].findedZ = level;
                arrBouns.push(elem.children[i]);
            }
            var newLevel = z + 1;
            fillArrayOfElementsWithPointInside(x, y, elem.children[i], arrBouns, newLevel);
        }
    }

    function isPointInside(x, y, bounds) {
        if (bounds.left <= x
                && bounds.bottom >= y
                && x <= bounds.right
                && y >= bounds.top) {
            return true;
        }
        return false;
    }

    function getElementByPoint(e, elem) {
        if(isPointInside(e.clientX, e.clientY, elem.getBoundingClientRect())) {
            var arrBouns = [];
            fillArrayOfElementsWithPointInside(e.clientX, e.clientY, elem, arrBouns, 0);
            arrBouns.sort(
               function(a,b) {
                   aR = a.getBoundingClientRect();
                   bR = b.getBoundingClientRect();
                   if (a.findedZ < b.findedZ) {
                        return 1;
                   } else if (a.findedZ > b.findedZ) {
                       return -1;
                   }else {
                        if (aR.left < bR.left
                            && aR.bottom > bR.bottom
                            && bR.right < aR.right
                            && bR.top > aR.top
                        ) {
                            return 1;
                        } else if(aR.left === bR.left
                            && aR.bottom === bR.bottom
                            && bR.right === aR.right
                            && bR.top === aR.top
                        ) {
                            return 0;
                        } else {
                            return -1;
                        }
                   }
                } 
            );
            console.log(arrBouns[0]);
            return arrBouns[0];
        };
    }

    var elem = document.getElementById("preview");
    function setWebViewListener(element, eventName) {
        element.addEventListener(eventName, function(e) {
            var event = new Event(eventName);
            event.clientX = e.clientX;
            event.clientY = e.clientY;
            event.stopPropagation();
            var target = getElementByPoint(e, element);
            if (target !== undefined) {
                console.log(target + " dispatch: " + eventName);
                target.dispatchEvent(event);
            }
        });
    }
    setWebViewListener(elem, "mouseover");
    setWebViewListener(elem, "mouseout");
    setWebViewListener(elem, "click");
}

//
// returns a list of all elements under the cursor
//
function elementsFromPoint(x,y) {
	var elements = [], previousPointerEvents = [], current, i, d;

        // get all elements via elementFromPoint, and remove them from hit-testing in order
	while ((current = document.elementFromPoint(x,y)) && elements.indexOf(current)===-1 && current != null) {
          
            // push the element and its current style
		elements.push(current);
		previousPointerEvents.push({
                value: current.style.getPropertyValue('pointer-events'),
                priority: current.style.getPropertyPriority('pointer-events')
            });
          
            // add "pointer-events: none", to get to the underlying element
		current.style.setProperty('pointer-events', 'none', 'important'); 
	}

        // restore the previous pointer-events values
	for(i = previousPointerEvents.length; d=previousPointerEvents[--i]; ) {
		elements[i].style.setProperty('pointer-events', d.value?d.value:'', d.priority); 
	}
      
        // return our results
	return elements;
}

