

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────
const allMats=[];
function mat(o){const m=new THREE.MeshStandardMaterial(o);allMats.push(m);return m;}
function lerp(a,b,t){return a+(b-a)*t;}
function eIO(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
function eOut(t){return 1-Math.pow(1-t,3);}
function cineEase(t){const a=ss(0,0.18,t)*0.18; const b=ss(0.18,0.84,t); const c=ss(0.84,1,t); return t<0.18?a:(t<0.84?(0.18+b*0.64):(0.82+c*0.18));}
function ss(e0,e1,x){const t=Math.max(0,Math.min(1,(x-e0)/(e1-e0)));return t*t*(3-2*t);}


function makeCanvasTexture(size, painter, repeatX=1, repeatY=1){
  const c=document.createElement('canvas');
  c.width=c.height=size;
  const ctx=c.getContext('2d');
  painter(ctx,size);
  const tex=new THREE.CanvasTexture(c);
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  tex.repeat.set(repeatX,repeatY);
  tex.anisotropy=8;
  tex.needsUpdate=true;
  return tex;
}
function buildSkyTexture(){
  const c=document.createElement('canvas');
  c.width=1024;c.height=512;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,c.height);
  g.addColorStop(0,'#e8f4ff');
  g.addColorStop(0.34,'#cddff3');
  g.addColorStop(0.62,'#aec2d5');
  g.addColorStop(1,'#8d9aa6');
  ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
  const hg=ctx.createLinearGradient(0,c.height*0.48,0,c.height);
  hg.addColorStop(0,'rgba(255,232,205,0.00)');
  hg.addColorStop(1,'rgba(255,218,168,0.22)');
  ctx.fillStyle=hg;ctx.fillRect(0,c.height*0.32,c.width,c.height*0.68);
  const sunX=c.width*0.73,sunY=c.height*0.24;
  const rg=ctx.createRadialGradient(sunX,sunY,8,sunX,sunY,150);
  rg.addColorStop(0,'rgba(255,246,220,0.95)');
  rg.addColorStop(0.28,'rgba(255,233,182,0.45)');
  rg.addColorStop(1,'rgba(255,233,182,0)');
  ctx.fillStyle=rg;ctx.beginPath();ctx.arc(sunX,sunY,150,0,Math.PI*2);ctx.fill();
  const tex=new THREE.CanvasTexture(c);
  tex.needsUpdate=true;
  return tex;
}
function proceduralSurface(kind,size=256){
  return makeCanvasTexture(size,(ctx,s)=>{
    const img=ctx.createImageData(s,s);
    const data=img.data;
    for(let i=0;i<data.length;i+=4){
      let n=Math.random()*255;
      if(kind==='asphalt') n=45+Math.random()*40;
      else if(kind==='concrete') n=130+Math.random()*40;
      else if(kind==='roof') n=112+Math.random()*28;
      else if(kind==='precast') n=160+Math.random()*28;
      else if(kind==='brick') n=110+Math.random()*40;
      else if(kind==='grass') n=68+Math.random()*34;
      else if(kind==='glass') n=165+Math.random()*24;
      data[i]=n;data[i+1]=kind==='brick'?n*0.55:kind==='grass'?n*0.9:n;
      data[i+2]=kind==='brick'?n*0.45:kind==='grass'?n*0.72:n;
      data[i+3]=255;
    }
    ctx.putImageData(img,0,0);

    if(kind==='asphalt'){
      for(let i=0;i<240;i++){
        ctx.fillStyle=`rgba(${20+Math.random()*24},${20+Math.random()*24},${20+Math.random()*24},${0.05+Math.random()*0.07})`;
        ctx.fillRect(Math.random()*s,Math.random()*s,8+Math.random()*22,1+Math.random()*3);
      }
      for(let i=0;i<18;i++){
        ctx.strokeStyle=`rgba(255,255,255,${0.03+Math.random()*0.05})`;
        ctx.lineWidth=1+Math.random()*2;
        ctx.beginPath();
        const y=Math.random()*s;
        ctx.moveTo(Math.random()*s*0.15,y);
        ctx.bezierCurveTo(s*0.3,y+Math.random()*12-6,s*0.65,y+Math.random()*12-6,s*(0.7+Math.random()*0.25),y+Math.random()*6-3);
        ctx.stroke();
      }
    }
    if(kind==='concrete' || kind==='precast'){
      for(let i=0;i<18;i++){
        ctx.fillStyle=`rgba(90,90,90,${0.05+Math.random()*0.05})`;
        ctx.fillRect(Math.random()*s,Math.random()*s,22+Math.random()*54,6+Math.random()*22);
      }
      if(kind==='precast'){
        ctx.fillStyle='rgba(110,110,110,0.11)';
        for(let i=1;i<6;i++) ctx.fillRect((s/6)*i,0,2,s);
        for(let i=0;i<14;i++){
          ctx.strokeStyle=`rgba(120,118,114,${0.06+Math.random()*0.05})`;
          ctx.lineWidth=1+Math.random()*1.5;
          ctx.beginPath();
          const x=Math.random()*s;
          ctx.moveTo(x,0); ctx.lineTo(x+Math.random()*10-5,s);
          ctx.stroke();
        }
      }
    }
    if(kind==='roof'){
      ctx.fillStyle='rgba(70,70,72,0.18)';
      for(let i=1;i<8;i++) ctx.fillRect(0,(s/8)*i,s,2);
      for(let i=0;i<12;i++){
        const rg=ctx.createRadialGradient(Math.random()*s,Math.random()*s,0,Math.random()*s,Math.random()*s,40+Math.random()*40);
        rg.addColorStop(0,'rgba(60,64,68,0.20)');
        rg.addColorStop(1,'rgba(60,64,68,0)');
        ctx.fillStyle=rg; ctx.fillRect(0,0,s,s);
      }
    }
    if(kind==='brick'){
      const bw=s/8,bh=s/12;
      ctx.fillStyle='rgba(45,22,18,0.22)';
      for(let y=0;y<12;y++){
        const off=(y%2)*bw*0.5;
        for(let x=-1;x<9;x++){
          ctx.strokeStyle='rgba(240,220,205,0.10)';
          ctx.lineWidth=1;
          ctx.strokeRect(off+x*bw,y*bh,bw-1,bh-1);
        }
      }
    }
    if(kind==='grass'){
      for(let i=0;i<420;i++){
        ctx.strokeStyle=`rgba(${80+Math.random()*45},${100+Math.random()*55},${58+Math.random()*30},${0.14+Math.random()*0.14})`;
        ctx.lineWidth=1;
        const x=Math.random()*s,y=Math.random()*s;
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+(Math.random()*4-2),y-(2+Math.random()*7)); ctx.stroke();
      }
    }
    if(kind==='glass'){
      const lg=ctx.createLinearGradient(0,0,s,s);
      lg.addColorStop(0,'rgba(255,255,255,0.28)');
      lg.addColorStop(0.45,'rgba(160,188,208,0.08)');
      lg.addColorStop(1,'rgba(90,110,132,0.24)');
      ctx.fillStyle=lg;ctx.fillRect(0,0,s,s);
      for(let i=0;i<12;i++){
        ctx.fillStyle=`rgba(255,255,255,${0.03+Math.random()*0.06})`;
        ctx.fillRect(0,Math.random()*s,s,1+Math.random()*2);
      }
    }
  });
}
const proceduralMaps={};
function buildProceduralTextures(){
  proceduralMaps.asphalt=proceduralSurface('asphalt');
  proceduralMaps.concrete=proceduralSurface('concrete');
  proceduralMaps.roof=proceduralSurface('roof');
  proceduralMaps.precast=proceduralSurface('precast');
  proceduralMaps.brick=proceduralSurface('brick');
  proceduralMaps.grass=proceduralSurface('grass');
  proceduralMaps.glass=proceduralSurface('glass');
}
function tileMaterial(material, tex, rx, ry, bump=0.0){
  material.map=tex.clone();
  material.map.repeat.set(rx,ry);
  material.map.wrapS=material.map.wrapT=THREE.RepeatWrapping;
  if(bump>0){
    material.bumpMap=tex.clone();
    material.bumpMap.repeat.set(rx,ry);
    material.bumpMap.wrapS=material.bumpMap.wrapT=THREE.RepeatWrapping;
    material.bumpScale=bump;
  }
  material.needsUpdate=true;
}



// ─────────────────────────────────────────────────────────────────────────────
// RENDERER / SCENE / CAMERA
// ─────────────────────────────────────────────────────────────────────────────
let W=window.innerWidth,H=window.innerHeight;
const canvas=document.getElementById('canvas');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(W,H);
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.34;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights=true;

const scene=new THREE.Scene();
scene.background=buildSkyTexture();
scene.fog=new THREE.FogExp2(0xc5d6e3,0.0027);

const camera=new THREE.PerspectiveCamera(46,W/H,0.1,460);
const camTarget=new THREE.Vector3(0,3.2,0);
function orbitFromPose(pos,target){
  const dx=pos[0]-target[0],dy=pos[1]-target[1],dz=pos[2]-target[2];
  const d=Math.max(0.001,Math.sqrt(dx*dx+dy*dy+dz*dz));
  return {rx:Math.asin(Math.max(-1,Math.min(1,dy/d))),ry:Math.atan2(dz,dx),dist:d};
}
const CAMERA_POSES={
  inside:{pos:[0.02,4.79,19.80],target:[0,2,0],fov:55},
  wide:{pos:[22.71,16.01,32.44],target:[0,2,0],fov:55},
  wideinside:{pos:[0.02,9.09,22.93],target:[0,2,0],fov:55},
  aisle:{pos:[0.02,3.84,22.93],target:[0,2,0],fov:55},
  overhead:{pos:[0.00,25.97,1.22],target:[0,2,0],fov:55},
  dock:{pos:[0.04,10.59,-47.22],target:[0,2,0],fov:55},
  street:{pos:[-77.44,11.34,0.12],target:[0,2,0],fov:55},
  sitebird:{pos:[51.01,91.11,-44.74],target:[0,2,0],fov:55},
  hero:{pos:[-24.0,8.8,73.0],target:[0.0,4.6,18.8],fov:40},
  parallax:{pos:[28.0,6.4,46.0],target:[0.0,4.1,22.6],fov:43},
  silhouette:{pos:[-40.0,12.8,58.0],target:[2.0,4.8,14.0],fov:41},
  resolve:{pos:[-12.8,9.4,78.0],target:[1.2,4.9,18.5],fov:39},
};
const initialOrbit=orbitFromPose(CAMERA_POSES.hero.pos,CAMERA_POSES.hero.target);
let rotX=initialOrbit.rx,rotY=initialOrbit.ry,dist=initialOrbit.dist,camAnim=null,camFov=CAMERA_POSES.hero.fov||46;
let targX=CAMERA_POSES.hero.target[0],targY=CAMERA_POSES.hero.target[1],targZ=CAMERA_POSES.hero.target[2];
let camBiasX=0,camBiasY=0,camBiasZ=0,camBiasDist=0;
let composer=null,renderPass=null,bloomPass=null,fxaaPass=null,ssaoPass=null;
function applyCamera(){
  camTarget.set(targX+camBiasX,targY+camBiasY,targZ+camBiasZ);
  const useDist=dist+camBiasDist;
  const cx=camTarget.x+Math.cos(rotY)*Math.cos(rotX)*useDist;
  const cy=camTarget.y+Math.sin(rotX)*useDist;
  const cz=camTarget.z+Math.sin(rotY)*Math.cos(rotX)*useDist;
  camera.position.set(cx,cy,cz);
  camera.fov=camFov;
  camera.updateProjectionMatrix();
  camera.lookAt(camTarget);
}
applyCamera();
function animCam(tx,ty,td,dur=1200,cb,target=[targX,targY,targZ],fov=camFov,easeFn=cineEase){
  const sx=rotX,sy=rotY,sd=dist,sf=camFov;
  const stx=targX,sty=targY,stz=targZ;
  const [gx,gy,gz]=target;
  const t0=performance.now();
  camAnim=function(now){
    const t=Math.min((now-t0)/dur,1),e=easeFn(Math.max(0,Math.min(1,t)));
    rotX=sx+(tx-sx)*e; rotY=sy+(ty-sy)*e; dist=sd+(td-sd)*e; camFov=sf+(fov-sf)*e;
    targX=stx+(gx-stx)*e; targY=sty+(gy-sty)*e; targZ=stz+(gz-stz)*e;
    applyCamera();
    if(t>=1){camAnim=null;if(cb)cb();}
  };
}
function initPost(){
  try{
    if(typeof THREE.EffectComposer==='undefined' || typeof THREE.RenderPass==='undefined' || typeof THREE.Pass==='undefined') return;
    composer=new THREE.EffectComposer(renderer);
    renderPass=new THREE.RenderPass(scene,camera);
    composer.addPass(renderPass);

    if(typeof THREE.SSAOPass!=='undefined'){
      ssaoPass=new THREE.SSAOPass(scene,camera,W,H);
      ssaoPass.kernelRadius=10;
      ssaoPass.minDistance=0.0005;
      ssaoPass.maxDistance=0.045;
      composer.addPass(ssaoPass);
    }
    if(typeof THREE.UnrealBloomPass!=='undefined'){
      bloomPass=new THREE.UnrealBloomPass(new THREE.Vector2(W,H),0.18,0.7,0.92);
      composer.addPass(bloomPass);
    }
    if(typeof THREE.ShaderPass!=='undefined' && THREE.FXAAShader){
      fxaaPass=new THREE.ShaderPass(THREE.FXAAShader);
      if(fxaaPass.material && fxaaPass.material.uniforms && fxaaPass.material.uniforms['resolution']){
        fxaaPass.material.uniforms['resolution'].value.set(1/(W*renderer.getPixelRatio()),1/(H*renderer.getPixelRatio()));
      }
      composer.addPass(fxaaPass);
    }
  }catch(err){
    console.warn('Post-processing disabled due to runtime setup issue.', err);
    composer=null;renderPass=null;bloomPass=null;fxaaPass=null;ssaoPass=null;
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// LIGHTING — industrial high-bay feel
// ─────────────────────────────────────────────────────────────────────────────
const hemiLight=new THREE.HemisphereLight(0xeaf4ff,0x7e8770,0.95);
scene.add(hemiLight);

const sunLight=new THREE.DirectionalLight(0xfff1d8,2.1);
sunLight.position.set(-42,58,26);
sunLight.castShadow=true;
sunLight.shadow.mapSize.width=sunLight.shadow.mapSize.height=4096;
sunLight.shadow.camera.left=-95;
sunLight.shadow.camera.right=95;
sunLight.shadow.camera.top=95;
sunLight.shadow.camera.bottom=-95;
sunLight.shadow.camera.near=1;
sunLight.shadow.camera.far=220;
sunLight.shadow.bias=-0.00018;
sunLight.shadow.radius=3.2;
scene.add(sunLight);

const skyFill=new THREE.DirectionalLight(0xa5c5ee,0.72);
skyFill.position.set(34,26,-46);
scene.add(skyFill);

const bounceLight=new THREE.DirectionalLight(0xe8d7bc,0.42);
bounceLight.position.set(8,14,-54);
scene.add(bounceLight);

const dockFill=new THREE.PointLight(0xcad7e4,10.0,58,2.0);
dockFill.position.set(8,7,-38);
scene.add(dockFill);

const warmAccent=new THREE.PointLight(0xffcb86,18,28,2);
warmAccent.position.set(6,4,-8);
scene.add(warmAccent);

const streetLightGlow=new THREE.PointLight(0xffedcf,9,42,2);
streetLightGlow.position.set(-56,8,-18);
scene.add(streetLightGlow);

// High-bay strip lights along ceiling
const stripPositions=[
  [-9,8.8,-15],[-9,8.8,-5],[-9,8.8,5],[-9,8.8,15],
  [0,8.8,-15],[0,8.8,-5],[0,8.8,5],[0,8.8,15],
  [9,8.8,-15],[9,8.8,-5],[9,8.8,5],[9,8.8,15],
];
const stripLights=[];
stripPositions.forEach(([x,y,z],i)=>{
  const pl=new THREE.PointLight(i%2?0xdfe9f7:0xf4f7ff,14,16,2);
  pl.position.set(x,y,z);
  scene.add(pl);
  stripLights.push(pl);
});

const hazeGeo=new THREE.PlaneGeometry(280,76);
const hazeMat=new THREE.MeshBasicMaterial({
  color:0xf0d7b4, transparent:true, opacity:0.16, depthWrite:false, side:THREE.DoubleSide
});
const horizonHaze=new THREE.Mesh(hazeGeo,hazeMat);
horizonHaze.position.set(-36,20,-128);
scene.add(horizonHaze);

const rimLight=new THREE.DirectionalLight(0xf6ead2,0.58);
rimLight.position.set(48,24,64);
scene.add(rimLight);
const facadeLift=new THREE.DirectionalLight(0xfff3e3,0.34);
facadeLift.position.set(0,14,64);
scene.add(facadeLift);
const dockShadeBounce=new THREE.PointLight(0xaec3d4,11,52,2.1);
dockShadeBounce.position.set(-2,4.2,-30.5);
scene.add(dockShadeBounce);
const interiorSpillA=new THREE.PointLight(0xffefcf,8.5,28,2.0);
interiorSpillA.position.set(-3.5,4.3,-20.8);
scene.add(interiorSpillA);
const interiorSpillB=new THREE.PointLight(0xffefcf,7.6,26,2.0);
interiorSpillB.position.set(3.8,4.0,-19.6);
scene.add(interiorSpillB);

const reflectionCards=new THREE.Group();
const reflectionMat=mat({color:0xc9d7e4,roughness:0.08,metalness:0.16,transparent:true,opacity:0.10,emissive:0x28425c,emissiveIntensity:0.10,side:THREE.DoubleSide});
[[0,2.7,25.18,5.4,3.8,0],[7.8,5.1,25.14,2.8,1.8,0],[-7.4,5.0,25.14,2.6,1.7,0],[11.12,4.9,0,2.2,1.8,-Math.PI/2]].forEach(([x,y,z,w,h,ry])=>{
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),reflectionMat);
  plane.position.set(x,y,z);
  plane.rotation.y=ry;
  reflectionCards.add(plane);
});
scene.add(reflectionCards);

const farHazeBand=new THREE.Group();
const hazeMassMat=mat({color:0x758291,roughness:0.98,metalness:0.02,transparent:true,opacity:0.34});
for(let i=0;i<8;i++){
  const mass=box(18+Math.random()*18,4.6+Math.random()*6.4,9+Math.random()*10,hazeMassMat,-110+i*32,2.4+Math.random()*1.8,-148-Math.random()*22);
  farHazeBand.add(mass);
}
scene.add(farHazeBand);

const cinematicOverlay=document.createElement('div');
cinematicOverlay.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:18;background:radial-gradient(circle at 50% 42%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.00) 36%, rgba(6,8,10,0.30) 76%, rgba(3,4,6,0.62) 100%), linear-gradient(to bottom, rgba(5,7,10,0.18), rgba(5,7,10,0.00) 18%, rgba(5,7,10,0.00) 82%, rgba(5,7,10,0.28));mix-blend-mode:multiply;opacity:0.78;';
document.body.appendChild(cinematicOverlay);
const grainOverlay=document.createElement('div');
graneStyle='position:fixed;inset:0;pointer-events:none;z-index:19;opacity:0.06;background-image:radial-gradient(rgba(255,255,255,0.35) 0.7px, transparent 0.8px);background-size:5px 5px;mix-blend-mode:soft-light;';
grainOverlay.style.cssText=graneStyle;
document.body.appendChild(grainOverlay);

// ─────────────────────────────────────────────────────────────────────────────
// MATERIALS
// ─────────────────────────────────────────────────────────────────────────────
const M={
  floor:   mat({color:0xb0b8b0,roughness:0.55,metalness:0.12}),
  wall:    mat({color:0xd0cec8,roughness:0.88,metalness:0.02}),
  ceiling: mat({color:0x484e58,roughness:0.78,metalness:0.08}),
  steel:   mat({color:0x1c3a5a,roughness:0.38,metalness:0.85}),  // rack uprights — blue
  steelOr: mat({color:0xc84c00,roughness:0.42,metalness:0.78}),  // rack beams — orange/red
  steelGr: mat({color:0x2a5c2a,roughness:0.46,metalness:0.72}),  // variant racks — green
  steelOrB:mat({color:0xd06000,roughness:0.42,metalness:0.75}),
  pallet:  mat({color:0x9c7a4a,roughness:0.88,metalness:0.02}),
  box:     mat({color:0xd4a870,roughness:0.78,metalness:0.02}),
  boxB:    mat({color:0xc89860,roughness:0.80,metalness:0.02}),
  boxC:    mat({color:0xe0b888,roughness:0.76,metalness:0.02}),
  wrap:    mat({color:0x88aabb,roughness:0.22,metalness:0.08,transparent:true,opacity:0.55}),
  wrapB:   mat({color:0xaabb88,roughness:0.22,metalness:0.08,transparent:true,opacity:0.50}),
  stripe:  mat({color:0xf0e838,roughness:0.55,metalness:0.02}),
  stripeW: mat({color:0xe8e4e0,roughness:0.60,metalness:0.02}),
  column:  mat({color:0xcc3030,roughness:0.40,metalness:0.65}),  // red column guards
  grating: mat({color:0x303840,roughness:0.56,metalness:0.72}),
  fixture: mat({color:0xe0e8f0,roughness:0.28,metalness:0.22,emissive:0x203858,emissiveIntensity:0.45}),
  fixtureGlow:mat({color:0xfff8e8,roughness:0.2,emissive:0xffeebb,emissiveIntensity:1.2}),
  dock:    mat({color:0x1c2028,roughness:0.46,metalness:0.66}),
  rubber:  mat({color:0x080806,roughness:0.99}),
  yellow:  mat({color:0xf5c000,roughness:0.34,metalness:0.22,emissive:0x502c00,emissiveIntensity:0.5}),
};

const MX={
  roof:         mat({color:0xb7b7b1,roughness:0.96,metalness:0.02}),
  roofDark:     mat({color:0x8d8f92,roughness:0.98,metalness:0.02}),
  roofStain:    mat({color:0x666b70,roughness:1,metalness:0,transparent:true,opacity:0.18}),
  asphalt:      mat({color:0x686c73,roughness:1,metalness:0.01}),
  asphaltDark:  mat({color:0x4b4f55,roughness:1,metalness:0.01}),
  asphaltWear:  mat({color:0x2a2d31,roughness:1,metalness:0,transparent:true,opacity:0.16}),
  concrete:     mat({color:0xa1a5aa,roughness:0.98,metalness:0.01}),
  concreteDark: mat({color:0x8f9498,roughness:0.98,metalness:0.01}),
  sidewalk:     mat({color:0xbab9b2,roughness:0.98,metalness:0.01}),
  curb:         mat({color:0xd8d5ce,roughness:0.98,metalness:0.01}),
  grass:        mat({color:0x4e6247,roughness:1,metalness:0}),
  grassAlt:     mat({color:0x44583f,roughness:1,metalness:0}),
  shrub:        mat({color:0x3d4e38,roughness:1,metalness:0}),
  treeLeaf:     mat({color:0x4c6148,roughness:1,metalness:0}),
  trunk:        mat({color:0x5b4536,roughness:1,metalness:0}),
  brick:        mat({color:0xa75a43,roughness:0.94,metalness:0.02}),
  brickDark:    mat({color:0x844939,roughness:0.96,metalness:0.02}),
  warehouseWall:mat({color:0x989a97,roughness:0.95,metalness:0.02}),
  warehouseTrim:mat({color:0x595f67,roughness:0.7,metalness:0.18}),
  dockShelter:  mat({color:0x0d1013,roughness:0.99,metalness:0.01}),
  dockSteel:    mat({color:0x404852,roughness:0.6,metalness:0.7}),
  trailer:      mat({color:0xe3e3de,roughness:0.82,metalness:0.06}),
  trailerAlt:   mat({color:0xd4d8dc,roughness:0.82,metalness:0.08}),
  trailerStripe:mat({color:0xb8bcc0,roughness:0.8,metalness:0.08}),
  chassis:      mat({color:0x22272c,roughness:0.88,metalness:0.52}),
  tire:         mat({color:0x141414,roughness:1,metalness:0.01}),
  rim:          mat({color:0x9ca4ab,roughness:0.42,metalness:0.88}),
  glass:        mat({color:0x90a8bc,roughness:0.12,metalness:0.12,transparent:true,opacity:0.56}),
  whiteMark:    mat({color:0xe7e5de,roughness:0.82,metalness:0.01}),
  yellowMark:   mat({color:0xe1c95e,roughness:0.82,metalness:0.01}),
  officeWall:   mat({color:0xb8ada0,roughness:1,metalness:0.01}),
  officeRoof:   mat({color:0x6b4e43,roughness:0.96,metalness:0.02}),
  officeTrim:   mat({color:0x534a44,roughness:0.84,metalness:0.1}),
  houseWallA:   mat({color:0xcfbba7,roughness:1,metalness:0.01}),
  houseWallB:   mat({color:0xd9cbbb,roughness:1,metalness:0.01}),
  houseWallC:   mat({color:0xbd9f8c,roughness:1,metalness:0.01}),
  houseWallD:   mat({color:0xe0d6ca,roughness:1,metalness:0.01}),
  houseRoofA:   mat({color:0x7f5c49,roughness:0.98,metalness:0.02}),
  houseRoofB:   mat({color:0x70686c,roughness:0.98,metalness:0.02}),
  houseRoofC:   mat({color:0x986956,roughness:0.98,metalness:0.02}),
  window:       mat({color:0x8aa1b4,roughness:0.18,metalness:0.12,transparent:true,opacity:0.45}),
  yardStorage:  mat({color:0xc8c7c2,roughness:0.94,metalness:0.02}),
  container:    mat({color:0x99a4ad,roughness:0.8,metalness:0.24}),
  containerAlt: mat({color:0xb4b8bd,roughness:0.8,metalness:0.18}),
  roadTreeBed:  mat({color:0x4d5a43,roughness:1,metalness:0}),
  soil:         mat({color:0x6b5848,roughness:1,metalness:0}),
  mulch:        mat({color:0x5b4332,roughness:1,metalness:0}),
  hedge:        mat({color:0x32452f,roughness:1,metalness:0}),
  leafOlive:    mat({color:0x68794f,roughness:1,metalness:0}),
  leafDark:     mat({color:0x2e3c2f,roughness:1,metalness:0}),
  fenceGalv:    mat({color:0xaab3b9,roughness:0.52,metalness:0.82}),
  puddle:       mat({color:0x464f57,roughness:0.14,metalness:0.02,transparent:true,opacity:0.34}),
  signRed:      mat({color:0xaf2e2e,roughness:0.58,metalness:0.06}),
  signWhite:    mat({color:0xf0ede5,roughness:0.76,metalness:0.02}),
  hazardOrange: mat({color:0xd46d29,roughness:0.72,metalness:0.08}),
  barrelBlue:   mat({color:0x3f6e8e,roughness:0.7,metalness:0.18})
};

buildProceduralTextures();
tileMaterial(M.floor,proceduralMaps.concrete,3.2,7.2,0.024);
tileMaterial(M.wall,proceduralMaps.precast,1.6,2.8,0.016);
tileMaterial(M.ceiling,proceduralMaps.roof,1.4,5.8,0.012);
tileMaterial(MX.asphalt,proceduralMaps.asphalt,9.5,9.5,0.012);
tileMaterial(MX.asphaltDark,proceduralMaps.asphalt,14,14,0.018);
tileMaterial(MX.concrete,proceduralMaps.concrete,6.5,3.2,0.01);
tileMaterial(MX.concreteDark,proceduralMaps.concrete,6.5,2.4,0.012);
tileMaterial(MX.sidewalk,proceduralMaps.concrete,3.8,14,0.008);
tileMaterial(MX.curb,proceduralMaps.concrete,2,14,0.004);
tileMaterial(MX.warehouseWall,proceduralMaps.precast,1.8,3.4,0.012);
tileMaterial(MX.brick,proceduralMaps.brick,3.2,1.8,0.01);
tileMaterial(MX.brickDark,proceduralMaps.brick,3.2,1.8,0.01);
tileMaterial(MX.roof,proceduralMaps.roof,4.2,8.2,0.008);
tileMaterial(MX.roofDark,proceduralMaps.roof,4.2,8.2,0.008);
tileMaterial(MX.grass,proceduralMaps.grass,18,18,0.01);
tileMaterial(MX.grassAlt,proceduralMaps.grass,16,16,0.01);
tileMaterial(MX.glass,proceduralMaps.glass,1.4,1.4,0.002);
tileMaterial(MX.window,proceduralMaps.glass,1.2,1.2,0.002);
tileMaterial(MX.soil,proceduralMaps.grass,8,8,0.012);
tileMaterial(MX.mulch,proceduralMaps.grass,6.5,6.5,0.01);
tileMaterial(MX.hedge,proceduralMaps.grass,5.2,5.2,0.012);
[M.fixtureGlow,MX.glass,MX.window].forEach(m=>{m.envMapIntensity=1.1;});


// ─────────────────────────────────────────────────────────────────────────────
// GEOMETRY HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function box(w,h,d,m,x=0,y=0,z=0,ry=0){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);
  mesh.position.set(x,y,z);
  mesh.rotation.y=ry;
  mesh.castShadow=true;mesh.receiveShadow=true;
  return mesh;
}

function group(...children){
  const g=new THREE.Group();
  children.forEach(c=>g.add(c));
  return g;
}

// Pallet rack upright frame (one vertical bay frame)
function makeRackUpright(h,upMat,beamMat){
  const g=new THREE.Group();
  // Two vertical columns
  [-0.5,0.5].forEach(x=>{
    const col=new THREE.Mesh(new THREE.BoxGeometry(0.06,h,0.06),upMat);
    col.position.set(x,h/2,0);col.castShadow=true;
    g.add(col);
  });
  // Horizontal braces
  const nBraces=Math.floor(h/0.9);
  for(let i=0;i<=nBraces;i++){
    const y=0.1+i*(h/nBraces);
    const brace=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.04,0.04),upMat);
    brace.position.set(0,y,0);g.add(brace);
  }
  // Diagonal X braces
  for(let i=0;i<nBraces;i++){
    const y0=0.1+i*(h/nBraces);
    const y1=0.1+(i+1)*(h/nBraces);
    const mid=(y0+y1)/2;
    const dh=y1-y0;
    const diag=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.03,0.03),upMat);
    diag.position.set(0,mid,0);
    diag.rotation.z=Math.atan2(dh,1.0);
    g.add(diag);
    const diag2=diag.clone();
    diag2.rotation.z=-Math.atan2(dh,1.0);
    g.add(diag2);
  }
  return g;
}

// Full rack bay: uprights + beams + wire deck
function makeRackBay(w,h,levels,upMat,beamMat){
  const g=new THREE.Group();
  const depth=1.1;
  // Two upright frames (front and back)
  [0,-depth].forEach(z=>{
    const uf=makeRackUpright(h,upMat,beamMat);
    uf.position.z=z;
    g.add(uf);
  });
  // Horizontal load beams at each level
  for(let lv=0;lv<levels;lv++){
    const beamY=0.8+lv*(h/levels);
    [0,-depth].forEach(z=>{
      const beam=new THREE.Mesh(new THREE.BoxGeometry(w,0.065,0.09),beamMat);
      beam.position.set(0,beamY,z);beam.castShadow=true;
      g.add(beam);
    });
    // Wire deck panels
    const deck=new THREE.Mesh(new THREE.BoxGeometry(w-0.05,0.03,depth-0.08),M.grating);
    deck.position.set(0,beamY+0.048,-depth/2);deck.receiveShadow=true;
    g.add(deck);
    // Wire crosshatch on deck
    for(let wi=0;wi<4;wi++){
      const wire=new THREE.Mesh(new THREE.BoxGeometry(0.02,0.025,depth-0.08),M.grating);
      wire.position.set(-w/2+0.2+wi*(w-0.1)/3,beamY+0.06,-depth/2);
      g.add(wire);
    }
  }
  return g;
}

// Pallet with stacked boxes
function makePalletLoad(boxMat,wrapMat,variant=0){
  const g=new THREE.Group();
  // Pallet base
  const pal=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.12,1.0),M.pallet);
  pal.position.y=0.06;pal.castShadow=true;pal.receiveShadow=true;
  g.add(pal);
  // Pallet slats
  for(let i=0;i<3;i++){
    const sl=new THREE.Mesh(new THREE.BoxGeometry(1.0,0.06,0.1),M.pallet);
    sl.position.set(0,0.09,-0.4+i*0.4);
    g.add(sl);
  }
  if(variant===0){
    // Stacked boxes
    const rows=2,cols=2,stacks=variant===0?3:2;
    for(let s=0;s<stacks;s++){
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          const bx=new THREE.Mesh(new THREE.BoxGeometry(0.46,0.34,0.46),[M.box,M.boxB,M.box,M.boxC,M.box,M.boxB][Math.floor(Math.random()*3)]);
          bx.position.set(-0.24+c*0.48,0.12+0.17+s*0.34,-0.24+r*0.48);
          bx.castShadow=true;
          g.add(bx);
        }
      }
    }
    // Stretch wrap
    const wrap=new THREE.Mesh(new THREE.BoxGeometry(0.98,1.06,0.98),wrapMat);
    wrap.position.y=0.12+0.53;g.add(wrap);
  } else {
    // Wrapped bales / totes
    for(let r=0;r<2;r++){
      for(let c=0;c<2;c++){
        const tote=new THREE.Mesh(new THREE.BoxGeometry(0.46,0.5,0.46),wrapMat);
        tote.position.set(-0.24+c*0.48,0.12+0.25,-0.24+r*0.48);
        tote.castShadow=true;g.add(tote);
      }
    }
  }
  return g;
}

// Pallet load on floor (no rack)
function makeFloorPallet(boxMat,wrapMat){
  return makePalletLoad(boxMat,wrapMat,Math.random()>0.5?0:1);
}

// High-bay light fixture
function makeHighBayFixture(){
  const g=new THREE.Group();
  const housing=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.28,0.22,16),M.fixture);
  housing.position.y=-0.11;g.add(housing);
  const lamp=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.18,0.04,16),M.fixtureGlow);
  lamp.position.y=-0.24;g.add(lamp);
  const cord=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.4,6),M.grating);
  cord.position.y=0.2;g.add(cord);
  return g;
}

// Column guard
function makeColumnGuard(h=0.9){
  const g=new THREE.Group();
  const guard=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.15,h,12),M.column);
  guard.position.y=h/2;g.add(guard);
  // Yellow stripe rings
  [0.2,0.5,0.8].forEach(frac=>{
    if(frac*h<h){
      const stripe=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.025,6,20),M.yellow);
      stripe.rotation.x=Math.PI/2;stripe.position.y=frac*h;g.add(stripe);
    }
  });
  return g;
}

