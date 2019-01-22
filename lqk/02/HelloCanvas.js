function main() {
    // 获取canvas
    var canvas = document.getElementById('webgl');
    // 获取webgl绘图的上下文
    var gl = getWebGLContext(canvas);
    if (!gl){
        console.log('faile to get the rendering context');
        return;
    }
    // 清除指定canvas颜色
    gl.clearColor(0.0, 0.0, 0.0, 0.5);
    // 清除颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
}