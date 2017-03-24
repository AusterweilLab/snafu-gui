// with help from http://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/

module.exports = {

    init: function() {
        var spawn = require('child_process').spawn;
        var ok = spawn('./py/dist/interface.app/Contents/MacOS/interface');

        ok.stdout.on('data', function(data) {
            console.log(data.toString());
        });
       
        ok.stdout.on('end', function(data) {
            console.log("END");
        });

        ok.stderr.on('data', function(data) {
            console.log("ERR");
        });

        ok.stdin.write("test\n");
        ok.kill()
        return py;
    },

    exec: function(py, data) {
        py.stdin.write(JSON.stringify(data));
        py.stdin.end();
    },
       
    test: function() { return "hello world"; }
};