// Dock door (rear wall)
function makeDockDoor(w,h){
  const g=new THREE.Group();
  const panels=6;const ph=h/panels;
  for(let i=0;i<panels;i++){
    const p=new THREE.Mesh(new THREE.BoxGeometry(w,ph-0.04,0.12),M.dock);
    p.position.y=ph*(i+0.5);g.add(p);
    const r=new THREE.Mesh(new THREE.BoxGeometry(w,0.04,0.14),M.grating);
    r.position.y=ph*(i+1);g.add(r);
  }
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIVE EXTERIOR HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function wheel(r=0.28,t=0.16){
  const g=new THREE.Group();
  const tire=new THREE.Mesh(new THREE.CylinderGeometry(r,r,t,18),MX.tire);
  tire.rotation.z=Math.PI/2;
  tire.castShadow=true;tire.receiveShadow=true;
  const rim=new THREE.Mesh(new THREE.CylinderGeometry(r*0.58,r*0.58,t+0.02,18),MX.rim);
  rim.rotation.z=Math.PI/2;
  g.add(tire,rim);
  return g;
}

function makeDockShelter(w=2.2,h=3.0){
  const g=new THREE.Group();
  const hood=box(w, h*0.82, 0.72, MX.dockShelter, 0, h*0.43, -0.28);
  const top=box(w+0.32, 0.18, 1.0, MX.dockSteel, 0, h+0.05, -0.14);
  const bumL=box(0.18, 1.05, 0.34, M.rubber, -w/2+0.08, 0.55, 0.08);
  const bumR=box(0.18, 1.05, 0.34, M.rubber,  w/2-0.08, 0.55, 0.08);
  const plate=box(w*0.95,0.05,0.55,MX.dockSteel,0,0.03,-0.36);
  const lamp=box(0.16,0.16,0.18,MX.dockSteel,w/2+0.14,h*0.7,-0.1);
  const lampGlow=box(0.08,0.08,0.08,M.fixtureGlow,w/2+0.16,h*0.66,-0.18);
  g.add(hood,top,bumL,bumR,plate,lamp,lampGlow);
  return g;
}

function makeRoofVent(r=0.28,h=0.35){
  const g=new THREE.Group();
  const base=new THREE.Mesh(new THREE.CylinderGeometry(r*1.15,r*1.15,0.08,18),MX.dockSteel);
  base.castShadow=true;base.receiveShadow=true;base.position.y=0.04;
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(r*0.68,r*0.68,h,18),MX.warehouseTrim);
  stem.castShadow=true;stem.receiveShadow=true;stem.position.y=h/2+0.08;
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.08,0.08,18),MX.roofDark);
  cap.castShadow=true;cap.receiveShadow=true;cap.position.y=h+0.12;
  g.add(base,stem,cap);
  return g;
}



/* removed duplicate makeTrailer; keeping later detailed variant */




/* removed duplicate makeTractor; keeping later detailed variant */


function makeSemiCombo(color=0x58a7c8,altTrailer=false){
  const g=new THREE.Group();
  const trailer=makeTrailer(7.6,2.45,2.9,altTrailer);
  const tractor=makeTractor(color);
  tractor.position.x=-5.7;
  g.add(trailer,tractor);
  return g;
}


/* removed duplicate makeCar; keeping later detailed variant */




/* removed duplicate makeTree; keeping later detailed variant */





/* removed duplicate makeShrub; keeping later detailed variant */



/* removed duplicate makeConifer; keeping later detailed variant */


function makeGrassTuft(scale=1){
  const g=new THREE.Group();
  const mats=[MX.grass,MX.grassAlt,MX.hedge,MX.leafOlive];
  for(let i=0;i<6;i++){
    const h=(0.38+Math.random()*0.34)*scale;
    const blade=new THREE.Mesh(new THREE.BoxGeometry(0.05*scale,h,0.14*scale),mats[i%mats.length]);
    blade.position.y=h*0.48;
    blade.rotation.y=i*(Math.PI/3)+(Math.random()-.5)*0.35;
    blade.rotation.z=(Math.random()-.5)*0.28;
    blade.castShadow=true;blade.receiveShadow=true;
    g.add(blade);
  }
  g.userData.kind='grass';
  g.userData.veg='grass';
  return g;
}

function makePalletJack(color=0xc63d31){
  const jackMat=mat({color,roughness:0.72,metalness:0.12});
  const g=new THREE.Group();
  const body=box(0.72,0.12,0.42,jackMat,0.08,0.14,0);
  const forkL=box(0.86,0.05,0.08,MX.chassis,0.32,0.05,-0.11);
  const forkR=box(0.86,0.05,0.08,MX.chassis,0.32,0.05,0.11);
  const steer=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.025,6,18),MX.chassis);
  steer.rotation.y=Math.PI/2;
  steer.position.set(-0.34,0.58,0);
  const handle=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.72,8),MX.chassis);
  handle.position.set(-0.28,0.5,0);
  handle.rotation.z=-0.42;
  g.add(body,forkL,forkR,steer,handle);
  [-0.18,0.56].forEach(ax=>{
    [-0.16,0.16].forEach(z=>{
      const wh=wheel(ax<0?0.08:0.06,0.05);
      wh.scale.setScalar(ax<0?1:0.78);
      wh.position.set(ax,0.06,z);
      g.add(wh);
    });
  });
  return g;
}

function makeForklift(color=0xe5962f){
  const bodyMat=mat({color,roughness:0.72,metalness:0.12});
  const g=new THREE.Group();
  const counter=box(0.82,0.72,0.98,bodyMat,-0.15,0.38,0);
  const body=box(1.12,0.26,0.98,MX.chassis,0.04,0.2,0);
  const seatBase=box(0.36,0.18,0.42,MX.chassis,-0.08,0.72,0);
  const seatBack=box(0.08,0.34,0.42,MX.chassis,-0.22,0.94,0);
  const mastL=box(0.08,1.62,0.08,MX.chassis,0.76,0.82,-0.24);
  const mastR=box(0.08,1.62,0.08,MX.chassis,0.76,0.82,0.24);
  const cross=box(0.08,0.18,0.62,MX.chassis,0.76,1.42,0);
  const carriage=box(0.12,0.28,0.62,MX.chassis,0.68,0.56,0);
  const forkL=box(0.68,0.05,0.08,MX.chassis,1.02,0.08,-0.16);
  const forkR=box(0.68,0.05,0.08,MX.chassis,1.02,0.08,0.16);
  const roof=box(0.82,0.08,0.9,MX.chassis,-0.03,1.42,0);
  const postA=box(0.05,1.02,0.05,MX.chassis,-0.34,0.98,-0.32);
  const postB=box(0.05,1.02,0.05,MX.chassis,-0.34,0.98,0.32);
  const postC=box(0.05,1.02,0.05,MX.chassis,0.28,0.98,-0.32);
  const postD=box(0.05,1.02,0.05,MX.chassis,0.28,0.98,0.32);
  const beacon=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.08,10),mat({color:0xe7ad2d,emissive:0x7a4f04,emissiveIntensity:0.8,roughness:0.55}));
  beacon.position.set(-0.16,1.56,0);
  beacon.castShadow=true;beacon.receiveShadow=true;
  g.add(counter,body,seatBase,seatBack,mastL,mastR,cross,carriage,forkL,forkR,roof,postA,postB,postC,postD,beacon);
  [-0.34,0.42].forEach(ax=>{
    [-0.38,0.38].forEach(z=>{
      const wh=wheel(ax<0?0.18:0.15,0.12);
      wh.position.set(ax,0.18,z);
      g.add(wh);
    });
  });
  return g;
}

function makeStormDrain(w=0.72,d=0.46){
  const g=new THREE.Group();
  const pit=box(w,0.05,d,MX.chassis,0,0.025,0);
  for(let i=0;i<5;i++){
    g.add(box(0.04,0.06,d*0.82,MX.fenceGalv,-w/2+0.12+i*(w-0.24)/4,0.03,0));
  }
  g.add(pit);
  return g;
}

function makeChainLinkFenceSegment(len=10,h=2.2){
  const g=new THREE.Group();
  const posts=Math.max(2,Math.round(len/2));
  for(let i=0;i<=posts;i++){
    const x=-len/2+i*(len/posts);
    const post=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,h,8),MX.fenceGalv);
    post.position.set(x,h/2,0);
    post.castShadow=true;post.receiveShadow=true;
    g.add(post);
  }
  g.add(box(len,0.04,0.04,MX.fenceGalv,0,h-0.08,0));
  g.add(box(len,0.04,0.04,MX.fenceGalv,0,0.92,0));
  for(let i=0;i<posts;i++){
    const x=-len/2+(i+0.5)*(len/posts);
    g.add(box(len/posts-0.1,0.02,0.01,MX.fenceGalv,x,h*0.56,0));
  }
  return g;
}

function makeHydroPole(h=11.5){
  const g=new THREE.Group();
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.16,h,10),MX.trunk);
  pole.position.y=h/2;
  pole.castShadow=true;pole.receiveShadow=true;
  const arm=box(2.4,0.1,0.1,MX.officeTrim,0,h-1.2,0);
  const arm2=box(1.6,0.08,0.08,MX.officeTrim,0,h-2.0,0);
  const insA=box(0.1,0.14,0.1,MX.glass,-0.8,h-1.28,0);
  const insB=box(0.1,0.14,0.1,MX.glass,0.8,h-1.28,0);
  const insC=box(0.1,0.14,0.1,MX.glass,-0.5,h-2.08,0);
  const insD=box(0.1,0.14,0.1,MX.glass,0.5,h-2.08,0);
  g.add(pole,arm,arm2,insA,insB,insC,insD);
  return g;
}

function makeJerseyBarrier(len=1.8,matRef=MX.concreteDark){
  const g=new THREE.Group();
  const base=box(len,0.26,0.48,matRef,0,0.13,0);
  const mid=box(len*0.84,0.18,0.32,matRef,0,0.35,0);
  const top=box(len*0.62,0.12,0.2,matRef,0,0.5,0);
  g.add(base,mid,top);
  return g;
}




/* removed duplicate makeWarehouseMass; keeping later detailed variant */




/* removed duplicate makeOfficeBuilding; keeping later detailed variant */


function makeHouse(w=6.6,d=8.2,h=4.2,wallMat=MX.houseWallA,roofMat=MX.houseRoofA){
  const g=new THREE.Group();
  const body=box(w,h,d,wallMat,0,h/2,0);
  const roof=box(w+0.5,0.75,d+0.6,roofMat,0,h+0.36,0);
  roof.rotation.z=(Math.random()-.5)*0.03;
  const door=box(0.85,1.7,0.1,MX.officeTrim,-w/2+1.05,0.85,-d/2-0.08);
  const win1=box(1.1,0.8,0.08,MX.window,-0.7,2.05,-d/2-0.07);
  const win2=box(1.1,0.8,0.08,MX.window,1.35,2.05,-d/2-0.07);
  g.add(body,roof,door,win1,win2);
  return g;
}

function addParkingCluster(target,x,z,rows,cols,dx=3.0,dz=5.0,rot=0){
  const colors=[0x2a2d33,0xb4b7bc,0x78808a,0x40474f,0x6a737b,0xd8dadd];
  const g=new THREE.Group();
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const car=makeCar(colors[(r*cols+c)%colors.length]);
      car.scale.setScalar(0.82+Math.random()*0.08);
      car.position.set(c*dx,0,r*dz);
      car.rotation.y=(Math.random()-.5)*0.08;
      g.add(car);
    }
  }
  g.position.set(x,0,z);
  g.rotation.y=rot;
  target.add(g);
  return g;
}

function addRoadDashes(target,x,zStart,zEnd,spacing=8,len=3,width=0.22){
  const count=Math.floor((zEnd-zStart)/spacing);
  for(let i=0;i<=count;i++){
    const z=zStart+i*spacing;
    target.add(box(width,0.02,len,MX.whiteMark,x,-0.015,z));
  }
}

function addRoadCrossMarks(target,x,zStart,zEnd,spacing=7.5,len=1.8,width=0.18){
  const count=Math.floor((zEnd-zStart)/spacing);
  for(let i=0;i<=count;i++){
    const z=zStart+i*spacing;
    target.add(box(width,0.02,len,MX.yellowMark,x,-0.014,z));
  }
}


function makeCone(){
  const g=new THREE.Group();
  const base=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.18,0.06,12),MX.chassis);
  base.position.y=0.03;
  const cone=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.11,0.34,12),mat({color:0xe67821,roughness:0.7,metalness:0.04}));
  cone.position.y=0.23;
  const band=new THREE.Mesh(new THREE.CylinderGeometry(0.085,0.095,0.06,12),MX.whiteMark);
  band.position.y=0.19;
  [base,cone,band].forEach(m=>{m.castShadow=true;m.receiveShadow=true;});
  g.add(base,cone,band);
  return g;
}
function makeDumpster(w=2.2,d=1.1,h=1.2){
  const g=new THREE.Group();
  const body=box(w,h,d,mat({color:0x315447,roughness:0.88,metalness:0.2}),0,h/2,0);
  const lip=box(w+0.08,0.08,d+0.08,MX.chassis,0,h+0.04,0);
  const lidL=box(w*0.48,0.05,d*0.92,mat({color:0x264339,roughness:0.88,metalness:0.12}),-w*0.24,h+0.1,0);
  const lidR=box(w*0.48,0.05,d*0.92,mat({color:0x264339,roughness:0.88,metalness:0.12}),w*0.24,h+0.1,0);
  g.add(body,lip,lidL,lidR);
  return g;
}
function makeLightPole(h=8.5){
  const g=new THREE.Group();
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.11,h,10),MX.dockSteel);
  pole.position.y=h/2;
  pole.castShadow=true;pole.receiveShadow=true;
  const arm=box(1.4,0.08,0.08,MX.dockSteel,0.7,h-0.25,0);
  const head=box(0.6,0.18,0.32,MX.dockSteel,1.35,h-0.26,0);
  const glow=box(0.42,0.04,0.22,M.fixtureGlow,1.37,h-0.36,0);
  g.add(pole,arm,head,glow);
  return g;
}
function makeUtilityPad(){
  const g=new THREE.Group();
  g.add(box(4.6,0.08,3.2,MX.concrete,0,0.04,0));
  const tx=box(1.3,1.4,1.0,MX.dockSteel,-0.8,0.7,0);
  const cab=box(0.85,1.15,0.72,MX.dockSteel,0.9,0.58,0);
  const pipe=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1.8,8),MX.chassis);
  pipe.position.set(0.1,0.9,0.92); pipe.rotation.x=Math.PI/2;
  pipe.castShadow=true;pipe.receiveShadow=true;
  g.add(tx,cab,pipe);
  return g;
}
function addWheelChocks(target,x,z,count=2){
  for(let i=0;i<count;i++){
    const chock=box(0.18,0.08,0.24,MX.yellowMark,x+(i===0?-0.65:0.65),0.04,z);
    chock.rotation.z=Math.PI*0.13;
    target.add(chock);
  }
}
function addDockNumbers(target,xs,z,y=4.1){
  xs.forEach((x,i)=>{
    const outer=box(0.88,0.38,0.04,MX.officeTrim,x,y,z);
    const inner=box(0.74,0.22,0.02,MX.whiteMark,x,y,z-0.02);
    const digit=box(0.12,0.18,0.025,M.dock,x-0.12+((i%3)*0.02),y,z-0.03);
    target.add(outer,inner,digit);
  });
}


// ─────────────────────────────────────────────────────────────────────────────
// ULTRA-DETAIL FUNCTION OVERRIDES + DETAIL HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const UDM={
  signalGreen:mat({color:0x39c86e,roughness:0.42,metalness:0.06,emissive:0x0d5a22,emissiveIntensity:0.85}),
  signalRed:mat({color:0xd63f3a,roughness:0.42,metalness:0.06,emissive:0x5a1111,emissiveIntensity:0.85}),
  amber:mat({color:0xe2a53b,roughness:0.45,metalness:0.08,emissive:0x6a3600,emissiveIntensity:0.55}),
  weather:mat({color:0x4d5359,roughness:1,metalness:0,transparent:true,opacity:0.12,depthWrite:false}),
  weatherSoft:mat({color:0x7d8489,roughness:1,metalness:0,transparent:true,opacity:0.08,depthWrite:false}),
  hazard:mat({color:0xf1c24a,roughness:0.68,metalness:0.04}),
  darkSteel:mat({color:0x2f353b,roughness:0.66,metalness:0.58}),
  pale:mat({color:0xeff1ec,roughness:0.82,metalness:0.02}),
  fadedPaint:mat({color:0xd7d3c9,roughness:0.92,metalness:0.01,transparent:true,opacity:0.66}),
  fencePost:mat({color:0x97a1a8,roughness:0.54,metalness:0.86}),
  hydrant:mat({color:0xc6382d,roughness:0.62,metalness:0.18}),
  utilityGreen:mat({color:0x445e44,roughness:0.86,metalness:0.04}),
  signBlue:mat({color:0x4379b7,roughness:0.62,metalness:0.06}),
  cardboard:mat({color:0xb98d63,roughness:0.9,metalness:0.02}),
  plasticGray:mat({color:0x8e9398,roughness:0.82,metalness:0.08}),
  offBlack:mat({color:0x111315,roughness:1,metalness:0}),
  mulchDark:mat({color:0x4b3627,roughness:1,metalness:0}),
  wire:mat({color:0x2a2c30,roughness:0.98,metalness:0.28}),
  serviceBlue:mat({color:0x5a87a6,roughness:0.72,metalness:0.18}),
  vanWhite:mat({color:0xe6e6e1,roughness:0.84,metalness:0.05})
};

function udCylinderBetween(a,b,r,m){
  const dir=new THREE.Vector3().subVectors(b,a);
  const len=dir.length();
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,8),m);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.clone().normalize());
  mesh.castShadow=true;mesh.receiveShadow=true;
  return mesh;
}

if(!MX.bollard) MX.bollard=mat({color:0xd2bc52,roughness:0.54,metalness:0.22});

function buildSkyTextureForPreset(mode='day'){
  if(mode!=='golden') return buildSkyTexture();
  const c=document.createElement('canvas');
  c.width=1024;c.height=512;
  const ctx=c.getContext('2d');
  const g=ctx.createLinearGradient(0,0,0,c.height);
  g.addColorStop(0,'#f9dbc0');
  g.addColorStop(0.28,'#efc09b');
  g.addColorStop(0.62,'#c79b7c');
  g.addColorStop(1,'#7e6a65');
  ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
  const hg=ctx.createLinearGradient(0,c.height*0.42,0,c.height);
  hg.addColorStop(0,'rgba(255,210,150,0.00)');
  hg.addColorStop(1,'rgba(255,169,92,0.34)');
  ctx.fillStyle=hg;ctx.fillRect(0,c.height*0.28,c.width,c.height*0.72);
  const sunX=c.width*0.18,sunY=c.height*0.28;
  const rg=ctx.createRadialGradient(sunX,sunY,8,sunX,sunY,190);
  rg.addColorStop(0,'rgba(255,245,215,0.96)');
  rg.addColorStop(0.18,'rgba(255,219,152,0.62)');
  rg.addColorStop(1,'rgba(255,187,110,0)');
  ctx.fillStyle=rg;ctx.beginPath();ctx.arc(sunX,sunY,190,0,Math.PI*2);ctx.fill();
  const tex=new THREE.CanvasTexture(c);
  tex.needsUpdate=true;
  return tex;
}

function makeLouverBox(w=1.28,h=0.72,d=0.22,slats=6){
  const g=new THREE.Group();
  const shell=box(w,h,d,MX.dockSteel,0,h/2,0);
  const recess=box(w-0.12,h-0.12,d*0.74,UDM.offBlack,0,h/2,-0.02);
  g.add(shell,recess);
  const innerW=w-0.22;
  for(let i=0;i<slats;i++){
    const y=0.12+i*((h-0.24)/(Math.max(1,slats-1)));
    const slat=box(innerW,0.05,d*0.18,MX.fenceGalv,0,y,0.06);
    slat.rotation.x=-0.24;
    g.add(slat);
  }
  return g;
}

function makeTelecomCabinet(w=1.05,d=0.62,h=1.42){
  const g=new THREE.Group();
  const base=box(w+0.12,0.08,d+0.12,MX.concrete,0,0.04,0);
  const body=box(w,h,d,UDM.plasticGray,0,h/2,0);
  const door=box(w*0.82,h*0.86,0.04,MX.officeTrim,0,h*0.52,d/2+0.02);
  const handle=box(0.06,0.18,0.03,MX.fenceGalv,w*0.26,h*0.56,d/2+0.05);
  const ventA=box(w*0.54,0.03,0.02,MX.officeTrim,0,h*0.34,d/2+0.04);
  const ventB=box(w*0.54,0.03,0.02,MX.officeTrim,0,h*0.42,d/2+0.04);
  g.add(base,body,door,handle,ventA,ventB);
  return g;
}

function makeBackflowAssembly(){
  const g=new THREE.Group();
  const pad=box(1.9,0.08,0.92,MX.concrete,0,0.04,0);
  const pipeA=udCylinderBetween(new THREE.Vector3(-0.46,0.22,0),new THREE.Vector3(-0.46,0.96,0),0.045,MX.dockSteel);
  const pipeB=udCylinderBetween(new THREE.Vector3(0.46,0.22,0),new THREE.Vector3(0.46,0.96,0),0.045,MX.dockSteel);
  const top=udCylinderBetween(new THREE.Vector3(-0.46,0.96,0),new THREE.Vector3(0.46,0.96,0),0.04,MX.dockSteel);
  const cross=udCylinderBetween(new THREE.Vector3(0,0.96,-0.2),new THREE.Vector3(0,0.96,0.2),0.03,MX.dockSteel);
  const valveA=new THREE.Mesh(new THREE.TorusGeometry(0.11,0.026,8,18),UDM.serviceBlue);
  valveA.position.set(-0.24,0.96,0);valveA.rotation.x=Math.PI/2;
  const valveB=valveA.clone(); valveB.position.x=0.24;
  g.add(pad,pipeA,pipeB,top,cross,valveA,valveB);
  return g;
}

function makeDoorHardware(width=1.02,height=2.16){
  const g=new THREE.Group();
  const panic=box(width*0.56,0.08,0.06,MX.fenceGalv,0,height*0.52,0.07);
  const center=box(0.1,0.18,0.06,MX.fenceGalv,0,height*0.52,0.075);
  const closerBody=box(0.26,0.07,0.07,MX.dockSteel,-width*0.16,height-0.14,0.07);
  const armA=box(0.18,0.025,0.025,MX.fenceGalv,-width*0.02,height-0.18,0.075);
  armA.rotation.z=-0.36;
  const armB=box(0.14,0.02,0.02,MX.fenceGalv,width*0.10,height-0.23,0.075);
  armB.rotation.z=0.18;
  const threshold=box(width*0.84,0.03,0.22,MX.fenceGalv,0,0.015,0.02);
  const kick=box(width*0.76,0.32,0.03,MX.dockSteel,0,0.2,0.078);
  g.add(panic,center,closerBody,armA,armB,threshold,kick);
  return g;
}

function addInstancedDockGuideLights(target,xs,z){
  const count=xs.length*2;
  const poleGeo=new THREE.BoxGeometry(0.05,0.9,0.05);
  const headGeo=new THREE.BoxGeometry(0.22,0.14,0.18);
  const poles=new THREE.InstancedMesh(poleGeo,MX.dockSteel,count);
  const heads=new THREE.InstancedMesh(headGeo,M.fixtureGlow,count);
  poles.castShadow=poles.receiveShadow=true;
  heads.castShadow=heads.receiveShadow=true;
  const dummy=new THREE.Object3D();
  let idx=0;
  xs.forEach(x=>{
    [-1.62,1.62].forEach(dx=>{
      dummy.position.set(x+dx,4.06,z);
      dummy.rotation.set(0,0,0);
      dummy.updateMatrix(); poles.setMatrixAt(idx,dummy.matrix);
      dummy.position.set(x+dx,4.55,z-0.04);
      dummy.updateMatrix(); heads.setMatrixAt(idx,dummy.matrix);
      idx++;
    });
  });
  poles.instanceMatrix.needsUpdate=true;
  heads.instanceMatrix.needsUpdate=true;
  target.add(poles,heads);
}

function makeTrailer(length=7.6,width=2.45,height=2.9,alt=false){
  const g=new THREE.Group();
  const bodyMat=alt?MX.trailerAlt:MX.trailer;
  const body=box(length,height,width,bodyMat,0,2.18,0);
  const roofLine=box(length*0.96,0.07,width*0.98,MX.trailerStripe,0,3.57,0);
  const belt=box(length*0.90,0.08,width+0.02,MX.trailerStripe,0,1.10,0);
  const chassis=box(length*0.80,0.16,0.42,MX.chassis,0,0.96,0);
  const sideRailL=box(length*0.72,0.08,0.07,MX.chassis,0,1.03,-width/2-0.09);
  const sideRailR=box(length*0.72,0.08,0.07,MX.chassis,0,1.03,width/2+0.09);
  const nose=box(0.65,1.85,width*0.92,bodyMat,-length/2+0.32,1.60,0);
  const noseCap=box(0.16,1.55,width*0.78,MX.trailerStripe,-length/2+0.56,1.7,0);
  const rearFrame=box(0.22,1.95,width*0.95,MX.chassis,length/2-0.08,1.18,0);
  const underride=box(0.18,0.42,width*0.84,MX.chassis,length/2-0.16,0.52,0);
  const rearDoorL=box(0.08,1.78,width*0.44,UDM.pale,length/2-0.19,1.48,-width*0.23);
  const rearDoorR=box(0.08,1.78,width*0.44,UDM.pale,length/2-0.19,1.48,width*0.23);
  const lockBarL=box(0.06,1.65,0.05,MX.chassis,length/2-0.11,1.45,-0.32);
  const lockBarR=box(0.06,1.65,0.05,MX.chassis,length/2-0.11,1.45,0.32);
  const hingeStripL=box(0.04,1.68,0.06,MX.chassis,length/2-0.13,1.45,-width*0.43);
  const hingeStripR=box(0.04,1.68,0.06,MX.chassis,length/2-0.13,1.45,width*0.43);
  const legL=box(0.09,0.76,0.09,MX.chassis,-length/2+0.55,0.38,-0.46);
  const legR=box(0.09,0.76,0.09,MX.chassis,-length/2+0.55,0.38,0.46);
  const footL=box(0.16,0.05,0.16,MX.chassis,-length/2+0.55,0.03,-0.46);
  const footR=box(0.16,0.05,0.16,MX.chassis,-length/2+0.55,0.03,0.46);
  const crank=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.34,6),MX.chassis);
  crank.position.set(-length/2+0.68,0.55,-0.56); crank.rotation.z=Math.PI/2;
  crank.castShadow=true; crank.receiveShadow=true;
  const mudL=box(0.08,0.32,0.42,MX.chassis,length*0.17,0.23,-width/2+0.12);
  const mudR=box(0.08,0.32,0.42,MX.chassis,length*0.17,0.23,width/2-0.12);
  const plate=box(0.18,0.12,0.28,MX.whiteMark,length/2+0.03,0.44,0);
  const lampL=box(0.06,0.08,0.18,UDM.signalRed,length/2+0.03,0.72,-width*0.28);
  const lampR=box(0.06,0.08,0.18,UDM.signalRed,length/2+0.03,0.72,width*0.28);
  const markerL=box(length*0.82,0.03,0.03,MX.yellowMark,0,0.72,-width/2-0.03);
  const markerR=box(length*0.82,0.03,0.03,MX.yellowMark,0,0.72,width/2+0.03);
  const dirtBand=box(length*0.92,0.42,width+0.01,UDM.weather,0,0.44,0);
  const lowerGrime=box(length*0.94,0.18,width+0.02,UDM.weatherSoft,0,0.22,0);
  g.add(body,roofLine,belt,chassis,sideRailL,sideRailR,nose,noseCap,rearFrame,underride,rearDoorL,rearDoorR,lockBarL,lockBarR,hingeStripL,hingeStripR,legL,legR,footL,footR,crank,mudL,mudR,plate,lampL,lampR,markerL,markerR,dirtBand,lowerGrime);

  for(let i=1;i<4;i++){
    const rib=box(0.04,height*0.88,width+0.01,UDM.weatherSoft,-length/2+i*(length/4),2.18,0);
    g.add(rib);
  }
  [-length*0.18, length*0.18, length*0.33].forEach(ax=>{
    [-width/2+0.14, width/2-0.14].forEach(z=>{
      const wh=wheel(0.27,0.18);
      wh.position.set(ax,0.28,z);
      g.add(wh);
    });
  });
  if(alt){
    const reefer=box(0.62,1.22,1.18,UDM.pale,-length/2+0.68,1.44,0);
    const vent=box(0.18,0.18,0.9,MX.dockSteel,-length/2+0.99,1.72,0);
    g.add(reefer,vent);
  }
  g.userData.kind='trailer';
  return g;
}

function makeTractor(color=0x58a7c8){
  const cabMat=mat({color,roughness:0.62,metalness:0.22});
  const g=new THREE.Group();
  const cab=box(1.9,1.78,2.18,cabMat,0.04,1.29,0);
  const roof=box(1.36,0.18,2.04,cabMat,-0.08,2.12,0);
  const hood=box(1.22,0.94,1.98,cabMat,1.42,0.9,0);
  const hoodTop=box(0.86,0.12,1.78,UDM.pale,1.28,1.34,0);
  const chassis=box(3.02,0.18,1.18,MX.chassis,0.52,0.74,0);
  const catwalk=box(0.88,0.08,1.52,UDM.darkSteel,-1.18,0.92,0);
  const wind=box(0.72,0.66,1.86,MX.glass,-0.56,1.47,0);
  const sideL=box(0.08,0.68,1.4,MX.glass,-0.12,1.38,-1.05);
  const sideR=box(0.08,0.68,1.4,MX.glass,-0.12,1.38,1.05);
  const grill=box(0.12,0.48,1.2,MX.dockSteel,2.04,0.92,0);
  const bumper=box(0.22,0.28,1.68,MX.dockSteel,2.12,0.58,0);
  const lowerValance=box(0.18,0.16,1.52,UDM.offBlack,1.9,0.42,0);
  const tankL=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,1.1,12),MX.dockSteel);
  tankL.position.set(-0.38,0.6,-0.86); tankL.rotation.z=Math.PI/2;
  const tankR=tankL.clone(); tankR.position.z=0.86;
  [tankL,tankR].forEach(m=>{m.castShadow=true;m.receiveShadow=true;});
  const stepL=box(0.38,0.08,0.32,UDM.darkSteel,-0.2,0.42,-0.92);
  const stepR=box(0.38,0.08,0.32,UDM.darkSteel,-0.2,0.42,0.92);
  const fairingL=box(0.58,0.84,0.18,cabMat,-0.58,1.02,-1.02);
  const fairingR=box(0.58,0.84,0.18,cabMat,-0.58,1.02,1.02);
  const mirrorStemL=udCylinderBetween(new THREE.Vector3(0.96,1.75,-1.02),new THREE.Vector3(1.18,1.52,-1.26),0.025,MX.chassis);
  const mirrorStemR=udCylinderBetween(new THREE.Vector3(0.96,1.75,1.02),new THREE.Vector3(1.18,1.52,1.26),0.025,MX.chassis);
  const mirrorL=box(0.12,0.22,0.2,MX.dockSteel,1.22,1.48,-1.28);
  const mirrorR=box(0.12,0.22,0.2,MX.dockSteel,1.22,1.48,1.28);
  const headL=box(0.12,0.16,0.32,M.fixtureGlow,2.05,0.86,-0.46);
  const headR=box(0.12,0.16,0.32,M.fixtureGlow,2.05,0.86,0.46);
  const markerL=box(0.08,0.08,0.12,UDM.amber,1.5,1.6,-0.96);
  const markerR=box(0.08,0.08,0.12,UDM.amber,1.5,1.6,0.96);
  const stackL=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,1.18,8),MX.dockSteel);
  stackL.position.set(-0.9,1.52,-0.84);
  const stackR=stackL.clone(); stackR.position.z=0.84;
  [stackL,stackR].forEach(m=>{m.castShadow=true;m.receiveShadow=true;});
  const exhaustTipL=box(0.16,0.06,0.16,MX.dockSteel,-0.9,2.12,-0.84);
  const exhaustTipR=box(0.16,0.06,0.16,MX.dockSteel,-0.9,2.12,0.84);
  g.add(cab,roof,hood,hoodTop,chassis,catwalk,wind,sideL,sideR,grill,bumper,lowerValance,tankL,tankR,stepL,stepR,fairingL,fairingR,mirrorStemL,mirrorStemR,mirrorL,mirrorR,headL,headR,markerL,markerR,stackL,stackR,exhaustTipL,exhaustTipR);
  [-0.15,1.35].forEach(ax=>{
    [-0.82,0.82].forEach(z=>{
      const wh=wheel(ax<0?0.34:0.30,0.22);
      wh.position.set(ax,0.34,z);
      g.add(wh);
    });
  });
  g.userData.kind='tractor';
  return g;
}

function makeCar(color=0x2c3138){
  const carMat=mat({color,roughness:0.72,metalness:0.22});
  const g=new THREE.Group();
  const body=box(2.08,0.5,1.04,carMat,0,0.42,0);
  const hood=box(0.72,0.18,1.0,carMat,0.54,0.68,0);
  const roof=box(1.0,0.42,0.94,carMat,-0.18,0.82,0);
  const trunk=box(0.54,0.16,0.96,carMat,-0.82,0.66,0);
  const bumperF=box(0.08,0.18,0.92,MX.dockSteel,1.04,0.36,0);
  const bumperR=box(0.08,0.18,0.92,MX.dockSteel,-1.04,0.36,0);
  const glassF=box(0.48,0.26,0.86,MX.glass,0.36,0.84,0);
  const glassR=box(0.34,0.24,0.86,MX.glass,-0.58,0.82,0);
  const sideGlassL=box(0.62,0.2,0.06,MX.glass,-0.06,0.84,-0.47);
  const sideGlassR=box(0.62,0.2,0.06,MX.glass,-0.06,0.84,0.47);
  const headL=box(0.08,0.12,0.18,M.fixtureGlow,1.03,0.48,-0.26);
  const headR=box(0.08,0.12,0.18,M.fixtureGlow,1.03,0.48,0.26);
  const tailL=box(0.08,0.12,0.18,UDM.signalRed,-1.03,0.46,-0.26);
  const tailR=box(0.08,0.12,0.18,UDM.signalRed,-1.03,0.46,0.26);
  g.add(body,hood,roof,trunk,bumperF,bumperR,glassF,glassR,sideGlassL,sideGlassR,headL,headR,tailL,tailR);
  [-0.62,0.62].forEach(ax=>{
    [-0.48,0.48].forEach(z=>{
      const wh=wheel(0.22,0.15);
      wh.position.set(ax,0.22,z);
      g.add(wh);
    });
  });
  g.userData.kind='car';
  return g;
}

