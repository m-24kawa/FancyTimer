'use strict';
{
  function putStr2(tgtStr,ix,iy) {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // 文字列削除処理（一括）
    ctx.beginPath();
    ctx.moveTo(ix,iy);
    ctx.lineTo(ix+(tgtStr.length)*45, iy);
    ctx.lineTo(ix+(tgtStr.length)*45-7, iy+75);
    ctx.lineTo(ix-7, iy+75);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#aaa';
    ctx.fill();

    // 文字列描画処理
    for (let cnt=0;cnt<tgtStr.length;cnt++){
      //console.log(cnt,tgtStr[cnt]);
      if (tgtStr[cnt]===':'){
        putChar_2D(ctx, ix + cnt * 45, iy);
      }
      if (tgtStr[cnt]==='.'){
        putChar_2E(ctx, ix + cnt * 45, iy);
      }
      if (tgtStr[cnt]==='-'){
        putChar_3A(ctx, ix + cnt * 45, iy);
      } 
      if (tgtStr[cnt]>='0' && tgtStr[cnt]<='9'){
        let tgtNum = tgtStr.charCodeAt(cnt) - 0x30;
        //console.log(cnt,tgtStr[cnt],tgtNum);
        putNum(ctx, tgtNum, ix + cnt * 45, iy);
      }
    }
  } // end of function putStr2

  // Dotの描画
  function putChar_2E(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x-5,y+64);
    ctx.lineTo(x+5,y+64);
    ctx.lineTo(x+4,y+74);
    ctx.lineTo(x-6,y+74);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }
  // Colonの描画
  function putChar_2D(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x+14,y+16);
    ctx.lineTo(x+24,y+16);
    ctx.lineTo(x+23,y+26);
    ctx.lineTo(x+13,y+26);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+11,y+48);
    ctx.lineTo(x+21,y+48);
    ctx.lineTo(x+20,y+58);
    ctx.lineTo(x+10,y+58);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }
  // マイナスの描画
  function putChar_3A(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x+2,y+37);
    ctx.lineTo(x+7,y+32);
    ctx.lineTo(x+27,y+32);
    ctx.lineTo(x+32,y+37);
    ctx.lineTo(x+27,y+42);
    ctx.lineTo(x+7,y+42);
    ctx.lineTo.closePath;
    ctx.fillStyle = '#000000';
    ctx.fill();
  }

  function putNum(ctx, Num, x, y){
    // 0～9描画時、各セグメントのON/OFF情報をビットに置き換えた配列
    var BitSegs = [0x77, 0x12, 0x5d, 0x5b, 0x3a, 0x6b, 0x6f, 0x72, 0x7f, 0x7b];
    //console.log('Num : BitSeg',Num,BitSegs[Num]);
    drawNum( ctx, BitSegs[Num],x,y);
  }
  
  function drawNum(ctx, bitInfo,ix,iy){
    var BitChk = [0x00, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01];
    var SegOffsetX = [null, 5, 4, 36, 2, 1, 33, -1];
    var SegOffsetY = [null, 5, 6, 6, 37, 38, 38, 69];
    for(let i=0; i<8; i++){
      console.log(' Segment',bitInfo,i,(bitInfo & BitChk[i])!=0 );
    }
    //セグメント１作成
    if (bitInfo & BitChk[1]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[1],iy+SegOffsetY[1]);
      ctx.lineTo(ix+SegOffsetX[1]+5,iy+SegOffsetY[1]-5);
      ctx.lineTo(ix+SegOffsetX[1]+25,iy+SegOffsetY[1]-5);
      ctx.lineTo(ix+SegOffsetX[1]+30,iy+SegOffsetY[1]);
      ctx.lineTo(ix+SegOffsetX[1]+25,iy+SegOffsetY[1]+5);
      ctx.lineTo(ix+SegOffsetX[1]+5,iy+SegOffsetY[1]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    }
    //セグメント２作成
    if (bitInfo & BitChk[2]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[2],iy+SegOffsetY[2]);
      ctx.lineTo(ix+SegOffsetX[2]+5,iy+SegOffsetY[2]+5);
      ctx.lineTo(ix+SegOffsetX[2]+3,iy+SegOffsetY[2]+25);
      ctx.lineTo(ix+SegOffsetX[2]-2,iy+SegOffsetY[2]+30);
      ctx.lineTo(ix+SegOffsetX[2]-7,iy+SegOffsetY[2]+25);
      ctx.lineTo(ix+SegOffsetX[2]-5,iy+SegOffsetY[2]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント３作成
    if (bitInfo & BitChk[3]){
      //console.log('BitSeg3 ');
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[3],iy+SegOffsetY[3]);
      ctx.lineTo(ix+SegOffsetX[3]+5,iy+SegOffsetY[3]+5);
      ctx.lineTo(ix+SegOffsetX[3]+3,iy+SegOffsetY[3]+25);
      ctx.lineTo(ix+SegOffsetX[3]-2,iy+SegOffsetY[3]+30);
      ctx.lineTo(ix+SegOffsetX[3]-7,iy+SegOffsetY[3]+25);
      ctx.lineTo(ix+SegOffsetX[3]-5,iy+SegOffsetY[3]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント４作成
    if (bitInfo & BitChk[4]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[4],iy+SegOffsetY[4]);
      ctx.lineTo(ix+SegOffsetX[4]+5,iy+SegOffsetY[4]-5);
      ctx.lineTo(ix+SegOffsetX[4]+25,iy+SegOffsetY[4]-5);
      ctx.lineTo(ix+SegOffsetX[4]+30,iy+SegOffsetY[4]);
      ctx.lineTo(ix+SegOffsetX[4]+25,iy+SegOffsetY[4]+5);
      ctx.lineTo(ix+SegOffsetX[4]+5,iy+SegOffsetY[4]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント５作成
    if (bitInfo & BitChk[5]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[5],iy+SegOffsetY[5]);
      ctx.lineTo(ix+SegOffsetX[5]+5,iy+SegOffsetY[5]+5);
      ctx.lineTo(ix+SegOffsetX[5]+3,iy+SegOffsetY[5]+25);
      ctx.lineTo(ix+SegOffsetX[5]-2,iy+SegOffsetY[5]+30);
      ctx.lineTo(ix+SegOffsetX[5]-7,iy+SegOffsetY[5]+25);
      ctx.lineTo(ix+SegOffsetX[5]-5,iy+SegOffsetY[5]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント６作成
    if (bitInfo & BitChk[6]){
      //console.log('BitSeg6 ');
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[6],iy+SegOffsetY[6]);
      ctx.lineTo(ix+SegOffsetX[6]+5,iy+SegOffsetY[6]+5);
      ctx.lineTo(ix+SegOffsetX[6]+3,iy+SegOffsetY[6]+25);
      ctx.lineTo(ix+SegOffsetX[6]-2,iy+SegOffsetY[6]+30);
      ctx.lineTo(ix+SegOffsetX[6]-7,iy+SegOffsetY[6]+25);
      ctx.lineTo(ix+SegOffsetX[6]-5,iy+SegOffsetY[6]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    } 
    //セグメント７作成
    if (bitInfo & BitChk[7]){
      ctx.beginPath();
      ctx.moveTo(ix+SegOffsetX[7],iy+SegOffsetY[7]);
      ctx.lineTo(ix+SegOffsetX[7]+5,iy+SegOffsetY[7]-5);
      ctx.lineTo(ix+SegOffsetX[7]+25,iy+SegOffsetY[7]-5);
      ctx.lineTo(ix+SegOffsetX[7]+30,iy+SegOffsetY[7]);
      ctx.lineTo(ix+SegOffsetX[7]+25,iy+SegOffsetY[7]+5);
      ctx.lineTo(ix+SegOffsetX[7]+5,iy+SegOffsetY[7]+5);
      ctx.lineTo.closePath;
      ctx.fillStyle = '#000000';
      ctx.fill();
    }

  }
  const buttonElement = document.querySelector('button');
  let timerId;
  let updateFlg = 1;
  var curTime;
  
  function showSeconds(){
    setInterval(()=>{
      const d = new Date();
      const msec = d.getMilliseconds();
      const csec = String(Math.floor(msec/10)).padStart(2,'0');
      const hour = String(d.getHours()).padStart(2,'0');
      const min = String(d.getMinutes()).padStart(2,'0');
      const sec = String(d.getSeconds()).padStart(2,'0');
      if(updateFlg>0){
        curTime = hour + ':' + min + ':' + sec + '.' +csec;
      }
      putStr2(curTime,25,50);
    },10);
  }
   buttonElement.addEventListener('click',() => {
     if(updateFlg===0){
       updateFlg = 1;
     }else{
       updateFlg = 0;
     };
   });
  showSeconds();
}