var linespacing = 9.0;
var margin = 40;
var noteoffset = 2;
var cursorzero = margin + 55;
var cursormax = 0; //determined by canvas width
var downstemheight = 20;
var upstemheight = 10;
var voice_choices = ['1', '2'];
var grouping_choices = ['Whole Kit', 'Hands/Feet', 'Cymbals/Drums']

cursor = {
  line: 0,
  position: cursorzero
}

$( document ).ready(function() {
      draw = canvasManager();
      draw.loadingMessage();
      setTimeout(function(){
        draw.clear();
        draw.makeLine();
        draw.drawDownStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.bassdrum1);
        draw.drawNote(cursor.position, 100*draw.getLines() - 24 - noteheight.sidestick);
        draw.makeLine();
        draw.drawDownStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.bassdrum1);
        draw.drawNote(cursor.position, 100*draw.getLines() - 24 - noteheight.sidestick);
        // draw.drawDownStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.acousticbassdrum);
        // draw.drawDownStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.lowfloortomtom);
        // draw.drawDownStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.highfloortomtom);
        // draw.drawDownStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.lowtomtom);
        // draw.drawStemNote(cursor.position, 100*draw.getLines() - 24 - noteheight.tambourine);
        // draw.drawStemNote(cursormax, 49);
      }, 1000);
});

//unicode hex for symbols
symbols = {
  upstem: '\u{1D165}',
  filledhead: '\u{1D158}',
  openhead: '\u{1D157}',
  xhead: 0,
  filledtrianglehead: '\u{1D249}',
  opentrianglehead: '\u{1D248}',
  quarter: '\u{1D158}',
  drumstaff: '\u{1D126}'
}

//gaps between notes in pixels
notespacing = {
  whole: 160,
  quarter: 40,
  eight: 20,
  sixteenth: 10
}

//vertical displacement for notes
noteheight = {
  pedalhihat: 0,
  bassdrum1: 1*4.5,
  acousticbassdrum: 2*4.5,
  lowfloortomtom: 3*4.5,
  highfloortomtom: 4*4.5,
  lowtomtom: 5*4.5,
  tambourine: 6*4.5,
  acousticsnare: 7*4.5,
  electricsnare: 8*4.5,
  lowwoodblock: 9*4.5,
  sidestick: 10*4.5,
  lowmidtomtom: 11*4.5,
  highmidtomtom: 12*4.5,
  cowbell: 13*4.5,
  hightomtom: 14*4.5,
  ridecymbal1: 15*4.5,
  closedhihat: 16*4.5,
  openhihat: 17*4.5,
  crashcymbal1: 18*4.5,
  opentriangle: 19*4.5,
}

function canvasManager(){
  var canvas = $( "#canvas" ).get(0);
  var ctx = canvas.getContext("2d");
  ctx.font = "45px MusicaRegular";
  var width = canvas.width;
  var height = canvas.height;
  cursormax = width - margin - 20;
  var lines = 0;

  return{
    makeLine: function(){
      start = lines*100 + margin;
      for(i = 0; i < 5; i++){
        ctx.beginPath();
        ctx.moveTo(margin,start + i*linespacing);
        ctx.lineTo(width - margin,start + i*linespacing);
        ctx.stroke();
      }
      ctx.fillText(symbols.drumstaff, margin + 35, 100*lines + 31.5 + margin)
      ctx.font = "26px MusicaRegular";
      ctx.fillText(4, margin + 25, 100*lines + 31.5 - 13 + margin)
      ctx.fillText(4, margin + 25, 100*lines + 31.5 + 5 + margin)
      ctx.font = "45px MusicaRegular";
      lines++;
    },

    removeLine: function(){
      ctx.clearRect(0, 100*lines+margin, canvas.width, 50);
      lines--;
    },

    clear: function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines = 0;
    },

    drawNote : function(x, y){
      ctx.fillText(symbols.quarter, x, y);
      ctx.beginPath();
      ctx.moveTo(x+10,y+1);
      ctx.lineTo(x+10,100*(lines-1) + upstemheight);
      ctx.stroke();
      cursor.position += notespacing.quarter;
    },

    drawDownStemNote : function(x, y){
      ctx.fillText(symbols.quarter, x, y);
      ctx.beginPath();
      ctx.moveTo(x+2,y+4);
      ctx.lineTo(x+2,100*(lines) + 4);
      ctx.stroke();
      cursor.position += notespacing.quarter;
    },

    getLines : function(){
      return lines;
    },

    loadingMessage : function(){
      ctx.fillText('Loading Resources...', 220, 100);
    }
  }
}