function makeTree(scale=1){
  const g=new THREE.Group();
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.16*scale,0.3*scale,2.55*scale,10),MX.trunk);
  trunk.position.y=1.25*scale;
  trunk.castShadow=true;trunk.receiveShadow=true;
  g.add(trunk);
  const branchMat=MX.trunk;
  [
    [-0.22,1.86,-0.08,0.55,-0.42,0.82],
    [0.16,1.98,0.12,-0.44,0.3,0.94],
    [0.02,2.14,-0.22,0.26,0.48,0.72],
    [-0.08,2.28,0.18,0.18,-0.32,0.68],
    [0.22,1.72,-0.16,-0.28,0.54,0.76]
  ].forEach(([x,y,z,rx,rz,l])=>{
    const b=new THREE.Mesh(new THREE.CylinderGeometry(0.035*scale,0.08*scale,l*scale,7),branchMat);
    b.position.set(x*scale,y*scale,z*scale);
    b.rotation.z=rz;b.rotation.x=rx;
    b.castShadow=true;b.receiveShadow=true;
    g.add(b);
  });
  const leafMats=[MX.treeLeaf,MX.shrub,MX.leafOlive,MX.grassAlt];
  const blobs=[
    [0,3.02,0,0.95], [0.58,2.78,0.2,0.7], [-0.62,2.68,-0.16,0.75], [0.18,2.44,-0.62,0.58],
    [-0.18,2.36,0.6,0.56], [0.38,2.98,-0.34,0.62], [-0.36,2.92,0.3,0.66], [0.06,2.66,0.48,0.54],
    [0.0,2.84,-0.14,0.64]
  ];
  blobs.forEach(([x,y,z,s],i)=>{
    const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(s*scale,1),leafMats[i%leafMats.length]);
    leaf.position.set(x*scale,y*scale,z*scale);
    leaf.rotation.set(Math.random()*0.6,Math.random()*Math.PI,Math.random()*0.6);
    leaf.castShadow=true;leaf.receiveShadow=true;
    g.add(leaf);
  });
  g.userData.swayPhase=Math.random()*Math.PI*2;
  g.userData.swayAmp=0.010+Math.random()*0.020;
  g.userData.kind='tree';
  g.userData.veg='tree';
  return g;
}

function makeShrub(scale=1){
  const g=new THREE.Group();
  const mats=[MX.shrub,MX.grassAlt,MX.treeLeaf,MX.leafOlive];
  [
    [0,0.42,0,0.58],[0.34,0.38,0.16,0.36],[-0.3,0.36,-0.18,0.38],[0.12,0.32,-0.3,0.28],
    [-0.08,0.28,0.28,0.24],[0.24,0.3,-0.08,0.26]
  ].forEach(([x,y,z,s],i)=>{
    const a=new THREE.Mesh(new THREE.IcosahedronGeometry(s*scale,1),mats[i%mats.length]);
    a.position.set(x*scale,y*scale,z*scale);
    a.castShadow=true;a.receiveShadow=true;
    g.add(a);
  });
  for(let i=0;i<4;i++){
    const blade=new THREE.Mesh(new THREE.BoxGeometry(0.04*scale,(0.22+Math.random()*0.18)*scale,0.10*scale),i%2?MX.grass:MX.hedge);
    blade.position.set((Math.random()-0.5)*0.6*scale,0.12*scale,(Math.random()-0.5)*0.6*scale);
    blade.rotation.y=Math.random()*Math.PI;
    blade.rotation.z=(Math.random()-0.5)*0.32;
    blade.castShadow=true;blade.receiveShadow=true;
    g.add(blade);
  }
  return g;
}

function makeConifer(scale=1){
  const g=new THREE.Group();
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.12*scale,0.24*scale,3.0*scale,8),MX.trunk);
  trunk.position.y=1.5*scale;
  trunk.castShadow=true;trunk.receiveShadow=true;
  g.add(trunk);
  [
    [0,1.38,0,1.22], [0,1.95,0,1.02], [0,2.46,0,0.84], [0,2.96,0,0.66]
  ].forEach(([x,y,z,s],i)=>{
    const cone=new THREE.Mesh(new THREE.ConeGeometry(s*scale,(1.18-i*0.14)*scale,9), i%2?MX.leafOlive:MX.leafDark);
    cone.position.set(x*scale,y*scale,z*scale);
    cone.castShadow=true;cone.receiveShadow=true;
    g.add(cone);
  });
  for(let i=0;i<3;i++){
    const skirt=new THREE.Mesh(new THREE.ConeGeometry((0.85-i*0.12)*scale,0.46*scale,8),MX.leafDark);
    skirt.position.set(0,(1.1+i*0.5)*scale,0);
    skirt.castShadow=true;skirt.receiveShadow=true;
    g.add(skirt);
  }
  g.userData.swayPhase=Math.random()*Math.PI*2;
  g.userData.swayAmp=0.006+Math.random()*0.012;
  g.userData.kind='conifer';
  g.userData.veg='tree';
  return g;
}

function makeWarehouseMass(w,d,h,dockCount=4){
  const g=new THREE.Group();
  const vol=box(w,h,d,MX.warehouseWall,0,h/2,0);
  const roofCap=box(w+0.45,0.16,d+0.45,MX.roofDark,0,h+0.09,0);
  const parapet=box(w+0.2,0.34,d+0.2,MX.warehouseTrim,0,h+0.22,0);
  const brickBand=box(w+0.08,2.25,0.18,MX.brick,0,1.12,-d/2-0.09);
  g.add(vol,roofCap,parapet,brickBand);
  const frontCols=Math.max(4,Math.round(w/5));
  for(let i=1;i<frontCols;i++){
    const x=-w/2+i*(w/frontCols);
    g.add(box(0.05,h-0.5,0.03,MX.warehouseTrim,x,h/2+0.16,-d/2-0.11));
    g.add(box(0.05,h-0.5,0.03,MX.warehouseTrim,x,h/2+0.16,d/2+0.11));
  }
  const sideCols=Math.max(4,Math.round(d/7));
  for(let i=1;i<sideCols;i++){
    const z=-d/2+i*(d/sideCols);
    g.add(box(0.03,h-0.48,0.05,MX.warehouseTrim,-w/2-0.11,h/2+0.16,z));
    g.add(box(0.03,h-0.48,0.05,MX.warehouseTrim,w/2+0.11,h/2+0.16,z));
  }
  [2.8,5.6,8.4].forEach(y=>{
    if(y<h-0.5){
      g.add(box(w-0.4,0.03,0.03,UDM.weatherSoft,0,y,-d/2-0.115));
      g.add(box(w-0.4,0.03,0.03,UDM.weatherSoft,0,y,d/2+0.115));
    }
  });
  for(let i=1;i<5;i++){
    const seam=box(0.12,0.04,d-2,MX.roofStain,-w/2+i*(w/5),h+0.12,0);
    g.add(seam);
  }
  [[-w*0.22,h+0.12,-d*0.16],[0,h+0.12,0],[w*0.24,h+0.12,d*0.2]].forEach(([x,y,z])=>g.add(box(4.4,0.03,10.5,MX.roofStain,x,y,z)));
  const xs=[];
  if(dockCount===1) xs.push(0); else for(let i=0;i<dockCount;i++) xs.push(-w/2+2.8+i*((w-5.6)/(dockCount-1)));
  xs.forEach((x,i)=>{
    const door=box(2.12,3.24,0.14,M.dock,x,1.62,-d/2-0.02);
    const trackL=box(0.06,3.45,0.08,MX.dockSteel,x-1.12,1.72,-d/2-0.03);
    const trackR=box(0.06,3.45,0.08,MX.dockSteel,x+1.12,1.72,-d/2-0.03);
    const dock=makeDockShelter(2.18,3.0);
    dock.position.set(x,0,-d/2);
    const sign=box(0.8,0.32,0.04,MX.officeTrim,x,3.9,-d/2-0.14);
    const signFace=box(0.7,0.22,0.02,MX.whiteMark,x,3.9,-d/2-0.16);
    const sigR=box(0.08,0.12,0.1,UDM.signalRed,x+1.28,3.15,-d/2-0.12);
    const sigG=box(0.08,0.12,0.1,UDM.signalGreen,x+1.28,2.92,-d/2-0.12);
    const restraint=box(0.18,0.35,0.28,MX.dockSteel,x-1.35,0.42,-d/2+0.16);
    g.add(door,trackL,trackR,dock,sign,signFace,sigR,sigG,restraint);
  });
  const manDoor=box(1.0,2.15,0.12,MX.officeTrim,w/2-1.4,1.08,-d/2-0.08);
  const reader=box(0.08,0.22,0.05,UDM.signBlue,w/2-0.82,1.16,-d/2-0.12);
  const louver=box(1.2,0.6,0.08,MX.dockSteel,w/2-3.2,4.8,-d/2-0.06);
  const cam=box(0.16,0.16,0.22,MX.dockSteel,w/2-1.62,4.55,-d/2-0.22);
  g.add(manDoor,reader,louver,cam);
  for(let i=0;i<3;i++){
    const rtu=box(2.2,0.9,1.7,MX.dockSteel,-w*0.28+i*w*0.28,h+0.62,-d*0.18+(i%2?4:-4));
    const cap=box(2.0,0.12,1.45,MX.roof,rtu.position.x,h+1.13,rtu.position.z);
    g.add(rtu,cap);
  }
  [-w/2+1.1,w/2-1.1].forEach(x=>{
    const down=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,h-0.2,8),MX.warehouseTrim);
    down.position.set(x,(h-0.2)/2+0.08,-d/2+0.8);
    down.castShadow=true;down.receiveShadow=true;
    g.add(down);
  });
  return g;
}

function makeOfficeBuilding(w=7.5,d=5.8,h=3.2){
  const g=new THREE.Group();
  const body=box(w,h,d,MX.officeWall,0,h/2,0);
  const roof=box(w+0.6,0.65,d+0.8,MX.officeRoof,0,h+0.35,0);
  roof.rotation.z=0.05;
  const canopy=box(2.2,0.12,1.0,MX.dockSteel,-w/2+1.2,2.18,-d/2-0.62);
  const entry=box(1.02,1.94,0.12,MX.officeTrim,-w/2+1.15,0.97,-d/2-0.07);
  const sidelight=box(0.22,1.42,0.08,MX.window,-w/2+1.78,1.18,-d/2-0.08);
  const w1=box(1.0,0.75,0.08,MX.window,-1.2,1.8,-d/2-0.06);
  const w2=box(1.0,0.75,0.08,MX.window,1.1,1.8,-d/2-0.06);
  const signBand=box(w*0.46,0.24,0.08,MX.officeTrim,0,2.62,-d/2-0.07);
  const stair=box(1.5,0.12,0.8,MX.concrete,-w/2+1.15,0.06,-d/2-0.58);
  const condenser=box(0.95,0.62,0.72,MX.dockSteel,w/2-1.2,0.32,d/2+0.52);
  g.add(body,roof,canopy,entry,sidelight,w1,w2,signBand,stair,condenser);
  return g;
}

function makeUDMeterBank(cols=4){
  const g=new THREE.Group();
  const base=box(1.4,0.08,0.42,MX.concrete,0,0.04,0);
  const back=box(cols*0.28+0.22,1.28,0.12,MX.officeTrim,0,0.72,0);
  g.add(base,back);
  for(let i=0;i<cols;i++){
    const x=-((cols-1)*0.28)/2+i*0.28;
    const meter=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.06,14),MX.glass);
    meter.position.set(x,0.88,-0.08); meter.rotation.x=Math.PI/2;
    meter.castShadow=true; meter.receiveShadow=true;
    const can=box(0.22,0.34,0.16,UDM.darkSteel,x,0.42,0);
    g.add(can,meter);
  }
  return g;
}

function makeUDGasMeters(){
  const g=new THREE.Group();
  const pad=box(1.8,0.08,0.75,MX.concrete,0,0.04,0);
  g.add(pad);
  for(let i=0;i<3;i++){
    const stand=box(0.08,0.72,0.08,MX.dockSteel,-0.5+i*0.5,0.36,0.04);
    const meter=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.11,0.18,14),MX.dockSteel);
    meter.position.set(-0.5+i*0.5,0.62,0.06); meter.castShadow=true; meter.receiveShadow=true;
    const pipe=udCylinderBetween(new THREE.Vector3(-0.5+i*0.5,0.78,0.06),new THREE.Vector3(-0.5+i*0.5,1.12,-0.18),0.03,MX.dockSteel);
    g.add(stand,meter,pipe);
  }
  const manifold=box(1.55,0.06,0.06,MX.dockSteel,0,1.12,-0.18);
  g.add(manifold);
  return g;
}

function makeUDCamera(){
  const g=new THREE.Group();
  const arm=box(0.18,0.04,0.04,MX.dockSteel,0.09,0,0);
  const cam=box(0.16,0.12,0.22,MX.dockSteel,0.22,-0.06,0);
  const lens=box(0.04,0.06,0.1,MX.glass,0.31,-0.06,0);
  g.add(arm,cam,lens);
  return g;
}

function makeUDGooseneck(){
  const g=new THREE.Group();
  const stem=udCylinderBetween(new THREE.Vector3(0,0,0),new THREE.Vector3(0.22,0.18,0),0.03,MX.dockSteel);
  const arm=udCylinderBetween(new THREE.Vector3(0.22,0.18,0),new THREE.Vector3(0.42,0.24,0),0.025,MX.dockSteel);
  const head=box(0.22,0.10,0.18,MX.dockSteel,0.5,0.23,0);
  const glow=box(0.16,0.04,0.14,M.fixtureGlow,0.5,0.18,0);
  g.add(stem,arm,head,glow);
  return g;
}

function makeUDDockSignal(state='green'){
  const g=new THREE.Group();
  const back=box(0.18,0.42,0.1,MX.dockSteel,0,0.21,0);
  const top=box(0.12,0.12,0.08,state==='red'?UDM.signalRed:UDM.offBlack,0,0.3,0.07);
  const bot=box(0.12,0.12,0.08,state==='green'?UDM.signalGreen:UDM.signalRed,0,0.12,0.07);
  g.add(back,top,bot);
  return g;
}

function makeUDRestraintBox(){
  const g=new THREE.Group();
  g.add(box(0.24,0.38,0.34,MX.dockSteel,0,0.19,0));
  g.add(box(0.14,0.08,0.18,UDM.hazard,0,0.26,0.16));
  return g;
}

function makeUDRoofRail(len=4,depth=2){
  const g=new THREE.Group();
  [[-len/2,0], [len/2,0], [-len/2,depth], [len/2,depth]].forEach(([x,z])=>{
    const post=box(0.06,0.64,0.06,UDM.darkSteel,x,0.32,z);
    g.add(post);
  });
  g.add(box(len,0.05,0.05,UDM.hazard,0,0.58,0));
  g.add(box(len,0.05,0.05,UDM.hazard,0,0.34,0));
  g.add(box(len,0.05,0.05,UDM.hazard,0,0.58,depth));
  g.add(box(len,0.05,0.05,UDM.hazard,0,0.34,depth));
  g.add(box(0.05,0.05,depth,UDM.hazard,-len/2,0.58,depth/2));
  g.add(box(0.05,0.05,depth,UDM.hazard,len/2,0.58,depth/2));
  return g;
}

function makeUDCageLadder(h=9.2){
  const g=new THREE.Group();
  const railL=udCylinderBetween(new THREE.Vector3(-0.16,0,0),new THREE.Vector3(-0.16,h,0),0.03,UDM.darkSteel);
  const railR=udCylinderBetween(new THREE.Vector3(0.16,0,0),new THREE.Vector3(0.16,h,0),0.03,UDM.darkSteel);
  g.add(railL,railR);
  for(let y=0.4;y<h-0.2;y+=0.34) g.add(box(0.28,0.03,0.04,UDM.darkSteel,0,y,0));
  for(let y=1.4;y<h-0.7;y+=0.72){
    const hoop=new THREE.Mesh(new THREE.TorusGeometry(0.34,0.02,6,14,Math.PI*1.08),UDM.darkSteel);
    hoop.rotation.y=Math.PI/2; hoop.position.set(0,y,0.18);
    hoop.castShadow=true; hoop.receiveShadow=true;
    g.add(hoop);
  }
  return g;
}

function makeUDRoofHatch(){
  const g=new THREE.Group();
  g.add(box(1.05,0.18,1.05,MX.roofDark,0,0.09,0));
  g.add(box(0.92,0.06,0.92,UDM.pale,0,0.19,0));
  return g;
}

function makeUDIBC(){
  const g=new THREE.Group();
  const tank=box(0.92,0.94,0.92,mat({color:0xd8e2e8,roughness:0.22,metalness:0.04,transparent:true,opacity:0.72}),0,0.67,0);
  const cage=box(1.02,1.08,1.02,UDM.weatherSoft,0,0.65,0);
  const pallet=box(1.0,0.14,1.0,M.pallet,0,0.07,0);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.08,12),MX.dockSteel);
  cap.position.set(0.22,1.15,0.22); cap.castShadow=true; cap.receiveShadow=true;
  g.add(tank,cage,pallet,cap);
  return g;
}

function makeUDGaylord(){
  const g=new THREE.Group();
  g.add(box(1.0,0.78,1.0,UDM.cardboard,0,0.46,0));
  g.add(box(1.0,0.12,1.0,M.pallet,0,0.06,0));
  return g;
}

function makeUDBale(){
  const g=new THREE.Group();
  g.add(box(1.1,0.72,0.78,UDM.cardboard,0,0.42,0));
  g.add(box(1.16,0.03,0.05,MX.chassis,0,0.62,-0.22));
  g.add(box(1.16,0.03,0.05,MX.chassis,0,0.62,0.22));
  return g;
}

function makeUDRollingBin(color=0x546a53){
  const matBin=mat({color,roughness:0.84,metalness:0.06});
  const g=new THREE.Group();
  g.add(box(0.62,0.82,0.42,matBin,0,0.44,0));
  g.add(box(0.66,0.06,0.46,UDM.offBlack,0,0.86,0));
  [[-0.22,-0.12],[-0.22,0.12],[0.22,-0.12],[0.22,0.12]].forEach(([x,z])=>{
    const wh=wheel(0.05,0.05); wh.position.set(x,0.06,z); g.add(wh);
  });
  return g;
}

function makeUDServiceVan(color=0xe8e7e3){
  const bodyMat=mat({color,roughness:0.82,metalness:0.06});
  const g=new THREE.Group();
  g.add(box(2.6,0.56,1.15,bodyMat,0,0.48,0));
  g.add(box(1.48,0.64,1.08,bodyMat,-0.2,0.98,0));
  g.add(box(0.58,0.52,1.0,MX.glass,0.76,0.96,0));
  g.add(box(0.88,0.42,0.06,MX.glass,-0.18,1.04,-0.53));
  g.add(box(0.88,0.42,0.06,MX.glass,-0.18,1.04,0.53));
  g.add(box(0.1,0.18,0.96,MX.dockSteel,1.31,0.36,0));
  g.add(box(0.1,0.18,0.96,MX.dockSteel,-1.31,0.36,0));
  g.add(box(0.12,0.14,0.2,M.fixtureGlow,1.3,0.52,-0.26));
  g.add(box(0.12,0.14,0.2,M.fixtureGlow,1.3,0.52,0.26));
  g.add(box(0.12,0.14,0.2,UDM.signalRed,-1.3,0.5,-0.26));
  g.add(box(0.12,0.14,0.2,UDM.signalRed,-1.3,0.5,0.26));
  [-0.72,0.82].forEach(ax=>[-0.54,0.54].forEach(z=>{const wh=wheel(0.22,0.15); wh.position.set(ax,0.22,z); g.add(wh);}));
  return g;
}

function makeUDDockStairs(){
  const g=new THREE.Group();
  for(let i=0;i<4;i++) g.add(box(0.72-i*0.12,0.08,0.28,MX.dockSteel,0,0.1+i*0.18,-0.32+i*0.16));
  g.add(box(0.08,1.0,0.08,MX.dockSteel,-0.28,0.5,0.04));
  g.add(box(0.08,1.0,0.08,MX.dockSteel,0.28,0.5,0.04));
  g.add(box(0.62,0.05,0.05,UDM.hazard,0,0.96,0.12));
  return g;
}

function makeUDDockLadder(){
  const g=new THREE.Group();
  g.add(box(0.08,1.8,0.08,MX.dockSteel,-0.16,0.9,0));
  g.add(box(0.08,1.8,0.08,MX.dockSteel,0.16,0.9,0));
  for(let y=0.24;y<1.72;y+=0.24) g.add(box(0.28,0.03,0.04,MX.dockSteel,0,y,0));
  return g;
}

function makeUDTrafficSign(type='STOP'){
  const g=new THREE.Group();
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,2.4,8),UDM.fencePost);
  pole.position.y=1.2; pole.castShadow=true; pole.receiveShadow=true;
  const faceMat = type==='NOTICE' ? MX.whiteMark : (type==='TRUCK' ? UDM.signBlue : MX.signRed);
  const face=box(type==='STOP'?0.62:0.8,0.62,0.06,faceMat,0,2.18,0);
  g.add(pole,face);
  return g;
}

function makeUDHydrant(){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.16,0.62,12),UDM.hydrant);
  body.position.y=0.31; body.castShadow=true; body.receiveShadow=true;
  const top=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.1,0.18,12),UDM.hydrant);
  top.position.y=0.72; top.castShadow=true; top.receiveShadow=true;
  const sideL=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.18,10),UDM.hydrant);
  sideL.position.set(-0.14,0.42,0); sideL.rotation.z=Math.PI/2; sideL.castShadow=true; sideL.receiveShadow=true;
  const sideR=sideL.clone(); sideR.position.x=0.14;
  g.add(body,top,sideL,sideR);
  return g;
}

function makeUDPadTransformer(){
  const g=new THREE.Group();
  g.add(box(2.8,0.1,1.8,MX.concrete,0,0.05,0));
  g.add(box(2.2,1.6,1.3,UDM.utilityGreen,0,0.86,0));
  g.add(box(0.64,0.52,0.16,MX.officeTrim,-0.54,0.56,0.74));
  g.add(box(0.64,0.52,0.16,MX.officeTrim,0.54,0.56,0.74));
  return g;
}

function makeUDSlidingGate(len=8){
  const g=new THREE.Group();
  const seg=makeChainLinkFenceSegment(len,2.0);
  seg.position.set(0,0,0);
  g.add(seg);
  const wheelBox=box(0.36,0.2,0.24,MX.dockSteel,-len/2+0.42,0.12,0);
  g.add(wheelBox);
  return g;
}

function makeUDAddressMonument(){
  const g=new THREE.Group();
  g.add(box(2.2,0.44,0.48,MX.concreteDark,0,0.22,0));
  g.add(box(1.82,0.26,0.08,MX.officeTrim,0,0.42,0.18));
  g.add(box(1.72,0.16,0.04,MX.whiteMark,0,0.42,0.23));
  return g;
}


// ─────────────────────────────────────────────────────────────────────────────
// WAREHOUSE SHELL (static — always visible)
// ─────────────────────────────────────────────────────────────────────────────
const SHELL_W=22,SHELL_D=50,SHELL_H=10;
const shellGroup=new THREE.Group();

// Floor
const floorMesh=new THREE.Mesh(new THREE.PlaneGeometry(SHELL_W+0.2,SHELL_D+0.2),M.floor);
floorMesh.rotation.x=-Math.PI/2;floorMesh.position.y=0;
floorMesh.receiveShadow=true;shellGroup.add(floorMesh);

// Floor expansion joints
for(let i=1;i<5;i++){
  const jt=new THREE.Mesh(new THREE.BoxGeometry(SHELL_W,0.01,0.06),M.grating);
  jt.position.set(0,0.01,-SHELL_D/2+i*(SHELL_D/5));jt.rotation.x=0;shellGroup.add(jt);
}
for(let i=1;i<3;i++){
  const jt=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.01,SHELL_D),M.grating);
  jt.position.set(-SHELL_W/2+i*(SHELL_W/3),0.01,0);shellGroup.add(jt);
}

// Floor yellow safety lanes
[-5.0,5.0].forEach(x=>{
  for(let j=0;j<12;j++){
    const stripe=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.01,1.8),M.stripe);
    stripe.position.set(x,0.012,-SHELL_D/2+2+j*4);shellGroup.add(stripe);
  }
});

// Drive aisle centerline
for(let j=0;j<14;j++){
  const dash=new THREE.Mesh(new THREE.BoxGeometry(0.10,0.01,1.2),M.stripeW);
  dash.position.set(0,0.012,-SHELL_D/2+2+j*3.5);shellGroup.add(dash);
}

// Left wall
const lwg=new THREE.Group();
lwg.add(box(0.22,SHELL_H,SHELL_D,M.wall,0,SHELL_H/2,0));
lwg.position.x=-SHELL_W/2;shellGroup.add(lwg);

// Right wall
const rwg=new THREE.Group();
rwg.add(box(0.22,SHELL_H,SHELL_D,M.wall,0,SHELL_H/2,0));
rwg.position.x=SHELL_W/2;shellGroup.add(rwg);

// Rear wall with dock doors
const rearWall=new THREE.Group();
const rearPanel=box(SHELL_W,SHELL_H,0.22,M.wall,0,SHELL_H/2,0);
rearWall.add(rearPanel);
// Dock door openings
[-7,-3.5,0,3.5,7].forEach(x=>{
  const cut=box(2.5,3.8,0.30,M.dock,x,1.9,0);
  rearWall.add(cut);
  const door=makeDockDoor(2.4,3.6);
  door.position.set(x,0,-0.1);
  rearWall.add(door);
});
rearWall.position.z=-SHELL_D/2;shellGroup.add(rearWall);

// Front wall (partial — office section)
const frontWall=box(SHELL_W,SHELL_H,0.22,M.wall,0,SHELL_H/2,SHELL_D/2);
shellGroup.add(frontWall);
// Large entry door opening
const entryOpen=box(5.5,4.2,0.28,mat({color:0x1a1e26,roughness:0.4,metalness:0.5}),0,2.1,SHELL_D/2);
shellGroup.add(entryOpen);

// Ceiling
const ceilMesh=box(SHELL_W,0.28,SHELL_D,M.ceiling,0,SHELL_H,0);
ceilMesh.receiveShadow=true;shellGroup.add(ceilMesh);

// Ceiling structure — steel beams across width
for(let i=0;i<10;i++){
  const z=-SHELL_D/2+3+i*(SHELL_D-6)/9;
  const beam=box(SHELL_W,0.38,0.18,M.grating,0,SHELL_H-0.19,z);
  shellGroup.add(beam);
  // Purlin runs along length
  if(i<9){
    const pur=box(0.12,0.28,SHELL_D/9,M.grating,0,SHELL_H-0.14,z+(SHELL_D-6)/18);
    shellGroup.add(pur);
  }
}

// Structural columns (red guards at base)
[-SHELL_W/2+0.3,0,SHELL_W/2-0.3].forEach(x=>{
  [-15,-5,5,15].forEach(z=>{
    const col=box(0.30,SHELL_H,0.30,M.grating,x,SHELL_H/2,z);
    shellGroup.add(col);
    const guard=makeColumnGuard(1.0);
    guard.position.set(x,0,z);shellGroup.add(guard);
  });
});

// High-bay light fixtures suspended from ceiling
stripPositions.forEach(([x,y,z])=>{
  const fix=makeHighBayFixture();
  fix.position.set(x,y,z);shellGroup.add(fix);
});


// Main-shell façade / micro-detail upgrades
const dockXsMain=[-7,-3.5,0,3.5,7];
addDockNumbers(shellGroup,dockXsMain,-25.34,4.2);

const parapetCap=box(SHELL_W+0.6,0.18,SHELL_D+0.6,MX.roofDark,0,SHELL_H+0.36,0);
shellGroup.add(parapetCap);

for(let i=0;i<7;i++){
  const x=-SHELL_W/2+1.6+i*((SHELL_W-3.2)/6);
  const seamF=box(0.04,SHELL_H-0.7,0.03,MX.warehouseTrim,x,SHELL_H/2+0.16,SHELL_D/2+0.125);
  const seamR=box(0.04,SHELL_H-0.7,0.03,MX.warehouseTrim,x,SHELL_H/2+0.16,-SHELL_D/2-0.125);
  shellGroup.add(seamF,seamR);
}
for(let i=0;i<7;i++){
  const z=-SHELL_D/2+2.2+i*((SHELL_D-4.4)/6);
  const downL=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.045,SHELL_H-0.4,8),MX.warehouseTrim);
  const downR=downL.clone();
  downL.position.set(-SHELL_W/2-0.02,(SHELL_H-0.4)/2+0.1,z);
  downR.position.set(SHELL_W/2+0.02,(SHELL_H-0.4)/2+0.1,z);
  [downL,downR].forEach(m=>{m.castShadow=true;m.receiveShadow=true;});
  shellGroup.add(downL,downR);
}
dockXsMain.forEach((x,i)=>{
  const bumperL=box(0.18,0.9,0.28,M.rubber,x-1.03,0.46,-SHELL_D/2+0.42);
  const bumperR=box(0.18,0.9,0.28,M.rubber,x+1.03,0.46,-SHELL_D/2+0.42);
  const lamp=box(0.2,0.12,0.16,M.fixtureGlow,x+1.22,3.35,-SHELL_D/2+0.1);
  shellGroup.add(bumperL,bumperR,lamp);
});

const frontCanopy=box(8.4,0.18,1.2,MX.dockSteel,0,4.75,SHELL_D/2+0.66);
const frontDoorFrame=box(6.0,4.7,0.12,MX.officeTrim,0,2.35,SHELL_D/2+0.18);
const frontGlaze=box(5.2,3.55,0.05,MX.glass,0,2.25,SHELL_D/2+0.16);
shellGroup.add(frontCanopy,frontDoorFrame,frontGlaze);

for(let i=0;i<3;i++){
  const skylight=box(2.8,0.12,1.0,MX.window,-5.5+i*5.5,SHELL_H+0.19,9.2-(i%2)*6.4);
  shellGroup.add(skylight);
}
for(let i=0;i<3;i++){
  const rtu=box(2.1,0.85,1.6,MX.dockSteel,-4.5+i*4.5,SHELL_H+0.58,-6+(i%2)*7);
  const cap=box(1.8,0.12,1.38,MX.roof,rtu.position.x,SHELL_H+1.05,rtu.position.z);
  shellGroup.add(rtu,cap);
}

const servicePad=makeUtilityPad();
servicePad.position.set(13.2,0,-18.8);
shellGroup.add(servicePad);

const refuseArea=makeDumpster();
refuseArea.position.set(11.6,0,-21.4);
shellGroup.add(refuseArea);


scene.add(shellGroup);

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIVE EXTERIOR / SITE CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const siteGroups={
  shell:new THREE.Group(),
  logistics:new THREE.Group(),
  ground:new THREE.Group(),
  context:new THREE.Group(),
  landscape:new THREE.Group()
};
const siteMaster=new THREE.Group();
Object.values(siteGroups).forEach(g=>siteMaster.add(g));
scene.add(siteMaster);

const swayingTrees=[];
const swayingShrubs=[];
const movers=[];

// Ground / circulation
const siteBase=box(170,0.08,170,MX.asphaltDark,0,-0.08,0);
siteGroups.ground.add(siteBase);

const dockCourt=box(90,0.05,30,MX.concrete,6,-0.03,-40);
siteGroups.ground.add(dockCourt);

const truckLane=box(105,0.04,9,MX.asphalt,8,-0.025,-56);
siteGroups.ground.add(truckLane);

const hornerAve=box(14,0.05,150,MX.asphalt,-58,-0.03,0);
siteGroups.ground.add(hornerAve);
const hornerMedianLine=box(0.18,0.02,150,MX.whiteMark,-58,-0.014,0);
siteGroups.ground.add(hornerMedianLine);
addRoadDashes(siteGroups.ground,-56.25,-68,68,9,3.2,0.16);
addRoadDashes(siteGroups.ground,-59.75,-68,68,9,3.2,0.16);
addRoadCrossMarks(siteGroups.ground,-58,-68,68,12,1.8,0.14);

const sidewalkEast=box(2.8,0.06,150,MX.sidewalk,-48.9,-0.01,0);
const sidewalkWest=box(2.8,0.06,150,MX.sidewalk,-67.1,-0.01,0);
const curbEast=box(0.28,0.14,150,MX.curb,-50.3,0.04,0);
const curbWest=box(0.28,0.14,150,MX.curb,-65.7,0.04,0);
siteGroups.ground.add(sidewalkEast,sidewalkWest,curbEast,curbWest);

const roadShoulderGrass=box(8,0.06,150,MX.grassAlt,-74,-0.05,0);
siteGroups.ground.add(roadShoulderGrass);

const rearServiceStrip=box(120,0.05,8,MX.concreteDark,0,-0.025,31);
siteGroups.ground.add(rearServiceStrip);

const rearStreet=box(125,0.05,8,MX.asphalt,-2,-0.025,73);
const rearStreetSidewalk1=box(125,0.05,2.4,MX.sidewalk,-2,-0.005,67.3);
const rearStreetSidewalk2=box(125,0.05,2.4,MX.sidewalk,-2,-0.005,78.7);
siteGroups.ground.add(rearStreet,rearStreetSidewalk1,rearStreetSidewalk2);

const drivewayToRoad=box(14,0.04,18,MX.asphalt,-42,-0.02,-39);
siteGroups.ground.add(drivewayToRoad);

[
  [4,-39,18,8],[18,-35,16,7],[-12,-44,12,6],[30,-41,13,5],
  [0,-52,20,4],[-33,-59,12,4],[-83,12,18,7]
].forEach(([x,z,w,d])=>{
  siteGroups.ground.add(box(w,0.03,d,MX.asphaltWear,x,-0.013,z));
});

// Ground realism enrichments
const apronShadowBand=box(90,0.015,1.15,MX.concreteDark,6,-0.008,-25.55);
const loadingBayBand=box(38,0.012,6.4,MX.asphaltWear,4,-0.01,-31.6);
const dockTurnPatch=box(32,0.012,8.2,MX.puddle,4,-0.009,-47.5);
siteGroups.ground.add(apronShadowBand,loadingBayBand,dockTurnPatch);

dockXsMain.forEach((x,i)=>{
  siteGroups.ground.add(box(2.36,0.012,5.8,MX.asphaltWear,x,-0.01,-31.4));
  if(i!==2){
    const damp=box(2.44,0.008,2.7,MX.puddle,x,-0.006,-28.8+(i%2?0.18:-0.08));
    damp.rotation.y=(i%2?-0.04:0.05);
    siteGroups.ground.add(damp);
  }
  const grate=makeStormDrain();
  grate.position.set(x,0,-27.6);
  siteGroups.ground.add(grate);
});

for(let i=0;i<11;i++){
  const skidA=box(0.18,0.008,6.8,MX.asphaltWear,-12+i*2.9,-0.011,-42.8+Math.sin(i*0.55)*0.45);
  skidA.rotation.y=(Math.random()-.5)*0.12;
  siteGroups.ground.add(skidA);
}
for(let i=0;i<8;i++){
  const patch=box(3.8+Math.random()*3.6,0.012,1.8+Math.random()*2.1,i%2?MX.asphaltWear:MX.puddle,-27+i*8.4,-0.009,-53+Math.sin(i*0.7)*4.2);
  patch.rotation.y=(Math.random()-.5)*0.4;
  siteGroups.ground.add(patch);
}

