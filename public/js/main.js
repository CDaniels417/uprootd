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
  
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.search-btn.active').length) {
      // ... clicked on the 'body', but not inside of .search-btn.active
      $('.search-btn').removeClass('active');
      $('.search-icon').removeClass('active');
      $('.search-kava-input').removeClass('active');
      $('.search-kava-input').val("");
    }
  });

  $('#searchKava.autocomplete').autocomplete({
    data: kavaList
  });




  // //auto complete code
  // function autocomplete(inp, arr) {
  //   /*the autocomplete function takes two arguments,
  //   the text field element and an array of possible autocompleted values:*/
  //   var currentFocus;
  //   /*execute a function when someone writes in the text field:*/
  //   inp.addEventListener("input", function(e) {
  //     var a, b, i, val = this.value;
  //     /*close any already open lists of autocompleted values*/
  //     closeAllLists();
  //     if (!val) { return false;}
  //     currentFocus = -1;
  //     /*create a DIV element that will contain the items (values):*/
  //     a = document.createElement("DIV");
  //     a.setAttribute("id", this.id + "autocomplete-list");
  //     a.setAttribute("class", "autocomplete-items text-left");
  //     /*append the DIV element as a child of the autocomplete container:*/
  //     this.parentNode.appendChild(a);
  //     /*for each item in the array...*/
  //     for (i = 0; i < arr.length; i++) {
  //       /*check if the item starts with the same letters as the text field value:*/
  //       if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
  //         /*create a DIV element for each matching element:*/
  //         b = document.createElement("DIV");
  //         /*make the matching letters bold:*/
  //         b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
  //         b.innerHTML += arr[i].name.substr(val.length);
  //         /*insert a input field that will hold the current array item's value:*/
  //         b.innerHTML += "<input type='hidden' data-name='" + arr[i].name + "' data-id='" + arr[i].id + "' value='" + arr[i].name + "'>";
  //         b.innerHTML += "<input type='hidden' data-name='" + arr[i].name + "' data-id='" + arr[i].id + "' value='" + arr[i].id + "'>";
  //         /*execute a function when someone clicks on the item value (DIV element):*/
  //         b.addEventListener("click", function(e) {
  //           /*insert the value for the autocomplete text field:*/
  //           inp.value = this.getElementsByTagName("input")[0].value;
  //           document.getElementById('idInput').value = this.getElementsByTagName("input")[1].value;
  //               /*close the list of autocompleted values,
  //               (or any other open lists of autocompleted values:*/
  //               closeAllLists();
  //             });
  //         a.appendChild(b);
  //       }
  //     }
  //   });
  //   /*execute a function presses a key on the keyboard:*/
  //   inp.addEventListener("keydown", function(e) {
  //     var x = document.getElementById(this.id + "autocomplete-list");
  //     if (x) x = x.getElementsByTagName("div");
  //     if (e.keyCode == 40) {
  //         /*If the arrow DOWN key is pressed,
  //         increase the currentFocus variable:*/
  //         currentFocus++;
  //         /*and and make the current item more visible:*/
  //         addActive(x);
  //       } else if (e.keyCode == 38) { //up
  //         /*If the arrow UP key is pressed,
  //         decrease the currentFocus variable:*/
  //         currentFocus--;
  //         /*and and make the current item more visible:*/
  //         addActive(x);
  //       } else if (e.keyCode == 13) {
  //         /*If the ENTER key is pressed, prevent the form from being submitted,*/
  //         e.preventDefault();
  //         if (currentFocus > -1) {
  //           /*and simulate a click on the "active" item:*/
  //           if (x) x[currentFocus].click();
  //         }
  //       }
  //     });
  //   function addActive(x) {
  //     /*a function to classify an item as "active":*/
  //     if (!x) return false;
  //     /*start by removing the "active" class on all items:*/
  //     removeActive(x);
  //     if (currentFocus >= x.length) currentFocus = 0;
  //     if (currentFocus < 0) currentFocus = (x.length - 1);
  //     /*add class "autocomplete-active":*/
  //     x[currentFocus].classList.add("autocomplete-active");
  //   }
  //   function removeActive(x) {
  //     /*a function to remove the "active" class from all autocomplete items:*/
  //     for (var i = 0; i < x.length; i++) {
  //       x[i].classList.remove("autocomplete-active");
  //     }
  //   }
  //   function closeAllLists(elmnt) {
  //     /*close all autocomplete lists in the document,
  //     except the one passed as an argument:*/
  //     var x = document.getElementsByClassName("autocomplete-items");
  //     for (var i = 0; i < x.length; i++) {
  //       if (elmnt != x[i] && elmnt != inp) {
  //         x[i].parentNode.removeChild(x[i]);
  //       }
  //     }
  //   }
  //   /*execute a function when someone clicks in the document:*/
  //   document.addEventListener("click", function (e) {
  //     closeAllLists(e.target);
  //   });
  // }
  // autocomplete(document.getElementById("myInput"), kavaList);


});


