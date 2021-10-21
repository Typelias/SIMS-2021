import './Whiteboard.css';
import $  from 'jquery';
import React from 'react';
import * as signalR from '@microsoft/signalr';
import {useParams} from "react-router-dom";


function Whiteboard() {

    let {id} = useParams();
    console.log(id);
    if(!id){
        id =JSON.parse(window.localStorage.getItem('userInfo')).roomid;
    }

// Link
$(document).ready(function(){
  var board_url = window.location.href;
  $('.linkToBoard').attr("href",board_url);});

// Change cursor

$(document).ready(function(){
  $('#eraser-button').click(function () {
    if ($("#curs").hasClass('eraser')===false){
      $('#curs').removeClass('pen');
      $('#curs').addClass('eraser');} 
});
});

$(document).ready(function(){
  $('#pencil-button').click(function () {
    if ($("#curs").hasClass('pen')===false) 
    {
      $('#curs').removeClass('eraser');
      $('#curs').addClass('pen');} 
});
});

$(document).ready(function(){
  $('#rect-button').click(function () {
    if ($("#curs").hasClass('pen')===false) 
    {
      $('#curs').removeClass('eraser');
      $('#curs').addClass('pen');} 
});
});

$(document).ready(function(){
  $('#ellipse-button').click(function () {
    if ($("#curs").hasClass('pen')===false) 
    {
      $('#curs').removeClass('eraser');
      $('#curs').addClass('pen');} 
});
});

$(document).ready(function(){
  $('#line-button').click(function () {
    if ($("#curs").hasClass('pen')===false) 
    {
      $('#curs').removeClass('eraser');
      $('#curs').addClass('pen');} 
});
});

$(document).ready(function(){
  $('#text-button').click(function () {
    if ($("#curs").hasClass('pen')===false) 
    {
      $('#curs').removeClass('eraser');
      $('#curs').addClass('pen');} 
});
});

$(document).ready(function(){
  $('#note-button').click(function () {
    if ($("#curs").hasClass('pen')===false) 
    {
      $('#curs').removeClass('eraser');
      $('#curs').addClass('pen');} 
});
});


$(document).ready(function(){

  var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/whiteboard").build();
  var tools = {};
  var textarea;
  var textarean;
  var colorPicked;
  var lineWidthPicked;
  var SelectedFontFamily;


  var canvas, context, canvaso, contexto;
  document.getElementById("pencil-button").disabled = true;

  // The active tool instance
  var tool;
  var tool_default = 'pencil';

  connection.start().then(function () {
      document.getElementById("pencil-button").disabled = false;
      connection.invoke('JoinRoom',id);
  }).catch(function (err) {
      return console.error(err.toString());
  });


  function init () {

    // Find the canvas element
    canvaso = document.getElementById('imageView');
    
    if (!canvaso) {
      alert('Error: no canvas.getContext!');
      return;
    }

    if (!canvaso.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }

    // Add the temporary canvas
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');
    if (!canvas) {
      alert('Error: cannot create a new canvas element!');
      return;
    }

    canvas.id     = 'imageTemp';
    canvas.width  = canvaso.width;
    canvas.height = canvaso.height;
    container.appendChild(canvas);
    context = canvas.getContext('2d');

    // Get the tool select input
    var tool_select = document.getElementById('pencil-button');
    
    // Choose colour picker
    colorPicked = $("#colour-picker").val();
    
    $("#colour-picker").change(function(){
        colorPicked = $("#colour-picker").val();
    });
    
    // Choose line Width
    lineWidthPicked = $("#line-Width").val();
        
    $("#line-Width").change(function(){
        lineWidthPicked = $("#line-Width").val();
    });
    
    // SelectedFontFamily
    SelectedFontFamily = $("#draw-text-font-family").val();
    
    $("#draw-text-font-family").change(function(){
        SelectedFontFamily = $("#draw-text-font-family").val();
    })
    

    // Activate the default tool
    if (tools[tool_default]) {
        tool = new tools[tool_default]();
        tool_select.value = tool_default;
      }
    
    function pic_tool_click(pick){
        if (tools[pick.value]) {
          tool = new tools[pick.value]();
        }
    }
    
    $("#pencil-button").click(function(){
        pic_tool_click(this)
    });
    
    $("#rect-button").click(function(){
        pic_tool_click(this)
    });
    
     $("#eraser-button").click(function(){
        pic_tool_click(this);
    });
    
    $("#ellipse-button").click(function(){
        pic_tool_click(this)
    });
    
    $("#line-button").click(function(){
        pic_tool_click(this)
    });
    
    $("#text-button").click(function(){
        pic_tool_click(this)
    });
    
    $("#note-button").click(function(){
      pic_tool_click(this)
  });
  

    // Attach the mousedown, mousemove and mouseup event listeners

    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup',   ev_canvas, false);

    return container;
  }

    // The general-purpose event handler

  function ev_canvas (ev) {
      var CanvPos = canvas.getBoundingClientRect();  //Global Fix cursor position bug

    if (ev.clientX || ev.clientX === 0) { 
      ev._x = ev.clientX - CanvPos.left;
      ev._y = ev.clientY - CanvPos.top;
    } else if (ev.offsetX || ev.offsetX === 0) { 
    }
    
    // Call the event handler of the tool
    
    var func = tool[ev.type];
    if (func) func(ev);
  
  }

  
    // This function draws the #imageTemp canvas on top of #imageView, after which #imageTemp is cleared. 
    // This function is called each time when the user completes a drawing operation.
  function img_update(trans) {

		contexto.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);

        if (!trans) return; 
        connection.invoke('CopyCanvas', JSON.stringify({
          transferCanvas: true}));
  }
  
  function onCanvasTransfer(data){
            img_update();
    }
  
  connection.on('CopyCanvas', onCanvasTransfer);

  

  // The drawing pencil
    function drawPencil(x0, y0, x1, y1, color, linewidth, emit){
          context.beginPath();
          context.moveTo(x0, y0);
          context.lineTo(x1, y1);
          if(color)
              context.strokeStyle = "#"+color;
          else
              context.strokeStyle = "#"+colorPicked; 
          if(linewidth)
              context.lineWidth = linewidth;
          else
              context.lineWidth = lineWidthPicked;
          context.stroke();
          context.closePath();

          if (!emit) { return; }
          var w = canvaso.width;
          var h = canvaso.height;
          
          connection.invoke('Drawing', JSON.stringify({x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: colorPicked,
            lineThickness: lineWidthPicked}));
      }
      
      function onDrawingEvent(data){
        console.log("hello");
        data = JSON.parse(data);
          var w = canvaso.width;
          var h = canvaso.height;
          drawPencil(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.lineThickness);
      }
      
     connection.on('Drawing', onDrawingEvent);
    
      tools.pencil = function () {

          var tool = this;
          this.started = false;
          textarea.style.display = "none";
          textarea.style.value = "";

      // called when you start holding down the mouse button

          this.mousedown = function (ev) {
            tool.started = true; 
            tool.x0 = ev._x;
            tool.y0 = ev._y;
      };

          this.mousemove = function (ev) {
            if (tool.started) {
            drawPencil(tool.x0, tool.y0, ev._x, ev._y, colorPicked, lineWidthPicked, true);
            tool.x0 = ev._x;
            tool.y0 = ev._y;
        }
      };

      // called when you release the mouse button

          this.mouseup = function (ev) {
            if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
            img_update(true);
        }
      };
    };
    
  // Rectangle
  function drawRect(min_x, min_y, abs_x, abs_y, color, linewidth, emit){
          
            context.clearRect(0, 0, canvas.width, canvas.height); 
        if(color)

            context.strokeStyle = "#"+color;
        else

            context.strokeStyle = "#"+colorPicked; 

        if(linewidth)

            context.lineWidth = linewidth;
        else

            context.lineWidth = lineWidthPicked;

            context.strokeRect(min_x, min_y, abs_x, abs_y);
            
            if (!emit) { return; }

            var w = canvaso.width;
            var h = canvaso.height;

            connection.invoke('Rectangle', JSON.stringify({
              min_x: min_x / w,
              min_y: min_y / h,
              abs_x: abs_x / w,
              abs_y: abs_y / h,
              color: colorPicked,
              lineThickness: lineWidthPicked
            }));

           
        
    }
    
    function onDrawRect(data){
        data = JSON.parse(data);
        var w = canvaso.width;
        var h = canvaso.height;
        drawRect(data.min_x * w, data.min_y * h, data.abs_x * w, data.abs_y * h, data.color, data.lineThickness);
    }
    
   connection.on('Rectangle', onDrawRect);


  // The rectangle tool
    tools.rect = function () {
        var tool = this;
        this.started = false;
        textarea.style.display = "none";
        textarea.style.value = "";

    this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {

        if (!tool.started) {
        return;
      }

        var pos_x = Math.min(ev._x,  tool.x0),
            pos_y = Math.min(ev._y,  tool.y0),
            pos_w = Math.abs(ev._x - tool.x0),
            pos_h = Math.abs(ev._y - tool.y0);

      context.clearRect(0, 0, canvas.width, canvas.height); 

         if (!pos_w || !pos_h) {
         return;
      }
        
      drawRect(pos_x, pos_y, pos_w, pos_h, colorPicked, lineWidthPicked, true);
      
    };

    this.mouseup = function (ev) {
      
        if (tool.started) {

          tool.mousemove(ev);
          tool.started = false;
          img_update(true);
      }
    };
  };

  // Lines
   
  function drawLines(x0, y0, x1, y1, color, linewidth, emit){
          
          context.clearRect(0, 0, canvas.width, canvas.height); 
          context.beginPath();
          context.moveTo(x0, y0);
          context.lineTo(x1, y1);
          
          if(color)

            context.strokeStyle = "#"+color;

          else

            context.strokeStyle = "#"+colorPicked; 

         if(linewidth)

            context.lineWidth = linewidth;

          else

            context.lineWidth = lineWidthPicked;
          
          context.stroke();
          context.closePath();
          
            
          if (!emit) { return; }
          var w = canvaso.width;
          var h = canvaso.height;

          connection.invoke('LineDraw', JSON.stringify({
            x0: x0 / w,
            y0: y0 / h,
            x1: x1 / w,
            y1: y1 / h,
            color: colorPicked,
            lineThickness: lineWidthPicked
          }));
        
    }
    
    function onDrawLines(data){
        
      data = JSON.parse(data);
        var w = canvaso.width;  
        var h = canvaso.height;
        drawLines(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.lineThickness);

    }
    
    connection.on('Linedraw', onDrawLines);


      tools.line = function () {
        var tool = this;
        this.started = false;
        textarea.style.display = "none";
        textarea.style.value = "";
    
    
        this.mousedown = function (ev) {
          tool.started = true;
          tool.x0 = ev._x;
          tool.y0 = ev._y;
    };

        this.mousemove = function (ev) {
          if (!tool.started) {
          return;
          }
          drawLines(tool.x0, tool.y0, ev._x, ev._y, colorPicked, lineWidthPicked, true);

    };

        this.mouseup = function (ev) {
          if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
          img_update(true);
      }
    };
    
  };
  
  //The Eraser tool
  
  function drawEraser(x0, y0, x1, y1, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = "#fff"; 
    context.lineWidth = "40";
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvaso.width;
    var h = canvaso.height;

    connection.invoke('Eraser', JSON.stringify({
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: "#ff",
      lineThickness: "40"
    }));
}