const officeLot=box(18,0.04,12,MX.asphalt,-30,-0.02,-49.5);
const officeCross=box(3.6,0.02,2.2,MX.whiteMark,-30,-0.008,-57.4);
siteGroups.ground.add(officeLot,officeCross);
for(let i=0;i<5;i++){
  siteGroups.ground.add(box(0.14,0.02,4.7,MX.whiteMark,-37.2+i*3.4,-0.008,-49.2));
}
for(let i=0;i<5;i++){
  const stop=box(1.45,0.18,0.16,MX.curb,-37.2+i*3.4,0.09,-44.3);
  siteGroups.ground.add(stop);
}

const yardMudA=box(12,0.02,5.6,MX.soil,55,-0.03,18);
const yardMudB=box(7.8,0.02,3.6,MX.soil,-82,-0.03,19);
siteGroups.ground.add(yardMudA,yardMudB);
for(let i=0;i<26;i++){
  const tuft=makeGrassTuft(0.8+Math.random()*0.45);
  tuft.position.set(-78+Math.random()*11,0,-72+Math.random()*148);
  siteGroups.ground.add(tuft);
}

// Exterior shell for center warehouse
const centerRoofCap=box(SHELL_W+0.5,0.18,SHELL_D+0.5,MX.roof,0,SHELL_H+0.11,0);
siteGroups.shell.add(centerRoofCap);

for(let i=1;i<4;i++){
  const seam=box(0.12,0.03,SHELL_D-2,MX.roofStain,-SHELL_W/2+i*(SHELL_W/4),SHELL_H+0.125,0);
  siteGroups.shell.add(seam);
}
[
  [-2.5,SHELL_H+0.12,-4,5.0,18.0],
  [3.4,SHELL_H+0.12,8,4.2,20.5],
  [0,SHELL_H+0.12,0,7.0,10.0]
].forEach(([x,y,z,w,d])=>{
  siteGroups.shell.add(box(w,0.03,d,MX.roofStain,x,y,z));
});

[
  [-4.8,SHELL_H+0.14,-9.5],
  [-1.2,SHELL_H+0.14,4.5],
  [4.2,SHELL_H+0.14,10.5]
].forEach(([x,y,z])=>{
  const vent=makeRoofVent(0.24+Math.random()*0.08,0.28+Math.random()*0.12);
  vent.position.set(x,y,z);
  siteGroups.shell.add(vent);
});

[-7,-3.5,0,3.5,7].forEach(x=>{
  const shelter=makeDockShelter(2.2,3.0);
  shelter.position.set(x,0,-SHELL_D/2);
  siteGroups.shell.add(shelter);
  const bumperPlate=box(2.25,0.05,0.8,MX.dockSteel,x,0.02,-25.64);
  siteGroups.shell.add(bumperPlate);
});

const dockServiceDoor=box(1.05,2.2,0.12,MX.officeTrim,9.6,1.1,-25.08);
siteGroups.shell.add(dockServiceDoor);

// Connected warehouse units left / right
const leftConnected=makeWarehouseMass(18,50,9.9,4);
leftConnected.position.set(-20,0,0);
siteGroups.context.add(leftConnected);

const rightConnected=makeWarehouseMass(21.5,50,9.9,5);
rightConnected.position.set(21.75,0,0);
siteGroups.context.add(rightConnected);

const rightAnnex=makeWarehouseMass(9,50,9.4,2);
rightAnnex.position.set(37,0,0);
siteGroups.context.add(rightAnnex);

// Foreground warehouse
const foregroundWarehouse=makeWarehouseMass(72,34,7.8,0);
foregroundWarehouse.position.set(12,0,-78);
siteGroups.context.add(foregroundWarehouse);
const fgRoofStainA=box(18,0.03,12,MX.roofStain,0,7.95,-78);
const fgRoofStainB=box(12,0.03,8,MX.roofStain,20,7.95,-85);
siteGroups.context.add(fgRoofStainA,fgRoofStainB);

// Industrial lots across Horner Avenue
const westLotA=makeWarehouseMass(16,22,5.8,0);
westLotA.position.set(-83,0,-24);
siteGroups.context.add(westLotA);

const westLotB=makeWarehouseMass(22,16,5.0,0);
westLotB.position.set(-86,0,18);
siteGroups.context.add(westLotB);

const westLotC=makeWarehouseMass(18,20,4.8,0);
westLotC.position.set(-79,0,52);
siteGroups.context.add(westLotC);

const openYardPad=box(24,0.05,18,MX.concrete,-82,-0.02,8);
siteGroups.context.add(openYardPad);

for(let i=0;i<5;i++){
  const stack=box(2.6,0.95,6.2,i%2?MX.container:MX.containerAlt,-90+i*4.2,0.48,8+(i%2?2:-2));
  siteGroups.context.add(stack);
}

// Small office / utility building
const siteOffice=makeOfficeBuilding(7.6,5.8,3.0);
siteOffice.position.set(-30,0,-63);
siteGroups.context.add(siteOffice);

const officePad=box(15,0.05,12,MX.concrete,-30,-0.02,-63);
const officeWalk=box(5.5,0.05,2.3,MX.sidewalk,-30,-0.01,-57);
siteGroups.context.add(officePad,officeWalk);

// Parking clusters
addParkingCluster(siteGroups.context,-37,-59,2,6,2.8,4.4,0.02);
addParkingCluster(siteGroups.context,-85,-40,1,7,2.7,4.5,0.05);
addParkingCluster(siteGroups.context,-76,35,2,5,2.7,4.2,-0.02);

// Open storage yard and parked trailers to far right
const eastStoragePad=box(24,0.05,20,MX.concrete,58,-0.02,6);
siteGroups.context.add(eastStoragePad);
for(let i=0;i<4;i++){
  const storage=box(3.2,1.0,7.6,i%2?MX.yardStorage:MX.containerAlt,50+i*4.3,0.52,4+(i%2?2:-2));
  siteGroups.context.add(storage);
}
for(let i=0;i<3;i++){
  const parkTrailer=makeTrailer(6.8,2.45,2.8,i%2===0);
  parkTrailer.rotation.y=Math.PI/2;
  parkTrailer.position.set(63,0,-22+i*9);
  siteGroups.context.add(parkTrailer);
}

// Logistics props: docked trailers, tractors, vehicles
const dockXsCenter=[-7,-3.5,0,3.5,7];
dockXsCenter.forEach((x,i)=>{
  const tr=makeTrailer(7.8,2.45,2.95,i%2===0);
  tr.rotation.y=Math.PI/2;
  tr.position.set(x,0,-33.5);
  siteGroups.logistics.add(tr);
});

[-24.5,-20.4,-16.3].forEach((x,i)=>{
  const tr=makeTrailer(7.4,2.45,2.9,i%2===1);
  tr.rotation.y=Math.PI/2;
  tr.position.set(x,0,-33.3-(i%2)*0.4);
  siteGroups.logistics.add(tr);
});

[15.6,19.8,24.1,28.5,32.4].forEach((x,i)=>{
  const tr=makeTrailer(7.4,2.45,2.9,i%2===0);
  tr.rotation.y=Math.PI/2;
  tr.position.set(x,0,-33.7+((i%2)*0.3));
  siteGroups.logistics.add(tr);
});

const comboA=makeSemiCombo(0x5da9ca,false);
comboA.rotation.y=Math.PI/2;
comboA.position.set(12,0,-51);
siteGroups.logistics.add(comboA);

const comboB=makeSemiCombo(0x57b08a,true);
comboB.rotation.y=Math.PI/2;
comboB.position.set(30,0,-50);
siteGroups.logistics.add(comboB);

const detachedA=makeTrailer(7.2,2.45,2.85,false);
detachedA.rotation.y=Math.PI/2;
detachedA.position.set(-4,0,-50);
siteGroups.logistics.add(detachedA);

const detachedB=makeTrailer(6.8,2.45,2.8,true);
detachedB.rotation.y=Math.PI/2;
detachedB.position.set(-20,0,-49);
siteGroups.logistics.add(detachedB);

[
  [-10,-46,0.08,0x2a3138],
  [-6,-45,-0.03,0xb5b9bf],
  [-1,-46,0.04,0x707983],
  [6,-46,-0.02,0x3e454d],
  [17,-45,0.06,0xd6d9dc]
].forEach(([x,z,r,c])=>{
  const car=makeCar(c);
  car.position.set(x,0,z);
  car.rotation.y=Math.PI + r;
  car.scale.setScalar(0.9);
  siteGroups.logistics.add(car);
});

// Houses and neighborhood context
const houseWalls=[MX.houseWallA,MX.houseWallB,MX.houseWallC,MX.houseWallD];
const houseRoofs=[MX.houseRoofA,MX.houseRoofB,MX.houseRoofC];
for(let i=0;i<10;i++){
  const hx=-37+i*8.2;
  const house=makeHouse(6.6+Math.random()*0.6,8.2,4.0+Math.random()*0.4,houseWalls[i%houseWalls.length],houseRoofs[i%houseRoofs.length]);
  house.position.set(hx,0,57+(i%2?0.8:-0.6));
  siteGroups.context.add(house);

  const yard=box(7.6,0.04,11.5,MX.grassAlt,hx,-0.045,47.3);
  const drive=box(2.1,0.04,7.5,MX.concreteDark,hx-2.2,-0.02,67.4);
  siteGroups.context.add(yard,drive);
}

// Context realism enrichments
for(let i=0;i<5;i++){
  const pole=makeHydroPole(10.8+Math.random()*1.1);
  pole.position.set(-67.9,0,-62+i*31);
  siteGroups.context.add(pole);
}
const eastFenceNorth=makeChainLinkFenceSegment(18,2.2);
eastFenceNorth.position.set(58,0,-4);
const eastFenceSouth=makeChainLinkFenceSegment(18,2.2);
eastFenceSouth.position.set(58,0,16);
siteGroups.context.add(eastFenceNorth,eastFenceSouth);

for(let i=0;i<4;i++){
  const shed=makeWarehouseMass(3.8,5.2,2.8,0);
  shed.position.set(-39+i*24,0,73.5+(i%2?1.1:-0.6));
  shed.scale.set(0.45,0.42,0.42);
  siteGroups.context.add(shed);
}
for(let i=0;i<10;i++){
  const fence=makeChainLinkFenceSegment(7.3,1.5);
  fence.position.set(-37+i*8.2,0,63.5);
  siteGroups.context.add(fence);
}
for(let i=0;i<6;i++){
  const van=makeCar(i%2?0xe1e2df:0x6e7782);
  van.scale.set(1.18,1.12,1.08);
  van.position.set(-82+i*4.2,0,8+(i%2?1.6:-1.4));
  van.rotation.y=Math.PI/2+((i%2?-1:1)*0.03);
  siteGroups.context.add(van);
}

const serviceBarrierRow=new THREE.Group();
for(let i=0;i<5;i++){
  const b=makeJerseyBarrier(1.65,MX.concreteDark);
  b.position.set(-77+i*2.0,0,19.4);
  b.rotation.y=(i%2?0.03:-0.02);
  serviceBarrierRow.add(b);
}
siteGroups.context.add(serviceBarrierRow);

const speedPost=new THREE.Group();
speedPost.add(new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,2.2,8),MX.officeTrim));
speedPost.children[0].position.y=1.1;
speedPost.add(box(0.72,0.72,0.04,MX.signWhite,0,2.15,0));
speedPost.add(box(0.56,0.56,0.05,MX.signRed,0,2.15,-0.02));
speedPost.position.set(-52.6,0,-46.5);
siteGroups.context.add(speedPost);

// Landscape: tree buffer, roadside trees, shrubs
for(let i=0;i<16;i++){
  const tree=makeTree(0.88+Math.random()*0.4);
  tree.position.set(-46+i*6.2,0,34+(Math.random()*4-2));
  siteGroups.landscape.add(tree);
  swayingTrees.push(tree);
}
for(let i=0;i<12;i++){
  const shrub=makeShrub(0.8+Math.random()*0.45);
  shrub.position.set(-44+i*7.4,0,31+(Math.random()*2-1));
  siteGroups.landscape.add(shrub);
}
for(let i=0;i<11;i++){
  const tree=makeTree(0.92+Math.random()*0.35);
  tree.position.set(-72+Math.random()*8,0,-58+i*12);
  siteGroups.landscape.add(tree);
  swayingTrees.push(tree);
}
for(let i=0;i<8;i++){
  const tree=makeTree(0.9+Math.random()*0.45);
  tree.position.set(-38+i*11.5,0,81+(Math.random()*3-1.5));
  siteGroups.landscape.add(tree);
  swayingTrees.push(tree);
}
for(let i=0;i<5;i++){
  const shrub=makeShrub(0.9+Math.random()*0.35);
  shrub.position.set(-31+(Math.random()*8-4),0,-63+(Math.random()*10-5));
  siteGroups.landscape.add(shrub);
}

// Small grass patches
siteGroups.landscape.add(
  box(118,0.05,10,MX.grass,0,-0.05,38),
  box(12,0.05,150,MX.grassAlt,-44,-0.05,0),
  box(25,0.05,14,MX.grassAlt,-30,-0.05,-63)
);


// Additional site richness / logistics storytelling
const detailGroup=new THREE.Group();
siteGroups.logistics.add(detailGroup);

for(let i=0;i<14;i++){
  const cone=makeCone();
  cone.position.set(-18+i*3.1,0,-42.5+(i%2)*0.4);
  cone.scale.setScalar(0.95+Math.random()*0.1);
  detailGroup.add(cone);
}
[
  [-9.2,-29.8],[-5.7,-29.7],[-2.2,-29.9],[1.3,-29.8],[4.8,-29.7],[8.3,-29.9]
].forEach(([x,z])=>{
  const stack=makeFloorPallet(M.boxB,Math.random()>0.4?M.wrap:M.wrapB);
  stack.scale.setScalar(0.92+Math.random()*0.1);
  stack.position.set(x,0,z);
  detailGroup.add(stack);
});

for(let i=0;i<5;i++){
  const bin=box(0.82,0.92,0.82,mat({color:i%2?0x2c4855:0x496b54,roughness:0.88,metalness:0.14}),-17.5+i*1.1,0.46,-27.8+(i%2)*0.2);
  const lid=box(0.88,0.08,0.88,MX.chassis,bin.position.x,0.98,bin.position.z);
  detailGroup.add(bin,lid);
}

[
  [-24.2,-46.2],[-20.2,-46.0],[-16.2,-46.3],[14.8,-45.7],[18.8,-45.8],[23.0,-46.1],[27.2,-45.9],[31.4,-45.8]
].forEach(([x,z])=>{
  addWheelChocks(detailGroup,x,z,2);
});

const poleA=makeLightPole(9.2); poleA.position.set(-2.8,0,-58.5); siteGroups.context.add(poleA);
const poleB=makeLightPole(9.2); poleB.position.set(34.5,0,-58.2); siteGroups.context.add(poleB);

for(let i=0;i<5;i++){
  const barrier=box(1.55,0.16,0.18,MX.yellowMark,40+i*1.8,0.08,14.6);
  barrier.rotation.y=(i%2)*0.08;
  siteGroups.context.add(barrier);
}

// Logistics enrichment clusters
const forkliftA=makeForklift(0xe18c2c);
forkliftA.position.set(-9.8,0,-37.2);
forkliftA.rotation.y=0.12;
siteGroups.logistics.add(forkliftA);
movers.push({mesh:forkliftA,type:'forklift',baseX:-9.8,baseZ:-37.2,speed:0.0016,range:1});

const forkliftB=makeForklift(0xc95b2d);
forkliftB.scale.setScalar(0.96);
forkliftB.position.set(10.2,0,-30.8);
forkliftB.rotation.y=Math.PI*0.94;
siteGroups.logistics.add(forkliftB);

const jackA=makePalletJack(0xcb4a33);
jackA.position.set(4.6,0,-29.4);
jackA.rotation.y=-0.35;
siteGroups.logistics.add(jackA);

const jackB=makePalletJack(0xd48b29);
jackB.position.set(-14.2,0,-28.9);
jackB.rotation.y=0.42;
siteGroups.logistics.add(jackB);

for(let i=0;i<4;i++){
  const cluster=new THREE.Group();
  const pal=makeFloorPallet(i%2?M.boxB:M.boxC,i%2?M.wrapB:M.wrap);
  pal.position.set(0,0,0);
  cluster.add(pal);
  if(i!==1){
    const pal2=makeFloorPallet(i%2?M.box:M.boxB,i%2?M.wrap:M.wrapB);
    pal2.position.set(1.24,0,0.18);
    cluster.add(pal2);
  }
  cluster.position.set(-13+i*7.8,0,-29.6+(i%2?0.2:-0.12));
  cluster.rotation.y=(i%2?-0.08:0.05);
  siteGroups.logistics.add(cluster);
}
for(let i=0;i<5;i++){
  const drum=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,0.88,14),i%2?MX.barrelBlue:MX.hazardOrange);
  drum.position.set(16.5+i*0.64,0.44,-28.9+(i%2?0.24:-0.18));
  drum.castShadow=true;drum.receiveShadow=true;
  siteGroups.logistics.add(drum);
}
for(let i=0;i<3;i++){
  const barrier=makeJerseyBarrier(1.55,MX.concreteDark);
  barrier.position.set(44+i*1.9,0,13.4);
  barrier.rotation.y=(i%2?0.08:-0.05);
  siteGroups.logistics.add(barrier);
}

for(let i=0;i<22;i++){
  const tr=makeTree(0.82+Math.random()*0.55);
  tr.position.set(-22+i*4.8,0,-90+Math.sin(i*0.8)*4 + Math.random()*2);
  siteGroups.landscape.add(tr);
  swayingTrees.push(tr);
}
for(let i=0;i<10;i++){
  const tr=makeTree(1.15+Math.random()*0.38);
  tr.position.set(-74+Math.random()*18,0,-74+i*14.2);
  siteGroups.landscape.add(tr);
  swayingTrees.push(tr);
}
for(let i=0;i<12;i++){
  const tr=makeTree(1.2+Math.random()*0.45);
  tr.position.set(44+i*4.6,0,-90+Math.random()*8);
  siteGroups.landscape.add(tr);
  swayingTrees.push(tr);
}
for(let i=0;i<28;i++){
  const shrub=makeShrub(0.72+Math.random()*0.4);
  shrub.position.set(-47+i*3.7,0,-67+Math.sin(i*0.7)*1.5 + Math.random()*2);
  siteGroups.landscape.add(shrub);
}
for(let i=0;i<18;i++){
  const shrub=makeShrub(0.8+Math.random()*0.35);
  shrub.position.set(35+Math.random()*30,0,-70+Math.random()*18);
  siteGroups.landscape.add(shrub);
}
for(let i=0;i<9;i++){
  const fg=makeTree(1.35+Math.random()*0.4);
  fg.position.set(-70+Math.random()*10,0,-110+i*12.5);
  siteGroups.landscape.add(fg);
  swayingTrees.push(fg);
}

const fencePadA=box(18,0.04,0.16,MX.chassis,58,0.02,-4);
const fencePadB=box(18,0.04,0.16,MX.chassis,58,0.02,16);
siteGroups.context.add(fencePadA,fencePadB);

const eastFenceGateA=makeChainLinkFenceSegment(18,2.0);
eastFenceGateA.position.set(58,0,-4);
const eastFenceGateB=makeChainLinkFenceSegment(18,2.0);
eastFenceGateB.position.set(58,0,16);
siteGroups.context.add(eastFenceGateA,eastFenceGateB);

// Landscape enrichments
for(let i=0;i<16;i++){
  const con=makeConifer(0.95+Math.random()*0.42);
  con.position.set(46+i*2.5,0,-73+Math.random()*18);
  siteGroups.landscape.add(con);
  swayingTrees.push(con);
}
for(let i=0;i<26;i++){
  const tuft=makeGrassTuft(0.72+Math.random()*0.52);
  tuft.position.set(-47+i*3.9,0,29+Math.sin(i*0.55)*1.4 + Math.random()*1.2);
  siteGroups.landscape.add(tuft);
}
for(let i=0;i<24;i++){
  const tuft=makeGrassTuft(0.82+Math.random()*0.38);
  tuft.position.set(36+Math.random()*30,0,-72+Math.random()*18);
  siteGroups.landscape.add(tuft);
}
for(let i=0;i<16;i++){
  const hedge=makeShrub(0.9+Math.random()*0.3);
  hedge.position.set(-37+i*5.1,0,52.4+(Math.random()*0.8-0.4));
  hedge.scale.y*=0.92;
  siteGroups.landscape.add(hedge);
}
for(let i=0;i<12;i++){
  const fgTree=i%3===0?makeConifer(1.3+Math.random()*0.25):makeTree(1.15+Math.random()*0.42);
  fgTree.position.set(-71+Math.random()*15,0,-109+i*11.5);
  siteGroups.landscape.add(fgTree);
  swayingTrees.push(fgTree);
}
for(let i=0;i<7;i++){
  const bed=box(3.8,0.03,2.2,MX.mulch,-32+i*5.1,-0.03,-60+(i%2?1.2:-1.1));
  siteGroups.landscape.add(bed);
  const shrub=makeShrub(0.9+Math.random()*0.25);
  shrub.position.set(bed.position.x,0,bed.position.z);
  siteGroups.landscape.add(shrub);
}


// ─────────────────────────────────────────────────────────────────────────────
// ULTRA-DETAIL POPULATION PASS — SHELL / LOGISTICS / GROUND / CONTEXT / LANDSCAPE
// ─────────────────────────────────────────────────────────────────────────────
const ultraShell=new THREE.Group();
const ultraLogistics=new THREE.Group();
const ultraGround=new THREE.Group();
const ultraContext=new THREE.Group();
const ultraLandscape=new THREE.Group();
siteGroups.shell.add(ultraShell);
siteGroups.logistics.add(ultraLogistics);
siteGroups.ground.add(ultraGround);
siteGroups.context.add(ultraContext);
siteGroups.landscape.add(ultraLandscape);

// SHELL — panel logic, service utilities, dock states, weathering
for(let i=1;i<8;i++){
  const x=-SHELL_W/2+i*(SHELL_W/8);
  ultraShell.add(box(0.03,SHELL_H-0.36,0.05,UDM.weatherSoft,x,SHELL_H/2+0.1,SHELL_D/2+0.14));
  ultraShell.add(box(0.03,SHELL_H-0.36,0.05,UDM.weatherSoft,x,SHELL_H/2+0.1,-SHELL_D/2-0.14));
}
for(let i=1;i<7;i++){
  const z=-SHELL_D/2+i*(SHELL_D/7);
  ultraShell.add(box(0.05,SHELL_H-0.36,0.03,UDM.weatherSoft,-SHELL_W/2-0.14,SHELL_H/2+0.1,z));
  ultraShell.add(box(0.05,SHELL_H-0.36,0.03,UDM.weatherSoft,SHELL_W/2+0.14,SHELL_H/2+0.1,z));
}
[2.8,5.55,8.2].forEach(y=>{
  ultraShell.add(box(SHELL_W-0.34,0.02,0.03,UDM.weatherSoft,0,y,SHELL_D/2+0.15));
  ultraShell.add(box(SHELL_W-0.34,0.02,0.03,UDM.weatherSoft,0,y,-SHELL_D/2-0.15));
  ultraShell.add(box(0.03,0.02,SHELL_D-0.34,UDM.weatherSoft,-SHELL_W/2-0.15,y,0));
  ultraShell.add(box(0.03,0.02,SHELL_D-0.34,UDM.weatherSoft,SHELL_W/2+0.15,y,0));
});
[[ -SHELL_W/2-0.16, 0],[ SHELL_W/2+0.16,0],[0,SHELL_D/2+0.16],[0,-SHELL_D/2-0.16 ]].forEach(([x,z])=>{
  ultraShell.add(box(x===0?SHELL_W+0.8:0.12,0.03,z===0?SHELL_D+0.8:0.12,MX.warehouseTrim,x,9.98,z));
});
[-8.5,-3.5,1.2,5.8].forEach(x=>{
  const scupper=box(0.34,0.12,0.18,MX.dockSteel,x,9.72,-SHELL_D/2-0.22);
  const spill=box(0.28,0.9,0.02,UDM.weatherSoft,x,8.9,-SHELL_D/2-0.16);
  ultraShell.add(scupper,spill);
});
// Repositioned roof-access / service clusters to the tree-facing front wall so they remain visible with context on.
const rearServiceDoorX=6.6;
const rearServiceDoorZ=-SHELL_D/2-0.06;
const roofHatch=makeUDRoofHatch(); roofHatch.position.set(rearServiceDoorX-2.35,SHELL_H+0.18,-21.55); ultraShell.add(roofHatch);
const ladder=makeUDCageLadder(9.4); ladder.position.set(rearServiceDoorX-2.35,0,-SHELL_D/2-0.22); ultraShell.add(ladder);
const railA=makeUDRoofRail(3.1,2.1); railA.position.set(rearServiceDoorX-2.35,SHELL_H+0.2,-20.45); ultraShell.add(railA);
const railB=makeUDRoofRail(4.2,2.4); railB.position.set(-3.8,SHELL_H+0.2,-6.8); ultraShell.add(railB);
for(let i=0;i<4;i++){
  const vent=box(0.52,0.10,0.52,MX.roofDark,-8.2+i*8.1,SHELL_H+0.16,13.5-(i%2)*5.2); ultraShell.add(vent);
}
const rearServiceDoor=box(1.02,2.16,0.12,MX.officeTrim,rearServiceDoorX,1.08,rearServiceDoorZ);
const reader2=box(0.06,0.2,0.05,UDM.signBlue,rearServiceDoorX+0.52,1.08,-SHELL_D/2-0.14);
const cam2=makeUDCamera(); cam2.position.set(rearServiceDoorX+0.62,4.48,-SHELL_D/2-0.16); cam2.rotation.y=-Math.PI/2; ultraShell.add(rearServiceDoor,reader2,cam2);
const staffSign=box(1.4,0.34,0.04,MX.officeTrim,rearServiceDoorX,2.75,-SHELL_D/2-0.18);
const staffFace=box(1.28,0.22,0.02,MX.whiteMark,rearServiceDoorX,2.75,-SHELL_D/2-0.20);
staffFace.userData.noToggle=true;
ultraShell.add(staffSign,staffFace);
const meterBank=makeUDMeterBank(5); meterBank.position.set(rearServiceDoorX+2.2,0,-SHELL_D/2-0.32); ultraShell.add(meterBank);
const gasMeters=makeUDGasMeters(); gasMeters.position.set(rearServiceDoorX+2.4,0,-SHELL_D/2-0.5); ultraShell.add(gasMeters);
const utilityPad2=makeUDPadTransformer(); utilityPad2.position.set(rearServiceDoorX+3.35,0,-SHELL_D/2-2.5); ultraShell.add(utilityPad2);
[-0.55,0,0.55].forEach(dx=>{
  const bollard=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,1.0,14),MX.bollard);
  bollard.position.set(rearServiceDoorX+2.85+dx,0.5,-SHELL_D/2-1.35); bollard.castShadow=true; bollard.receiveShadow=true;
  ultraLogistics.add(bollard);
});
for(let i=0;i<4;i++){
  const pipe=udCylinderBetween(new THREE.Vector3(rearServiceDoorX+2.25+i*0.44,1.1,-SHELL_D/2-0.16),new THREE.Vector3(rearServiceDoorX+2.25+i*0.44,2.0,-SHELL_D/2-0.16),0.035,MX.dockSteel);
  ultraShell.add(pipe);
}
const wallConduit1=udCylinderBetween(new THREE.Vector3(rearServiceDoorX+2.25,1.44,-SHELL_D/2-0.16),new THREE.Vector3(rearServiceDoorX+2.25,6.1,-SHELL_D/2-0.16),0.03,MX.dockSteel);
const wallConduit2=udCylinderBetween(new THREE.Vector3(rearServiceDoorX+2.25,6.1,-SHELL_D/2-0.16),new THREE.Vector3(rearServiceDoorX+0.85,6.1,-SHELL_D/2-0.16),0.03,MX.dockSteel);
const wallConduit3=udCylinderBetween(new THREE.Vector3(rearServiceDoorX+0.85,6.1,-SHELL_D/2-0.16),new THREE.Vector3(rearServiceDoorX+0.85,9.86,-SHELL_D/2-0.16),0.03,MX.dockSteel);
ultraShell.add(wallConduit1,wallConduit2,wallConduit3);
const hatchZone=box(3.0,0.01,2.8,UDM.fadedPaint,rearServiceDoorX+3.1,-0.008,-SHELL_D/2-1.95); ultraGround.add(hatchZone);
for(let i=0;i<8;i++){
  const diag=box(0.08,0.012,3.5,MX.yellowMark,rearServiceDoorX+3.1,-0.006,-SHELL_D/2-0.78-i*0.34); diag.rotation.y=Math.PI/4; ultraGround.add(diag);
}
const rearServiceDumpster=makeDumpster(2.6,1.2,1.32); rearServiceDumpster.position.set(rearServiceDoorX+4.65,0,-SHELL_D/2-4.4); rearServiceDumpster.rotation.y=-Math.PI/2+0.12; ultraLogistics.add(rearServiceDumpster);
const rearServiceBinA=makeUDRollingBin(0x496b54); rearServiceBinA.position.set(rearServiceDoorX+2.65,0,-SHELL_D/2-3.55); rearServiceBinA.rotation.y=Math.PI+0.18; ultraLogistics.add(rearServiceBinA);
const rearServiceBinB=makeUDRollingBin(0x2c4855); rearServiceBinB.position.set(rearServiceDoorX+3.55,0,-SHELL_D/2-3.8); rearServiceBinB.rotation.y=Math.PI-0.12; ultraLogistics.add(rearServiceBinB);
const rearServicePallet=makeFloorPallet(M.boxB,M.wrapB); rearServicePallet.position.set(rearServiceDoorX+1.45,0,-SHELL_D/2-3.0); rearServicePallet.scale.setScalar(0.84); ultraLogistics.add(rearServicePallet);
const gooseneckA=makeUDGooseneck(); gooseneckA.position.set(2.4,4.8,SHELL_D/2+0.22); ultraShell.add(gooseneckA);
const rearGooseneck=makeUDGooseneck(); rearGooseneck.position.set(rearServiceDoorX,4.8,-SHELL_D/2-0.22); rearGooseneck.rotation.y=Math.PI; ultraShell.add(rearGooseneck);
const gooseneckB=makeUDGooseneck(); gooseneckB.position.set(-2.4,4.8,SHELL_D/2+0.22); ultraShell.add(gooseneckB);
dockXsMain.forEach((x,i)=>{
  const signal=makeUDDockSignal(i===2?'red':'green'); signal.position.set(x+1.3,2.76,-SHELL_D/2-0.14); ultraShell.add(signal);
  const restraint=makeUDRestraintBox(); restraint.position.set(x-1.3,0,-24.92); ultraShell.add(restraint);
  const guideL=box(0.14,1.1,0.18,MX.concreteDark,x-1.55,0.55,-24.2); const guideR=guideL.clone(); guideR.position.x=x+1.55; ultraShell.add(guideL,guideR);
  const trackL=box(0.05,3.42,0.08,MX.dockSteel,x-1.12,1.72,-25.0); const trackR=trackL.clone(); trackR.position.x=x+1.12; ultraShell.add(trackL,trackR);
});
const openDockVoid=box(2.18,3.2,0.78,UDM.offBlack,-3.5,1.62,-25.42); ultraShell.add(openDockVoid);
const openDockPallet=makeFloorPallet(M.boxB,M.wrapB); openDockPallet.position.set(-3.5,0,-24.96); openDockPallet.scale.setScalar(0.84); ultraShell.add(openDockPallet);
const halfDoor=box(2.08,1.28,0.12,M.dock,0,2.58,-25.12); ultraShell.add(halfDoor);
const closedServiceBay=box(2.2,0.22,0.04,MX.signRed,7,1.18,-25.2); ultraShell.add(closedServiceBay);
for(let i=0;i<4;i++){
  const cone=makeCone(); cone.position.set(5.9+i*0.38,0,-27.1+(i%2?0.2:0)); ultraLogistics.add(cone);
}
const barrierMaint=makeJerseyBarrier(2.0,MX.concreteDark); barrierMaint.position.set(7,0,-27.7); ultraLogistics.add(barrierMaint);

for(let i=0;i<14;i++){
  const streak=box(0.22+Math.random()*0.26,1.0+Math.random()*2.4,0.02,UDM.weatherSoft,-9.6+Math.random()*19.2,7.8-Math.random()*2.1,SHELL_D/2+0.145);
  ultraShell.add(streak);
}
for(let i=0;i<12;i++){
  const streak=box(0.18+Math.random()*0.24,1.0+Math.random()*2.2,0.02,UDM.weatherSoft,-9.4+Math.random()*18.8,7.7-Math.random()*2.0,-SHELL_D/2-0.145);
  ultraShell.add(streak);
}
for(let i=0;i<10;i++){
  const sideStreak=box(0.02,0.9+Math.random()*2.4,0.18+Math.random()*0.22,UDM.weatherSoft,SHELL_W/2+0.145,7.6-Math.random()*2.2,-20+Math.random()*35);
  ultraShell.add(sideStreak);
}

