var major = [440,493.88,554.37,587.33,659.25,739.99,830.61,880];
var gBlues = [392,466.16,523.25,554.37,587.33,698.46,783.99,932.33,1046.5,1108.73,1174.66,1396.91,1567.98];

var noteLength;

var current = Math.floor(Math.random()*gBlues.length);
var triplet = 1;
var count = 1;
function initRandomThing(){
	//selfExplanatoryFunctionName
	noteLength = 150; //Note length in miliseconds **For Swing mode is the length of a single triplet note**
	setInterval(makeSound,noteLength);
}
function makeSound(){
	//random pitch UNCOMMENT LINE BELOW TO USE
	//startTone(Math.random()*400+100);
	
	//random note in A scale UNCOMMENT LINE BELOW TO USE
	//startTone(major[Math.floor(Math.random()*8)]) ;
	
	//random note in G BluesScale UNCOMMENT LINE BELOW TO USE
	//startTone(gBlues[Math.floor(Math.random()*gBlues.length)]) ;
	
	//-kind of- walking randomly up or down G Blues with swing(Plays on first and third triplet)
	if(triplet%3==1||triplet%3==0){
		startTone(gBlues[current]) ;
		if(current==0){
			current += 1;
		}else if (current==gBlues.length-1){
			current -= 1;
		}else{
			//randomly step up or down
			if(Math.random()>0.5){
				//step up
				current += 1;
			}else{
				current -= 1;
			}
		}
		
	}
	triplet += 1;
	

	
	
}