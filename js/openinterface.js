// with help from http://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/

module.exports = {

    init: function() {
        var spawn = require('child_process').spawn;
        var pyapp = spawn('./py/dist/interface.app/Contents/MacOS/interface');

        pyapp.stdout.on('data', function(data) {
            console.log(data.toString());
        });
       
        pyapp.stdout.on('end', function(data) {
            console.log("END");
        });

        pyapp.stderr.on('data', function(data) {
            console.log("ERR");
        });

        //pyapp.stdin.write("init successful,\n");
        //pyapp.kill()
        return pyapp;
    },

    exec: function(pyapp, data) {
        pyapp.stdin.write(JSON.stringify(data));
        //pyapp.stdin.end();
    },
       
    test: function() { return "hello world"; }
};
