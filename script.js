const pages = [...document.querySelectorAll(".page")];
const navs = [...document.querySelectorAll("[data-target]")];
const toast = document.getElementById("toast");

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"),2200);
}
function showPage(id){
  pages.forEach(p=>p.classList.toggle("active-page",p.id===id));
  document.querySelectorAll(".nav[data-target],.mobile-nav [data-target]").forEach(n=>{
    n.classList.toggle("active", n.dataset.target===id);
  });
  window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{
  const target=e.target.closest("[data-target]");
  if(target){ showPage(target.dataset.target); }
  const action=e.target.closest("[data-action]");
  if(action){
    const a=action.dataset.action;
    if(a==="notifications") showToast("You have 3 new notifications.");
    if(a==="messages") showToast("Messages panel coming next.");
    if(a==="profile") showToast("Profile view opened — your creator space is ready.");
  }
});

document.querySelectorAll(".like").forEach(btn=>{
  btn.addEventListener("click",()=>{
    btn.classList.toggle("liked");
    const s=btn.querySelector("span");
    let n=parseInt(s.textContent);
    s.textContent=btn.classList.contains("liked")?n+1:n-1;
    btn.firstChild.textContent=btn.classList.contains("liked")?"♥ ":"♡ ";
  });
});
document.querySelectorAll(".save").forEach(btn=>btn.addEventListener("click",()=>{
  btn.textContent=btn.textContent==="♧"?"✓":"♧"; showToast(btn.textContent==="✓"?"Saved to your VYBE":"Removed from saves");
}));
document.querySelectorAll(".join-community,.community-row button").forEach(btn=>btn.addEventListener("click",()=>{
  btn.textContent = btn.textContent==="Joined"?"Join":"Joined";
  showToast(btn.textContent==="Joined"?"Welcome to the community.":"Left the community.");
}));
document.querySelectorAll(".buy").forEach(btn=>btn.addEventListener("click",()=>showToast("Demo marketplace: item details would open here.")));

const modal=document.getElementById("modal");
const openModal=()=>modal.classList.add("open");
const closeModal=()=>modal.classList.remove("open");
["ideaBtn","trendSubmit","joinBtn","createCommunity","sellBtn"].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.addEventListener("click",()=>{
    if(id==="joinBtn"){showToast("You're on the VYBE list. Welcome."); return;}
    if(id==="createCommunity"){showToast("Community creation flow opened."); return;}
    if(id==="sellBtn"){showToast("Seller onboarding would open here."); return;}
    openModal();
  });
});
document.querySelector(".modal-close").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.getElementById("publish").addEventListener("click",()=>{
  const text=document.getElementById("ideaText").value.trim();
  if(!text){showToast("Write a signal first.");return;}
  closeModal(); document.getElementById("ideaText").value="";
  showToast("Signal published. The community can now react.");
});

const search=document.getElementById("search");
document.getElementById("searchFocus").addEventListener("click",()=>{search.focus();});
search.addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    const q=search.value.trim();
    if(q){showPage("explore"); filterCards(q.toLowerCase()); showToast(`Searching VYBE for “${q}”`);}
  }
});
function filterCards(term){
  document.querySelectorAll(".explore-card").forEach(card=>{
    const hay=(card.innerText+" "+card.dataset.tags).toLowerCase();
    card.style.display=hay.includes(term)||term==="all"?"block":"none";
  });
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  filterCards(btn.dataset.filter);
}));
document.querySelectorAll(".chip").forEach(btn=>btn.addEventListener("click",()=>{
  showPage("explore");
  document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===btn.dataset.filter));
  filterCards(btn.dataset.filter);
}));
document.addEventListener("keydown",e=>{
  if(e.key==="/" && document.activeElement!==search){e.preventDefault();search.focus();}
  if(e.key==="Escape")closeModal();
});
