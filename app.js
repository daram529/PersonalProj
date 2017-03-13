	var express = require('express'); 
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var xlsx = require('node-xlsx');
    var fs = require('fs');

    app.use(bodyParser.json());  

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).single('file');

    /** API path that will upload the files */
    app.post('/upload', function(req, res) {

        console.log(req);

        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            /** Multer gives us file info in req.file object */
            if(!req.file){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            console.log(req.file.path);
            var obj = xlsx.parse(req.file.path); // parses a file
            // console.log(obj[0].data);
            res.json({data: obj[0].data});

            // deleting uploaded files
            // var fs = require('fs');
            // try {
            //     fs.unlinkSync(req.file.path);
            // } catch(e) {
            //     //error deleting the file
            // }
        })
       
    });
	
	app.get('/',function(req,res){
		res.sendFile(__dirname + "/index.html");
	});

    app.listen('3000', function(){
        console.log('running on 3000...');
    });