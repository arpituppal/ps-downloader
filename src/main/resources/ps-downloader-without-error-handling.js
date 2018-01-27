
function saveFile(url, name, tries) {
    if(tries<=0)
        return;
    console.log("try - "+(10-tries));
    url = url.replace('http://', 'https://');
  var filename = name;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };
    xhr.onerror = function(){
        setTimeout(function(){
            saveFile(url, name, tries-1)
        }, 3000)
    }
  xhr.open('GET', url);
  xhr.send();
}

async function clickDownload(lecName){
	await new Promise(move=>{
							setTimeout(function(){
								var uri=document.getElementsByTagName('video')[0].src;
								saveFile(uri,lecName, 10);
								move();
							},8000);
	});
}

function makeFileName(name){
    name = name.replace(' ', '_');
    name = name+'.mp4';
    return name;
}

async function foo(chapters) {
    for (var i = 0; i < chapters.length; i++) { 
		var lectures = chapters[i].getElementsByTagName('li');
		for(var j=0;j<lectures.length;++j){
				await new Promise(next=> {
						setTimeout(function(){
						var lecName=lectures[j].getElementsByTagName('h3')[0].innerText;
                        lecName = (i+1)+'_'+lecName;
						lectures[j].click();
						clickDownload(makeFileName(lecName));
						next()
					},5000);
				}) ;
		}
    }
}

var chapters = document.getElementsByClassName('clips');
foo(chapters)
