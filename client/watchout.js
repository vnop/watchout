// start slingin' some d3 here.
// Draw enemies in SVG element
  // enter, update, exit
  // create enter
  // var enemies = [{}}, {}}, {}}];
  // var svg = d3.select('svg');

//global variables
var w = 500;
var h = 600;

//our array of enemies
var enemies = [5,5,5,5];

//create main svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


var randomPosition = function(n) {
  return Math.floor(Math.random() * n);
};

//second part of main svg element
var circle = svg.selectAll('circle')
  .data(enemies)
  .enter().append('circle')
  .attr('cx', function(d) { return randomPosition(w); })  //x coord
  .attr('cy', function(d) { return randomPosition(h); })  //y coord
  .attr('r', function(d) { return d * 5; })
  .attr('fill', 'black')

//updates each circle's x and y coordinates to random coords endlessly
var update = function() {
  circle.transition()
       .attr('cx', function(d) { return randomPosition(w); })
       .attr('cy', function(d) { return randomPosition(h); })

  setTimeout(function() { update() }, 1000);
};

// call update
update();

