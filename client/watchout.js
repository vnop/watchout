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
var enemies = Array(5).fill(10);
var playerObj = [20];
var score = 0;
var highScore = 0;

//create main svg element inside <div class = 'board'></div>
var svg = d3.select('.board')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

var randomPosition = function(n) {
  return Math.floor(Math.random() * n);
};

// Drag player
//The d3.behavior.drag() D3 Drag Behavior provides for you the absolute "x" and "y" coordinates of the element that is being dragged inside of the variable d3.event (d3.event.x and d3.event.y)
var drag = d3.behavior.drag()
              // .on('dragstart', function() { player.style('fill', 'red'); })
              .on('drag', function() {
                player.attr('cx', d3.event.x)
                      .attr('cy', d3.event.y);
              });
             // .on('dragend', function() { player.style('fill', 'black'); });

//makes the nonmoving player circle and adds it to the svg (doesnt matter calling it circle after selectAll because no matter what, added as <circle></circle>)
var player = svg.selectAll('.draggableCircle')
              .data(playerObj)
              .enter()
              .append('svg:circle')
              // .append('draggableCircle')
              .attr('class', 'draggableCircle')
              .attr('cx', function(d) { return h / 2; })
              .attr('cy', function(d) { return h / 2; })
              .attr('r', function(d) { return d; })
              .call(drag)
              .attr('fill', 'orange');



//makes the movingCircle and adds to the svg (doesnt matter calling it circle after selectAll because no matter what, added as <circle></circle>)
var movingCircles = svg.selectAll('circle')
  .data(enemies)
  .enter().append('circle')
  .attr('class', 'movingCircles')
  .attr('cx', function(d) { return randomPosition(w); })  //x coord
  .attr('cy', function(d) { return randomPosition(h); })  //y coord
  .attr('r', function(d) { return d; })
  .attr('fill', 'black');
    // .each('end', update)

var collisionDetection = function() {
  //this will run at each step/tick of the transition
  return function() {
    var thisCircle = d3.select(this);
    var otherCircle = player;
    dx = thisCircle.attr('cx') - otherCircle.attr('cx');
    dy = thisCircle.attr('cy') - otherCircle.attr('cy');
    distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (distance < +thisCircle.attr('r') + +otherCircle.attr('r')) {
      collision(thisCircle, otherCircle);
    }
  };
};

//updates each circle's x and y coordinates to random coords endlessly
var update = function() {
  movingCircles.transition()
    //The first argument, 'collision', is the name the tween function is registered for, and the second argument, collisionDetection, is a factory function that will return a function to be run on all the increments between the start and the end of the transition.
    //on a collision, call var collision = function() { .. }
    //a tween function attaches to the transition and executes at each transition step in that transition
               .tween('collision', collisionDetection)
               .attr('cx', function(d) { return randomPosition(w); })
               .attr('cy', function(d) { return randomPosition(h); });


  setTimeout(function() { update(); }, 1000);
};

var collision = function(thisCircle, otherCircle) {
  highScore = Math.max(score, highScore);
  score = 0;
  updateScore();
};


var updateScore = function() {
  d3.select('.highScore').text('High Score: ' + highScore);
  d3.select('.current').text('Current Score: ' + score);
};

var scoreTicker = function() {
  score = score + 1;
  updateScore();
};

setInterval(scoreTicker, 100);

// call update
update();