function onEraserEvent(data){
    data = JSON.parse(data);
    var w = canvaso.width;
    var h = canvaso.height;
    drawEraser(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h);
}

connection.on('Eraser', onEraserEvent);



tools.eraser = function () {

    var tool = this;
    this.started = false;
    textarea.style.display = "none";
    textarea.style.value = "";

// called when you start holding down the mouse button

    this.mousedown = function (ev) {
      tool.started = true; 
      tool.x0 = ev._x;
      tool.y0 = ev._y;
};

    this.mousemove = function (ev) {
      if (tool.started) {
      drawEraser(tool.x0, tool.y0, ev._x, ev._y, true);
      tool.x0 = ev._x;
      tool.y0 = ev._y;
  }
};

// called when you release the mouse button

    this.mouseup = function (ev) {
      if (tool.started) {
      tool.mousemove(ev);
      tool.started = false;
      img_update(true);
  }
};
};
  
  //Ellipse Tool 
  

  function drawEllipse(x, y, w, h, color, linewidth, emit){
      
    context.clearRect(0, 0, canvas.width, canvas.height); 
    var ox, oy, xe, ye, xm, ym;
    var kappa = .5522848;

      ox = (w / 2) * kappa; // control point offset horizontal
      oy = (h / 2) * kappa; // control point offset vertical
      xe = x + w;           // x-end
      ye = y + h;           // y-end
      xm = x + w / 2;       // x-middle
      ym = y + h / 2;       // y-middle
 
      context.beginPath();
      context.moveTo(x, ym);
      context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      context.closePath();
    
        if(color)
            context.strokeStyle = "#"+color;
        else
            context.strokeStyle = "#"+colorPicked; 
        if(linewidth)
            context.lineWidth = linewidth;
        else
            context.lineWidth = lineWidthPicked;  
            context.stroke();
        
            
          if (!emit) { return; }

          connection.invoke('Ellipsedraw', JSON.stringify({
              x: x,
              y: y,
              w: w,
              h: h,
              color: colorPicked,
              lineThickness: lineWidthPicked
            }));
    
  }
  
    
    function onDrawEllipse(data){
        data = JSON.parse(data);
        drawEllipse(data.x, data.y, data.w, data.h, data.color, data.lineThickness);
    }
    
    connection.on('Ellipsedraw', onDrawEllipse);

    tools.ellipse = function () {
      var tool = this;
      this.started = false;
      textarea.style.display = "none";
      textarea.style.value = "";
    
    
      this.mousedown = function (ev) {
        tool.started = true;
        tool.x0 = ev._x;
        tool.y0 = ev._y;
      };

      this.mousemove = function (ev) {
        if (!tool.started) {
        return;
      }
      
      var x = Math.min(ev._x, tool.x0);
	    var y = Math.min(ev._y, tool.y0);
		  var w = Math.abs(ev._x - tool.x0);
		  var h = Math.abs(ev._y - tool.y0);
      
      context.clearRect(0, 0, canvas.width, canvas.height); 
      drawEllipse(x, y, w, h, colorPicked, lineWidthPicked, true);

    };

      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
          img_update(true);
        }
    };
    
  };
  
  
  
  
 //Text Tool start
 
