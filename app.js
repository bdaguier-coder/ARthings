'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const start = $('start'), intro = $('intro-status');
  if (!window.AFRAME || !AFRAME.components['mindar-image']) {
    intro.textContent = 'Le chargement a échoué. Vérifiez votre connexion et rechargez la page.';
    start.textContent = 'Recharger'; start.disabled = false; start.onclick = () => location.reload(); return;
  }
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    intro.textContent = 'Ouvrez cette page en HTTPS dans Safari pour accéder à la caméra.'; return;
  }
  let active = false, ready = false, startedAt = 0, lostAt = null, found = 0, losses = 0, timeout, hintTimer;
  const scene = document.createElement('a-scene');
  scene.setAttribute('mindar-image', `imageTargetSrc: ${QUEST_CONFIG.targetFile}; autoStart: false; uiLoading: no; uiScanning: no; uiError: no; maxTrack: 1;`);
  scene.setAttribute('color-space','sRGB');
  scene.setAttribute('renderer','colorManagement: true; alpha: true;');
  scene.setAttribute('xr-mode-ui','enabled: false');
  scene.setAttribute('device-orientation-permission-ui','enabled: false');
  const camera = document.createElement('a-camera');
  camera.setAttribute('wasd-controls','enabled: false'); camera.setAttribute('position','0 0 0'); camera.setAttribute('look-controls','enabled: false'); scene.append(camera);
  // Canvas texture preserves French accents without a remote bitmap font.
  for (const target of QUEST_CONFIG.targets) {
    const anchor = document.createElement('a-entity');
    anchor.setAttribute('mindar-image-target',`targetIndex: ${target.index}`);
    const canvas = document.createElement('canvas'); canvas.width=1536;canvas.height=600;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#101b19';ctx.fillRect(0,0,1536,600);
    ctx.strokeStyle='#d8efbb';ctx.lineWidth=8;ctx.strokeRect(16,16,1504,568);
    ctx.textAlign='center';ctx.fillStyle='#d8efbb';ctx.font='600 32px sans-serif';ctx.fillText('QUEST · INDICE RETROUVÉ',768,95);
    target.lines.forEach((line,i)=>{let size=132;do{ctx.font=`700 ${size--}px sans-serif`;}while(ctx.measureText(line).width>1400);ctx.fillStyle='#ffffff';ctx.fillText(line,768,270+i*160);});
    const panel=document.createElement('a-entity');panel.setAttribute('position','0 0 0.035');
    const texture=new AFRAME.THREE.CanvasTexture(canvas);texture.colorSpace=AFRAME.THREE.SRGBColorSpace;
    const mesh=new AFRAME.THREE.Mesh(new AFRAME.THREE.PlaneGeometry(1,.390625),new AFRAME.THREE.MeshBasicMaterial({map:texture,side:AFRAME.THREE.DoubleSide}));
    panel.setObject3D('mesh',mesh);anchor.append(panel);scene.append(anchor);
    anchor.addEventListener('targetFound',()=>{
      if(!active||!ready)return;
      const now=performance.now();found++;clearTimeout(hintTimer);
      const seconds=((now-(lostAt??startedAt))/1000).toFixed(1);
      $('status').textContent='Image reconnue · Indice révélé';
      $('metrics').textContent=`${lostAt===null?'Détection depuis caméra prête':'Reprise du suivi'} : ${seconds} s · Pertes : ${losses}`;
      lostAt=null;
    });
    anchor.addEventListener('targetLost',()=>{
      if(!active||!ready)return;losses++;lostAt=performance.now();
      $('status').textContent='Image perdue · Revenez doucement vers la cible.';
      $('metrics').textContent=`Détections : ${found} · Pertes : ${losses}`;
    });
  }
  function cleanup(){
    clearTimeout(timeout);clearTimeout(hintTimer);active=false;ready=false;
    const system=scene.systems['mindar-image-system'];
    if(system?.controller){try{system.controller.stopProcessVideo();}catch{}}
    system?.video?.srcObject?.getTracks().forEach(track=>track.stop());
  }
  function fail(message){cleanup();$('welcome').hidden=false;$('hud').hidden=true;document.body.classList.remove('running');intro.textContent=message;start.disabled=false;start.textContent='Réessayer';start.onclick=()=>location.reload();}
  scene.addEventListener('arError',()=>fail('Caméra inaccessible. Autorisez la caméra pour ce site dans Safari, fermez toute autre application qui l’utilise, puis réessayez.'));
  scene.addEventListener('arReady',()=>{
    if(!active){cleanup();return;}clearTimeout(timeout);ready=true;startedAt=performance.now();
    $('status').textContent='Visez l’image de référence.';
    hintTimer=setTimeout(()=>{if(!found&&active)$('status').textContent='Pas encore reconnue : cadrez l’image entière, rapprochez-vous et évitez les reflets.';},15000);
  });
  scene.addEventListener('renderstart',()=>{start.disabled=false;start.textContent='Démarrer l’expérience';intro.textContent='Prêt · Caméra arrière · Sans installation';},{once:true});
  $('stage').append(scene);
  start.onclick=()=>{
    if(active)return;active=true;start.disabled=true;$('welcome').hidden=true;$('hud').hidden=false;document.body.classList.add('running');
    $('status').textContent='Autorisez la caméra · Initialisation…';
    timeout=setTimeout(()=>fail('Le démarrage prend trop de temps. Vérifiez l’autorisation caméra et rechargez la page.'),60000);
    try{scene.systems['mindar-image-system'].start();}catch{fail('Impossible de démarrer la caméra ou le suivi. Rechargez la page dans Safari.');}
  };
  $('stop').onclick=()=>{cleanup();location.reload();};
  window.addEventListener('unhandledrejection',()=>{if(active)fail('Le suivi n’a pas pu démarrer. Rechargez la page et réessayez dans Safari.');});
  window.addEventListener('pagehide',cleanup);
})();
