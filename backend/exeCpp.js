const fs = require('fs');
const path = require('path');
const {v4 :uuid}=require('uuid');
const outputPath = path.join (__dirname, 'outputs');
const {exec}=require('child_process');


if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath , {recursive: true});
}
const exeCpp = (filepath,inputPath) => {
    const jobId = path.basename(filepath).split('.')[0];
    const filename = `${jobId}.exe`;
    const outPath = path.join(outputPath,filename);
    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${filename} < ${inputPath}`,
            (error, stdout,stderr) => {
            if(error){
                reject(error);
            }if(stderr){
                reject(stderr);
            
            }resolve(stdout);
        });
    });
};
module.exports ={ exeCpp };