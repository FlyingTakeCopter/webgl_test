var VSHADER =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '   v_Color = a_Color;\n' +
    '}\n';

var FSHADER =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' + // Precision qualifier (See Chapter 6)
    '#endif\n' +
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
    '   gl_FragColor = v_Color;\n' +
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER, FSHADER)){
        return;
    }

    var n = initVertexBuffers(gl);

    gl.clearColor(0.0, 0.0, 0.0, 0.5);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, n);
    // gl.drawArrays(gl.TRIANGLES, 0, n);

}

function initVertexBuffers(gl) {
    //点坐标缓冲区
    var data = new Float32Array([
        0.0, 0.5,   1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5,  0.0, 0.0, 1.0,
    ]);

    var FSIZE = data.BYTES_PER_ELEMENT;

    var n = 3;
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);

    return n;
}