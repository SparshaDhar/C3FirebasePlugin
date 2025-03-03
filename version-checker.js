var C3AddonVersion_Obj = {
	storage: localStorage.getItem("C3AddonVersionCheck")
};
if (window.location.hostname === "preview.construct.net" && (C3AddonVersion_Obj.storage === null || C3AddonVersion_Obj.storage === "Y" || (Date.now() - C3AddonVersion_Obj.storage) > 86400000)) {

	C3AddonVersion_Obj.funcChecker = function() {
		var C3AddonVersion_Latest = {
			Sparsha_Firebase: {
				"Firebase SDK": "8.3.1",
				"Firebase Auth-Basic": "6.1.1",
				"Firebase Auth-Worker": "1.0.0",
				"Firebase Auth-Pro": "3.0.6",
				"Firebase Auth-Pro Mobile": "2.0.3",
				"Firebase Auth (Mobile)- Google": "1.0.0",
				"Firebase RD-Basic": "7.1.0",
				"Firebase RD-Pro": "4.1.0",
				"Firebase Storage": "2.0.1",
				"Firebase Dynamic Links": "0.1.0",
				$releaseNotes: "https://www.constructfirebase.com/releases/release-notes",
			},
			Sparsha_RemoteImage: {
				"Remote Image": "3.1.0",
				$releaseNotes: "https://www.construct.net/en/make-games/addons/570/remote-image",
			}
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//Please Do Not edit the code below without permission from the owner: @SparshaDhar.


		var isOutdated = false;
		var insHTML = "";


		function CompareActions(check, version, text) {
			function versionCompare(v1, v2, options) {
				var lexicographical = options && options.lexicographical,
					zeroExtend = options && options.zeroExtend,
					v1parts = v1.split('.'),
					v2parts = v2.split('.');

				function isValidPart(x) {
					return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
				}

				if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
					return NaN;
				}

				if (zeroExtend) {
					while (v1parts.length < v2parts.length) v1parts.push("0");
					while (v2parts.length < v1parts.length) v2parts.push("0");
				}

				if (!lexicographical) {
					v1parts = v1parts.map(Number);
					v2parts = v2parts.map(Number);
				}

				for (var i = 0; i < v1parts.length; ++i) {
					if (v2parts.length == i) {
						return 1;
					}

					if (v1parts[i] == v2parts[i]) {
						continue;
					} else if (v1parts[i] > v2parts[i]) {
						return 1;
					} else {
						return -1;
					}
				}

				if (v1parts.length != v2parts.length) {
					return -1;
				}

				return 0;
			}

			if (version != undefined && versionCompare(check, version) === 1) {
				insHTML += text + ": " + version + " ➜ " + check + "<br>";
				isOutdated = true;
			}
		}

		Object.keys(C3AddonVersion_Current).forEach(function(key) {
			insHTML += "<div class='div-slider'>";
			Object.keys(C3AddonVersion_Current[key]).forEach(function(k) {
				CompareActions(C3AddonVersion_Latest[key][k], C3AddonVersion_Current[key][k], [k]);
			});
			if (C3AddonVersion_Latest[key].$releaseNotes != undefined) insHTML += '<a href="' + C3AddonVersion_Latest[key].$releaseNotes + '" target="_blank"><h4>View Release Notes</h4></a>';
			if (C3AddonVersion_Latest[key].$downloadLink != undefined) insHTML += '<a href="' + C3AddonVersion_Latest[key].$downloadLink + '" target="_blank"><h4>Download Link</h4></a>';
			insHTML += "</div><br>";
		});

		insHTML = insHTML.substring(0, insHTML.length - 4);

		if (isOutdated) {
			//var shadowRoot = div.attachShadow({mode: 'open'});
			//C3AddonVersion_Latest.sliderDIVParent = document.getElementsByTagName('body')[0]document.createElement("version_sliderParent");
			var divP = document.createElement('div');
			var sliderDIVParent = divP.attachShadow({
				mode: 'open'
			});
			//document.getElementsByTagName("body")[0].appendChild(C3AddonVersion_Latest.sliderDIVParent);
			document.getElementsByTagName("body")[0].appendChild(divP)

			sliderDIVParent.innerHTML = `
				<div id="version_slider" class="version-slide-out" style="max-height:calc(100vh - 50px);">
					<svg class="close-slider" height="12" width="12" onclick="C3AddonVersion_Obj.sliderDIV.setAttribute('class', 'version-slide-out')">
	    				<line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2"/>
	    				<line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2"/>
	    			</svg>
				<div style="overflow-y:auto;max-height:calc(100vh - 50px);">
	        		<a href="https://github.com/SparshaDhar/C3AddonVersionChecker/" style="color:black"><h3>ADDON UPDATES AVAILABLE</h3></a>
	        		<i><b>This note is only shown in preview.construct.net</b></i><br>
	        
	        		<div class="version-snooze">
	        			<input type="checkbox" id="version-snooze-box" onclick="C3AddonVersion_Obj.Snooze()">
	        			<label for="version-snooze-box">Snooze notification for 1 day</label>
	        		</div><br>
	        		` + insHTML + `
				</div>
				</div>

				<style>
					#version_slider .close-slider{position:absolute;right:8px;top:8px;cursor: pointer;}
					#version_slider .div-slider{padding:8px;border:1px solid black;border-radius:3px;}
					#version_slider h3{
						margin:0;
						margin-bottom:8px
					}
					#version_slider .version-snooze{padding:8px;padding-bottom:4px;}
					#version-snooze-box{position:relative;top:2.5px;}

					#version_slider h4{
						margin:0;
					}
					#version_slider {
					    color:black;
					    font-size:12px;
					    font-family: sans-serif;
					    position: absolute;
					    top:8px;
					    max-width:302px;
					    padding:16px;
					    padding-right:18px;
					    background: #FFD54F;
					    -moz-user-select: none;  
					    -webkit-user-select: none;  
					    -ms-user-select: none;  
					    -o-user-select: none;  
					    user-select: none;
					}

					.version-slide-in {
						transition: left 1s;
					    left:0px;
					}

					.version-slide-out {
						transition: left 2s;
					    left:-336px;
					}
				<//style>
			`;
			var isMouseover = false;

			C3AddonVersion_Obj.sliderDIV = sliderDIVParent.getElementById('version_slider');

			//Initial Slide in after 0.5 seconds
			setTimeout(function() {
				C3AddonVersion_Obj.sliderDIV.setAttribute('class', 'version-slide-in')
			}, 500);

			//Mouse Event Listeners
			var funcEvent1 = function() {
				isMouseover = true;
				C3AddonVersion_Obj.sliderDIV.setAttribute('class', 'version-slide-in')
			}
			var funcEvent2 = function() {
				isMouseover = false;
				setTimeout(function() {
					if (isMouseover === false) {
						C3AddonVersion_Obj.sliderDIV.setAttribute('class', 'version-slide-out');
						Destroy();
					}
				}, 500);
			}
			C3AddonVersion_Obj.sliderDIV.addEventListener("mouseenter", funcEvent1, false);
			C3AddonVersion_Obj.sliderDIV.addEventListener("mouseleave", funcEvent2, false);

			//Slide out after 8 seconds
			setTimeout(function() {
				if (isMouseover === false) {
					C3AddonVersion_Obj.sliderDIV.setAttribute('class', 'version-slide-out');
					Destroy();
				}
			}, 8000);

			//Snooze
			C3AddonVersion_Obj.Snooze = function() {
				var checkBox = sliderDIVParent.getElementById('version-snooze-box');
				if (checkBox.checked) localStorage.setItem('C3AddonVersionCheck', Date.now());
				else localStorage.setItem('C3AddonVersionCheck', 'Y');
			}

			//Destroy C3AddonChecker elements, events, objects and references if it is outside view
			var isDestroyed = false;

			function Destroy() {
				if (isMouseover === false) {
					setTimeout(function() {
						if (isDestroyed == false && getComputedStyle(C3AddonVersion_Obj.sliderDIV).left === "-336px") {
							divP.remove();
							C3AddonVersion_Obj.sliderDIV.removeEventListener("mouseenter", funcEvent1);
							C3AddonVersion_Obj.sliderDIV.removeEventListener("mouseleave", funcEvent2);
							C3AddonVersion_Latest = null;
							C3AddonVersion_Obj = null;
							isDestroyed = true;
						}
					}, 6000)
				}
			}
		}
	}
	setTimeout(C3AddonVersion_Obj.funcChecker, 1500);
} else C3AddonVersion_Obj = null;
