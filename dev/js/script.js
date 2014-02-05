(function ($, window) {
    'use strict';
    var app = window.appName = {};

    /* -----------------------------------------------------------------
     * Initialize
    ----------------------------------------------------------------- */
    app.init = function () {
        var cmn = {};

        cmn.init = function () {
            app.functions.addLog('init!');
        };

        return cmn;
    };

    /* -----------------------------------------------------------------
     * Utility functions
    ----------------------------------------------------------------- */
    app.functions = (function () {
        var module = {

            addLog: function (log) {
                console.log(log);
            }
        };

        return module;
    }());

    /* -----------------------------------------------------------------
     * Setup
    ----------------------------------------------------------------- */
    $(function () {
        var app = window.appName.init();
        app.init();
    });
}(jQuery, window));