// LOGISTICS — equipment, staging, varied trailers, waste, service gear
const backingRig=makeSemiCombo(0x6ba6c8,true); backingRig.rotation.y=Math.PI/2+0.18; backingRig.position.set(43.5,0,-47.2); ultraLogistics.add(backingRig);
const yardTrailer=makeTrailer(7.9,2.45,2.9,true); yardTrailer.rotation.y=-Math.PI/2+0.04; yardTrailer.position.set(-34,0,-44.2); ultraLogistics.add(yardTrailer); addWheelChocks(ultraLogistics,-34,-42.64,2);
const storageTrailer=makeTrailer(7.6,2.45,2.9,false); storageTrailer.rotation.y=Math.PI/2; storageTrailer.position.set(58,0,29); ultraLogistics.add(storageTrailer); addWheelChocks(ultraLogistics,58,27.55,2);
const serviceVanA=makeUDServiceVan(); serviceVanA.position.set(-28,0,-54.4); serviceVanA.rotation.y=-0.05; ultraLogistics.add(serviceVanA);
const serviceVanB=makeUDServiceVan(0xdfe7ef); serviceVanB.position.set(51,0,24); serviceVanB.rotation.y=Math.PI/2; ultraLogistics.add(serviceVanB);
const ultraForkliftA=makeForklift(0xde8f21); ultraForkliftA.position.set(-1.6,0,-30.1); ultraForkliftA.rotation.y=0.16; ultraLogistics.add(ultraForkliftA); movers.push({mesh:ultraForkliftA,type:'forklift',baseX:-1.6,baseZ:-30.1,speed:0.0018});
const ultraForkliftB=makeForklift(0xcf7b22); ultraForkliftB.position.set(12.4,0,-29.8); ultraForkliftB.rotation.y=-0.3; ultraLogistics.add(ultraForkliftB);
const ultraJackA=makePalletJack(0xb6372d); ultraJackA.position.set(-9.8,0,-28.4); ultraJackA.rotation.y=0.38; ultraLogistics.add(ultraJackA);
const ultraJackB=makePalletJack(0x3f6d98); ultraJackB.position.set(18.2,0,-29.2); ultraJackB.rotation.y=-0.22; ultraLogistics.add(ultraJackB);
const stairsA=makeUDDockStairs(); stairsA.position.set(-3.6,0,-27.7); stairsA.rotation.y=0.06; ultraLogistics.add(stairsA);
const ladderA=makeUDDockLadder(); ladderA.position.set(0.1,0,-27.3); ladderA.rotation.y=-0.1; ultraLogistics.add(ladderA);
for(let i=0;i<6;i++){
  const p=i%3===0?makeFloorPallet(M.boxB,M.wrapB):i%2===0?makeFloorPallet(M.box,M.wrap):makeFloorPallet(M.boxC,M.wrapB);
  p.position.set(-14.6+i*2.2,0,-28.7+(i%2?0.35:-0.12)); p.rotation.y=(i%2?-0.08:0.05); ultraLogistics.add(p);
}
for(let i=0;i<5;i++){
  const p=makeFloorPallet(M.box,M.wrap); p.position.set(8.8+i*1.95,0,-28.6+(i%2?0.16:-0.2)); p.rotation.y=(i%2?0.14:-0.12); ultraLogistics.add(p);
}
for(let i=0;i<3;i++){
  const ibc=makeUDIBC(); ibc.position.set(18+i*1.3,0,-26.2+(i%2?0.6:-0.1)); ultraLogistics.add(ibc);
}
for(let i=0;i<3;i++){
  const gay=makeUDGaylord(); gay.position.set(23.2+i*1.2,0,-27.4+(i%2?0.3:-0.2)); ultraLogistics.add(gay);
}
for(let i=0;i<2;i++){
  const bale=makeUDBale(); bale.position.set(27.8+i*1.34,0,-27.2); ultraLogistics.add(bale);
}
for(let i=0;i<4;i++){
  const bin=makeUDRollingBin(i%2?0x4f6750:0x4c5668); bin.position.set(31.2+i*0.82,0,-27.8+(i%2?0.18:-0.1)); ultraLogistics.add(bin);
}
for(let i=0;i<4;i++){
  const drum=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,0.88,14),i%2?MX.barrelBlue:MX.hazardOrange);
  drum.position.set(15.6+i*0.64,0.44,-27.2+(i%2?0.24:-0.18)); drum.castShadow=true; drum.receiveShadow=true; ultraLogistics.add(drum);
}
for(let i=0;i<6;i++){
  const cone=makeCone(); cone.position.set(41.5+i*0.48,0,12.9+(i%2?0.22:-0.14)); ultraLogistics.add(cone);
}
for(let i=0;i<4;i++){
  const barrier=makeJerseyBarrier(1.68,MX.concreteDark); barrier.position.set(46.2+i*1.88,0,12.6+(i%2?0.12:-0.08)); barrier.rotation.y=(i%2?0.08:-0.05); ultraLogistics.add(barrier);
}
const spillKit=box(0.68,1.0,0.34,MX.signRed,10.9,0.5,-27.8); ultraLogistics.add(spillKit);
const spillFace=box(0.48,0.22,0.02,MX.whiteMark,10.9,0.64,-27.98); ultraLogistics.add(spillFace);
const recycleA=makeDumpster(2.4,1.2,1.3); recycleA.position.set(13.6,0,-20.9); ultraLogistics.add(recycleA);
const compactPad=box(3.8,0.08,2.1,MX.concrete,13.6,0.04,-23.4); const compactor=box(3.2,1.65,1.65,UDM.utilityGreen,13.6,0.82,-23.1); ultraLogistics.add(compactPad,compactor);
for(let i=0;i<2;i++){
  const cart=makeUDRollingBin(0x5d655d); cart.position.set(14.4+i*0.8,0,-18.6+(i?0.22:-0.18)); ultraLogistics.add(cart);
}

// GROUND — wear, paint, drainage, patches, edges, clutter
for(let i=0;i<16;i++){
  const patch=box(2.2+Math.random()*4.6,0.01,0.24+Math.random()*0.44,MX.asphaltWear,-19+i*3.1,-0.01,-43.8+Math.sin(i*0.7)*1.1);
  patch.rotation.y=(Math.random()-0.5)*0.26; ultraGround.add(patch);
}
for(let i=0;i<8;i++){
  const oil=box(1.1+Math.random()*1.6,0.008,0.6+Math.random()*1.1,MX.puddle,-8+i*4.2,-0.008,-50.5+Math.sin(i*0.7)*2.2);
  oil.rotation.y=Math.random()*Math.PI; ultraGround.add(oil);
}
for(let i=0;i<12;i++){
  const crack=box(0.08,0.008,4.2+Math.random()*3.4,MX.asphaltWear,-20+i*6.5,-0.01,-54+Math.sin(i*0.4)*5.4);
  crack.rotation.y=(Math.random()-0.5)*1.3; ultraGround.add(crack);
}
for(let i=0;i<7;i++){
  const seam=box(10.4,0.01,0.06,UDM.weatherSoft,-22+i*10.4,-0.01,-25.6); ultraGround.add(seam);
}
for(let i=0;i<9;i++){
  const seam=box(0.06,0.01,6.8,UDM.weatherSoft,-37.2+i*8.8,-0.01,-37.2); ultraGround.add(seam);
}
for(let i=0;i<6;i++){
  const drain=makeStormDrain(); drain.position.set(-14+i*6.4,0,-38.2); ultraGround.add(drain);
}
for(let i=0;i<3;i++){
  const manhole=new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.46,0.02,20),MX.dockSteel);
  manhole.position.set(-58,0.01,-24+i*28); manhole.rotation.x=Math.PI/2; manhole.castShadow=true; manhole.receiveShadow=true; ultraGround.add(manhole);
}
for(let i=0;i<7;i++){
  const arrowStem=box(0.18,0.012,2.2,UDM.fadedPaint,-58,-0.007,-58+i*18);
  const arrowHeadL=box(0.12,0.012,0.82,UDM.fadedPaint,-57.7,-0.007,-57.2+i*18); arrowHeadL.rotation.y=Math.PI/4;
  const arrowHeadR=box(0.12,0.012,0.82,UDM.fadedPaint,-58.3,-0.007,-57.2+i*18); arrowHeadR.rotation.y=-Math.PI/4;
  ultraGround.add(arrowStem,arrowHeadL,arrowHeadR);
}
const stopBar=box(3.6,0.012,0.22,MX.whiteMark,-50.9,-0.007,-39.4); ultraGround.add(stopBar);
for(let i=0;i<10;i++){
  const grit=box(0.2+Math.random()*0.28,0.012,0.18+Math.random()*0.26,MX.soil,-49.8+Math.random()*0.8,-0.006,-73+Math.random()*145); ultraGround.add(grit);
}
for(let i=0;i<18;i++){
  const weed=makeGrassTuft(0.35+Math.random()*0.2); weed.position.set(-49.4+Math.random()*0.7,0,-70+Math.random()*140); ultraGround.add(weed);
}
for(let i=0;i<18;i++){
  const litter=box(0.08+Math.random()*0.08,0.008,0.16+Math.random()*0.12,UDM.weatherSoft,-82+Math.random()*18,-0.006,6+Math.random()*10); litter.rotation.y=Math.random()*Math.PI; ultraGround.add(litter);
}
const accessibleStem=box(0.14,0.012,2.2,MX.whiteMark,-37.1,-0.007,-49.5); const accessibleCross=box(1.4,0.012,0.14,MX.whiteMark,-37.1,-0.007,-49.5); ultraGround.add(accessibleStem,accessibleCross);
for(let i=0;i<14;i++){
  const skid=box(0.12,0.008,3.8+Math.random()*3.4,MX.asphaltWear,-4+i*2.0,-0.009,-46.3+Math.sin(i*0.45)*0.7); skid.rotation.y=(Math.random()-0.5)*0.12; ultraGround.add(skid);
}

// CONTEXT — district infrastructure, more masses, fences, street edge, utilities
/* for(let i=0;i<5;i++){
  const mass=makeWarehouseMass(14+Math.random()*12,18+Math.random()*16,4.6+Math.random()*2.2,1+Math.floor(Math.random()*3));
  mass.position.set(56+i*18,0,-88-Math.random()*14); ultraContext.add(mass);
}
for(let i=0;i<4;i++){
  const shed=makeWarehouseMass(8+Math.random()*5,12+Math.random()*6,3.8+Math.random()*1.2,1);
  shed.position.set(-104+i*12,0,-34+i*28); ultraContext.add(shed);
} */
for(let i=0;i<7;i++){
  const pole=makeHydroPole(11.2+Math.random()*1.2); pole.position.set(-62.2,0,-74+i*24.5); ultraContext.add(pole);
}
for(let i=0;i<6;i++){
  const a=new THREE.Vector3(-62.2,10.4,-74+i*24.5); const b=new THREE.Vector3(-62.2,10.7,-74+(i+1)*24.5);
  ultraContext.add(udCylinderBetween(a,b,0.018,UDM.wire));
  ultraContext.add(udCylinderBetween(a.clone().add(new THREE.Vector3(0.28,0,0)),b.clone().add(new THREE.Vector3(0.28,0,0)),0.016,UDM.wire));
}
const hydrant=makeUDHydrant(); hydrant.position.set(-50.4,0,-33.8); ultraContext.add(hydrant);
const truckSign=makeUDTrafficSign('TRUCK'); truckSign.position.set(-51.8,0,-42.5); ultraContext.add(truckSign);
const noticeSign=makeUDTrafficSign('NOTICE'); noticeSign.position.set(47.8,0,18.2); ultraContext.add(noticeSign);
const stopSign=makeUDTrafficSign('STOP'); stopSign.position.set(-50.5,0,63.2); ultraContext.add(stopSign);
const txA=makeUDPadTransformer(); txA.position.set(-76,0,55); txA.rotation.y=-0.24; ultraContext.add(txA);
const txB=makeUDPadTransformer(); txB.position.set(47,0,18); txB.rotation.y=Math.PI/2; ultraContext.add(txB);
const gate1=makeUDSlidingGate(10); gate1.position.set(58,0,6); ultraContext.add(gate1);
const gate2=makeUDSlidingGate(10); gate2.position.set(58,0,-14); ultraContext.add(gate2);
for(let i=0;i<5;i++){
  const fence=makeChainLinkFenceSegment(12,2.0); fence.position.set(46+i*12,0,-4); ultraContext.add(fence);
}
for(let i=0;i<6;i++){
  const fence=makeChainLinkFenceSegment(12,2.0); fence.position.set(-84+i*12,0,28); fence.rotation.y=Math.PI/2; ultraContext.add(fence);
}
const monument=makeUDAddressMonument(); monument.position.set(-47.2,0,-40.2); monument.rotation.y=-Math.PI/2; ultraContext.add(monument);
const pedestal=box(0.24,1.1,0.24,MX.dockSteel,51.6,0.55,18.4); ultraContext.add(pedestal);
for(let i=0;i<3;i++){
  const pole=makeLightPole(7.6+Math.random()*1.2); pole.position.set(-52.8,0,-52+i*38); ultraContext.add(pole);
}
const booth=makeOfficeBuilding(3.6,3.2,2.6); booth.position.set(53.4,0,18.2); ultraContext.add(booth);
for(let i=0;i<8;i++){
  const container=box(3.0,1.0,7.2,i%2?MX.container:MX.containerAlt,-92+i*3.5,0.52,12+(i%2?2.2:-1.8)); ultraContext.add(container);
}
const trafficCarA=makeCar(0xc9d0d6); trafficCarA.position.set(-60.8,0,-12); trafficCarA.rotation.y=-Math.PI/2; ultraContext.add(trafficCarA); movers.push({mesh:trafficCarA,type:'road',baseX:-60.8,baseZ:-12,speed:0.011,range:138});
const trafficVan=makeUDServiceVan(0xf0efe9); trafficVan.position.set(-55.4,0,42); trafficVan.rotation.y=Math.PI/2; ultraContext.add(trafficVan); movers.push({mesh:trafficVan,type:'roadBack',baseX:-55.4,baseZ:42,speed:0.009,range:138});

// LANDSCAPE — more species, edge growth, foreground framing, office planting, fence-line volunteer growth
for(let i=0;i<22;i++){
  const plant=i%4===0?makeConifer(0.9+Math.random()*0.42):makeTree(0.78+Math.random()*0.52);
  plant.position.set(-44+i*4.3,0,-71+Math.sin(i*0.54)*1.2+Math.random()*1.1); ultraLandscape.add(plant); swayingTrees.push(plant);
}
for(let i=0;i<18;i++){
  const plant=i%3===0?makeConifer(1.0+Math.random()*0.38):makeTree(0.88+Math.random()*0.44);
  plant.position.set(33+Math.random()*34,0,-72+Math.random()*20); ultraLandscape.add(plant); swayingTrees.push(plant);
}
for(let i=0;i<26;i++){
  const shrub=makeShrub(0.62+Math.random()*0.34); shrub.position.set(-40+i*3.15,0,52.1+(Math.random()*1.1-0.55)); ultraLandscape.add(shrub);
}
for(let i=0;i<28;i++){
  const tuft=makeGrassTuft(0.72+Math.random()*0.42); tuft.position.set(46+Math.random()*28,0,13+Math.random()*22); ultraLandscape.add(tuft);
}
for(let i=0;i<18;i++){
  const vol=i%4===0?makeShrub(0.76+Math.random()*0.2):makeGrassTuft(0.74+Math.random()*0.28); vol.position.set(-84+Math.random()*15,0,-72+Math.random()*144); ultraLandscape.add(vol);
}
for(let i=0;i<10;i++){
  const bed=box(2.8+Math.random()*1.6,0.03,1.4+Math.random()*0.8,UDM.mulchDark,-34+i*1.9,-0.03,-60.8+(i%2?1.1:-0.8)); ultraLandscape.add(bed);
  const shrub=makeShrub(0.84+Math.random()*0.28); shrub.position.set(bed.position.x,0,bed.position.z); ultraLandscape.add(shrub);
}
for(let i=0;i<14;i++){
  const fg=i%3===0?makeConifer(1.24+Math.random()*0.26):makeTree(1.08+Math.random()*0.42);
  fg.position.set(-76+Math.random()*18,0,-116+i*9.4); ultraLandscape.add(fg); swayingTrees.push(fg);
}
for(let i=0;i<28;i++){
  const roadside=makeGrassTuft(0.58+Math.random()*0.28); roadside.position.set(-73+Math.random()*8,0,-74+Math.random()*148); ultraLandscape.add(roadside);
}
for(let i=0;i<16;i++){
  const volunteer=i%5===0?makeTree(0.56+Math.random()*0.18):makeShrub(0.48+Math.random()*0.22); volunteer.position.set(56+Math.random()*22,0,-10+Math.random()*38); ultraLandscape.add(volunteer);
  if(volunteer.userData && volunteer.userData.swayAmp!==undefined) swayingTrees.push(volunteer);
}
// NEXT PASS — targeted shell / logistics / context upgrades from the remaining checklist
const nextPassShell=new THREE.Group();
const nextPassLogistics=new THREE.Group();
const nextPassContext=new THREE.Group();
siteGroups.shell.add(nextPassShell);
siteGroups.logistics.add(nextPassLogistics);
siteGroups.context.add(nextPassContext);

// Panel bowing / joint-cap pass for the main shell so hero views feel less sterile
const panelFaceMat=mat({color:0xa3a6a4,roughness:0.98,metalness:0.01,transparent:true,opacity:0.22});
const panelCount=7;
const panelW=(SHELL_W-1.4)/panelCount;
for(let i=0;i<panelCount;i++){
  const x=-SHELL_W/2+0.7+panelW*0.5+i*panelW;
  const bow=((i%2)?1:-1)*(0.014+0.004*(i%3));
  const frontPanel=box(panelW-0.12,SHELL_H-0.9,0.035,panelFaceMat,x,SHELL_H/2+0.18,SHELL_D/2+0.11+bow);
  const rearPanel=box(panelW-0.12,SHELL_H-0.9,0.035,panelFaceMat,x,SHELL_H/2+0.18,-SHELL_D/2-0.11-bow);
  const jointCapF=box(0.08,0.16,0.08,MX.warehouseTrim,x+panelW*0.5,SHELL_H+0.34,SHELL_D/2+0.15);
  const jointCapR=box(0.08,0.16,0.08,MX.warehouseTrim,x+panelW*0.5,SHELL_H+0.34,-SHELL_D/2-0.15);
  nextPassShell.add(frontPanel,rearPanel,jointCapF,jointCapR);
}
for(let i=0;i<6;i++){
  const x=-SHELL_W/2+1.8+i*3.6;
  const roofLip=box(3.0,0.12,0.22,MX.roofDark,x,SHELL_H+0.42,-SHELL_D/2-0.16+(i%2?0.025:-0.015));
  nextPassShell.add(roofLip);
}

// More explicit downspouts with brackets / offsets / overflow points
[-SHELL_W/2-0.22,SHELL_W/2+0.22].forEach((x,sideIdx)=>{
  [-18,-6,7,18].forEach((z,i)=>{
    const drop=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,SHELL_H-0.56,10),MX.dockSteel);
    drop.position.set(x,(SHELL_H-0.56)/2+0.14,z);
    drop.castShadow=true;drop.receiveShadow=true;
    nextPassShell.add(drop);
    [1.2,3.8,6.4].forEach(y=>{
      const bracket=box(0.18,0.03,0.08,MX.fenceGalv,x+(sideIdx===0?0.09:-0.09),y,z);
      const spacer=box(0.06,0.03,0.12,MX.fenceGalv,x+(sideIdx===0?0.02:-0.02),y,z);
      nextPassShell.add(bracket,spacer);
    });
    const shoe=udCylinderBetween(new THREE.Vector3(x,0.34,z),new THREE.Vector3(x+(sideIdx===0?0.36:-0.36),0.18,z+0.12),0.04,MX.dockSteel);
    nextPassShell.add(shoe);
    if(i<2){
      const overflow=box(0.28,0.10,0.20,MX.dockSteel,x+(sideIdx===0?0.16:-0.16),SHELL_H+0.02,z);
      const overflowRun=box(0.16,0.82,0.02,UDM.weatherSoft,x+(sideIdx===0?0.18:-0.18),SHELL_H-0.5,z);
      nextPassShell.add(overflow,overflowRun);
    }
  });
});

// Additional skylights with curb framing + more RTUs with bases and clearances
[
  [-8.2,-15.5,3.0,1.2],[-1.9,-12.2,2.6,1.0],[4.0,-16.0,3.0,1.1],[7.4,-2.8,2.5,1.0]
].forEach(([x,z,w,d],i)=>{
  const curb=box(w+0.24,0.16,d+0.24,MX.roofDark,x,SHELL_H+0.20,z);
  const glass=box(w,0.10,d,MX.window,x,SHELL_H+0.31,z);
  const stain=box(w+1.0,0.01,d+1.0,MX.roofStain,x,SHELL_H+0.12,z);
  nextPassShell.add(curb,glass,stain);
});
[
  [-7.8,-1.8,2.3,1.8],[-2.2,-8.8,2.0,1.6],[3.1,6.6,2.4,1.9],[7.2,12.4,2.1,1.7]
].forEach(([x,z,w,d],i)=>{
  const base=box(w+0.36,0.12,d+0.36,MX.concreteDark,x,SHELL_H+0.14,z);
  const unit=box(w,0.88,d,MX.dockSteel,x,SHELL_H+0.63,z);
  const cap=box(w*0.82,0.10,d*0.82,MX.roof,x,SHELL_H+1.08,z);
  const sideGrilleA=box(w*0.74,0.05,0.04,MX.fenceGalv,x,SHELL_H+0.72,z-d/2-0.02);
  const sideGrilleB=sideGrilleA.clone(); sideGrilleB.position.z=z+d/2+0.02;
  const clearZone=box(w+1.2,0.01,d+1.2,UDM.fadedPaint,x,SHELL_H+0.125,z);
  nextPassShell.add(base,unit,cap,sideGrilleA,sideGrilleB,clearZone);
});

// Deepened louvers + grime under louvers / roof vents
[
  [9.1,4.9,-SHELL_D/2-0.10,Math.PI],[-9.0,5.2,SHELL_D/2+0.10,0],[SHELL_W/2+0.11,5.0,-7.4,-Math.PI/2]
].forEach(([x,y,z,ry],i)=>{
  const lv=makeLouverBox(i===2?1.0:1.34,0.76,0.22,6); lv.position.set(x,y,z); lv.rotation.y=ry; nextPassShell.add(lv);
  const grime=box(0.18+(i===2?0.08:0.22),1.15,0.02,UDM.weatherSoft,x,y-1.05,z+(Math.abs(ry)===Math.PI/2?0:(ry===0?0.12:-0.12)));
  nextPassShell.add(grime);
});
for(let i=0;i<6;i++){
  const grime=box(0.28,0.92,0.02,UDM.weatherSoft,-8.2+i*3.2,SHELL_H+0.14,-12.4+(i%2)*6.2);
  nextPassShell.add(grime);
}

// Door hardware pass: panic bars, closers, thresholds, disconnects and hose bibs
[
  [9.6,-25.02,Math.PI],[6.6,-25.06,Math.PI],[10.6,25.02,0]
].forEach(([x,z,ry])=>{
  const hw=makeDoorHardware(1.02,2.16); hw.position.set(x,0,z); hw.rotation.y=ry; nextPassShell.add(hw);
  const disconnect=box(0.18,0.26,0.08,MX.dockSteel,x+0.72,1.36,z+(ry===0?-0.14:0.14));
  const disconnectFace=box(0.08,0.08,0.02,UDM.signRed,x+0.72,1.36,z+(ry===0?-0.19:0.19));
  const hose=box(0.10,0.10,0.08,UDM.serviceBlue,x-0.76,0.74,z+(ry===0?-0.14:0.14));
  const hosePipe=udCylinderBetween(new THREE.Vector3(x-0.76,0.62,z+(ry===0?-0.12:0.12)),new THREE.Vector3(x-0.76,1.16,z+(ry===0?-0.12:0.12)),0.02,MX.dockSteel);
  nextPassShell.add(disconnect,disconnectFace,hose,hosePipe);
});

// Service-side life-safety / plumbing detail
const backflow=makeBackflowAssembly(); backflow.position.set(9.6,0,-28.8); nextPassShell.add(backflow);
const shutoffSign=box(0.86,0.34,0.04,MX.signRed,9.2,2.46,-25.18); nextPassShell.add(shutoffSign);
const shutoffFace=box(0.72,0.18,0.02,MX.signWhite,9.2,2.46,-25.21); nextPassShell.add(shutoffFace);

// Overhead dock guide lights (instanced) + leveler-lip hints for performance-conscious repetition
addInstancedDockGuideLights(nextPassShell,dockXsMain,-24.92);
dockXsMain.forEach((x,i)=>{
  const lip=box(1.72,0.05,0.26,MX.dockSteel,x,0.07,-24.72);
  lip.rotation.x=-0.09-(i===1?0.03:0);
  nextPassShell.add(lip);
});

// Contractor yard and telecom cabinets in the wider site context
const contractorYard=new THREE.Group();
const yardPad=box(16,0.05,10.5,MX.asphaltDark,73,-0.02,-26);
nextPassContext.add(yardPad);
for(let i=0;i<3;i++){
  const cont=box(5.4,1.1,2.6,i%2?MX.container:MX.containerAlt,67+i*5.8,0.56,-29.4+(i%2?1.3:-1.2));
  contractorYard.add(cont);
}
for(let i=0;i<4;i++){
  const barrier=makeJerseyBarrier(1.8,MX.concreteDark); barrier.position.set(65+i*2.1,0,-21.1+(i%2?0.18:-0.14)); contractorYard.add(barrier);
}
for(let i=0;i<3;i++){
  const spool=new THREE.Mesh(new THREE.CylinderGeometry(0.72,0.72,0.66,18),M.pallet);
  spool.position.set(69+i*2.4,0.34,-24.2+(i%2?0.6:-0.4)); spool.rotation.z=Math.PI/2; spool.castShadow=true; spool.receiveShadow=true; contractorYard.add(spool);
}
const yardFence=makeChainLinkFenceSegment(15.5,2.0); yardFence.position.set(73,0,-31.6); contractorYard.add(yardFence);
nextPassContext.add(contractorYard);
const telA=makeTelecomCabinet(); telA.position.set(-48.4,0,-36.8); nextPassContext.add(telA);
const telB=makeTelecomCabinet(0.92,0.56,1.28); telB.position.set(45.8,0,15.6); telB.rotation.y=Math.PI/2; nextPassContext.add(telB);

// One dedicated bay-crossing forklift instead of static yard placement only
const bayForklift=makeForklift(0xe3a12f);
bayForklift.position.set(-3.4,0,-31.4);
bayForklift.rotation.y=Math.PI/2;
nextPassLogistics.add(bayForklift);
movers.push({mesh:bayForklift,type:'bayForklift',baseX:-3.4,baseZ:-31.4,speed:0.0017,range:1});

// Moving ambient vehicles
const roadCar1=makeCar(0xd9dcdf);
roadCar1.position.set(-60.8,0,-66);
roadCar1.rotation.y=-Math.PI/2;
siteGroups.logistics.add(roadCar1);
movers.push({mesh:roadCar1,type:'road',baseX:-60.8,baseZ:-66,speed:0.012,range:138});

const roadCar2=makeCar(0x4c545c);
roadCar2.position.set(-55.2,0,58);
roadCar2.rotation.y=Math.PI/2;
siteGroups.logistics.add(roadCar2);
movers.push({mesh:roadCar2,type:'roadBack',baseX:-55.2,baseZ:58,speed:0.010,range:138});

const yardTractor=makeTractor(0x62b7c9);
yardTractor.position.set(22,0,-56);
yardTractor.rotation.y=Math.PI;
siteGroups.logistics.add(yardTractor);
movers.push({mesh:yardTractor,type:'yard',baseX:22,baseZ:-56,speed:0.006,range:18});

// PASS 46 — easy partial-to-implemented conversion layer
const pass46Shell=new THREE.Group();
const pass46Logistics=new THREE.Group();
const pass46Ground=new THREE.Group();
const pass46Context=new THREE.Group();
const pass46Landscape=new THREE.Group();
siteGroups.shell.add(pass46Shell);
siteGroups.logistics.add(pass46Logistics);
siteGroups.ground.add(pass46Ground);
siteGroups.context.add(pass46Context);
siteGroups.landscape.add(pass46Landscape);

const oldWoodMat=mat({color:0x8b6949,roughness:0.98,metalness:0});
const newWoodMat=mat({color:0xb8895d,roughness:0.94,metalness:0.01});

function makeHandCart(color=0x98a0a6){
  const g=new THREE.Group();
  const base=box(0.52,0.05,0.72,MX.dockSteel,0,0.14,0);
  const axle=box(0.46,0.04,0.06,MX.dockSteel,0,0.08,0.28);
  const handleL=udCylinderBetween(new THREE.Vector3(-0.18,0.16,-0.28),new THREE.Vector3(-0.06,1.08,-0.04),0.03,MX.dockSteel);
  const handleR=udCylinderBetween(new THREE.Vector3(0.18,0.16,-0.28),new THREE.Vector3(0.06,1.08,-0.04),0.03,MX.dockSteel);
  const grip=box(0.34,0.05,0.05,MX.dockSteel,0,1.08,-0.04);
  const toe=box(0.50,0.05,0.18,mat({color:color,roughness:0.7,metalness:0.18}),0,0.05,0.36);
  const wheelL=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.06,16),UDM.offBlack); wheelL.position.set(-0.2,0.1,0.26); wheelL.rotation.z=Math.PI/2;
  const wheelR=wheelL.clone(); wheelR.position.x=0.2;
  [base,axle,handleL,handleR,grip,toe,wheelL,wheelR].forEach(o=>{ if(o.isMesh){ o.castShadow=true; o.receiveShadow=true; } g.add(o); });
  return g;
}

function makeDrum(color=0x4c6c79){
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.52,14),mat({color:color,roughness:0.58,metalness:0.2}));
  body.position.y=0.26; body.castShadow=true; body.receiveShadow=true; g.add(body);
  const ringA=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.018,6,16),MX.dockSteel); ringA.rotation.x=Math.PI/2; ringA.position.y=0.14; g.add(ringA);
  const ringB=ringA.clone(); ringB.position.y=0.38; g.add(ringB);
  return g;
}

function makeIBCTote(){
  const g=new THREE.Group();
  g.add(box(0.92,0.1,0.92,MX.pallet,0,0.05,0));
  const cage=box(0.78,0.78,0.78,MX.fenceGalv,0,0.49,0);
  const tank=box(0.68,0.68,0.68,MX.window,0,0.48,0);
  g.add(cage,tank);
  return g;
}

function makeGaylord(){
  const g=new THREE.Group();
  g.add(box(0.92,0.1,0.92,oldWoodMat,0,0.05,0));
  g.add(box(0.8,0.72,0.8,UDM.cardboard,0,0.46,0));
  return g;
}

function makeMiniServiceShed(w=3.2,d=4.2,h=2.55){
  const g=new THREE.Group();
  const body=box(w,h,d,MX.warehouseWall,0,h/2,0);
  const roof=box(w+0.28,0.18,d+0.34,MX.roofDark,0,h+0.09,0);
  const door=box(0.88,1.92,0.08,MX.officeTrim,-w/2+0.58,0.96,d/2+0.05);
  const frameT=box(1.02,0.08,0.08,MX.warehouseTrim,-w/2+0.58,1.96,d/2+0.08);
  const frameL=box(0.08,1.96,0.08,MX.warehouseTrim,-w/2+0.11,0.98,d/2+0.08);
  const frameR=frameL.clone(); frameR.position.x=-w/2+1.05;
  const louver=makeLouverBox(0.9,0.46,0.16,4); louver.position.set(w/2-0.7,1.9,d/2+0.08);
  const pad=box(w+0.8,0.08,d+0.8,MX.concreteDark,0,0.04,0);
  [pad,body,roof,door,frameT,frameL,frameR,louver].forEach(o=>g.add(o));
  return g;
}

function makeHeroTree(scale=1.22){
  const t=makeTree(scale);
  const extras=[
    [0.62,3.34,-0.22,0.52],[-0.66,3.12,0.26,0.48],[0.22,3.52,0.48,0.44],[-0.18,2.96,-0.68,0.38]
  ];
  const mats=[MX.treeLeaf,MX.leafOlive,MX.shrub,MX.grassAlt];
  extras.forEach(([x,y,z,s],i)=>{
    const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(s*scale,1),mats[i%mats.length]);
    leaf.position.set(x*scale,y*scale,z*scale);
    leaf.rotation.set(Math.random()*0.7,Math.random()*Math.PI,Math.random()*0.7);
    leaf.castShadow=true; leaf.receiveShadow=true;
    t.add(leaf);
  });
  t.userData.swayAmp=0.018+Math.random()*0.02;
  return t;
}

function makeStyledPallet(aged=false,messy=false,boxMat=M.box,wrapMat=M.wrap){
  const g=makeFloorPallet(boxMat,wrapMat);
  g.traverse(o=>{
    if(o.isMesh && o.material===M.pallet) o.material=aged?oldWoodMat:newWoodMat;
  });
  if(messy){
    g.rotation.y=(Math.random()-0.5)*0.45;
    g.children.forEach((ch,idx)=>{
      if(idx>0 && ch.isMesh && ch.geometry && ch.geometry.type==='BoxGeometry'){
        ch.position.x += (Math.random()-0.5)*0.06;
        ch.position.z += (Math.random()-0.5)*0.06;
      }
    });
  }
  return g;
}

function addMountMark(x,y,z,w=1.0,h=0.42,ry=0){
  const mark=box(w,h,0.02,UDM.weatherSoft,x,y,z);
  mark.rotation.y=ry;
  pass46Shell.add(mark);
}

// Shell: deeper panel reveals, expansion joints, door frames, silhouette refinement, wall repairs/weathering
const revealXs=[];
for(let i=1;i<7;i++) revealXs.push(-SHELL_W/2+0.7+i*((SHELL_W-1.4)/7));
revealXs.forEach((x,idx)=>{
  const vf=box(0.06,SHELL_H-0.42,0.06,UDM.offBlack,x,SHELL_H/2+0.16,SHELL_D/2+0.12);
  const vr=box(0.06,SHELL_H-0.42,0.06,UDM.offBlack,x,SHELL_H/2+0.16,-SHELL_D/2-0.12);
  pass46Shell.add(vf,vr);
});
[2.52,5.08,7.62].forEach((y,idx)=>{
  const front=box(SHELL_W-1.1,0.04,0.03,idx===0?UDM.weather:UDM.weatherSoft,0,y,SHELL_D/2+0.12);
  const rear=box(SHELL_W-1.1,0.04,0.03,idx===0?UDM.weather:UDM.weatherSoft,0,y,-SHELL_D/2-0.12);
  pass46Shell.add(front,rear);
});
[
  [9.6,-25.08,Math.PI],[6.6,-25.06,Math.PI],[10.6,25.02,0]
].forEach(([x,z,ry])=>{
  const t=box(1.16,0.08,0.08,MX.warehouseTrim,x,2.24,z+(ry===0?0.09:-0.09));
  const b=box(1.16,0.05,0.12,MX.concreteDark,x,0.03,z+(ry===0?0.05:-0.05));
  const l=box(0.08,2.22,0.08,MX.warehouseTrim,x-0.56,1.11,z+(ry===0?0.09:-0.09));
  const r=box(0.08,2.22,0.08,MX.warehouseTrim,x+0.56,1.11,z+(ry===0?0.09:-0.09));
  pass46Shell.add(t,b,l,r);
});
for(let i=0;i<7;i++){
  const cap=box(2.4,0.14,0.24,MX.roofDark,-9.6+i*3.2,SHELL_H+0.48,-SHELL_D/2-0.18+(i%2?0.04:-0.02));
  pass46Shell.add(cap);
}
[-18,-6,7,18].forEach(z=>{
  const stainL=box(0.7,0.7,0.02,UDM.weatherSoft,-SHELL_W/2+0.18,0.38,z+0.08);
  const stainR=box(0.7,0.7,0.02,UDM.weatherSoft,SHELL_W/2-0.18,0.38,z+0.08);
  pass46Shell.add(stainL,stainR);
});
[
  [-6.4,5.7,SHELL_D/2+0.12,0], [4.4,4.3,SHELL_D/2+0.12,0], [8.8,3.4,-SHELL_D/2-0.12,Math.PI]
].forEach(([x,y,z,ry])=>{
  const patch=box(1.24,0.58,0.02,UDM.weatherSoft,x,y,z); patch.rotation.y=ry;
  const patch2=box(0.84,0.34,0.02,UDM.weather,x+0.24,y-0.72,z); patch2.rotation.y=ry;
  pass46Shell.add(patch,patch2);
});
addMountMark(-7.2,4.6,SHELL_D/2+0.12,1.1,0.46,0);
addMountMark(5.0,5.2,-SHELL_D/2-0.12,0.92,0.36,Math.PI);
addMountMark(8.2,3.6,-SHELL_D/2-0.12,0.62,0.28,Math.PI);
const shutoffArrow=box(0.18,0.18,0.02,MX.signWhite,9.46,2.46,-25.21); shutoffArrow.rotation.z=Math.PI/4; pass46Shell.add(shutoffArrow);
for(let i=0;i<3;i++){
  const line=box(0.42,0.02,0.01,MX.signWhite,9.0,2.56-i*0.08,-25.205);
  pass46Shell.add(line);
}

