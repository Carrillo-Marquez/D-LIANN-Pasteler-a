// COMPLETA únicamente los datos autorizados por la pastelería.
// El enlace de Instagram se recuperó del reporte académico.
const CONTACTOS = {
  instagram: "https://www.instagram.com/dliannpasteleria/",
  facebook: "https://www.facebook.com/share/1Fh37Fjcxf/", // Página original autorizada.
  whatsapp: "5214778608183"  // +52 1 477 860 8183, formato internacional para wa.me.
};

function prepararContactos(){
  const esUrl=(v,dominio)=>{try {const u=new URL(v);return u.protocol==='https:'&&(u.hostname===dominio||u.hostname.endsWith('.'+dominio))}catch{return false}};
  const numero=String(CONTACTOS.whatsapp||'').replace(/\D/g,'');
  const enlaces={
    instagram:esUrl(CONTACTOS.instagram,'instagram.com')?CONTACTOS.instagram:'',
    facebook:esUrl(CONTACTOS.facebook,'facebook.com')?CONTACTOS.facebook:'',
    whatsapp:numero.length>=10&&numero.length<=15?'https://wa.me/'+numero+'?text='+encodeURIComponent('Hola, vi su sitio web y me gustaría pedir información sobre sus pasteles.') : ''
  };
  document.querySelectorAll('[data-contacto]').forEach(el=>{
    const tipo=el.dataset.contacto, url=enlaces[tipo];
    if(url){el.href=url;el.removeAttribute('aria-disabled');el.removeAttribute('tabindex');el.target='_blank';el.rel='noopener noreferrer';const label=el.querySelector('[data-status]');if(label)label.textContent='Abrir enlace oficial';}
    else{el.removeAttribute('href');el.setAttribute('aria-disabled','true');el.setAttribute('tabindex','-1');const label=el.querySelector('[data-status]');if(label)label.textContent='Pendiente de confirmación';}
  });
  const info=document.getElementById('aviso-contactos');if(info&&enlaces.facebook&&enlaces.whatsapp)info.hidden=true;
}
document.addEventListener('DOMContentLoaded',prepararContactos);
