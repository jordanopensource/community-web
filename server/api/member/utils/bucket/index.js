// import AWS from "aws-sdk";
// import { promises as fs } from 'fs';

// export class BucketService {
//   bucket;
//   bucketName;
//   bucketLink;
//   subPath;
//   constructor(options) {
//     this.bucket = new AWS.S3({
//       endpoint: options.DO_SPACES_BUCKET_PUBLIC_LINK,
//       credentials: new AWS.Credentials({
//         accessKeyId: options.ACCESS_KEY_ID,
//         secretAccessKey: options.ACCESS_KEY_SECRETE,
//       }),
//     });

//     this.bucketName = options.DO_SPACES_BUCKET_NAME;
//     this.subPath = options.DO_SPACES_BUCKET_SUB_PATH;
//     this.bucketLink = `https://${options.DO_SPACES_BUCKET_PUBLIC_LINK_PREFIX}/${options.BUCKET_PUBLIC_LINK}${this.subPath}`;
//   }

//   async uploadFile(file, path, fileName = "") {

//     fileName = fileName
//       ? `${fileName}.${file.originalFilename.split(".")[1]}`
//       : `${Date.now()}-${file.originalFilename}`;

//     console.log('👁️👁️👁️👁️👁️👁️👁️👁️');
//     console.log(`fileName: `, fileName);
//     console.log('👁️👁️👁️👁️👁️👁️👁️👁️');

//     const bucketPath = `${this.bucketName}/${path && path}`;
//     console.log('Bucket path', bucketPath)

//     // let newFile = ''
//     console.log('PASSED FILE PATH: ', file.filepath)
//     await fs.readFile(file.filepath).then(data => {
//       // console.log(fileBuffer)
//       // newFile = fileBuffer
//       console.log("BUFFER: ", data)
//       return new Promise(async (resolve, reject) => {
//         console.log('...............................')
//         // console.log('file name: ', fileName)
//         console.log('new file: ', typeof data)
//         console.log('new file BUFFER: ', typeof data.buffer)
//         console.log('...............................')
//         this.bucket.putObject(
//           {
//             Bucket: bucketPath,
//             Key: fileName,
//             Body: data.buffer,
//             ACL: "public-read",
//           },
//           (error) => {
//             console.log('INSIDE THE CALLBACK')
//             if (!error) {
//               console.log('no error');
//               resolve(`${this.bucketLink}/${path}/${fileName}`);
//             } else {
//               reject(
//                 new Error(
//                   `ERROR: ${error.message || error.code || "Something went wrong"}`
//                 )
//               );
//             }
//           }
//         );
//       });
//     })
//   }
// }
