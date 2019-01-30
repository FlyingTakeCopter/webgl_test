var VSHADER =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main(){\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = a_PointSize;\n' +
    '}\n';

var FSHADER =
    'void main(){\n' +
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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

}

function initVertexBuffers(gl) {
    // 点坐标缓冲区
    var data = new Float32Array([
        0.0, 0.5,   5.0,
        -0.5, -0.5, 10.0,
        0.5, -0.5,  15.0
    ]);
    var FSIZE = data.BYTES_PER_ELEMENT;
    alert(FSIZE);
    alert(gl.FLOAT);


    var n = 3;
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*3, 0);
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE*3, FSIZE*2);

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}