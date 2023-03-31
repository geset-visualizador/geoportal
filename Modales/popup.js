const abrir1 = document.getElementById('abrir1');
const siguiente1 = document.getElementById('siguiente1')
const siguiente2 = document.getElementById('siguiente2')
const cerrar = document.getElementById('cerrar2');

abrir1.addEventListener('click', () => {
  contenedor_modal1.classList.add('mostrar');  
});

siguiente1.addEventListener('click', () => {
  contenedor_modal2.classList.add('mostrar');  
});

siguiente1.addEventListener('click', () => {
  contenedor_modal1.classList.remove('mostrar');
});

siguiente2.addEventListener('click', () => {
  contenedor_modal3.classList.add('mostrar');  
});

siguiente2.addEventListener('click', () => {
  contenedor_modal2.classList.remove('mostrar');
});


cerrar.addEventListener('click', () => {
  contenedor_modal3.classList.remove('mostrar');
});



