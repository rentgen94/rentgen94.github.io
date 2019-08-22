// fetch ace's language tools module:
var langTools = ace.require('ace/ext/language_tools');
//create editor
var editor = ace.edit("editor");
// Variables for tern server(Autocomplete) and Used Docs
var server, docs = [];


// Set visual settings
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/javascript");
editor.getSession().setUseWrapMode(true);
editor.getSession().setWrapLimitRange(null, null);
editor.setShowPrintMargin(false);
editor.$blockScrolling = Infinity;//prevents ace from logging annoying warnings

// Set Editor Options
ace.config.loadModule('ace/ext/tern', function () {
    editor.setOptions({
        /**
         * Either `true` or `false` or to enable with custom options pass object that
         * has options for tern server: http://ternjs.net/doc/manual.html#server_api
         * If `true`, then default options will be used
         */
        enableTern: {
            /* http://ternjs.net/doc/manual.html#option_defs */
            defs: ['browser', 'ecma5'],
            /* http://ternjs.net/doc/manual.html#plugins */
            plugins: {
                requirejs: {
                    "baseURL": "",
                    "paths": {}
                },
                doc_comment: {
                    fullDocs: true
                },
            },
            /**
             * (default is true) If web worker is used for tern server.
             * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
             */
            useWorker: false,
            /* if your editor supports switching between different files
            (such as tabbed interface) then tern can do this when jump to 
            defnition of function in another file is called, but you must 
            tell tern what to execute in order to jump to the specified file */
            switchToDoc: function (name, start) {
                console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
            },
            /**
             * if passed, this function will be called once ternServer is started.
             * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
             */
            startedCb: function () {
                //once tern is enabled, it can be accessed via editor.ternServer
                server = editor.ternServer;
                appendScripts();
            },
        },
        /**
         * when using tern, it takes over Ace's built in snippets support.
         * this setting affects all modes when using tern, not just javascript.
         */
        enableSnippets: false,

        wrap: false,
        
        /**
         * when using tern, Ace's basic text auto completion is enabled still by deafult.
         * This settings affects all modes when using tern, not just javascript.
         * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
         */
        enableBasicAutocompletion: true,
    });
});

//#region not relevant to tern (custom beautify plugin) and demo loading
ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
    editor.setOptions({
        // beautify when closing bracket typed in javascript or css mode
        autoBeautify: true,
        // this enables the plugin to work with hotkeys (ctrl+b to beautify)
        htmlBeautify: true,
    });
    
    //modify beautify options as needed:
    window.beautifyOptions = beautify.options;
});

/**
 * Adds a document to tabs and server
 * @param {string} name - name of document including path
 * @param {ace.EditSession} doc
 */
function registerDoc(name, doc) {
    server.addDoc(name, doc);
}

//returns new ace edit session- (auto sets mode to javscript)
function newAceDoc(documentText) {
    var EditSession = ace.require("ace/edit_session").EditSession;
    return new EditSession(documentText, "ace/mode/javascript");
}

/**
 * Append header scripts with class appendToEdit
 * Needs for autocomplete in ACE editor
 * Be careful, this methods handle by Java in MnemoDialog
 */
function appendScripts() {
    var scripts = document.getElementsByClassName("appendToEdit");
    var requests = [];
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src !== undefined) {
            if (window["javaApp"] === undefined) {
                (function(i) {
                    requests[i] = new XMLHttpRequest();
                    var scriptPath = scripts[i].src;
                    requests[i].myId = i;
                    requests[i].onreadystatechange = function() {
                        if (requests[i].readyState === 4) {
                            if (requests[i].status === 200) {
                                var scriptContent = requests[i].responseText;
                                console.log(scriptPath);
                                registerDoc(scriptPath, newAceDoc(scriptContent));
                            }
                        }
                    };

                    requests[i].open('GET', scriptPath);
                    requests[i].send();
                })(i);
            } else {
               javaApp.appendFile(scripts[i].src);
            }
        }
    }
    // Append script which fill properties and signals for autocomplete
    if (window["javaApp"] === undefined) {
        javaApp.appendFillScript();
    }
}


//-----------------------------CustomCompleter---------------------------------

// data stub:
var sqlTables = [
  { name: 'users', description: 'Users in the system' },
  { name: 'userGroups', description: 'User groups to which users belong' },
  { name: 'customers', description: 'Customer entries' },
  { name: 'companies', description: 'Legal entities of customers' },
  { name: 'loginLog', description: 'Log entries for user log-ins' },
  { name: 'products', description: 'Products offered in the system' },
  { name: 'productCategories', description: 'Different product categories' }
];

// create a completer object with a required callback function:
var sqlTablesCompleter = {
  getCompletions: function(editor, session, pos, prefix, callback) {
    callback(null, sqlTables.map(function(table) {
      return {
        caption: table.description,
	value: table.name,
	meta: "Table"
      };
    }));	
  }
};

// finally, bind to langTools:
langTools.addCompleter(sqlTablesCompleter);

var completer = {
  getCompletions: function(editor, session, pos, prefix, callback) {
    var completions = [];
    completions.push({
      caption: "MOM_Abort",
      snippet: "MOM_Abort",
      meta: "NOT LOCAL"
    });
    callback(null, completions);
  }
}

langTools.addCompleter(completer);


// uses http://rhymebrain.com/api.html
    var rhymeCompleter = {
        getCompletions: function(editor, session, pos, prefix, callback) {
            if (prefix.length === 0) { callback(null, []); return }
            $.getJSON(
                "http://rhymebrain.com/talk?function=getRhymes&word=" + prefix,
                function(wordList) {
                    // wordList like [{"word":"flow","freq":24,"score":300,"flags":"bc","syllables":"1"}]
                    callback(null, wordList.map(function(ea) {
                        return {name: ea.word, value: ea.word, score: ea.score, meta: "rhyme"}
                    }));
                })
        }
    }
    langTools.addCompleter(rhymeCompleter);
