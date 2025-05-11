'use strict';
{
  const urlParams = new URLSearchParams(window.location.search);
  let cvBackGround = urlParams.get('back');
  let cvForeGround = urlParams.get('fore');
  if (cvBackGround==null || cvForeGround==null){
    cvBackGround = '#66c';  // 背景色
    cvForeGround = '#ddd';  // 文字色
  }
  function InitScreen(){
    // 画面背景初期化
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(canvas.width,0);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.lineTo(0,canvas.height);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvBackGround;
    ctx.fill();
  }
  function clearStr(tgtStr,ix,iy){
    // 文字列削除処理（一括）
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(ix-2,iy);
    ctx.lineTo(ix+(tgtStr.length)*45, iy);
    ctx.lineTo(ix+(tgtStr.length)*45-7, iy+75);
    ctx.lineTo(ix-9, iy+75);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvBackGround;
    ctx.fill();
  }
  function putStr2(tgtStr,ix,iy) {
    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }
    const ctx = canvas.getContext('2d');

    // 文字列削除処理（一括）
    ctx.beginPath();
    ctx.moveTo(ix-2,iy);
    ctx.lineTo(ix+(tgtStr.length)*45, iy);
    ctx.lineTo(ix+(tgtStr.length)*45-7, iy+75);
    ctx.lineTo(ix-9, iy+75);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvBackGround;
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
    ctx.fillStyle = cvForeGround;
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
    ctx.fillStyle = cvForeGround;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x+11,y+48);
    ctx.lineTo(x+21,y+48);
    ctx.lineTo(x+20,y+58);
    ctx.lineTo(x+10,y+58);
    ctx.lineTo.closePath;
    ctx.fillStyle = cvForeGround;
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
    ctx.fillStyle = cvForeGround;
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
    // for(let i=0; i<8; i++){
    //   console.log(' Segment',bitInfo,i,(bitInfo & BitChk[i])!=0 );
    // }
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
      ctx.fillStyle = cvForeGround;
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
      ctx.fillStyle = cvForeGround;
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
      ctx.fillStyle = cvForeGround;
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
      ctx.fillStyle = cvForeGround;
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
      ctx.fillStyle = cvForeGround;
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
      ctx.fillStyle = cvForeGround;
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
      ctx.fillStyle = cvForeGround;
      ctx.fill();
    }
  }

  function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
  }
  
  // msec→hh:mm:ss.cc 変換して表示
  function putTime( currTime ){
    const t_hmsc = currTime % (24 * 3600 * 1000);
    const hour = String(Math.floor(t_hmsc / (3600 * 1000 ))).padStart(2,'0');
    const t_msc = t_hmsc % (3600 * 1000);
    const min = String(Math.floor(t_msc / (60 * 1000 ))).padStart(2,'0');
    const t_sc = t_msc % (60 * 1000);
    const sec = String(Math.floor(t_sc / 1000 )).padStart(2,'0');
    const t_c = t_sc % 1000;
    const csec = String(Math.floor(t_c/10)).padStart(2,'0');
    var strTime = hour + ':' + min + ':' + sec + '.' +csec;
    putStr2(strTime,25,50);
  }

  // ボタン要素取得(表示)
  const buttonElement_start = document.getElementById('btn_start');
  const buttonElement_reset = document.getElementById('btn_reset');      
  //  ボタン要素取得(非表示)
  const buttonElement_stop = document.getElementById('btn_stop');
  buttonElement_stop.style.display = 'none';
  const buttonElement_lap = document.getElementById('btn_lap');
  buttonElement_lap.style.display = 'none';
  const buttonElement_lapstar = document.getElementById('btn_lapstar');
  buttonElement_lapstar.style.display = 'none';
  const buttonElement_cont = document.getElementById('btn_cont');
  buttonElement_cont.style.display = 'none';
  //const buttonElement = document.querySelector('button');
  let tBase = 0; 
  let tDiff = 0;
  let tOffset = 0;    // 累積更新時間
  let tPrevDiff = 0;  // LAP押下時のタイム
  let tLapBase = 0;   // Lap基準タイム 
  InitScreen();
  putTime(tOffset);

  var timerId;
  let Ud_flg =0; // タイマ表示・非表示
  //let Lap_flg = 1; // LAP可否フラグ
  let Lap_on = 0; // LAPモード設定(未設定:0、設定中:1)
  let Set_on = 0; // LAP基準タイム設定

  buttonElement_start.addEventListener('click',() => {
    // console.log(' tOffset  :',tOffset);
    // console.log(' tDiff    :',tDiff);
    Ud_flg =1; // 表示ON
    tBase = Date.now();//UTC time

    timerId=setInterval(()=>{
      tDiff = Date.now() - tBase;
      // ボタン表示 (Lapモードのときはスキップ)
      if (Lap_on==0) {
        buttonElement_start.style.display = 'none';
        buttonElement_reset.style.display = 'none';
        buttonElement_stop.style.display = 'inline-block';
        if (Set_on==1) {      
            buttonElement_lapstar.style.display = 'inline-block';
        } else {
            buttonElement_lap.style.display = 'inline-block';
        }
      }
      // 表示更新
      if (Ud_flg==1){
        putTime(tOffset + tDiff);
      }
    },10);

    // 表示値切替
    tOffset = tOffset + tDiff;
    tDiff = 0;
  });

  // STOPボタン押下処理
  buttonElement_stop.addEventListener('click',()=>{
      // 繰り返し処理終了
      clearInterval(timerId);
      if (Lap_on ==1){
        putTime(tOffset + tDiff);
      };
      Lap_on = 0; // LAPモード終了
      Set_on = 0; // LAP基準タイムを無効にする
      // ボタン表示切替
      buttonElement_stop.style.display = 'none';
      buttonElement_lap.style.display = 'none';
      buttonElement_lapstar.style.display = 'none';
      buttonElement_cont.style.display = 'none';
      buttonElement_start.style.display = 'inline-block';
      buttonElement_reset.style.display = 'inline-block';
      return;
  });
  // LAPボタン押下処理
  buttonElement_lap.addEventListener('click',()=>{
    Ud_flg=0; // 表示更新なし
    Lap_on = 1; // Lapモード
    // ボタン表示切替
    buttonElement_lap.style.display = 'none';
    buttonElement_cont.style.display = 'inline-block';
    tPrevDiff = tOffset+tDiff;
    putTime(tPrevDiff);
    tLapBase = tPrevDiff;
    Set_on = 1 // LAP基準タイム設定済
    return;
  });
  // LAP STARボタン押下処理
  buttonElement_lapstar.addEventListener('click',()=>{
    Ud_flg=0; // 表示更新なし
    Lap_on = 1; // Lapモード
    // ボタン表示切替
    buttonElement_lapstar.style.display = 'none';
    buttonElement_cont.style.display = 'inline-block';
    tPrevDiff = tOffset+tDiff;
    putTime(tPrevDiff-tLapBase);
    tLapBase = tPrevDiff;
    return;
  });
  // CONTボタン押下処理
  buttonElement_cont.addEventListener('click',()=>{
      Ud_flg = 1; // 表示更新　再開
      // ボタン表示切替
      buttonElement_cont.style.display = 'none';
      buttonElement_lapstar.style.display = 'inline-block';
      return;
  });
  buttonElement_reset.addEventListener('click',() => {
    tOffset = 0;
    tDiff = 0;
    putTime(tOffset + tDiff);
    //Lap_flg = 1; // LAP可能とする
  });
}

