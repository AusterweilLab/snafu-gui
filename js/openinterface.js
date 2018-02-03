// with help from http://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/

// why should i need to pass `console` to these functions? that's dumb!
// see: https://github.com/nwjs/nw.js/issues/196

module.exports = {

    init: function(console) {
        console.log("PyApp init successful");
        var spawn = require('child_process').spawn;
        var instance = spawn('./py/dist/interface.app/Contents/MacOS/interface');

        instance.stdout.on('data', function(data) {
            //console.log(data.toString());
            pyreplace(data.toString());
        });
       
        instance.stdout.on('end', function(data) {
            console.log("END");
        });

        instance.stderr.on('data', function(data) {
            console.log("ERR");
        });

        //instance.kill()
        return instance;
    },

    exec: function(console, instance, data) {
        instance.stdin.write(data + "\n");
        //instance.stdin.end();    // This should be called when nwjs is closed so that interface socket doesn't stay open or cause error
    },
       
    test: function(console) { 
        console.log("hello");
        return "goodbye"; 
    }
};