// Dock realism: shelter state variation, bumper wear, active-door cues
[-7,0,7].forEach((x,i)=>{
  const occShadow=box(1.9,2.8,0.02,UDM.offBlack,x,1.7,-25.19);
  occShadow.material.opacity=0.45; occShadow.material.transparent=true;
  const freightShadow=box(1.5,0.92,1.2,UDM.offBlack,x,0.46,-23.85);
  freightShadow.material.opacity=0.36; freightShadow.material.transparent=true;
  pass46Shell.add(occShadow,freightShadow);
});
dockXsMain.forEach((x,i)=>{
  const depth=0.18+(i%3===0?0.1:(i%2?0.04:0));
  const relax=box(1.86,2.18,depth,UDM.offBlack,x,1.44,-25.52-depth*0.28);
  relax.material.opacity=0.32; relax.material.transparent=true;
  pass46Shell.add(relax);
  const wearL=box(0.09,0.18,0.48,UDM.weatherSoft,x-1.31,0.36,-25.06);
  const wearR=wearL.clone(); wearR.position.x=x+1.31;
  pass46Shell.add(wearL,wearR);
});

// Ground: rutting, loading guides, mixed staging logic, seals, scuffs, puddles, parking fade, curb chips
for(let i=0;i<3;i++){
  const lane=box(11.4,0.01,0.24,UDM.fadedPaint,-5.7+i*5.7,-0.006,-39.2);
  lane.rotation.z=(i===1?0.0:0.01*(i-1));
  pass46Ground.add(lane);
}
for(let i=0;i<5;i++){
  const guide=box(0.14,0.01,5.2,UDM.fadedPaint,dockXsMain[i],-0.006,-36.6);
  pass46Ground.add(guide);
}
[-9,-2,4].forEach((x,i)=>{
  const rut=box(8.0,0.01,1.0,UDM.weatherSoft,x,-0.008,-43.5+i*1.8);
  pass46Ground.add(rut);
});
for(let i=0;i<8;i++){
  const seam=box(0.05,0.005,8.4,UDM.offBlack,-11.8+i*3.4,-0.004,-27.8);
  seam.material.opacity=0.28; seam.material.transparent=true;
  pass46Ground.add(seam);
}
dockXsMain.forEach((x,i)=>{
  const scuff=box(1.7,0.008,0.62,UDM.weatherSoft,x,-0.007,-24.4);
  scuff.rotation.y=(i%2?0.08:-0.06);
  const drainStain=box(1.05,0.008,1.05,UDM.weatherSoft,x,-0.007,-29.2);
  const puddle=box(1.4,0.006,1.0,MX.puddle,x+(i%2?0.4:-0.3),-0.009,-42.8+i*0.4);
  puddle.material.opacity=0.52;
  pass46Ground.add(scuff,drainStain,puddle);
});
for(let i=0;i<6;i++){
  const stall=box(0.14,0.008,2.5,UDM.fadedPaint,-12.8+i*3.5,-0.006,-45.0);
  stall.material.opacity=0.34;
  pass46Ground.add(stall);
}
for(let i=0;i<7;i++){
  const chip=box(0.34+Math.random()*0.18,0.03,0.14,MX.concreteDark,-19+i*4.2,0.03,-48.3+(i%2?0.06:-0.05));
  pass46Ground.add(chip);
}
for(let i=0;i<6;i++){
  const damp=box(3.2+Math.random()*1.2,0.006,1.0+Math.random()*0.6,UDM.weatherSoft,-14+i*5.4,-0.008,-22.2+(i%2?0.5:-0.35));
  pass46Ground.add(damp);
}

// Logistics clusters: hand carts, outbound lanes, inbound quarantine, mixed freight, messy pallets, trailer mix cues
[
  [-1.2,-27.6,0.2],[2.2,-27.1,-0.28],[7.9,-27.2,0.18]
].forEach(([x,z,r],i)=>{
  const cart=makeHandCart(i%2?0xe2a53b:0x97a1a8); cart.position.set(x,0,z); cart.rotation.y=Math.PI+r; pass46Logistics.add(cart);
});
for(let i=0;i<4;i++){
  const pal=makeStyledPallet(i%2===0,i%3===0,i%2?M.boxB:M.box,M.wrapB);
  pal.position.set(-8.4+i*1.35,0,-22.7+(i%2?0.26:-0.18));
  pal.scale.set(0.92+(i%2?0.04:0),1,0.92);
  pass46Logistics.add(pal);
}
for(let i=0;i<3;i++){
  const pal=makeStyledPallet(i===0, i===1, M.boxC, i===2?M.wrap:M.wrapB);
  pal.position.set(1.8+i*1.25,0,-22.2+(i%2?0.34:-0.12));
  pal.rotation.y=(i-1)*0.12;
  pass46Logistics.add(pal);
}
const quarantineA=makeStyledPallet(true,false,M.boxC,M.wrapB); quarantineA.position.set(9.8,0,-22.9); pass46Logistics.add(quarantineA);
const quarantineB=makeStyledPallet(false,true,M.boxB,M.wrap); quarantineB.position.set(11.1,0,-22.2); quarantineB.rotation.y=0.18; pass46Logistics.add(quarantineB);
for(let i=0;i<4;i++){
  const cone=makeCone(); cone.position.set(10.0+(i<2?-1:1)*0.95,0,-22.8+(i%2?0.7:-0.7)); pass46Logistics.add(cone);
}
const mixedZone=new THREE.Group();
for(let i=0;i<2;i++){
  const drum=makeDrum(0x427a86); drum.position.set(-0.6+i*0.48,0,0.2+(i%2?0.18:-0.18)); mixedZone.add(drum);
}
const ibc=makeIBCTote(); ibc.position.set(0.95,0,0.28); mixedZone.add(ibc);
const carton=makeGaylord(); carton.position.set(1.9,0,0); mixedZone.add(carton);
const mixedPal=makeStyledPallet(true,true,M.boxB,M.wrapB); mixedPal.position.set(-1.1,0,-0.6); mixedZone.add(mixedPal);
mixedZone.position.set(3.9,0,-22.5); pass46Logistics.add(mixedZone);

// Detached trailer/readability pass for height, alignment, branding, cab variety
[
  {x:-12.4,z:-51.4,h:0.96,ry:Math.PI/2-0.03,brand:UDM.signBlue},
  {x:-22.1,z:-49.2,h:1.03,ry:Math.PI/2+0.06,brand:null},
  {x:35.2,z:-50.6,h:0.99,ry:Math.PI/2-0.04,brand:MX.signRed}
].forEach((cfg,i)=>{
  const tr=makeTrailer(7.2,2.45,2.84,i%2===0);
  tr.position.set(cfg.x,0,cfg.z);
  tr.rotation.y=cfg.ry;
  tr.scale.y=cfg.h;
  if(cfg.brand){
    const stripe=box(0.12,0.28,4.8,cfg.brand,0,1.8,0.98); tr.add(stripe);
    const stripe2=stripe.clone(); stripe2.position.z=-0.98; tr.add(stripe2);
  }
  pass46Logistics.add(tr);
});
[
  [14.5,-50.6,0x8ec05a],[28.4,-50.0,0xb45c3c],[20.0,-49.5,0x60768e]
].forEach(([x,z,c])=>{
  const cab=makeTractor(c); cab.position.set(x,0,z); cab.rotation.y=Math.PI/2+(x>20?0.03:-0.02); pass46Logistics.add(cab);
});

// Context: service sheds, no-trespassing signs, truck-route signs, more layering masses
const shedA=makeMiniServiceShed(); shedA.position.set(58.5,0,34.5); shedA.rotation.y=-Math.PI/2; pass46Context.add(shedA);
const shedB=makeMiniServiceShed(2.9,3.8,2.35); shedB.position.set(-70.5,0,32.0); shedB.rotation.y=Math.PI/2; pass46Context.add(shedB);
/* for(let i=0;i<3;i++){
  const mass=makeWarehouseMass(5.4,7.0,3.4,0); mass.position.set(74+i*6.4,0,48+i*2.4); mass.scale.set(0.62,0.56,0.58); pass46Context.add(mass);
}
 */[
  [-83.8,0,21.8,Math.PI/2],[58.2,0,-4.8,0]
].forEach(([x,y,z,ry])=>{
  const sign=makeUDTrafficSign('NOTICE'); sign.position.set(x,y,z); sign.rotation.y=ry; pass46Context.add(sign);
  const stripe=box(0.48,0.08,0.02,MX.signRed,x,2.18,z+(ry===0?-0.04:0.04)); pass46Context.add(stripe);
});
[
  [-62.4,0,-56.5,-Math.PI/2],[46.5,0,18.8,Math.PI/2]
].forEach(([x,y,z,ry])=>{
  const sign=makeUDTrafficSign('TRUCK'); sign.position.set(x,y,z); sign.rotation.y=ry; pass46Context.add(sign);
});

// Landscape: fuller / more irregular canopies, denser frontage trees, hedges, patchy grass, soil rings, shrub tremble
[
  [-12.8,0,28.8],[ -6.9,0,29.6],[0.8,0,28.7],[8.4,0,29.4],[15.0,0,28.9]
].forEach(([x,y,z],i)=>{
  const t=i%2===0?makeHeroTree(1.16+Math.random()*0.18):makeConifer(1.28+Math.random()*0.18);
  t.position.set(x,y,z+(i%2?0.35:-0.25));
  pass46Landscape.add(t);
  swayingTrees.push(t);
  const ring=box(2.2,0.02,2.2,UDM.mulchDark,x,0.01,z); pass46Landscape.add(ring);
});
for(let i=0;i<14;i++){
  const h=makeShrub(0.74+Math.random()*0.14); h.position.set(-15.5+i*2.25,0,24.1+(Math.random()*0.24-0.12));
  h.userData.swayPhase=Math.random()*Math.PI*2; h.userData.swayAmp=0.012+Math.random()*0.01;
  pass46Landscape.add(h); swayingShrubs.push(h);
}
for(let i=0;i<12;i++){
  const patch=box(2.0+Math.random()*1.5,0.01,1.4+Math.random()*1.2,i%3===0?UDM.weatherSoft:UDM.mulchDark,-18+i*3.9,-0.01,20.6+(Math.random()*8.6));
  patch.material.opacity=i%3===0?0.18:0.24; patch.material.transparent=true; pass46Ground.add(patch);
}
for(let i=0;i<8;i++){
  const soil=box(1.5+Math.random()*0.9,0.01,1.3+Math.random()*0.8,UDM.mulchDark,-47+i*11.5,-0.01,34.2+(Math.random()*2.2-1.1));
  soil.material.opacity=0.26; soil.material.transparent=true; pass46Ground.add(soil);
}
for(let i=0;i<12;i++){
  const shrub=makeShrub(0.66+Math.random()*0.18); shrub.position.set(-42+i*3.2,0,37.2+(Math.random()*1.2-0.6));
  shrub.userData.swayPhase=Math.random()*Math.PI*2; shrub.userData.swayAmp=0.012+Math.random()*0.012;
  pass46Landscape.add(shrub); swayingShrubs.push(shrub);
}
for(let i=0;i<6;i++){
  const t=makeHeroTree(0.96+Math.random()*0.14); t.position.set(22+i*6.5,0,-60+Math.random()*6); pass46Landscape.add(t); swayingTrees.push(t);
}


// PASS V5 — broad refinement pass across shell, camera-read, lighting-read, context, logistics, and landscape
const passV5Shell=new THREE.Group();
const passV5Ground=new THREE.Group();
const passV5Logistics=new THREE.Group();
const passV5Context=new THREE.Group();
const passV5Landscape=new THREE.Group();
siteGroups.shell.add(passV5Shell);
siteGroups.ground.add(passV5Ground);
siteGroups.logistics.add(passV5Logistics);
siteGroups.context.add(passV5Context);
siteGroups.landscape.add(passV5Landscape);

const V5={
  leafCool:mat({color:0x4e6449,roughness:1,metalness:0}),
  leafWarm:mat({color:0x6c7951,roughness:1,metalness:0}),
  leafDust:mat({color:0x5a654c,roughness:1,metalness:0}),
  shrubDust:mat({color:0x42533d,roughness:1,metalness:0}),
  barkLight:mat({color:0x665242,roughness:1,metalness:0}),
  semiGlossWall:mat({color:0xb2b0ab,roughness:0.72,metalness:0.03,transparent:true,opacity:0.16}),
  stainDeep:mat({color:0x565b5f,roughness:1,metalness:0,transparent:true,opacity:0.28}),
  roadDust:mat({color:0x8b8d87,roughness:1,metalness:0,transparent:true,opacity:0.16}),
  grassDry:mat({color:0x5a5f42,roughness:1,metalness:0}),
  grassLush:mat({color:0x466246,roughness:1,metalness:0}),
};

function makeWorkerSilhouette(scale=1){
  const g=new THREE.Group();
  const legL=box(0.05*scale,0.28*scale,0.05*scale,UDM.offBlack,-0.05*scale,0.14*scale,0);
  const legR=box(0.05*scale,0.28*scale,0.05*scale,UDM.offBlack,0.05*scale,0.14*scale,0);
  const body=box(0.15*scale,0.30*scale,0.08*scale,UDM.offBlack,0,0.42*scale,0);
  const head=new THREE.Mesh(new THREE.SphereGeometry(0.08*scale,8,8),UDM.offBlack); head.position.set(0,0.64*scale,0);
  const armL=udCylinderBetween(new THREE.Vector3(-0.09*scale,0.52*scale,0),new THREE.Vector3(-0.16*scale,0.28*scale,0),0.02*scale,UDM.offBlack);
  const armR=udCylinderBetween(new THREE.Vector3(0.09*scale,0.52*scale,0),new THREE.Vector3(0.18*scale,0.34*scale,0),0.02*scale,UDM.offBlack);
  g.add(legL,legR,body,head,armL,armR);
  return g;
}
function makeReachTruck(color=0xb58d28){
  const g=makeForklift(color);
  const mast=box(0.14,2.8,0.14,MX.dockSteel,0.42,1.55,0.08);
  const mast2=box(0.12,2.6,0.12,MX.dockSteel,0.58,1.46,0.08);
  const reach=box(0.46,0.08,0.08,MX.dockSteel,0.82,1.24,0.08);
  const guard=box(0.46,0.10,0.56,MX.fenceGalv,-0.18,1.36,-0.02);
  g.add(mast,mast2,reach,guard);
  return g;
}
function makeTreeVariant(scale=1,family=0){
  const base=(family%4===3)?makeConifer(scale*(0.95+Math.random()*0.22)):makeTree(scale*(0.95+Math.random()*0.22));
  const lean=(Math.random()-0.5)*0.12;
  base.rotation.z+=lean;
  base.rotation.x+=(Math.random()-0.5)*0.03;
  base.traverse(o=>{
    if(!o.isMesh) return;
    if(o.material===MX.treeLeaf || o.material===MX.shrub || o.material===MX.leafOlive || o.material===MX.grassAlt || o.material===MX.leafDark){
      const mats=[V5.leafCool,V5.leafWarm,V5.leafDust,V5.shrubDust,MX.leafDark];
      o.material=mats[(family+Math.floor(Math.random()*3))%mats.length];
      o.scale.x*=1+(Math.random()-0.5)*0.18;
      o.scale.z*=1+(Math.random()-0.5)*0.22;
      o.position.x+=(Math.random()-0.5)*0.18*scale;
      o.position.z+=(Math.random()-0.5)*0.18*scale;
    }else if(o.material===MX.trunk){
      o.material=V5.barkLight;
    }
  });
  if(base.children.length>4 && family%4!==3){
    for(let i=0;i<2;i++){
      const over=new THREE.Mesh(new THREE.IcosahedronGeometry((0.34+Math.random()*0.16)*scale,1), i%2?V5.leafWarm:V5.leafCool);
      over.position.set((Math.random()-0.5)*0.8*scale,(2.9+Math.random()*0.8)*scale,(Math.random()-0.5)*0.9*scale);
      over.castShadow=true; over.receiveShadow=true;
      base.add(over);
    }
  }
  base.userData.swayAmp=0.012+Math.random()*0.018;
  return base;
}
function makeAltLightPole(h=8.8){
  const g=new THREE.Group();
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.1,h,12),MX.dockSteel);
  pole.position.y=h/2; pole.castShadow=true; pole.receiveShadow=true; g.add(pole);
  const arm=box(1.0,0.08,0.08,MX.dockSteel,0.42,h-0.5,0);
  const head=box(0.5,0.12,0.24,M.fixture,0.95,h-0.54,0);
  const glow=box(0.44,0.03,0.18,M.fixtureGlow,0.95,h-0.60,0);
  g.add(arm,head,glow);
  return g;
}
function addRoofClutter(target,x,y,z){
  const vent=box(0.52,0.12,0.52,MX.roofDark,x,y+0.18,z);
  const curb=box(0.72,0.04,0.72,MX.concreteDark,x,y+0.13,z);
  const unit=box(0.96,0.64,0.82,MX.dockSteel,x+1.2,y+0.48,z+0.4);
  const rail=box(2.2,0.08,0.08,MX.fenceGalv,x-0.2,y+0.36,z-0.9);
  target.add(curb,vent,unit,rail);
}

// Shell weathering / sheen / roof patching / closer-view resilience
for(let i=0;i<20;i++){
  const x=-10.2+Math.random()*20.4;
  const h=1.6+Math.random()*3.2;
  const streakF=box(0.08+Math.random()*0.14,h,0.02,V5.stainDeep,x,8.4-h*0.5,SHELL_D/2+0.146);
  const streakR=box(0.08+Math.random()*0.14,h,0.02,V5.stainDeep,x,8.5-h*0.5,-SHELL_D/2-0.146);
  passV5Shell.add(streakF,streakR);
}
for(let i=0;i<12;i++){
  const sheen=box(1.6+Math.random()*2.0,1.1+Math.random()*1.5,0.02,V5.semiGlossWall,-9+Math.random()*18,3.0+Math.random()*4.8,SHELL_D/2+0.135);
  passV5Shell.add(sheen);
}
for(let i=0;i<8;i++){
  const patch=box(1.6+Math.random()*2.8,0.02,2.1+Math.random()*3.4,MX.roofStain,-8+Math.random()*16,SHELL_H+0.13,-15+Math.random()*28);
  const seam=box(patch.geometry.parameters.width+0.18,0.01,0.06,MX.roofDark,patch.position.x,SHELL_H+0.14,patch.position.z-patch.geometry.parameters.depth/2);
  passV5Shell.add(patch,seam);
}
dockXsMain.forEach((x,i)=>{
  const underShade=box(2.6,0.008,1.4,V5.stainDeep,x,-0.008,-25.3); underShade.material.opacity=0.24;
  const rubberBendL=box(0.16,0.82,0.26,M.rubber,x-1.04,0.44,-24.92); rubberBendL.rotation.z=0.12*(i%2?1:-1);
  const rubberBendR=box(0.16,0.82,0.26,M.rubber,x+1.04,0.44,-24.92); rubberBendR.rotation.z=-0.12*(i%2?1:-1);
  passV5Shell.add(underShade,rubberBendL,rubberBendR);
});

// Ground wear / transitions / realism
for(let i=0;i<14;i++){
  const track=box(0.10+Math.random()*0.08,0.006,4.2+Math.random()*4.0,V5.stainDeep,-12+Math.random()*24,-0.008,-40+Math.random()*18);
  track.rotation.y=(Math.random()-0.5)*0.18; passV5Ground.add(track);
}
for(let i=0;i<10;i++){
  const reverseArc=box(0.12,0.006,4.6+Math.random()*3.0,UDM.offBlack,-10+i*2.2,-0.008,-34.6+Math.sin(i*0.6)*1.4);
  reverseArc.rotation.y=0.62+(i%2?0.06:-0.04); reverseArc.material.opacity=0.18; reverseArc.material.transparent=true; passV5Ground.add(reverseArc);
}
for(let i=0;i<6;i++){
  const cut=box(1.1+Math.random()*1.4,0.01,7.6+Math.random()*4.4,MX.asphaltDark,-56.4,-0.006,-48+i*18.5); cut.rotation.y=(Math.random()-0.5)*0.04; passV5Ground.add(cut);
}
for(let i=0;i<18;i++){
  const curbDust=box(1.4+Math.random()*2.8,0.006,0.6+Math.random()*0.4,V5.roadDust,-48+Math.random()*96,-0.008,-48.0+(Math.random()*0.5));
  passV5Ground.add(curbDust);
}
for(let i=0;i<8;i++){
  const splash=box(0.9+Math.random()*1.4,0.006,0.6+Math.random()*0.5,V5.stainDeep,-10+i*3.8,-0.008,-43.5+(i%2?0.9:-0.7)); splash.material.opacity=0.18; passV5Ground.add(splash);
}
for(let i=0;i<10;i++){
  const chip=box(0.12+Math.random()*0.12,0.025,0.22+Math.random()*0.14,MX.concreteDark,-46+i*11.2,0.03,-48.18+(i%2?0.03:-0.03)); passV5Ground.add(chip);
}
for(let i=0;i<6;i++){
  const wheelStop=box(0.95,0.16,0.24,MX.concreteDark,-13.2+i*3.4,0.08,-47.0); passV5Ground.add(wheelStop);
}
for(let i=0;i<6;i++){
  const walk=box(0.14,0.008,2.2,UDM.fadedPaint,-48.4+i*0.5,-0.006,-32.8); walk.rotation.y=-Math.PI/2+0.04*(i%2?1:-1); passV5Ground.add(walk);
}
const roadTransition=box(23,0.01,2.6,MX.asphaltDark,-50.2,-0.007,-41.4); passV5Ground.add(roadTransition);
const shoulderA=box(18,0.01,1.6,V5.roadDust,-70,-0.007,74.0); shoulderA.material.opacity=0.18; passV5Ground.add(shoulderA);
const shoulderB=box(18,0.01,1.6,V5.roadDust,-70,-0.007,-72.0); shoulderB.material.opacity=0.18; passV5Ground.add(shoulderB);
for(let i=0;i<20;i++){
  const breakup=box(1.0+Math.random()*2.0,0.006,0.6+Math.random()*1.2,i%3===0?V5.roadDust:V5.stainDeep,-18+Math.random()*36,-0.008,32+Math.random()*22); breakup.material.opacity=0.12+Math.random()*0.08; passV5Ground.add(breakup);
}

// Logistics / operational density
const reachTruck=makeReachTruck(0xa78425); reachTruck.position.set(6.8,0,-29.8); reachTruck.rotation.y=Math.PI*0.92; passV5Logistics.add(reachTruck);
const midCart=makeHandCart(0xc19f38); midCart.position.set(-6.6,0,-23.8); midCart.rotation.y=Math.PI+0.38; passV5Logistics.add(midCart);
for(let i=0;i<5;i++){
  const fresh=makeStyledPallet(i<2,false,i%2?M.box:M.boxC,M.wrap); fresh.position.set(-10.4+i*1.2,0,-23.4+(i%2?0.36:-0.22)); fresh.rotation.y=(i-2)*0.05; passV5Logistics.add(fresh);
}
for(let i=0;i<4;i++){
  const older=makeStyledPallet(true,i%2===0,M.boxB,i%2?M.wrapB:M.wrap); older.position.set(6.8+i*1.1,0,-22.4+(i%2?0.16:-0.22)); older.rotation.y=(Math.random()-0.5)*0.22; passV5Logistics.add(older);
}
const openShadow=box(2.4,0.008,4.6,V5.stainDeep,14.8,-0.008,-50.8); openShadow.material.opacity=0.18; passV5Logistics.add(openShadow);
for(let i=0;i<2;i++){
  const worker=makeWorkerSilhouette(0.42+Math.random()*0.04); worker.position.set(66.8+i*1.2,0,-25.4+(i?1.4:0)); worker.rotation.y=-Math.PI/2+0.12*i; passV5Context.add(worker);
}
const parkedVanA=makeUDServiceVan(0xe7e6e2); parkedVanA.position.set(-37.8,0,-46.0); parkedVanA.rotation.y=Math.PI/2; passV5Context.add(parkedVanA);
const parkedVanB=makeUDServiceVan(0xd9dad6); parkedVanB.position.set(43.8,0,17.8); parkedVanB.rotation.y=-Math.PI/2; passV5Context.add(parkedVanB);
[14.5,-50.6,28.4,-50.0,20.0,-49.5].forEach((v,idx,arr)=>{});
passV5Logistics.traverse(o=>{ if(o.isMesh){ o.castShadow=true; o.receiveShadow=true; } });

// Context / district layering / furniture / skyline
for(let i=0;i<4;i++){
  const pole=makeAltLightPole(7.4+Math.random()*1.6); pole.position.set(-49.6,0,-66+i*42); passV5Context.add(pole);
}
for(let i=0;i<5;i++){
  const sign=makeUDTrafficSign(i%2?'NOTICE':'TRUCK'); sign.position.set(-54.4+Math.random()*6,0,-58+i*29); sign.rotation.y=-Math.PI/2; passV5Context.add(sign);
}
for(let i=0;i<5;i++){
  const cabinet=makeTelecomCabinet(0.9+Math.random()*0.3,0.5+Math.random()*0.12,1.0+Math.random()*0.4); cabinet.position.set(-49.4+Math.random()*4,0,-54+i*24); passV5Context.add(cabinet);
}
for(let i=0;i<4;i++){
  const hydr=makeUDHydrant(); hydr.position.set(44+Math.random()*7,0,10+i*8); passV5Context.add(hydr);
}
for(let i=0;i<5;i++){
  const yardCont=box(4.8,1.0,2.4,i%2?MX.container:MX.containerAlt,76+i*4.9,0.52,-33+(i%2?1.1:-0.9)); passV5Context.add(yardCont);
}
/* for(let i=0;i<5;i++){
  const mass=makeWarehouseMass(10+Math.random()*7,14+Math.random()*8,4.2+Math.random()*1.8,1+Math.floor(Math.random()*2));
  mass.position.set(70+i*18,0,-94-Math.random()*10);
  passV5Context.add(mass);
  addRoofClutter(passV5Context,mass.position.x-1.2,(mass.position.y||0)+(4.8+Math.random()*1.2),mass.position.z+0.8);
} */
for(let i=0;i<4;i++){
  const skyline=box(16+Math.random()*12,10+Math.random()*10,8+Math.random()*10,hazeMassMat,88+i*28,5+Math.random()*3,-142-Math.random()*22); passV5Context.add(skyline);
}
const retaining=box(38,0.42,0.42,MX.concreteDark,66,0.21,-38.6); passV5Context.add(retaining);
for(let i=0;i<6;i++){
  const boll=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.9,12),MX.bollard); boll.position.set(50.5+i*0.8,0.45,18.9); boll.castShadow=true; boll.receiveShadow=true; passV5Context.add(boll);
}

// Landscape / species variation / tree lawns / edge hiding / road-front polish
for(let i=0;i<9;i++){
  const t=makeTreeVariant(1.0+Math.random()*0.34,i);
  t.position.set(-45+i*10.2,0,-74+(Math.random()*3-1.5));
  passV5Landscape.add(t); swayingTrees.push(t);
}
for(let i=0;i<8;i++){
  const t=makeTreeVariant(0.9+Math.random()*0.24,i+2);
  t.position.set(-44+i*11.0,0,-37.5+(Math.random()*2.2-1.1));
  passV5Landscape.add(t); swayingTrees.push(t);
  const bed=box(2.6+Math.random()*0.9,0.02,2.2+Math.random()*0.7,UDM.mulchDark,t.position.x,0.01,t.position.z); passV5Landscape.add(bed);
}
for(let i=0;i<16;i++){
  const tuft=makeGrassTuft(0.62+Math.random()*0.24); tuft.position.set(-46+i*5.6,0,-39+(Math.random()*5-2.5)); passV5Landscape.add(tuft);
}
for(let i=0;i<18;i++){
  const weed=i%4===0?makeGrassTuft(0.42+Math.random()*0.18):makeShrub(0.40+Math.random()*0.16); weed.position.set(-82+Math.random()*14,0,-76+Math.random()*152); if(weed.userData){ weed.userData.swayAmp=0.015+Math.random()*0.018; weed.userData.swayPhase=Math.random()*Math.PI*2; swayingShrubs.push(weed);} passV5Landscape.add(weed);
}
for(let i=0;i<14;i++){
  const hedge=makeShrub(0.62+Math.random()*0.14); hedge.position.set(-18+i*2.4,0,22.2+(Math.random()*0.2-0.1)); hedge.userData.swayPhase=Math.random()*Math.PI*2; hedge.userData.swayAmp=0.010+Math.random()*0.010; passV5Landscape.add(hedge); swayingShrubs.push(hedge);
}
for(let i=0;i<10;i++){
  const patch=box(3.4+Math.random()*2.2,0.01,2.0+Math.random()*1.8,i%2?V5.grassDry:V5.grassLush,-22+i*4.8,-0.01,16+Math.random()*14); patch.material.opacity=0.22; patch.material.transparent=true; passV5Ground.add(patch);
}
for(let i=0;i<7;i++){
  const over=makeTreeVariant(0.92+Math.random()*0.12,i+1); over.position.set(-86+Math.random()*12,0,-112+i*16); passV5Landscape.add(over); swayingTrees.push(over);
}
// Removed the five floating canopy blobs over the houses from the interior view.
// Keeping this intentionally disabled instead of repositioning, because these read as suspended tree crowns from the requested camera angle.
for(let i=0;i<0;i++){
  const upper=new THREE.Mesh(new THREE.IcosahedronGeometry(1.3+Math.random()*0.7,1), i%2?V5.leafWarm:V5.leafCool); upper.position.set(-62+i*7.6,11.5+Math.random()*2.2,52+Math.random()*8); upper.castShadow=true; upper.receiveShadow=true; passV5Landscape.add(upper);
}
const treeLawn=box(64,0.01,4.2,UDM.mulchDark,-6,0.0,-39.8); treeLawn.material.opacity=0.18; treeLawn.material.transparent=true; passV5Ground.add(treeLawn);

// PASS V6 — cleanup misplaced landscape, add taller background massing, and push more of the partials safely
const passV6Ground=new THREE.Group();
const passV6Context=new THREE.Group();
siteGroups.ground.add(passV6Ground);
siteGroups.context.add(passV6Context);

function inRectXZ(x,z,rect){ return x>=rect[0] && x<=rect[1] && z>=rect[2] && z<=rect[3]; }
function pruneLandscapeRects(root, rects){
  const removed=[];
  function visit(container){
    [...container.children].forEach(ch=>{
      const isPassContainer = ch.type==='Group' && ch.userData.swayAmp===undefined && Math.abs(ch.position.x)<0.001 && Math.abs(ch.position.z)<0.001 && ch.children && ch.children.length>8;
      if(isPassContainer){ visit(ch); return; }
      const x=ch.position.x||0, z=ch.position.z||0;
      if(rects.some(r=>inRectXZ(x,z,r))){
        container.remove(ch);
        removed.push(ch);
        return;
      }
    });
  }
  visit(root);
  if(removed.length){
    const removedSet=new Set(removed);
    for(let i=swayingTrees.length-1;i>=0;i--) if(removedSet.has(swayingTrees[i])) swayingTrees.splice(i,1);
    for(let i=swayingShrubs.length-1;i>=0;i--) if(removedSet.has(swayingShrubs[i])) swayingShrubs.splice(i,1);
  }
  return removed.length;
}

const misplacedLandscapeRects=[
  [-66.8,-48.0,-78,88],      // Horner Ave roadway + sidewalks: no trees on the road
  [-6,86,66,82],             // rear road / sidewalk strip behind the neighborhood row
  [31,61,54,84],             // marked northeast cluster box
  [28,76,-80,-44],           // wireframe site-bird box: remove the mixed trees/conifers inside the upper-right square
  [-86,-43,-70,-39],         // lower-left misplaced trees in dock-side / lot views
  [-31,42,-58,-20],          // dock court / apron: no trees between trailers and bays
  [-24,48,-95,-61],          // inside the foreground warehouse behind the KOLT shell
  [-29,-11,-25,25],          // left connected warehouse footprint
  [11,33,-25,25],            // right connected warehouse footprint
  [-11,11,-25,25],           // main shell footprint safety cleanup
  [-84,-62,16,78],           // remove the 5 floating tree-blob groups beside the houses on the left
  [33,94,-6,82]              // remove the right-side blob clusters near the replica warehouses / rear edge
];

pruneLandscapeRects(siteGroups.landscape, misplacedLandscapeRects);

function isVegetationMaterial(mat){
  return !!mat && (mat===MX.treeLeaf || mat===MX.shrub || mat===MX.leafOlive || mat===MX.grassAlt || mat===MX.leafDark || mat===MX.grass || mat===MX.hedge);
}
function looksVegetationNode(node){
  if(!node) return false;
  if(node.userData && (node.userData.veg || node.userData.kind==='tree' || node.userData.kind==='conifer' || node.userData.kind==='shrub' || node.userData.kind==='grass')) return true;
  let hit=false;
  node.traverse(o=>{
    if(hit) return;
    if(o.userData && (o.userData.veg || o.userData.kind==='tree' || o.userData.kind==='conifer' || o.userData.kind==='shrub' || o.userData.kind==='grass')){ hit=true; return; }
    const mats=Array.isArray(o.material)?o.material:[o.material];
    if(mats.some(isVegetationMaterial)) hit=true;
  });
  return hit;
}
function vegetationRoot(node, stopRoot){
  let cur=node;
  while(cur.parent && cur.parent!==stopRoot && cur.parent.children && cur.parent.children.length<=14 && looksVegetationNode(cur.parent)){
    cur=cur.parent;
  }
  return cur;
}
function pruneVegetationRectsEverywhere(rects){
  const removed=new Set();
  scene.updateMatrixWorld(true);
  const wp=new THREE.Vector3();
  const candidates=[];
  scene.traverse(obj=>{ if(obj && obj.parent) candidates.push(obj); });
  candidates.forEach(obj=>{
    if(!looksVegetationNode(obj)) return;
    const root=vegetationRoot(obj, scene);
    if(!root || !root.parent || removed.has(root)) return;
    root.getWorldPosition(wp);
    if(rects.some(r=>inRectXZ(wp.x,wp.z,r))) removed.add(root);
  });
  if(removed.size){
    removed.forEach(root=>{ if(root.parent) root.parent.remove(root); });
    for(let i=swayingTrees.length-1;i>=0;i--) if(removed.has(swayingTrees[i])) swayingTrees.splice(i,1);
    for(let i=swayingShrubs.length-1;i>=0;i--) if(removed.has(swayingShrubs[i])) swayingShrubs.splice(i,1);
  }
  return removed.size;
}
const preciseBlobCullRects=[
  [-90,-54,10,86],    // left floating blob zone beside houses
  [18,108,-22,96],    // right-side replica/rear-edge blob zones
  [28,76,-80,-44],    // site-bird red-square cleanup zone on the far-right / upper yard
  [-34,42,-60,-18],   // dock apron safety prune
  [-26,48,-97,-58]    // inside rear warehouse footprint safety prune
];
pruneVegetationRectsEverywhere(preciseBlobCullRects);

