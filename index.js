$(function(){
	var PIXI = require('pixi')
    // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
    var renderer = new PIXI.WebGLRenderer($(window).width(), $(window).height()); 
    $('#mainPixiIntro').append(renderer.view);

    var stage = new PIXI.Stage;
    var invTexture = PIXI.Texture.fromImage("assets/images/investigator.png");
    goRt = true;
    invMaxSprtX = 200;
    invSpri = new PIXI.Sprite(invTexture);
    invSpri.position.x = 0;
    invSpri.position.y = 0;
    invSpri.scale.x = 0.65;
    invSpri.scale.y = 0.65;
    invSpri.height =  $(window).height();
    invSpri.alpha = 0.4;

    var invTextureBG = PIXI.Texture.fromImage("assets/images/investigatorPixelated.png");
    invBgSpri = new PIXI.Sprite(invTextureBG);
    invBgSpri.position.x = -2;
    invBgSpri.position.y = 0;
    invBgSpri.scale.x = 0.65;
    invBgSpri.scale.y = 0.65;
    invBgSpri.height =  $(window).height();
    invBgSpri.alpha = 0.8;
    //invSpri.blendModes.SCREEN;


    var bgTexture = PIXI.Texture.fromImage("assets/images/northbeachp.jpg");
    bgSpri = new PIXI.Sprite(bgTexture);
    bgSpri.position.x = 0;
    bgSpri.position.y = 20;
    bgSpri.scale.x = 1.2;
    bgSpri.scale.y = 1.2;
    bgSpri.height =  $(window).height();

    var openILogoT = PIXI.Texture.fromImage("assets/images/openIlogo.png");
    openILogo = new PIXI.Sprite(openILogoT);
    openILogo.position.x = (($(window).width() / 2) - 408.5);
    openILogo.position.y = (($(window).height() / 2) - 58.5);;
    openILogo.scale.x = 1;
    openILogo.scale.y = 1;


    stage.addChild(bgSpri);
    stage.addChild(invBgSpri);
    stage.addChild(invSpri);
    stage.addChild(openILogo);
    requestAnimationFrame(animate);

    function animate() {

        if(goRt){
            if(invSpri.position.x  < invMaxSprtX){
              invSpri.position.x += 0.5;
              invBgSpri.position.x += 0.5;
              bgSpri.position.x -= 1.5;
          }else{
            goRt = false;
          }
            
        }else{
            if(invSpri.position.x  > 0){
                invSpri.position.x -= 0.5;
                invBgSpri.position.x -= 0.5;
                bgSpri.position.x += 1.5;
            }else{
                goRt = true;
            }
        }
        

        renderer.render(stage);

        requestAnimationFrame(animate);
    }
})