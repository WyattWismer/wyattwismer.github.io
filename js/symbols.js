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

    if (!window.mobilecheck){
      $("#encoded").remove();
    }
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

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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