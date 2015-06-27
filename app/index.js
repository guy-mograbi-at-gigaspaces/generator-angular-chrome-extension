'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        this.appname = path.basename( path.join(this.options.env.cwd));
        console.log('this is appname', this.appname );

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the great ' + chalk.red('AngularChromeExtension') + ' generator!'
        ));

        /*var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.someOption = props.someOption;
            done();
        }.bind(this));*/

        done();
    },

    writing: {
        app: function () {
            this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this);
            this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath('bower.json'), this);
            this.fs.copyTpl(this.templatePath('_manifest.json'), this.destinationPath('app/manifest.json'), this );
        },

        projectfiles: function () {
            var copy = function (from,to){
                if ( !to ){
                    to = from;
                }
                this.fs.copy(this.templatePath(from), this.destinationPath(to));
            }.bind(this);

            var copyApp = function(from){
                this.copy(from, 'app/' + from);
            }.bind(this);

            copy('editorconfig','.editorconfig');
            copy('jshintrc.json','.jshintrc');
            copy('bowerrc.json','.bowerrc');
            copy('gitignore','.gitignore');
            copy('Gruntfile.js');
            copyApp('background.html');
            copyApp('options.html');
            copyApp('popup.html');
            copyApp('scripts/background.js');
            copyApp('scripts/popup.js');
            copyApp('scripts/options.js');
            copyApp('styles/main.scss');
            copyApp('styles/_popup.scss');
            copyApp('styles/_options.scss');
            copyApp('images/icon-16.png');
            copyApp('images/icon-19.png');
            copyApp('images/icon-38.png');
            copyApp('images/icon-128.png');
            copyApp('dev/mockData.json');
        }
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
