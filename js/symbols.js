(function($){
  $(function(){
    //Set up refresh on click
    $('#encoded').click(function() {
      location.reload();
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
    high = 26;
    base = Math.floor(Math.random()*(high-low+1))+low;


    var text = "t,h,a,n,k y,o,u!";
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
    //Write to html
    $('#encoded').text(text);
    console.log(text);

  });
})(jQuery);
