const $ = s => document.querySelector(s);
const stars = n => '★'.repeat(n) + '☆'.repeat(5-n);
const fmt = d => new Intl.DateTimeFormat('es-AR',{dateStyle:'long'}).format(new Date(d+'T12:00:00'));
fetch('data.json').then(r=>r.json()).then(data=>{
  $('#today').textContent = 'Actualizado: ' + fmt(data.updated);
  $('#top3').innerHTML = data.top3.map((x,i)=>`<article class="card"><div class="rank">0${i+1}</div><h3>${x.title}</h3><p>${x.why}</p></article>`).join('');
  const cats=[...new Set(data.items.map(x=>x.category))].sort();
  $('#category').innerHTML += cats.map(c=>`<option>${c}</option>`).join('');
  const render=()=>{
    const q=$('#search').value.toLowerCase(); const c=$('#category').value; const s=$('#status').value;
    const items=data.items.filter(x => (c==='all'||x.category===c) && (s==='all'||x.status===s) && (!q||JSON.stringify(x).toLowerCase().includes(q)));
    $('#news').innerHTML=items.map(x=>`<article class="news-item"><div><div class="meta"><span class="pill">${x.category}</span><span class="pill">${x.status}</span><span class="pill">${fmt(x.date)}</span></div><h3>${x.title}</h3><p><strong>Qué cambió:</strong> ${x.summary}</p><p><strong>Por qué importa:</strong> ${x.why}</p><p><strong>Aplicación educativa:</strong> ${x.education}</p><p><strong>Dificultad:</strong> ${x.difficulty} · <strong>Costo:</strong> ${x.cost}</p><p class="source"><a href="${x.url}" target="_blank" rel="noreferrer">Fuente: ${x.source} ↗</a></p></div><div class="scores"><div class="score"><span>Impacto</span><span>${stars(x.impact)}</span></div><div class="score"><span>Facilidad</span><span>${stars(x.ease)}</span></div><div class="score"><span>Novedad</span><span>${stars(x.novelty)}</span></div><div class="score"><span>Potencial contenido</span><span>${stars(x.content)}</span></div></div></article>`).join('') || '<p>No hay resultados con estos filtros.</p>';
  };
  ['search','category','status'].forEach(id=>$('#'+id).addEventListener('input',render));
  render();
});
