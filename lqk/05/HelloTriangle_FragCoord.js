var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main(){\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '}';

var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform float u_Width;\n' +
    'uniform float u_Height;\n' +
    'void main(){\n' +
    '   gl_FragColor = vec4(gl_FragCoord.x/u_Width, gl_FragCoord.y/u_Height, 0.0, 1.0);\n' +
    '}';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var n = initVertexBuffers(gl);
    // 清除canvas颜色
    gl.clearColor(0.0, 0.0, 0.0, 0.5);
    // 清除颜色缓冲区颜色
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    var n = 3;
    var data = new Float32Array([
        0.0,  0.5,
        -0.5, -0.5,
        0.5,  -0.5,
    ]);

    var FSIZE = data.BYTES_PER_ELEMENT;


    // 1.创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    // 2.将缓冲区对象绑定到 gl.ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 3.向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    // 4.将缓冲区对象分配给a_Position变量
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*2, 0);

    var u_Width = gl.getUniformLocation(gl.program, 'u_Width');
    var u_Height = gl.getUniformLocation(gl.program, 'u_Height');
    gl.uniform1f(u_Width, gl.drawingBufferWidth);
    gl.uniform1f(u_Height, gl.drawingBufferHeight);

    // 5.连接a_Position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);



    return n;
}