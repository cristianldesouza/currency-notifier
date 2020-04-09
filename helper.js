const fs = require('fs');
const parser = require('handlebars');
const pcurrent = __dirname;


module.exports.compileAll = async function compileAll(array){
    let all = ''
    let temporary = {}
    for(let each of array){
        temporary = await module.exports.compile(each.part)
        if(each.obj){
            all += temporary(each.obj)
        }else{
            all += temporary()
        }
    }

    return all

}

module.exports.compile = async function(file){
   return parser.compile(await module.exports.parseFile(pcurrent+'/public/'+file+'.html'))
}

module.exports.parseFile = function parseFile(caminho){
    return new Promise ((resolve, reject)=>{
        fs.readFile(caminho, function read(err, data){
            resolve(data.toString())
        })
    })
}
