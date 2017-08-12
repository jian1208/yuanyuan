var oTabBox = document.getElementById("tab-box"),
	aLi = oTabBox.getElementsByTagName("li"),
	aDiv = getClass("tab-item",oTabBox);

	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onclick = function(){
			for(var j=0;j<aDiv.length;j++){
				aDiv[j].style.display = "none";
				aLi[j].className = "";
			}
			this.className = "active";
			aDiv[this.index].style.display = "block";
		}
	}

	//下拉
	var oSelBox = document.getElementById('select-box');
	var oSelBtn = getClass('sel-btn',oSelBox)[0];
	var oSelMenu = getClass('sel-menu',oSelBox)[0];
	var aOption = oSelMenu.getElementsByTagName('li');
	var oP = oSelBtn.getElementsByTagName('p')[0];
	var oSpan = oSelBtn.getElementsByTagName('span')[0];
	oSelBtn.onmousedown = function(){
		oSelBox.className = 'select-box selected';
	}
	oSelBtn.onmouseup = function(){
		oSelBox.className = 'select-box';
		if(oSelMenu.style.display == 'none' || oSelMenu.style.display == ''){
			oSelMenu.style.display = 'block';
		}else{
			oSelMenu.style.display = 'none';
		}
	}
	for(var i=0;i<aOption.length;i++){
		aOption[i].onclick = function(){
			oP.innerHTML = this.innerHTML;
			oSelMenu.style.display = 'none';
		}
	}

	document.onclick = function(e){
		var target = e.target || event.srcElement;
		if(target != oP &&target != oSpan && target != oSelBtn){
			oSelMenu.style.display = 'none';
		}
	}

	//弹层//
	var oSmallImg = getClass('small-img')[0];
	var aDialogLi = oSmallImg.getElementsByTagName('li');
	var oDialogBox = getClass('dialog-box')[0];
	var oDialogBody = getClass('dialog-body',oDialogBox)[0];
	var oDialogImg = oDialogBody.getElementsByTagName('img')[0];
	var oDialogClose = getClass('dialog-close',oDialogBox)[0];
	var oDialogPrev = getClass('dialog-prev',oDialogBox)[0];
	var oDialogNext = getClass('dialog-next',oDialogBox)[0];
	var oSlideBtn = getClass('slide-btn',oDialogBox)[0];
	var oContent = getClass('content',oDialogBox)[0];
	var iNow = 0;
	for(var i=0;i<aDialogLi.length;i++){
		aDialogLi[i].index = i;
		aDialogLi[i].onclick = function(){
			var oImg = this.getElementsByTagName('img')[0];
			oDialogBox.style.display = 'block';
			oDialogImg.src=oImg.src;
			oContent.style.animation = 'show 1s ease forwards';
			iNow = this.index;
		}
	}
//关闭弹层
oDialogBox.onclick = function(e){
	var target = e.target || event.srcElement;
	if(target == oDialogBox || target == oDialogClose){
		oDialogBox.style.display = 'none';
	}
}
oDialogPrev.onclick = function(){
	iNow--;
	if(iNow == -1){
		iNow = aDialogLi.length -1;
	}
	slideNext();
}
oDialogNext.onclick = function(){
	iNow++;
	if(iNow == aDialogLi.length){
		iNow = 0;
	}
	slideNext();
}
function slideNext(){
	var nextLi = aDialogLi[iNow];
	var nextSrc = nextLi.getElementsByTagName('img')[0].src;
	var oImg = document.createElement('img');
	oImg.src=nextSrc;
	var oldImg = oDialogBody.children[0];
	oDialogBody.insertBefore(oImg,oldImg);
	oldImg.style.animation = 'hide 1s ease forwards';

	setTimeout(function(){
		oDialogBody.removeChild(oldImg);
	},1000);
}
var timer = '';
oSlideBtn.onclick = function(){
	if(timer){
		clearInterval(timer);
		timer = '';
	}else{
		timer = setInterval(function(){
			oDialogPrev.onclick();
		},1000);
	}
}

















