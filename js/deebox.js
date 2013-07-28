/*
 * deebox.js
 * author: Duong Le
 * duong.thai.le@gmail.com
 * 
 * 
 */

var default_display = {
	'start_x' : 200,
	'start_y' : 36,
	'delta_x' : 11.5,
	'delta_y' : 11.25,
	'radius' : 5,
	'staffWidth' : 3,
	'staffSmallWidth' : 1,
	'gridWidth' : 23,
	'canvas_width':4000,
	'canvas_height':232,
	'tail_pixels':100
};

var NOTES_LINES = 14;

var displaySetting = jQuery.extend(true, {}, default_display);;

//var START_X = displaySetting.start_x;
var START_Y = displaySetting.start_y;

var RECT_HEIGHT = displaySetting.delta_y * NOTES_LINES;

var saveState = [];
var savePoints = [];

var marker = null;
var endMarker = null;

var history = [];

var savedImage = c.getImageData(0, 0, displaySetting.canvas_width, displaySetting.canvas_height);

var notes = ['C','B','A','G','F','E','D','C'];
var xmlNotes = ['C','B','A','G','F','E','D','C','B','A','G','F','E','D','C'];
var nsong1 = '0,10|0,14|2,12|6,10|8,7|10,6|12,5|12,10|12,14|14,10|14,3|16,14|18,10|18,5|20,7|20,14|22,12|22,3|22,7|24,10|24,14|26,10|28,14|30,10|32,14|32,7|34,6|34,12|36,14|36,10|36,5|38,10|38,5|40,14|40,5|42,10|42,4|44,14|44,5|46,10|48,14|48,10|50,10|50,5|52,14|52,6|54,7|54,3|56,14|56,6|58,10|58,7|60,7|60,14|62,10|62,12|64,3|66,10|66,3|66,12|70,3|70,12|72,2|72,14|72,10|74,10|74,1|74,12|76,0|78,10|78,12|80,3|82,3|82,12|84,14|86,10|86,6|88,14|88,3|90,10|90,2|92,14|94,10|94,6|96,14|96,3|98,10|98,7|100,14|102,10|102,3|104,14|104,3|106,10|106,7|108,3|108,9|110,9|110,12|110,5|112,9|114,12|114,8|116,14|116,7|118,6|118,9|120,5|120,10|120,14|122,10|122,3|124,14|126,10|126,5|128,7|128,14|130,12|130,3|130,7|132,10|132,14|134,10|136,14|138,10|140,14|140,7|142,6|142,12|144,14|144,10|144,5|146,10|146,5|148,14|148,5|150,10|150,4|152,14|152,5|154,10|156,14|156,10|158,10|158,5|160,14|160,6|162,7|162,3|164,14|164,6|166,10|166,7|168,7|168,14|170,10|170,12|172,3|174,10|174,3|174,12|178,3|178,12|180,2|180,14|182,10|182,1|182,12|184,0|186,10|186,12|188,3|190,3|190,12|192,14|194,10|194,6|196,14|196,3|198,10|198,2|200,14|202,10|202,6|204,14|204,3|206,10|206,7|208,14|210,10|210,3|212,14|212,3|214,10|214,7|216,3|216,11|218,5|218,11|218,12|220,11|222,12|222,7|224,8|226,14|227,10|228,7|';
var nsong2 = {'xml':'<?xml version="1.0" encoding="UTF-8" standalone="no"?><score-partwise><work><work-title/></work><identification><encoding><software>TuxGuitar</software></encoding><creator type="composer"/></identification><part-list><score-part id="P1"><part-name>Track 1</part-name><score-instrument id="P1-I1"><instrument-name>Syn Brass 1</instrument-name></score-instrument><midi-instrument id="P1-I1"><midi-channel>1</midi-channel><midi-program>63</midi-program></midi-instrument></score-part></part-list><part id="P1"><measure number="1"><attributes><divisions>960</divisions><key><fifths>0</fifths><mode>major</mode></key><clef><sign>G</sign><line>2</line></clef><time><beats>4</beats><beat-type>4</beat-type></time><staff-details><staff-lines>6</staff-lines><staff-tuning line="1"><tuning-step>E</tuning-step><tuning-octave>3</tuning-octave></staff-tuning><staff-tuning line="2"><tuning-step>A</tuning-step><tuning-octave>3</tuning-octave></staff-tuning><staff-tuning line="3"><tuning-step>D</tuning-step><tuning-octave>4</tuning-octave></staff-tuning><staff-tuning line="4"><tuning-step>G</tuning-step><tuning-octave>4</tuning-octave></staff-tuning><staff-tuning line="5"><tuning-step>B</tuning-step><tuning-octave>4</tuning-octave></staff-tuning><staff-tuning line="6"><tuning-step>E</tuning-step><tuning-octave>5</tuning-octave></staff-tuning></staff-details></attributes><direction placement="above"><sound tempo="120"/></direction><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="2"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="3"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="4"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="5"><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="6"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="7"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="8"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="9"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>6</octave></pitch><notations><technical><fret>10</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="10"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>6</octave></pitch><notations><technical><fret>10</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="11"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>6</octave></pitch><notations><technical><fret>10</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="12"><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><rest/><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><rest/><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="13"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="14"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="15"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="16"><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>3</octave></pitch><notations><technical><fret>0</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="17"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>6</octave></pitch><notations><technical><fret>8</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="18"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>E</step><octave>5</octave></pitch><notations><technical><fret>0</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>4</octave></pitch><notations><technical><fret>3</fret><string>5</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="19"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>A</step><octave>5</octave></pitch><notations><technical><fret>5</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>G</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>B</step><octave>5</octave></pitch><notations><technical><fret>7</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note></measure><measure number="20"><note><pitch><step>D</step><octave>4</octave></pitch><notations><technical><fret>0</fret><string>4</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>A</step><octave>4</octave></pitch><notations><technical><fret>2</fret><string>3</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type><chord/></note><note><pitch><step>C</step><octave>5</octave></pitch><notations><technical><fret>1</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>D</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>2</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><pitch><step>G</step><octave>5</octave></pitch><notations><technical><fret>3</fret><string>1</string></technical></notations><voice>1</voice><duration>480</duration><type>eighth</type></note><note><rest/><voice>1</voice><duration>480</duration><type>eighth</type></note><note><rest/><voice>1</voice><duration>480</duration><type>eighth</type></note><note><rest/><voice>1</voice><duration>480</duration><type>eighth</type></note><note><rest/><voice>1</voice><duration>480</duration><type>eighth</type></note></measure></part></score-partwise>'};

