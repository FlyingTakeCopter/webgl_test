// attribute 存储限定符, 传输与顶点相关数据
// uniform   传输对于所有顶点都相同或者与顶点无关数据
// vertex shader
var VSHADER =
    'attribute vec4 a_Position;\n' +
    'uniform float u_sin;\n' +
    'uniform float u_cos;\n' +
    'void main(){ \n' +
    ' gl_Position.x = a_Position.x * u_cos - a_Position.y * u_sin;\n' + // 设置坐标
    ' gl_Position.y = a_Position.y * u_cos + a_Position.x * u_sin;\n' + // 设置坐标
    ' gl_Position.z = a_Position.z;\n' + // 设置坐标
    ' gl_Position.w = 1.0;\n' + // 设置坐标
    ' gl_PointSize = 10.0;\n' + // 设置尺寸
    '}\n';

// fragment shader
var FSHADER =
    'void main() {\n' +
    ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // 设置颜色
    '}\n';

function main() {
    // 获取canvas
    var canvas = document.getElementById('webgl');
    // 获取webgl绘图的上下文
    var gl = getWebGLContext(canvas);
    if (!gl){
        console.log('faile to get the rendering context');
        return;
    }

    if (!initShaders(gl, VSHADER, FSHADER)){
        console.log('failed to initiallize shaders');
        return;
    }

    var n = initVertexBuffers(gl);
    if (n < 0){
        return;
    }

    // 设置旋转值
    var rotation = 10;
    // 绑定u_cos,u_sin
    var u_sin = gl.getUniformLocation(gl.program, 'u_sin');
    var u_cos = gl.getUniformLocation(gl.program, 'u_cos');

    // 循环执行
    window.setInterval(function () {
        // 角度转弧度
        var rad = Math.PI * rotation / 180.0;
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);

        // 设置值
        gl.uniform1f(u_sin, sin);
        gl.uniform1f(u_cos, cos);

        // 清除指定canvas颜色
        gl.clearColor(0.0, 0.0, 0.0, 0.5);

        // 清除颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);

        // 绘制三个点
        gl.drawArrays(gl.POINTS, 0, n);
        gl.drawArrays(gl.TRIANGLES, 0, n);   // 单独的三角形，如果点的个数不是3的倍数，最后剩下的点将被忽略

        rotation += 10;
    }, 50);
}


function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        -0.5,   -0.5,
        0,      0.5,
        0.5,   -0.5,
    ]);
    var n = 3;

    // 1.创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer){
        return -1;
    }

    // 2.将缓冲区对象绑定到 gl.ARRAY_BUFFER
    // gl.ARRAY_BUFFER 表示缓冲区对象中包含了顶点的数据
    // gl.ELEMENT_ARRAY_BUFFER 表示缓冲区对象中包含了顶点的索引值
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 3.向缓冲区对象中写入数据
    // bufferData(target, data, usage)
    // target gl.ARRAY_BUFFER或gl.ELEMENT_ARRAY_BUFFER
    // data   写入缓冲区的对象
    // usage  表示程序将如何使用存储在缓冲区对象中的数据。该参数将帮助WebGL优化操作
    //        gl.STATIC_DRAW  只会向缓冲区对象中写入一次数据，但需要绘制许多次
    //        gl.STREAM_DRAW  只会向缓冲区对象中写入一次数据，然后绘制若干次
    //        gl.DYNAMIC_DRAW 会向缓冲区对象中多次写入数据，并绘制很多次
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    // 4.将缓冲区对象分配给a_Position变量
    // vertexAttribPointer(location, size, type, normalized, stride, offset)
    // location 指定待分配attribute变量的存储位置
    // size     指定缓冲区中每个顶点的分量个数
    // type     指定数据格式
    // normalized 表明是否将非浮点型的数据归一化到[0,1]或[-1,1]区间
    // stride   指定相邻两个顶点间的字节数，默认为0
    // offset   指定缓冲区对象中的偏移量,即attribute变量从缓冲区中的何处开始存储
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    // 5.连接a_Position变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}
