var downloadList = [];

saveFile = function(url, fileName){
    var x = fileName+"|"+url;
    downloadList.push(x);
    console.log(downloadList);
}

async function getVideoUrl(lecName){
	await new Promise(move=>{
							setTimeout(function(){
								var url=document.getElementsByTagName('video')[0].src;
								saveFile(url,lecName);
								move();
							},2000);
	});
}
 
function addUnderscores(name){
    name = name.split(' ').join('_');
    return name;
}

 async function bar(modules){
    for(var i=0; i<modules.length; i++){
    var chapterName = modules[i].getElementsByTagName('h2')[0].innerText;
    chapterName = addUnderscores(chapterName);
    chapterName = (i+1)+"_"+chapterName;
    console.log(chapterName);
    var lectures = modules[i].getElementsByTagName('li');
    for(var j=0;j<lectures.length;++j){
				await new Promise(next=> {
						setTimeout(function(){
						var lecName=lectures[j].getElementsByTagName('h3')[0].innerText;
                        lecName = addUnderscores(lecName);
                        lecName = (j+1)+"_"+lecName+".mp4";
                        console.log(lecName);
                        var name = chapterName+'|'+lecName;
                        console.log(name);
						lectures[j].click();
						getVideoUrl(name);
						next()
					},3000);
				}) ;
		}
    }
}   
   
var modules = document.getElementsByClassName('module');
bar(modules);