textarea = document.createElement('textarea');
textarea.id = 'text_tool';
textarea.autofocus = true;
init().appendChild(textarea);


// Text tool's text container for calculating lines/chars
var tmp_txt_ctn = document.createElement('div');
tmp_txt_ctn.style.display = 'none';
init().appendChild(tmp_txt_ctn);

function DrawText(fsize, ffamily, colorVal, textPosLeft, textPosTop, processed_lines, emit){
        context.font = fsize + ' ' + ffamily;
        context.textBaseline = 'top';
        context.fillStyle = "#"+colorVal;
         
        for (var n = 0; n < processed_lines.length; n++) {
            var processed_line = processed_lines[n];
             
            context.fillText(
                processed_line,
                parseInt(textPosLeft),
                parseInt(textPosTop) + n*parseInt(fsize)
            );
        }
        
        img_update(); 
        
        if (!emit) { return; }

        connection.invoke('Textdraw', JSON.stringify({
              fsize: fsize,
              ffamily: ffamily,
              colorVal: colorVal,
              textPosLeft: textPosLeft,
              textPosTop: textPosTop,
              processed_linesArray: processed_lines 
            }));
      
}

 function onTextDraw(data){
        data = JSON.parse(data);
        DrawText(data.fsize, data.ffamily, data.colorVal, data.textPosLeft, data.textPosTop, data.processed_linesArray);
    }
    
    connection.on('Textdraw', onTextDraw);
    


