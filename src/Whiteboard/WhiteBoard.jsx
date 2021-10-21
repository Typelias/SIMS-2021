import './Whiteboard.css';
import $  from 'jquery';
import Canvas from './canvas';
import React from 'react';


function Whiteboard() {

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
  Canvas();
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
