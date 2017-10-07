var symbols;
var low, high, base;

var data;
var data_ind;

var first_time;

(function($){
  $(function(){
    //init message sequences
    data = [
      ['e,m,l','n,a,k,h,t','W<b>e</b>lcome to my dyna<b>m</b>ically generated encoding puzz<b>l</b>e!'],//to-be-encoded1, to-be-encoded2, display-message
      ['b,c','u,y,o','Can you &nbsp;<b>b</b>reak the &nbsp;<b>c</b>ode?'],
      ['f,h,d,a','o,r,f','I wonder i<b>f</b>&nbsp; it has anyt<b>h</b>ing to &nbsp;<b>d</b>o with these mess<b>a</b>ges...'],
      ['j,k,i,g','t,i,g,s,i,v,i,n','&nbsp;<b>J</b>o<b>k</b>es aside, &nbsp;<b>I</b>&nbsp; hope you like ana<b>g</b>rams!']
    ]
    data_ind = 0;
    first_time = true;


    //Set up refresh on click
    $('#encoded').click(function() {
      if (data_ind==0 && first_time){
        $(this).removeClass("faded-text");
        setTimeout(help_stuck, 7000);
      }
      

      //encode_to_screen("t,h,a,n,k y,o,u!");
      Materialize.toast(data[data_ind][2], 4000);
      first = encode(data[data_ind][0]);
      second = encode(data[data_ind][1]);
      $('#encoded').html(first + ' <span class="yellow-text">' + second + '</span>');

      data_ind += 1;
      if (data_ind == data.length){data_ind = 0; first_time = false;}
    });

    $("#encoded").hover(function() {
      $(this).css('cursor','pointer');
    }, function() {
        $(this).css('cursor','auto');
    });

    //convert text to random base, and eventually symbols
    
    //setup symbols
    symbols = ['☂','✈','☀','☁','★','☎','✖','⚑','⚖','✎','✒','✚','✥','✦','✱','✸','✿','☘','♛','♜','♞','☗','♣','♦','⚈','⏏']
    
    //scramble symbols
    var t;
    for (var k = 0; k<500; k++){
      i = Math.floor(Math.random()*symbols.length);
      j = Math.floor(Math.random()*symbols.length);
      //swap
      t = symbols[i]
      symbols[i] = symbols[j]
      symbols[j] = t
    }

    //decide base
    low = 6;
    high = 12;
    base = Math.floor(Math.random()*(high-low+1))+low;


    
  });
})(jQuery);


function encode(message){
  var text = message;
  
  //convert to array
  text = text.split("");
  for (var i = 0; i < text.length; i++){
    if (text[i] == " "){
      //enlarge spaces to accomodate oversized characters
      text[i] = "\xa0\xa0\xa0"
    }else if (text[i] == "'" || text[i] == "." || text[i] == "," ||  text[i] == "!"){
      //ignore punctuation
    }else{
      var value = text[i].charCodeAt(0)-97;

      var temp = value.toString(base);
      var encodedChar = "";
      for (var j = 0; j < temp.length; j++){
        encodedChar += symbols[parseInt(temp[j],base)]
      }
      
      text[i] = encodedChar;
    }
  }

  text = text.join("")
  return text;
}

function help_stuck(){
  if (data_ind == 1 && first_time){
    Materialize.toast("*psst* try clicking on the puzzle again", 4000);
  }
}


function encode_to_screen(message){
  var text = message;

  //convert to array
  text = text.split("");
  for (var i = 0; i < text.length; i++){
    if (text[i] == " "){
      //enlarge spaces to accomodate oversized characters
      text[i] = "\xa0\xa0\xa0"
    }else if (text[i] == "'" || text[i] == "." || text[i] == "," ||  text[i] == "!"){
      //ignore punctuation
    }else{
      var value = text[i].charCodeAt(0)-97;

      var temp = value.toString(base);
      var encodedChar = "";
      for (var j = 0; j < temp.length; j++){
        encodedChar += symbols[parseInt(temp[j],base)]
      }
      
      text[i] = encodedChar;
    }
  }

  text = text.join("");
  //Write to html
  $('#encoded').text(text);
}