tools.text = function () {
    var tool = this;
    this.started = false;
    textarea.style.display = "none";
    textarea.style.value = "";

    
    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
      tool.mousemove(ev);
    };

   this.mousemove = function (ev) {
        if ((!tool.started) || (tool.mouseup(ev))){
        return;
      }
        var x = Math.min(ev._x, tool.x0);
        var y = Math.min(ev._y, tool.y0);
        var width = 200;
        var height = 200;
         
        textarea.style.left = x + 'px';
        textarea.style.top = y + 'px';
        textarea.style.width = width + 'px';
        textarea.style.height = height + 'px';
        
        textarea.style.whiteSpace  = 'pre';
       
        textarea.style.display = 'block';
        textarea.style.color = "#"+colorPicked;
      }; 

    this.mouseup = function (ev) {
          if (tool.started) {
              
                //start      
                var lines = textarea.value.split('\n');
                var processed_lines = [];
                
                for (var i = 0; i < lines.length; i++) {
                    var chars = lines[i].length;
             
                        for (var j = 0; j < chars; j++) {
                            var text_node = document.createTextNode(lines[i][j]);
                            tmp_txt_ctn.appendChild(text_node);
                             

                            tmp_txt_ctn.style.position   = 'absolute';
                            tmp_txt_ctn.style.visibility = 'hidden';
                            tmp_txt_ctn.style.display    = 'block';
                             
                            var width = tmp_txt_ctn.offsetWidth;

                            tmp_txt_ctn.style.position   = '';
                            tmp_txt_ctn.style.visibility = '';
                            tmp_txt_ctn.style.display    = 'none';
                        
                            if (width > parseInt(textarea.style.width)) {
                                break;
                            }
                        }


                    processed_lines.push(tmp_txt_ctn.textContent);
                    tmp_txt_ctn.innerHTML = '';
                }
             
                var fs = "16px";
                var ff = SelectedFontFamily; 
                
                DrawText(fs, ff, colorPicked, textarea.style.left, textarea.style.top, processed_lines, true)
                textarea.style.display = 'none';
                textarea.value = '';
                          
            //end
                      
            tool.started = false;
            
          }
    };
    
  };
  
