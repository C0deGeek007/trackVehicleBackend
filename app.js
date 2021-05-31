const csvParser = require('csv-parser');
const admin=require('firebase-admin');
const serviceAccount= require('./serviceAccountKey.json');
const csv=require('csv-parser');
const fs=require('fs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();

const docRef = db.collection('vehicle').doc('Iv4AWGa0BYTr9UQ2iEPs');

const res=[];
const interval = setInterval(()=>{
  if(res.length==0){
    clearInterval(interval);
    return 0;
  }
  //console.log(res.shift());
  docRef.set(res.shift());
},200);



fs.createReadStream('./vehicleData.csv')
  .pipe(csv())
  .on('data', (data) => res.push(data))
  .on('end',()=>{
    //console.log(res);
    console.log("end");
  });

