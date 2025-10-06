document.querySelectorAll('.add').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const old = btn.textContent;
        btn.textContent = 'Added ✓';
        setTimeout(()=> btn.textContent = old, 1000);
    });
});
