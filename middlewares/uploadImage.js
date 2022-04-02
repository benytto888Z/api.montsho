const fs = require('fs')

module.exports = async function(req,res,next){
    console.log("req file",req);
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: " Aucun fichier n'est uploader"})
        const file = req.files.file;

       // console.log(file.mimetype)

        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Ce fichier est trop volumineux"})
        } // 1mb
        
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' ){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Le format de ce fichier n'est pas pris en compte"})
        }

        next()
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const removeTmp = (path)=>{
    fs.unlink(path,err=>{
        if(err)  throw err
    })
}