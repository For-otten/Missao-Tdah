var alarmeButton = document.getElementById('clock')
var alarme = document.getElementById('alarme')
var campoAlarme = document.getElementById('campoAlarme')
var campoMensagemAlarme = document.getElementById('campoMensagemAlarme')
var campoConfigurarAlarme = document.getElementById('campoConfigurarAlarme')
var hideAlarme = document.getElementById('hideAlarme')


alarmeButton.addEventListener('click', function () {
    alarme.style.width = '28%'
    alarmeButton.style.display = 'none'
    campoAlarme.style.display = 'block'
    campoMensagemAlarme.style.display = 'block'
    campoConfigurarAlarme.style.display = 'block'

})