function makeSoftTower(w,d,h,color=0xaeb7be){
  const g=new THREE.Group();
  const bodyMat=mat({color,roughness:0.96,metalness:0.02,transparent:true,opacity:0.90});
  const capMat=mat({color:0x8d959c,roughness:1,metalness:0.02,transparent:true,opacity:0.88});
  const body=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bodyMat);
  body.position.y=h/2; body.castShadow=false; body.receiveShadow=false;
  const cap=new THREE.Mesh(new THREE.BoxGeometry(w*1.02,0.22,d*1.02),capMat);
  cap.position.y=h+0.11; cap.castShadow=false; cap.receiveShadow=false;
  g.add(body,cap);
  for(let i=1;i<Math.max(2,Math.floor(w/7));i++){
    const mull=new THREE.Mesh(new THREE.BoxGeometry(0.08,h*0.82,0.06),capMat);
    mull.position.set(-w/2+i*(w/Math.max(2,Math.floor(w/7))),h*0.42,d/2+0.04);
    mull.castShadow=false; mull.receiveShadow=false;
    g.add(mull);
  }
  return g;
}
[
  [-66,16,30,128,0xb6bec5],[-45,18,36,129,0xb2bbc3],[-21,17,28,127,0xb9c2c8],
  [6,20,38,130,0xaeb7be],[33,18,32,128,0xb4bcc4],[58,19,40,129,0xa9b2ba],[84,17,31,127,0xb6bec5]
].forEach(([x,w,h,z,color],i)=>{
  const tower=makeSoftTower(w,8.0+i*0.3,h,color);
  tower.position.set(x,0,z + (i%2?1.2:-0.8));
  tower.rotation.y=(i%2?0.02:-0.03);
  passV6Context.add(tower);
});

// Stronger lot boundaries / gate logic / ground read without overloading the file
const truckOnlyMark=box(16,0.01,1.0,MX.yellowMark,24,-0.006,-56.1); truckOnlyMark.rotation.y=Math.PI;
const truckOnlyMarkB=box(10,0.01,1.0,MX.yellowMark,-8,-0.006,-56.1); truckOnlyMarkB.rotation.y=Math.PI;
const crosswearA=box(7.4,0.008,0.28,UDM.weatherSoft,-57.9,-0.004,-18.8);
const crosswearB=box(7.0,0.008,0.28,UDM.weatherSoft,-57.9,-0.004,-21.3);
const mudTrackA=box(2.8,0.008,4.4,UDM.weatherSoft,-42.2,-0.006,-32.5); mudTrackA.rotation.y=0.14;
const mudTrackB=box(1.6,0.008,3.2,UDM.weatherSoft,-39.4,-0.006,-35.8); mudTrackB.rotation.y=-0.18;
passV6Ground.add(truckOnlyMark,truckOnlyMarkB,crosswearA,crosswearB,mudTrackA,mudTrackB);

for(let i=0;i<8;i++){
  const halo=box(0.44+Math.random()*0.12,0.008,0.44+Math.random()*0.12,UDM.weatherSoft,-18+i*6.2,-0.006,-25.4+(i%2?0.18:-0.06));
  halo.rotation.y=Math.random()*0.5;
  passV6Ground.add(halo);
}
for(let i=0;i<7;i++){
  const score=box(0.04,0.008,9.2,UDM.weatherSoft,-49.1+i*0.38,-0.005,-2+i*12);
  passV6Ground.add(score);
}
for(let i=0;i<6;i++){
  const settle=box(2.2+Math.random()*0.9,0.008,0.08,UDM.weatherSoft,-48.7,-0.005,-60+i*22.5);
  settle.rotation.y=(Math.random()-0.5)*0.06;
  passV6Ground.add(settle);
}

const gateTrack=box(18.2,0.04,0.16,MX.chassis,58,0.02,6);
const manGate=makeChainLinkFenceSegment(3.0,2.0); manGate.position.set(47.5,0,6.6); manGate.rotation.y=Math.PI/2;
const accessPedestal=box(0.22,1.1,0.22,MX.dockSteel,46.0,0.55,6.15);
const pedestalHead=box(0.34,0.36,0.18,MX.signWhite,46.0,1.28,6.15);
const gateLeaf=makeChainLinkFenceSegment(11.4,2.0); gateLeaf.position.set(55.0,0,6.05); gateLeaf.rotation.y=Math.PI/2;
passV6Context.add(gateTrack,manGate,accessPedestal,pedestalHead,gateLeaf);

function addTrailerBranding(root){
  const palette=[0x325f9c,0xa35c32,0x2f6d58,0x7f4ea8];
  let idx=0;
  root.traverse(obj=>{
    if(obj.userData && obj.userData.kind==='trailer' && idx<8){
      const body=obj.children && obj.children[0];
      const lenGuess=(body && body.geometry && body.geometry.parameters && body.geometry.parameters.width) || 7.2;
      const widthGuess=(body && body.geometry && body.geometry.parameters && body.geometry.parameters.depth) || 2.45;
      const color=palette[idx%palette.length];
      const stripeMat=mat({color,roughness:0.88,metalness:0.04});
      const logoMat=mat({color:0xf3f4f5,roughness:0.92,metalness:0.02});
      const stripe=box(lenGuess*0.46,0.16,0.04,stripeMat,-0.2,2.45,-widthGuess/2-0.045);
      const stripe2=box(lenGuess*0.32,0.12,0.04,stripeMat,0.9,2.15,-widthGuess/2-0.045);
      const logo=box(0.68,0.22,0.05,logoMat,1.8,2.46,-widthGuess/2-0.05);
      obj.add(stripe,stripe2,logo);
      idx++;
    }
  });
}
addTrailerBranding(siteMaster);

// Better framed far-left road edge and midground separation without bringing trees onto drive aisles
for(let i=0;i<5;i++){
  const cleanTree=makeConifer(0.92+Math.random()*0.22);
  cleanTree.position.set(-74.4+Math.random()*1.8,0,-54+i*18.5+Math.random()*3.0);
  passV6Context.add(cleanTree);
  swayingTrees.push(cleanTree);
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERIOR CONTENT GROUPS (animated)
// ─────────────────────────────────────────────────────────────────────────────

// ── Mode A: Blue/orange racking, boxes ──────────────────────────────────────
const modeAGroup=new THREE.Group();

// Rack rows — left side (x ~ -8)
const RACK_LEVELS=4;
const RACK_H=8.2;
const RACK_BAY_W=2.2;
const RACK_BAYS_PER_ROW=8;
const ROW_DEPTH=1.1;

function buildRackRow(x,z0,bays,levels,h,upMat,beamMat,palletVarFn){
  const rowG=new THREE.Group();
  for(let b=0;b<bays;b++){
    const bayG=makeRackBay(RACK_BAY_W,h,levels,upMat,beamMat);
    bayG.position.x=b*RACK_BAY_W;
    rowG.add(bayG);
    // Load pallets on each level
    for(let lv=0;lv<levels;lv++){
      const beamY=0.8+lv*(h/levels);
      if(palletVarFn){
        const pld=palletVarFn(b,lv);
        if(pld){
          pld.scale.setScalar(0.96);
          pld.position.set(b*RACK_BAY_W,beamY+0.07,-ROW_DEPTH/2);
          rowG.add(pld);
        }
      }
    }
  }
  const totalW=bays*RACK_BAY_W;
  rowG.position.set(x-totalW/2,0,z0);
  return rowG;
}

// Mode A — Left rack rows
const rackRowA1=buildRackRow(-8.5,-18,RACK_BAYS_PER_ROW,RACK_LEVELS,RACK_H,M.steel,M.steelOr,(b,lv)=>{
  if(Math.random()<0.85) return makePalletLoad(M.box,M.wrap,0);
  return null;
});
modeAGroup.add(rackRowA1);

// Mode A — Right rack rows
const rackRowA2=buildRackRow(8.5,-18,RACK_BAYS_PER_ROW,RACK_LEVELS,RACK_H,M.steel,M.steelOr,(b,lv)=>{
  if(Math.random()<0.80) return makePalletLoad(M.boxB,M.wrap,1);
  return null;
});
// Flip right row to face inward
rackRowA2.rotation.y=Math.PI;
rackRowA2.position.x=RACK_BAY_W*RACK_BAYS_PER_ROW/2-4;
modeAGroup.add(rackRowA2);

// Second rack row (behind first, left)
const rackRowA3=buildRackRow(-8.5,-18,RACK_BAYS_PER_ROW,RACK_LEVELS,RACK_H,M.steel,M.steelOr,(b,lv)=>{
  if(Math.random()<0.75) return makePalletLoad(M.boxC,M.wrap,0);
  return null;
});
rackRowA3.position.z=ROW_DEPTH+0.15;
modeAGroup.add(rackRowA3);

const rackRowA4=buildRackRow(8.5,-18,RACK_BAYS_PER_ROW,RACK_LEVELS,RACK_H,M.steel,M.steelOr,(b,lv)=>{
  if(Math.random()<0.82) return makePalletLoad(M.box,M.wrapB,0);
  return null;
});
rackRowA4.rotation.y=Math.PI;
rackRowA4.position.x=RACK_BAY_W*RACK_BAYS_PER_ROW/2-4;
rackRowA4.position.z=ROW_DEPTH+0.15;
modeAGroup.add(rackRowA4);

// Floor staging area — pallets on floor (mode A)
[
  [-4.5,0,-6],[0,0,-6],[4.5,0,-6],
  [-4.5,0,-10],[0,0,-10],[4.5,0,-10],
].forEach(([x,y,z])=>{
  const fp=makeFloorPallet(M.box,M.wrap);
  fp.position.set(x,0,z);modeAGroup.add(fp);
});

scene.add(modeAGroup);
modeAGroup.visible=false;

// ── Mode B: Green/orange racking, shrink-wrapped totes ────────────────────
const modeBGroup=new THREE.Group();

// Taller, fewer levels with bigger loads
const rackRowB1=buildRackRow(-8.5,-18,RACK_BAYS_PER_ROW,3,RACK_H,M.steelGr,M.steelOrB,(b,lv)=>{
  if(Math.random()<0.90) return makePalletLoad(M.boxC,M.wrapB,1);
  return null;
});
modeBGroup.add(rackRowB1);

const rackRowB2=buildRackRow(8.5,-18,RACK_BAYS_PER_ROW,3,RACK_H,M.steelGr,M.steelOrB,(b,lv)=>{
  if(Math.random()<0.88) return makePalletLoad(M.box,M.wrapB,1);
  return null;
});
rackRowB2.rotation.y=Math.PI;
rackRowB2.position.x=RACK_BAY_W*RACK_BAYS_PER_ROW/2-4;
modeBGroup.add(rackRowB2);

// Floor pallets in rows (mode B — more organized)
for(let row=0;row<3;row++){
  for(let col=0;col<5;col++){
    const fp=makePalletLoad(M.boxB,M.wrapB,1);
    fp.position.set(-5+col*2.4,0,-4-row*2.6);
    modeBGroup.add(fp);
  }
}

// Additional second back row of racks
const rackRowB3=buildRackRow(-8.5,-18,RACK_BAYS_PER_ROW,3,RACK_H,M.steelGr,M.steelOrB,(b,lv)=>{
  if(Math.random()<0.72) return makePalletLoad(M.box,M.wrap,0);
  return null;
});
rackRowB3.position.z=ROW_DEPTH+0.15;
modeBGroup.add(rackRowB3);

scene.add(modeBGroup);
modeBGroup.visible=false;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION STATE MACHINE
// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE (normalized 0–1, cycle = 18 seconds):
// 0.00–0.08  → empty, hold
// 0.08–0.22  → load mode A racking in (Y-rise from below)
// 0.22–0.38  → hold full A (mode A visible)
// 0.38–0.48  → clear mode A
// 0.48–0.56  → brief empty hold
// 0.56–0.68  → load mode B racking in
// 0.68–0.82  → hold full B
// 0.82–0.90  → clear mode B
// 0.90–1.00  → zoom out, empty, reset

const CYCLE=18000; // ms
const TP={
  aStart:0.08, aEnd:0.22,
  aHoldEnd:0.38, aClearEnd:0.48,
  emptyB:0.56, bEnd:0.68,
  bHoldEnd:0.82, bClearEnd:0.92,
};

let cycleT=0,lastTime=null,animPlaying=false,wireOn=false;
let currentPhase='empty';

const phEls={
  empty:    document.getElementById('ph-empty'),
  loading:  document.getElementById('ph-loading'),
  'full-a': document.getElementById('ph-full-a'),
  'full-b': document.getElementById('ph-full-b'),
  clearing: document.getElementById('ph-clearing'),
};

function setPhase(p){
  if(p===currentPhase) return;
  currentPhase=p;
  Object.entries(phEls).forEach(([k,el])=>el.classList.toggle('active',k===p));
  const nameEl=document.getElementById('callout-name');
  const subEl=document.getElementById('callout-sub');
  const labels={
    empty:'EMPTY WAREHOUSE — CLEAR-SPAN FLOOR',
    loading:'LOADING PALLET RACKING',
    'full-a':'STORAGE MODE A — BOXED GOODS',
    'full-b':'STORAGE MODE B — BULK TOTES',
    clearing:'CLEARING — PREPARING FOR HANDOVER',
  };
  const subs={
    empty:'22,000 SQ FT · 10M CLEAR HEIGHT · 5 DOCK DOORS',
    loading:'PALLET RACKING SYSTEM · BLUE/ORANGE · 4 LEVELS',
    'full-a':'SELECTIVE RACKING · CARDBOARD CASE STORAGE',
    'full-b':'GREEN RACK SYSTEM · SHRINK-WRAPPED TOTE STORAGE',
    clearing:'WAREHOUSE MANAGEMENT SYSTEM · INVENTORY CLEARED',
  };
  nameEl.textContent=labels[p]||'GTA INDUSTRIAL WAREHOUSE — INTERIOR';
  subEl.textContent=subs[p]||'GREATER TORONTO AREA · COMMERCIAL CLASS A';
  nameEl.classList.toggle('live',p!=='empty');
  subEl.classList.toggle('live',p!=='empty');
}

// Each content group has an "enter progress" (0=hidden below, 1=in place)
let progressA=0,progressB=0;
const BASE_Y=-15; // how far below floor groups start

function updateScene(t){
  // Determine phase
  let phase='empty';
  if(t>=TP.aStart && t<TP.aEnd) phase='loading';
  else if(t>=TP.aEnd && t<TP.aHoldEnd) phase='full-a';
  else if(t>=TP.aHoldEnd && t<TP.aClearEnd) phase='clearing';
  else if(t>=TP.emptyB && t<TP.bEnd) phase='loading';
  else if(t>=TP.bEnd && t<TP.bHoldEnd) phase='full-b';
  else if(t>=TP.bHoldEnd && t<TP.bClearEnd) phase='clearing';
  setPhase(phase);

  // Mode A progress
  if(t<TP.aStart) progressA=0;
  else if(t<TP.aEnd) progressA=eOut(ss(TP.aStart,TP.aEnd,t));
  else if(t<TP.aHoldEnd) progressA=1;
  else if(t<TP.aClearEnd) progressA=1-eOut(ss(TP.aHoldEnd,TP.aClearEnd,t));
  else progressA=0;

  // Mode B progress
  if(t<TP.emptyB) progressB=0;
  else if(t<TP.bEnd) progressB=eOut(ss(TP.emptyB,TP.bEnd,t));
  else if(t<TP.bHoldEnd) progressB=1;
  else if(t<TP.bClearEnd) progressB=1-eOut(ss(TP.bHoldEnd,TP.bClearEnd,t));
  else progressB=0;

  // Show/hide and Y-offset
  modeAGroup.visible=progressA>0.01;
  if(modeAGroup.visible) modeAGroup.position.y=lerp(BASE_Y,0,progressA);

  modeBGroup.visible=progressB>0.01;
  if(modeBGroup.visible) modeBGroup.position.y=lerp(BASE_Y,0,progressB);

  // Scale for drama
  if(modeAGroup.visible) modeAGroup.scale.y=lerp(0.1,1,Math.min(progressA*1.5,1));
  if(modeBGroup.visible) modeBGroup.scale.y=lerp(0.1,1,Math.min(progressB*1.5,1));

  document.getElementById('progress-fill').style.width=(t*100).toFixed(1)+'%';
}



// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE LISTING INTELLIGENCE + CONNECTIVITY HOTSPOTS
// ─────────────────────────────────────────────────────────────────────────────
const listingInfoKicker=document.getElementById('listing-info-kicker');
const listingInfoTitle=document.getElementById('listing-info-title');
const listingInfoSummary=document.getElementById('listing-info-summary');
const listingInfoGrid=document.getElementById('listing-info-grid');
const listingInfoRibbon=document.getElementById('listing-info-ribbon');
const roadConnectivityTip=document.getElementById('road-connectivity-tip');

const INFO_VIEW_MAP={hero:'street',parallax:'wide',silhouette:'street',prestige:'sitebird',resolve:'sitebird',wideinside:'wide'};
const ROAD_INFO_VIEWS=new Set(['street','sitebird','wide','overhead']);
let currentInfoView='inside';

const propertyInsights={
  inside:{
    kicker:'Interior Intelligence',
    title:'Interior operational readout',
    summary:'The interior view focuses on tenant fit, usable volume, utility readiness, and the day-one practicality of the space.',
    cards:[
      {title:'Power + Services',items:[['Electrical rating','4000A · 600V'],['Backup fibre','Dual-carrier capable'],['Gas reserve','2,500 MBH'],['Water / sanitary','Municipal metered']]},
      {title:'Spatial Fit',items:[['Usable floor area','183,240 SF'],['Clearance','36 FT clear'],['Column spacing','52 x 56 FT'],['Office allocation','2.8% fitted office']]},
      {title:'Building Systems',items:[['Sprinkler','ESFR'],['Lighting','LED · 32 FC avg'],['Floor slab','8 in reinforced'],['Heating','Radiant + unit heaters']]}
    ],
    ribbon:['Wide-bay racking ready','Food-grade style cleanability','Low office load ratio','Large-block inventory storage']
  },
  wide:{
    kicker:'Wide Shot Intelligence',
    title:'Asset overview + economics',
    summary:'This view frames the whole building, letting you read rent, operating profile, façade quality, and landlord-grade asset positioning.',
    cards:[
      {title:'Commercial Stack',items:[['Net asking rent','$18.95 / SF'],['TMI / op costs','$5.85 / SF'],['Estimated gross','$24.80 / SF'],['Annual escalation','3.0% modeled']]},
      {title:'Envelope + Finish',items:[['Construction','Precast concrete'],['Roof system','TPO over insulation'],['Dock weathering','Sealed + bumpers'],['Glazing','Low-E storefront']]},
      {title:'Occupancy Profile',items:[['Availability','Immediate'],['Demising option','2 units possible'],['Landlord work letter','Negotiable'],['Tenant profile','3PL / light manufacturing']]}
    ],
    ribbon:['Institutional-grade image','Multi-tenant capable','Broker-ready economics','Strong front-elevation read']
  },
  aisle:{
    kicker:'Aisle Intelligence',
    title:'Rack logic + throughput view',
    summary:'The aisle camera is where the user reads velocity, pallet strategy, turning width, and the mechanics of daily warehouse movement.',
    cards:[
      {title:'Rack Program',items:[['Pallet positions','6,480 est.'],['Rack depth','Selective double-row'],['Pick module','End-cap capable'],['VNA suitability','Future adaptable']]},
      {title:'Movement Geometry',items:[['Main aisle width','13.5 FT'],['Cross aisle width','16 FT'],['Forklift type','Reach / counterbalance'],['Turnback pockets','Every 5 bays']]},
      {title:'Load Tolerance',items:[['Floor load','6,000 PSI'],['Point load review','Heavy-stacking ready'],['Beam elevation','Optimized for 48x40'],['Damage control','Column guards planned']]}
    ],
    ribbon:['Fast-pick friendly','Forklift sightlines','Deep storage capacity','Operationally legible layout']
  },
  overhead:{
    kicker:'Overhead Intelligence',
    title:'Flow, court depth, and site logic',
    summary:'From above, the emphasis shifts to truck movement, car circulation, trailer storage, and how the full site actually operates.',
    cards:[
      {title:'Truck Court Metrics',items:[['Court depth','130 FT'],['Loading positions','24 dock-level doors'],['Drive-in doors','2 oversized'],['Apron surfacing','Heavy-duty concrete']]},
      {title:'Circulation',items:[['Trailer stalls','18 dedicated'],['Employee parking','126 stalls'],['Visitor parking','12 front stalls'],['Turning geometry','WB-67 friendly']]},
      {title:'Throughput Readiness',items:[['Daily truck capacity','78-96 turns'],['Peak staging','12 live loads'],['Security path','Perimeter monitored'],['Snow stacking','Rear edge reserved']]}
    ],
    ribbon:['Site plan clarity','Dock court efficiency','Fleet-routing ready','Ops meeting friendly view']
  },
  dock:{
    kicker:'Dock Intelligence',
    title:'Loading face + dispatch readout',
    summary:'The dock-side camera concentrates on shipping performance, dock equipment, and all of the details a logistics operator checks first.',
    cards:[
      {title:'Dock Equipment',items:[['Levelers','Hydraulic'],['Door size','9 x 10 FT'],['Dock seals','Full perimeter'],['Bumper package','Heavy-duty rubber']]},
      {title:'Dispatch KPIs',items:[['Avg. live load time','42 min modeled'],['Cross-dock ability','Yes'],['Staging lanes','8 marked lanes'],['Driver queuing','Structured curb-side']]},
      {title:'Exterior Utility',items:[['Canopy coverage','Partial'],['Bollard protection','Full at key points'],['Yard lighting','LED pole + wall'],['Drainage fall','Positive to trench']]}
    ],
    ribbon:['Dock-first decision support','Clear shipping story','Fewer blind spots','Strong operational credibility']
  },
  street:{
    kicker:'Location Intelligence',
    title:'Road frontage + connectivity data',
    summary:'The street-facing view becomes a location sell: frontage quality, commute logic, labour access, and the cost profile a tenant sees on paper.',
    cards:[
      {title:'Location + Access',items:[['Airport drive time','18 min'],['Highway 427','4 min'],['Highway 401','9 min'],['Intermodal access','22 min']]},
      {title:'Labour + Transit',items:[['Bus service','Within 4 min walk'],['Population in 30 min','1.8M+'],['Shift-friendly access','Strong'],['Food / service nodes','Nearby retail cluster']]},
      {title:'Cost Readout',items:[['Estimated monthly gross','$378,420'],['Utility allowance','$1.92 / SF'],['Insurance alloc.','$0.38 / SF'],['Parking ratio','0.75 / 1,000 SF']]}
    ],
    ribbon:['Frontage sells the asset','Commuter-friendly access','Fast broker talking points','Road-hover connectivity active']
  },
  sitebird:{
    kicker:'Strategic Intelligence',
    title:'Macro site, market, and future optionality',
    summary:'The site-bird view gives the investor lens: zoning, expansion capacity, market positioning, and what the site can become over time.',
    cards:[
      {title:'Planning + Zoning',items:[['Zoning','Employment industrial'],['Outside storage','Limited / controlled'],['Coverage ratio','Balanced for circulation'],['Expansion pad','Concept feasible']]},
      {title:'Market Position',items:[['Target users','3PL / wholesale / e-com'],['Competitive set','Class A infill'],['Lease velocity','Healthy modeled'],['Replacement cost spread','Favourable']]},
      {title:'Future Readiness',items:[['EV charging','Conduit-ready'],['Solar readiness','Roof reserve noted'],['Security layering','Gate + CCTV capable'],['Broker package depth','OM-ready data stack']]}
    ],
    ribbon:['Investor-friendly summary','Future retrofit logic','Market-story ready','Best for principal review']
  }
};

function normalizeInfoView(name){
  return propertyInsights[name] ? name : (INFO_VIEW_MAP[name] || 'inside');
}

function renderListingInfo(viewName){
  const key=normalizeInfoView(viewName);
  const data=propertyInsights[key] || propertyInsights.inside;
  currentInfoView=key;
  listingInfoKicker.textContent=data.kicker;
  listingInfoTitle.textContent=data.title;
  listingInfoSummary.textContent=data.summary;
  listingInfoGrid.innerHTML=data.cards.map(card=>`<section class="listing-info-card"><h4>${card.title}</h4>${card.items.map(([label,value])=>`<div class="metric-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</section>`).join('');
  listingInfoRibbon.innerHTML=data.ribbon.map(item=>`<span class="listing-chip">${item}</span>`).join('');
  if(typeof roadHotspotGroup!=='undefined') roadHotspotGroup.visible=ROAD_INFO_VIEWS.has(key);
}

const roadHotspots=[];
const roadHotspotGroup=new THREE.Group();
roadHotspotGroup.name='connectivityHotspots';
scene.add(roadHotspotGroup);

function addRoadHotspot(cfg){
  const mesh=new THREE.Mesh(
    new THREE.PlaneGeometry(cfg.size[0],cfg.size[1]),
    new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide})
  );
  mesh.rotation.x=-Math.PI/2;
  mesh.rotation.y=cfg.rotY||0;
  mesh.position.set(cfg.pos[0],cfg.pos[1]||0.16,cfg.pos[2]);
  mesh.userData.tip=cfg.tip;
  roadHotspotGroup.add(mesh);
  roadHotspots.push(mesh);
}

addRoadHotspot({
  pos:[-60.8,0.16,56],size:[9,36],
  tip:{kicker:'Road connectivity',title:'Northbound access lane',lines:['Pearson Airport · 18 min','Hwy 427 south / north · 4 min','Service retail cluster · 6 min']}
});
addRoadHotspot({
  pos:[-60.8,0.16,12],size:[9,34],
  tip:{kicker:'Road connectivity',title:'Primary commuter corridor',lines:['Hwy 401 east / west · 9 min','Highway 407 link · 14 min','Downtown Toronto · 28 min']}
});
addRoadHotspot({
  pos:[-60.8,0.16,-42],size:[9,40],
  tip:{kicker:'Road connectivity',title:'South logistics route',lines:['CN / CP intermodal · 22 min','Mississauga industrial ring · 16 min','Courier last-mile catchment · strong']}
});
addRoadHotspot({
  pos:[38,0.16,74],size:[80,10],
  tip:{kicker:'Road connectivity',title:'Rear service access',lines:['Trailer staging spillover · available','Secondary dispatch exit · low-conflict','Future fleet gate opportunity · reserved']}
});
roadHotspotGroup.visible=false;

const roadRaycaster=new THREE.Raycaster();
const roadPointer=new THREE.Vector2(-2,-2);
let roadPointerPx={x:0,y:0};

function hideRoadTip(){
  roadConnectivityTip.style.opacity='0';
  roadConnectivityTip.style.transform='translate(-999px,-999px)';
}
function showRoadTip(tip){
  if(!tip){ hideRoadTip(); return; }
  const x=Math.min(roadPointerPx.x+18,Math.max(24,W-300));
  const y=Math.min(roadPointerPx.y+18,Math.max(24,H-150));
  roadConnectivityTip.innerHTML=`<div class="tip-kicker">${tip.kicker}</div><div class="tip-title">${tip.title}</div>${tip.lines.map(line=>`<div class="tip-line">${line}</div>`).join('')}`;
  roadConnectivityTip.style.opacity='1';
  roadConnectivityTip.style.transform=`translate(${x}px,${y}px)`;
}

canvas.addEventListener('mousemove',e=>{
  roadPointer.x=(e.clientX/W)*2-1;
  roadPointer.y=-(e.clientY/H)*2+1;
  roadPointerPx={x:e.clientX,y:e.clientY};
});
canvas.addEventListener('mouseleave',()=>{
  roadPointer.set(-2,-2);
  hideRoadTip();
});
canvas.addEventListener('touchstart',()=>{
  roadPointer.set(-2,-2);
  hideRoadTip();
},{passive:true});


// ─────────────────────────────────────────────────────────────────────────────
// TOOLBAR / CAMERA PRESETS
// ─────────────────────────────────────────────────────────────────────────────
const views={
  inside:CAMERA_POSES.inside,
  wide:CAMERA_POSES.wide,
  wideinside:CAMERA_POSES.wideinside,
  aisle:CAMERA_POSES.aisle,
  overhead:CAMERA_POSES.overhead,
  dock:CAMERA_POSES.dock,
  street:CAMERA_POSES.street,
  sitebird:CAMERA_POSES.sitebird,
  hero:CAMERA_POSES.hero,
  parallax:CAMERA_POSES.parallax,
  silhouette:CAMERA_POSES.silhouette,
  prestige:CAMERA_POSES.resolve,
};

const shotSequence=[
  {view:'hero', dur:1880, hold:1320, label:'STREET-FRONT HERO', breath:0.20, zoomBreath:0.28},
  {view:'parallax', dur:1825, hold:980, label:'FAÇADE PARALLAX', breath:0.15, zoomBreath:0.18},
  {view:'dock', dur:1960, hold:960, label:'DOCK COURT', breath:0.14, zoomBreath:0.16},
  {view:'inside', dur:1760, hold:980, label:'INTERIOR', breath:0.10, zoomBreath:0.12},
  {view:'aisle', dur:1840, hold:900, label:'AISLE GLIDE', breath:0.08, zoomBreath:0.10},
  {view:'overhead', dur:1820, hold:860, label:'LOGISTICS OVERVIEW', breath:0.10, zoomBreath:0.14},
  {view:'street', dur:2220, hold:980, label:'HORNER AVE', breath:0.16, zoomBreath:0.16},
  {view:'sitebird', dur:2220, hold:1080, label:'SITE BIRD', breath:0.16, zoomBreath:0.18},
  {view:'silhouette', dur:2020, hold:940, label:'SILHOUETTE READ', breath:0.14, zoomBreath:0.16},
  {view:'prestige', dur:2640, hold:1520, label:'FINAL PRESTIGE SETTLE', breath:0.18, zoomBreath:0.28},
];
let shotIndex=-1, shotElapsed=0;

function goToView(name,dur=1100){
  const v=views[name];
  if(!v) return;
  const o=orbitFromPose(v.pos,v.target);
  setActiveView(name);
  animCam(o.rx,o.ry,o.dist,dur,null,v.target,v.fov||camFov);
}
function startShot(idx){
  const s=shotSequence[idx];
  const preset=s.view?views[s.view]:s;
  const o=orbitFromPose(preset.pos,preset.target);
  animCam(o.rx,o.ry,o.dist,s.dur,null,preset.target,preset.fov||camFov);
  if(s.view) setActiveView(s.view);
  const nameEl=document.getElementById('callout-name');
  const subEl=document.getElementById('callout-sub');
  nameEl.textContent=s.label;
  subEl.textContent='DIRECTED CINEMATIC AUTOPLAY · PREMIUM INDUSTRIAL PRESENTATION';
  nameEl.classList.add('live');
  subEl.classList.add('live');
}
function resetShotSequence(){
  shotIndex=-1; shotElapsed=0;
}
function updateShotSequence(dtMs){
  if(!animPlaying) return;
  if(shotIndex<0){
    shotIndex=0; shotElapsed=0; startShot(0); return;
  }
  shotElapsed+=dtMs;
  const s=shotSequence[shotIndex];
  if(shotElapsed>=s.dur+s.hold){
    shotIndex=(shotIndex+1)%shotSequence.length;
    shotElapsed=0;
    startShot(shotIndex);
  }
}

function setActiveView(name){
  document.querySelectorAll('#toolbar [data-view]').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.view===name);
  });
  renderListingInfo(name);
}

document.querySelectorAll('#toolbar [data-view]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(typeof gameActive!=='undefined' && gameActive) exitGame();
    resetShotSequence();
    goToView(btn.dataset.view,1000);
  });
});

const toolbar=document.getElementById('toolbar');
const toolbarMenuBtn=document.getElementById('toolbarMenuBtn');
const toolbarBackdrop=document.getElementById('toolbarBackdrop');
const rotatePrompt=document.getElementById('rotatePrompt');

function closeToolbarMenu(){
  toolbar.classList.remove('open');
  toolbarBackdrop.classList.remove('show');
  toolbarMenuBtn.setAttribute('aria-expanded','false');
}
function toggleToolbarMenu(){
  if(window.innerWidth > 900) return;
  const open=!toolbar.classList.contains('open');
  toolbar.classList.toggle('open',open);
  toolbarBackdrop.classList.toggle('show',open);
  toolbarMenuBtn.setAttribute('aria-expanded',open?'true':'false');
}
function updateMobileWarehouseUI(){
  const showRotate = window.matchMedia('(max-width:900px) and (orientation:portrait)').matches;
  rotatePrompt.classList.toggle('show',showRotate);

  if(window.innerWidth > 900){
    closeToolbarMenu();
  }
}

toolbarMenuBtn.addEventListener('click',toggleToolbarMenu);
toolbarBackdrop.addEventListener('click',closeToolbarMenu);

document.querySelectorAll('#toolbar button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(window.innerWidth <= 900) closeToolbarMenu();
  });
});

updateMobileWarehouseUI();
window.addEventListener('orientationchange',updateMobileWarehouseUI);

function setAnimate(on){
  animPlaying=on;
  const btn=document.getElementById('animateBtn');
  btn.classList.toggle('toggle-on',animPlaying);
  btn.textContent=animPlaying?'Stop':'Animate';
  if(animPlaying){ resetShotSequence(); goToView('hero',0); }
}


function setWireframe(on){
  wireOn=on;
  document.getElementById('wireBtn').classList.toggle('toggle-on',wireOn);
  allMats.forEach(m=>m.wireframe=wireOn);
}

let lookMode='day';
function setLookPreset(mode='day'){
  lookMode=mode;
  const golden=mode==='golden';
  const lookBtn=document.getElementById('lookBtn');
  if(lookBtn){
    lookBtn.classList.toggle('toggle-on',golden);
    lookBtn.textContent=golden?'Daylight':'Golden Hour';
  }
  scene.background=buildSkyTextureForPreset(golden?'golden':'day');
  scene.fog.color.setHex(golden?0xc9a183:0xc5d6e3);
  scene.fog.density=golden?0.0032:0.0027;
  renderer.toneMappingExposure=golden?1.22:1.34;
  hemiLight.color.setHex(golden?0xf6cfad:0xeaf4ff);
  hemiLight.groundColor.setHex(golden?0x8b6b55:0x7e8770);
  hemiLight.intensity=golden?0.78:0.95;
  sunLight.color.setHex(golden?0xffc07e:0xfff1d8);
  sunLight.intensity=golden?2.45:2.1;
  skyFill.color.setHex(golden?0xd28b67:0xa5c5ee);
  skyFill.intensity=golden?0.54:0.72;
  bounceLight.color.setHex(golden?0xf0b98c:0xe8d7bc);
  bounceLight.intensity=golden?0.62:0.42;
  dockFill.color.setHex(golden?0xffd7b7:0xcad7e4);
  dockFill.intensity=golden?8.0:10.0;
  warmAccent.color.setHex(golden?0xffaa56:0xffcb86);
  streetLightGlow.color.setHex(golden?0xffddb8:0xffedcf);
  if(bloomPass) bloomPass.strength=golden?0.22:0.18;
}

