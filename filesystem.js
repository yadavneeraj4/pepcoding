let fs=require('fs');
let data= fs.readFileSync('abc.txt');
console.log(data.toString());
let wdata="hi guys this is guru mann";
fs.writeFileSync('write.txt',wdata);
fs.appendFileSync('write.txt','this is appended data');
fs.unlinkSync('abc.txt');
console.log(fs.existsSync('write.txt'));
fs.mkdirSync('javascript'); // to create folder