var store = new MusicStore();

var DISPLAY_GRID = true;

function DeeBox() {
	this.DISPLAY_GRID = true;
	this.displaySetting = default_display;
	this.highlightMode = false;
	this.doCopy = false;
	
	this.init = function() {
		
	}
	
	this.setConfiguration = function(settings) {
		this.displaySetting = settings;
	}
}

function saveData() {
	c.getImageData(0, 0, displaySetting.canvas_width, displaySetting.canvas_height);
}

function getImageData() {
	return c.getImageData(0, 0, displaySetting.canvas_width, displaySetting.canvas_height);
}

function restoreImageData(data) {
	c.putImageData(data, 0, 0);
}

function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

function drawCircle(c, x, y, rad) {
	c.beginPath();
	c.arc(x, y, rad, 0, getRadians(360), true);
	c.fillStyle = "#8ED6FF";
	c.fill();
	c.lineWidth = 2;
	c.strokeStyle = "black";
	c.stroke();
}

function clickStrip(e) {

	/* coordinates offset from canvas for click */
	var lockedPoint = getLockedCoordinate(e);

	if (!lockedPoint) {
		return;
	}

	var newX = lockedPoint.x - displaySetting.start_x;
	var newY = lockedPoint.y - displaySetting.start_y
	
	// coordinate starting at top left corner of grid
	var newPoint = new Point(newX / displaySetting.delta_x,newY / displaySetting.delta_y);

	if(e.shiftKey) {
		if(marker !== undefined || marker !== null) {
			redraw();
			marker = null;
			endMarker = null;
		}
		drawMarker(newPoint.x)
		marker = parseInt(newPoint.x);
		deebox.highlightMode = true;
	} else if (deebox.highlightMode) {
		endMarker = newPoint.x;

		if (endMarker < marker) {
			var tmp = endMarker;
			endMarker = marker;
			marker = tmp;
		}
		
		// same start and end
		if (marker == endMarker) {
			resetMarkers();
		}
		
		document.getElementById('markerLabel').innerHTML = marker + ' - ' + endMarker;
		deebox.highlightMode = false;
	} else if (deebox.doCopy) {
		doCopy(e);
		deebox.doCopy = false;
	}
	else {
		if ((marker != null || endMarker != null) && history.length) {
			//restoreLast();
			doRefresh();
		} else {
			saveHistory();
		}
		if (marker || endMarker) {
			resetMarkers();
		}
		if(!store.exists(newPoint)) {
			drawCircle(c, lockedPoint.x, lockedPoint.y, displaySetting.radius);
			store.add(newPoint);
		} else {
			store.remove(newPoint);
			redraw();
		}
		
	}
}

