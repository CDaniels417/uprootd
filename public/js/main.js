$(document).ready(function() {
  
  // init materialize css js
  M.AutoInit();


  // populate kava object
  var kavaList = {};
  $.ajax({
    method: "GET",
    url: "/api/kava/"
  })
  .then(function(results) {

    // var avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    // var ratingArr = [];

    // for (var i = 0; i < results.length; i++) {
    //   var a = [];
    //   results[i].reviews.forEach(function(obj){
    //     a.push(obj.rating);
    //   });
    //   results[i].rating = avg(a);

    //   if(results[i].rating > 4){
    //     results[i].isTrending = true;
    //   } else{
    //     results[i].isTrending = false;
    //   }
    // }



    console.log(results);



    for (var i = 0; i < results.length; i++) {
        // kavaList[results[i].name] = '/img/flag_'+results[i].country.toLowerCase()+'.png';
        kavaList[results[i].name] = null;
    }
  });

  console.log(kavaList);

  $(document).on('click','.sign-up-link',function(){
    $('.content-login').addClass('hide');
    $('.content-register').removeClass('hide');
    $('.login-register-toggle').html('Already registered? <a class="login-link">Login Here!</a>');
  });

  $(document).on('click','.login-link',function(){
    $('.content-register').addClass('hide');
    $('.content-login').removeClass('hide');
    $('.login-register-toggle').html('Not registered? <a class="sign-up-link">Sign up today!</a>');
  });


  $(document).on('click','.view-all-kavas',function(){
    $('.trending-kavas-wrap').addClass('hide');
    $('.all-kavas-wrap').removeClass('hide');
  });

  $(document).on('click','.view-trending-kavas',function(){
    $('.all-kavas-wrap').addClass('hide');
    $('.trending-kavas-wrap').removeClass('hide');
  });



  $('.trending-kavas,.all-kavas').on('click','a',function(e){
    $('#kavaModal .modal-content').empty();
    var id = $(this).data('kava');

    $.get('/api/kava/'+id, function(data) {

      var avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
      var ratingArr = [];

      for (var i = 0; i < data.reviews.length; i++) {
        ratingArr.push(data.reviews[i].rating);
      };

      data.rating = avg(ratingArr);

      var numStars = Math.round(data.rating);
      console.log(numStars);


      var html = '<div class="card small brown lighten-3"><div class="card-image"><img src="/img/flag_'+data.country.toLowerCase()+'.png" alt=""></div><div class="card-stacked"><div class="card-content"><span class="card-title">'+data.name+'</span><p>'+data.country+'</p><p>'+data.description+'</p>';

      if(data.rating){
        html+= '<p class="rating-row"><span class="cover"></span><span class="rating">';
        
        for (var i = 5; i > 0; i--) {
          if(numStars === i){
            html+='<input type="radio" name="ratingstar" id="star'+i+'" value="'+i+'" checked disabled><label for="star'+i+'"><i class="material-icons z">star</i></label>';  
          } else{
            html+='<input type="radio" name="ratingstar" id="star'+i+'" value="'+i+'" disabled><label for="star'+i+'"><i class="material-icons z">star</i></label>';  
          }
        }

        html+='</span></p>';
      } else{
        html+= '<p class="rating-row"><em>Oops! This root hasn\'t been rated yet!</em></p>'
      }

      html+= '</div></div></div>';
      
      $(html).appendTo('#kavaModal .modal-content');

      $('#kavaModal').modal('open');


    });

  });



  $('.search-btn').on('click',function(){
    // if($(this).hasClass('active')){
    //   $(this).removeClass('active');
    //   $('.search-icon').removeClass('active');
    //   $('.search-kava-input').removeClass('active');
    // } else{
      $(this).addClass('active');
      $('.search-icon').addClass('active');
      $('.search-kava').addClass('active');
      $('.search-kava-input').addClass('active');
    // }
  });
  
  var closeSearch = function(){
    $('.search-btn').removeClass('active');
    $('.search-icon').removeClass('active');
    $('.search-kava-input').removeClass('active');
    $('.search-kava-input').val("");
  };

  $(document).on('click', function (event) {
    if (!$(event.target).closest('.search-btn.active').length) {
      // ... clicked on the 'body', but not inside of .search-btn.active
      closeSearch();
    }
  });

  $('#searchKava.autocomplete').autocomplete({
    data: kavaList,
    onAutocomplete: function(val){
      closeSearch();
      var kavaArr = [];
      for(kava in kavaList){
        kavaArr.push(kava);
      }
      // console.log(kavaArr);

      var theKava = function(){
        for (var i = 0; i < kavaArr.length; i++) {
          if(val === kavaArr[i]){
            return i + 1;
          }
        }
      };

      // console.log(theKava());
      $('#kavaSearchModal .modal-content').empty();
      // var id = $(this).data('kava');
      var id = theKava();

      $.get('/api/kava/'+id, function(data) {

        var avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
        var ratingArr = [];

        for (var i = 0; i < data.reviews.length; i++) {
          ratingArr.push(data.reviews[i].rating);
        };

        data.rating = avg(ratingArr);

        var numStars = Math.round(data.rating);
        console.log(numStars);


        var html = '<div class="card small brown lighten-3"><div class="card-image"><img src="/img/flag_'+data.country.toLowerCase()+'.png" alt=""></div><div class="card-stacked"><div class="card-content"><span class="card-title">'+data.name+'</span><p>'+data.country+'</p><p>'+data.description+'</p>';

        if(data.rating){
          html+= '<p class="rating-row"><span class="cover"></span><span class="rating">';
          
          for (var i = 5; i > 0; i--) {
            if(numStars === i){
              html+='<input type="radio" name="ratingstar" id="star'+i+'" value="'+i+'" checked disabled><label for="star'+i+'"><i class="material-icons z">star</i></label>';  
            } else{
              html+='<input type="radio" name="ratingstar" id="star'+i+'" value="'+i+'" disabled><label for="star'+i+'"><i class="material-icons z">star</i></label>';  
            }
          }

          html+='</span></p>';
        } else{
          html+= '<p class="rating-row"><em>Oops! This root hasn\'t been rated yet!</em></p>'
        }

        html+= '</div></div></div>';
        
        $(html).appendTo('#kavaSearchModal .modal-content');

        $('#kavaSearchModal').modal('open');


      });
    }
  });


  $('.expand-user-menu').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    var userWrap = $('.user-menu-wrap');
    if(userWrap.hasClass('active')){
      $('.user-menu-wrap').removeClass('active')
    } else{
      $('.user-menu-wrap').addClass('active')
    }
  });

});


