// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.getElementById('#gridscreenwidthwrap'),
								url = window.location.href;
						
						if (typeof(window.history.pushState) == 'function') {
						
							if (!url.match('gridset=show') && !gw) {
								
								var newurl = (url.match(/\?/)) ? url + '&gridset=show' : url + '?gridset=show';
								
								window.history.pushState({"pageTitle":document.title},"", newurl);
								
								gs.show();
								
							}
							else {
							
								var newurl = url.replace(/&gridset=show/, '').replace(/\?gridset=show&/, '?').replace(/\?gridset=show$/, '');
								
								window.history.pushState({"pageTitle":document.title},"", newurl);
								
								gs.remove();
								
							}
						
						}
						else {
							
							if (gw) window.location.href = window.location.href + '?gridset=show';
							else window.location.href = window.location.href.replace('?gridset=show', '');
							
						}
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},
	
	remove: function () {
	
		var gseles = document.querySelectorAll('.gridsetoverlaywrap, #gridsetoverlaystyles, #gridscreenwidthwrap, #gridsetstyles, #gridsetfavicon'),
				gscount = gseles.length;
				
		while(gscount-- > 0) {
		
			gseles[gscount].parentNode.removeChild(gseles[gscount]);
		
		}
	
	},

	show: function () {
	
		var b = document.getElementsByTagName('body')[0],
				gridareas = document.querySelectorAll('[class*=-showgrid]'),
				areacount = gridareas.length,
				wrapper = document.querySelectorAll('.wrapper'),
			
				styles = '.gridsetoverlaywrap{display:block;padding:0 !important;position:absolute;top:0;left:0;width:100%;height:100%;z-index:10000;pointer-events:none;}.gridwrap{display:block;padding:0 !important;position:absolute;top:0;left:0;width:100%;height:100%;font-family:Helvetica, Arial, sans-serif !important;}.gridoverlay{display:block;padding:0 !important;position:relative;height:100%;overflow:hidden !important;background:none !important;border-bottom:1px solid #FFD800 !important;}.gridoverlay .gridset{display:block;padding:0 !important;width:100%;height:100%;opacity:0.8;border:none !important;position:relative !important;height:30px !important;border-top:1px solid #FFD800 !important;margin:0 !important;}.gridoverlay .gridset div{display:block;position:absolute !important;padding:0 !important;text-align:left;border:1px solid #FFD800 !important;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;height:100000em !important;top:0;left:0;margin-top:-1px !important;}.gridoverlay div small{font-family:Helvetica, Arial, sans-serif !important;font-size:10px !important;display:block;width:100%;text-align:center;font-weight:400 !important;letter-spacing: 1px !important;padding-top:0 !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;border-bottom:1px solid #FFD800 !important;color:#333 !important;background-color:#FFF79F !important;}.gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{margin:0 !important;padding:0 !important;display:none;width:100%;position:fixed !important;z-index:10000 !important;bottom:0 !important;left:0 !important;height:30px !important;opacity:0.95;border-top:1px solid #FFD800 !important;background-color:#FFF79F !important;font-family:Helvetica, Arial, sans-serif !important;text-align:center !important;}#gridscreenwidthwrap p{display:block;margin:0 !important;width:100% !important;max-width:none !important;font-size:12px;line-height:1;padding-top:10px !important;letter-spacing:normal !important;color:#333 !important;}#gridscreenwidthwrap #gridset-info{display:block !important;z-index:1 !important;position:relative !important;float:left !important;width:auto !important;margin-left:20px !important;}#gridset-logo{display:inline-block !imporant;margin:-4px 20px -1px 0 !important;padding:0 !important;width:81px !important;max-width:none !important;}#gridscreenwidthwrap a{color:#333 !important;text-decoration:none !important;letter-spacing:normal !important;}@media only screen and (max-width:560px){#gridscreenwidthwrap #gridset-system{display:none !important;}}#gridscreenwidthwrap a:hover{text-decoration:underline !important;}#gridscreenwidth{position:absolute !important;width:100% !important;z-index:0 !important;}#gridscreenwidth strong{text-transform:none;}.gridsetnoareas .gridsetoverlaywrap{display:block;position:fixed !important;}.gridsetnoareas .gridoverlay .gridset{position:relative !important;}[class*=-showgrid] .gridset[class*=-show], .gridsetnoareas .gridset{display:none;}',
				
				newstyles = document.createElement('style'),
				newwidth = document.createElement('div'),
				head = document.getElementsByTagName('head'),
				newfavicon = document.createElement('link'),
				newgsstyles = document.createElement('link');
		
		newstyles.id = 'gridsetoverlaystyles';
		newstyles.innerHTML = styles;
		newstyles.type = 'text/css';
		
		newwidth.id = 'gridscreenwidthwrap';
		newwidth.innerHTML = '<p id="gridset-info"><a href="https://gridsetapp.com" title="Gridset site"><img id="gridset-logo" width="80" alt="Gridset" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNDU2LjQ1NXB4IiBoZWlnaHQ9Ijc4LjU2N3B4IiB2aWV3Qm94PSIwIDAgNDU2LjQ1NSA3OC41NjciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQ1Ni40NTUgNzguNTY3Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxnPg0KCQkJCQk8cG9seWdvbiBwb2ludHM9Ijk4LjA1Nyw3Ny4yOSA5OC4wNTcsNzcuMjkgOTguMDU3LDAgNjYuMjIzLDAgNjYuMjIzLDc3LjI5IAkJCQkJIi8+DQoJCQkJPC9nPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPGc+DQoJCQkJCTxwb2x5Z29uIHBvaW50cz0iNTEuNzYsNzcuMjkgNTEuNzYsNzcuMjkgNTEuNzYsMCAyOC43MjQsMCAyOC43MjQsNzcuMjkgCQkJCQkiLz4NCgkJCQk8L2c+DQoJCQk8L2c+DQoJCTwvZz4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cG9seWdvbiBwb2ludHM9IjE0LjIzOSw3Ny4yOSAxNC4yMzksNzcuMjkgMTQuMjM5LDAgMCwwIDAsNzcuMjkgCQkJCSIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzExLjM0MSw3Ni45NDZWNC40NTlsLTE1Ljg2MywxLjk1NnYyMS41MjRsLTAuNDg2LTAuMTY3Yy0zLjIzMy0xLjExNy02Ljc3LTEuNzA3LTEwLjIyNC0xLjcwNw0KCQkJYy0xNC4xMDQsMC0yNC43NCwxMS41MTgtMjQuNzQsMjYuNzg5YzAsMTUuMzE1LDguNDcxLDI1LjYwMywyMS4wNzcsMjUuNjAzYzQuOTA2LDAsOS41MzEtMi4yMTEsMTMuNzQzLTYuNTY5bDAuNjMtMC42NTN2NS43MTENCgkJCUgzMTEuMzQxeiBNMjk1LjM2OSw2Mi4zODZjLTIuNDI5LDIuNDI0LTUuMTgxLDMuNTUyLTguNjYzLDMuNTUyYy02LjU3MiwwLTEwLjgxOS01LjQ3LTEwLjgxOS0xMy45NDYNCgkJCWMwLTguNzI5LDQuNTQ1LTE0LjM3MiwxMS41NzUtMTQuMzcyYzMuMDQyLDAsNS44MzQsMC43OSw3Ljg2MSwyLjIyMmwwLjE1NCwwLjEwOXYyMi4zMjdMMjk1LjM2OSw2Mi4zODZ6Ii8+DQoJCTxwYXRoIGQ9Ik0zNjEuNzQ2LDYyLjQ0M2MwLTEwLjAyMi03LjQyMy0xMy42OTQtMTguNTY4LTE2LjEyOWMtNS4wNDktMS4wODgtOC45MDktMi4xNzEtOC45MDktNS4zMTENCgkJCWMwLTEuNTQ3LDAuODQ1LTQuMTQxLDYuNTEyLTQuMTQxYzQuODAzLDAsMTEuNDMzLDEuNzA5LDE3LjAwNiw0LjM3MWwzLjEzNi0xMS4xMjljLTUuMTMtMi4zNzItMTMuNjItNC4xNDUtMTkuOTMtNC4xNDUNCgkJCWMtMTMuMTkzLDAtMjEuNzE5LDYuMTU3LTIxLjcxOSwxNS42ODhjMCw4LjU1Niw1Ljc5LDEzLjQ5OCwxOC43NzIsMTYuMDE5YzUuMTYzLDEuMTY4LDguODEyLDIuMjUxLDguODEyLDUuNTMzDQoJCQljMCwyLjgzNS0yLjYwOCw0LjQ2MS03LjE1Nyw0LjQ2MWMtNS43NTMsMC0xMi4zMTktMS42Ni0xOC4wODQtNC41NzZsLTMuMDM2LDExLjIzOGM0LjkwMywyLjUwMiwxMy4zOTIsNC4yNDQsMjAuNzk3LDQuMjQ0DQoJCQlDMzUyLjc1Nyw3OC41NjcsMzYxLjc0Niw3Mi4wODksMzYxLjc0Niw2Mi40NDN6Ii8+DQoJCTxwYXRoIGQ9Ik00NDguMzU0LDY1LjgyOWMtMi4zODYsMC00LjE5Ni0wLjYzMS01LjM4NC0xLjg3M2MtMS4xMzUtMS4xODYtMS42NTYtMi44OTgtMS41NTYtNS4wODZsMC41NS0xOC4zNDJoMTMuMzU3bDAuMzA5LTEyLjMwNg0KCQkJaC0xMi40OTRsMC4xMDUtMTEuOTYyaC0xNS4zMjRsLTAuMjE1LDExLjMyM2wtNy41NDMsMi40OGwtMC4zMSw5Ljk4M2w3LjU0NiwxLjI5NGwtMC4wMTEsMC4zMmwtMC43NTMsMTkuMDc1DQoJCQljLTAuMjk1LDUuOTksMC45MTMsMTAuMzI2LDMuNjk3LDEzLjI0N2MyLjkzNSwzLjA4Miw3LjYzMSw0LjU4MywxNC4zNTgsNC41ODNjNC45ODksMCw4LjEzNC0wLjYzMSwxMS43NjgtMS43MjVsLTEuODI3LTEyLjE4OA0KCQkJQzQ1Mi4xNjgsNjUuNDQ0LDQ1MC4xMTEsNjUuODI5LDQ0OC4zNTQsNjUuODI5eiIvPg0KCQk8cGF0aCBkPSJNMzkzLjc3MiwyNS45NmMtMTYuMDIzLDAtMjYuNzg4LDEwLjcyLTI2Ljc4OCwyNi42NzhjMCwxNi4xNjksMTAuMzM1LDI1LjgyLDI3LjY0NywyNS44Mg0KCQkJYzcuMDI0LDAsMTQuMTQxLTEuNDcyLDE5LjEwOS0zLjk0bC0xLjUxOC0xMi4wMjJjLTUuMzU4LDIuOTg0LTExLjA0OSw0LjYyOC0xNi4wOCw0LjYyOGMtOC4wOTYsMC0xMy4wNjItMy45NzUtMTMuNjItMTAuODk5DQoJCQl2LTAuNjAybDMxLjg3NC0wLjU0NGMwLjYxMi0yLjI0NSwwLjk5LTYuMDc3LDAuOTktOC40NzJDNDE1LjM4OCwzMy42NzgsNDA3LjMwNywyNS45NiwzOTMuNzcyLDI1Ljk2eiBNNDAwLjcxMSw0Ny45NDENCgkJCWwtMTguMTE2LDAuMTA4bDAuMDQtMC40YzAuNTE2LTUuNDc4LDMuODI2LTEwLjk5OSwxMC4wNjEtMTAuOTk5YzUuMTY5LDAsOC4wMTYsMy41MzQsOC4wMTYsOS45NTZWNDcuOTQxeiIvPg0KCQk8cGF0aCBkPSJNMTYwLjQyMSw3OC41NjdjOS42ODIsMCwxOS4wMzMtMi4xNzIsMjYuMzU1LTYuMTA2VjM5Ljc1MmgtMjguNDQ2djEyLjg0NmgxMy42NjN2MTAuNTIxbC0wLjIyNCwwLjA5OA0KCQkJYy0zLjAzNiwxLjI3Ny03LjIyLDIuMDczLTEwLjkyLDIuMDczYy0xMi42OTUsMC0xOS45NzgtNy45NDktMTkuOTc4LTIxLjgxMWMwLTEyLjcyMyw3LjkyNy0yMC45NDcsMjAuMTk1LTIwLjk0Nw0KCQkJYzYuMzU3LDAsMTIuODE4LDEuODMzLDE5LjIwMiw1LjQ0MWw1LjEyOS0xMy42NDRjLTUuODcxLTMuNDEzLTE1LjU4Mi01LjYxLTI0Ljg2OS01LjYxYy0yMi4xNzIsMC0zNS45NDYsMTMuNDg2LTM1Ljk0NiwzNS4xOTUNCgkJCUMxMjQuNTg0LDY1LjI5LDEzOC4zMTUsNzguNTY3LDE2MC40MjEsNzguNTY3eiIvPg0KCQk8cG9seWdvbiBwb2ludHM9IjIzNi42NDQsMjguMzk3IDIzNi42NDQsNzYuOTQ2IDI1Mi41MDQsNzYuOTQ2IDI1Mi41MDQsMjYuNDM4IAkJIi8+DQoJCTxwYXRoIGQ9Ik0yMjIuMDU2LDQwLjQyYzIuMDIyLDAsNC4wODQsMC40NjQsNS45OTcsMS4zNDZsMy4xNzMtMTMuOTNjLTIuNDU3LTEuMjI2LTUuMTc1LTEuODc2LTcuODc1LTEuODc2DQoJCQljLTQuOTgsMC04LjgyMywyLjQ3OC0xMS43NTMsNy41NzVsLTAuNjgyLDEuMTkxdi04LjI4OGwtMTUuODYsMS45NTl2NDguNTQ5aDE1Ljg2VjQ4LjAxNmwwLjA0Ni0wLjA4Ng0KCQkJQzIxMy44NTEsNDIuODc3LDIxNy40NzksNDAuNDIsMjIyLjA1Niw0MC40MnoiLz4NCgkJPHBhdGggZD0iTTI0NC41NzcsMi42ODdjLTYsMC05LjQzOSwzLjEyNy05LjQzOSw4LjU3N2MwLDUuMzgxLDMuNDM5LDguNDY4LDkuNDM5LDguNDY4YzUuOTk2LDAsOS40MzYtMy4wODcsOS40MzYtOC40NjgNCgkJCUMyNTQuMDEzLDUuNzMzLDI1MC42NTksMi42ODcsMjQ0LjU3NywyLjY4N3oiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==" /></a> <a id="gridset-system" href="https://share.gridsetapp.com/38054/" title="See details for this grid system" target="_blank">View grid system</a></p><p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p>';
		
		b.appendChild(newstyles);
		b.appendChild(newwidth);
		
		var newwidthdisplay = (newwidth.currentStyle) ? newwidth.currentStyle.display : getComputedStyle(newwidth, null).display;
		
		newfavicon.rel = "shortcut icon";
		newfavicon.id = "gridsetfavicon";
		newfavicon.href = "https://gridsetapp.com/app/img/favicon.ico";
		
		head[0].appendChild(newfavicon);
		
		if (newwidthdisplay != 'block') {
		
			newgsstyles.rel = "stylesheet";
			newgsstyles.id = "gridsetstyles";
			newgsstyles.href = "https://get.gridsetapp.com/38054/";
			head[0].appendChild(newgsstyles);
		
		}
		
		if (areacount) {
			
			var j = areacount;
			
			while (j-- > 0) {
			
				var area = gridareas[j];
			
				gs.buildgrid(area, j, areacount);
				
				if (window.getComputedStyle(area,null).getPropertyValue("position") == 'static') area.style.position = 'relative';
				
			}
			
		}
		else {
			
			if (!b.className.match('gridsetnoareas')) b.className += ' gridsetnoareas';
			
			gs.buildgrid(b, j, areacount);
		
		}
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
	},
	
	buildgrid: function (area, j, showgrid) {
		
		var set = JSON.parse('{"id":"38054","name":"Archive set","grids":{"cp":{"name":"3-col","prefix":"cp","rangeMin":"1024","rangeMax":"none","columns":{"cp1":{"name":"cp1","unit":null,"percent":32,"px":327.68},"cp2":{"name":"cp2","unit":null,"percent":32,"px":327.68},"cp3":{"name":"cp3","unit":null,"percent":32,"px":327.68}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1","value":null}},"co":{"name":"4-col","prefix":"co","rangeMin":"1024","rangeMax":"none","columns":{"co1":{"name":"co1","unit":null,"percent":23.5,"px":240.64},"co2":{"name":"co2","unit":null,"percent":23.5,"px":240.64},"co3":{"name":"co3","unit":null,"percent":23.5,"px":240.64},"co4":{"name":"co4","unit":null,"percent":23.5,"px":240.64}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1","value":null}},"cb":{"name":"5-col","prefix":"cb","rangeMin":"1024","rangeMax":"none","columns":{"cb1":{"name":"cb1","unit":null,"percent":18.4,"px":188.42},"cb2":{"name":"cb2","unit":null,"percent":18.4,"px":188.42},"cb3":{"name":"cb3","unit":null,"percent":18.4,"px":188.42},"cb4":{"name":"cb4","unit":null,"percent":18.4,"px":188.42},"cb5":{"name":"cb5","unit":null,"percent":18.4,"px":188.42}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1","value":null}},"cc":{"name":"6-col","prefix":"cc","rangeMin":"1024","rangeMax":"none","columns":{"cc1":{"name":"cc1","unit":null,"percent":15,"px":153.6},"cc2":{"name":"cc2","unit":null,"percent":15,"px":153.6},"cc3":{"name":"cc3","unit":null,"percent":15,"px":153.6},"cc4":{"name":"cc4","unit":null,"percent":15,"px":153.6},"cc5":{"name":"cc5","unit":null,"percent":15,"px":153.6},"cc6":{"name":"cc6","unit":null,"percent":15,"px":153.6}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1","value":null}},"c":{"name":"8-col","prefix":"c","rangeMin":"1024","rangeMax":"none","columns":{"c1":{"name":"c1","unit":null,"percent":10.75,"px":110.08},"c2":{"name":"c2","unit":null,"percent":10.75,"px":110.08},"c3":{"name":"c3","unit":null,"percent":10.75,"px":110.08},"c4":{"name":"c4","unit":null,"percent":10.75,"px":110.08},"c5":{"name":"c5","unit":null,"percent":10.75,"px":110.08},"c6":{"name":"c6","unit":null,"percent":10.75,"px":110.08},"c7":{"name":"c7","unit":null,"percent":10.75,"px":110.08},"c8":{"name":"c8","unit":null,"percent":10.75,"px":110.08}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1","value":null}},"cd":{"name":"10-col","prefix":"cd","rangeMin":"1024","rangeMax":"none","columns":{"cd1":{"name":"cd1","unit":null,"percent":8.2,"px":83.97},"cd2":{"name":"cd2","unit":null,"percent":8.2,"px":83.97},"cd3":{"name":"cd3","unit":null,"percent":8.2,"px":83.97},"cd4":{"name":"cd4","unit":null,"percent":8.2,"px":83.97},"cd5":{"name":"cd5","unit":null,"percent":8.2,"px":83.97},"cd6":{"name":"cd6","unit":null,"percent":8.2,"px":83.97},"cd7":{"name":"cd7","unit":null,"percent":8.2,"px":83.97},"cd8":{"name":"cd8","unit":null,"percent":8.2,"px":83.97},"cd9":{"name":"cd9","unit":null,"percent":8.2,"px":83.97},"cd10":{"name":"cd10","unit":null,"percent":8.2,"px":83.97}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1","value":null}},"g":{"name":"Golden-3-col-a","prefix":"g","rangeMin":"1024","rangeMax":"none","columns":{"g1":{"name":"g1","unit":null,"percent":18.3344277,"px":187.74},"g2":{"name":"g2","unit":null,"percent":29.66565405,"px":303.78},"g3":{"name":"g3","unit":null,"percent":47.99991823,"px":491.52}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.61803","value":null}},"gb":{"name":"Golden-3-col-b","prefix":"gb","rangeMin":"1024","rangeMax":"none","columns":{"gb1":{"name":"gb1","unit":null,"percent":29.66565405,"px":303.78},"gb2":{"name":"gb2","unit":null,"percent":18.3344277,"px":187.74},"gb3":{"name":"gb3","unit":null,"percent":47.99991823,"px":491.52}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.61803","value":null}},"gc":{"name":"Golden-3-col-c","prefix":"gc","rangeMin":"1024","rangeMax":"none","columns":{"gc1":{"name":"gc1","unit":null,"percent":47.99991823,"px":491.52},"gc2":{"name":"gc2","unit":null,"percent":29.66565405,"px":303.78},"gc3":{"name":"gc3","unit":null,"percent":18.3344277,"px":187.74}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.61803","value":null}},"ch":{"name":"5-col-biauron","prefix":"ch","rangeMin":"1024","rangeMax":"none","columns":{"ch1":{"name":"ch1","unit":null,"percent":11.51912195,"px":117.96},"ch2":{"name":"ch2","unit":null,"percent":14.23832587,"px":145.8},"ch3":{"name":"ch3","unit":null,"percent":17.59942508,"px":180.22},"ch4":{"name":"ch4","unit":null,"percent":21.75394537,"px":222.76},"ch5":{"name":"ch5","unit":null,"percent":26.88918171,"px":275.35}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.23606","value":null}},"ck":{"name":"5-col-bipenton","prefix":"ck","rangeMin":"1024","rangeMax":"none","columns":{"ck1":{"name":"ck1","unit":null,"percent":7.53974727,"px":77.21},"ck2":{"name":"ck2","unit":null,"percent":10.99295152,"px":112.57},"ck3":{"name":"ck3","unit":null,"percent":16.02772332,"px":164.12},"ck4":{"name":"ck4","unit":null,"percent":23.36842061,"px":239.29},"ck5":{"name":"ck5","unit":null,"percent":34.07115725,"px":348.89}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.458","value":null}},"cj":{"name":"5-col-diagon","prefix":"cj","rangeMin":"1024","rangeMax":"none","columns":{"cj1":{"name":"cj1","unit":null,"percent":8.18318568,"px":83.8},"cj2":{"name":"cj2","unit":null,"percent":11.57274302,"px":118.5},"cj3":{"name":"cj3","unit":null,"percent":16.36628891,"px":167.59},"cj4":{"name":"cj4","unit":null,"percent":23.14536944,"px":237.01},"cj5":{"name":"cj5","unit":null,"percent":32.73241292,"px":335.18}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.41421","value":null}},"cm":{"name":"5-col-golden","prefix":"cm","rangeMin":"1024","rangeMax":"none","columns":{"cm1":{"name":"cm1","unit":null,"percent":5.63514099,"px":57.7},"cm2":{"name":"cm2","unit":null,"percent":9.11782718,"px":93.37},"cm3":{"name":"cm3","unit":null,"percent":14.75291791,"px":151.07},"cm4":{"name":"cm4","unit":null,"percent":23.87066378,"px":244.44},"cm5":{"name":"cm5","unit":null,"percent":38.62345011,"px":395.5}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.61803","value":null}},"cn":{"name":"5-col-hecton","prefix":"cn","rangeMin":"1024","rangeMax":"none","columns":{"cn1":{"name":"cn1","unit":null,"percent":4.61657915,"px":47.27},"cn2":{"name":"cn2","unit":null,"percent":7.99614593,"px":81.88},"cn3":{"name":"cn3","unit":null,"percent":13.84972455,"px":141.82},"cn4":{"name":"cn4","unit":null,"percent":23.98841542,"px":245.64},"cn5":{"name":"cn5","unit":null,"percent":41.54913493,"px":425.46}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.73205","value":null}},"ce":{"name":"5-col-hermidiagon","prefix":"ce","rangeMin":"1024","rangeMax":"none","columns":{"ce1":{"name":"ce1","unit":null,"percent":14.53849833,"px":148.87},"ce2":{"name":"ce2","unit":null,"percent":16.25447729,"px":166.45},"ce3":{"name":"ce3","unit":null,"percent":18.17299325,"px":186.09},"ce4":{"name":"ce4","unit":null,"percent":20.31795164,"px":208.06},"ce5":{"name":"ce5","unit":null,"percent":22.71607947,"px":232.61}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.11803","value":null}},"cl":{"name":"5-col-hermiolon","prefix":"cl","rangeMin":"1024","rangeMax":"none","columns":{"cl1":{"name":"cl1","unit":null,"percent":6.97630331,"px":71.44},"cl2":{"name":"cl2","unit":null,"percent":10.46445497,"px":107.16},"cl3":{"name":"cl3","unit":null,"percent":15.69668246,"px":160.73},"cl4":{"name":"cl4","unit":null,"percent":23.54502369,"px":241.1},"cl5":{"name":"cl5","unit":null,"percent":35.31753554,"px":361.65}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.5","value":null}},"ci":{"name":"5-col-penton","prefix":"ci","rangeMin":"1024","rangeMax":"none","columns":{"ci1":{"name":"ci1","unit":null,"percent":10.74001232,"px":109.98},"ci2":{"name":"ci2","unit":null,"percent":13.66140307,"px":139.89},"ci3":{"name":"ci3","unit":null,"percent":17.37744133,"px":177.94},"ci4":{"name":"ci4","unit":null,"percent":22.10427914,"px":226.35},"ci5":{"name":"ci5","unit":null,"percent":28.11686411,"px":287.92}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.27201","value":null}},"cg":{"name":"5-col-quadriagon","prefix":"cg","rangeMin":"1024","rangeMax":"none","columns":{"cg1":{"name":"cg1","unit":null,"percent":12.19163656,"px":124.84},"cg2":{"name":"cg2","unit":null,"percent":14.71652449,"px":150.7},"cg3":{"name":"cg3","unit":null,"percent":17.76431671,"px":181.91},"cg4":{"name":"cg4","unit":null,"percent":21.4433067,"px":219.58},"cg5":{"name":"cg5","unit":null,"percent":25.88421552,"px":265.05}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.20710","value":null}},"cf":{"name":"5-col-trion","prefix":"cf","rangeMin":"1024","rangeMax":"none","columns":{"cf1":{"name":"cf1","unit":null,"percent":13.51866618,"px":138.43},"cf2":{"name":"cf2","unit":null,"percent":15.61000383,"px":159.85},"cf3":{"name":"cf3","unit":null,"percent":18.02487143,"px":184.57},"cf4":{"name":"cf4","unit":null,"percent":20.81331904,"px":213.13},"cf5":{"name":"cf5","unit":null,"percent":24.0331395,"px":246.1}},"gutter":{"unit":null,"px":20.48,"percent":2},"ratio":{"name":"1.15470","value":null}}},"prefixes":{"index":["cp","co","cb","cc","c","cd","g","gb","gc","ch","ck","cj","cm","cn","ce","cl","ci","cg","cf"]}}'),
		
				gridwrap = document.createElement('div'),
				gridinner = (showgrid) ? '<div class="gridwrap"><div class="gridoverlay">' : '<div class="gridwrap"><div class="gridoverlay wrapper">',
				
				awidth = area.clientWidth,
				apadleft = (parseFloat(gs.getstyle(area, 'padding-left')) / awidth) * 100,
				apadright = (parseFloat(gs.getstyle(area, 'padding-right')) / awidth) * 100;
		
		if (showgrid) gridwrap.className = 'gridsetoverlaywrap';
		else gridwrap.className = 'gridsetoverlaywrap';
		
		for (j in set.grids) {
		
			var grid = set.grids[j],
					showreg = new RegExp('(^| )' + grid.prefix + '-showgrid( |$)');
			
			if (!showgrid || area.className.match(showreg)) {
			
				gridinner += '<div style="padding-left:' + apadleft + '%;padding-right:' + apadright + '%;" class="gridset ' + grid.prefix + '-show">';
				
				for (k in grid.columns) {
					
					var col = grid.columns[k];
					
					gridinner += '<div class="' + col.name + '"><small>' + col.name + '</small></div>';
				
				}
				
				gridinner += '</div>';
			
			}
		}
		
		gridinner += '</div></div>';
		
		gridwrap.innerHTML = gridinner;
		
		area.appendChild(gridwrap);
		
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	},
	
	getstyle : function (t, p){
	
	 if (t.currentStyle) return t.currentStyle[p];
	 else if (document.defaultView && document.defaultView.getComputedStyle) return document.defaultView.getComputedStyle(t, "").getPropertyValue(p);
	 else return t.style[p];
	 
	}

};

gs.init();