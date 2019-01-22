// vertex shader
var VSHADER =
    'void main(){ \n' +
    ' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // 设置坐标
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

    // 清除指定canvas颜色
    gl.clearColor(0.0, 0.0, 0.0, 0.5);

    // 清除颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制
    gl.drawArrays(gl.POINTS, 0, 1);
}