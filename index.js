
var _jQCustom = require('./js/jquery-ui-1.10.3.custom.min.js'); 
var _jQTouchPunch = require('./js/jquery.ui.touch-punch.min.js');
var _jQStateMachine = require('./js/jquery-machine.1.0.0.js');
var _bootstrap = require('./js/bootstrap.min.js');
var _bootstrapselect = require('./js/bootstrap-select.js');
var _bootstrapswitch = require('./js/bootstrap-switch.js');
var _flatuicheckbox = require('./js/flatui-checkbox.js');
var _flatuiratio = require('./js/flatui-radio.js');
var _jQtags = require('./js/jquery.tagsinput.js');
var _jQplaceholder = require('./js/jquery.placeholder.js');
_storyOBJ = require('./assets/openIObj.json');
var PIXI = require('./js/pixi.dev.js');
var time=0;
var currentScene;
var aniWebGL;
window.openI = {};

function initialize() {
  loc = new google.maps.LatLng(_storyOBJ.storyObj.sceneArr[0].scene[0].loc.lat,_storyOBJ.storyObj.sceneArr[0].scene[0].loc.long);
  var mapOptions = {
    center: loc,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

  panoramaOptions = {
    position: loc,
    pov: {
      heading: _storyOBJ.storyObj.sceneArr[0].scene[0].loc.pov.heading,
      pitch: _storyOBJ.storyObj.sceneArr[0].scene[0].loc.pov.pitch
    }
  };
  panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
  map.setStreetView(panorama);
  startUp();
}


$(function(){
  $('.locationBtn').click(function(){
    $('#panoSceneCanvas').toggle('fast');
  });
	function rain() {
      var image = document.getElementById('background');
      image.onload = function() {
        var engine = new RainyDay('canvas','background', window.innerWidth, window.innerHeight, 1, 5);

        var preset = getURLParameter("preset") || 1;
        if (preset == 1) {
          engine.gravity = engine.GRAVITY_NON_LINEAR;
          engine.trail = engine.TRAIL_DROPS;
          engine.rain([ engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1) ], 100);
        } else if (preset == 2) {
          engine.gravity = engine.GRAVITY_NON_LINEAR;
          engine.trail = engine.TRAIL_DROPS;
          engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
          engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
        }
      };
      image.crossOrigin = "anonymous";
      image.src="assets/images/sfbg.jpg";
      var youtube = getURLParameter("youtube");
      if (youtube) {
        var div = document.getElementById("sound");

        var player = document.createElement('iframe');
        player.frameborder = "0";
        player.height = "1";
        player.width = "1";
        player.src = "https://youtube.com/embed/" + youtube + "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1";
        div.appendChild(player);
      }
    }
    rain();

    // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer

    renderer = new PIXI.WebGLRenderer($(window).width(), $(window).height()); 
    $('#mainPixiIntro').append(renderer.view);
    var introContainer = new PIXI.DisplayObjectContainer();
    
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

    stage.addChild(introContainer);
    filtersToApply = [];
    var pixelateFilter = new PIXI.PixelateFilter();
    pixelateFilter.size.x = 100;
    pixelateFilter.size.y = 100;
    filtersToApply.push(pixelateFilter);

    

    introContainer.addChild(bgSpri);
    introContainer.addChild(invBgSpri);
    introContainer.addChild(invSpri);
    introContainer.addChild(openILogo);
    
    introContainer.addChild(openILogob);
    introContainer.addChild(openILogoa);

    aniWebGL = function() {
      var now = new Date().getTime(),dt = now - (time || now);
 
        time = now;

        if(time  % 1 === 0 && filtersToApply[0].size.x > 1){
          filtersToApply[0].size.x -= 1;
          filtersToApply[0].size.y -= 1;
        }

        introContainer.filters = filtersToApply.length > 0 ? filtersToApply : null;
        introContainer.setInteractive(true);
        introContainer.click = introContainer.tap = function(){
            $('#mainPixiIntro').fadeOut('fast', function(){
                $('#mainPixiIntro').remove('canvas');
                $('.uiContainer').fadeIn('slow', function(){
                 initialize();
             });
            });
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

    requestAnimationFrame(aniWebGL);
  }

    requestAnimationFrame(aniWebGL);

    


});

  isAnimated = function(setAnimation){
    var _isAnimated = true;
    return{
      checkAnimations: function(){
        return _isAnimated;
      },
      setIsAnimated: function(setAnimation){
        _isAnimated = setAnimation;
      }
    }
  }();

function sceneIncrementFunction(current){
  currentScene = current;
  txt2Render = '';
  txt2Render = _storyOBJ.storyObj.sceneArr[current].scene[0].storySequence;
  currentText = '';
  currentText = txt2Render[0];
  stage1.children[0].children[0].text = "";
  tCount = 1;
  count = 0;
  stage1.children[0].children[0].text = currentText;
  var canvasStory = '<div class="radius6px canvasMain minHeight400px display0" id="panoSceneCanvas" style="height:400px;" > <div>';

  if(_storyOBJ.storyObj.sceneArr[current].scene[0].choices.length > 0){
    mkHTML = '<ul class="ulOptions">';
    for(var i=0; _storyOBJ.storyObj.sceneArr[current].scene[0].choices.length > i; i++){
      mkHTML += '<li data-choice="'+ i +'"><a href="javascript:void(0);" data-click="window.openI.initStorySeqStage({styOption: '+i+'});">' + _storyOBJ.storyObj.sceneArr[current].scene[0].choices[i] + "</a></li>";
    }
    mkHTML += '</ul>';
    $('.navOptions li').append(mkHTML);
    $('.ulOptions li').click(function(){
      if(isAnimated.checkAnimations() != true && txt2Render.length == tCount){
        eval($(this).children( "a" ).data('click'));
      }
    });

  }

  //mapping
  loc = new google.maps.LatLng(_storyOBJ.storyObj.sceneArr[current].scene[0].loc.lat,_storyOBJ.storyObj.sceneArr[current].scene[0].loc.long);
  var mapOptions = {
    center: loc,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  $('#pano').html('');
  $('#mapCanvas').html('');
  map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

  panoramaOptions = {
    position: loc,
    pov: {
      heading: _storyOBJ.storyObj.sceneArr[current].scene[0].loc.pov.heading,
      pitch: _storyOBJ.storyObj.sceneArr[current].scene[0].loc.pov.pitch
    }
  };

  panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
  map.setStreetView(panorama);
  $('#pano').append(canvasStory);
  aniWebGL = null;
  $('#panoSceneCanvas').html("");
  window.openI.initStorySeq({storyImg: _storyOBJ.storyObj.sceneArr[current].scene[0].storySequenceJpg, setup:true});
}

window.openI.initStorySeqStage = function(options){
  if(options.styOption != undefined){
      options.text = _storyOBJ.storyObj.sceneArr[currentScene].scene[0].results[options.styOption];
      options.storyImg = _storyOBJ.storyObj.sceneArr[currentScene].scene[0].choicesImgs[options.styOption];
      var bgTexture = PIXI.Texture.fromImage(options.storyImg.img);
      var bgSpriSq = new PIXI.Sprite(bgTexture);
      bgSpriSq.position.x = options.storyImg.x;
      bgSpriSq.position.y = options.storyImg.y;
      bgSpriSq.scale.x = options.storyImg.scaleX;
      bgSpriSq.scale.y = options.storyImg.scaleY;
      if(options.storyImg.width != undefined && options.storyImg.width != ''){
          bgSpriSq.width =  eval(options.storyImg.width);
      }
      if(options.storyImg.heigth != undefined && options.storyImg.height != ''){
          bgSpriSq.height =  eval(options.storyImg.height);
      }
      filtersToApply[0].size.x = 100;
      filtersToApply[0].size.y = 100;
      stage.addChild(bgSpriSq);
      if(options.text != undefined){
        txt2Render = '';
        txt2Render = options.text;
        currentText = '';
        currentText = txt2Render[0];
        stage1.children[0].children[0].text = "";
        tCount = 1;
        count = 0;
        stage1.children[0].children[0].text = currentText;
      }
    }
}

window.openI.initStorySeq = function(options){
    if(options.setup != undefined && options.setup == true){
        aniWebGL = null;
       $('#panoSceneCanvas').html("");
    }

    if(options.setup != undefined && options.setup == true){
      var interactive = true;
      stage = new PIXI.Stage(0x000000, interactive);
      var renderer2 = new PIXI.WebGLRenderer($('#panoSceneCanvas').width(), $('#panoSceneCanvas').height()); 
      $('#panoSceneCanvas').append(renderer2.view);
      introContainer = new PIXI.DisplayObjectContainer();
    }

    if(options.storyImg != undefined){
      var bgTexture = PIXI.Texture.fromImage(options.storyImg.img);
      var bgSpriSq = new PIXI.Sprite(bgTexture);
      bgSpriSq.position.x = options.storyImg.x;
      bgSpriSq.position.y = options.storyImg.y;
      bgSpriSq.scale.x = options.storyImg.scaleX;
      bgSpriSq.scale.y = options.storyImg.scaleY;
      if(options.storyImg.width != undefined && options.storyImg.width != ''){
          bgSpriSq.width =  eval(options.storyImg.width);
      }
      if(options.storyImg.heigth != undefined && options.storyImg.height != ''){
          bgSpriSq.height =  eval(options.storyImg.height);
      }
      
    }
    
    if(options.text != undefined){
      txt2Render = '';
      txt2Render = options.text;
      currentText = '';
      currentText = txt2Render[0];
      stage1.children[0].children[0].text = "";
      tCount = 1;
      count = 0;
      stage1.children[0].children[0].text = currentText;
    }

    if(options.setup != undefined && options.setup == true){
        stage.addChild(introContainer);
        filtersToApply = [];
        var pixelateFilter = new PIXI.PixelateFilter();
        pixelateFilter.size.x = 100;
        pixelateFilter.size.y = 100;
        filtersToApply.push(pixelateFilter);

        introContainer.addChild(bgSpriSq);

        aniWebGL = function() {
              var now = new Date().getTime(),dt = now - (time || now);
                time = now;
                if(time  % 1 === 0 && filtersToApply[0].size.x > 3){
                  filtersToApply[0].size.x -= 1;
                  filtersToApply[0].size.y -= 1;
                }
                stage.filters = filtersToApply.length > 0 ? filtersToApply : null;
                introContainer.setInteractive(true);
            renderer2.render(stage);
            requestAnimationFrame(aniWebGL);
        }

        requestAnimationFrame(aniWebGL);
        $('#panoSceneCanvas').show();
  }
        
}


startUp = function(){
    sqOrder = 0;
    txt2Render = _storyOBJ.storyObj.sceneArr[sqOrder].scene[sqOrder].storySequence;
    renderer1 = new PIXI.CanvasRenderer($('#mainPixiInfo').width(), $('#mainPixiInfo').height(), document.getElementById('mainPixiInfo')); 
   // $('#mainPixiInfo').append(renderer1.view);
    var interactive = true;
    currentText = txt2Render[0];
    stage1 = new PIXI.Stage(0x002600, interactive);
    var terminalText = new PIXI.Text(currentText, {font: "bold italic 20px Arvo", fill: "#00ff01", align: "left", stroke: "#a7f7a7", strokeThickness: 1, wordWrap:true, wordWrapWidth: 430});
    terminalText.position.x = 15;
    terminalText.position.y = 10;
    terminalText.anchor.x = 1;   
    mainPixiInfoContainer = new PIXI.DisplayObjectContainer();
    mainPixiInfoContainer.addChild(terminalText);
    mainPixiInfoContainer.width = mainPixiInfoContainer._bounds.width = $('#mainPixiInfo').width();
    mainPixiInfoContainer.height = mainPixiInfoContainer._bounds.height = $('#mainPixiInfo').height();
    mainPixiInfoContainer.hitArea = new PIXI.Rectangle(0, 0, mainPixiInfoContainer.width, mainPixiInfoContainer.height);
    stage1._bounds = new PIXI.Rectangle(0, 0, mainPixiInfoContainer.width, mainPixiInfoContainer.height);
    stage1.addChild(mainPixiInfoContainer);
    mainPixiInfoContainer.setInteractive(true);
    mainPixiInfoContainer.buttonMode = true;
    mainPixiInfoContainer.click = mainPixiInfoContainer.tap =  function(){
      if(isAnimated.checkAnimations() != true && txt2Render.length == tCount){
        eval(_storyOBJ.storyObj.sceneArr[sqOrder].scene[sqOrder].action)
      }
    };

  

    //stage1.addChild(mainPixiInfoDisplay);
    count = 0;
    tCount = 1;
    function animateText() {   
            count++;
            if(count == 2 && txt2Render.length > tCount)
            {
                isAnimated.setIsAnimated(true);
                count = 0;
                // update the text...
                mainPixiInfoContainer.children[0].setText(currentText+=txt2Render[tCount]);
                mainPixiInfoContainer.children[0].position.x = (terminalText.width + 10);
                tCount++;
            }else{
              isAnimated.setIsAnimated(false);
            }
            // render the stage   
            renderer1.render(stage1);
           // console.log(terminalText.width);
            requestAnimationFrame( animateText );
        }
    requestAnimationFrame(animateText);
}