//Text tool end

 //Note Tool start
 
 textarean = document.createElement('textarea');
 textarean.id = 'textn_tool';
 init().appendChild(textarean);

 /**setTimeout(function() {
  $('#textn_tool').autofocus();
}, 0);**/
 
 // Note tool's text container for calculating lines/chars
 var tmp_txt_ctnn = document.createElement('div');
 tmp_txt_ctnn.style.display = 'none';

 init().appendChild(tmp_txt_ctnn);
 
 function DrawNote(fsize, ffamily, colorVal, textPosLeft, textPosTop, processed_lines, emit){


         context.fillStyle = "red";
         context.fillRect(100, 111, 200, 200);

         context.font = fsize + ' ' + ffamily;
         context.textBaseline = 'top';
         context.fillStyle = "#"+colorVal;
          
         for (var n = 0; n < processed_lines.length; n++) {
             var processed_line = processed_lines[n];
              
             context.fillText(
                 processed_line,
                 parseInt(textPosLeft),
                 parseInt(textPosTop) + n*parseInt(fsize)
             );
         }
         
         img_update(); //Already emitting no need true param


         
         if (!emit) { return; }
 
         connection.invoke('Notedraw', JSON.stringify({
               fsize: fsize,
               ffamily: ffamily,
               colorVal: colorVal,
               textPosLeft: textPosLeft,
               textPosTop: textPosTop,
               processed_linesArray: processed_lines 
             }));
       
 }
 
  function onNoteDraw(data){
         data = JSON.parse(data);
         DrawNote(data.fsize, data.ffamily, data.colorVal, data.textPosLeft, data.textPosTop, data.processed_linesArray);
     }
     
     connection.on('Notedraw', onNoteDraw);
     
 
 
 tools.note = function () {
     var tool = this;
     this.started = false;
     textarean.style.display = "none";
     textarean.style.value = "";
 
     
     this.mousedown = function (ev) {
       tool.started = true;
       tool.x0 = ev._x;
       tool.y0 = ev._y;
       tool.mousemove(ev);
     };
 
    this.mousemove = function (ev) {
         if ((!tool.started) || (tool.mouseup(ev))){
         return;
       }
         var x = Math.min(ev._x, tool.x0);
         var y = Math.min(ev._y, tool.y0);
         var width = 200;
         var height = 200;
          
         textarean.style.left = x + 'px';
         textarean.style.top = y + 'px';
         textarean.style.width = width + 'px';
         textarean.style.height = height + 'px';
         
         textarean.style.whiteSpace  = 'pre';
  
        
         textarean.style.display = 'block';
         textarean.style.color = "#"+colorPicked;
         textarean.style.border = "solid";

       }; 
 
     this.mouseup = function (ev) {
           if (tool.started) {
               
                 //start      
                 var lines = textarean.value.split('\n');
                 var processed_lines = [];
                 
                 for (var i = 0; i < lines.length; i++) {
                     var chars = lines[i].length;
              
                         for (var j = 0; j < chars; j++) {
                             var text_node = document.createTextNode(lines[i][j]);
                             tmp_txt_ctn.appendChild(text_node);
                              
 
                             tmp_txt_ctnn.style.position   = 'absolute';
                             tmp_txt_ctnn.style.visibility = 'hidden';
                             tmp_txt_ctnn.style.display    = 'block';

                             var width = tmp_txt_ctnn.offsetWidth;
 
                             tmp_txt_ctnn.style.position   = '';
                             tmp_txt_ctnn.style.visibility = '';
                             tmp_txt_ctnn.style.display    = 'none';
                             

                             if (width > parseInt(textarean.style.width)) {
                                 break;
                             }
                         }
 
 
                     processed_lines.push(tmp_txt_ctnn.textContent);
                     tmp_txt_ctnn.innerHTML = '';
                 }
              
                 var fs = "16px";
                 var ff = SelectedFontFamily; 
                

                 DrawNote(fs, ff, colorPicked, textarean.style.left, textarean.style.top, processed_lines, true)
                 textarean.style.display = 'none';
                 textarean.value = '';
                           
             //end
                       
             tool.started = false;
             
           }
     };
     
   };
   
   //Text tool end
  
