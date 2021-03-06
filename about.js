/*********************************************************\
* About page contents                                     *
\*********************************************************/

$(function() {

//------------------------------------------------------------------------------
// Algorithms

$('#about-algorithms')
	.append($('<h2>').text('Algorithms'))
	.append($('<p>')
		.append('There are several algorithms that, given two set of points, find \
			a line which cuts all of those sets in half. The fastest algorithm can do this in \
			O(n) time, but is very complex. We will discuss two algorithms we implemented ourselves, \
			a O(n<sup>3</sup>) algorithm and a O(n<sup>2</sup>) algorithm. For the O(n) algorithm, we refer to a good \
			explanation by Danielle MacNevin ')
		.append('<a href=http://cgm.cs.mcgill.ca/~athens/cs507/Projects/2002/DanielleMacNevin/algorithm-pg3.html>over here</a>.<br>'))
	.append($('<p>')
		.append('The simplest algorithm is the O(n<sup>3</sup>) algorithm. It works on two groups of points that are both of odd size.\
			For a group with an odd number of points to have as many on one side of a line as on the other, one point has to be \
			on the line. This is exactly used in the algorithm. The algorithm checks for every pair of two points, where one point is \
			chosen from each group, if the line defined by those two points is a hamsandwich cut. \
			To determine if the line is a hamsandwich cut, given the line, for every point it is determined whether they are to the left or \
			to the right of the line. By this counting, one can determine whether or not the line is a hamsandwich cut. \
			This algorithm runs in O(n<sup>3</sup>) time, because it will check for O(n<sup>2</sup>) combination of points whether or not it is a \
			hamsandwich cut in O(n) time.'))
	.append($('<p>')
		.append('The O(n<sup>2</sup>) algorithm is not only a lot faster, but also more advanced. It makes use of a concept called duality. \
			We refer to the section on duality for a more thorough explanation, but in short it means that there is a second representation of the problem. This second \
			representation sees the points in the original problem as lines, and the hamsandwich line as a point.<br>')
		.append('After transforming the problem to its dual representation, for both sets of lines, a median line is determined. \
			The median line is a set of linesegments (it is not truly a line) made up of parts of the lines. A segment is part \
			of the median line (of one group), if there are as many lines above as below it belonging to that group. In the figure below, for the set of red lines, \
			the median line is accentuated by pink, and for the blue line by dark blue. One can see that there is always exactly one line above and below the median line \
			for the given group.')		
		.append('<br><img src="about/MedianLine.gif" class="figure" alt="Shows the median lines of in the dual representation."><br>')
		.append('After determining the median line, intersections of the two median lines are determined (the green and brown circles in the figure). \
			The point of intersection between the median lines of the two groups represents the cut-line in the original representation. \
			This is the case because when the median lines intersect, it \
			means there are as many lines on both sides of that intersection (which correspond to points in the original representation).'))
	.append($('<p>')
		.append('The algorithm takes O(n) time to create the dual representation, but after that it will have to compute the median line for both groups. \
			This takes O(n<sup>2</sup>) time. After this, one can simply go over all the intersections of the median line, which takes at most O(n). \
			Because these actions all happen sequentially, the dominating factor is O(n<sup>2</sup>). The key reason that this runs in O(n<sup>2</sup>) \
			instead of O(n<sup>3</sup>), is that when you find the intersections of the median lines, you know that it is a valid slice without checking all \
			other lines first.')
	)
;

//------------------------------------------------------------------------------
// Duality

$.fn.svg = function addSVG(id, cls)
{
	d3.selectAll(this).append('svg').attr('id', id).attr('class', cls);
	return this;
}

$('#about-duality')
	.append($('<h2>').text('Duality'))
	.svg('about-field1', 'about-field')
	.svg('about-field2', 'about-field')
	.append($('<p>')
		.append($('<label>').text('Algorithm: '))
		.append($('<select>')
			.attr('id', 'about-alg')
			.append($('<option>').text('None').val('none'))
			.append($('<option>').text('Naive').val('naive'))
			.append($('<option>').text('Duality').val('dual'))))
	.append($('<p>')
		.append('Duality is a different way to interpret geometric problems with points and lines. \
			Where the original problem considers a point, the dual representation will consider a line, and vice versa. \
			The demo above will give you some feeling for this. You can drag the points, and see how they behave in the \
			dual representation. If you mouse-over a point, the corresponding line will be highlighted.'))
	.append($('<p>')
		.append('Points are converted rather directly; a point ( <var>p<sub>x</sub></var> , <var>p<sub>y</sub></var> ) will \
			be converted to the line <var>y</var> = <var>p<sub>x</sub></var><var>x</var> - <var>p<sub>y</sub></var>. \
			Conversely, the line <var>y</var> = <var>a</var><var>x</var> + <var>b</var> will be converted to the point \
			( <var>a</var> , <var>b</var> ). You can see this in the demo, if you increase <var>p<sub>x</sub></var> \
			by moving a point to the right, the corresponding line will get a steeper slope. Likewise, moving the point downwards will \
			make the corresponding line go down as well.'))
;

$(function()
{
	var demo = new AboutDemo('about-field1', 'about-field2', DualityAlgorithm);

	demo
		.add(demo.q1.shrink(30).randomPoint())
		.add(demo.q2.shrink(30).randomPoint())
		.add(demo.q3.shrink(30).randomPoint())
		.add(demo.q4.shrink(30).randomPoint())
	;

	$('#about-alg')
		.change(function()
		{
			demo.algorithm = ({
				naive: NaiveAlgorithm,
				dual: DualityAlgorithm,
			})[$(this).val()];
			demo.findSlice().dualify().update();
		})
		.val('dual')
	;
});

//------------------------------------------------------------------------------
// Info

$('#about-info')
	.append($('<h2>').text('Info'))
	.append($('<p>')
		.append(
			'This game was made as part of the course Geometric Algorithms (2IMA15) at Eindhoven University of Technology.<br>\
			The goal is to engage students of the course with Geometric problems, in this case the Pizza Slice (or Hamsandwich cut) problem.<br>\
			The source code can be found online at ')
		.append('<a href=https://github.com/FerryT/2IMA15>Github</a>.<br>')
		.append('<br>')
		.append('The pizza slice problem is a geometric problem, where given <i>n</i> groups of points,\
				 a line has to be found which divides all groups in two.\
				 That is, for groups <i>1</i> through <i>n</i>, there are as many points on one side of the line as the others.<br>\
				 Below, you can see two figures with two point sets, divided by lines. The line in the left image is not a hamsandwich-cut, because \
				 the set of red points is not split in half by the cut (there are two below the line, and none above). The right image does have a \
				 hamsandwich-cut, because for both the red and blue points, there are as many above as below the line.')
		.append('<br><img src="about/SliceFail.gif" class="floater" alt="A bad cut">')
		.append('<img src="about/SliceGood.gif" class="floater" alt="A correct cut"><br>')
		.append(' In this game, every level has two groups of points, represented by colored space ships. \
				 The goal is to move or add points so that the groups are exactly divided by the goal line.')
	)
;

//------------------------------------------------------------------------------
// How to play

$('#about-instructions')
	.append($('<h2>').text('Instructions'))
	.append($('<p>')
		.append(
			'Supreme judge Zoid Splark has recently ruled the laws of physics to be unconstitutional, \
			and as such, he has decided to abolish them. Because of this, the universe became unstable. \
			Recently, rifts have been opening everywhere. The army was highly unprepared, and did not have their fleets of \
			spaceships positioned adequately to make sure every area stays defended.'))
	.append($('<p>')
		.append(
			'The president himself has appointed you as a new lieutenant, who has to make sure the spaceships are \
			well distributed through space. The army has two main branches, technical support in red ships and \
			armed forces in blue ships. You will be sent to wherever rifts appear, where you will have to divide \
			the techs and armed forces into two groups of equal size. For this task, you will be using a console, of which the \
			user interface is shown in the following figure.<br>')
		// TODO (?) Put this image in index.html and scale the content based on size of the context.
		.append('<img src="about/game.png" alt="An overview of UI elements."><br>')
		.append('There will be a small briefing at the top of the screen (1). \
			The green band indicates where the rift is going to develop (2). \
			You have to make sure both sides of the rift \
			have the same amount of techs (red ships), and both sides of the rift have an equal amount of armed forces (blue ships).<br>\
			Both the techs (red) and armed forces (blue) have the same type of ships, here are a few, but not all, ships:<br><dl>\
			<dt>Frigate (3)</dt><dd>This is the biggest ship the army has. It has a strong hierarchy and loyal crew. \
			You can order them directly by dragging them around on your screen.</dd>\
			<dt>Cruiser (4)</dt><dd>These ships are part of special task forces hence can not be ordered directly. \
			They can be summoned though which makes them appear almost instantaneously due to its powerful translocation unit.</dd> \
			<dt>Fighter/scout (5)</dt><dd>These ships feature the most independent (and even slightly volatile) crew of the army. \
			Depending on the pilot, they either tend to move towards your mouse clicks, or they will flee from it.</dd></dl>\
			The president is a man of time. He will evaluate your performance solely based on time spent to move the ships. This evaluation \
			can be seen in the top left corner while commanding your fleets (6). But do not worry, if you need some time, \
			you can always take a break with the pause button in the top right corner (8). If you feel you could have done better, \
			you\'re in luck. There is a rewind button, which will revert all actions you performed since you came to the area (7), giving you a new chance. \
			There will also be a line shown on the console (9). This line indicates the current division which divides both the techs \
			and armed forces in half. Since the goal is to have both the techs and armed forces in equal representation on both sides \
			of the rift, if this line coincides with the rift-line, you completed your mission.')
	)
;

//------------------------------------------------------------------------------
// Credits

$('#about-credits')
	.append($('<h2>').text('Credits'))
	.append($('<p>')
		.append('This game was made by Ferry Timmers and Pieter Gijsbers.<br>')
		.append('As instructor of the course, Kevin Buchin has been our support.<br>'))
	.append($('<p>')
		.append('The icons are from Open Iconic used under the MIT license.'))
	.append($('<p>')
		.append('Music: "Vibe Ace" Kevin MacLeod (incompetech.com)<br>') 
		.append('Licensed under Creative Commons: <a href="http://creativecommons.org/licenses/by/3.0/">By Attribution 3.0</a>'))
;

//------------------------------------------------------------------------------

});