document.getElementById('animateBtn').addEventListener('click',()=>setAnimate(!animPlaying));
const lookBtnEl=document.getElementById('lookBtn');
if(lookBtnEl) lookBtnEl.addEventListener('click',()=>setLookPreset(lookMode==='day'?'golden':'day'));
document.getElementById('wireBtn').addEventListener('click',()=>setWireframe(!wireOn));
document.getElementById('resetBtn').addEventListener('click',()=>{
  if(typeof gameActive!=='undefined' && gameActive) exitGame();
  setAnimate(false);setWireframe(false);
  cycleT=0;updateScene(0);
  goToView('hero',900);
});

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIVE SITE TOGGLES
// ─────────────────────────────────────────────────────────────────────────────
function setGroupToggle(id,group,on){
  group.visible=on;
  document.getElementById(id).classList.toggle('toggle-on',on);
}
function bindGroupToggle(id,group){
  document.getElementById(id).addEventListener('click',()=>{
    setGroupToggle(id,group,!group.visible);
  });
}
bindGroupToggle('extShellBtn',siteGroups.shell);
bindGroupToggle('logisticsBtn',siteGroups.logistics);
bindGroupToggle('groundBtn',siteGroups.ground);
bindGroupToggle('contextBtn',siteGroups.context);
bindGroupToggle('landscapeBtn',siteGroups.landscape);

document.getElementById('resetBtn').addEventListener('click',()=>{
  setGroupToggle('extShellBtn',siteGroups.shell,true);
  setGroupToggle('logisticsBtn',siteGroups.logistics,true);
  setGroupToggle('groundBtn',siteGroups.ground,true);
  setGroupToggle('contextBtn',siteGroups.context,true);
  setGroupToggle('landscapeBtn',siteGroups.landscape,true);
});

// ─────────────────────────────────────────────────────────────────────────────
// ORBIT CONTROLS (manual)
// ─────────────────────────────────────────────────────────────────────────────
let dragging=false,lX=0,lY=0;
canvas.addEventListener('mousedown',e=>{dragging=true;lX=e.clientX;lY=e.clientY;camAnim=null;resetShotSequence();hideRoadTip();canvas.style.cursor='grabbing';});
window.addEventListener('mouseup',()=>{dragging=false;canvas.style.cursor='grab';});
window.addEventListener('mousemove',e=>{
  if((typeof gameActive!=='undefined' && gameActive)||!dragging) return;
  rotY+=(e.clientX-lX)*0.008;rotX+=(e.clientY-lY)*0.008;
  const lim=Math.PI/2-0.05;rotX=Math.max(-lim,Math.min(lim,rotX));
  lX=e.clientX;lY=e.clientY;applyCamera();
});
canvas.addEventListener('wheel',e=>{
  e.preventDefault();resetShotSequence();dist+=e.deltaY*0.012;dist=Math.max(8,Math.min(140,dist));applyCamera();
},{passive:false});
canvas.addEventListener('touchstart',e=>{if(e.touches.length===1){dragging=true;lX=e.touches[0].clientX;lY=e.touches[0].clientY;camAnim=null;resetShotSequence();}},{passive:true});
canvas.addEventListener('touchend',()=>{dragging=false;},{passive:true});
canvas.addEventListener('touchmove',e=>{
  if((typeof gameActive!=='undefined' && gameActive)||!dragging||e.touches.length!==1) return;
  rotY+=(e.touches[0].clientX-lX)*0.008;rotX+=(e.touches[0].clientY-lY)*0.008;
  const lim=Math.PI/2-0.05;rotX=Math.max(-lim,Math.min(lim,rotX));
  lX=e.touches[0].clientX;lY=e.touches[0].clientY;applyCamera();
},{passive:true});
canvas.style.cursor='grab';


// ─────────────────────────────────────────────────────────────────────────────
// PALLET STACK 3D — integrated into the warehouse scene
// ─────────────────────────────────────────────────────────────────────────────
const GAME={
  COLS:8,ROWS:9,CELL:1.02,DEPTH:0.78,
  BOARD_X:-4.3,BOARD_Z:4.4,BOARD_BASE_Y:0.72,
  ROUND_TIME:90,TARGET_LINES:10,
  NORMAL_DROP:0.78,FAST_DROP:0.08,
  CAMERA:{rotX:0.16,rotY:1.28,dist:16.8,target:{x:-4.3,y:4.85,z:4.4},fov:55}
};

const SHAPES=[
  {name:'I',color:'#7ad7ff',cells:[[-1,0],[0,0],[1,0],[2,0]]},
  {name:'O',color:'#ffd166',cells:[[0,0],[1,0],[0,1],[1,1]]},
  {name:'T',color:'#bb86ff',cells:[[-1,0],[0,0],[1,0],[0,1]]},
  {name:'L',color:'#ff9b54',cells:[[-1,0],[0,0],[1,0],[1,1]]},
  {name:'J',color:'#5fa8ff',cells:[[-1,1],[-1,0],[0,0],[1,0]]},
  {name:'S',color:'#6dff9a',cells:[[-1,0],[0,0],[0,1],[1,1]]},
  {name:'Z',color:'#ff6f91',cells:[[-1,1],[0,1],[0,0],[1,0]]}
];

let gameActive=false;
let gameRoundLive=false;
let gameBuilt=false;
let gameGroup=new THREE.Group();
let boardFrameGroup=new THREE.Group();
let boardCellsGroup=new THREE.Group();
let activePieceGroup=new THREE.Group();
let ghostPieceGroup=new THREE.Group();
let gantryGroup=new THREE.Group();
let craneCarriage=null,hookCable=null,hookHead=null;
scene.add(gameGroup);
gameGroup.visible=false;
gameGroup.add(boardFrameGroup,boardCellsGroup,ghostPieceGroup,activePieceGroup,gantryGroup);

let boardState=[];
let activePiece=null;
let nextPiece=null;
let gameScore=0;
let gameLines=0;
let gameLevel=1;
let gameTimer=GAME.ROUND_TIME;
let gameStatus='shift live. stack the empty bay clean.';
let dropAccumulator=0;
let softDrop=false;
let pulseTime=0;

function gameEmptyRow(){return Array.from({length:GAME.COLS},()=>null);}
function formatClock(s){
  const safe=Math.max(0,Math.ceil(s));
  const m=Math.floor(safe/60);
  const sec=String(safe%60).padStart(2,'0');
  return `${m}:${sec}`;
}
function gameWorldForCell(col,row,z=GAME.BOARD_Z){
  const width=GAME.COLS*GAME.CELL;
  const height=GAME.ROWS*GAME.CELL;
  const x=GAME.BOARD_X-width/2+GAME.CELL/2+col*GAME.CELL;
  const y=GAME.BOARD_BASE_Y+height-GAME.CELL/2-row*GAME.CELL;
  return new THREE.Vector3(x,y,z);
}
function rotateXY(x,y,times){
  let rx=x,ry=y;
  for(let i=0;i<times;i++){const nx=-ry,ny=rx;rx=nx;ry=ny;}
  return [rx,ry];
}
function gameCellsFor(piece,col=piece.col,row=piece.row,rot=piece.rot){
  return piece.cells.map(([x,y])=>{
    const[rX,rY]=rotateXY(x,y,rot);
    return{col:col+rX,row:row+rY};
  });
}
function gameRandomShape(){
  const base=SHAPES[Math.floor(Math.random()*SHAPES.length)];
  return{
    name:base.name,color:base.color,cells:base.cells.map(c=>[c[0],c[1]]),
    col:Math.floor(GAME.COLS/2),row:-1,rot:0
  };
}
function gameCollides(piece,dc=0,dr=0,dRot=0){
  const cells=gameCellsFor(piece,piece.col+dc,piece.row+dr,(piece.rot+dRot+4)%4);
  for(const cell of cells){
    if(cell.col<0||cell.col>=GAME.COLS) return true;
    if(cell.row>=GAME.ROWS) return true;
    if(cell.row>=0 && boardState[cell.row][cell.col]) return true;
  }
  return false;
}
function makePalletVoxel(color,ghost=false){
  const g=new THREE.Group();
  const wood=mat({color:0x8c6239,roughness:0.88,metalness:0.03,transparent:ghost,opacity:ghost?0.18:1});
  const cargo=mat({color:color,roughness:0.44,metalness:0.08,emissive:color,emissiveIntensity:ghost?0.08:0.22,transparent:ghost,opacity:ghost?0.14:1});
  const wrap=mat({color:0xffffff,roughness:0.2,metalness:0.02,transparent:true,opacity:ghost?0.05:0.12});
  const edgeMat=mat({color:0xf2f4f8,roughness:0.24,metalness:0.12,transparent:ghost,opacity:ghost?0.14:0.92});

  const base=new THREE.Mesh(new THREE.BoxGeometry(GAME.CELL*0.92,GAME.CELL*0.16,GAME.DEPTH*0.78),wood);
  base.position.y=-GAME.CELL*0.28;base.castShadow=!ghost;base.receiveShadow=true;
  g.add(base);

  const body=new THREE.Mesh(new THREE.BoxGeometry(GAME.CELL*0.8,GAME.CELL*0.62,GAME.DEPTH*0.64),cargo);
  body.position.y=0;base.castShadow=!ghost;body.castShadow=!ghost;body.receiveShadow=true;
  g.add(body);

  const wrapBox=new THREE.Mesh(new THREE.BoxGeometry(GAME.CELL*0.84,GAME.CELL*0.66,GAME.DEPTH*0.68),wrap);
  wrapBox.position.y=0;
  g.add(wrapBox);

  const tag=new THREE.Mesh(new THREE.BoxGeometry(GAME.CELL*0.2,GAME.CELL*0.12,0.04),edgeMat);
  tag.position.set(GAME.CELL*0.18,GAME.CELL*0.08,GAME.DEPTH*0.34);
  g.add(tag);
  return g;
}
function clearGroupChildren(group){
  while(group.children.length){
    const child=group.children.pop();
    group.remove(child);
  }
}
function buildGameBoard(){
  if(gameBuilt) return;
  gameBuilt=true;

  const width=GAME.COLS*GAME.CELL;
  const height=GAME.ROWS*GAME.CELL;

  const backplate=new THREE.Mesh(
    new THREE.BoxGeometry(width+0.6,height+0.7,0.16),
    mat({color:0x0f1622,roughness:0.42,metalness:0.16,transparent:true,opacity:0.72})
  );
  backplate.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height/2,GAME.BOARD_Z-0.36);
  backplate.receiveShadow=true;
  boardFrameGroup.add(backplate);

  const glowPanel=new THREE.Mesh(
    new THREE.BoxGeometry(width+0.2,height+0.2,0.03),
    mat({color:0x132437,roughness:0.2,metalness:0.1,transparent:true,opacity:0.22,emissive:0x17324d,emissiveIntensity:0.08})
  );
  glowPanel.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height/2,GAME.BOARD_Z-0.25);
  boardFrameGroup.add(glowPanel);

  const steelMat=mat({color:0x3b4756,roughness:0.5,metalness:0.74});
  const frameTop=new THREE.Mesh(new THREE.BoxGeometry(width+0.8,0.14,0.24),steelMat);
  frameTop.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height+0.36,GAME.BOARD_Z-0.24);
  boardFrameGroup.add(frameTop);
  const frameBottom=frameTop.clone();
  frameBottom.position.y=GAME.BOARD_BASE_Y-0.36;
  boardFrameGroup.add(frameBottom);
  const frameLeft=new THREE.Mesh(new THREE.BoxGeometry(0.14,height+0.86,0.24),steelMat);
  frameLeft.position.set(GAME.BOARD_X-width/2-0.34,GAME.BOARD_BASE_Y+height/2,GAME.BOARD_Z-0.24);
  boardFrameGroup.add(frameLeft);
  const frameRight=frameLeft.clone();
  frameRight.position.x=GAME.BOARD_X+width/2+0.34;
  boardFrameGroup.add(frameRight);

  for(let c=0;c<=GAME.COLS;c++){
    const line=new THREE.Mesh(new THREE.BoxGeometry(0.02,height,0.02),mat({color:0x32526a,roughness:0.36,metalness:0.52,transparent:true,opacity:0.45}));
    line.position.set(GAME.BOARD_X-width/2+c*GAME.CELL,GAME.BOARD_BASE_Y+height/2,GAME.BOARD_Z-0.12);
    boardFrameGroup.add(line);
  }
  for(let r=0;r<=GAME.ROWS;r++){
    const line=new THREE.Mesh(new THREE.BoxGeometry(width,0.02,0.02),mat({color:0x32526a,roughness:0.36,metalness:0.52,transparent:true,opacity:0.45}));
    line.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height-r*GAME.CELL,GAME.BOARD_Z-0.12);
    boardFrameGroup.add(line);
  }

  const bayPad=new THREE.Mesh(
    new THREE.BoxGeometry(width+2.8,0.08,3.2),
    mat({color:0x1f2b39,roughness:0.78,metalness:0.18})
  );
  bayPad.position.set(GAME.BOARD_X,0.04,GAME.BOARD_Z+0.65);
  bayPad.receiveShadow=true;
  gameGroup.add(bayPad);

  for(let i=0;i<5;i++){
    const stripe=new THREE.Mesh(
      new THREE.BoxGeometry(width+2.1,0.01,0.16),
      mat({color:0xf0e838,roughness:0.55,transparent:true,opacity:0.82})
    );
    stripe.position.set(GAME.BOARD_X,0.06,GAME.BOARD_Z-0.8+i*0.7);
    gameGroup.add(stripe);
  }

  const gantryRail=new THREE.Mesh(new THREE.BoxGeometry(width+4.6,0.16,0.22),steelMat);
  gantryRail.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height+1.2,GAME.BOARD_Z+0.08);
  gantryGroup.add(gantryRail);

  craneCarriage=new THREE.Mesh(new THREE.BoxGeometry(0.86,0.32,0.56),mat({color:0xcc3030,roughness:0.42,metalness:0.65}));
  craneCarriage.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height+1.2,GAME.BOARD_Z+0.08);
  gantryGroup.add(craneCarriage);

  hookCable=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,1,10),mat({color:0xd4dae2,roughness:0.4,metalness:0.88}));
  hookCable.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height+0.7,GAME.BOARD_Z+0.08);
  gantryGroup.add(hookCable);

  hookHead=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.05,8,18),mat({color:0xffd166,roughness:0.34,metalness:0.48,emissive:0xffd166,emissiveIntensity:0.08}));
  hookHead.rotation.x=Math.PI/2;
  hookHead.position.set(GAME.BOARD_X,GAME.BOARD_BASE_Y+height,GAME.BOARD_Z+0.08);
  gantryGroup.add(hookHead);
}
function rebuildLockedBoard(){
  clearGroupChildren(boardCellsGroup);
  for(let r=0;r<GAME.ROWS;r++){
    for(let c=0;c<GAME.COLS;c++){
      const cell=boardState[r][c];
      if(!cell) continue;
      const voxel=makePalletVoxel(cell.color,false);
      voxel.position.copy(gameWorldForCell(c,r));
      boardCellsGroup.add(voxel);
    }
  }
}
function getGhostRow(){
  if(!activePiece) return null;
  let test=activePiece.row;
  while(!gameCollides(activePiece,0,test-activePiece.row+1,0)) test+=1;
  return test;
}
function updateHook(){
  if(!activePiece){gantryGroup.visible=false;return;}
  gantryGroup.visible=true;
  const cells=gameCellsFor(activePiece);
  let minCol=Infinity,maxCol=-Infinity,minRow=Infinity;
  cells.forEach(c=>{minCol=Math.min(minCol,c.col);maxCol=Math.max(maxCol,c.col);minRow=Math.min(minRow,c.row);});
  const centerCol=(minCol+maxCol)/2;
  const targetWorld=gameWorldForCell(centerCol,Math.max(minRow,0));
  const topY=GAME.BOARD_BASE_Y+GAME.ROWS*GAME.CELL+1.2;
  craneCarriage.position.x=targetWorld.x;
  const hookY=Math.max(targetWorld.y+0.95,GAME.BOARD_BASE_Y+GAME.ROWS*GAME.CELL*0.55);
  const len=Math.max(0.8,topY-hookY);
  hookCable.position.set(targetWorld.x,topY-len/2,GAME.BOARD_Z+0.08);
  hookCable.scale.set(1,len,1);
  hookHead.position.set(targetWorld.x,hookY,GAME.BOARD_Z+0.08);
}
function renderActivePiece(){
  clearGroupChildren(activePieceGroup);
  clearGroupChildren(ghostPieceGroup);
  if(!activePiece) return;
  const ghostRow=getGhostRow();
  gameCellsFor(activePiece,activePiece.col,ghostRow,activePiece.rot).forEach(cell=>{
    if(cell.row<0) return;
    const voxel=makePalletVoxel(activePiece.color,true);
    voxel.position.copy(gameWorldForCell(cell.col,cell.row,GAME.BOARD_Z-0.02));
    ghostPieceGroup.add(voxel);
  });
  gameCellsFor(activePiece).forEach(cell=>{
    if(cell.row<0) return;
    const voxel=makePalletVoxel(activePiece.color,false);
    voxel.position.copy(gameWorldForCell(cell.col,cell.row));
    activePieceGroup.add(voxel);
  });
  updateHook();
}
function spawnPiece(){
  activePiece=nextPiece||gameRandomShape();
  activePiece.col=Math.floor(GAME.COLS/2);
  activePiece.row=-1;
  activePiece.rot=0;
  nextPiece=gameRandomShape();
  if(gameCollides(activePiece,0,0,0)){
    endGame(false,'Stack Locked');
    return false;
  }
  renderActivePiece();
  updateGameHud();
  return true;
}
function clearCompletedRows(){
  const rowsToClear=[];
  for(let r=0;r<GAME.ROWS;r++){
    if(boardState[r].every(Boolean)) rowsToClear.push(r);
  }
  if(!rowsToClear.length) return 0;
  boardState=boardState.filter((row,idx)=>!rowsToClear.includes(idx));
  while(boardState.length<GAME.ROWS) boardState.unshift(gameEmptyRow());
  return rowsToClear.length;
}
function addScoreForLines(cleared){
  const table={1:120,2:320,3:540,4:900};
  gameScore+=table[cleared]||0;
}
function lockActivePiece(){
  if(!activePiece) return;
  let toppedOut=false;
  gameCellsFor(activePiece).forEach(cell=>{
    if(cell.row<0){toppedOut=true;return;}
    boardState[cell.row][cell.col]={color:activePiece.color};
  });
  activePiece=null;
  const cleared=clearCompletedRows();
  if(cleared){
    gameLines+=cleared;
    addScoreForLines(cleared);
    gameStatus=cleared===4?'clean sweep. four lines cleared.':`clean drop. ${cleared} line${cleared>1?'s':''} cleared.`;
  }else{
    gameScore+=24;
    gameStatus='pallet locked. keep the stack clean.';
  }
  gameLevel=1+Math.floor(gameLines/3);
  rebuildLockedBoard();
  if(toppedOut){endGame(false,'Truck Window Missed');return;}
  if(gameLines>=GAME.TARGET_LINES){endGame(true,'Shift Complete');return;}
  spawnPiece();
}
function tryMove(dx,dy){
  if(!activePiece||!gameRoundLive) return false;
  if(gameCollides(activePiece,dx,dy,0)) return false;
  activePiece.col+=dx;activePiece.row+=dy;
  renderActivePiece();
  return true;
}
function tryRotate(dir=1){
  if(!activePiece||!gameRoundLive) return false;
  const kicks=[0,-1,1,-2,2];
  for(const kick of kicks){
    if(!gameCollides(activePiece,kick,0,dir)){
      activePiece.col+=kick;
      activePiece.rot=(activePiece.rot+dir+4)%4;
      renderActivePiece();
      return true;
    }
  }
  return false;
}
function softStep(){
  if(!activePiece||!gameRoundLive) return;
  if(!tryMove(0,1)) lockActivePiece();
}
function hardDrop(){
  if(!activePiece||!gameRoundLive) return;
  let cells=0;
  while(tryMove(0,1)) cells++;
  gameScore+=cells*4;
  lockActivePiece();
}
function startGameRound(){
  buildGameBoard();
  boardState=Array.from({length:GAME.ROWS},()=>gameEmptyRow());
  activePiece=null;
  nextPiece=gameRandomShape();
  gameScore=0;
  gameLines=0;
  gameLevel=1;
  gameTimer=GAME.ROUND_TIME;
  gameStatus='shift live. stack the empty bay clean.';
  dropAccumulator=0;
  softDrop=false;
  pulseTime=0;
  clearGroupChildren(boardCellsGroup);
  clearGroupChildren(activePieceGroup);
  clearGroupChildren(ghostPieceGroup);
  document.getElementById('game-end').classList.remove('visible');
  gameRoundLive=true;
  spawnPiece();
  rebuildLockedBoard();
  updateGameHud();
}
function updateGameHud(){
  document.getElementById('g-time').textContent=formatClock(gameTimer);
  document.getElementById('g-score').textContent=String(gameScore);
  document.getElementById('g-lines').textContent=`${gameLines} / ${GAME.TARGET_LINES}`;
  document.getElementById('g-next').textContent=nextPiece?nextPiece.name:'—';
  document.getElementById('g-status').innerHTML=`<strong>Status:</strong> ${gameStatus}`;
  const timeEl=document.getElementById('g-time');
  timeEl.classList.remove('warn','danger');
  if(gameTimer<=20) timeEl.classList.add('warn');
  if(gameTimer<=8) timeEl.classList.add('danger');
}
function endGame(won,title){
  gameRoundLive=false;
  activePiece=null;
  clearGroupChildren(activePieceGroup);
  clearGroupChildren(ghostPieceGroup);
  gantryGroup.visible=false;
  document.getElementById('g-end-title').textContent=title;
  document.getElementById('g-end-summary').textContent=won?
    'You cleared the empty bay before the truck window closed.':
    'The stack jammed before the outbound window. Run it back and clean the floor.';
  document.getElementById('g-end-score').textContent=String(gameScore);
  document.getElementById('g-end-lines').textContent=String(gameLines);
  document.getElementById('g-end-level').textContent=String(gameLevel);
  document.getElementById('g-end-time').textContent=formatClock(gameTimer);
  document.getElementById('game-end').classList.add('visible');
  gameStatus=won?'shift complete. bay clear and ready.':'truck window missed. the bay is still jammed.';
  updateGameHud();
}
function updateGame(dt,timeMs){
  if(!gameActive) return;
  pulseTime+=dt;
  if(gameRoundLive){
    gameTimer=Math.max(0,gameTimer-dt);
    const interval=Math.max(0.15,softDrop?GAME.FAST_DROP:GAME.NORMAL_DROP-Math.min(0.42,(gameLevel-1)*0.05));
    dropAccumulator+=dt;
    while(dropAccumulator>=interval){
      dropAccumulator-=interval;
      if(!tryMove(0,1)){lockActivePiece();break;}
    }
    if(gameTimer<=0 && gameRoundLive) endGame(false,'Truck Window Missed');
    if(timeMs){
      const shimmer=0.18+Math.sin(timeMs*0.004)*0.05;
      boardFrameGroup.children.forEach((child,idx)=>{
        if(child.material && 'emissiveIntensity' in child.material && idx===1) child.material.emissiveIntensity=shimmer;
      });
    }
    updateGameHud();
  }
}
function setGameChrome(on){
  document.getElementById('game-hud').classList.toggle('visible',on);
  document.getElementById('game-controls').classList.toggle('visible',on);
  document.getElementById('ui').classList.toggle('hidden',on);
  document.getElementById('callout').classList.toggle('hidden',on);
  document.getElementById('hint').classList.toggle('hidden',on);
  document.getElementById('progress-bar').classList.toggle('hidden',on);
  const infoShell=document.getElementById('listing-info-shell');
  if(infoShell) infoShell.classList.toggle('hidden',on);
  const tip=document.getElementById('road-connectivity-tip');
  if(tip) tip.classList.toggle('hidden',on);
}
function enterGame(){
  if(gameActive) return;
  gameActive=true;
  dragging=false;
  setAnimate(false);
  cycleT=0;
  updateScene(0);
  modeAGroup.visible=false;
  modeBGroup.visible=false;
  gameGroup.visible=true;
  setGameChrome(true);
  const btn=document.getElementById('playGameBtn');
  btn.classList.add('game-active');
  btn.textContent='Exit Game';
  animCam(GAME.CAMERA.rotX,GAME.CAMERA.rotY,GAME.CAMERA.dist,850,null,GAME.CAMERA.target,GAME.CAMERA.fov||camFov);
  startGameRound();
}
function exitGame(){
  gameActive=false;
  gameRoundLive=false;
  softDrop=false;
  gameGroup.visible=false;
  setGameChrome(false);
  document.getElementById('game-end').classList.remove('visible');
  const btn=document.getElementById('playGameBtn');
  btn.classList.remove('game-active');
  btn.textContent='3D Pallet Stack';
  setActiveView('inside');
  const insidePose=views.inside;
  const insideOrbit=orbitFromPose(insidePose.pos,insidePose.target);
  animCam(insideOrbit.rx,insideOrbit.ry,insideOrbit.dist,850,null,insidePose.target,insidePose.fov||camFov);
}
function bindRepeatButton(id,onPress){
  const btn=document.getElementById(id);
  let holdTimer=null,repeatTimer=null;
  const clear=()=>{if(holdTimer)clearTimeout(holdTimer);if(repeatTimer)clearInterval(repeatTimer);holdTimer=null;repeatTimer=null;};
  const start=e=>{
    e.preventDefault();
    if(!gameActive) return;
    onPress();
    holdTimer=setTimeout(()=>{repeatTimer=setInterval(onPress,90);},180);
  };
  btn.addEventListener('pointerdown',start);
  btn.addEventListener('pointerup',clear);
  btn.addEventListener('pointerleave',clear);
  btn.addEventListener('pointercancel',clear);
}
document.getElementById('playGameBtn').addEventListener('click',()=>{if(gameActive)exitGame();else enterGame();});
document.getElementById('btn-restart').addEventListener('click',startGameRound);
document.getElementById('btn-exit').addEventListener('click',exitGame);
document.getElementById('g-exit-mini').addEventListener('click',exitGame);
bindRepeatButton('g-left',()=>tryMove(-1,0));
bindRepeatButton('g-right',()=>tryMove(1,0));
bindRepeatButton('g-down',()=>{softDrop=true;tryMove(0,1);setTimeout(()=>{softDrop=false;},120);});
document.getElementById('g-rotate').addEventListener('click',()=>tryRotate(1));
document.getElementById('g-drop').addEventListener('click',hardDrop);

window.addEventListener('keydown',e=>{
  if(!gameActive) return;
  if(e.code==='Escape'){e.preventDefault();exitGame();return;}
  if(!gameRoundLive) return;
  if(['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Space','KeyQ','KeyE'].includes(e.code)) e.preventDefault();
  if(e.code==='ArrowLeft') tryMove(-1,0);
  else if(e.code==='ArrowRight') tryMove(1,0);
  else if(e.code==='ArrowUp'||e.code==='KeyE') tryRotate(1);
  else if(e.code==='KeyQ') tryRotate(-1);
  else if(e.code==='ArrowDown') softDrop=true;
  else if(e.code==='Space') hardDrop();
});
window.addEventListener('keyup',e=>{
  if(e.code==='ArrowDown') softDrop=false;
});


const introOverlay=document.getElementById('warehouseIntroOverlay');
const enterWarehouseBtn=document.getElementById('enterWarehouseBtn');
function hideWarehouseIntro(){
  introOverlay.classList.add('hidden');
}
enterWarehouseBtn.addEventListener('click',hideWarehouseIntro);
window.addEventListener('keydown',e=>{
  if(e.key==='Enter' && !introOverlay.classList.contains('hidden')) hideWarehouseIntro();
});

// ─────────────────────────────────────────────────────────────────────────────
// RESIZE
// ─────────────────────────────────────────────────────────────────────────────
window.addEventListener('resize',()=>{
  W=window.innerWidth;H=window.innerHeight;
  camera.aspect=W/H;camera.updateProjectionMatrix();
  renderer.setSize(W,H);
  if(composer) composer.setSize(W,H);
  if(fxaaPass && fxaaPass.material && fxaaPass.material.uniforms && fxaaPass.material.uniforms['resolution']){
    fxaaPass.material.uniforms['resolution'].value.set(1/(W*renderer.getPixelRatio()),1/(H*renderer.getPixelRatio()));
  }
  if(ssaoPass && ssaoPass.setSize) ssaoPass.setSize(W,H);
  if(typeof updateMobileWarehouseUI==='function') updateMobileWarehouseUI();
});


// ─────────────────────────────────────────────────────────────────────────────
// MAIN LOOP
// ─────────────────────────────────────────────────────────────────────────────
const clock=new THREE.Clock();
document.getElementById('ph-empty').classList.add('active');
initPost();
setLookPreset('day');
renderListingInfo('inside');

(function loop(time){
  requestAnimationFrame(loop);
  if(!lastTime) lastTime=time;
  const dtMs=time-lastTime;lastTime=time;
  clock.getDelta();
  if(camAnim) camAnim(performance.now());
  if(animPlaying){
    cycleT=(cycleT+dtMs/CYCLE)%1.0;
    updateShotSequence(dtMs);
  }
  updateScene((typeof gameActive!=='undefined' && gameActive) ? 0 : cycleT);

  // Premium daylight drift, shot breathing, and warmth
  const lt=time*0.00018;
  const golden=lookMode==='golden';
  if(animPlaying && shotIndex>=0){
    const shot=shotSequence[shotIndex]||{};
    const holdNorm=Math.max(0,Math.min(1,(shotElapsed-(shot.dur||0))/Math.max(1,shot.hold||1)));
    const breath=(shot.breath||0.10)*(0.35+holdNorm*0.65);
    camBiasX=Math.sin(lt*3.1+shotIndex*0.7)*breath;
    camBiasY=Math.cos(lt*2.3+shotIndex*0.4)*breath*0.18;
    camBiasZ=Math.sin(lt*2.0+shotIndex*0.5)*breath*0.30;
    camBiasDist=Math.sin(lt*1.6+shotIndex*0.4)*(shot.zoomBreath||0.10);
  }else{
    camBiasX=lerp(camBiasX,0,0.08); camBiasY=lerp(camBiasY,0,0.08); camBiasZ=lerp(camBiasZ,0,0.08); camBiasDist=lerp(camBiasDist,0,0.08);
  }
  applyCamera();
  warmAccent.position.set((golden?2.5:6)+Math.sin(lt*1.4)*(golden?6.8:4.8),3.2+Math.sin(lt*0.8)*1.1,(golden?-14:-8)+Math.cos(lt*1.1)*(golden?8.2:5.5));
  warmAccent.intensity=(golden?18.6:14.5)+Math.sin(lt*2.0)*(golden?1.8:1.4);
  sunLight.position.set((golden?-54:-42)+Math.sin(lt*0.6)*(golden?6:4),golden?42:58,(golden?8:26)+Math.cos(lt*0.55)*(golden?4.8:2.5));
  streetLightGlow.intensity=(golden?10.4:8.5)+Math.sin(lt*1.9)*0.5;
  dockShadeBounce.intensity=(golden?8.2:10.6)+Math.sin(lt*2.2)*0.35;
  interiorSpillA.intensity=(golden?6.4:8.3)+Math.sin(lt*2.7)*0.25;
  interiorSpillB.intensity=(golden?5.9:7.5)+Math.sin(lt*2.1+1.2)*0.20;
  rimLight.intensity=(golden?0.72:0.58)+Math.sin(lt*0.8)*0.06;
  facadeLift.intensity=(golden?0.28:0.34)+Math.sin(lt*1.2)*0.03;
  stripLights.forEach((pl,i)=>{ pl.intensity=(golden?11.3:12.5) + Math.sin(lt*4 + i*0.7)*0.4; });
  if(cinematicOverlay) cinematicOverlay.style.opacity=(animPlaying?0.84:0.72).toFixed(2);
  if(grainOverlay) grainOverlay.style.opacity=(golden?0.05:0.06).toFixed(2);

  // Additive tree / shrub sway
  swayingTrees.forEach(tr=>{
    tr.rotation.z=Math.sin(lt*4.2+tr.userData.swayPhase)*tr.userData.swayAmp;
    tr.rotation.x=Math.cos(lt*3.7+tr.userData.swayPhase)*tr.userData.swayAmp*0.35;
  });
  swayingShrubs.forEach(sh=>{
    const amp=sh.userData.swayAmp||0.012;
    const ph=sh.userData.swayPhase||0;
    sh.rotation.y=Math.sin(lt*8.6+ph)*amp*0.55;
    sh.rotation.z=Math.cos(lt*11.2+ph)*amp*0.42;
  });

  // Additive ambient vehicle motion
  movers.forEach(m=>{
    if(m.type==='road'){
      const z=((time*m.speed)%m.range)-69;
      m.mesh.position.z=z;
      m.mesh.rotation.y=-Math.PI/2;
    }else if(m.type==='roadBack'){
      const z=69-((time*m.speed)%m.range);
      m.mesh.position.z=z;
      m.mesh.rotation.y=Math.PI/2;
    }else if(m.type==='yard'){
      const phase=(Math.sin(time*m.speed)+1)/2;
      m.mesh.position.x=lerp(m.baseX-10,m.baseX+6,phase);
      m.mesh.rotation.y=Math.PI+(Math.sin(time*m.speed)*0.08);
    }else if(m.type==='forklift'){
      const phase=(Math.sin(time*m.speed)+1)/2;
      m.mesh.position.x=lerp(m.baseX-4.8,m.baseX+5.8,phase);
      m.mesh.position.z=m.baseZ+Math.sin(time*m.speed*1.8)*0.22;
      m.mesh.rotation.y=lerp(0.12,-0.05,phase);
    }else if(m.type==='bayForklift'){
      const base=(Math.sin(time*m.speed)+1)/2;
      const phase=base<0.5 ? 0.5*Math.pow(base*2,0.84) : 1-0.5*Math.pow((1-base)*2,1.18);
      m.mesh.position.x=m.baseX+Math.sin(time*m.speed*0.82)*0.22;
      m.mesh.position.z=lerp(m.baseZ-2.8,m.baseZ+3.45,phase);
      m.mesh.rotation.y=Math.PI/2 + Math.sin(time*m.speed*1.5)*0.06;
    }
  });

  if(roadHotspotGroup.visible && !dragging && roadPointer.x>=-1 && roadPointer.x<=1 && roadPointer.y>=-1 && roadPointer.y<=1){
    roadRaycaster.setFromCamera(roadPointer,camera);
    const hits=roadRaycaster.intersectObjects(roadHotspots,false);
    showRoadTip(hits.length ? hits[0].object.userData.tip : null);
  }else{
    hideRoadTip();
  }

  if(typeof gameActive!=='undefined' && gameActive) updateGame(Math.min(dtMs/1000,0.05),time);
  if(composer) composer.render();
  else renderer.render(scene,camera);
})(0);