function saveHistory() {
	history.push({'coordinates':jQuery.extend(true, {}, store),'imageData':getImageData()});
}

function restoreLast() {
	if (history.length) {
		restoreHistory(history.length-1);
	}
}

function restoreHistory(index) {
	var tmp = history[index];
	store = tmp.coordinates;
	c.putImageData(tmp.imageData, 0, 0);
	history = history.slice(0,-1);
}

function redraw() {
	displaySetting.canvas_width = displaySetting.gridWidth * $('input[name=timeSignature]:checked').val() * $('#measureCount').val() + displaySetting.start_x + displaySetting.tail_pixels;
	canvas.width = displaySetting.canvas_width;
	canvas.width = canvas.width;
	drawGrid();

	store.each(function(point) {
		drawCircle(c, point.x * displaySetting.delta_x + displaySetting.start_x, point.y * displaySetting.delta_y + START_Y, displaySetting.radius);
	});
}

function drawGrid() {
	
	var quarterNotesPerMeasure = $('input[name=timeSignature]:checked').val();
	var HALF_HEIGHT = parseInt(canvas.height) / 2;
	// draw arc
	c.beginPath();
	c.arc(HALF_HEIGHT,HALF_HEIGHT ,HALF_HEIGHT,getRadians(270),getRadians(90), true);
	c.strokeStyle = "black";
	c.stroke();

	// draw triangle
	c.beginPath();
	// Start from the top-left point.
	var triangleStartX = 20;
	var triangleHeight = HALF_HEIGHT / 4;
	c.moveTo(triangleStartX, HALF_HEIGHT); // give the (x,y) coordinates
	c.lineTo(triangleStartX + triangleHeight, HALF_HEIGHT - triangleHeight/2);
	c.lineTo(triangleStartX + triangleHeight, HALF_HEIGHT + triangleHeight/2);
	c.fill();
	c.stroke();
	c.closePath();
	
	// do not draw rest of grid
	if (!DISPLAY_GRID) return;
	
	c.strokeStyle = 'black';
	c.lineWidth = 2;

	var nLcanvas = document.getElementById('notesLabel');
	var context = nLcanvas.getContext('2d');
	nLcanvas.width = nLcanvas.width;
	nLcanvas.height = canvas.height;
	nLcanvas.style.top = $(canvas).offset().top - document.body.scrollTop + 'px';

	var BARS = $('#measureCount').val();

	for(var i = 0; i <= NOTES_LINES; i++) {
		c.strokeStyle = ((i % 2 === 0) && i >= 4 && i <= 12) ? 'green' : 'black';
		c.lineWidth = ((i % 2 === 0) && i >= 4 && i <= 12) ? displaySetting.staffWidth : displaySetting.staffSmallWidth;
		c.beginPath();
		c.moveTo(0 + displaySetting.start_x, i * displaySetting.delta_y + START_Y);
		c.lineTo(displaySetting.delta_x * BARS * quarterNotesPerMeasure * 2 + displaySetting.start_x, i * displaySetting.delta_y + START_Y);
		c.stroke();

		var noteIndex = (i < 7) ? i : i - 7;
		//console.log(noteIndex + ' = ' + notes[noteIndex]);
		c.font = 8 * $('#factor').val()+"pt Calibri bold";
		c.fillText(notes[noteIndex], displaySetting.start_x - 15, i * displaySetting.delta_y + START_Y + 5);

		context.font = 8 * $('#factor').val()+"pt Calibri bold";
		context.fillText(notes[noteIndex], 5, i * displaySetting.delta_y + START_Y + 5);
	}

	// vertical lines
	var measureCount = 1;
	var barLen = BARS * quarterNotesPerMeasure + 1;
	for(var i = 0; i < barLen; i++) {
		c.beginPath();
		c.moveTo(i * displaySetting.gridWidth + displaySetting.start_x, 0 + START_Y);
		c.lineTo(i * displaySetting.gridWidth + displaySetting.start_x, NOTES_LINES * displaySetting.delta_y + START_Y);
		c.lineWidth = (i % quarterNotesPerMeasure === 0) ? 3 : 1; 
		c.stroke();

		if(i % (quarterNotesPerMeasure) === 0 && measureCount <= BARS) {
			c.fillText(measureCount, i * displaySetting.gridWidth + displaySetting.start_x - 2, START_Y - 8);
			measureCount++;
		}
	}
}

