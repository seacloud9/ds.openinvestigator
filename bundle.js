;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var _jQCustom = require('./js/jquery-ui-1.10.3.custom.min.js');
var _jQTouchPunch = require('./js/jquery.ui.touch-punch.min.js');
var _bootstrap = require('./js/bootstrap.min.js');
var _bootstrapselect = require('./js/bootstrap-select.js');
var _bootstrapswitch = require('./js/bootstrap-switch.js');
var _flatuicheckbox = require('./js/flatui-checkbox.js');
var _flatuiratio = require('./js/flatui-radio.js');
var _jQtags = require('./js/jquery.tagsinput.js');
var _jQplaceholder = require('./js/jquery.placeholder.js');
var PIXI = require('./js/pixi.js');



function initialize() {
  loc = new google.maps.LatLng(37.795576,-122.399004);
  var mapOptions = {
    center: loc,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

  panoramaOptions = {
    position: loc,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
  map.setStreetView(panorama);
}


$(function(){
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

    renderer = new PIXI.CanvasRenderer($(window).width(), $(window).height()); 
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

    requestAnimationFrame(animate);
}


});


startUp = function(){
    // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
    var txt2Render = "detectiveOS$:  Hello World.";
    renderer1 = new PIXI.CanvasRenderer($('#mainPixiInfo').width(), $('#mainPixiInfo').height(), document.getElementById('mainPixiInfo')); 
   // $('#mainPixiInfo').append(renderer1.view);
    var interactive = true;
    var currentText = txt2Render[0];
    var stage1 = new PIXI.Stage(0x002600, interactive);
    var terminalText = new PIXI.Text(currentText, {font: "bold italic 20px Arvo", fill: "#00ff01", align: "left", stroke: "#a7f7a7", strokeThickness: 1});
        terminalText.position.x = 15;
        terminalText.position.y = 10;
        terminalText.anchor.x = 1;

    stage1.addChild(terminalText);

    var count = 0;
    var tCount = 1;
    function animateText() {   
            count++;
            if(count == 2 && txt2Render.length > tCount)
            {
                count = 0;
                // update the text...
                terminalText.setText(currentText+=txt2Render[tCount]);
                console.log(terminalText.width);
                terminalText.position.x = (terminalText.width + 10);
                tCount++;
            }
            // render the stage   
            renderer1.render(stage1);
           // console.log(terminalText.width);
            requestAnimationFrame( animateText );
        }
    requestAnimationFrame(animateText);
}

},{"./js/bootstrap-select.js":2,"./js/bootstrap-switch.js":3,"./js/bootstrap.min.js":4,"./js/flatui-checkbox.js":5,"./js/flatui-radio.js":6,"./js/jquery-ui-1.10.3.custom.min.js":7,"./js/jquery.placeholder.js":8,"./js/jquery.tagsinput.js":9,"./js/jquery.ui.touch-punch.min.js":10,"./js/pixi.js":11}],2:[function(require,module,exports){
!function($) {
    var Selectpicker = function(element, options, e) {
        if (e ) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.button = null;

        //Merge defaults, options and data-attributes to make our options
        this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

        //If we have no title yet, check the attribute 'title' (this is missed by jq as its not a data-attribute
        if(this.options.title==null)
            this.options.title = this.$element.attr('title');

        //Expose public methods
        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.init();
    };

    Selectpicker.prototype = {

        constructor: Selectpicker,

        init: function (e) {
            var _this = this;
            this.$element.hide();
            this.multiple = this.$element.prop('multiple');


            var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) : '';
            var id = this.$element.attr('id');
            this.$element.after( this.createView() );
            this.$newElement = this.$element.next('.select');
            var select = this.$newElement;
            var menu = this.$newElement.find('.dropdown-menu');
            var menuArrow = this.$newElement.find('.dropdown-arrow');
            var menuA = menu.find('li > a');
            var liHeight = select.addClass('open').find('.dropdown-menu li > a').outerHeight();
            select.removeClass('open');
            var divHeight = menu.find('li .divider').outerHeight(true);
            var selectOffset_top = this.$newElement.offset().top;
            var size = 0;
            var menuHeight = 0;
            var selectHeight = this.$newElement.outerHeight();
            this.button = this.$newElement.find('> button');
            if (id !== undefined) {
                this.button.attr('id', id);
                $('label[for="' + id + '"]').click(function(){ select.find('button#'+id).focus(); })
            }
            for (var i = 0; i < classList.length; i++) {
                if(classList[i] != 'selectpicker') {
                    this.$newElement.addClass(classList[i]);
                }
            }
            //If we are multiple, then add the show-tick class by default
            if(this.multiple) {
                 this.$newElement.addClass('select-multiple');
            }
            this.button.addClass(this.options.style);
            menu.addClass(this.options.menuStyle);
            menuArrow.addClass(function() {
                if (_this.options.menuStyle) {
                    return _this.options.menuStyle.replace('dropdown-', 'dropdown-arrow-');
                }
            });
            this.checkDisabled();
            this.checkTabIndex();
            this.clickListener();
            var menuPadding = parseInt(menu.css('padding-top')) + parseInt(menu.css('padding-bottom')) + parseInt(menu.css('border-top-width')) + parseInt(menu.css('border-bottom-width'));
            if (this.options.size == 'auto') {
                function getSize() {
                    var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
                    var windowHeight = window.innerHeight;
                    var menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
                    var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
                    menuHeight = selectOffset_bot;
                    if (select.hasClass('dropup')) {
                        menuHeight = selectOffset_top_scroll - menuExtras;
                    }
                    menu.css({'max-height' : menuHeight + 'px', 'overflow-y' : 'auto', 'min-height' : liHeight*3 + 'px'});
            }
                getSize();
                $(window).resize(getSize);
                $(window).scroll(getSize);
                this.$element.bind('DOMNodeInserted', getSize);
            } else if (this.options.size && this.options.size != 'auto' && menu.find('li').length > this.options.size) {
                var optIndex = menu.find("li > *").filter(':not(.divider)').slice(0,this.options.size).last().parent().index();
                var divLength = menu.find("li").slice(0,optIndex + 1).find('.divider').length;
                menuHeight = liHeight*this.options.size + divLength*divHeight + menuPadding;
                menu.css({'max-height' : menuHeight + 'px', 'overflow-y' : 'scroll'});
            }

            //Listen for updates to the DOM and re render...
            this.$element.bind('DOMNodeInserted', $.proxy(this.reloadLi, this));

            this.render();
        },

        createDropdown: function() {
            var drop =
                "<div class='btn-group select'>" +
                    "<i class='dropdown-arrow'></i>" +
                    "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
                        "<span class='filter-option pull-left'></span>&nbsp;" +
                        "<span class='caret'></span>" +
                    "</button>" +
                    "<ul class='dropdown-menu' role='menu'>" +
                    "</ul>" +
                "</div>";

            return $(drop);
        },


        createView: function() {
            var $drop = this.createDropdown();
            var $li = this.createLi();
            $drop.find('ul').append($li);
            return $drop;
        },

        reloadLi: function() {
            //Remove all children.
            this.destroyLi();
            //Re build
            $li = this.createLi();
            this.$newElement.find('ul').append( $li );
            //render view
            this.render();
        },

        destroyLi:function() {
            this.$newElement.find('li').remove();
        },

        createLi: function() {

            var _this = this;
            var _li = [];
            var _liA = [];
            var _liHtml = '';

            this.$element.find('option').each(function(){
                _li.push($(this).text());
            });

            this.$element.find('option').each(function(index) {
                //Get the class and text for the option
                var optionClass = $(this).attr("class") !== undefined ? $(this).attr("class") : '';
               	var text =  $(this).text();
               	var subtext = $(this).data('subtext') !== undefined ? '<small class="muted">'+$(this).data('subtext')+'</small>' : '';

                //Append any subtext to the main text.
                text+=subtext;

                if ($(this).parent().is('optgroup') && $(this).data('divider') != true) {
                    if ($(this).index() == 0) {
                        //Get the opt group label
                        var label = $(this).parent().attr('label');
                        var labelSubtext = $(this).parent().data('subtext') !== undefined ? '<small class="muted">'+$(this).parent().data('subtext')+'</small>' : '';
                        label += labelSubtext;

                        if ($(this)[0].index != 0) {
                            _liA.push(
                                '<div class="divider"></div>'+
                                '<dt>'+label+'</dt>'+ 
                                _this.createA(text, "opt " + optionClass )
                                );
                        } else {
                            _liA.push(
                                '<dt>'+label+'</dt>'+ 
                                _this.createA(text, "opt " + optionClass ));
                        }
                    } else {
                         _liA.push( _this.createA(text, "opt " + optionClass )  );
                    }
                } else if ($(this).data('divider') == true) {
                    _liA.push('<div class="divider"></div>');
                } else {
                    _liA.push( _this.createA(text, optionClass ) );
                }
            });

            if (_li.length > 0) {
                for (var i = 0; i < _li.length; i++) {
                    var $option = this.$element.find('option').eq(i);
                    _liHtml += "<li rel=" + i + ">" + _liA[i] + "</li>";
                }
            }

            //If we dont have a selected item, and we dont have a title, select the first element so something is set in the button
            if(this.$element.find('option:selected').length==0 && !_this.options.title) {
                this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
            }

            return $(_liHtml);
        },

        createA:function(test, classes) {
         return '<a tabindex="-1" href="#" class="'+classes+'">' +
                 '<span class="pull-left">' + test + '</span>' +
                 '</a>';

        },

         render:function() {
            var _this = this;

            //Set width of select
             if (this.options.width == 'auto') {
                 var ulWidth = this.$newElement.find('.dropdown-menu').css('width');
                 this.$newElement.css('width',ulWidth);
             } else if (this.options.width && this.options.width != 'auto') {
                 this.$newElement.css('width',this.options.width);
             }

            //Update the LI to match the SELECT
            this.$element.find('option').each(function(index) {
               _this.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled') );
               _this.setSelected(index, $(this).is(':selected') );
            });



            var selectedItems = this.$element.find('option:selected').map(function(index,value) {
                if($(this).attr('title')!=undefined) {
                    return $(this).attr('title');
                } else {
                    return $(this).text();
                }
            }).toArray();

            //Convert all the values into a comma delimited string    
            var title = selectedItems.join(", ");

            //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..                    
            if(_this.multiple && _this.options.selectedTextFormat.indexOf('count') > -1) {
                var max = _this.options.selectedTextFormat.split(">");
                if( (max.length>1 && selectedItems.length > max[1]) || (max.length==1 && selectedItems.length>=2)) {
                    title = selectedItems.length +' of ' + this.$element.find('option').length + ' selected';
                }
             }  
            
            //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
            if(!title) {
                title = _this.options.title != undefined ? _this.options.title : _this.options.noneSelectedText;    
            }
            
            this.$element.next('.select').find('.filter-option').html( title );
	    },
	    
        
        
        setSelected:function(index, selected) {
            if(selected) {
                this.$newElement.find('li').eq(index).addClass('selected');
            } else {
                this.$newElement.find('li').eq(index).removeClass('selected');
            }
        },
        
        setDisabled:function(index, disabled) {
            if(disabled) {
                this.$newElement.find('li').eq(index).addClass('disabled');
            } else {
                this.$newElement.find('li').eq(index).removeClass('disabled');
            }
        },
       
        checkDisabled: function() {
            if (this.$element.is(':disabled')) {
                this.button.addClass('disabled');
                this.button.click(function(e) {
                    e.preventDefault();
                });
            }
        },
		
		checkTabIndex: function() {
			if (this.$element.is('[tabindex]')) {
				var tabindex = this.$element.attr("tabindex");
				this.button.attr('tabindex', tabindex);
			}
		},
		
		clickListener: function() {
            var _this = this;
            
            $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
            
           
            
            this.$newElement.on('click', 'li a', function(e){
                var clickedIndex = $(this).parent().index(),
                    $this = $(this).parent(),
                    $select = $this.parents('.select');
                
                
                //Dont close on multi choice menu    
                if(_this.multiple) {
                    e.stopPropagation();
                }
                
                e.preventDefault();
                
                //Dont run if we have been disabled
                if ($select.prev('select').not(':disabled') && !$(this).parent().hasClass('disabled')){
                    //Deselect all others if not multi select box
                    if (!_this.multiple) {
                        $select.prev('select').find('option').removeAttr('selected');
                        $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                    } 
                    //Else toggle the one we have chosen if we are multi selet.
                    else {
                        var selected = $select.prev('select').find('option').eq(clickedIndex).prop('selected');
                        
                        if(selected) {
                            $select.prev('select').find('option').eq(clickedIndex).removeAttr('selected');
                        } else {
                            $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                        }
                    }
                    
                    
                    $select.find('.filter-option').html($this.text());
                    $select.find('button').focus();

                    // Trigger select 'change'
                    $select.prev('select').trigger('change');
                }

            });
            
           this.$newElement.on('click', 'li.disabled a, li dt, li .divider', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $select = $(this).parent().parents('.select');
                $select.find('button').focus();
            });

            this.$element.on('change', function(e) {
                _this.render();
            });
        },
        
        val:function(value) {
            
            if(value!=undefined) {
                this.$element.val( value );
                
                this.$element.trigger('change');
                return this.$element;
            } else {
                return this.$element.val();
            }
        }

    };

    $.fn.selectpicker = function(option, event) {
       //get the args of the outer function..
       var args = arguments;
       var value;
       var chain = this.each(function () {
            var $this = $(this),
                data = $this.data('selectpicker'),
                options = typeof option == 'object' && option;
            
            if (!data) {
            	$this.data('selectpicker', (data = new Selectpicker(this, options, event)));
            } else {
            	for(var i in option) {
            		data[i]=option[i];
            	}
            }
            
            if (typeof option == 'string') {
                //Copy the value of option, as once we shift the arguments
                //it also shifts the value of option.
                property = option;
                if(data[property] instanceof Function) {
                    [].shift.apply(args);
                    value = data[property].apply(data, args);
                } else {
                    value = data[property];
                }
            }
        });
        
        if(value!=undefined) {
            return value;
        } else {
            return chain;
        } 
    };

    $.fn.selectpicker.defaults = {
        style: null,
        size: 'auto',
        title: null,
        selectedTextFormat : 'values',
        noneSelectedText : 'Nothing selected',
        width: null,
        menuStyle: null,
        toggleSize: null
    }

}(window.jQuery);

},{}],3:[function(require,module,exports){
/* ============================================================
 * bootstrapSwitch v1.3 by Larentis Mattia @spiritualGuru
 * http://www.larentis.eu/switch/
 * ============================================================
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * ============================================================ */

!function ($) {
  "use strict";

  $.fn['bootstrapSwitch'] = function (method) {
    var methods = {
      init: function () {
        return this.each(function () {
            var $element = $(this)
              , $div
              , $switchLeft
              , $switchRight
              , $label
              , myClasses = ""
              , classes = $element.attr('class')
              , color
              , moving
              , onLabel = "ON"
              , offLabel = "OFF"
              , icon = false;

            $.each(['switch-mini', 'switch-small', 'switch-large'], function (i, el) {
              if (classes.indexOf(el) >= 0)
                myClasses = el;
            });

            $element.addClass('has-switch');

            if ($element.data('on') !== undefined)
              color = "switch-" + $element.data('on');

            if ($element.data('on-label') !== undefined)
              onLabel = $element.data('on-label');

            if ($element.data('off-label') !== undefined)
              offLabel = $element.data('off-label');

            if ($element.data('icon') !== undefined)
              icon = $element.data('icon');

            $switchLeft = $('<span>')
              .addClass("switch-left")
              .addClass(myClasses)
              .addClass(color)
              .html(onLabel);

            color = '';
            if ($element.data('off') !== undefined)
              color = "switch-" + $element.data('off');

            $switchRight = $('<span>')
              .addClass("switch-right")
              .addClass(myClasses)
              .addClass(color)
              .html(offLabel);

            $label = $('<label>')
              .html("&nbsp;")
              .addClass(myClasses)
              .attr('for', $element.find('input').attr('id'));

            if (icon) {
              $label.html('<i class="' + icon + '"></i>');
            }

            $div = $element.find(':checkbox').wrap($('<div>')).parent().data('animated', false);

            if ($element.data('animated') !== false)
              $div.addClass('switch-animate').data('animated', true);

            $div
              .append($switchLeft)
              .append($label)
              .append($switchRight);

            $element.find('>div').addClass(
              $element.find('input').is(':checked') ? 'switch-on' : 'switch-off'
            );

            if ($element.find('input').is(':disabled'))
              $(this).addClass('deactivate');

            var changeStatus = function ($this) {
              $this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
            };

            $element.on('keydown', function (e) {
              if (e.keyCode === 32) {
                e.stopImmediatePropagation();
                e.preventDefault();
                changeStatus($(e.target).find('span:first'));
              }
            });

            $switchLeft.on('click', function (e) {
              changeStatus($(this));
            });

            $switchRight.on('click', function (e) {
              changeStatus($(this));
            });

            $element.find('input').on('change', function (e) {
              var $this = $(this)
                , $element = $this.parent()
                , thisState = $this.is(':checked')
                , state = $element.is('.switch-off');

              e.preventDefault();

              $element.css('left', '');

              if (state === thisState) {

                if (thisState)
                  $element.removeClass('switch-off').addClass('switch-on');
                else $element.removeClass('switch-on').addClass('switch-off');

                if ($element.data('animated') !== false)
                  $element.addClass("switch-animate");

                $element.parent().trigger('switch-change', {'el': $this, 'value': thisState})
              }
            });

            $element.find('label').on('mousedown touchstart', function (e) {
              var $this = $(this);
              moving = false;

              e.preventDefault();
              e.stopImmediatePropagation();

              $this.closest('div').removeClass('switch-animate');

              if ($this.closest('.has-switch').is('.deactivate'))
                $this.unbind('click');
              else {
                $this.on('mousemove touchmove', function (e) {
                  var $element = $(this).closest('.switch')
                    , relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left
                    , percent = (relativeX / $element.width()) * 100
                    , left = 25
                    , right = 75;

                  moving = true;

                  if (percent < left)
                    percent = left;
                  else if (percent > right)
                    percent = right;

                  $element.find('>div').css('left', (percent - right) + "%")
                });

                $this.on('click touchend', function (e) {
                  var $this = $(this)
                    , $target = $(e.target)
                    , $myCheckBox = $target.siblings('input');

                  e.stopImmediatePropagation();
                  e.preventDefault();

                  $this.unbind('mouseleave');

                  if (moving)
                    $myCheckBox.prop('checked', !(parseInt($this.parent().css('left')) < -25));
                  else $myCheckBox.prop("checked", !$myCheckBox.is(":checked"));

                  moving = false;
                  $myCheckBox.trigger('change');
                });

                $this.on('mouseleave', function (e) {
                  var $this = $(this)
                    , $myCheckBox = $this.siblings('input');

                  e.preventDefault();
                  e.stopImmediatePropagation();

                  $this.unbind('mouseleave');
                  $this.trigger('mouseup');

                  $myCheckBox.prop('checked', !(parseInt($this.parent().css('left')) < -25)).trigger('change');
                });

                $this.on('mouseup', function (e) {
                  e.stopImmediatePropagation();
                  e.preventDefault();

                  $(this).unbind('mousemove');
                });
              }
            });
          }
        );
      },
      toggleActivation: function () {
        $(this).toggleClass('deactivate');
      },
      isActive: function () {
        return !$(this).hasClass('deactivate');
      },
      setActive: function (active) {
        if (active)
          $(this).removeClass('deactivate');
        else $(this).addClass('deactivate');
      },
      toggleState: function (skipOnChange) {
        var $input = $(this).find('input:checkbox');
        $input.prop('checked', !$input.is(':checked')).trigger('change', skipOnChange);
      },
      setState: function (value, skipOnChange) {
        $(this).find('input:checkbox').prop('checked', value).trigger('change', skipOnChange);
      },
      status: function () {
        return $(this).find('input:checkbox').is(':checked');
      },
      destroy: function () {
        var $div = $(this).find('div')
          , $checkbox;

        $div.find(':not(input:checkbox)').remove();

        $checkbox = $div.children();
        $checkbox.unwrap().unwrap();

        $checkbox.unbind('change');

        return $checkbox;
      }
    };

    if (methods[method])
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method)
      return methods.init.apply(this, arguments);
    else
      $.error('Method ' + method + ' does not exist!');
  };
}(jQuery);

$(function () {
  $('.switch')['bootstrapSwitch']();
});

},{}],4:[function(require,module,exports){
/**
* Bootstrap v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* Licensed under http://www.apache.org/licenses/LICENSE-2.0.
*
* Designed and built with all the love in the world by @mdo and @fat.
*/
if(!jQuery)throw new Error("Bootstrap requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active")).trigger("change");"radio"===b.prop("type")&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(window.jQuery),+function(a){"use strict";function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown"),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("dropdown");d||c.data("dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show),void 0):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;if("top"==b&&j!=f&&(c=!0,a.top=a.top+f-j),/bottom|top/.test(b)){var k=0;a.left<0&&(k=-2*a.left,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach()}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery);
},{}],5:[function(require,module,exports){
/* =============================================================
 * flatui-checkbox.js v0.0.3
 * ============================================================ */
 
!function ($) {

 /* CHECKBOX PUBLIC CLASS DEFINITION
	* ============================== */

	var Checkbox = function (element, options) {
		this.init(element, options);
	}

	Checkbox.prototype = {
		
		constructor: Checkbox
		
	, init: function (element, options) {			 
			var $el = this.$element = $(element)
			
			this.options = $.extend({}, $.fn.checkbox.defaults, options);			 
			$el.before(this.options.template);		
			this.setState(); 
		}	 
	 
	, setState: function () {		 
			var $el = this.$element
				, $parent = $el.closest('.checkbox');
				
				$el.prop('disabled') && $parent.addClass('disabled');		
				$el.prop('checked') && $parent.addClass('checked');
		}	 
		
	, toggle: function () {		 
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checked = $el.prop(ch)
				, e = $.Event('toggle')
			
			if ($el.prop('disabled') == false) {
				$parent.toggleClass(ch) && checked ? $el.removeAttr(ch) : $el.prop(ch, ch);
				$el.trigger(e).trigger('change'); 
			}
		}	 
		
	, setCheck: function (option) {		 
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checkAction = option == 'check' ? true : false
				, e = $.Event(option)
			
			$parent[checkAction ? 'addClass' : 'removeClass' ](ch) && checkAction ? $el.prop(ch, ch) : $el.removeAttr(ch);
			$el.trigger(e).trigger('change');				
		}	 
			
	}


 /* CHECKBOX PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.checkbox

	$.fn.checkbox = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('checkbox')
				, options = $.extend({}, $.fn.checkbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('checkbox', (data = new Checkbox(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState(); 
		});
	}
	
	$.fn.checkbox.defaults = {
		template: '<span class="icons"><span class="first-icon fui-checkbox-unchecked"></span><span class="second-icon fui-checkbox-checked"></span></span>'
	}


 /* CHECKBOX NO CONFLICT
	* ================== */

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	}


 /* CHECKBOX DATA-API
	* =============== */

	$(document).on('click.checkbox.data-api', '[data-toggle^=checkbox], .checkbox', function (e) {
	  var $checkbox = $(e.target);
		if (e.target.tagName != "A") {			
			e && e.preventDefault() && e.stopPropagation();
			if (!$checkbox.hasClass('checkbox')) $checkbox = $checkbox.closest('.checkbox');
			$checkbox.find(':checkbox').checkbox('toggle');
		}
	});
	
	$(function () {
		$('[data-toggle="checkbox"]').each(function () {
			var $checkbox = $(this);
			$checkbox.checkbox();
		});
	});

}(window.jQuery);
},{}],6:[function(require,module,exports){
/* =============================================================
 * flatui-radio.js v0.0.3
 * ============================================================ */

!function ($) {

 /* RADIO PUBLIC CLASS DEFINITION
	* ============================== */

	var Radio = function (element, options) {
		this.init(element, options);
	}

	Radio.prototype = {
	
		constructor: Radio
		
	, init: function (element, options) {			 
			var $el = this.$element = $(element)
			
			this.options = $.extend({}, $.fn.radio.defaults, options);			
			$el.before(this.options.template);		
			this.setState();
		}		
		
	, setState: function () {		 
			var $el = this.$element
				, $parent = $el.closest('.radio');
				
				$el.prop('disabled') && $parent.addClass('disabled');		
				$el.prop('checked') && $parent.addClass('checked');
		} 
		
	, toggle: function () {		 
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, checked = $el.prop(ch)
				, $parent = $el.closest('.radio')			 
				, $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
				, $elemGroup = $parentWrap.find(':radio[name="' + $el.attr('name') + '"]')
				, e = $.Event('toggle')
				
				$elemGroup.not($el).each(function () {
					var $el = $(this)
						, $parent = $(this).closest('.radio');
						
						if ($el.prop(d) == false) {
							$parent.removeClass(ch) && $el.removeAttr(ch).trigger('change');
						} 
				});
			
				if ($el.prop(d) == false) {
					if (checked == false) $parent.addClass(ch) && $el.attr(ch, true);
					$el.trigger(e);
					
					if (checked !== $el.prop(ch)) {
						$el.trigger('change'); 
					}
				}								
		} 
		 
	, setCheck: function (option) {		 
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.radio')
				, checkAction = option == 'check' ? true : false
				, checked = $el.prop(ch)
				, $parentWrap = $el.closest('form').length ? $el.closest('form') : $el.closest('body')
				, $elemGroup = $parentWrap.find(':radio[name="' + $el['attr']('name') + '"]')
				, e = $.Event(option)
				
			$elemGroup.not($el).each(function () {
				var $el = $(this)
					, $parent = $(this).closest('.radio');
					
					$parent.removeClass(ch) && $el.removeAttr(ch);
			});
						
			$parent[checkAction ? 'addClass' : 'removeClass'](ch) && checkAction ? $el.prop(ch, ch) : $el.removeAttr(ch);
			$el.trigger(e);	 
					
			if (checked !== $el.prop(ch)) {
				$el.trigger('change'); 
			}
		}	 
		 
	}


 /* RADIO PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.radio

	$.fn.radio = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('radio')
				, options = $.extend({}, $.fn.radio.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('radio', (data = new Radio(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState(); 
		});
	}
	
	$.fn.radio.defaults = {
		template: '<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>'
	}


 /* RADIO NO CONFLICT
	* ================== */

	$.fn.radio.noConflict = function () {
		$.fn.radio = old;
		return this;
	}


 /* RADIO DATA-API
	* =============== */

	$(document).on('click.radio.data-api', '[data-toggle^=radio], .radio', function (e) {
		var $radio = $(e.target);
		if (e.target.tagName != "A") {		
			e && e.preventDefault() && e.stopPropagation();
			if (!$radio.hasClass('radio')) $radio = $radio.closest('.radio');
			$radio.find(':radio').radio('toggle');
		}
	});
	
	$(function () {
		$('[data-toggle="radio"]').each(function () {
			var $radio = $(this);
			$radio.radio();
		});
	});

}(window.jQuery);
},{}],7:[function(require,module,exports){
/*! jQuery UI - v1.10.3 - 2013-05-21
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.slider.js, jquery.ui.tooltip.js, jquery.ui.effect.js
* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,b,_=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return b=n(_),_[0].preventDefault&&(e.at="left top"),p=b.width,m=b.height,g=b.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),b=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+b+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:b},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:_,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);(function(t){var e=5;t.widget("ui.slider",t.ui.mouse,{version:"1.10.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)o.push(a);this.handles=n.add(t(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):this.range=t([])},_setupEvents:function(){var t=this.handles.add(this.range).filter("a");this._off(t),this._on(t,this._handleEvents),this._hoverable(t),this._focusable(t)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,a,o,r,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-u.values(e));(n>i||n===i&&(e===u._lastChangedValue||u.values(e)===c.min))&&(n=i,a=t(this),o=e)}),r=this._start(e,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-a.width()/2,top:e.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,a;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,a=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),a!==!1&&this.values(e,i,!0))):i!==this.value()&&(a=this._trigger("slide",t,{handle:this.handles[e],value:i}),a!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(e,i){var s,n,a;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),undefined;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),t.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var e,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(i){var s,n,a,o,r=t(i.target).data("ui-slider-handle-index");switch(i.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(i.target).addClass("ui-state-active"),s=this._start(i,r),s===!1))return}switch(o=this.options.step,n=a=this.options.values&&this.options.values.length?this.values(r):this.value(),i.keyCode){case t.ui.keyCode.HOME:a=this._valueMin();break;case t.ui.keyCode.END:a=this._valueMax();break;case t.ui.keyCode.PAGE_UP:a=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.PAGE_DOWN:a=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;a=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;a=this._trimAlignValue(n-o)}this._slide(i,r,a)},click:function(t){t.preventDefault()},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})})(jQuery);(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.3",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,a=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=a),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function a(t){l.of=t,o.is(":hidden")||o.position(l)}var o,r,h,l=t.extend({},this.options.position);if(n){if(o=this._find(s),o.length)return o.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),o=this._tooltip(s),e(s,o.attr("id")),o.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:a}),a(i)):o.position(t.extend({of:s},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(a(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:o}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(o)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),a=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),a.stop(!0),this._hide(a,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:a}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);(function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(t,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[c[l].cache]=o[c[l].cache],n=s._rgba=o._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,a.transparent),s):a[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,o,r,h){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(o),o=e);var u=this,d=t.type(n),p=this._rgba=[];return o!==e&&(n=[n,o,r,h],d="array"),"string"===d?this.parse(s(n)||a._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof l?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var a=s.cache;f(s.props,function(t,e){if(!u[a]&&s.to){if("alpha"===t||null==n[t])return;u[a]=s.to(u._rgba)}u[a][e.idx]=i(n[t],e,!0)}),u[a]&&0>t.inArray(null,u[a].slice(0,3))&&(u[a][3]=1,s.from&&(u._rgba=s.from(u[a])))}),this):e},is:function(t){var i=l(t),s=!0,n=this;return f(c,function(t,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),a=c[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(t,n){var a=n.idx,o=r[a],l=s[a],c=u[n.type]||{};null!==l&&(null===o?h[a]=l:(c.mod&&(l-o>c.mod/2?o+=c.mod:o-l>c.mod/2&&(o-=c.mod)),h[a]=i((l-o)*e+o,n)))}),this[n](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,a=t[2]/255,o=t[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,c=r+h,u=.5*c;return e=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=u?l/c:l/(2-c),[Math.round(e)%360,i,u,null==o?1:o]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],a=t[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,e+1/3)),Math.round(255*n(r,o,e)),Math.round(255*n(r,o,e-1/3)),a]},f(c,function(s,n){var a=n.props,o=n.cache,h=n.to,c=n.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===e)return this[o].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[o].slice();return f(a,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=l(c(d)),n[o]=d,n):l(d)},f(a,function(e,i){l.fn[e]||(l.fn[e]=function(n){var a,o=t.type(n),h="alpha"===e?this._hsla?"hsla":"rgba":s,l=this[h](),c=l[i.idx];return"undefined"===o?c:("function"===o&&(n=n.call(this,c),o=t.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=c+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var a,o,r="";if("transparent"!==n&&("string"!==t.type(n)||(a=s(n)))){if(n=l(a||n),!d.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&o&&o.style;)try{r=t.css(o,"backgroundColor"),o=o.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(h){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook(o),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function s(e,i){var s,n,o={};for(s in i)n=i[s],e[s]!==n&&(a[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(o[s]=n));return o}var n=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,a,o,r){var h=t.speed(a,o,r);return this.queue(function(){var a,o=t(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var e=t(this);return{el:e,start:i(this)}}),a=function(){t.each(n,function(t,i){e[i]&&o[i+"Class"](e[i])})},a(),l=l.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var e=this,i=t.Deferred(),s=t.extend({},h,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,l.get()).done(function(){a(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),h.complete.call(o[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,a){return s?t.effects.animateClass.call(this,{add:i},s,n,a):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,a){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,a):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,a,o,r){return"boolean"==typeof n||n===e?a?t.effects.animateClass.call(this,n?{add:s}:{remove:s},a,o,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,a,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,a){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,a)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.3",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,a;for(a=0;s.length>a;a++)null!==s[a]&&(n=t.data(i+s[a]),n===e&&(n=""),t.css(s[a],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return e.wrap(s),(e[0]===a||t.contains(e[0],a))&&t(a).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var a=e.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(a)&&a.call(n[0]),t.isFunction(e)&&e()}var n=t(this),a=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):o.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,a=i.queue,o=t.effects.effect[i.effect];return t.fx.off||!o?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):a===!1?this.each(e):this.queue(a||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()})(jQuery);
},{}],8:[function(require,module,exports){
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));
},{}],9:[function(require,module,exports){
/*

	jQuery Tags Input Plugin 1.3.3
	
	Copyright (c) 2011 XOXCO, Inc
	
	Documentation for this plugin lives here:
	http://xoxco.com/clickable/jquery-tags-input
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

	ben@xoxco.com

*/

(function($) {

	var delimiter = new Array();
	var tags_callbacks = new Array();
	$.fn.doAutosize = function(o){
	    var minWidth = $(this).data('minwidth'),
	        maxWidth = $(this).data('maxwidth'),
	        val = '',
	        input = $(this),
	        testSubject = $('#'+$(this).data('tester_id'));
	
	    if (val === (val = input.val())) {return;}
	
	    // Enter new content into testSubject
	    var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    testSubject.html(escaped);
	    // Calculate new width + whether to change
	    var testerWidth = testSubject.width(),
	        newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
	        currentWidth = input.width(),
	        isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
	                             || (newWidth > minWidth && newWidth < maxWidth);
	
	    // Animate width
	    if (isValidWidthChange) {
	        input.width(newWidth);
	    }


  };
  $.fn.resetAutosize = function(options){
    // alert(JSON.stringify(options));
    var minWidth =  $(this).data('minwidth') || options.minInputWidth || $(this).width(),
        maxWidth = $(this).data('maxwidth') || options.maxInputWidth || ($(this).closest('.tagsinput').width() - options.inputPadding),
        val = '',
        input = $(this),
        testSubject = $('<tester/>').css({
            position: 'absolute',
            top: -9999,
            left: -9999,
            width: 'auto',
            fontSize: input.css('fontSize'),
            fontFamily: input.css('fontFamily'),
            fontWeight: input.css('fontWeight'),
            letterSpacing: input.css('letterSpacing'),
            whiteSpace: 'nowrap'
        }),
        testerId = $(this).attr('id')+'_autosize_tester';
    if(! $('#'+testerId).length > 0){
      testSubject.attr('id', testerId);
      testSubject.appendTo('body');
    }

    input.data('minwidth', minWidth);
    input.data('maxwidth', maxWidth);
    input.data('tester_id', testerId);
    input.css('width', minWidth);
  };
  
	$.fn.addTag = function(value,options) {
			options = jQuery.extend({focus:false,callback:true},options);
			this.each(function() { 
				var id = $(this).attr('id');

				var tagslist = $(this).val().split(delimiter[id]);
				if (tagslist[0] == '') { 
					tagslist = new Array();
				}

				value = jQuery.trim(value);
		
				if (options.unique) {
					var skipTag = $(this).tagExist(value);
					if(skipTag == true) {
					    //Marks fake input as not_valid to let styling it
    				    $('#'+id+'_tag').addClass('not_valid');
    				}
				} else {
					var skipTag = false; 
				}
				
				if (value !='' && skipTag != true) { 
                    $('<span>').addClass('tag').append(
                        $('<span>').text(value).append('&nbsp;&nbsp;'),
                        $('<a class="tagsinput-remove-link">', {
                            href  : '#',
                            title : 'Remove tag',
                            text  : ''
                        }).click(function () {
                            return $('#' + id).removeTag(escape(value));
                        })
                    ).insertBefore('#' + id + '_addTag');

					tagslist.push(value);
				
					$('#'+id+'_tag').val('');
					if (options.focus) {
						$('#'+id+'_tag').focus();
					} else {		
						$('#'+id+'_tag').blur();
					}
					
					$.fn.tagsInput.updateTagsField(this,tagslist);
					
					if (options.callback && tags_callbacks[id] && tags_callbacks[id]['onAddTag']) {
						var f = tags_callbacks[id]['onAddTag'];
						f.call(this, value);
					}
					if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
					{
						var i = tagslist.length;
						var f = tags_callbacks[id]['onChange'];
						f.call(this, $(this), tagslist[i-1]);
					}					
				}
		
			});		
			
			return false;
		};
		
	$.fn.removeTag = function(value) { 
			value = unescape(value);
			this.each(function() { 
				var id = $(this).attr('id');
	
				var old = $(this).val().split(delimiter[id]);
					
				$('#'+id+'_tagsinput .tag').remove();
				str = '';
				for (i=0; i< old.length; i++) { 
					if (old[i]!=value) { 
						str = str + delimiter[id] +old[i];
					}
				}
				
				$.fn.tagsInput.importTags(this,str);

				if (tags_callbacks[id] && tags_callbacks[id]['onRemoveTag']) {
					var f = tags_callbacks[id]['onRemoveTag'];
					f.call(this, value);
				}
			});
					
			return false;
		};
	
	$.fn.tagExist = function(val) {
		var id = $(this).attr('id');
		var tagslist = $(this).val().split(delimiter[id]);
		return (jQuery.inArray(val, tagslist) >= 0); //true when tag exists, false when not
	};
	
	// clear all existing tags and import new ones from a string
	$.fn.importTags = function(str) {
                id = $(this).attr('id');
		$('#'+id+'_tagsinput .tag').remove();
		$.fn.tagsInput.importTags(this,str);
	}
		
	$.fn.tagsInput = function(options) { 
    var settings = jQuery.extend({
      interactive:true,
      defaultText:'',
      minChars:0,
      width:'',
      height:'',
      autocomplete: {selectFirst: false },
      'hide':true,
      'delimiter':',',
      'unique':true,
      removeWithBackspace:true,
      placeholderColor:'#666666',
      autosize: true,
      comfortZone: 20,
      inputPadding: 6*2
    },options);

		this.each(function() { 
			if (settings.hide) { 
				$(this).hide();				
			}
			var id = $(this).attr('id');
			if (!id || delimiter[$(this).attr('id')]) {
				id = $(this).attr('id', 'tags' + new Date().getTime()).attr('id');
			}
			
			var data = jQuery.extend({
				pid:id,
				real_input: '#'+id,
				holder: '#'+id+'_tagsinput',
				input_wrapper: '#'+id+'_addTag',
				fake_input: '#'+id+'_tag'
			},settings);
	
			delimiter[id] = data.delimiter;
			
			if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
				tags_callbacks[id] = new Array();
				tags_callbacks[id]['onAddTag'] = settings.onAddTag;
				tags_callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
				tags_callbacks[id]['onChange'] = settings.onChange;
			}
	
            var containerClass = $('#'+id).attr('class').replace('tagsinput', '');
			var markup = '<div id="'+id+'_tagsinput" class="tagsinput '+containerClass+'"><div class="tagsinput-add-container" id="'+id+'_addTag"><div class="tagsinput-add"></div>';
			
			if (settings.interactive) {
				markup = markup + '<input id="'+id+'_tag" value="" data-default="'+settings.defaultText+'" />';
			}
			
			markup = markup + '</div></div>';
			
			$(markup).insertAfter(this);

			$(data.holder).css('width',settings.width);
			$(data.holder).css('min-height',settings.height);
			$(data.holder).css('height','100%');
	
			if ($(data.real_input).val()!='') { 
				$.fn.tagsInput.importTags($(data.real_input),$(data.real_input).val());
			}		
			if (settings.interactive) { 
				$(data.fake_input).val($(data.fake_input).attr('data-default'));
				$(data.fake_input).css('color',settings.placeholderColor);
		        $(data.fake_input).resetAutosize(settings);
		
				$(data.holder).bind('click',data,function(event) {
					$(event.data.fake_input).focus();
				});
			
				$(data.fake_input).bind('focus',data,function(event) {
					if ($(event.data.fake_input).val()==$(event.data.fake_input).attr('data-default')) { 
						$(event.data.fake_input).val('');
					}
					$(event.data.fake_input).css('color','#000000');		
				});
						
				if (settings.autocomplete_url != undefined) {
					autocomplete_options = {source: settings.autocomplete_url};
					for (attrname in settings.autocomplete) { 
						autocomplete_options[attrname] = settings.autocomplete[attrname]; 
					}
				
					if (jQuery.Autocompleter !== undefined) {
						$(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete);
						$(data.fake_input).bind('result',data,function(event,data,formatted) {
							if (data) {
								$('#'+id).addTag(data[0] + "",{focus:true,unique:(settings.unique)});
							}
					  	});
					} else if (jQuery.ui.autocomplete !== undefined) {
						$(data.fake_input).autocomplete(autocomplete_options);
						$(data.fake_input).bind('autocompleteselect',data,function(event,ui) {
							$(event.data.real_input).addTag(ui.item.value,{focus:true,unique:(settings.unique)});
							return false;
						});
					}
				
					
				} else {
						// if a user tabs out of the field, create a new tag
						// this is only available if autocomplete is not used.
						$(data.fake_input).bind('blur',data,function(event) { 
							var d = $(this).attr('data-default');
							if ($(event.data.fake_input).val()!='' && $(event.data.fake_input).val()!=d) { 
								if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) )
									$(event.data.real_input).addTag($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
							} else {
								$(event.data.fake_input).val($(event.data.fake_input).attr('data-default'));
								$(event.data.fake_input).css('color',settings.placeholderColor);
							}
							return false;
						});
				
				}
				// if user types a comma, create a new tag
				$(data.fake_input).bind('keypress',data,function(event) {
					if (event.which==event.data.delimiter.charCodeAt(0) || event.which==13 ) {
					    event.preventDefault();
						if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) )
							$(event.data.real_input).addTag($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
					  	$(event.data.fake_input).resetAutosize(settings);
						return false;
					} else if (event.data.autosize) {
			            $(event.data.fake_input).doAutosize(settings);
            
          			}
				});
				//Delete last tag on backspace
				data.removeWithBackspace && $(data.fake_input).bind('keydown', function(event)
				{
					if(event.keyCode == 8 && $(this).val() == '')
					{
						 event.preventDefault();
						 var last_tag = $(this).closest('.tagsinput').find('.tag:last').text();
						 var id = $(this).attr('id').replace(/_tag$/, '');
						 last_tag = last_tag.replace(/[\s\u00a0]+x$/, '');
						 $('#' + id).removeTag(escape(last_tag));
						 $(this).trigger('focus');
					}
				});
				$(data.fake_input).blur();
				
				//Removes the not_valid class when user changes the value of the fake input
				if(data.unique) {
				    $(data.fake_input).keydown(function(event){
				        if(event.keyCode == 8 || String.fromCharCode(event.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,/]+/)) {
				            $(this).removeClass('not_valid');
				        }
				    });
				}
			} // if settings.interactive
		});
			
		return this;
	
	};
	
	$.fn.tagsInput.updateTagsField = function(obj,tagslist) { 
		var id = $(obj).attr('id');
		$(obj).val(tagslist.join(delimiter[id]));
	};
	
	$.fn.tagsInput.importTags = function(obj,val) {			
		$(obj).val('');
		var id = $(obj).attr('id');
		var tags = val.split(delimiter[id]);
		for (i=0; i<tags.length; i++) { 
			$(obj).addTag(tags[i],{focus:false,callback:false});
		}
		if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
		{
			var f = tags_callbacks[id]['onChange'];
			f.call(obj, obj, tags[i]);
		}
	};

})(jQuery);

},{}],10:[function(require,module,exports){
/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);
},{}],11:[function(require,module,exports){
/**
 * @license
 * Pixi.JS - v1.3.0
 * Copyright (c) 2012, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2013-08-28
 *
 * Pixi.JS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
!function(){function c(){return f.Matrix="undefined"!=typeof Float32Array?Float32Array:Array,f.Matrix}function d(a){return[(255&a>>16)/255,(255&a>>8)/255,(255&a)/255]}function d(a){return[(255&a>>16)/255,(255&a>>8)/255,(255&a)/255]}var e=this,f=f||{};f.Point=function(a,b){this.x=a||0,this.y=b||0},f.Point.prototype.clone=function(){return new f.Point(this.x,this.y)},f.Point.prototype.constructor=f.Point,f.Rectangle=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},f.Rectangle.prototype.clone=function(){return new f.Rectangle(this.x,this.y,this.width,this.height)},f.Rectangle.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=this.x;if(a>=c&&a<=c+this.width){var d=this.y;if(b>=d&&b<=d+this.height)return!0}return!1},f.Rectangle.prototype.constructor=f.Rectangle,f.Polygon=function(a){if(a instanceof Array||(a=Array.prototype.slice.call(arguments)),"number"==typeof a[0]){for(var b=[],c=0,d=a.length;d>c;c+=2)b.push(new f.Point(a[c],a[c+1]));a=b}this.points=a},f.Polygon.prototype.clone=function(){for(var a=[],b=0;b<this.points.length;b++)a.push(this.points[b].clone());return new f.Polygon(a)},f.Polygon.prototype.contains=function(a,b){for(var c=!1,d=0,e=this.points.length-1;d<this.points.length;e=d++){var f=this.points[d].x,g=this.points[d].y,h=this.points[e].x,i=this.points[e].y,j=g>b!=i>b&&(h-f)*(b-g)/(i-g)+f>a;j&&(c=!c)}return c},f.Polygon.prototype.constructor=f.Polygon,f.Circle=function(a,b,c){this.x=a||0,this.y=b||0,this.radius=c||0},f.Circle.prototype.clone=function(){return new f.Circle(this.x,this.y,this.radius)},f.Circle.prototype.contains=function(a,b){if(this.radius<=0)return!1;var c=this.x-a,d=this.y-b,e=this.radius*this.radius;return c*=c,d*=d,e>=c+d},f.Circle.prototype.constructor=f.Circle,f.Ellipse=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},f.Ellipse.prototype.clone=function(){return new f.Ellipse(this.x,this.y,this.width,this.height)},f.Ellipse.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=(a-this.x)/this.width-.5,d=(b-this.y)/this.height-.5;return c*=c,d*=d,.25>c+d},f.Ellipse.getBounds=function(){return new f.Rectangle(this.x,this.y,this.width,this.height)},f.Ellipse.prototype.constructor=f.Ellipse,c(),f.mat3={},f.mat3.create=function(){var a=new f.Matrix(9);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},f.mat3.identity=function(a){return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=1,a[5]=0,a[6]=0,a[7]=0,a[8]=1,a},f.mat4={},f.mat4.create=function(){var a=new f.Matrix(16);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},f.mat3.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=b[0],n=b[1],o=b[2],p=b[3],q=b[4],r=b[5],s=b[6],t=b[7],u=b[8];return c[0]=m*d+n*g+o*j,c[1]=m*e+n*h+o*k,c[2]=m*f+n*i+o*l,c[3]=p*d+q*g+r*j,c[4]=p*e+q*h+r*k,c[5]=p*f+q*i+r*l,c[6]=s*d+t*g+u*j,c[7]=s*e+t*h+u*k,c[8]=s*f+t*i+u*l,c},f.mat3.clone=function(a){var b=new f.Matrix(9);return b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b[4]=a[4],b[5]=a[5],b[6]=a[6],b[7]=a[7],b[8]=a[8],b},f.mat3.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[5];return a[1]=a[3],a[2]=a[6],a[3]=c,a[5]=a[7],a[6]=d,a[7]=e,a}return b[0]=a[0],b[1]=a[3],b[2]=a[6],b[3]=a[1],b[4]=a[4],b[5]=a[7],b[6]=a[2],b[7]=a[5],b[8]=a[8],b},f.mat3.toMat4=function(a,b){return b||(b=f.mat4.create()),b[15]=1,b[14]=0,b[13]=0,b[12]=0,b[11]=0,b[10]=a[8],b[9]=a[7],b[8]=a[6],b[7]=0,b[6]=a[5],b[5]=a[4],b[4]=a[3],b[3]=0,b[2]=a[2],b[1]=a[1],b[0]=a[0],b},f.mat4.create=function(){var a=new f.Matrix(16);return a[0]=1,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=1,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1,a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a},f.mat4.transpose=function(a,b){if(!b||a===b){var c=a[1],d=a[2],e=a[3],f=a[6],g=a[7],h=a[11];return a[1]=a[4],a[2]=a[8],a[3]=a[12],a[4]=c,a[6]=a[9],a[7]=a[13],a[8]=d,a[9]=f,a[11]=a[14],a[12]=e,a[13]=g,a[14]=h,a}return b[0]=a[0],b[1]=a[4],b[2]=a[8],b[3]=a[12],b[4]=a[1],b[5]=a[5],b[6]=a[9],b[7]=a[13],b[8]=a[2],b[9]=a[6],b[10]=a[10],b[11]=a[14],b[12]=a[3],b[13]=a[7],b[14]=a[11],b[15]=a[15],b},f.mat4.multiply=function(a,b,c){c||(c=a);var d=a[0],e=a[1],f=a[2],g=a[3],h=a[4],i=a[5],j=a[6],k=a[7],l=a[8],m=a[9],n=a[10],o=a[11],p=a[12],q=a[13],r=a[14],s=a[15],t=b[0],u=b[1],v=b[2],w=b[3];return c[0]=t*d+u*h+v*l+w*p,c[1]=t*e+u*i+v*m+w*q,c[2]=t*f+u*j+v*n+w*r,c[3]=t*g+u*k+v*o+w*s,t=b[4],u=b[5],v=b[6],w=b[7],c[4]=t*d+u*h+v*l+w*p,c[5]=t*e+u*i+v*m+w*q,c[6]=t*f+u*j+v*n+w*r,c[7]=t*g+u*k+v*o+w*s,t=b[8],u=b[9],v=b[10],w=b[11],c[8]=t*d+u*h+v*l+w*p,c[9]=t*e+u*i+v*m+w*q,c[10]=t*f+u*j+v*n+w*r,c[11]=t*g+u*k+v*o+w*s,t=b[12],u=b[13],v=b[14],w=b[15],c[12]=t*d+u*h+v*l+w*p,c[13]=t*e+u*i+v*m+w*q,c[14]=t*f+u*j+v*n+w*r,c[15]=t*g+u*k+v*o+w*s,c},f.DisplayObject=function(){this.last=this,this.first=this,this.position=new f.Point,this.scale=new f.Point(1,1),this.pivot=new f.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.buttonMode=!1,this.renderable=!1,this.parent=null,this.stage=null,this.worldAlpha=1,this._interactive=!1,this.worldTransform=f.mat3.create(),this.localTransform=f.mat3.create(),this.color=[],this.dynamic=!0,this._sr=0,this._cr=1},f.DisplayObject.prototype.constructor=f.DisplayObject,f.DisplayObject.prototype.setInteractive=function(a){this.interactive=a},Object.defineProperty(f.DisplayObject.prototype,"interactive",{get:function(){return this._interactive},set:function(a){this._interactive=a,this.stage&&(this.stage.dirty=!0)}}),Object.defineProperty(f.DisplayObject.prototype,"mask",{get:function(){return this._mask},set:function(a){this._mask=a,a?this.addFilter(a):this.removeFilter()}}),f.DisplayObject.prototype.addFilter=function(a){if(!this.filter){this.filter=!0;var b=new f.FilterBlock,c=new f.FilterBlock;b.mask=a,c.mask=a,b.first=b.last=this,c.first=c.last=this,b.open=!0;var d,e,g=b,h=b;e=this.first._iPrev,e?(d=e._iNext,g._iPrev=e,e._iNext=g):d=this,d&&(d._iPrev=h,h._iNext=d);var g=c,h=c,d=null,e=null;e=this.last,d=e._iNext,d&&(d._iPrev=h,h._iNext=d),g._iPrev=e,e._iNext=g;for(var i=this,j=this.last;i;)i.last==j&&(i.last=c),i=i.parent;this.first=b,this.__renderGroup&&this.__renderGroup.addFilterBlocks(b,c),a.renderable=!1}},f.DisplayObject.prototype.removeFilter=function(){if(this.filter){this.filter=!1;var a=this.first,b=a._iNext,c=a._iPrev;b&&(b._iPrev=c),c&&(c._iNext=b),this.first=a._iNext;var d=this.last,b=d._iNext,c=d._iPrev;b&&(b._iPrev=c),c._iNext=b;for(var e=d._iPrev,f=this;f.last==d&&(f.last=e,f=f.parent););var g=a.mask;g.renderable=!0,this.__renderGroup&&this.__renderGroup.removeFilterBlocks(a,d)}},f.DisplayObject.prototype.updateTransform=function(){this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation));var a=this.localTransform,b=this.parent.worldTransform,c=this.worldTransform;a[0]=this._cr*this.scale.x,a[1]=-this._sr*this.scale.y,a[3]=this._sr*this.scale.x,a[4]=this._cr*this.scale.y;var d=this.pivot.x,e=this.pivot.y,g=a[0],h=a[1],i=this.position.x-a[0]*d-e*a[1],j=a[3],k=a[4],l=this.position.y-a[4]*e-d*a[3],m=b[0],n=b[1],o=b[2],p=b[3],q=b[4],r=b[5];a[2]=i,a[5]=l,c[0]=m*g+n*j,c[1]=m*h+n*k,c[2]=m*i+n*l+o,c[3]=p*g+q*j,c[4]=p*h+q*k,c[5]=p*i+q*l+r,this.worldAlpha=this.alpha*this.parent.worldAlpha,this.vcount=f.visibleCount},f.visibleCount=0,f.DisplayObjectContainer=function(){f.DisplayObject.call(this),this.children=[]},f.DisplayObjectContainer.prototype=Object.create(f.DisplayObject.prototype),f.DisplayObjectContainer.prototype.constructor=f.DisplayObjectContainer,f.DisplayObjectContainer.prototype.addChild=function(a){if(void 0!=a.parent&&a.parent.removeChild(a),a.parent=this,this.children.push(a),this.stage){var b=a;do b.interactive&&(this.stage.dirty=!0),b.stage=this.stage,b=b._iNext;while(b)}var c,d,e=a.first,f=a.last;d=this.filter?this.last._iPrev:this.last,c=d._iNext;for(var g=this,h=d;g;)g.last==h&&(g.last=a.last),g=g.parent;c&&(c._iPrev=f,f._iNext=c),e._iPrev=d,d._iNext=e,this.__renderGroup&&(a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a),this.__renderGroup.addDisplayObjectAndChildren(a))},f.DisplayObjectContainer.prototype.addChildAt=function(a,b){if(!(b>=0&&b<=this.children.length))throw new Error(a+" The index "+b+" supplied is out of bounds "+this.children.length);if(void 0!=a.parent&&a.parent.removeChild(a),a.parent=this,this.stage){var c=a;do c.interactive&&(this.stage.dirty=!0),c.stage=this.stage,c=c._iNext;while(c)}var d,e,f=a.first,g=a.last;if(b==this.children.length){e=this.last;for(var h=this,i=this.last;h;)h.last==i&&(h.last=a.last),h=h.parent}else e=0==b?this:this.children[b-1].last;d=e._iNext,d&&(d._iPrev=g,g._iNext=d),f._iPrev=e,e._iNext=f,this.children.splice(b,0,a),this.__renderGroup&&(a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a),this.__renderGroup.addDisplayObjectAndChildren(a))},f.DisplayObjectContainer.prototype.swapChildren=function(){},f.DisplayObjectContainer.prototype.getChildAt=function(a){if(a>=0&&a<this.children.length)return this.children[a];throw new Error(child+" Both the supplied DisplayObjects must be a child of the caller "+this)},f.DisplayObjectContainer.prototype.removeChild=function(a){var b=this.children.indexOf(a);if(-1===b)throw new Error(a+" The supplied DisplayObject must be a child of the caller "+this);var c=a.first,d=a.last,e=d._iNext,f=c._iPrev;if(e&&(e._iPrev=f),f._iNext=e,this.last==d)for(var g=c._iPrev,h=this;h.last==d.last&&(h.last=g,h=h.parent););if(d._iNext=null,c._iPrev=null,this.stage){var i=a;do i.interactive&&(this.stage.dirty=!0),i.stage=null,i=i._iNext;while(i)}a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a),a.parent=void 0,this.children.splice(b,1)},f.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible){f.DisplayObject.prototype.updateTransform.call(this);for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform()}},f.blendModes={},f.blendModes.NORMAL=0,f.blendModes.SCREEN=1,f.Sprite=function(a){f.DisplayObjectContainer.call(this),this.anchor=new f.Point,this.texture=a,this.blendMode=f.blendModes.NORMAL,this._width=0,this._height=0,a.baseTexture.hasLoaded?this.updateFrame=!0:(this.onTextureUpdateBind=this.onTextureUpdate.bind(this),this.texture.addEventListener("update",this.onTextureUpdateBind)),this.renderable=!0},f.Sprite.prototype=Object.create(f.DisplayObjectContainer.prototype),f.Sprite.prototype.constructor=f.Sprite,Object.defineProperty(f.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(f.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),f.Sprite.prototype.setTexture=function(a){this.texture.baseTexture!=a.baseTexture?(this.textureChange=!0,this.texture=a,this.__renderGroup&&this.__renderGroup.updateTexture(this)):this.texture=a,this.updateFrame=!0},f.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height),this.updateFrame=!0},f.Sprite.fromFrame=function(a){var b=f.TextureCache[a];if(!b)throw new Error("The frameId '"+a+"' does not exist in the texture cache"+this);return new f.Sprite(b)},f.Sprite.fromImage=function(a){var b=f.Texture.fromImage(a);return new f.Sprite(b)},f.MovieClip=function(a){f.Sprite.call(this,a[0]),this.textures=a,this.animationSpeed=1,this.loop=!0,this.onComplete=null,this.currentFrame=0,this.playing=!1},f.MovieClip.prototype=Object.create(f.Sprite.prototype),f.MovieClip.prototype.constructor=f.MovieClip,f.MovieClip.prototype.stop=function(){this.playing=!1},f.MovieClip.prototype.play=function(){this.playing=!0},f.MovieClip.prototype.gotoAndStop=function(a){this.playing=!1,this.currentFrame=a;var b=0|this.currentFrame+.5;this.setTexture(this.textures[b%this.textures.length])},f.MovieClip.prototype.gotoAndPlay=function(a){this.currentFrame=a,this.playing=!0},f.MovieClip.prototype.updateTransform=function(){if(f.Sprite.prototype.updateTransform.call(this),this.playing){this.currentFrame+=this.animationSpeed;var a=0|this.currentFrame+.5;this.loop||a<this.textures.length?this.setTexture(this.textures[a%this.textures.length]):a>=this.textures.length&&(this.gotoAndStop(this.textures.length-1),this.onComplete&&this.onComplete())}},f.FilterBlock=function(a){this.graphics=a,this.visible=!0,this.renderable=!0},f.Text=function(a,b){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),f.Sprite.call(this,f.Texture.fromCanvas(this.canvas)),this.setText(a),this.setStyle(b),this.updateText(),this.dirty=!1},f.Text.prototype=Object.create(f.Sprite.prototype),f.Text.prototype.constructor=f.Text,f.Text.prototype.setStyle=function(a){a=a||{},a.font=a.font||"bold 20pt Arial",a.fill=a.fill||"black",a.align=a.align||"left",a.stroke=a.stroke||"black",a.strokeThickness=a.strokeThickness||0,a.wordWrap=a.wordWrap||!1,a.wordWrapWidth=a.wordWrapWidth||100,this.style=a,this.dirty=!0},f.Sprite.prototype.setText=function(a){this.text=a.toString()||" ",this.dirty=!0},f.Text.prototype.updateText=function(){this.context.font=this.style.font;var a=this.text;this.style.wordWrap&&(a=this.wordWrap(this.text));for(var b=a.split(/(?:\r\n|\r|\n)/),c=[],d=0,e=0;e<b.length;e++){var g=this.context.measureText(b[e]).width;c[e]=g,d=Math.max(d,g)}this.canvas.width=d+this.style.strokeThickness;var h=this.determineFontHeight("font: "+this.style.font+";")+this.style.strokeThickness;for(this.canvas.height=h*b.length,this.context.fillStyle=this.style.fill,this.context.font=this.style.font,this.context.strokeStyle=this.style.stroke,this.context.lineWidth=this.style.strokeThickness,this.context.textBaseline="top",e=0;e<b.length;e++){var i=new f.Point(this.style.strokeThickness/2,this.style.strokeThickness/2+e*h);"right"==this.style.align?i.x+=d-c[e]:"center"==this.style.align&&(i.x+=(d-c[e])/2),this.style.stroke&&this.style.strokeThickness&&this.context.strokeText(b[e],i.x,i.y),this.style.fill&&this.context.fillText(b[e],i.x,i.y)}this.updateTexture()},f.Text.prototype.updateTexture=function(){this.texture.baseTexture.width=this.canvas.width,this.texture.baseTexture.height=this.canvas.height,this.texture.frame.width=this.canvas.width,this.texture.frame.height=this.canvas.height,this._width=this.canvas.width,this._height=this.canvas.height,f.texturesToUpdate.push(this.texture.baseTexture)},f.Text.prototype.updateTransform=function(){this.dirty&&(this.updateText(),this.dirty=!1),f.Sprite.prototype.updateTransform.call(this)},f.Text.prototype.determineFontHeight=function(a){var b=f.Text.heightCache[a];if(!b){var c=document.getElementsByTagName("body")[0],d=document.createElement("div"),e=document.createTextNode("M");d.appendChild(e),d.setAttribute("style",a+";position:absolute;top:0;left:0"),c.appendChild(d),b=d.offsetHeight,f.Text.heightCache[a]=b,c.removeChild(d)}return b},f.Text.prototype.wordWrap=function(a){for(var b=function(a,b,c,d,e){var f=Math.floor((d-c)/2)+c;return f==c?1:a.measureText(b.substring(0,f)).width<=e?a.measureText(b.substring(0,f+1)).width>e?f:arguments.callee(a,b,f,d,e):arguments.callee(a,b,c,f,e)},c=function(a,c,d){if(a.measureText(c).width<=d||c.length<1)return c;var e=b(a,c,0,c.length,d);return c.substring(0,e)+"\n"+arguments.callee(a,c.substring(e),d)},d="",e=a.split("\n"),f=0;f<e.length;f++)d+=c(this.context,e[f],this.style.wordWrapWidth)+"\n";return d},f.Text.prototype.destroy=function(a){a&&this.texture.destroy()},f.Text.heightCache={},f.BitmapText=function(a,b){f.DisplayObjectContainer.call(this),this.setText(a),this.setStyle(b),this.updateText(),this.dirty=!1},f.BitmapText.prototype=Object.create(f.DisplayObjectContainer.prototype),f.BitmapText.prototype.constructor=f.BitmapText,f.BitmapText.prototype.setText=function(a){this.text=a||" ",this.dirty=!0},f.BitmapText.prototype.setStyle=function(a){a=a||{},a.align=a.align||"left",this.style=a;var b=a.font.split(" ");this.fontName=b[b.length-1],this.fontSize=b.length>=2?parseInt(b[b.length-2],10):f.BitmapText.fonts[this.fontName].size,this.dirty=!0},f.BitmapText.prototype.updateText=function(){for(var a=f.BitmapText.fonts[this.fontName],b=new f.Point,c=null,d=[],e=0,g=[],h=0,i=this.fontSize/a.size,j=0;j<this.text.length;j++){var k=this.text.charCodeAt(j);if(/(?:\r\n|\r|\n)/.test(this.text.charAt(j)))g.push(b.x),e=Math.max(e,b.x),h++,b.x=0,b.y+=a.lineHeight,c=null;else{var l=a.chars[k];l&&(c&&l[c]&&(b.x+=l.kerning[c]),d.push({texture:l.texture,line:h,charCode:k,position:new f.Point(b.x+l.xOffset,b.y+l.yOffset)}),b.x+=l.xAdvance,c=k)}}g.push(b.x),e=Math.max(e,b.x);var m=[];for(j=0;h>=j;j++){var n=0;"right"==this.style.align?n=e-g[j]:"center"==this.style.align&&(n=(e-g[j])/2),m.push(n)}for(j=0;j<d.length;j++){var o=new f.Sprite(d[j].texture);o.position.x=(d[j].position.x+m[d[j].line])*i,o.position.y=d[j].position.y*i,o.scale.x=o.scale.y=i,this.addChild(o)}this.width=b.x*i,this.height=(b.y+a.lineHeight)*i},f.BitmapText.prototype.updateTransform=function(){if(this.dirty){for(;this.children.length>0;)this.removeChild(this.getChildAt(0));this.updateText(),this.dirty=!1}f.DisplayObjectContainer.prototype.updateTransform.call(this)},f.BitmapText.fonts={},f.InteractionManager=function(a){this.stage=a,this.mouse=new f.InteractionData,this.touchs={},this.tempPoint=new f.Point,this.mouseoverEnabled=!0,this.pool=[],this.interactiveItems=[],this.last=0},f.InteractionManager.prototype.constructor=f.InteractionManager,f.InteractionManager.prototype.collectInteractiveSprite=function(a,b){for(var c=a.children,d=c.length,e=d-1;e>=0;e--){var f=c[e];f.interactive?(b.interactiveChildren=!0,this.interactiveItems.push(f),f.children.length>0&&this.collectInteractiveSprite(f,f)):(f.__iParent=null,f.children.length>0&&this.collectInteractiveSprite(f,b))}},f.InteractionManager.prototype.setTarget=function(a){window.navigator.msPointerEnabled&&(a.view.style["-ms-content-zooming"]="none",a.view.style["-ms-touch-action"]="none"),this.target=a,a.view.addEventListener("mousemove",this.onMouseMove.bind(this),!0),a.view.addEventListener("mousedown",this.onMouseDown.bind(this),!0),document.body.addEventListener("mouseup",this.onMouseUp.bind(this),!0),a.view.addEventListener("mouseout",this.onMouseOut.bind(this),!0),a.view.addEventListener("touchstart",this.onTouchStart.bind(this),!0),a.view.addEventListener("touchend",this.onTouchEnd.bind(this),!0),a.view.addEventListener("touchmove",this.onTouchMove.bind(this),!0)},f.InteractionManager.prototype.update=function(){if(this.target){var a=Date.now(),b=a-this.last;if(b=30*b/1e3,!(1>b)){if(this.last=a,this.dirty){this.dirty=!1;for(var c=this.interactiveItems.length,d=0;c>d;d++)this.interactiveItems[d].interactiveChildren=!1;this.interactiveItems=[],this.stage.interactive&&this.interactiveItems.push(this.stage),this.collectInteractiveSprite(this.stage,this.stage)}var e=this.interactiveItems.length;this.target.view.style.cursor="default";for(var d=0;e>d;d++){var f=this.interactiveItems[d];(f.mouseover||f.mouseout||f.buttonMode)&&(f.__hit=this.hitTest(f,this.mouse),this.mouse.target=f,f.__hit?(f.buttonMode&&(this.target.view.style.cursor="pointer"),f.__isOver||(f.mouseover&&f.mouseover(this.mouse),f.__isOver=!0)):f.__isOver&&(f.mouseout&&f.mouseout(this.mouse),f.__isOver=!1))}}}},f.InteractionManager.prototype.onMouseMove=function(a){this.mouse.originalEvent=a||window.event;var b=this.target.view.getBoundingClientRect();this.mouse.global.x=(a.clientX-b.left)*(this.target.width/b.width),this.mouse.global.y=(a.clientY-b.top)*(this.target.height/b.height);var c=this.interactiveItems.length;this.mouse.global;for(var d=0;c>d;d++){var e=this.interactiveItems[d];e.mousemove&&e.mousemove(this.mouse)}},f.InteractionManager.prototype.onMouseDown=function(a){this.mouse.originalEvent=a||window.event;var b=this.interactiveItems.length;this.mouse.global,this.stage;for(var c=0;b>c;c++){var d=this.interactiveItems[c];if((d.mousedown||d.click)&&(d.__mouseIsDown=!0,d.__hit=this.hitTest(d,this.mouse),d.__hit&&(d.mousedown&&d.mousedown(this.mouse),d.__isDown=!0,!d.interactiveChildren)))break}},f.InteractionManager.prototype.onMouseOut=function(){var a=this.interactiveItems.length;this.target.view.style.cursor="default";for(var b=0;a>b;b++){var c=this.interactiveItems[b];c.__isOver&&(this.mouse.target=c,c.mouseout&&c.mouseout(this.mouse),c.__isOver=!1)}},f.InteractionManager.prototype.onMouseUp=function(a){this.mouse.originalEvent=a||window.event,this.mouse.global;for(var b=this.interactiveItems.length,c=!1,d=0;b>d;d++){var e=this.interactiveItems[d];(e.mouseup||e.mouseupoutside||e.click)&&(e.__hit=this.hitTest(e,this.mouse),e.__hit&&!c?(e.mouseup&&e.mouseup(this.mouse),e.__isDown&&e.click&&e.click(this.mouse),e.interactiveChildren||(c=!0)):e.__isDown&&e.mouseupoutside&&e.mouseupoutside(this.mouse),e.__isDown=!1)}},f.InteractionManager.prototype.hitTest=function(a,b){var c=b.global;if(a.vcount!==f.visibleCount)return!1;var d=a instanceof f.Sprite,e=a.worldTransform,g=e[0],h=e[1],i=e[2],j=e[3],k=e[4],l=e[5],m=1/(g*k+h*-j),n=k*m*c.x+-h*m*c.y+(l*h-i*k)*m,o=g*m*c.y+-j*m*c.x+(-l*g+i*j)*m;if(b.target=a,a.hitArea&&a.hitArea.contains)return a.hitArea.contains(n,o)?(b.target=a,!0):!1;if(d){var p,q=a.texture.frame.width,r=a.texture.frame.height,s=-q*a.anchor.x;if(n>s&&s+q>n&&(p=-r*a.anchor.y,o>p&&p+r>o))return b.target=a,!0}for(var t=a.children.length,u=0;t>u;u++){var v=a.children[u],w=this.hitTest(v,b);if(w)return b.target=a,!0}return!1},f.InteractionManager.prototype.onTouchMove=function(a){for(var b=this.target.view.getBoundingClientRect(),c=a.changedTouches,d=0;d<c.length;d++){var e=c[d],f=this.touchs[e.identifier];f.originalEvent=a||window.event,f.global.x=(e.clientX-b.left)*(this.target.width/b.width),f.global.y=(e.clientY-b.top)*(this.target.height/b.height)}for(var g=this.interactiveItems.length,d=0;g>d;d++){var h=this.interactiveItems[d];h.touchmove&&h.touchmove(f)}},f.InteractionManager.prototype.onTouchStart=function(a){for(var b=this.target.view.getBoundingClientRect(),c=a.changedTouches,d=0;d<c.length;d++){var e=c[d],g=this.pool.pop();g||(g=new f.InteractionData),g.originalEvent=a||window.event,this.touchs[e.identifier]=g,g.global.x=(e.clientX-b.left)*(this.target.width/b.width),g.global.y=(e.clientY-b.top)*(this.target.height/b.height);for(var h=this.interactiveItems.length,i=0;h>i;i++){var j=this.interactiveItems[i];if((j.touchstart||j.tap)&&(j.__hit=this.hitTest(j,g),j.__hit&&(j.touchstart&&j.touchstart(g),j.__isDown=!0,j.__touchData=g,!j.interactiveChildren)))break}}},f.InteractionManager.prototype.onTouchEnd=function(a){for(var b=this.target.view.getBoundingClientRect(),c=a.changedTouches,d=0;d<c.length;d++){var e=c[d],f=this.touchs[e.identifier],g=!1;f.global.x=(e.clientX-b.left)*(this.target.width/b.width),f.global.y=(e.clientY-b.top)*(this.target.height/b.height);for(var h=this.interactiveItems.length,i=0;h>i;i++){var j=this.interactiveItems[i],k=j.__touchData;j.__hit=this.hitTest(j,f),k==f&&(f.originalEvent=a||window.event,(j.touchend||j.tap)&&(j.__hit&&!g?(j.touchend&&j.touchend(f),j.__isDown&&j.tap&&j.tap(f),j.interactiveChildren||(g=!0)):j.__isDown&&j.touchendoutside&&j.touchendoutside(f),j.__isDown=!1),j.__touchData=null)}this.pool.push(f),this.touchs[e.identifier]=null}},f.InteractionData=function(){this.global=new f.Point,this.local=new f.Point,this.target,this.originalEvent},f.InteractionData.prototype.getLocalPosition=function(a){var b=a.worldTransform,c=this.global,d=b[0],e=b[1],g=b[2],h=b[3],i=b[4],j=b[5],k=1/(d*i+e*-h);return new f.Point(i*k*c.x+-e*k*c.y+(j*e-g*i)*k,d*k*c.y+-h*k*c.x+(-j*d+g*h)*k)},f.InteractionData.prototype.constructor=f.InteractionData,f.Stage=function(a,b){f.DisplayObjectContainer.call(this),this.worldTransform=f.mat3.create(),this.interactive=b,this.interactionManager=new f.InteractionManager(this),this.dirty=!0,this.__childrenAdded=[],this.__childrenRemoved=[],this.stage=this,this.stage.hitArea=new f.Rectangle(0,0,1e5,1e5),this.setBackgroundColor(a),this.worldVisible=!0},f.Stage.prototype=Object.create(f.DisplayObjectContainer.prototype),f.Stage.prototype.constructor=f.Stage,f.Stage.prototype.updateTransform=function(){this.worldAlpha=1,this.vcount=f.visibleCount;for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform();this.dirty&&(this.dirty=!1,this.interactionManager.dirty=!0),this.interactive&&this.interactionManager.update()},f.Stage.prototype.setBackgroundColor=function(a){this.backgroundColor=a||0,this.backgroundColorSplit=d(this.backgroundColor);var b=this.backgroundColor.toString(16);b="000000".substr(0,6-b.length)+b,this.backgroundColorString="#"+b},f.Stage.prototype.getMousePosition=function(){return this.interactionManager.mouse.global};for(var h=0,i=["ms","moz","webkit","o"],j=0;j<i.length&&!window.requestAnimationFrame;++j)window.requestAnimationFrame=window[i[j]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[j]+"CancelAnimationFrame"]||window[i[j]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-h)),d=window.setTimeout(function(){a(b+c)},c);return h=b+c,d}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),window.requestAnimFrame=window.requestAnimationFrame,"function"!=typeof Function.prototype.bind&&(Function.prototype.bind=function(){var a=Array.prototype.slice;return function(b){function c(){var f=e.concat(a.call(arguments));d.apply(this instanceof c?this:b,f)}var d=this,e=a.call(arguments,1);if("function"!=typeof d)throw new TypeError;return c.prototype=function f(a){return a&&(f.prototype=a),this instanceof f?void 0:new f}(d.prototype),c}}());var k=f.AjaxRequest=function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP"];if(!window.ActiveXObject)return window.XMLHttpRequest?new XMLHttpRequest:!1;for(var b=0;b<a.length;b++)try{return new ActiveXObject(a[b])}catch(c){}};f.runList=function(a){console.log(">>>>>>>>>"),console.log("_");var b=0,c=a.first;for(console.log(c);c._iNext;)if(b++,c=c._iNext,console.log(c),b>100){console.log("BREAK");break}},f.EventTarget=function(){var a={};this.addEventListener=this.on=function(b,c){void 0===a[b]&&(a[b]=[]),-1===a[b].indexOf(c)&&a[b].push(c)},this.dispatchEvent=this.emit=function(b){for(var c in a[b.type])a[b.type][c](b)},this.removeEventListener=this.off=function(b,c){var d=a[b].indexOf(c);-1!==d&&a[b].splice(d,1)}},f.autoDetectRenderer=function(a,b,c,d,e){a||(a=800),b||(b=600);var g=function(){try{return!!window.WebGLRenderingContext&&!!document.createElement("canvas").getContext("experimental-webgl")}catch(a){return!1}}();return g?new f.WebGLRenderer(a,b,c,d,e):new f.CanvasRenderer(a,b,c,d)},f.PolyK={},f.PolyK.Triangulate=function(a){var b=!0,c=a.length>>1;if(3>c)return[];for(var d=[],e=[],g=0;c>g;g++)e.push(g);for(var g=0,h=c;h>3;){var i=e[(g+0)%h],j=e[(g+1)%h],k=e[(g+2)%h],l=a[2*i],m=a[2*i+1],n=a[2*j],o=a[2*j+1],p=a[2*k],q=a[2*k+1],r=!1;if(f.PolyK._convex(l,m,n,o,p,q,b)){r=!0;for(var s=0;h>s;s++){var t=e[s];if(t!=i&&t!=j&&t!=k&&f.PolyK._PointInTriangle(a[2*t],a[2*t+1],l,m,n,o,p,q)){r=!1;break}}}if(r)d.push(i,j,k),e.splice((g+1)%h,1),h--,g=0;else if(g++>3*h){if(!b)return console.log("PIXI Warning: shape too complex to fill"),[];var d=[];e=[];for(var g=0;c>g;g++)e.push(g);g=0,h=c,b=!1}}return d.push(e[0],e[1],e[2]),d},f.PolyK._PointInTriangle=function(a,b,c,d,e,f,g,h){var i=g-c,j=h-d,k=e-c,l=f-d,m=a-c,n=b-d,o=i*i+j*j,p=i*k+j*l,q=i*m+j*n,r=k*k+l*l,s=k*m+l*n,t=1/(o*r-p*p),u=(r*q-p*s)*t,v=(o*s-p*q)*t;return u>=0&&v>=0&&1>u+v},f.PolyK._convex=function(a,b,c,d,e,f,g){return(b-d)*(e-c)+(c-a)*(f-d)>=0==g},f.shaderFragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","gl_FragColor = gl_FragColor * vColor;","}"],f.shaderVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"],f.stripShaderFragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying float vColor;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","gl_FragColor = gl_FragColor * alpha;","}"],f.stripShaderVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","varying vec2 vTextureCoord;","varying float vColor;","void main(void) {","vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);","gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vTextureCoord = aTextureCoord;","vColor = aColor;","}"],f.primitiveShaderFragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","gl_FragColor = vColor;","}"],f.primitiveShaderVertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform float alpha;","varying vec4 vColor;","void main(void) {","vec3 v = translationMatrix * vec3(aVertexPosition, 1.0);","gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","vColor = aColor  * alpha;","}"],f.initPrimitiveShader=function(){var a=f.gl,b=f.compileProgram(f.primitiveShaderVertexSrc,f.primitiveShaderFragmentSrc);a.useProgram(b),b.vertexPositionAttribute=a.getAttribLocation(b,"aVertexPosition"),b.colorAttribute=a.getAttribLocation(b,"aColor"),b.projectionVector=a.getUniformLocation(b,"projectionVector"),b.translationMatrix=a.getUniformLocation(b,"translationMatrix"),b.alpha=a.getUniformLocation(b,"alpha"),f.primitiveProgram=b},f.initDefaultShader=function(){var a=this.gl,b=f.compileProgram(f.shaderVertexSrc,f.shaderFragmentSrc);a.useProgram(b),b.vertexPositionAttribute=a.getAttribLocation(b,"aVertexPosition"),b.projectionVector=a.getUniformLocation(b,"projectionVector"),b.textureCoordAttribute=a.getAttribLocation(b,"aTextureCoord"),b.colorAttribute=a.getAttribLocation(b,"aColor"),b.samplerUniform=a.getUniformLocation(b,"uSampler"),f.shaderProgram=b},f.initDefaultStripShader=function(){var a=this.gl,b=f.compileProgram(f.stripShaderVertexSrc,f.stripShaderFragmentSrc);a.useProgram(b),b.vertexPositionAttribute=a.getAttribLocation(b,"aVertexPosition"),b.projectionVector=a.getUniformLocation(b,"projectionVector"),b.textureCoordAttribute=a.getAttribLocation(b,"aTextureCoord"),b.translationMatrix=a.getUniformLocation(b,"translationMatrix"),b.alpha=a.getUniformLocation(b,"alpha"),b.colorAttribute=a.getAttribLocation(b,"aColor"),b.projectionVector=a.getUniformLocation(b,"projectionVector"),b.samplerUniform=a.getUniformLocation(b,"uSampler"),f.stripShaderProgram=b},f.CompileVertexShader=function(a,b){return f._CompileShader(a,b,a.VERTEX_SHADER)},f.CompileFragmentShader=function(a,b){return f._CompileShader(a,b,a.FRAGMENT_SHADER)},f._CompileShader=function(a,b,c){var d=b.join("\n"),e=a.createShader(c);return a.shaderSource(e,d),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)?e:(alert(a.getShaderInfoLog(e)),null)},f.compileProgram=function(a,b){var c=f.gl,d=f.CompileFragmentShader(c,b),e=f.CompileVertexShader(c,a),g=c.createProgram();return c.attachShader(g,e),c.attachShader(g,d),c.linkProgram(g),c.getProgramParameter(g,c.LINK_STATUS)||alert("Could not initialise shaders"),g},f.activateDefaultShader=function(){var a=f.gl,b=f.shaderProgram;a.useProgram(b),a.enableVertexAttribArray(b.vertexPositionAttribute),a.enableVertexAttribArray(b.textureCoordAttribute),a.enableVertexAttribArray(b.colorAttribute)
},f.activatePrimitiveShader=function(){var a=f.gl;a.disableVertexAttribArray(f.shaderProgram.textureCoordAttribute),a.disableVertexAttribArray(f.shaderProgram.colorAttribute),a.useProgram(f.primitiveProgram),a.enableVertexAttribArray(f.primitiveProgram.vertexPositionAttribute),a.enableVertexAttribArray(f.primitiveProgram.colorAttribute)},f.WebGLGraphics=function(){},f.WebGLGraphics.renderGraphics=function(a,b){var c=f.gl;a._webGL||(a._webGL={points:[],indices:[],lastIndex:0,buffer:c.createBuffer(),indexBuffer:c.createBuffer()}),a.dirty&&(a.dirty=!1,a.clearDirty&&(a.clearDirty=!1,a._webGL.lastIndex=0,a._webGL.points=[],a._webGL.indices=[]),f.WebGLGraphics.updateGraphics(a)),f.activatePrimitiveShader();var d=f.mat3.clone(a.worldTransform);f.mat3.transpose(d),c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA),c.uniformMatrix3fv(f.primitiveProgram.translationMatrix,!1,d),c.uniform2f(f.primitiveProgram.projectionVector,b.x,b.y),c.uniform1f(f.primitiveProgram.alpha,a.worldAlpha),c.bindBuffer(c.ARRAY_BUFFER,a._webGL.buffer),c.vertexAttribPointer(f.shaderProgram.vertexPositionAttribute,2,c.FLOAT,!1,0,0),c.vertexAttribPointer(f.primitiveProgram.vertexPositionAttribute,2,c.FLOAT,!1,24,0),c.vertexAttribPointer(f.primitiveProgram.colorAttribute,4,c.FLOAT,!1,24,8),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,a._webGL.indexBuffer),c.drawElements(c.TRIANGLE_STRIP,a._webGL.indices.length,c.UNSIGNED_SHORT,0),f.activateDefaultShader()},f.WebGLGraphics.updateGraphics=function(a){for(var b=a._webGL.lastIndex;b<a.graphicsData.length;b++){var c=a.graphicsData[b];c.type==f.Graphics.POLY?(c.fill&&c.points.length>3&&f.WebGLGraphics.buildPoly(c,a._webGL),c.lineWidth>0&&f.WebGLGraphics.buildLine(c,a._webGL)):c.type==f.Graphics.RECT?f.WebGLGraphics.buildRectangle(c,a._webGL):(c.type==f.Graphics.CIRC||c.type==f.Graphics.ELIP)&&f.WebGLGraphics.buildCircle(c,a._webGL)}a._webGL.lastIndex=a.graphicsData.length;var d=f.gl;a._webGL.glPoints=new Float32Array(a._webGL.points),d.bindBuffer(d.ARRAY_BUFFER,a._webGL.buffer),d.bufferData(d.ARRAY_BUFFER,a._webGL.glPoints,d.STATIC_DRAW),a._webGL.glIndicies=new Uint16Array(a._webGL.indices),d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,a._webGL.indexBuffer),d.bufferData(d.ELEMENT_ARRAY_BUFFER,a._webGL.glIndicies,d.STATIC_DRAW)},f.WebGLGraphics.buildRectangle=function(a,b){var c=a.points,e=c[0],g=c[1],h=c[2],i=c[3];if(a.fill){var j=d(a.fillColor),k=a.fillAlpha,l=j[0]*k,m=j[1]*k,n=j[2]*k,o=b.points,p=b.indices,q=o.length/6;o.push(e,g),o.push(l,m,n,k),o.push(e+h,g),o.push(l,m,n,k),o.push(e,g+i),o.push(l,m,n,k),o.push(e+h,g+i),o.push(l,m,n,k),p.push(q,q,q+1,q+2,q+3,q+3)}a.lineWidth&&(a.points=[e,g,e+h,g,e+h,g+i,e,g+i,e,g],f.WebGLGraphics.buildLine(a,b))},f.WebGLGraphics.buildCircle=function(a,b){var c=a.points,e=c[0],g=c[1],h=c[2],i=c[3],j=40,k=2*Math.PI/j;if(a.fill){var l=d(a.fillColor),m=a.fillAlpha,n=l[0]*m,o=l[1]*m,p=l[2]*m,q=b.points,r=b.indices,s=q.length/6;r.push(s);for(var t=0;j+1>t;t++)q.push(e,g,n,o,p,m),q.push(e+Math.sin(k*t)*h,g+Math.cos(k*t)*i,n,o,p,m),r.push(s++,s++);r.push(s-1)}if(a.lineWidth){a.points=[];for(var t=0;j+1>t;t++)a.points.push(e+Math.sin(k*t)*h,g+Math.cos(k*t)*i);f.WebGLGraphics.buildLine(a,b)}},f.WebGLGraphics.buildLine=function(a,b){var c=a.points;if(0!=c.length){var e=new f.Point(c[0],c[1]),g=new f.Point(c[c.length-2],c[c.length-1]);if(e.x==g.x&&e.y==g.y){c.pop(),c.pop(),g=new f.Point(c[c.length-2],c[c.length-1]);var h=g.x+.5*(e.x-g.x),i=g.y+.5*(e.y-g.y);c.unshift(h,i),c.push(h,i)}var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E=b.points,F=b.indices,G=c.length/2,H=c.length,I=E.length/6,J=a.lineWidth/2,K=d(a.lineColor),L=a.lineAlpha,M=K[0]*L,N=K[1]*L,O=K[2]*L;j=c[0],k=c[1],l=c[2],m=c[3],p=-(k-m),q=j-l,D=Math.sqrt(p*p+q*q),p/=D,q/=D,p*=J,q*=J,E.push(j-p,k-q,M,N,O,L),E.push(j+p,k+q,M,N,O,L);for(var P=1;G-1>P;P++)j=c[2*(P-1)],k=c[2*(P-1)+1],l=c[2*P],m=c[2*P+1],n=c[2*(P+1)],o=c[2*(P+1)+1],p=-(k-m),q=j-l,D=Math.sqrt(p*p+q*q),p/=D,q/=D,p*=J,q*=J,r=-(m-o),s=l-n,D=Math.sqrt(r*r+s*s),r/=D,s/=D,r*=J,s*=J,v=-q+k-(-q+m),w=-p+l-(-p+j),x=(-p+j)*(-q+m)-(-p+l)*(-q+k),y=-s+o-(-s+m),z=-r+l-(-r+n),A=(-r+n)*(-s+m)-(-r+l)*(-s+o),B=v*z-y*w,0==B&&(B+=1),px=(w*A-z*x)/B,py=(y*x-v*A)/B,C=(px-l)*(px-l)+(py-m)+(py-m),C>19600?(t=p-r,u=q-s,D=Math.sqrt(t*t+u*u),t/=D,u/=D,t*=J,u*=J,E.push(l-t,m-u),E.push(M,N,O,L),E.push(l+t,m+u),E.push(M,N,O,L),E.push(l-t,m-u),E.push(M,N,O,L),H++):(E.push(px,py),E.push(M,N,O,L),E.push(l-(px-l),m-(py-m)),E.push(M,N,O,L));j=c[2*(G-2)],k=c[2*(G-2)+1],l=c[2*(G-1)],m=c[2*(G-1)+1],p=-(k-m),q=j-l,D=Math.sqrt(p*p+q*q),p/=D,q/=D,p*=J,q*=J,E.push(l-p,m-q),E.push(M,N,O,L),E.push(l+p,m+q),E.push(M,N,O,L),F.push(I);for(var P=0;H>P;P++)F.push(I++);F.push(I-1)}},f.WebGLGraphics.buildPoly=function(a,b){var c=a.points;if(!(c.length<6)){for(var e=b.points,g=b.indices,h=c.length/2,i=d(a.fillColor),j=a.fillAlpha,k=i[0]*j,l=i[1]*j,m=i[2]*j,n=f.PolyK.Triangulate(c),o=e.length/6,p=0;p<n.length;p+=3)g.push(n[p]+o),g.push(n[p]+o),g.push(n[p+1]+o),g.push(n[p+2]+o),g.push(n[p+2]+o);for(var p=0;h>p;p++)e.push(c[2*p],c[2*p+1],k,l,m,j)}},f._defaultFrame=new f.Rectangle(0,0,1,1),f.gl,f.WebGLRenderer=function(a,b,c,d,e){this.transparent=!!d,this.width=a||800,this.height=b||600,this.view=c||document.createElement("canvas"),this.view.width=this.width,this.view.height=this.height;var g=this;this.view.addEventListener("webglcontextlost",function(a){g.handleContextLost(a)},!1),this.view.addEventListener("webglcontextrestored",function(a){g.handleContextRestored(a)},!1),this.batchs=[];try{f.gl=this.gl=this.view.getContext("experimental-webgl",{alpha:this.transparent,antialias:!!e,premultipliedAlpha:!1,stencil:!0})}catch(h){throw new Error(" This browser does not support webGL. Try using the canvas renderer"+this)}f.initPrimitiveShader(),f.initDefaultShader(),f.initDefaultStripShader(),f.activateDefaultShader();var i=this.gl;f.WebGLRenderer.gl=i,this.batch=new f.WebGLBatch(i),i.disable(i.DEPTH_TEST),i.disable(i.CULL_FACE),i.enable(i.BLEND),i.colorMask(!0,!0,!0,this.transparent),f.projection=new f.Point(400,300),this.resize(this.width,this.height),this.contextLost=!1,this.stageRenderGroup=new f.WebGLRenderGroup(this.gl)},f.WebGLRenderer.prototype.constructor=f.WebGLRenderer,f.WebGLRenderer.getBatch=function(){return 0==f._batchs.length?new f.WebGLBatch(f.WebGLRenderer.gl):f._batchs.pop()},f.WebGLRenderer.returnBatch=function(a){a.clean(),f._batchs.push(a)},f.WebGLRenderer.prototype.render=function(a){if(!this.contextLost){this.__stage!==a&&(this.__stage=a,this.stageRenderGroup.setRenderable(a)),f.WebGLRenderer.updateTextures(),f.visibleCount++,a.updateTransform();var b=this.gl;if(b.colorMask(!0,!0,!0,this.transparent),b.viewport(0,0,this.width,this.height),b.bindFramebuffer(b.FRAMEBUFFER,null),b.clearColor(a.backgroundColorSplit[0],a.backgroundColorSplit[1],a.backgroundColorSplit[2],!this.transparent),b.clear(b.COLOR_BUFFER_BIT),this.stageRenderGroup.backgroundColor=a.backgroundColorSplit,this.stageRenderGroup.render(f.projection),a.interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this))),f.Texture.frameUpdates.length>0){for(var c=0;c<f.Texture.frameUpdates.length;c++)f.Texture.frameUpdates[c].updateFrame=!1;f.Texture.frameUpdates=[]}}},f.WebGLRenderer.updateTextures=function(){for(var a=0;a<f.texturesToUpdate.length;a++)f.WebGLRenderer.updateTexture(f.texturesToUpdate[a]);for(var a=0;a<f.texturesToDestroy.length;a++)f.WebGLRenderer.destroyTexture(f.texturesToDestroy[a]);f.texturesToUpdate=[],f.texturesToDestroy=[]},f.WebGLRenderer.updateTexture=function(a){var b=f.gl;a._glTexture||(a._glTexture=b.createTexture()),a.hasLoaded&&(b.bindTexture(b.TEXTURE_2D,a._glTexture),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a.source),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR),a._powerOf2?(b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.REPEAT),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.REPEAT)):(b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE)),b.bindTexture(b.TEXTURE_2D,null))},f.WebGLRenderer.destroyTexture=function(a){var b=f.gl;a._glTexture&&(a._glTexture=b.createTexture(),b.deleteTexture(b.TEXTURE_2D,a._glTexture))},f.WebGLRenderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.view.width=a,this.view.height=b,this.gl.viewport(0,0,this.width,this.height),f.projection.x=this.width/2,f.projection.y=this.height/2},f.WebGLRenderer.prototype.handleContextLost=function(a){a.preventDefault(),this.contextLost=!0},f.WebGLRenderer.prototype.handleContextRestored=function(){this.gl=this.view.getContext("experimental-webgl",{alpha:!0}),this.initShaders();for(var a in f.TextureCache){var b=f.TextureCache[a].baseTexture;b._glTexture=null,f.WebGLRenderer.updateTexture(b)}for(var c=0;c<this.batchs.length;c++)this.batchs[c].restoreLostContext(this.gl),this.batchs[c].dirty=!0;f._restoreBatchs(this.gl),this.contextLost=!1},f._batchs=[],f._getBatch=function(a){return 0==f._batchs.length?new f.WebGLBatch(a):f._batchs.pop()},f._returnBatch=function(a){a.clean(),f._batchs.push(a)},f._restoreBatchs=function(a){for(var b=0;b<f._batchs.length;b++)f._batchs[b].restoreLostContext(a)},f.WebGLBatch=function(a){this.gl=a,this.size=0,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer(),this.blendMode=f.blendModes.NORMAL,this.dynamicSize=1},f.WebGLBatch.prototype.constructor=f.WebGLBatch,f.WebGLBatch.prototype.clean=function(){this.verticies=[],this.uvs=[],this.indices=[],this.colors=[],this.dynamicSize=1,this.texture=null,this.last=null,this.size=0,this.head,this.tail},f.WebGLBatch.prototype.restoreLostContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer()},f.WebGLBatch.prototype.init=function(a){a.batch=this,this.dirty=!0,this.blendMode=a.blendMode,this.texture=a.texture.baseTexture,this.head=a,this.tail=a,this.size=1,this.growBatch()},f.WebGLBatch.prototype.insertBefore=function(a,b){this.size++,a.batch=this,this.dirty=!0;var c=b.__prev;b.__prev=a,a.__next=b,c?(a.__prev=c,c.__next=a):this.head=a},f.WebGLBatch.prototype.insertAfter=function(a,b){this.size++,a.batch=this,this.dirty=!0;var c=b.__next;b.__next=a,a.__prev=b,c?(a.__next=c,c.__prev=a):this.tail=a},f.WebGLBatch.prototype.remove=function(a){return this.size--,0==this.size?(a.batch=null,a.__prev=null,a.__next=null,void 0):(a.__prev?a.__prev.__next=a.__next:(this.head=a.__next,this.head.__prev=null),a.__next?a.__next.__prev=a.__prev:(this.tail=a.__prev,this.tail.__next=null),a.batch=null,a.__next=null,a.__prev=null,this.dirty=!0,void 0)},f.WebGLBatch.prototype.split=function(a){this.dirty=!0;var b=new f.WebGLBatch(this.gl);b.init(a),b.texture=this.texture,b.tail=this.tail,this.tail=a.__prev,this.tail.__next=null,a.__prev=null;for(var c=0;a;)c++,a.batch=b,a=a.__next;return b.size=c,this.size-=c,b},f.WebGLBatch.prototype.merge=function(a){this.dirty=!0,this.tail.__next=a.head,a.head.__prev=this.tail,this.size+=a.size,this.tail=a.tail;for(var b=a.head;b;)b.batch=this,b=b.__next},f.WebGLBatch.prototype.growBatch=function(){var a=this.gl;this.dynamicSize=1==this.size?1:1.5*this.size,this.verticies=new Float32Array(8*this.dynamicSize),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.verticies,a.DYNAMIC_DRAW),this.uvs=new Float32Array(8*this.dynamicSize),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvs,a.DYNAMIC_DRAW),this.dirtyUVS=!0,this.colors=new Float32Array(4*this.dynamicSize),a.bindBuffer(a.ARRAY_BUFFER,this.colorBuffer),a.bufferData(a.ARRAY_BUFFER,this.colors,a.DYNAMIC_DRAW),this.dirtyColors=!0,this.indices=new Uint16Array(6*this.dynamicSize);for(var b=this.indices.length/6,c=0;b>c;c++){var d=6*c,e=4*c;this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3}a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW)},f.WebGLBatch.prototype.refresh=function(){this.gl,this.dynamicSize<this.size&&this.growBatch();for(var a,b=0,c=this.head;c;){a=8*b;var d=c.texture,e=d.frame,f=d.baseTexture.width,g=d.baseTexture.height;this.uvs[a+0]=e.x/f,this.uvs[a+1]=e.y/g,this.uvs[a+2]=(e.x+e.width)/f,this.uvs[a+3]=e.y/g,this.uvs[a+4]=(e.x+e.width)/f,this.uvs[a+5]=(e.y+e.height)/g,this.uvs[a+6]=e.x/f,this.uvs[a+7]=(e.y+e.height)/g,c.updateFrame=!1,colorIndex=4*b,this.colors[colorIndex]=this.colors[colorIndex+1]=this.colors[colorIndex+2]=this.colors[colorIndex+3]=c.worldAlpha,c=c.__next,b++}this.dirtyUVS=!0,this.dirtyColors=!0},f.WebGLBatch.prototype.update=function(){this.gl;for(var a,b,c,d,e,g,h,i,j,k,l,m,n,o,p,q,r=0,s=this.head;s;){if(s.vcount===f.visibleCount){if(b=s.texture.frame.width,c=s.texture.frame.height,d=s.anchor.x,e=s.anchor.y,g=b*(1-d),h=b*-d,i=c*(1-e),j=c*-e,k=8*r,a=s.worldTransform,l=a[0],m=a[3],n=a[1],o=a[4],p=a[2],q=a[5],this.verticies[k+0]=l*h+n*j+p,this.verticies[k+1]=o*j+m*h+q,this.verticies[k+2]=l*g+n*j+p,this.verticies[k+3]=o*j+m*g+q,this.verticies[k+4]=l*g+n*i+p,this.verticies[k+5]=o*i+m*g+q,this.verticies[k+6]=l*h+n*i+p,this.verticies[k+7]=o*i+m*h+q,s.updateFrame||s.texture.updateFrame){this.dirtyUVS=!0;var t=s.texture,u=t.frame,v=t.baseTexture.width,w=t.baseTexture.height;this.uvs[k+0]=u.x/v,this.uvs[k+1]=u.y/w,this.uvs[k+2]=(u.x+u.width)/v,this.uvs[k+3]=u.y/w,this.uvs[k+4]=(u.x+u.width)/v,this.uvs[k+5]=(u.y+u.height)/w,this.uvs[k+6]=u.x/v,this.uvs[k+7]=(u.y+u.height)/w,s.updateFrame=!1}if(s.cacheAlpha!=s.worldAlpha){s.cacheAlpha=s.worldAlpha;var x=4*r;this.colors[x]=this.colors[x+1]=this.colors[x+2]=this.colors[x+3]=s.worldAlpha,this.dirtyColors=!0}}else k=8*r,this.verticies[k+0]=0,this.verticies[k+1]=0,this.verticies[k+2]=0,this.verticies[k+3]=0,this.verticies[k+4]=0,this.verticies[k+5]=0,this.verticies[k+6]=0,this.verticies[k+7]=0;r++,s=s.__next}},f.WebGLBatch.prototype.render=function(a,b){if(a=a||0,void 0==b&&(b=this.size),this.dirty&&(this.refresh(),this.dirty=!1),0!=this.size){this.update();var c=this.gl,d=f.shaderProgram;c.useProgram(d),c.bindBuffer(c.ARRAY_BUFFER,this.vertexBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,this.verticies),c.vertexAttribPointer(d.vertexPositionAttribute,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this.uvBuffer),this.dirtyUVS&&(this.dirtyUVS=!1,c.bufferSubData(c.ARRAY_BUFFER,0,this.uvs)),c.vertexAttribPointer(d.textureCoordAttribute,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,this.texture._glTexture),c.bindBuffer(c.ARRAY_BUFFER,this.colorBuffer),this.dirtyColors&&(this.dirtyColors=!1,c.bufferSubData(c.ARRAY_BUFFER,0,this.colors)),c.vertexAttribPointer(d.colorAttribute,1,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var e=b-a;c.drawElements(c.TRIANGLES,6*e,c.UNSIGNED_SHORT,6*2*a)}},f.WebGLRenderGroup=function(a){this.gl=a,this.root,this.backgroundColor,this.batchs=[],this.toRemove=[]},f.WebGLRenderGroup.prototype.constructor=f.WebGLRenderGroup,f.WebGLRenderGroup.prototype.setRenderable=function(a){this.root&&this.removeDisplayObjectAndChildren(this.root),a.worldVisible=a.visible,this.root=a,this.addDisplayObjectAndChildren(a)},f.WebGLRenderGroup.prototype.render=function(a){f.WebGLRenderer.updateTextures();var b=this.gl;b.uniform2f(f.shaderProgram.projectionVector,a.x,a.y),b.blendFunc(b.ONE,b.ONE_MINUS_SRC_ALPHA);for(var c,d=0;d<this.batchs.length;d++)if(c=this.batchs[d],c instanceof f.WebGLBatch)this.batchs[d].render();else{var e=c.vcount===f.visibleCount;c instanceof f.TilingSprite?e&&this.renderTilingSprite(c,a):c instanceof f.Strip?e&&this.renderStrip(c,a):c instanceof f.Graphics?e&&c.renderable&&f.WebGLGraphics.renderGraphics(c,a):c instanceof f.FilterBlock&&(c.open?(b.enable(b.STENCIL_TEST),b.colorMask(!1,!1,!1,!1),b.stencilFunc(b.ALWAYS,1,255),b.stencilOp(b.KEEP,b.KEEP,b.REPLACE),f.WebGLGraphics.renderGraphics(c.mask,a),b.colorMask(!0,!0,!0,!1),b.stencilFunc(b.NOTEQUAL,0,255),b.stencilOp(b.KEEP,b.KEEP,b.KEEP)):b.disable(b.STENCIL_TEST))}},f.WebGLRenderGroup.prototype.handleFilter=function(){},f.WebGLRenderGroup.prototype.renderSpecific=function(a,b){f.WebGLRenderer.updateTextures();var c=this.gl;c.uniform2f(f.shaderProgram.projectionVector,b.x,b.y);for(var d,e,g,h,i=a.first;i._iNext&&(i=i._iNext,!i.renderable||!i.__renderGroup););var j=i.batch;if(i instanceof f.Sprite){j=i.batch;var k=j.head;if(k==i)d=0;else for(d=1;k.__next!=i;)d++,k=k.__next}else j=i;for(var l,m=a,n=a;n.children.length>0;)n=n.children[n.children.length-1],n.renderable&&(m=n);if(m instanceof f.Sprite){l=m.batch;var k=l.head;if(k==m)g=0;else for(g=1;k.__next!=m;)g++,k=k.__next}else l=m;if(j==l)return j instanceof f.WebGLBatch?j.render(d,g+1):this.renderSpecial(j,b),void 0;e=this.batchs.indexOf(j),h=this.batchs.indexOf(l),j instanceof f.WebGLBatch?j.render(d):this.renderSpecial(j,b);for(var o=e+1;h>o;o++)renderable=this.batchs[o],renderable instanceof f.WebGLBatch?this.batchs[o].render():this.renderSpecial(renderable,b);l instanceof f.WebGLBatch?l.render(0,g+1):this.renderSpecial(l,b)},f.WebGLRenderGroup.prototype.renderSpecial=function(a,b){var c=a.vcount===f.visibleCount;if(a instanceof f.TilingSprite)c&&this.renderTilingSprite(a,b);else if(a instanceof f.Strip)c&&this.renderStrip(a,b);else if(a instanceof f.CustomRenderable)c&&a.renderWebGL(this,b);else if(a instanceof f.Graphics)c&&a.renderable&&f.WebGLGraphics.renderGraphics(a,b);else if(a instanceof f.FilterBlock){var d=f.gl;a.open?(d.enable(d.STENCIL_TEST),d.colorMask(!1,!1,!1,!1),d.stencilFunc(d.ALWAYS,1,255),d.stencilOp(d.KEEP,d.KEEP,d.REPLACE),f.WebGLGraphics.renderGraphics(a.mask,b),d.colorMask(!0,!0,!0,!0),d.stencilFunc(d.NOTEQUAL,0,255),d.stencilOp(d.KEEP,d.KEEP,d.KEEP)):d.disable(d.STENCIL_TEST)}},f.WebGLRenderGroup.prototype.updateTexture=function(a){this.removeObject(a);for(var b=a.first;b!=this.root&&(b=b._iPrev,!b.renderable||!b.__renderGroup););for(var c=a.last;c._iNext&&(c=c._iNext,!c.renderable||!c.__renderGroup););this.insertObject(a,b,c)},f.WebGLRenderGroup.prototype.addFilterBlocks=function(a,b){a.__renderGroup=this,b.__renderGroup=this;for(var c=a;c!=this.root&&(c=c._iPrev,!c.renderable||!c.__renderGroup););this.insertAfter(a,c);for(var d=b;d!=this.root&&(d=d._iPrev,!d.renderable||!d.__renderGroup););this.insertAfter(b,d)},f.WebGLRenderGroup.prototype.removeFilterBlocks=function(a,b){this.removeObject(a),this.removeObject(b)},f.WebGLRenderGroup.prototype.addDisplayObjectAndChildren=function(a){a.__renderGroup&&a.__renderGroup.removeDisplayObjectAndChildren(a);for(var b=a.first;b!=this.root.first&&(b=b._iPrev,!b.renderable||!b.__renderGroup););for(var c=a.last;c._iNext&&(c=c._iNext,!c.renderable||!c.__renderGroup););var d=a.first,e=a.last._iNext;do d.__renderGroup=this,d.renderable&&(this.insertObject(d,b,c),b=d),d=d._iNext;while(d!=e)},f.WebGLRenderGroup.prototype.removeDisplayObjectAndChildren=function(a){if(a.__renderGroup==this){a.last;do a.__renderGroup=null,a.renderable&&this.removeObject(a),a=a._iNext;while(a)}},f.WebGLRenderGroup.prototype.insertObject=function(a,b,c){var d=b,e=c;if(a instanceof f.Sprite){var g,h;if(d instanceof f.Sprite){if(g=d.batch,g&&g.texture==a.texture.baseTexture&&g.blendMode==a.blendMode)return g.insertAfter(a,d),void 0}else g=d;if(e)if(e instanceof f.Sprite){if(h=e.batch){if(h.texture==a.texture.baseTexture&&h.blendMode==a.blendMode)return h.insertBefore(a,e),void 0;if(h==g){var i=g.split(e),j=f.WebGLRenderer.getBatch(),k=this.batchs.indexOf(g);return j.init(a),this.batchs.splice(k+1,0,j,i),void 0}}}else h=e;var j=f.WebGLRenderer.getBatch();if(j.init(a),g){var k=this.batchs.indexOf(g);this.batchs.splice(k+1,0,j)}else this.batchs.push(j)}else a instanceof f.TilingSprite?this.initTilingSprite(a):a instanceof f.Strip&&this.initStrip(a),this.insertAfter(a,d)},f.WebGLRenderGroup.prototype.insertAfter=function(a,b){if(b instanceof f.Sprite){var c=b.batch;if(c)if(c.tail==b){var d=this.batchs.indexOf(c);this.batchs.splice(d+1,0,a)}else{var e=c.split(b.__next),d=this.batchs.indexOf(c);this.batchs.splice(d+1,0,a,e)}else this.batchs.push(a)}else{var d=this.batchs.indexOf(b);this.batchs.splice(d+1,0,a)}},f.WebGLRenderGroup.prototype.removeObject=function(a){var b;if(a instanceof f.Sprite){var c=a.batch;if(!c)return;c.remove(a),0==c.size&&(b=c)}else b=a;if(b){var d=this.batchs.indexOf(b);if(-1==d)return;if(0==d||d==this.batchs.length-1)return this.batchs.splice(d,1),b instanceof f.WebGLBatch&&f.WebGLRenderer.returnBatch(b),void 0;if(this.batchs[d-1]instanceof f.WebGLBatch&&this.batchs[d+1]instanceof f.WebGLBatch&&this.batchs[d-1].texture==this.batchs[d+1].texture&&this.batchs[d-1].blendMode==this.batchs[d+1].blendMode)return this.batchs[d-1].merge(this.batchs[d+1]),b instanceof f.WebGLBatch&&f.WebGLRenderer.returnBatch(b),f.WebGLRenderer.returnBatch(this.batchs[d+1]),this.batchs.splice(d,2),void 0;this.batchs.splice(d,1),b instanceof f.WebGLBatch&&f.WebGLRenderer.returnBatch(b)}},f.WebGLRenderGroup.prototype.initTilingSprite=function(a){var b=this.gl;a.verticies=new Float32Array([0,0,a.width,0,a.width,a.height,0,a.height]),a.uvs=new Float32Array([0,0,1,0,1,1,0,1]),a.colors=new Float32Array([1,1,1,1]),a.indices=new Uint16Array([0,1,3,2]),a._vertexBuffer=b.createBuffer(),a._indexBuffer=b.createBuffer(),a._uvBuffer=b.createBuffer(),a._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,a._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,a.verticies,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._uvBuffer),b.bufferData(b.ARRAY_BUFFER,a.uvs,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._colorBuffer),b.bufferData(b.ARRAY_BUFFER,a.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,a._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,a.indices,b.STATIC_DRAW),a.texture.baseTexture._glTexture?(b.bindTexture(b.TEXTURE_2D,a.texture.baseTexture._glTexture),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.REPEAT),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.REPEAT),a.texture.baseTexture._powerOf2=!0):a.texture.baseTexture._powerOf2=!0},f.WebGLRenderGroup.prototype.renderStrip=function(a,b){var c=this.gl,d=f.shaderProgram;c.useProgram(f.stripShaderProgram);var e=f.mat3.clone(a.worldTransform);f.mat3.transpose(e),c.uniformMatrix3fv(f.stripShaderProgram.translationMatrix,!1,e),c.uniform2f(f.stripShaderProgram.projectionVector,b.x,b.y),c.uniform1f(f.stripShaderProgram.alpha,a.worldAlpha),a.dirty?(a.dirty=!1,c.bindBuffer(c.ARRAY_BUFFER,a._vertexBuffer),c.bufferData(c.ARRAY_BUFFER,a.verticies,c.STATIC_DRAW),c.vertexAttribPointer(d.vertexPositionAttribute,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,a._uvBuffer),c.bufferData(c.ARRAY_BUFFER,a.uvs,c.STATIC_DRAW),c.vertexAttribPointer(d.textureCoordAttribute,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,a.texture.baseTexture._glTexture),c.bindBuffer(c.ARRAY_BUFFER,a._colorBuffer),c.bufferData(c.ARRAY_BUFFER,a.colors,c.STATIC_DRAW),c.vertexAttribPointer(d.colorAttribute,1,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,a._indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,a.indices,c.STATIC_DRAW)):(c.bindBuffer(c.ARRAY_BUFFER,a._vertexBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,a.verticies),c.vertexAttribPointer(d.vertexPositionAttribute,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,a._uvBuffer),c.vertexAttribPointer(d.textureCoordAttribute,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,a.texture.baseTexture._glTexture),c.bindBuffer(c.ARRAY_BUFFER,a._colorBuffer),c.vertexAttribPointer(d.colorAttribute,1,c.FLOAT,!1,0,0),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,a._indexBuffer)),c.drawElements(c.TRIANGLE_STRIP,a.indices.length,c.UNSIGNED_SHORT,0),c.useProgram(f.shaderProgram)},f.WebGLRenderGroup.prototype.renderTilingSprite=function(a,b){var c=this.gl;f.shaderProgram;var d=a.tilePosition,e=a.tileScale,g=d.x/a.texture.baseTexture.width,h=d.y/a.texture.baseTexture.height,i=a.width/a.texture.baseTexture.width/e.x,j=a.height/a.texture.baseTexture.height/e.y;a.uvs[0]=0-g,a.uvs[1]=0-h,a.uvs[2]=1*i-g,a.uvs[3]=0-h,a.uvs[4]=1*i-g,a.uvs[5]=1*j-h,a.uvs[6]=0-g,a.uvs[7]=1*j-h,c.bindBuffer(c.ARRAY_BUFFER,a._uvBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,a.uvs),this.renderStrip(a,b)},f.WebGLRenderGroup.prototype.initStrip=function(a){var b=this.gl;this.shaderProgram,a._vertexBuffer=b.createBuffer(),a._indexBuffer=b.createBuffer(),a._uvBuffer=b.createBuffer(),a._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,a._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,a.verticies,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._uvBuffer),b.bufferData(b.ARRAY_BUFFER,a.uvs,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,a._colorBuffer),b.bufferData(b.ARRAY_BUFFER,a.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,a._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,a.indices,b.STATIC_DRAW)},f.CanvasRenderer=function(a,b,c,d){this.transparent=d,this.width=a||800,this.height=b||600,this.view=c||document.createElement("canvas"),this.context=this.view.getContext("2d"),this.refresh=!0,this.view.width=this.width,this.view.height=this.height,this.count=0},f.CanvasRenderer.prototype.constructor=f.CanvasRenderer,f.CanvasRenderer.prototype.render=function(a){f.texturesToUpdate=[],f.texturesToDestroy=[],f.visibleCount++,a.updateTransform(),this.view.style.backgroundColor==a.backgroundColorString||this.transparent||(this.view.style.backgroundColor=a.backgroundColorString),this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height),this.renderDisplayObject(a),a.interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this))),f.Texture.frameUpdates.length>0&&(f.Texture.frameUpdates=[])},f.CanvasRenderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.view.width=a,this.view.height=b},f.CanvasRenderer.prototype.renderDisplayObject=function(a){var b,c=this.context;c.globalCompositeOperation="source-over";var d=a.last._iNext;a=a.first;do if(b=a.worldTransform,a.visible)if(a.renderable){if(a instanceof f.Sprite){var e=a.texture.frame;e&&(c.globalAlpha=a.worldAlpha,c.setTransform(b[0],b[3],b[1],b[4],b[2],b[5]),c.drawImage(a.texture.baseTexture.source,e.x,e.y,e.width,e.height,a.anchor.x*-e.width,a.anchor.y*-e.height,e.width,e.height))}else if(a instanceof f.Strip)c.setTransform(b[0],b[3],b[1],b[4],b[2],b[5]),this.renderStrip(a);else if(a instanceof f.TilingSprite)c.setTransform(b[0],b[3],b[1],b[4],b[2],b[5]),this.renderTilingSprite(a);else if(a instanceof f.CustomRenderable)a.renderCanvas(this);else if(a instanceof f.Graphics)c.setTransform(b[0],b[3],b[1],b[4],b[2],b[5]),f.CanvasGraphics.renderGraphics(a,c);else if(a instanceof f.FilterBlock)if(a.open){c.save();var g=a.mask.alpha,h=a.mask.worldTransform;c.setTransform(h[0],h[3],h[1],h[4],h[2],h[5]),a.mask.worldAlpha=.5,c.worldAlpha=0,f.CanvasGraphics.renderGraphicsMask(a.mask,c),c.clip(),a.mask.worldAlpha=g}else c.restore();a=a._iNext}else a=a._iNext;else a=a.last._iNext;while(a!=d)},f.CanvasRenderer.prototype.renderStripFlat=function(a){var b=this.context,c=a.verticies;a.uvs;var d=c.length/2;this.count++,b.beginPath();for(var e=1;d-2>e;e++){var f=2*e,g=c[f],h=c[f+2],i=c[f+4],j=c[f+1],k=c[f+3],l=c[f+5];b.moveTo(g,j),b.lineTo(h,k),b.lineTo(i,l)}b.fillStyle="#FF0000",b.fill(),b.closePath()},f.CanvasRenderer.prototype.renderTilingSprite=function(a){var b=this.context;b.globalAlpha=a.worldAlpha,a.__tilePattern||(a.__tilePattern=b.createPattern(a.texture.baseTexture.source,"repeat")),b.beginPath();var c=a.tilePosition,d=a.tileScale;b.scale(d.x,d.y),b.translate(c.x,c.y),b.fillStyle=a.__tilePattern,b.fillRect(-c.x,-c.y,a.width/d.x,a.height/d.y),b.scale(1/d.x,1/d.y),b.translate(-c.x,-c.y),b.closePath()},f.CanvasRenderer.prototype.renderStrip=function(a){var b=this.context,c=a.verticies,d=a.uvs,e=c.length/2;this.count++;for(var f=1;e-2>f;f++){var g=2*f,h=c[g],i=c[g+2],j=c[g+4],k=c[g+1],l=c[g+3],m=c[g+5],n=d[g]*a.texture.width,o=d[g+2]*a.texture.width,p=d[g+4]*a.texture.width,q=d[g+1]*a.texture.height,r=d[g+3]*a.texture.height,s=d[g+5]*a.texture.height;b.save(),b.beginPath(),b.moveTo(h,k),b.lineTo(i,l),b.lineTo(j,m),b.closePath(),b.clip();var t=n*r+q*p+o*s-r*p-q*o-n*s,u=h*r+q*j+i*s-r*j-q*i-h*s,v=n*i+h*p+o*j-i*p-h*o-n*j,w=n*r*j+q*i*p+h*o*s-h*r*p-q*o*j-n*i*s,x=k*r+q*m+l*s-r*m-q*l-k*s,y=n*l+k*p+o*m-l*p-k*o-n*m,z=n*r*m+q*l*p+k*o*s-k*r*p-q*o*m-n*l*s;b.transform(u/t,x/t,v/t,y/t,w/t,z/t),b.drawImage(a.texture.baseTexture.source,0,0),b.restore()}},f.CanvasGraphics=function(){},f.CanvasGraphics.renderGraphics=function(a,b){for(var c=a.worldAlpha,d=0;d<a.graphicsData.length;d++){var e=a.graphicsData[d],g=e.points;if(b.strokeStyle=color="#"+("00000"+(0|e.lineColor).toString(16)).substr(-6),b.lineWidth=e.lineWidth,e.type==f.Graphics.POLY){b.beginPath(),b.moveTo(g[0],g[1]);for(var h=1;h<g.length/2;h++)b.lineTo(g[2*h],g[2*h+1]);g[0]==g[g.length-2]&&g[1]==g[g.length-1]&&b.closePath(),e.fill&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle=color="#"+("00000"+(0|e.fillColor).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.stroke())}else if(e.type==f.Graphics.RECT)void 0!=e.fillColor&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle=color="#"+("00000"+(0|e.fillColor).toString(16)).substr(-6),b.fillRect(g[0],g[1],g[2],g[3])),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.strokeRect(g[0],g[1],g[2],g[3]));else if(e.type==f.Graphics.CIRC)b.beginPath(),b.arc(g[0],g[1],g[2],0,2*Math.PI),b.closePath(),e.fill&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle=color="#"+("00000"+(0|e.fillColor).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.stroke());else if(e.type==f.Graphics.ELIP){var i=e.points,j=2*i[2],k=2*i[3],l=i[0]-j/2,m=i[1]-k/2;b.beginPath();var n=.5522848,o=j/2*n,p=k/2*n,q=l+j,r=m+k,s=l+j/2,t=m+k/2;b.moveTo(l,t),b.bezierCurveTo(l,t-p,s-o,m,s,m),b.bezierCurveTo(s+o,m,q,t-p,q,t),b.bezierCurveTo(q,t+p,s+o,r,s,r),b.bezierCurveTo(s-o,r,l,t+p,l,t),b.closePath(),e.fill&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle=color="#"+("00000"+(0|e.fillColor).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.stroke())}}},f.CanvasGraphics.renderGraphicsMask=function(a,b){a.worldAlpha;var c=a.graphicsData.length;c>1&&(c=1,console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));for(var d=0;1>d;d++){var e=a.graphicsData[d],g=e.points;if(e.type==f.Graphics.POLY){b.beginPath(),b.moveTo(g[0],g[1]);for(var h=1;h<g.length/2;h++)b.lineTo(g[2*h],g[2*h+1]);g[0]==g[g.length-2]&&g[1]==g[g.length-1]&&b.closePath()}else if(e.type==f.Graphics.RECT)b.beginPath(),b.rect(g[0],g[1],g[2],g[3]),b.closePath();else if(e.type==f.Graphics.CIRC)b.beginPath(),b.arc(g[0],g[1],g[2],0,2*Math.PI),b.closePath();else if(e.type==f.Graphics.ELIP){var i=e.points,j=2*i[2],k=2*i[3],l=i[0]-j/2,m=i[1]-k/2;b.beginPath();var n=.5522848,o=j/2*n,p=k/2*n,q=l+j,r=m+k,s=l+j/2,t=m+k/2;b.moveTo(l,t),b.bezierCurveTo(l,t-p,s-o,m,s,m),b.bezierCurveTo(s+o,m,q,t-p,q,t),b.bezierCurveTo(q,t+p,s+o,r,s,r),b.bezierCurveTo(s-o,r,l,t+p,l,t),b.closePath()}}},f.Graphics=function(){f.DisplayObjectContainer.call(this),this.renderable=!0,this.fillAlpha=1,this.lineWidth=0,this.lineColor="black",this.graphicsData=[],this.currentPath={points:[]}},f.Graphics.prototype=Object.create(f.DisplayObjectContainer.prototype),f.Graphics.prototype.constructor=f.Graphics,f.Graphics.prototype.lineStyle=function(a,b,c){0==this.currentPath.points.length&&this.graphicsData.pop(),this.lineWidth=a||0,this.lineColor=b||0,this.lineAlpha=void 0==c?1:c,this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:f.Graphics.POLY},this.graphicsData.push(this.currentPath)},f.Graphics.prototype.moveTo=function(a,b){0==this.currentPath.points.length&&this.graphicsData.pop(),this.currentPath=this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:f.Graphics.POLY},this.currentPath.points.push(a,b),this.graphicsData.push(this.currentPath)
},f.Graphics.prototype.lineTo=function(a,b){this.currentPath.points.push(a,b),this.dirty=!0},f.Graphics.prototype.beginFill=function(a,b){this.filling=!0,this.fillColor=a||0,this.fillAlpha=void 0==b?1:b},f.Graphics.prototype.endFill=function(){this.filling=!1,this.fillColor=null,this.fillAlpha=1},f.Graphics.prototype.drawRect=function(a,b,c,d){0==this.currentPath.points.length&&this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,b,c,d],type:f.Graphics.RECT},this.graphicsData.push(this.currentPath),this.dirty=!0},f.Graphics.prototype.drawCircle=function(a,b,c){0==this.currentPath.points.length&&this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,b,c,c],type:f.Graphics.CIRC},this.graphicsData.push(this.currentPath),this.dirty=!0},f.Graphics.prototype.drawElipse=function(a,b,c,d){0==this.currentPath.points.length&&this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,b,c,d],type:f.Graphics.ELIP},this.graphicsData.push(this.currentPath),this.dirty=!0},f.Graphics.prototype.clear=function(){this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[]},f.Graphics.POLY=0,f.Graphics.RECT=1,f.Graphics.CIRC=2,f.Graphics.ELIP=3,f.Strip=function(a,b,c){f.DisplayObjectContainer.call(this),this.texture=a,this.blendMode=f.blendModes.NORMAL;try{this.uvs=new Float32Array([0,1,1,1,1,0,0,1]),this.verticies=new Float32Array([0,0,0,0,0,0,0,0,0]),this.colors=new Float32Array([1,1,1,1]),this.indices=new Uint16Array([0,1,2,3])}catch(d){this.uvs=[0,1,1,1,1,0,0,1],this.verticies=[0,0,0,0,0,0,0,0,0],this.colors=[1,1,1,1],this.indices=[0,1,2,3]}this.width=b,this.height=c,a.baseTexture.hasLoaded?(this.width=this.texture.frame.width,this.height=this.texture.frame.height,this.updateFrame=!0):(this.onTextureUpdateBind=this.onTextureUpdate.bind(this),this.texture.addEventListener("update",this.onTextureUpdateBind)),this.renderable=!0},f.Strip.prototype=Object.create(f.DisplayObjectContainer.prototype),f.Strip.prototype.constructor=f.Strip,f.Strip.prototype.setTexture=function(a){this.texture=a,this.width=a.frame.width,this.height=a.frame.height,this.updateFrame=!0},f.Strip.prototype.onTextureUpdate=function(){this.updateFrame=!0},f.Rope=function(a,b){f.Strip.call(this,a),this.points=b;try{this.verticies=new Float32Array(4*b.length),this.uvs=new Float32Array(4*b.length),this.colors=new Float32Array(2*b.length),this.indices=new Uint16Array(2*b.length)}catch(c){this.verticies=verticies,this.uvs=uvs,this.colors=colors,this.indices=indices}this.refresh()},f.Rope.prototype=Object.create(f.Strip.prototype),f.Rope.prototype.constructor=f.Rope,f.Rope.prototype.refresh=function(){var a=this.points;if(!(a.length<1)){var b=this.uvs,c=this.indices,d=this.colors,e=a[0],f=a[0];this.count-=.2,b[0]=0,b[1]=1,b[2]=0,b[3]=1,d[0]=1,d[1]=1,c[0]=0,c[1]=1;for(var g=a.length,h=1;g>h;h++){var f=a[h],i=4*h,j=h/(g-1);h%2?(b[i]=j,b[i+1]=0,b[i+2]=j,b[i+3]=1):(b[i]=j,b[i+1]=0,b[i+2]=j,b[i+3]=1),i=2*h,d[i]=1,d[i+1]=1,i=2*h,c[i]=i,c[i+1]=i+1,e=f}}},f.Rope.prototype.updateTransform=function(){var a=this.points;if(!(a.length<1)){var b,c=this.verticies,d=a[0],e={x:0,y:0},g=a[0];this.count-=.2,c[0]=g.x+e.x,c[1]=g.y+e.y,c[2]=g.x-e.x,c[3]=g.y-e.y;for(var h=a.length,i=1;h>i;i++){var g=a[i],j=4*i;b=i<a.length-1?a[i+1]:g,e.y=-(b.x-d.x),e.x=b.y-d.y;var k=10*(1-i/(h-1));k>1&&(k=1);var l=Math.sqrt(e.x*e.x+e.y*e.y),m=this.texture.height/2;e.x/=l,e.y/=l,e.x*=m,e.y*=m,c[j]=g.x+e.x,c[j+1]=g.y+e.y,c[j+2]=g.x-e.x,c[j+3]=g.y-e.y,d=g}f.DisplayObjectContainer.prototype.updateTransform.call(this)}},f.Rope.prototype.setTexture=function(a){this.texture=a,this.updateFrame=!0},f.TilingSprite=function(a,b,c){f.DisplayObjectContainer.call(this),this.texture=a,this.width=b,this.height=c,this.tileScale=new f.Point(1,1),this.tilePosition=new f.Point(0,0),this.renderable=!0,this.blendMode=f.blendModes.NORMAL},f.TilingSprite.prototype=Object.create(f.DisplayObjectContainer.prototype),f.TilingSprite.prototype.constructor=f.TilingSprite,f.TilingSprite.prototype.setTexture=function(a){this.texture=a,this.updateFrame=!0},f.TilingSprite.prototype.onTextureUpdate=function(){this.updateFrame=!0},f.Spine=function(a){if(f.DisplayObjectContainer.call(this),this.spineData=f.AnimCache[a],!this.spineData)throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: "+a);this.skeleton=new l.Skeleton(this.spineData),this.skeleton.updateWorldTransform(),this.stateData=new l.AnimationStateData(this.spineData),this.state=new l.AnimationState(this.stateData),this.slotContainers=[];for(var b=0,c=this.skeleton.drawOrder.length;c>b;b++){var d=this.skeleton.drawOrder[b],e=d.attachment,g=new f.DisplayObjectContainer;if(this.slotContainers.push(g),this.addChild(g),e instanceof l.RegionAttachment){var h=e.rendererObject.name,i=this.createSprite(d,e.rendererObject);d.currentSprite=i,d.currentSpriteName=h,g.addChild(i)}}},f.Spine.prototype=Object.create(f.DisplayObjectContainer.prototype),f.Spine.prototype.constructor=f.Spine,f.Spine.prototype.updateTransform=function(){this.lastTime=this.lastTime||Date.now();var a=.001*(Date.now()-this.lastTime);this.lastTime=Date.now(),this.state.update(a),this.state.apply(this.skeleton),this.skeleton.updateWorldTransform();for(var b=this.skeleton.drawOrder,c=0,d=b.length;d>c;c++){var e=b[c],g=e.attachment,h=this.slotContainers[c];if(g instanceof l.RegionAttachment){if(g.rendererObject&&(!e.currentSpriteName||e.currentSpriteName!=g.name)){var i=g.rendererObject.name;if(void 0!==e.currentSprite&&(e.currentSprite.visible=!1),e.sprites=e.sprites||{},void 0!==e.sprites[i])e.sprites[i].visible=!0;else{var j=this.createSprite(e,g.rendererObject);h.addChild(j)}e.currentSprite=e.sprites[i],e.currentSpriteName=i}h.visible=!0;var k=e.bone;h.position.x=k.worldX+g.x*k.m00+g.y*k.m01,h.position.y=k.worldY+g.x*k.m10+g.y*k.m11,h.scale.x=k.worldScaleX,h.scale.y=k.worldScaleY,h.rotation=-(e.bone.worldRotation*Math.PI/180)}else h.visible=!1}f.DisplayObjectContainer.prototype.updateTransform.call(this)},f.Spine.prototype.createSprite=function(a,b){var c=f.TextureCache[b.name]?b.name:b.name+".png",d=new f.Sprite(f.Texture.fromFrame(c));return d.scale=b.scale,d.rotation=b.rotation,d.anchor.x=d.anchor.y=.5,a.sprites=a.sprites||{},a.sprites[b.name]=d,d};var l={};l.BoneData=function(a,b){this.name=a,this.parent=b},l.BoneData.prototype={length:0,x:0,y:0,rotation:0,scaleX:1,scaleY:1},l.SlotData=function(a,b){this.name=a,this.boneData=b},l.SlotData.prototype={r:1,g:1,b:1,a:1,attachmentName:null},l.Bone=function(a,b){this.data=a,this.parent=b,this.setToSetupPose()},l.Bone.yDown=!1,l.Bone.prototype={x:0,y:0,rotation:0,scaleX:1,scaleY:1,m00:0,m01:0,worldX:0,m10:0,m11:0,worldY:0,worldRotation:0,worldScaleX:1,worldScaleY:1,updateWorldTransform:function(a,b){var c=this.parent;null!=c?(this.worldX=this.x*c.m00+this.y*c.m01+c.worldX,this.worldY=this.x*c.m10+this.y*c.m11+c.worldY,this.worldScaleX=c.worldScaleX*this.scaleX,this.worldScaleY=c.worldScaleY*this.scaleY,this.worldRotation=c.worldRotation+this.rotation):(this.worldX=this.x,this.worldY=this.y,this.worldScaleX=this.scaleX,this.worldScaleY=this.scaleY,this.worldRotation=this.rotation);var d=this.worldRotation*Math.PI/180,e=Math.cos(d),f=Math.sin(d);this.m00=e*this.worldScaleX,this.m10=f*this.worldScaleX,this.m01=-f*this.worldScaleY,this.m11=e*this.worldScaleY,a&&(this.m00=-this.m00,this.m01=-this.m01),b&&(this.m10=-this.m10,this.m11=-this.m11),l.Bone.yDown&&(this.m10=-this.m10,this.m11=-this.m11)},setToSetupPose:function(){var a=this.data;this.x=a.x,this.y=a.y,this.rotation=a.rotation,this.scaleX=a.scaleX,this.scaleY=a.scaleY}},l.Slot=function(a,b,c){this.data=a,this.skeleton=b,this.bone=c,this.setToSetupPose()},l.Slot.prototype={r:1,g:1,b:1,a:1,_attachmentTime:0,attachment:null,setAttachment:function(a){this.attachment=a,this._attachmentTime=this.skeleton.time},setAttachmentTime:function(a){this._attachmentTime=this.skeleton.time-a},getAttachmentTime:function(){return this.skeleton.time-this._attachmentTime},setToSetupPose:function(){var a=this.data;this.r=a.r,this.g=a.g,this.b=a.b,this.a=a.a;for(var b=this.skeleton.data.slots,c=0,d=b.length;d>c;c++)if(b[c]==a){this.setAttachment(a.attachmentName?this.skeleton.getAttachmentBySlotIndex(c,a.attachmentName):null);break}}},l.Skin=function(a){this.name=a,this.attachments={}},l.Skin.prototype={addAttachment:function(a,b,c){this.attachments[a+":"+b]=c},getAttachment:function(a,b){return this.attachments[a+":"+b]},_attachAll:function(a,b){for(var c in b.attachments){var d=c.indexOf(":"),e=parseInt(c.substring(0,d)),f=c.substring(d+1),g=a.slots[e];if(g.attachment&&g.attachment.name==f){var h=this.getAttachment(e,f);h&&g.setAttachment(h)}}}},l.Animation=function(a,b,c){this.name=a,this.timelines=b,this.duration=c},l.Animation.prototype={apply:function(a,b,c){c&&0!=this.duration&&(b%=this.duration);for(var d=this.timelines,e=0,f=d.length;f>e;e++)d[e].apply(a,b,1)},mix:function(a,b,c,d){c&&0!=this.duration&&(b%=this.duration);for(var e=this.timelines,f=0,g=e.length;g>f;f++)e[f].apply(a,b,d)}},l.binarySearch=function(a,b,c){var d=0,e=Math.floor(a.length/c)-2;if(0==e)return c;for(var f=e>>>1;;){if(a[(f+1)*c]<=b?d=f+1:e=f,d==e)return(d+1)*c;f=d+e>>>1}},l.linearSearch=function(a,b,c){for(var d=0,e=a.length-c;e>=d;d+=c)if(a[d]>b)return d;return-1},l.Curves=function(a){this.curves=[],this.curves.length=6*(a-1)},l.Curves.prototype={setLinear:function(a){this.curves[6*a]=0},setStepped:function(a){this.curves[6*a]=-1},setCurve:function(a,b,c,d,e){var f=.1,g=f*f,h=g*f,i=3*f,j=3*g,k=6*g,l=6*h,m=2*-b+d,n=2*-c+e,o=3*(b-d)+1,p=3*(c-e)+1,q=6*a,r=this.curves;r[q]=b*i+m*j+o*h,r[q+1]=c*i+n*j+p*h,r[q+2]=m*k+o*l,r[q+3]=n*k+p*l,r[q+4]=o*l,r[q+5]=p*l},getCurvePercent:function(a,b){b=0>b?0:b>1?1:b;var c=6*a,d=this.curves,e=d[c];if(!e)return b;if(-1==e)return 0;for(var f=d[c+1],g=d[c+2],h=d[c+3],i=d[c+4],j=d[c+5],k=e,l=f,m=8;;){if(k>=b){var n=k-e,o=l-f;return o+(l-o)*(b-n)/(k-n)}if(0==m)break;m--,e+=g,f+=h,g+=i,h+=j,k+=e,l+=f}return l+(1-l)*(b-k)/(1-k)}},l.RotateTimeline=function(a){this.curves=new l.Curves(a),this.frames=[],this.frames.length=2*a},l.RotateTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/2},setFrame:function(a,b,c){a*=2,this.frames[a]=b,this.frames[a+1]=c},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.bones[this.boneIndex];if(b>=d[d.length-2]){for(var f=e.data.rotation+d[d.length-1]-e.rotation;f>180;)f-=360;for(;-180>f;)f+=360;return e.rotation+=f*c,void 0}var g=l.binarySearch(d,b,2),h=d[g-1],i=d[g],j=1-(b-i)/(d[g-2]-i);j=this.curves.getCurvePercent(g/2-1,j);for(var f=d[g+1]-h;f>180;)f-=360;for(;-180>f;)f+=360;for(f=e.data.rotation+(h+f*j)-e.rotation;f>180;)f-=360;for(;-180>f;)f+=360;e.rotation+=f*c}}},l.TranslateTimeline=function(a){this.curves=new l.Curves(a),this.frames=[],this.frames.length=3*a},l.TranslateTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.bones[this.boneIndex];if(b>=d[d.length-3])return e.x+=(e.data.x+d[d.length-2]-e.x)*c,e.y+=(e.data.y+d[d.length-1]-e.y)*c,void 0;var f=l.binarySearch(d,b,3),g=d[f-2],h=d[f-1],i=d[f],j=1-(b-i)/(d[f+-3]-i);j=this.curves.getCurvePercent(f/3-1,j),e.x+=(e.data.x+g+(d[f+1]-g)*j-e.x)*c,e.y+=(e.data.y+h+(d[f+2]-h)*j-e.y)*c}}},l.ScaleTimeline=function(a){this.curves=new l.Curves(a),this.frames=[],this.frames.length=3*a},l.ScaleTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.bones[this.boneIndex];if(b>=d[d.length-3])return e.scaleX+=(e.data.scaleX-1+d[d.length-2]-e.scaleX)*c,e.scaleY+=(e.data.scaleY-1+d[d.length-1]-e.scaleY)*c,void 0;var f=l.binarySearch(d,b,3),g=d[f-2],h=d[f-1],i=d[f],j=1-(b-i)/(d[f+-3]-i);j=this.curves.getCurvePercent(f/3-1,j),e.scaleX+=(e.data.scaleX-1+g+(d[f+1]-g)*j-e.scaleX)*c,e.scaleY+=(e.data.scaleY-1+h+(d[f+2]-h)*j-e.scaleY)*c}}},l.ColorTimeline=function(a){this.curves=new l.Curves(a),this.frames=[],this.frames.length=5*a},l.ColorTimeline.prototype={slotIndex:0,getFrameCount:function(){return this.frames.length/2},setFrame:function(c,d){c*=5,this.frames[c]=d,this.frames[c+1]=r,this.frames[c+2]=g,this.frames[c+3]=b,this.frames[c+4]=a},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.slots[this.slotIndex];if(b>=d[d.length-5]){var f=d.length-1;return e.r=d[f-3],e.g=d[f-2],e.b=d[f-1],e.a=d[f],void 0}var g=l.binarySearch(d,b,5),h=d[g-4],i=d[g-3],j=d[g-2],k=d[g-1],m=d[g],n=1-(b-m)/(d[g-5]-m);n=this.curves.getCurvePercent(g/5-1,n);var o=h+(d[g+1]-h)*n,p=i+(d[g+2]-i)*n,q=j+(d[g+3]-j)*n,r=k+(d[g+4]-k)*n;1>c?(e.r+=(o-e.r)*c,e.g+=(p-e.g)*c,e.b+=(q-e.b)*c,e.a+=(r-e.a)*c):(e.r=o,e.g=p,e.b=q,e.a=r)}}},l.AttachmentTimeline=function(a){this.curves=new l.Curves(a),this.frames=[],this.frames.length=a,this.attachmentNames=[],this.attachmentNames.length=a},l.AttachmentTimeline.prototype={slotIndex:0,getFrameCount:function(){return this.frames.length},setFrame:function(a,b,c){this.frames[a]=b,this.attachmentNames[a]=c},apply:function(a,b){var c=this.frames;if(!(b<c[0])){var d;d=b>=c[c.length-1]?c.length-1:l.binarySearch(c,b,1)-1;var e=this.attachmentNames[d];a.slots[this.slotIndex].setAttachment(e?a.getAttachmentBySlotIndex(this.slotIndex,e):null)}}},l.SkeletonData=function(){this.bones=[],this.slots=[],this.skins=[],this.animations=[]},l.SkeletonData.prototype={defaultSkin:null,findBone:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findBoneIndex:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].name==a)return c;return-1},findSlot:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].name==a)return slot[c];return null},findSlotIndex:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].name==a)return c;return-1},findSkin:function(a){for(var b=this.skins,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findAnimation:function(a){for(var b=this.animations,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null}},l.Skeleton=function(a){this.data=a,this.bones=[];for(var b=0,c=a.bones.length;c>b;b++){var d=a.bones[b],e=d.parent?this.bones[a.bones.indexOf(d.parent)]:null;this.bones.push(new l.Bone(d,e))}this.slots=[],this.drawOrder=[];for(var b=0,c=a.slots.length;c>b;b++){var f=a.slots[b],g=this.bones[a.bones.indexOf(f.boneData)],h=new l.Slot(f,this,g);this.slots.push(h),this.drawOrder.push(h)}},l.Skeleton.prototype={x:0,y:0,skin:null,r:1,g:1,b:1,a:1,time:0,flipX:!1,flipY:!1,updateWorldTransform:function(){for(var a=this.flipX,b=this.flipY,c=this.bones,d=0,e=c.length;e>d;d++)c[d].updateWorldTransform(a,b)},setToSetupPose:function(){this.setBonesToSetupPose(),this.setSlotsToSetupPose()},setBonesToSetupPose:function(){for(var a=this.bones,b=0,c=a.length;c>b;b++)a[b].setToSetupPose()},setSlotsToSetupPose:function(){for(var a=this.slots,b=0,c=a.length;c>b;b++)a[b].setToSetupPose(b)},getRootBone:function(){return 0==this.bones.length?null:this.bones[0]},findBone:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},findBoneIndex:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return c;return-1},findSlot:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},findSlotIndex:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return c;return-1},setSkinByName:function(a){var b=this.data.findSkin(a);if(!b)throw"Skin not found: "+a;this.setSkin(b)},setSkin:function(a){this.skin&&a&&a._attachAll(this,this.skin),this.skin=a},getAttachmentBySlotName:function(a,b){return this.getAttachmentBySlotIndex(this.data.findSlotIndex(a),b)},getAttachmentBySlotIndex:function(a,b){if(this.skin){var c=this.skin.getAttachment(a,b);if(c)return c}return this.data.defaultSkin?this.data.defaultSkin.getAttachment(a,b):null},setAttachment:function(a,b){for(var c=this.slots,d=0,e=c.size;e>d;d++){var f=c[d];if(f.data.name==a){var g=null;if(b&&(g=this.getAttachment(d,b),null==g))throw"Attachment not found: "+b+", for slot: "+a;return f.setAttachment(g),void 0}}throw"Slot not found: "+a},update:function(a){time+=a}},l.AttachmentType={region:0},l.RegionAttachment=function(){this.offset=[],this.offset.length=8,this.uvs=[],this.uvs.length=8},l.RegionAttachment.prototype={x:0,y:0,rotation:0,scaleX:1,scaleY:1,width:0,height:0,rendererObject:null,regionOffsetX:0,regionOffsetY:0,regionWidth:0,regionHeight:0,regionOriginalWidth:0,regionOriginalHeight:0,setUVs:function(a,b,c,d,e){var f=this.uvs;e?(f[2]=a,f[3]=d,f[4]=a,f[5]=b,f[6]=c,f[7]=b,f[0]=c,f[1]=d):(f[0]=a,f[1]=d,f[2]=a,f[3]=b,f[4]=c,f[5]=b,f[6]=c,f[7]=d)},updateOffset:function(){var a=this.width/this.regionOriginalWidth*this.scaleX,b=this.height/this.regionOriginalHeight*this.scaleY,c=-this.width/2*this.scaleX+this.regionOffsetX*a,d=-this.height/2*this.scaleY+this.regionOffsetY*b,e=c+this.regionWidth*a,f=d+this.regionHeight*b,g=this.rotation*Math.PI/180,h=Math.cos(g),i=Math.sin(g),j=c*h+this.x,k=c*i,l=d*h+this.y,m=d*i,n=e*h+this.x,o=e*i,p=f*h+this.y,q=f*i,r=this.offset;r[0]=j-m,r[1]=l+k,r[2]=j-q,r[3]=p+k,r[4]=n-q,r[5]=p+o,r[6]=n-m,r[7]=l+o},computeVertices:function(a,b,c,d){a+=c.worldX,b+=c.worldY;var e=c.m00,f=c.m01,g=c.m10,h=c.m11,i=this.offset;d[0]=i[0]*e+i[1]*f+a,d[1]=i[0]*g+i[1]*h+b,d[2]=i[2]*e+i[3]*f+a,d[3]=i[2]*g+i[3]*h+b,d[4]=i[4]*e+i[5]*f+a,d[5]=i[4]*g+i[5]*h+b,d[6]=i[6]*e+i[7]*f+a,d[7]=i[6]*g+i[7]*h+b}},l.AnimationStateData=function(a){this.skeletonData=a,this.animationToMixTime={}},l.AnimationStateData.prototype={defaultMix:0,setMixByName:function(a,b,c){var d=this.skeletonData.findAnimation(a);if(!d)throw"Animation not found: "+a;var e=this.skeletonData.findAnimation(b);if(!e)throw"Animation not found: "+b;this.setMix(d,e,c)},setMix:function(a,b,c){this.animationToMixTime[a.name+":"+b.name]=c},getMix:function(a,b){var c=this.animationToMixTime[a.name+":"+b.name];return c?c:this.defaultMix}},l.AnimationState=function(a){this.data=a,this.queue=[]},l.AnimationState.prototype={current:null,previous:null,currentTime:0,previousTime:0,currentLoop:!1,previousLoop:!1,mixTime:0,mixDuration:0,update:function(a){if(this.currentTime+=a,this.previousTime+=a,this.mixTime+=a,this.queue.length>0){var b=this.queue[0];this.currentTime>=b.delay&&(this._setAnimation(b.animation,b.loop),this.queue.shift())}},apply:function(a){if(this.current)if(this.previous){this.previous.apply(a,this.previousTime,this.previousLoop);var b=this.mixTime/this.mixDuration;b>=1&&(b=1,this.previous=null),this.current.mix(a,this.currentTime,this.currentLoop,b)}else this.current.apply(a,this.currentTime,this.currentLoop)},clearAnimation:function(){this.previous=null,this.current=null,this.queue.length=0},_setAnimation:function(a,b){this.previous=null,a&&this.current&&(this.mixDuration=this.data.getMix(this.current,a),this.mixDuration>0&&(this.mixTime=0,this.previous=this.current,this.previousTime=this.currentTime,this.previousLoop=this.currentLoop)),this.current=a,this.currentLoop=b,this.currentTime=0},setAnimationByName:function(a,b){var c=this.data.skeletonData.findAnimation(a);if(!c)throw"Animation not found: "+a;this.setAnimation(c,b)},setAnimation:function(a,b){this.queue.length=0,this._setAnimation(a,b)},addAnimationByName:function(a,b,c){var d=this.data.skeletonData.findAnimation(a);if(!d)throw"Animation not found: "+a;this.addAnimation(d,b,c)},addAnimation:function(a,b,c){var d={};if(d.animation=a,d.loop=b,!c||0>=c){var e=0==this.queue.length?this.current:this.queue[this.queue.length-1].animation;c=null!=e?e.duration-this.data.getMix(e,a)+(c||0):0}d.delay=c,this.queue.push(d)},isComplete:function(){return!this.current||this.currentTime>=this.current.duration}},l.SkeletonJson=function(a){this.attachmentLoader=a},l.SkeletonJson.prototype={scale:1,readSkeletonData:function(a){for(var b=new l.SkeletonData,c=a.bones,d=0,e=c.length;e>d;d++){var f=c[d],g=null;if(f.parent&&(g=b.findBone(f.parent),!g))throw"Parent bone not found: "+f.parent;var h=new l.BoneData(f.name,g);h.length=(f.length||0)*this.scale,h.x=(f.x||0)*this.scale,h.y=(f.y||0)*this.scale,h.rotation=f.rotation||0,h.scaleX=f.scaleX||1,h.scaleY=f.scaleY||1,b.bones.push(h)}for(var i=a.slots,d=0,e=i.length;e>d;d++){var j=i[d],h=b.findBone(j.bone);if(!h)throw"Slot bone not found: "+j.bone;var k=new l.SlotData(j.name,h),m=j.color;m&&(k.r=l.SkeletonJson.toColor(m,0),k.g=l.SkeletonJson.toColor(m,1),k.b=l.SkeletonJson.toColor(m,2),k.a=l.SkeletonJson.toColor(m,3)),k.attachmentName=j.attachment,b.slots.push(k)}var n=a.skins;for(var o in n)if(n.hasOwnProperty(o)){var p=n[o],q=new l.Skin(o);for(var r in p)if(p.hasOwnProperty(r)){var s=b.findSlotIndex(r),t=p[r];for(var u in t)if(t.hasOwnProperty(u)){var v=this.readAttachment(q,u,t[u]);null!=v&&q.addAttachment(s,u,v)}}b.skins.push(q),"default"==q.name&&(b.defaultSkin=q)}var w=a.animations;for(var x in w)w.hasOwnProperty(x)&&this.readAnimation(x,w[x],b);return b},readAttachment:function(a,b,c){b=c.name||b;var d=l.AttachmentType[c.type||"region"];if(d==l.AttachmentType.region){var e=new l.RegionAttachment;return e.x=(c.x||0)*this.scale,e.y=(c.y||0)*this.scale,e.scaleX=c.scaleX||1,e.scaleY=c.scaleY||1,e.rotation=c.rotation||0,e.width=(c.width||32)*this.scale,e.height=(c.height||32)*this.scale,e.updateOffset(),e.rendererObject={},e.rendererObject.name=b,e.rendererObject.scale={},e.rendererObject.scale.x=e.scaleX,e.rendererObject.scale.y=e.scaleY,e.rendererObject.rotation=-e.rotation*Math.PI/180,e}throw"Unknown attachment type: "+d},readAnimation:function(a,b,c){var d=[],e=0,f=b.bones;for(var g in f)if(f.hasOwnProperty(g)){var h=c.findBoneIndex(g);if(-1==h)throw"Bone not found: "+g;var i=f[g];for(var j in i)if(i.hasOwnProperty(j)){var k=i[j];if("rotate"==j){var m=new l.RotateTimeline(k.length);m.boneIndex=h;for(var n=0,o=0,p=k.length;p>o;o++){var q=k[o];m.setFrame(n,q.time,q.angle),l.SkeletonJson.readCurve(m,n,q),n++}d.push(m),e=Math.max(e,m.frames[2*m.getFrameCount()-2])}else{if("translate"!=j&&"scale"!=j)throw"Invalid timeline type for a bone: "+j+" ("+g+")";var m,r=1;"scale"==j?m=new l.ScaleTimeline(k.length):(m=new l.TranslateTimeline(k.length),r=this.scale),m.boneIndex=h;for(var n=0,o=0,p=k.length;p>o;o++){var q=k[o],s=(q.x||0)*r,t=(q.y||0)*r;m.setFrame(n,q.time,s,t),l.SkeletonJson.readCurve(m,n,q),n++}d.push(m),e=Math.max(e,m.frames[3*m.getFrameCount()-3])}}}var u=b.slots;for(var v in u)if(u.hasOwnProperty(v)){var w=u[v],x=c.findSlotIndex(v);for(var j in w)if(w.hasOwnProperty(j)){var k=w[j];if("color"==j){var m=new l.ColorTimeline(k.length);m.slotIndex=x;for(var n=0,o=0,p=k.length;p>o;o++){var q=k[o],y=q.color,z=l.SkeletonJson.toColor(y,0),A=l.SkeletonJson.toColor(y,1),B=l.SkeletonJson.toColor(y,2),C=l.SkeletonJson.toColor(y,3);m.setFrame(n,q.time,z,A,B,C),l.SkeletonJson.readCurve(m,n,q),n++}d.push(m),e=Math.max(e,m.frames[5*m.getFrameCount()-5])}else{if("attachment"!=j)throw"Invalid timeline type for a slot: "+j+" ("+v+")";var m=new l.AttachmentTimeline(k.length);m.slotIndex=x;for(var n=0,o=0,p=k.length;p>o;o++){var q=k[o];m.setFrame(n++,q.time,q.name)}d.push(m),e=Math.max(e,m.frames[m.getFrameCount()-1])}}}c.animations.push(new l.Animation(a,d,e))}},l.SkeletonJson.readCurve=function(a,b,c){var d=c.curve;d&&("stepped"==d?a.curves.setStepped(b):d instanceof Array&&a.curves.setCurve(b,d[0],d[1],d[2],d[3]))},l.SkeletonJson.toColor=function(a,b){if(8!=a.length)throw"Color hexidecimal length must be 8, recieved: "+a;return parseInt(a.substring(2*b,2),16)/255},l.Atlas=function(a,b){this.textureLoader=b,this.pages=[],this.regions=[];var c=new l.AtlasReader(a),d=[];d.length=4;for(var e=null;;){var f=c.readLine();if(null==f)break;if(f=c.trim(f),0==f.length)e=null;else if(e){var g=new l.AtlasRegion;g.name=f,g.page=e,g.rotate="true"==c.readValue(),c.readTuple(d);var h=parseInt(d[0]),i=parseInt(d[1]);c.readTuple(d);var j=parseInt(d[0]),k=parseInt(d[1]);g.u=h/e.width,g.v=i/e.height,g.rotate?(g.u2=(h+k)/e.width,g.v2=(i+j)/e.height):(g.u2=(h+j)/e.width,g.v2=(i+k)/e.height),g.x=h,g.y=i,g.width=Math.abs(j),g.height=Math.abs(k),4==c.readTuple(d)&&(g.splits=[parseInt(d[0]),parseInt(d[1]),parseInt(d[2]),parseInt(d[3])],4==c.readTuple(d)&&(g.pads=[parseInt(d[0]),parseInt(d[1]),parseInt(d[2]),parseInt(d[3])],c.readTuple(d))),g.originalWidth=parseInt(d[0]),g.originalHeight=parseInt(d[1]),c.readTuple(d),g.offsetX=parseInt(d[0]),g.offsetY=parseInt(d[1]),g.index=parseInt(c.readValue()),this.regions.push(g)}else{e=new l.AtlasPage,e.name=f,e.format=l.Atlas.Format[c.readValue()],c.readTuple(d),e.minFilter=l.Atlas.TextureFilter[d[0]],e.magFilter=l.Atlas.TextureFilter[d[1]];var m=c.readValue();e.uWrap=l.Atlas.TextureWrap.clampToEdge,e.vWrap=l.Atlas.TextureWrap.clampToEdge,"x"==m?e.uWrap=l.Atlas.TextureWrap.repeat:"y"==m?e.vWrap=l.Atlas.TextureWrap.repeat:"xy"==m&&(e.uWrap=e.vWrap=l.Atlas.TextureWrap.repeat),b.load(e,f),this.pages.push(e)}}},l.Atlas.prototype={findRegion:function(a){for(var b=this.regions,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},dispose:function(){for(var a=this.pages,b=0,c=a.length;c>b;b++)this.textureLoader.unload(a[b].rendererObject)},updateUVs:function(a){for(var b=this.regions,c=0,d=b.length;d>c;c++){var e=b[c];e.page==a&&(e.u=e.x/a.width,e.v=e.y/a.height,e.rotate?(e.u2=(e.x+e.height)/a.width,e.v2=(e.y+e.width)/a.height):(e.u2=(e.x+e.width)/a.width,e.v2=(e.y+e.height)/a.height))}}},l.Atlas.Format={alpha:0,intensity:1,luminanceAlpha:2,rgb565:3,rgba4444:4,rgb888:5,rgba8888:6},l.Atlas.TextureFilter={nearest:0,linear:1,mipMap:2,mipMapNearestNearest:3,mipMapLinearNearest:4,mipMapNearestLinear:5,mipMapLinearLinear:6},l.Atlas.TextureWrap={mirroredRepeat:0,clampToEdge:1,repeat:2},l.AtlasPage=function(){},l.AtlasPage.prototype={name:null,format:null,minFilter:null,magFilter:null,uWrap:null,vWrap:null,rendererObject:null,width:0,height:0},l.AtlasRegion=function(){},l.AtlasRegion.prototype={page:null,name:null,x:0,y:0,width:0,height:0,u:0,v:0,u2:0,v2:0,offsetX:0,offsetY:0,originalWidth:0,originalHeight:0,index:0,rotate:!1,splits:null,pads:null},l.AtlasReader=function(a){this.lines=a.split(/\r\n|\r|\n/)},l.AtlasReader.prototype={index:0,trim:function(a){return a.replace(/^\s+|\s+$/g,"")},readLine:function(){return this.index>=this.lines.length?null:this.lines[this.index++]},readValue:function(){var a=this.readLine(),b=a.indexOf(":");if(-1==b)throw"Invalid line: "+a;return this.trim(a.substring(b+1))},readTuple:function(a){var b=this.readLine(),c=b.indexOf(":");if(-1==c)throw"Invalid line: "+b;for(var d=0,e=c+1;3>d;d++){var f=b.indexOf(",",e);if(-1==f){if(0==d)throw"Invalid line: "+b;break}a[d]=this.trim(b.substr(e,f-e)),e=f+1}return a[d]=this.trim(b.substring(e)),d+1}},l.AtlasAttachmentLoader=function(a){this.atlas=a},l.AtlasAttachmentLoader.prototype={newAttachment:function(a,b,c){switch(b){case l.AttachmentType.region:var d=this.atlas.findRegion(c);if(!d)throw"Region not found in atlas: "+c+" ("+b+")";var e=new l.RegionAttachment(c);return e.rendererObject=d,e.setUVs(d.u,d.v,d.u2,d.v2,d.rotate),e.regionOffsetX=d.offsetX,e.regionOffsetY=d.offsetY,e.regionWidth=d.width,e.regionHeight=d.height,e.regionOriginalWidth=d.originalWidth,e.regionOriginalHeight=d.originalHeight,e}throw"Unknown attachment type: "+b}},f.AnimCache={},l.Bone.yDown=!0,f.CustomRenderable=function(){f.DisplayObject.call(this)},f.CustomRenderable.prototype=Object.create(f.DisplayObject.prototype),f.CustomRenderable.prototype.constructor=f.CustomRenderable,f.CustomRenderable.prototype.renderCanvas=function(){},f.CustomRenderable.prototype.initWebGL=function(){},f.CustomRenderable.prototype.renderWebGL=function(){},f.BaseTextureCache={},f.texturesToUpdate=[],f.texturesToDestroy=[],f.BaseTexture=function(a){if(f.EventTarget.call(this),this.width=100,this.height=100,this.hasLoaded=!1,this.source=a,a){if(this.source instanceof Image||this.source instanceof HTMLImageElement)if(this.source.complete)this.hasLoaded=!0,this.width=this.source.width,this.height=this.source.height,f.texturesToUpdate.push(this);else{var b=this;this.source.onload=function(){b.hasLoaded=!0,b.width=b.source.width,b.height=b.source.height,f.texturesToUpdate.push(b),b.dispatchEvent({type:"loaded",content:b})}}else this.hasLoaded=!0,this.width=this.source.width,this.height=this.source.height,f.texturesToUpdate.push(this);this._powerOf2=!1}},f.BaseTexture.prototype.constructor=f.BaseTexture,f.BaseTexture.prototype.destroy=function(){this.source instanceof Image&&(this.source.src=null),this.source=null,f.texturesToDestroy.push(this)},f.BaseTexture.fromImage=function(a,b){var c=f.BaseTextureCache[a];if(!c){var d=new Image;b&&(d.crossOrigin=""),d.src=a,c=new f.BaseTexture(d),f.BaseTextureCache[a]=c}return c},f.TextureCache={},f.FrameCache={},f.Texture=function(a,b){if(f.EventTarget.call(this),b||(this.noFrame=!0,b=new f.Rectangle(0,0,1,1)),a instanceof f.Texture&&(a=a.baseTexture),this.baseTexture=a,this.frame=b,this.trim=new f.Point,this.scope=this,a.hasLoaded)this.noFrame&&(b=new f.Rectangle(0,0,a.width,a.height)),this.setFrame(b);else{var c=this;a.addEventListener("loaded",function(){c.onBaseTextureLoaded()})}},f.Texture.prototype.constructor=f.Texture,f.Texture.prototype.onBaseTextureLoaded=function(){var a=this.baseTexture;a.removeEventListener("loaded",this.onLoaded),this.noFrame&&(this.frame=new f.Rectangle(0,0,a.width,a.height)),this.noFrame=!1,this.width=this.frame.width,this.height=this.frame.height,this.scope.dispatchEvent({type:"update",content:this})},f.Texture.prototype.destroy=function(a){a&&this.baseTexture.destroy()},f.Texture.prototype.setFrame=function(a){if(this.frame=a,this.width=a.width,this.height=a.height,a.x+a.width>this.baseTexture.width||a.y+a.height>this.baseTexture.height)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.updateFrame=!0,f.Texture.frameUpdates.push(this)},f.Texture.fromImage=function(a,b){var c=f.TextureCache[a];return c||(c=new f.Texture(f.BaseTexture.fromImage(a,b)),f.TextureCache[a]=c),c},f.Texture.fromFrame=function(a){var b=f.TextureCache[a];if(!b)throw new Error("The frameId '"+a+"' does not exist in the texture cache "+this);return b},f.Texture.fromCanvas=function(a){var b=new f.BaseTexture(a);return new f.Texture(b)},f.Texture.addTextureToCache=function(a,b){f.TextureCache[b]=a},f.Texture.removeTextureFromCache=function(a){var b=f.TextureCache[a];return f.TextureCache[a]=null,b},f.Texture.frameUpdates=[],f.RenderTexture=function(a,b){f.EventTarget.call(this),this.width=a||100,this.height=b||100,this.indetityMatrix=f.mat3.create(),this.frame=new f.Rectangle(0,0,this.width,this.height),f.gl?this.initWebGL():this.initCanvas()},f.RenderTexture.prototype=Object.create(f.Texture.prototype),f.RenderTexture.prototype.constructor=f.RenderTexture,f.RenderTexture.prototype.initWebGL=function(){var a=f.gl;this.glFramebuffer=a.createFramebuffer(),a.bindFramebuffer(a.FRAMEBUFFER,this.glFramebuffer),this.glFramebuffer.width=this.width,this.glFramebuffer.height=this.height,this.baseTexture=new f.BaseTexture,this.baseTexture.width=this.width,this.baseTexture.height=this.height,this.baseTexture._glTexture=a.createTexture(),a.bindTexture(a.TEXTURE_2D,this.baseTexture._glTexture),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,this.width,this.height,0,a.RGBA,a.UNSIGNED_BYTE,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),this.baseTexture.isRender=!0,a.bindFramebuffer(a.FRAMEBUFFER,this.glFramebuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.baseTexture._glTexture,0),this.projection=new f.Point(this.width/2,this.height/2),this.render=this.renderWebGL
},f.RenderTexture.prototype.resize=function(a,b){if(this.width=a,this.height=b,f.gl){this.projection.x=this.width/2,this.projection.y=this.height/2;var c=f.gl;c.bindTexture(c.TEXTURE_2D,this.baseTexture._glTexture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,this.width,this.height,0,c.RGBA,c.UNSIGNED_BYTE,null)}else this.frame.width=this.width,this.frame.height=this.height,this.renderer.resize(this.width,this.height)},f.RenderTexture.prototype.initCanvas=function(){this.renderer=new f.CanvasRenderer(this.width,this.height,null,0),this.baseTexture=new f.BaseTexture(this.renderer.view),this.frame=new f.Rectangle(0,0,this.width,this.height),this.render=this.renderCanvas},f.RenderTexture.prototype.renderWebGL=function(a,b,c){var d=f.gl;d.colorMask(!0,!0,!0,!0),d.viewport(0,0,this.width,this.height),d.bindFramebuffer(d.FRAMEBUFFER,this.glFramebuffer),c&&(d.clearColor(0,0,0,0),d.clear(d.COLOR_BUFFER_BIT));var e=a.children,g=a.worldTransform;a.worldTransform=f.mat3.create(),a.worldTransform[4]=-1,a.worldTransform[5]=2*this.projection.y,b&&(a.worldTransform[2]=b.x,a.worldTransform[5]-=b.y),f.visibleCount++,a.vcount=f.visibleCount;for(var h=0,i=e.length;i>h;h++)e[h].updateTransform();var j=a.__renderGroup;j?a==j.root?j.render(this.projection):j.renderSpecific(a,this.projection):(this.renderGroup||(this.renderGroup=new f.WebGLRenderGroup(d)),this.renderGroup.setRenderable(a),this.renderGroup.render(this.projection)),a.worldTransform=g},f.RenderTexture.prototype.renderCanvas=function(a,b,c){var d=a.children;a.worldTransform=f.mat3.create(),b&&(a.worldTransform[2]=b.x,a.worldTransform[5]=b.y);for(var e=0,g=d.length;g>e;e++)d[e].updateTransform();c&&this.renderer.context.clearRect(0,0,this.width,this.height),this.renderer.renderDisplayObject(a),this.renderer.context.setTransform(1,0,0,1,0,0)},f.AssetLoader=function(a,b){f.EventTarget.call(this),this.assetURLs=a,this.crossorigin=b,this.loadersByType={jpg:f.ImageLoader,jpeg:f.ImageLoader,png:f.ImageLoader,gif:f.ImageLoader,json:f.JsonLoader,anim:f.SpineLoader,xml:f.BitmapFontLoader,fnt:f.BitmapFontLoader}},f.AssetLoader.prototype.constructor=f.AssetLoader,f.AssetLoader.prototype.load=function(){var a=this;this.loadCount=this.assetURLs.length;for(var b=0;b<this.assetURLs.length;b++){var c=this.assetURLs[b],d=c.split(".").pop().toLowerCase(),e=this.loadersByType[d];if(!e)throw new Error(d+" is an unsupported file type");var f=new e(c,this.crossorigin);f.addEventListener("loaded",function(){a.onAssetLoaded()}),f.load()}},f.AssetLoader.prototype.onAssetLoaded=function(){this.loadCount--,this.dispatchEvent({type:"onProgress",content:this}),this.onProgress&&this.onProgress(),0==this.loadCount&&(this.dispatchEvent({type:"onComplete",content:this}),this.onComplete&&this.onComplete())},f.JsonLoader=function(a,b){f.EventTarget.call(this),this.url=a,this.crossorigin=b,this.baseUrl=a.replace(/[^\/]*$/,""),this.loaded=!1},f.JsonLoader.prototype.constructor=f.JsonLoader,f.JsonLoader.prototype.load=function(){this.ajaxRequest=new k;var a=this;this.ajaxRequest.onreadystatechange=function(){a.onJSONLoaded()},this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.overrideMimeType&&this.ajaxRequest.overrideMimeType("application/json"),this.ajaxRequest.send(null)},f.JsonLoader.prototype.onJSONLoaded=function(){if(4==this.ajaxRequest.readyState)if(200==this.ajaxRequest.status||-1==window.location.href.indexOf("http"))if(this.json=JSON.parse(this.ajaxRequest.responseText),this.json.frames){var a=this,b=this.baseUrl+this.json.meta.image,c=new f.ImageLoader(b,this.crossorigin),d=this.json.frames;this.texture=c.texture.baseTexture,c.addEventListener("loaded",function(){a.onLoaded()});for(var e in d){var g=d[e].frame;g&&(f.TextureCache[e]=new f.Texture(this.texture,{x:g.x,y:g.y,width:g.w,height:g.h}),d[e].trimmed&&(f.TextureCache[e].realSize=d[e].spriteSourceSize,f.TextureCache[e].trim.x=0))}c.load()}else if(this.json.bones){var h=new l.SkeletonJson,i=h.readSkeletonData(this.json);f.AnimCache[this.url]=i,this.onLoaded()}else this.onLoaded();else this.onError()},f.JsonLoader.prototype.onLoaded=function(){this.loaded=!0,this.dispatchEvent({type:"loaded",content:this})},f.JsonLoader.prototype.onError=function(){this.dispatchEvent({type:"error",content:this})},f.SpriteSheetLoader=function(a,b){f.EventTarget.call(this),this.url=a,this.crossorigin=b,this.baseUrl=a.replace(/[^\/]*$/,""),this.texture=null,this.frames={}},f.SpriteSheetLoader.prototype.constructor=f.SpriteSheetLoader,f.SpriteSheetLoader.prototype.load=function(){var a=this,b=new f.JsonLoader(this.url,this.crossorigin);b.addEventListener("loaded",function(b){a.json=b.content.json,a.onJSONLoaded()}),b.load()},f.SpriteSheetLoader.prototype.onJSONLoaded=function(){var a=this,b=this.baseUrl+this.json.meta.image,c=new f.ImageLoader(b,this.crossorigin),d=this.json.frames;this.texture=c.texture.baseTexture,c.addEventListener("loaded",function(){a.onLoaded()});for(var e in d){var g=d[e].frame;g&&(f.TextureCache[e]=new f.Texture(this.texture,{x:g.x,y:g.y,width:g.w,height:g.h}),d[e].trimmed&&(f.TextureCache[e].realSize=d[e].spriteSourceSize,f.TextureCache[e].trim.x=0))}c.load()},f.SpriteSheetLoader.prototype.onLoaded=function(){this.dispatchEvent({type:"loaded",content:this})},f.ImageLoader=function(a,b){f.EventTarget.call(this),this.texture=f.Texture.fromImage(a,b)},f.ImageLoader.prototype.constructor=f.ImageLoader,f.ImageLoader.prototype.load=function(){if(this.texture.baseTexture.hasLoaded)this.onLoaded();else{var a=this;this.texture.baseTexture.addEventListener("loaded",function(){a.onLoaded()})}},f.ImageLoader.prototype.onLoaded=function(){this.dispatchEvent({type:"loaded",content:this})},f.BitmapFontLoader=function(a,b){f.EventTarget.call(this),this.url=a,this.crossorigin=b,this.baseUrl=a.replace(/[^\/]*$/,""),this.texture=null},f.BitmapFontLoader.prototype.constructor=f.BitmapFontLoader,f.BitmapFontLoader.prototype.load=function(){this.ajaxRequest=new XMLHttpRequest;var a=this;this.ajaxRequest.onreadystatechange=function(){a.onXMLLoaded()},this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.overrideMimeType&&this.ajaxRequest.overrideMimeType("application/xml"),this.ajaxRequest.send(null)},f.BitmapFontLoader.prototype.onXMLLoaded=function(){if(4==this.ajaxRequest.readyState&&(200==this.ajaxRequest.status||-1==window.location.href.indexOf("http"))){var a=this.baseUrl+this.ajaxRequest.responseXML.getElementsByTagName("page")[0].attributes.getNamedItem("file").nodeValue,b=new f.ImageLoader(a,this.crossorigin);this.texture=b.texture.baseTexture;var c={},d=this.ajaxRequest.responseXML.getElementsByTagName("info")[0],e=this.ajaxRequest.responseXML.getElementsByTagName("common")[0];c.font=d.attributes.getNamedItem("face").nodeValue,c.size=parseInt(d.attributes.getNamedItem("size").nodeValue,10),c.lineHeight=parseInt(e.attributes.getNamedItem("lineHeight").nodeValue,10),c.chars={};for(var g=this.ajaxRequest.responseXML.getElementsByTagName("char"),h=0;h<g.length;h++){var i=parseInt(g[h].attributes.getNamedItem("id").nodeValue,10),j={x:parseInt(g[h].attributes.getNamedItem("x").nodeValue,10),y:parseInt(g[h].attributes.getNamedItem("y").nodeValue,10),width:parseInt(g[h].attributes.getNamedItem("width").nodeValue,10),height:parseInt(g[h].attributes.getNamedItem("height").nodeValue,10)};f.TextureCache[i]=new f.Texture(this.texture,j),c.chars[i]={xOffset:parseInt(g[h].attributes.getNamedItem("xoffset").nodeValue,10),yOffset:parseInt(g[h].attributes.getNamedItem("yoffset").nodeValue,10),xAdvance:parseInt(g[h].attributes.getNamedItem("xadvance").nodeValue,10),kerning:{},texture:new f.Texture(this.texture,j)}}var k=this.ajaxRequest.responseXML.getElementsByTagName("kerning");for(h=0;h<k.length;h++){var l=parseInt(k[h].attributes.getNamedItem("first").nodeValue,10),m=parseInt(k[h].attributes.getNamedItem("second").nodeValue,10),n=parseInt(k[h].attributes.getNamedItem("amount").nodeValue,10);c.chars[m].kerning[l]=n}f.BitmapText.fonts[c.font]=c;var o=this;b.addEventListener("loaded",function(){o.onLoaded()}),b.load()}},f.BitmapFontLoader.prototype.onLoaded=function(){this.dispatchEvent({type:"loaded",content:this})},f.SpineLoader=function(a,b){f.EventTarget.call(this),this.url=a,this.crossorigin=b,this.loaded=!1},f.SpineLoader.prototype.constructor=f.SpineLoader,f.SpineLoader.prototype.load=function(){var a=this,b=new f.JsonLoader(this.url,this.crossorigin);b.addEventListener("loaded",function(b){a.json=b.content.json,a.onJSONLoaded()}),b.load()},f.SpineLoader.prototype.onJSONLoaded=function(){var a=new l.SkeletonJson,b=a.readSkeletonData(this.json);f.AnimCache[this.url]=b,this.onLoaded()},f.SpineLoader.prototype.onLoaded=function(){this.loaded=!0,this.dispatchEvent({type:"loaded",content:this})},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=f),exports.PIXI=f):e.PIXI=f}.call(this);
},{}]},{},[1])
;