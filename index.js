$(function(){
	var PIXI = require('pixi')
    // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
    var renderer = new PIXI.WebGLRenderer($(window).width(), $(window).height()); 

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Stage;

    var bunnyTexture = PIXI.Texture.fromImage("assets/textures/bunny.png");
    var bunny = new PIXI.Sprite(bunnyTexture);

    bunny.position.x = 400;
    bunny.position.y = 300;

    bunny.scale.x = 2;
    bunny.scale.y = 2;

    stage.addChild(bunny);

    requestAnimationFrame(animate);

    function animate() {
        bunny.rotation += 0.1;

        renderer.render(stage);

        requestAnimationFrame(animate);
    }
})