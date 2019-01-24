// attribute 存储限定符, 传输与顶点相关数据
// vertex shader
var VSHADER =
    'attribute vec4 a_Position;\n' +
    'void main(){ \n' +
    ' gl_Position = a_Position;\n' + // 设置坐标
    ' gl_PointSize = 10.0;\n' + // 设置尺寸
    '}\n';

// uniform   传输对于所有顶点都相同或者与顶点无关数据
// fragment shader
var FSHADER =
    'precision mediump float;\n' +//精度限定词
    'uniform vec4 u_Color;\n' +
    'void main() {\n' +
    ' gl_FragColor = u_Color;\n' + // 设置颜色
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

    // 本地变量绑定到 着色器顶点变量
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0){
        console.log('faile to get the a_Position');
        return;
    }

    var u_Color = gl.getUniformLocation(gl.program, 'u_Color');
    if (!u_Color){
        console.log('faile to get the u_Color');
        return;
    }

    canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position, u_Color); };
    // 将顶点位置传输给attribute变量
    // gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);

    // 清除指定canvas颜色
    gl.clearColor(0.0, 0.0, 0.0, 0.5);

    // 清除颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制
    // gl.drawArrays(gl.POINTS, 0, 1);
}

var g_points = [];
var g_colors = [];
function click(ev, gl, canvas, a_Position, u_Color) {
    var x = ev.clientX;// 浏览器客户端X坐标
    var y = ev.clientY;// 浏览器客户端Y坐标
    var rect = ev.target.getBoundingClientRect();// webgl在客户区的坐标 l t r b
    // 换算gl中的坐标 -1 ~ 1
    x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);
    // save points
    g_points.push([x,y]);
    // save color
    if (x >= 0 && y >= 0){
        // 右上
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (x < 0 && y >= 0){
        // 左上
        g_colors.push([1.0, 1.0, 0.0, 1.0]);
    } else if (x < 0 && y < 0){
        // 左下
        g_colors.push([0.0, 1.0, 1.0, 1.0]);
    } else {
        // 右下
        g_colors.push([1.0, 1.0, 1.0, 1.0]);
    }

    // 清除颜色缓冲区 保持背景色
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i++){
        var xy = g_points[i];
        var rgb = g_colors[i];
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        gl.uniform4f(u_Color, rgb[0], rgb[1], rgb[2], rgb[3]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}