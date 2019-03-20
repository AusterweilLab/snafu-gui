document.getElementById('svg_export').onclick = function() {
    var output = s.toSVG({download: true, filename: 'mygraph.svg', labels: true, data: true, size: 1000});
};

document.getElementById('zoom_in').onclick = function() {
    s.cameras[0].goTo({ ratio: s.camera.ratio / 1.25 });
};

document.getElementById('zoom_out').onclick = function() {
    s.cameras[0].goTo({ ratio: s.camera.ratio * 1.25});
};

