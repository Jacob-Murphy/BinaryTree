(function() {
  'use strict';

  	var _wrap = document.querySelector('.binary-tree');
  	var _HEIGHT;
  	var _WIDTH;
  	var _ROOT_START;

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

    	this.init();

    };
    Tree.prototype.init = function() {
    	this.calNoOfBranches();
    	this.growBranch();
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
    Tree.prototype.calBranchLocation = function() {

    };
    Tree.prototype.growBranches = function() {
    	var frag = document.createDocumentFragment();
    	for(var i = this.noOfBranches; i > 0;i-- ) {
    		frag.appendChild();
    	}
    };
    Tree.prototype.growOneBranch = function() {
    	var svg = _wrap;
    	var b, frag = document.createDocumentFragment();
    	for(var i = 0; i < 2; i ++) {
    		b = new Branch({
    			parent: svg,
    			start: {x: _ROOT_START.x, y: _ROOT_START.y},
    			end: {x: _ROOT_START.x, y: _ROOT_START.y - 50},
    		});
    		frag.appendChild(b.ele);
    	}
    	svg.appendChild(frag);
    };

    
    // branch class
    var Branch = function(conf) {
    	this.parent = conf.parent;
    	this.ele = genEle('line');
      this.start = conf.start || {};
      this.end = conf.end || {};
      this.color = conf.color || 'rgb(0,0,0)';
      this.strokeWidth = conf.strokeWidth || 2;

      this.init();
    };

    Branch.prototype.init = function() {
    	this.draw();
    };

    Branch.prototype.draw = function() {
    	this.ele.setAttribute('x1', this.start.x);
    	this.ele.setAttribute('y1', this.start.y);
    	this.ele.setAttribute('x2', this.end.x);
    	this.ele.setAttribute('y2', this.end.y);
    	this.ele.setAttribute('style', 'stroke:'+ this.color +';stroke-width:'+ this.strokeWidth);
    };

    getDimension();

    var tree = new Tree({
    	depth: 5
    });
    
})();