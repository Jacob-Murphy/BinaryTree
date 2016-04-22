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
    this.ROOT_LENGTH = 100;
    this.ROOT_WIDTH = 15;
    this.branchColor = 'rgb(40, 0, 0)';
    this.leafColor = 'rgb(0, 100, 0)';

  	this.init();

  };

  Tree.prototype.init = function() {
  	this.calNoOfBranches();
  	this.initBranches();
  	this.grow();
  };

  Tree.prototype.initBranches = function() {
  	var svg = _wrap,
  	 properties,
  	 pid,cid;

  	for(var i = 0 ; i < this.noOfBranches; i += 1) {
  		cid = i + 1;
  		this.branches[cid] = new Branch({ parent: svg, node: cid });
  		if(i === 0) {
  			properties = {
  				start: {x: _ROOT_START.x, y: _ROOT_START.y},
  				end: {x: _ROOT_START.x, y: _ROOT_START.y - this.ROOT_LENGTH},
          ln: this.ROOT_LENGTH,
          width: this.ROOT_WIDTH,
          color: this.branchColor,
          rad: 0
  			};
  		} else {
  			pid = this.getBranchParent(cid);
  		  properties = this.calBranchProperties({
          start: this.branches[pid].end,
          isLeft: cid % 2 === 0,
          parentLn: this.branches[pid].ln,
          parentWidth: this.branches[pid].width,
          parentRad: this.branches[pid].rad,
          level: Math.floor(Math.log2(cid))
        });
      }
  		this.branches[cid].setProperties(properties);
  	}
  };

  Tree.prototype.calBranchProperties = function(options) {
    var fine = 6, lnCutRatio = 0.85, widthCutRatio = 0.7,
      offset = options.parentRad + (options.isLeft ? Math.PI / fine : -(Math.PI / fine)),
      x = options.start.x - (options.parentLn * lnCutRatio) * Math.sin(offset),
      y = options.start.y - (options.parentLn * lnCutRatio) * Math.cos(offset);

  	return {
  		start: options.start,
  		end: {x: x, y: y},
      rad: offset,
      ln: options.parentLn * lnCutRatio,
      width: options.parentWidth * widthCutRatio,
      color: options.level < this.depth - 1 ? this.branchColor : this.leafColor
  	};
  };

  Tree.prototype.getBranchParent = function(cid) {
    return Math.floor(cid / 2);
  };

  Tree.prototype.calNoOfBranches = function() {
    if(!this.depth) return;
    var r = 0, i = this.depth;
    while(i-- > 0) {
      r += Math.pow(2, i);
    }

    this.noOfBranches = r;
  };

 
  Tree.prototype.grow = function() {
  	var svg = _wrap;
  	var b, frag = document.createDocumentFragment();
  	
  	for(var i in this.branches) {
  		b = this.branches[i];
  		frag.appendChild(b.ele);
  	}
  	svg.appendChild(frag);
  };
  
  // branch class
  var Branch = function(conf) {
  	this.node = conf.node;
  	this.parent = conf.parent;
  	this.ele = genEle('line');
    this.ln = conf.ln || 50;
    this.width = conf.width || 2,
    this.start = conf.start || {x : 10, y: 10};
    this.end = conf.end || {x: 50, y: 50};
    this.color = conf.color || 'rgb(128, 0, 0)';

    this.init();
  };

  Branch.prototype.init = function() {
  	
  };

  Branch.prototype.draw = function() {
  	this.ele.setAttribute('x1', this.start.x);
  	this.ele.setAttribute('y1', this.start.y);
  	this.ele.setAttribute('x2', this.end.x);
  	this.ele.setAttribute('y2', this.end.y);
  	this.ele.setAttribute('style', 'stroke:'+ this.color +';stroke-width:'+ this.width);
  };

  Branch.prototype.setProperties = function(properties) {
  	this.start = properties.start || this.start;
  	this.end = properties.end || this.end;
    this.ln = properties.ln;
    this.rad = properties.rad;
    this.color = properties.color || 'rgb(128, 0, 0)';
    this.width = properties.width || 2;
  	this.updateProperties(properties);
  };

  Branch.prototype.setLength = function(length) {
    this.length = length;
    this.updateLength(length);
  };

  Branch.prototype.updateProperties = function(newProperties) {
  	this.draw();
  };

  getDimension();

  var tree = new Tree({
  	depth: 11
  });
    
})();