function doRefresh() {
	if ($('input[name=timeSignature]:checked').val().length === 0) {
		alert('Notes per measure can\'t be empty');
		return;
	}
	
	canvas.width = canvas.width;
	var factor = $('#factor').val();
	var newDisplayObj = {};
	for (var k in displaySetting) {
		if (displaySetting.hasOwnProperty(k)) {
			newDisplayObj[k] = displaySetting[k];// * factor;
		}	
	}

	refresh(newDisplayObj);
}

function refresh(dspObj) {
	displaySetting = dspObj;
	//START_X = displaySetting.start_x;
	START_Y = displaySetting.start_y;
	RECT_HEIGHT = displaySetting.delta_y * NOTES_LINES;
	
	canvas.height = displaySetting.canvas_height;	
	canvas.width = displaySetting.canvas_width;

	redraw();
	
	//saveData();
}

function exportNotes() {
	document.getElementById('output').value = store.toString();
}

function doShiftRight() {
	if(marker === null || !endMarker) {
		alert('Shift-click a column first.');
		return;
	}
	store.shiftRight(marker, (endMarker - marker));
	redraw();
	resetMarkers();
}

function resetMarkers() {
	marker = null;
	endMarker = null;
	//c.putImageData(savedImage, 0, 0);
	document.getElementById('markerLabel').innerHTML = '';
}

function drawMarker(x) {
	savedImage = c.getImageData(0, 0, displaySetting.canvas_width, displaySetting.canvas_height);
	
	c.beginPath();
	c.lineWidth = 3;
	c.strokeStyle = 'rgba(255,0,0,.8)';
	c.moveTo(x * displaySetting.delta_x + displaySetting.start_x, START_Y);
	c.lineTo(x * displaySetting.delta_x + displaySetting.start_x, NOTES_LINES * displaySetting.delta_y + START_Y);
	c.stroke();
	

	
	canvas.addEventListener('mousemove',doHighlighting,false);
	document.getElementById('markerLabel').innerHTML = x;
}

function doHighlighting(event) {
	if (deebox.highlightMode) {

		var pos = getLockedCoordinate(event);
		if (!pos) return;
		var endX = pos.x;

		c.clearRect(0, 0,displaySetting.canvas_width, displaySetting.canvas_height); // clear entire canvas
		c.putImageData(savedImage, 0, 0);
		
		var startX = marker * displaySetting.delta_x + displaySetting.start_x
		
		// focus line
		c.beginPath();
		c.lineWidth = 3;
		c.strokeStyle = 'rgba(255,0,0,.8)';
		c.moveTo(endX, START_Y);
		c.lineTo(endX, NOTES_LINES * displaySetting.delta_y + START_Y);
		c.stroke();
		
		c.fillStyle = 'rgba(255,0,0,.4)';
		//console.log(startX, START_Y,endX ,RECT_HEIGHT);
		c.fillRect(startX, START_Y,endX - startX,RECT_HEIGHT);
		//redraw();

	}
}

function clearMarker() {
	canvas.removeEventListener('mousemove',doHighlighting,false);
}

function importNotes() {
	var txt = document.getElementById('output').value;
	
	if (txt == '') return;
	
	try {
		store = new MusicStore();
		
		var entries = txt.split('|');
		for (var i=0;i<entries.length;i++) {
			
			if (entries[i].length === 0) continue;
			var entry = entries[i];
			
			store.add({'x':trim(entry.split(',')[0]),
					   'y':trim(entry.split(',')[1])})
		}
		redraw();
	}
	catch (jsError) {
		throw jsError;
	}
}

function trim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function copy() {
	if(marker === null|| !endMarker) {
		alert('Shift-click a column first.');
		return;
	}

	deebox.doCopy = true;
	alert('Click the destination of copy.');

}

function doCopy(e) {
	var lockedPoint = getLockedCoordinate(e);
	var pt = getGridCoordinate(lockedPoint);
	//console.log(marker+'-'+ endMarker + ' to '+pt.x);
	store.copy(marker, endMarker, pt.x);

	resetMarkers();
	redraw();
}


