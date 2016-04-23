/**
 * @author Xin Wang
 * @date 22/02/2016
 * @licence MIT
 */
(function() {
    'use strict';

    // GLOBAL CONFIG
    var trees = document.querySelectorAll('.binary-tree');

    function genEle(type) {
        return document.createElementNS('http://www.w3.org/2000/svg', type);
    }

    function genRandom(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    // TREE CLASS
    var Tree = function(conf) {
        this.parent = conf.parent;
        this.depth = conf.depth || 5;
        this.noOfBranches = null;
        this.branches = {};
        this.ROOT_LENGTH = conf.ROOT_LENGTH || 80;
        this.ROOT_WIDTH = conf.ROOT_WIDTH || 15;
        this.BRANCH_OFFSET = conf.BRANCH_OFFSET || 10;
        this.ROOT_START = null;
        this.branchColor = 'rgb(40, 0, 0)';
        this.leafColor = 'rgb(0, 100, 0)';

        this.init();
    };

    Tree.prototype.initDimension = function() {
        if(!this.parent) return;
        this.ROOT_START = {
            x: this.parent.clientWidth / 2,
            y: this.parent.clientHeight
        };
    }

    Tree.prototype.init = function() {
        this.initDimension();
        if(this.ROOT_START) {
            this.calNoOfBranches();
            this.initBranches();
            this.grow();
        }
    };

    Tree.prototype.initBranches = function() {
        var 
            properties, cid, pbr;

        for (var i = 0; i < this.noOfBranches; i += 1) {
            cid = i + 1;
            this.branches[cid] = new Branch({  node: cid });
            if (i === 0) {
                properties = {
                    start: { x: this.ROOT_START.x, y: this.ROOT_START.y },
                    end: { x: this.ROOT_START.x, y: this.ROOT_START.y - this.ROOT_LENGTH },
                    ln: this.ROOT_LENGTH,
                    width: this.ROOT_WIDTH,
                    color: this.branchColor,
                    rad: 0
                };
            } else {
                pbr = this.branches[this.getBranchParent(cid)];
                properties = this.calBranchProperties({
                    start: pbr.end,
                    isLeft: cid % 2 === 0,
                    parentLn: pbr.ln,
                    parentWidth: pbr.width,
                    parentRad: pbr.rad,
                    level: Math.floor(Math.log2(cid))
                });
            }
            this.branches[cid].setProperties(properties);
        }
    };

    Tree.prototype.calBranchProperties = function(options) {
        var lnCutRatio = 0.85,
            widthCutRatio = 0.7,
            offset = options.parentRad + (options.isLeft ? Math.PI / this.BRANCH_OFFSET : -(Math.PI / this.BRANCH_OFFSET)),
            x = options.start.x - (options.parentLn * lnCutRatio) * Math.sin(offset),
            y = options.start.y - (options.parentLn * lnCutRatio) * Math.cos(offset);

        return {
            start: options.start,
            end: { x: x, y: y },
            rad: offset,
            ln: options.parentLn * lnCutRatio,
            width: options.parentWidth * widthCutRatio,
            color: options.level < this.depth - 3 ? this.branchColor : this.leafColor
        };
    };

    Tree.prototype.getBranchParent = function(cid) {
        return Math.floor(cid / 2);
    };

    Tree.prototype.calNoOfBranches = function() {
        if (!this.depth) return;
        var r = 0,
            i = this.depth;
        while (i-- > 0) {
            r += Math.pow(2, i);
        }

        this.noOfBranches = r;
    };

    Tree.prototype.grow = function() {
        var svg = this.parent,
            b, frag = document.createDocumentFragment();

        for (var i in this.branches) {
            b = this.branches[i];
            frag.appendChild(b.ele);
        }
        svg.appendChild(frag);
    };

    // BRANCH CLASS
    var Branch = function(conf) {
        this.node = conf.node;
        this.ele = genEle('line');
        this.ln = conf.ln || 50;
        this.width = conf.width || 2;
        this.start = conf.start || { x: 10, y: 10 };
        this.end = conf.end || { x: 50, y: 50 };
        this.color = conf.color || 'rgb(128, 0, 0)';
    };

    Branch.prototype.draw = function() {
        this.ele.setAttribute('x1', this.start.x);
        this.ele.setAttribute('y1', this.start.y);
        this.ele.setAttribute('x2', this.end.x);
        this.ele.setAttribute('y2', this.end.y);
        this.ele.setAttribute('style', 'stroke:' + this.color + ';stroke-width:' + this.width);
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

    function growTrees() {
        var i = 0, ln = trees.length;
        var tree;
        for(; i < ln; i += 1) {
            tree = new Tree({
                depth: genRandom(5, 8),
                parent: trees[i],
                ROOT_LENGTH: 30,
                ROOT_WIDTH: 10,
                BRANCH_OFFSET: genRandom(4, 20)
            });
        }
    };

    growTrees();

})();