function clearAll_update(trans) {
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    contexto.clearRect(0, 0, canvaso.width, canvaso.height);
      
    if (!trans) return; 

    connection.invoke('Clearboard', JSON.stringify({CleardrawingBoard: true}));
  }
  
function onClearAll(data){
      data = JSON.parse(data); 
      clearAll_update();
    }
  
connection.on('Clearboard', onClearAll);

$("#clear-all").click(function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    contexto.clearRect(0, 0, canvaso.width, canvaso.height);
    clearAll_update(true)
});


init();

});


// Layout 
return (
  <div className="container">
      <div className = "container panel">
      <button type="button" className="btn btn-warning btn-sm" value="pencil" id="pencil-button">Pencil</button>
      <button type="button" className="btn btn-warning btn-sm" value="rect" id="rect-button">Rectangle</button>
      <button type="button" className="btn btn-warning btn-sm" value="eraser" id="eraser-button">Eraser</button>
      <button type="button" className="btn btn-warning btn-sm" value="ellipse" id="ellipse-button">Ellipse</button>
      <button type="button" className="btn btn-warning btn-sm" value="line" id="line-button">Line</button>
      <button type="button" className="btn btn-warning btn-sm" value="text" id="text-button">Text</button>
      <button type="button" className="btn btn-warning btn-sm" value="text" id="note-button">Note</button>
      <button type="button" className="btn btn-warning btn-cler" id="clear-all">Clear All</button>


      <span className="form-group">
        <label>Color: </label>
        <select className="form-control" id="colour-picker">
          <option value="000000" defaultValue style={{backgroundColor: "#000000", color: "white"}}>Black</option>
          <option value="a31818" style={{backgroundColor: "#a31818", color: "white"}}>Red </option>
          <option value="2a2c9f" style={{backgroundColor: "#2a2c9f", color: "white"}}>Blue</option>
          <option value="9f2a8b" style={{backgroundColor: "#9f2a8b", color: "white"}}>Purple</option>
          <option value="ffbf06" style={{backgroundColor: "#ffbf06", color: "white"}}>Yellow</option>
          <option value="038331" style={{backgroundColor: "#038331", color: "white"}}>Green</option>
        </select>
      </span>


      <span className="form-group">
        <label>Thickness: </label>
        <select className="form-control" id="line-Width">
          <option>2</option>
          <option>4</option>
          <option>6</option>
          <option>8</option>
          <option>10</option>
          <option>12</option>
          <option>14</option>
        </select>
      </span>
       <span className="form-group">
        <label>Font: </label>
        <select className="form-control" id="draw-text-font-family">
          <option value="Arial" defaultValue>Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="serif">serif</option>
          <option value="sans-serif">sans-serif</option>
        </select>
      </span>
    </div>
      <div id="container">
        <div id = "curs" className = "pen">
        <canvas id="imageView" width="1400" height="720">
          <p>Unfortunately, your browser is currently unsupported by our web
          application</p>
          <p>Supported browsers: <a href="http://www.opera.com">Opera</a>, <a
            href="http://www.mozilla.com">Firefox</a>, <a
            href="http://www.apple.com/safari">Safari</a>, and <a
            href="http://www.konqueror.org">Konqueror</a>.</p>
        </canvas>
      </div>
      </div>
  </div>
);
}

export default Whiteboard;
