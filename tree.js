(function() {
  'use strict';

  // GLOBAL CONFIG
	var 
		_wrap = document.querySelector('.binary-tree'),
		_HEIGHT,
		_WIDTH,
		_ROOT_START;

	function genEle(type) {
      return document.createElementNS('http://www.w3.org/2000/svg', type);
  }

  function getDimension() {
  	_HEIGHT = _wrap.offsetHeight;
  	_WIDTH = _wrap.offsetWidth;
  	_ROOT_START = {
  		x: _WIDTH / 2,
  		y: _HEIGHT
  	};
  }

  // tree class
  var Tree = function(conf) {
  	this.depth = conf.depth || 5;
  	this.noOfBranches = null;
  	this.branches = {};

  	this.init();

  };

  Tree.prototype.init = function() {
  	this.calNoOfBranches();
  	this.initBranches();
  	//this.grow();
  };

  Tree.prototype.initBranches = function() {
  	var svg = _wrap;
  	var location;
  	var pid;
  	var cid;
  	for(var i = 0 ; i < this.noOfBranches; i += 1) {
  		cid = i + 1;
  		this.branches[cid] = new Branch({ parent: svg, node: cid });
  		if(i === 0) {
  			location = {
  				start: {x: _ROOT_START.x, y: _ROOT_START.y},
  				end: {x: _ROOT_START.x, y: _ROOT_START.y + 50}
  			};
  		} else {
  			pid = this.getBranchParent(cid);
  		}
  		location = this.calBranchLocation(this.branches[pid].end, );
  		// this.branches[cid].setLocation(location);
  	}
  	// console.log(this.branches);
  };

  Tree.prototype.getBranchParent = function(cid) {
  	if(cid % 2 === 0) return cid / 2;
  	else return (cid - 1) / 2;
  };
  Tree.getBranchChild = function(which) {
  	if(which === 'left') {

  	}else {

  	}
  };

  Tree.prototype.calNoOfBranches = function() {
  	if(!this.depth) return;
  	var r = 0, i = this.depth;
  	while(i-- > 0) {
  		r += Math.pow(2, i);
  	}

  	this.noOfBranches = r;
  };

  Tree.prototype.draw = function() {

  };

  Tree.prototype.calBranchLocation = function(start, offset) {
  	offset = Math.PI / 6;
  	var x = start.x - 50 * Math.sin(offset);
  	var y = start.y - 50 * Math.cos(offset);
  	return {
  		start: start,
  		end: {x: x, y: y}
  	};
  };
 
  Tree.prototype.grow = function() {
  	var svg = _wrap;
  	var b, frag = document.createDocumentFragment();
  	var location;
  	var start = {
  		x: _ROOT_START.x,
  		y: _ROOT_START.y
  	};

  	for(var i in this.branches) {
  		b = this.branches[i];
  		
  		//location = this.calBranchLocation(start);
  		
  		//b.setLocation(location);
  		frag.appendChild(b.ele);
  	}
  	svg.appendChild(frag);
  };
  
  // branch class
  var Branch = function(conf) {
  	this.node = conf.node;
  	this.parent = conf.parent;
  	this.ele = genEle('line');
    this.start = conf.start || {x : 10, y: 10};
    this.end = conf.end || {x: 50, y: 50};
    this.color = conf.color || 'rgb(0,0,0)';
    this.strokeWidth = conf.strokeWidth || 2;

    this.init();
  };

  Branch.prototype.init = function() {
  	
  };

  Branch.prototype.draw = function() {
  	this.ele.setAttribute('x1', this.start.x);
  	this.ele.setAttribute('y1', this.start.y);
  	this.ele.setAttribute('x2', this.end.x);
  	this.ele.setAttribute('y2', this.end.y);
  	this.ele.setAttribute('style', 'stroke:'+ this.color +';stroke-width:'+ this.strokeWidth);
  };

  Branch.prototype.setLocation = function(location) {
  	this.start = location.start || this.start;
  	this.end = location.end || this.end;
  	this.onUpdateLocation(location);
  };

  Branch.prototype.onUpdateLocation = function(newLocation) {
  	this.draw();
  };

  getDimension();

  var tree = new Tree({
  	depth: 2
  });
    
})();