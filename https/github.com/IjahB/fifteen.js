"use strict";
var div;
var time;
var flash;
var wSpace1;
var wSpace2;

window.onload = function ()
{
	var puzzlespace = document.getElementById('puzzlespace');
	
	div = puzzlespace.getElementsByTagName('div');

	for (var i=0; i<div.length; i++)
	{
		div[i].className = 'puzzlepiece';
		div[i].style.left = (i%4*100)+'px';
		div[i].style.top = (i/4*1000) + 'px';
		div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
		div[i].onmouseover = function()
		{
			if (okMove((parseInt(this.innerHTML,10))))
			{
				this.style.border = "2px solid black";
				this.style.color = "#885944";
			}
		};
		div[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};

		div[i].onclick = function()
		{
			if (okMove(parseInt((this.innerHTML),10)))
			{
				swap(this.innerHTML-1);
				if (okFinish())
				{
					youWin();
				}
				return;
			}
		};
	}

	wSpace2 = '300px';
	wSpace1 = '300px';

	var shuffle = document.getElementById('shuffle');
	shuffle.onclick = function()
	{

		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 100,10) %4;
			if (rand == 0)
			{
				var temp = cUp(wSpace2, wSpace1);
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (rand == 1)
			{
				temp = cDown(wSpace2, wSpace1);
				if ( temp != -1) 
				{
					swap(temp);
				}
			}

			if (rand == 2)
			{
				 temp = cLeft(wSpace2, wSpace1);
				if ( temp != -1)
				{
					swap(temp);
				}
			}

			if (rand == 3)
			{
				temp = cRight(wSpace2, wSpace1);
				if (temp != -1)
				{
					swap(temp);
				}
			}
		}
	};
};

function okMove(pos)
{
	if (cLeft(wSpace2, wSpace1) == (pos-1))
	{
		return true;
	}

	if (cDown(wSpace2, wSpace1) == (pos-1))
	{
		return true;
	}

	if (cUp(wSpace2, wSpace1) == (pos-1))
	{
		return true;
	}

	if (cRight(wSpace2, wSpace1) == (pos-1))
	{
		return true;
	}
}
function flash()
{
	flash --;
	if (flash == 0)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FFFFFF";
		alert('you win');
		return;
	}
	if (flash % 2)
	{
		body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#00FF00";	
	}
	else
	{
		 body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FF0000";
	}
	 time = setTimeout(flash, 100);
}

function youWin()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "#FF0000";
	flash = 10;
	time = setTimeout(flash, 100);
}

function okFinish()
{
	var flag = true;
	for (var i = 0; i < div.length; i++) {
		var y = parseInt((div[i].style.top),10);
		var x = parseInt((div[i].style.left),10);

		if (x != (i%4*100) || y != (i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}

function cLeft(x, y)
{
	var xx = parseInt((x),10);
	var yy = parseInt((y),10);

	if (xx > 0)
	{
		for (var i = 0; i < div.length; i++) 
		{
			if (parseInt(div[i].style.left,10) + 100 == xx && parseInt(div[i].style.top,10) == yy)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function cRight (x, y) {
	var xx = parseInt((x),10);
	var yy = parseInt((y),10);
	if (xx < 300)
	{
		for (var i =0; i<div.length; i++){
			if (parseInt(div[i].style.left,10) - 100 == xx && parseInt(div[i].style.top,10) == yy) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function cUp (x, y) {
	var xx = parseInt((x),10);
	var yy = parseInt((y),10);
	if (yy > 0)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top, 10) + 100 == yy && parseInt(div[i].style.left,10) == xx) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function cDown (x, y)
{
	var xx = parseInt((x),10);
	var yy = parseInt((y),10);
	if (yy < 300)
	{
		for (var i=0; i<div.length; i++)
		{
			if ((parseInt(div[i].style.top,10) - 100 == yy && parseInt(div[i].style.left,10) == xx))
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function swap (pos) {
	var temp = div[pos].style.top;
	div[pos].style.top = wSpace1;
	wSpace1 = temp;

	temp = div[pos].style.left;
	div[pos].style.left = wSpace2;
	wSpace2 = temp;
}