function doPrint() {
	var printImage = canvas.toDataURL("image/png");

	var WIDTH_PER_STRIP = 1500;
	
	var count = Math.ceil(canvas.width / WIDTH_PER_STRIP);
	var TOTAL_WIDTH = canvas.width;
	canvas.width = WIDTH_PER_STRIP;
	canvas.height = displaySetting.canvas_height * count;

	var OVERLAP_PX = displaySetting.gridWidth * 6;
	var endX = 0;
	for (var i=0;i<count;i++) {
		
		var img = new Image();

		img.onload = (
		function(i) {
			return function() {

				//context.drawImage(img,
				//sx,sy,
				//swidth,sheight,
				//x,y,
				//width,height);
				var sx = (endX === 0 ) ? 0  : endX;
				if (i > 0) {
					sx -= OVERLAP_PX;
				}
				endX = sx + WIDTH_PER_STRIP;
				var sy = 0,
					swidth = WIDTH_PER_STRIP,
					sheight = displaySetting.canvas_height,
					x = 0,
					y = displaySetting.canvas_height * i,
					width = WIDTH_PER_STRIP,
					height = displaySetting.canvas_height;
				if (sx + WIDTH_PER_STRIP > TOTAL_WIDTH) {
					swidth =  TOTAL_WIDTH - sx;
					width = TOTAL_WIDTH - sx;
					//console.log('alter:',swidth,width);
				}
				//console.log(i,sx+","+sy,swidth +'x'+sheight,x+','+y);//,width+'x'+height);
				c.drawImage(img, 
							sx, sy, 
							swidth, sheight, 
							x, y, 
							width, height);

				// draw border
				c.strokeRect(0, y,WIDTH_PER_STRIP,height);
			}
		})(i);
		img.src = printImage;
	}
}

function noteLabelHandler() {
	if (document.body.scrollLeft < displaySetting.start_x) {
		$('#notesLabel').hide();
	}
	else {
		$('#notesLabel').show();
	}
}

function toggleDisplayGrid() {
	DISPLAY_GRID = this.checked;
	doRefresh();
}

function doClear() {
	$('#output').val('');
	$('#outputXML').val('');
	store = new MusicStore();
	doRefresh();
	saveData();
}

function processMeasure(xmlDoc, measure, count) {
	try {
		var output ='';
		var currentMeasure = measure;
		for (var i=0;i<count;i++) {
			currentMeasure = measure+i;
			var hLocation = (currentMeasure - 1) * ($('input[name=timeSignature]:checked').val() * 2);
			console.log('measure:'+currentMeasure + ' ' + hLocation);
			var notesInMeasure = xmlDoc.find( "measure[number='"+ currentMeasure +"']" ).find('note');
			var j=0;
			xmlDoc.find( "measure[number='"+ currentMeasure +"']" ).find('note')
				.each(function() {
						var isRest = !!$(this).find('rest').size();
						var type = $(this).find('type').text();
						var duration = 0;
						switch (type) {
							case 'eighth':
								duration = 2;
								break;
							case 'quarter':
								duration = 4;
								break;
							case 'half':
								duration = 8;
								break;
							case 'whole':
								duration = 16;
								break;
							default :
								alert('unknown at measure: ' +currentMeasure + ' '+ type);
						}
						if (isRest) {
							hLocation += duration;
						} else {
						
							var note = $(this).find('step').text();
							var octave = $(this).find('octave').text();
		
							var octaveStartIndex;
		
							if (octave < 4) octave = 4;
							/* only valid note in 6th octave is C */
							if (octave == 6 && note != 'C') octave = 5;
							if (octave > 6) octave = 5;
							
							if (octave == 4) octaveStartIndex = 8;
							if (octave == 5) octaveStartIndex = 1;
							if (octave == 6) octaveStartIndex = 0;
		
							var noteIndex = xmlNotes.join('').indexOf(note,octaveStartIndex);
		
							var isPartOfChord = !!($(this).find('chord').size());
	
							output += hLocation+","+ noteIndex + '|';
							
							if ((j!=notesInMeasure.length-1 && !$(notesInMeasure[j+1]).find('chord').size())) {
								hLocation += duration;
							}

							if (noteIndex === undefined || noteIndex === NaN || noteIndex < 0) {
								console.log('measure: ' + currentMeasure, ' hLocation: ' + hLocation);
								throw {'message':'nope!'};
							}
						}
						j++;
					});
		}
	} catch (jsError) {
		alert(jsError.message);
	}
	return output;
}

function containsChord(xmlFragment) {
	return !!(xmlFragment.find('chord').length);
}

