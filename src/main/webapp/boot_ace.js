/**
 *  Use aysnc script loader, configure the application module (for AngularJS)
 *  and initialize the application ( which configures routing )
 *
 *  @author 
 */

(function(window, head) {
    "use strict";
var root="";
    head.js(
    	// Pre-load these for splash-screen progress bar...
    	
    	{ jquery     : root+"/lib/jquery.js"},
    	{ bootstrap  : root+"/lib/bootstrap.js"},
    	{ angular    : root+"/lib/angular-1.4.0/angular.js"},
    	{ ngRoute    : root+"/lib/angular-1.4.0/angular-route.min.js"},
    	{ ngResource    : root+"/lib/angular-1.4.0/angular-resource.min.js"},
    	{ ngAnimate  : root+"/lib/angular-1.4.0/angular-animate.min.js"},
    	{ ngArea  : root+"/lib/angular-1.4.0/angular-aria.min.js"},
    	{ ngCookies  : root+"/lib/angular-1.4.0/angular-cookies.min.js"},
    	{ ngLoader  : root+"/lib/angular-1.4.0/angular-loader.min.js"},
    	{ ngMessageFormat  : root+"/lib/angular-1.4.0/angular-message-format.min.js"},
    	{ ngMessage  : root+"/lib/angular-1.4.0/angular-messages.min.js"},
    	{ ngMocks  : root+"/lib/angular-1.4.0/angular-mocks.js"},
    	{ ngScenario  : root+"/lib/angular-1.4.0/angular-scenario.js"},
    	{ ngSanitize  : root+"/lib/angular-1.4.0/angular-sanitize.min.js"},
    	{ ngTouch  : root+"/lib/angular-1.4.0/angular-touch.min.js"},
    	
    	{ uiBootstrap: root+"/lib/ui-bootstrap-tpls.min.js"},
    	{ underscore : root+"/lib/underscore.js"},
    	{ loadingBar : root+"/lib/loading-bar.min.js"},
    	{ angularIdle: root+"/lib/angular-idle.js"},
    	{ angularTranslate : root+"/lib/angular-translate.js"},
    	{ uiRouter   : root+"/lib/angular-ui.js"},
    	{  uiGrid    : root+"/angular-ui-grid/ui-grid.min.js"},
    	
    	{ uiSelect2  : root+"/lib/select2.min.js"},
    	/*{ ace : root+"/lib/ace.js"},*/
    	{ datepicker : root+"/lib/datepicker.js"},
    	{ textAngular : root+"/lib/text-angular.js"},
    	{ angularFileUpload : root+"/lib/angular-file-upload.js"},
    	{ ngDragDrop: root+"/lib/angular-dragdrop.min.js"},
    	{ pdfmake    : root+"/lib/pdfmake.js"},
    	{ vfsFontd   : root+"/lib/vfs_fonts.js"}/*,
    	{angularApp:root+"/angular-app.min.js"}*/
       
 
    )
    .ready("ALL", function() {

        require.config ({
            appDir  : '',
            baseUrl : './app',
            priority: 'angular',
            paths   :
            {
                // Configure alias to full paths

            },
            shim    :
            {
                'underscore':
                {
                    exports : '_'
                }
            }
        });

        require(["app-module"], function(app) {
            // Application has bootstrapped and started...
        });

    });

}(window, head));