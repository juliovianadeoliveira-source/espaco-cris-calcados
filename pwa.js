(()=>{if(!document.querySelector('link[rel="manifest"]')){const m=document.createElement('link');m.rel='manifest';m.href='/manifest.webmanifest';document.head.appendChild(m)}
let deferred=null;const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
if(standalone)return;
const style=document.createElement('style');style.textContent='.install-app-btn{position:fixed;left:16px;bottom:16px;z-index:99999;border:0;border-radius:999px;background:linear-gradient(135deg,#65102f,#d81b60);color:#fff;padding:13px 18px;font:800 14px Inter,Arial,sans-serif;box-shadow:0 10px 30px #4b102c55;cursor:pointer}.install-app-tip{position:fixed;inset:0;z-index:100000;background:#160811aa;display:grid;place-items:center;padding:20px}.install-app-box{max-width:380px;background:#fff;border-radius:20px;padding:24px;color:#2b1720;font-family:Inter,Arial,sans-serif;box-shadow:0 24px 70px #0005}.install-app-box h2{margin:0 0 10px}.install-app-box button{width:100%;border:0;border-radius:10px;padding:12px;background:#35121f;color:#fff;font-weight:800}';document.head.appendChild(style);
const btn=document.createElement('button');btn.className='install-app-btn';btn.textContent='📲 Instalar aplicativo';btn.hidden=true;document.body.appendChild(btn);
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;btn.hidden=false});
const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
if(isiOS)btn.hidden=false;
btn.onclick=async()=>{if(deferred){deferred.prompt();await deferred.userChoice;deferred=null;btn.hidden=true;return}
const tip=document.createElement('div');tip.className='install-app-tip';tip.innerHTML='<div class="install-app-box"><h2>Instalar Espaço Cris</h2><p>No iPhone, toque no botão <b>Compartilhar</b> do Safari e depois em <b>Adicionar à Tela de Início</b>.</p><button>ENTENDI</button></div>';tip.onclick=()=>tip.remove();document.body.appendChild(tip)};
})();