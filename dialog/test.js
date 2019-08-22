//var test = {};
//
//function fillTest(some) {
//    some.x = {
//        innerX : "Hehe",    
//    };
//    some.y = "Lul";
//}
//
//fillTest(test);

//window.onload = function() {
//    var test = document.getElementById(0);
//
//    addPreview(test);
//};

var elem = document.getElementById(0);

var str = elem.getAttribute("data-vars");

var testStr = "{ \"hello\": \"WOW\" }";

var obj = JSON.parse(testStr);

//var testData = JSON.parse(str);

var elemData = {
    properties: {
        PropTest: "Hello world!",
    },
    signals: {
        ALA: {
            value: true,
        }
    }
}

fillProperties(elem, elemData);
fillPageSignals(elem, elemData);
