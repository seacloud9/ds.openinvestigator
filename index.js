$(function(){
	var PIXI = require('pixi')
    // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer

    renderer = new PIXI.WebGLRenderer($(window).width(), $(window).height()); 
    canvas = fx.canvas();
    $('#mainPixiIntro').append(renderer.view);
    var openILogoAni = true;
    var interactive = true;
    var stage = new PIXI.Stage(0x000000, interactive);
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

    var openILogoTa = PIXI.Texture.fromImage("assets/images/openIlogoa.png");
    openILogoa = new PIXI.Sprite(openILogoTa);
    openILogoa.position.x = (($(window).width() / 2) - 408.5);
    openILogoa.position.y = (($(window).height() / 2) - 58.5);;
    openILogoa.scale.x = 1;
    openILogoa.scale.y = 1;
    openILogoa.alpha = 0;

    var openILogoTb = PIXI.Texture.fromImage("assets/images/openIlogb.png");
    openILogob = new PIXI.Sprite(openILogoTb);
    openILogob.position.x = (($(window).width() / 2) - 408.5);
    openILogob.position.y = (($(window).height() / 2) - 58.5);;
    openILogob.scale.x = 1;
    openILogob.scale.y = 1;
    openILogob.alpha = 0;
    

    stage.addChild(bgSpri);
    stage.addChild(invBgSpri);
    stage.addChild(invSpri);
    stage.addChild(openILogo);
    
    stage.addChild(openILogob);
    stage.addChild(openILogoa);

    requestAnimationFrame(animate);

    function animate() {
        openILogob.setInteractive(true);
        openILogob.click = openILogob.tap = function(){
            $('#mainPixiIntro').fadeOut('fast', function(){
                $('#mainPixiIntro').remove('canvas');
                $('.uiContainer').fadeIn('slow', function(){
                 initialize();
             });
            })
        }

        if(openILogob.alpha <= 1){
            if(openILogob.alpha >= 0){
                openILogob.alpha += 0.005;
            }
            
        }

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