function doXML() {
	try {
		var xml = $('#outputXML').val(),
		xmlDoc = $.parseXML( xml ),
		$xml = $( xmlDoc );
		var measures = $xml.find('measure').size();
		$('#measureCount').val(measures);
		redraw();
		$('#output').val(processMeasure($xml, 1, measures));
		importNotes();
	}
	finally {
		
	}
}

function validateXMLOutput() {
	var xml = $('#outputXML').val(),
			xmlDoc = $.parseXML( xml ),
			$xml = $( xmlDoc );
			var outputXML = $xml.find('step').text();

			var outputDeeBox = '';
	var values = $('#output').val();
	$(values.split('|')).each(function() {
		if (!!$(this)) {
			outputDeeBox += xmlNotes[$(this).get(0).split(',')[1]];
		}
	});
	for (var i=0; i< outputXML.length;i++) {
	console.log('processing index:'+i);
		if (outputXML.indexOf(i) !== outputDeeBox.indexOf(i)) {
			console.log('index:'+i+','+ outputXML.indexOf(i) + ' vs ' + outputDeeBox.indexOf(i));
		}
	}
}

function loadSong() {
	var song = $('#songs').val();
	if (song == 's1') {
		$('#output').val(nsong1);
		$('input[value=6]').click();
		$('#measureCount').val(20);
		importNotes();
	}
	else if (song == 's2') {
		// load nsong2
		$('#outputXML').val(nsong2['xml']);
		$('input[value=8]').click();
		doXML();
	}
}

function tabToggle(obj) {
		$('#tools').removeClass('active');
		$('#musicxml').removeClass('active');
		$('#saveload').removeClass('active');
		$(obj).addClass('active');
		
		if (obj.innerHTML == 'Tools') {
			$('#area1').show();
			$('#area2').hide();
			$('#area3').hide();
		}
		else if (obj.innerHTML == 'MusicXML') {
			$('#area1').hide();
			$('#area2').show();
			$('#area3').hide();
		}
		else if (obj.innerHTML == 'Save/Load') {
			$('#area1').hide();
			$('#area2').hide();
			$('#area3').show();
		}
}

function generateAdvanced() {
	for (var i in deebox.displaySetting) {
		if (deebox.displaySetting.hasOwnProperty(i)) {
			$(document.body).append('<div id="advancedSettings">'+i+' : <input type="text" name="'+i+'" value="'+deebox.displaySetting[i]+'"/></div>');
		}
	}
	
	$('#advancedSettings input').bind('blur',function() {
		var newDspSetting = {};
		$('#advancedSettings input').each(function() {

			newDspSetting[$(this).attr('name')] = $(this).val();
			});
		displaySetting = newDspSetting;
		doRefresh();
	});
}

function getCoords(e) {
	var x;
	var y;
	if(e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	return {
		"x" : x,
		"y" : y
	};
}

function getGridCoordinate(pt) {
	var newX = pt.x - displaySetting.start_x;
	var newY = pt.y - displaySetting.start_y
	
	// coordinate starting at top left corner of grid
	return new Point(newX / displaySetting.delta_x,newY / displaySetting.delta_y);
}

function getLockedCoordinate(e) {
	var START_X = displaySetting.start_x;
	var START_Y = displaySetting.start_y;

	var pos = getCoords(e);
	if(pos.x < START_X || pos.y < START_Y || pos.y > RECT_HEIGHT + START_Y)
		return null;

	var normX = pos.x - START_X;
	var lockedX = parseInt(normX / displaySetting.delta_x) * displaySetting.delta_x;

	/*    closer to right                       ; closer to left */
	if(Math.abs((lockedX + displaySetting.delta_x) - normX) <= Math.abs(normX - lockedX)) {
		lockedX += displaySetting.delta_x;
	}

	var normY = pos.y - START_Y;
	var lockedY = parseInt(normY / displaySetting.delta_y) * displaySetting.delta_y;

	if(Math.abs((lockedY + displaySetting.delta_y) - normY) < Math.abs(normY - lockedY)) {
		lockedY += displaySetting.delta_y;
	}

	saveState.push(canvas.toDataURL("image/png"));

	var newX = lockedX + START_X;
	var newY = lockedY + START_Y;
	
	return new Point(newX,newY);
}

function Marker(pos) {
	this.position = pos;
	this.coordinate = '';
}

function Point(x,y) {
	this.x = x;
	this.y = y;
	this.toString =  function() {
		return '[' + this.x + ", " + this.y + ']';
	}
}

function doUndo() {
	restoreLast();
}