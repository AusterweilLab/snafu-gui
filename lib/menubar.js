// for mac only... unused, preserved here for reference

// Menu bar
/*
var menu = new gui.Menu({type: 'menubar'});
menu.createMacBuiltin("Experiment Loader");
win.menu=menu;

var tasks = new gui.MenuItem({ label: 'Tasks' });
tasks.submenu = new gui.Menu();
tasks.submenu.append(new gui.MenuItem({ 
    label: 'Main Menu',
    click: function() { window.location.href = home+"/main/index.html" }
}));
tasks.submenu.append(new gui.MenuItem({ 
    label: 'Response Time',
    click: function() { window.location.href = home+"/tasks/rt/index.html" }
}));
tasks.submenu.append(new gui.MenuItem({
    label: 'Visual Search',
    click: function() { window.location.href = home+"/tasks/waldo/index.html" }
}));
tasks.submenu.append(new gui.MenuItem({
    label: 'Ravens Progressive Matrices',
    click: function() { window.location.href = home+"/tasks/ravens/index.html" }
}));
tasks.submenu.append(new gui.MenuItem({
    label: 'Flanker Task',
    click: function() { window.location.href = home+"/tasks/flanker/index.html" }
}));

menu.append(tasks);

var option = {
  key : "Ctrl+Shift+Q",
  active : function() {
    console.log("Global desktop keyboard shortcut: " + this.key + " active."); 
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

var shortcut = new gui.Shortcut(option);
gui.App.registerGlobalHotKey(shortcut);

shortcut.on('active', function() {
    window.location.href = home+"/main/index.html";
});
*/

