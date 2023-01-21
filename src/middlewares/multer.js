import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const __dirname = path.resolve();
    console.log(file);
    const destination = path.join(__dirname, './assets', request.route.path);
    callback(null, destination); // 第一引数はpotential errorのこと。nullでいい。./uploadsは相対パス。
  },

  filename: function (request, file, callback) {
    const extension = file.mimetype.split('/')[1];
    console.log(request.body.meetupId); // meetupidとuserIdを使ってfile名を作ろうか
    const fileName = request.body.meetupId + '-' + request.body.userId + '-' + Date.now() + '.' + extension;
    console.log(fileName);
    callback(null, fileName);
  },
}); // 後で、ffmpegを使った方法に直すことになる。ちゃんとしたmp3に直す。file名に関してはこのやり方でいい。

const multerParser = multer({ storage });
export default multerParser;
