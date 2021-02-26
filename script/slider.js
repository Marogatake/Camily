$(function () {
  winWidth = $(window).width();
  $(window).resize(function() {
    winWidth = $(window).width();
  });

  // .mvの動き
  setInterval(function(){
    img1Display = $('#first_img').css('display'),
    img2Display = $('#second_img').css('display');
    if (img1Display == 'none') {
      $('#first_img').fadeIn(1000);
      $('#second_img').fadeOut(500);
    }else if (img2Display == 'none') {
      $('#first_img').fadeOut(500);
      $('#second_img').fadeIn(1000);
    }
  },8000);

  // .slickの動き
  setInterval(function(){
    var elementWidth = $('#slide_items li').width(),
    flowWidth = elementWidth * 5;
    $('#slide_items').animate({'marginLeft': - flowWidth},
    65000, 'linear',
    function(){$('#slide_items').css('marginLeft','0');});
  }, 600);

  // .productの動き
  var sliderBox = $('#slider'),
  boxwidth = sliderBox.width(),
  elementQuantity = $('#slider li').length,
  productText = $('#product_text'),
  productNumButton = $('.product__top-button').children(),
  cancelFlag = 0;
  productTextHeight = productText.height();
  $(window).resize(function() {
    clearTimeout( resized );
    resized = setTimeout(function() {
      productTextHeight = productText.height();
    });
  });

  interval = setTimeout(function(){NextSlider();}, 9000);
  countdownProduct();

  $(window).bind("focus", function(){
    interval = setTimeout(function(){NextSlider();}, 9000);
    countdownProduct();
  });
  $(window).bind("blur", function(){
    clearInterval(interval);
    resetCountdown();
    cancelFlag = 0;
  });
  $(window).scrollLeft(0);

  $('#prev').click(function(){
    PrevSlider();
  });
  $('#next').click(function(){
    NextSlider();
  });

  $('#num1').click(function(){
    clickNumButton($('#num1'));
  });
  $('#num2').click(function(){
    clickNumButton($('#num2'));
  });
  $('#num3').click(function(){
    clickNumButton($('#num3'));
  });
  $('#num4').click(function(){
    clickNumButton($('#num4'));
  });
  $('#num5').click(function(){
    clickNumButton($('#num5'));
  });
  $('#num6').click(function(){
    clickNumButton($('#num6'));
  });
  $('#num7').click(function(){
    clickNumButton($('#num7'));
  });

  function NextSlider() {
    if (cancelFlag == 0) {
      cancelFlag =1;
      clearInterval(interval);
      resetCountdown();

      var flowTimeGuide = 700,
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')],

      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1300) {
        elementWidth[2] = elementWidth[2]*0.5;
      }
      elementFlowWidth = [elementWidth[0] + elementPosition[0], elementPosition[1] + 0.592*elementWidth[1], elementPosition[2] - winWidth*0.5 + elementWidth[2]];

      element[1].clone().removeAttr('id').attr('id', 'clone')
      .appendTo(sliderBox).css('left','100vw');
      cloneElement = $('#clone');
      cloneFlowWidth = winWidth*0.11;

      element[1].animate({'left':- elementWidth[0]},elementFlowWidth[0]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).remove();
      });
      element[2].animate({'left': -0.592*elementWidth[1]},elementFlowWidth[1]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_left');
      });
      element[3].animate({'left': winWidth*0.5 - elementWidth[2]},elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
        interval = setTimeout(function(){NextSlider();}, 9000);
        countdownProduct();
        textChangeAct();
        setTimeout(function(){cancelFlag = 0;},1200);
      });
      setTimeout(function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          cloneElement.animate({'left': winWidth*0.89},cloneFlowWidth*flowTimeGuide/winWidth,'linear',
          function(){
            $(this).removeAttr('id').attr('id', 'product_right');
          });
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          element[4].animate({'left': winWidth*0.89},cloneFlowWidth*flowTimeGuide/winWidth,'linear',
          function(){
            $(this).removeAttr('id').attr('id', 'product_right');
            // element5以降のidを手前の要素のidに書き換える。cloneElementは最後の要素のidにする。
            element[5].removeAttr('id').attr('id', 'product_add1');
            element[6].removeAttr('id').attr('id', 'product_add2');
            element[7].removeAttr('id').attr('id', 'product_add3');
            cloneElement.removeAttr('id').attr('id', 'product_add4');
          });
        }
      }, 0.7*elementFlowWidth[2]*flowTimeGuide/winWidth);
    }
  }

  function PrevSlider(){
    if (cancelFlag == 0) {
      cancelFlag =1;
      clearInterval(interval);
      resetCountdown();

      var flowTimeGuide = 700,
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')],

      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1300) {
        elementWidth[0] = elementWidth[0]*0.5;
      }
      elementFlowWidth = [winWidth*0.5 - elementWidth[0] - elementPosition[0], winWidth*0.89 - elementPosition[1], winWidth*0.11];

      cloneWidth = parseInt(element[elementQuantity].css('width'), 10);
      element[elementQuantity].clone().removeAttr('id').attr('id', 'clone')
      .prependTo(sliderBox).css('left', - cloneWidth);
      cloneElement = $('#clone'),
      cloneFlowWidth = cloneWidth *0.408;
      element[elementQuantity].remove();

      element[1].animate({'left': winWidth*0.5 - elementWidth[0]},elementFlowWidth[0]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
      });
      element[2].animate({'left':winWidth*0.89},elementFlowWidth[1]*flowTimeGuide/winWidth,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_right');
        interval = setTimeout(function(){NextSlider();}, 9000);
        countdownProduct();
        textChangeAct();
        setTimeout(function(){cancelFlag = 0;},1200);
      });
      element[3].animate({'left': winWidth},elementFlowWidth[2]*flowTimeGuide/winWidth,'linear',
      function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          $(this).remove();
        }else if(elementQuantity > 3){
          // 商品数が３商品数が３つを越えるときに実行される
          $(this).removeAttr('id').attr('id', 'product_add1');
          // 最後を除く3番目以降の要素に対して自身の一個後ろのidに書き換える(以下は商品数7のときの例)
          element[4].removeAttr('id').attr('id', 'product_add2');
          element[5].removeAttr('id').attr('id', 'product_add3');
          element[6].removeAttr('id').attr('id', 'product_add4');
        }
      });
      setTimeout(function(){
        cloneElement.animate({'left': -0.592*cloneWidth}, cloneFlowWidth*flowTimeGuide/winWidth,'linear',
        function(){
          $(this).removeAttr('id').attr('id', 'product_left');
        });
      }, 0.7*elementFlowWidth[0]*flowTimeGuide/winWidth);
    }
  }

  function textChange(nextFolded) {
    nextHTML = nextFolded.html();
    productText.css('min-height', productTextHeight);
    productText.children().fadeOut(500).queue(function(){
      productText.html('').html(nextHTML);
      productText.children().css('display','none');
      productText.children().fadeIn(500);
    });
  }

  function textChangeAct() {
   centerClass = $('#product_center').attr('class');
   if (centerClass == 'slider1') {
     textChange($('#folded1'));
   }else if (centerClass == 'slider2') {
     textChange($('#folded2'));
   }else if (centerClass == 'slider3') {
     textChange($('#folded3'));
   }
   // 商品数に合わせて以下の書き換え(以下は商品数 7のときの例)
   else if (centerClass == 'slider4') {
     textChange($('#folded4'));
   }else if (centerClass == 'slider5') {
     textChange($('#folded5'));
   }else if (centerClass == 'slider6') {
     textChange($('#folded6'));
   }else if (centerClass == 'slider7') {
     textChange($('#folded7'));
   }
 }

  function countdownProduct() {
   centerElementNumber = $('#product_center').data('number');
   productNumButton.eq(centerElementNumber).find('.chart-meter')
   .css({'transform':'rotate(360deg)','transition':'9000ms','transition-timing-function':'linear'});
   firstCount = setTimeout(function(){
     productNumButton.eq(centerElementNumber).css({'background':'linear-gradient(90deg,#110603 0%,#110603 50%,#e6e7e9 50%,#e6e7e9 100%'});
     productNumButton.eq(centerElementNumber).find('.chart-submeter')
     .css('background','linear-gradient(90deg,transparent 0%,transparent 50%,#110603 50%,#110603 100%');
   },4500);
   secondCount = setTimeout(function(){
     productNumButton.eq(centerElementNumber).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#110603 50%,#110603 100%'});
     productNumButton.eq(centerElementNumber).find('.chart-meter')
     .css({'transform':'rotate(0deg)','transition':'0s'});
     productNumButton.eq(centerElementNumber).find('.chart-submeter')
     .css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
   },9000);
 }

  function resetCountdown() {
    clearTimeout( firstCount );
    clearTimeout( secondCount );
    productNumButton.eq(elementQuantity+1).css('background','#e6e7e9');
    for (var i = 1; i < elementQuantity +1; i++) {
      productNumButton.eq(i).css({'background':'linear-gradient(90deg,#e6e7e9 0%,#e6e7e9 50%,#110603 50%,#110603 100%'});
      productNumButton.eq(i).find('.chart-meter').css({'transform':'rotate(0deg)','transition':'0s'});
      productNumButton.eq(i).find('.chart-submeter').css('background','linear-gradient(90deg,transparent 0%,transparent 50%,transparent 50%,transparent 100%');
    }
 }

  function flowToNext() {
    return function(){
      var defer = $.Deferred(),
      flowTimeGuide = 400,
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')],

      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1300) {
        elementWidth[2] = elementWidth[2]*0.5;
      }
      elementFlowWidth = [elementWidth[0] + elementPosition[0], elementPosition[1] + 0.592*elementWidth[1], elementPosition[2] - winWidth*0.5 + elementWidth[2]];

      element[1].clone().removeAttr('id').attr('id', 'clone').appendTo(sliderBox).css('left','100vw');
      cloneElement = $('#clone');
      cloneFlowWidth = winWidth*0.11;

      element[1].animate({'left':- elementWidth[0]},flowTimeGuide,'linear',
      function(){
        $(this).remove();
      });
      element[2].animate({'left': -0.592*elementWidth[1]},flowTimeGuide,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_left');
      });
      element[3].animate({'left': winWidth*0.5 - elementWidth[2]},flowTimeGuide,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
      });
      setTimeout(function(){
        if (elementQuantity <= 3) {
          // 商品数が３つのときに実行される
          cloneElement.animate({'left': winWidth*0.89},0.5*flowTimeGuide,'linear',
          function(){
            $(this).removeAttr('id').attr('id', 'product_right');
            defer.resolve();
          });
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          element[4].animate({'left': winWidth*0.89},0.5*flowTimeGuide,'linear',
          function(){
              $(this).removeAttr('id').attr('id', 'product_right');
              // element5以降のidを手前の要素のidに書き換える。cloneElementは最後の要素のidにする。
              element[5].removeAttr('id').attr('id', 'product_add1');
              element[6].removeAttr('id').attr('id', 'product_add2');
              element[7].removeAttr('id').attr('id', 'product_add3');
              cloneElement.removeAttr('id').attr('id', 'product_add4');
              defer.resolve();
          });
        }
      }, 0.55*flowTimeGuide);
      return defer.promise();
    }
 }

  function flowToPrev() {
    return function(){
      var defer = $.Deferred(),
      flowTimeGuide = 400,
      element = [0, $('#product_left'), $('#product_center'), $('#product_right'),
                    $('#product_add1'), $('#product_add2'), $('#product_add3'), $('#product_add4')],

      elementWidth = [parseInt(element[1].css('width'), 10), parseInt(element[2].css('width'), 10), parseInt(element[3].css('width'), 10)],
      elementPosition = [parseInt(element[1].css('left'), 10), parseInt(element[2].css('left'), 10), parseInt(element[3].css('left'), 10)];
      if (winWidth <= 1300) {
        elementWidth[0] = elementWidth[0]*0.5;
      }
      elementFlowWidth = [winWidth*0.5 - elementWidth[0] - elementPosition[0], winWidth*0.89 - elementPosition[1], winWidth*0.11];

      cloneWidth = parseInt(element[elementQuantity].css('width'), 10);
      element[elementQuantity].clone().removeAttr('id').attr('id', 'clone')
      .prependTo(sliderBox).css('left', - cloneWidth);
      cloneElement = $('#clone'),
      cloneFlowWidth = cloneWidth *0.408;
      element[elementQuantity].remove();

      element[1].animate({'left': winWidth*0.5 - elementWidth[0]},flowTimeGuide,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_center');
      });
      element[2].animate({'left':winWidth*0.89},flowTimeGuide,'linear',
      function(){
        $(this).removeAttr('id').attr('id', 'product_right');
      });
      element[3].animate({'left': winWidth},flowTimeGuide,'linear',
      function(){
        if (elementQuantity <=3) {
          // 商品数が３つのときに実行される
          $(this).remove();
        }else if (elementQuantity > 3) {
          // 商品数が３つを越えるときに実行される
          $(this).removeAttr('id').attr('id', 'product_add1');
          // 最後を除く3番目以降の要素に対して自身の一個後ろのidに書き換える(以下は商品数7のときの例)
          element[4].removeAttr('id').attr('id', 'product_add2');
          element[5].removeAttr('id').attr('id', 'product_add3');
          element[6].removeAttr('id').attr('id', 'product_add4');
        }
      });
      setTimeout(function(){
        cloneElement.animate({'left': -0.592*cloneWidth}, 0.5*flowTimeGuide,'linear',
        function(){
          $(this).removeAttr('id').attr('id', 'product_left');
          defer.resolve();
        });
      }, 0.55*flowTimeGuide);
      return defer.promise();
    }
 }

  function clickNumButton(clickNum) {
   if (cancelFlag == 0) {
     cancelFlag = 1;
     resetCountdown();
     clearInterval(interval);
     clickedElement = clickNum.data('number');
     centerElementNumber = sliderBox.children('li').eq('1').data('number');
     numberDifference = clickedElement - centerElementNumber;

     if (5 < numberDifference) {
       var deferred = $.Deferred().resolve();
       for(var i = 0; i < elementQuantity - numberDifference; i++){
         deferred = deferred.then(flowToPrev());
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         textChangeAct();
         setTimeout(function(){cancelFlag = 0;},1200);
       });
     }else if (0 < numberDifference && numberDifference  <= 5) {
       var deferred = $.Deferred().resolve();
       for(var i = 0; i < numberDifference; i++){
         deferred = deferred.then(flowToNext());
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         textChangeAct();
         setTimeout(function(){cancelFlag = 0;},1200);
       });
     }else if (numberDifference == 0) {
       setTimeout(function(){
         cancelFlag = 0;
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
       },200)
     }else if (-5 <= numberDifference && numberDifference < 0) {
       var deferred = $.Deferred().resolve();
       for(var i = 0; i < - numberDifference; i++){
         deferred = deferred.then(flowToPrev());
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         textChangeAct();
         setTimeout(function(){cancelFlag = 0;},1200);
       });
     }else if (numberDifference < -5) {
       var deferred = $.Deferred().resolve();
       for(var i = 0; i < elementQuantity+numberDifference; i++){
         deferred = deferred.then(flowToNext());
       }
       deferred.then(function(){
         interval = setTimeout(function(){NextSlider();}, 9000);
         countdownProduct();
         textChangeAct();
         setTimeout(function(){cancelFlag = 0;},1200);
       });
     }
   }
 }

});
