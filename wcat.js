// wCat is a clone of cat command available in bash but not in windows cmd.

// It is used to display or make a copy content of one or more files in the terminal 

// General Syntax:
// node wcat -[options] [files]
// option to remove big line break (-s)
// option to add line number to non empty lines (-b)
// option to add line numbers to all lines (-n) 
// Commands:
// 1- node wcat.js filepath => displays content of the file in the terminal 
// 2- node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal in (contactinated form) in the given order.
// 3- node wcat.js -s filepath => convert big line breaks into a singular line break
// 4- node wcat -n filepath => give numbering to all the lines 
// 5- node wcat -b filepath => give numbering to non-empty lines
// We can mix and match the options.
// Edge cases:
// 1- If file entered is not found then it gives file does not exist error.
// 2- -n and -b are 2 options which are mutually exclusive so if user types both of them together only the first enter option should work.
var fs=require('fs');
let input=process.argv.slice(2);
console.log("input ",input);
let options=[];
let filePaths=[];
for(let i=0;i<input.length;i++){
    if(input[i]=="-s" || input[i]=="-b" || input[i]=="-n"){
        options.push(input[i]);
    }else{
        filePaths.push(input[i]);
    }
}
console.log("options ",options);
console.log("filePath ",filePaths);

for(let i=0;i<filePaths;i++){
    
    let isFilePresent=fs.existsSync(filePaths[i]);
    if(isFilePresent==false){
        console.log("filePath ", filePaths[i], "does not exist");
        return;
    }
}

//read n files
let totalContent="";
for(let i=0;i<filePaths.length;i++){
    let content=fs.readFileSync(filePaths[i],"utf-8");
    totalContent+= content +"\r\n";
}
console.log(totalContent);


let isSoption=options.includes("-s");
if(isSoption){
   let outputArr=totalContent.split("\r\n");
   let tempArr=[];
   for(let i=0;i<outputArr.length;i++){
       let isElementValid= outputArr[i]!="";
       if(isElementValid){
           tempArr.push(outputArr[i]);
       }
   }
   totalContent=tempArr.join("\n");
}

let isN=options.includes("-n");
let isB=options.includes("-b");
let finalOption;

if (isN){
    if(isB){
        let idxB= options.indexOf("-b");
        let idxN=options.indexOf("-n");
        finalOption=idxB<idxN?"-b":"-n";
    }else{
        finalOption="-n";
    }
}else if(isB){
    finalOption="-b";
}
if(finalOption=='-n'){
// let isN=options.includes("-n");
// if(isN){
    let count=1;
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=count+"."+contentArr[i];
        count++;
    }
    totalContent=contentArr.join("\r\n");
//}
}
if(finalOption=='-b'){
// let isB=options.includes("-b");
// if(isB){
    let count=1;
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
        contentArr[i]=count+"."+contentArr[i];
        count++;
        }
    }
    totalContent=contentArr.join("\r\n");
//}
}

console.log(totalContent);