(function(global) {
    var map = {
        'app': 'app',
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',
        'angular2-easy-forms': 'node_modules/angular2-easy-forms',
        'moment': 'node_modules/moment/moment.js',
        'ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js'
    };

    var packages = {
            'app': {main: 'main.js', defaultExtension: 'js' },
            'rxjs': {defaultExtension: 'js'},
            'angular2-easy-forms': {main: 'components.js', defaultExtension: 'js'}
        },
        ngPackageNames = [
            'common',
            'compiler',
            'core',
            'forms',
            'platform-browser',
            'platform-browser-dynamic',
            'upgrade'
        ];

    function packUmd(pkgName) { packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' }}

    ngPackageNames.forEach(packUmd);
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);