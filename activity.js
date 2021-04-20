let fs=require('fs');
let path=require('path');
let extentions={
    Images:['.png','.jpg','.jpeg','.gif'],
    Audio:['.mp3'],
    Documents:['.pdf','.txt','.doc'],
    Compressed:['.zip','.rar'],
    Videos:['.mkv','.mp4']
}
let input=process.argv.slice(2);
let folderPath=input[0];
//console.log(input[0]);
let extFolderPath=folderPath;
function createFolder(){
    console.log(extFolderPath);
    fs.mkdirSync(extFolderPath);
}
function checkFolder(extention,folderPath){
for(let key in extentions){
    let arr=extentions[key];
    let eon=arr.includes(extention);
    if(eon==true){
        //console.log(key);
        extFolderPath=path.join(folderPath,key);
       console.log(extFolderPath);
       break;
    }
}
return fs.existsSync(extFolderPath);
}
let content=fs.readdirSync(folderPath);
for(let i=0;i<content.length;i++){
    //console.log(content[i]);
    //extentions
    //console.log(path.extname(content[i]));
    let extentionName=path.extname(content[i]);
    let extentionFolderExist=checkFolder(extentionName, folderPath);
    console.log(extentionFolderExist);
    if(extentionFolderExist==false){
        createFolder();
        //file move krwa deni h folder k andar 
    }
}