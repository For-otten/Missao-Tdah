var BarraDeTarefas = document.getElementById("BarraDeTarefas");
var abrirPerfil = document.getElementById("abrirPerfil");
var nome = document.getElementById('nome');
var titulo = document.getElementById('tituloPerfil')
var perfil = document.getElementById('perfil')
var logout = document.getElementById('logout')

var barraExpandida = false;

abrirPerfil.addEventListener('click', function () {
    if (barraExpandida) {
        // Minimizar a barra de tarefas
        BarraDeTarefas.style.width = "16%";
        BarraDeTarefas.style.boxShadow = "none";
        logout.style.display = "none"
        nome.style.display = 'none';
        perfil.style.padding = '2% 0'

        abrirPerfil.classList.remove("fa-rotate-60");
        abrirPerfil.classList.add("fa-rotate-180");

        barraExpandida = false;
    } else {
        // Maximizar a barra de tarefas
        BarraDeTarefas.style.width = "22%";
        BarraDeTarefas.style.boxShadow = "1px -8px 45px 4px rgba(0, 0, 0, 1)";
        logout.style.display = "block"

        nome.style.display = 'block';
        perfil.style.padding = '1%'
        abrirPerfil.classList.add("fa-rotate-60");
        abrirPerfil.classList.remove("fa-rotate-180");
        barraExpandida = true;
    }
});



