/*
----DEVELOPMENT NOTES----
Images constructed from this algorithm appear relatively gray, tend to move almost entirely in grayscale with only the smallest splashes of color. At first this puzzles me greatly, after giving it some thought the only conslusion I could come up with was that the faded alpha values were resulting in dimished colors. In reality, the truth was far more mundane. I blindly operated under the assumption that the ASCII characters I was entering into my algorithm were random in nature. In reality of course the characters were the alphabet characters and thus occur with a tight range of the ascii chart. Furthmore the test data I used involed sequencing characters with incremented index values in the ASCII chart(a,b,c,d,etc) thus since the RGB values provided were so similar the supremecy of graycale was unavoidable. I believe the best way to achieve an even distribution would be to make use of a hashing but in doing so any reversibility is lost. Text could be converted to images but the images could never be converted back from the text which they came. Despite this such a project is still interesting. In the classic usage of hashes to compare the validity of files there would be no need to compare hashes character by character as a single color could suffice. 
*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  data[0] = (data[0] + 110)%255;
  data[1] = (data[1] + 110)%255;
  data[2] = (data[2] + 110)%255;
  //data[3] = (data[3] + 110)%255;
  data[3] = 255;
  ctx.putImageData(pixel, x, y);
}

function updateImage(){
	var pixelValues = [];
	//Identify using ACSII
	var inputT = document.getElementById("inputText").value;
	for(var i = 0; i<inputT.length; i++){
		pixelValues.push(inputT.charCodeAt(i));
	}
	//testing
	//console.log("LINK STARTTTTTT");
	/*for(var a = 0; a<pixelValues.length; a++){
		console.log(pixelValues[a]);
	}*/
	
	var offset = 0;
	var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
	var data = imageData.data;
	for(var j = 0; j<pixelValues.length; j++){
		//EX: [R0,G1,B2,A3,R4,G5]
		
		if ((j+offset+1)%4 === 0){
			//console.log("DID THIS REALLY WOOOOOOOOOOOOORK?")
			data[j+offset] = 255;
			offset += 1;
		}
		data[j+offset] = pixelValues[j]*2;
	}
	console.log(data);
	ctx.putImageData(imageData, 0, 0);
	
	//console.log("LINK STOPPPPPP");
}
