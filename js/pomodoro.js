document.addEventListener('DOMContentLoaded', function() {
    let currentPhase = 1;
    let descanso = 0;
    let totalPhases = 4;

    const tempoDescanso = document.getElementById('tempoDescansoPomodoro');
    const tempoTrabalho = document.getElementById('tempoTrabalho');
    const textInput = document.getElementById('textInput');
    const textInputDescanso = document.getElementById('textInputDescanso');
    const tarefaConcluida = document.getElementById('tarefaConcluida');
    const volumeSlider = document.getElementById('volumeSlider');

    let selectedValueTrabalho = parseInt(localStorage.getItem('tempoTrabalho')) || parseInt(tempoTrabalho.value);
    let selectedValueDescanso = parseInt(localStorage.getItem('tempoDescansoPomodoro')) || parseInt(tempoDescanso.value);
    let volumeValue = parseFloat(localStorage.getItem('volumeSlider')) || parseFloat(volumeSlider.value);
    const minutosPomodoro = document.getElementById('minutosPomodoro');
    const segundosPomodoro = document.getElementById('segundosPomodoro');
    minutosPomodoro.textContent = selectedValueTrabalho.toString().padStart(2, '0');
    segundosPomodoro.textContent = '00';
    tempoTrabalho.value = selectedValueTrabalho;
    tempoDescanso.value = selectedValueDescanso;
    textInput.value = selectedValueTrabalho;
    textInputDescanso.value = selectedValueDescanso;
    volumeSlider.value = volumeValue;

    tempoTrabalho.addEventListener('input', function() {
        selectedValueTrabalho = parseInt(tempoTrabalho.value);
        textInput.value = selectedValueTrabalho;
        localStorage.setItem('tempoTrabalho', selectedValueTrabalho);
    });

    tempoDescanso.addEventListener('input', function() {
        selectedValueDescanso = parseInt(tempoDescanso.value);
        textInputDescanso.value = selectedValueDescanso;
        localStorage.setItem('tempoDescansoPomodoro', selectedValueDescanso);
    });

    var remainingTime = selectedValueTrabalho * 60;
    var phaseDuration = selectedValueTrabalho * 60;
    let breakDuration = selectedValueDescanso * 60;

    let isTimerRunning = false;
    let timerId;

    const startButton = document.getElementById('iniciarPomodoro');
    const resetButton = document.getElementById('resetPomodoro');
    const fimIntervalo = document.getElementById('fimIntervalo');
    const fimPomodoroAudio = document.getElementById('fimPomodoroAudio');
    const inicioPomodoroAudio = document.getElementById('inicioPomodoroAudio');
    const intervaloPomodoroAudio = document.getElementById('intervaloPomodoroAudio');

    startButton.addEventListener('click', function() {
        tarefaConcluida.style.display = 'none';
        const iconeBotao = document.getElementById('iconeBotaoPomodoro');
        if (!isTimerRunning) {
            inicioPomodoroAudio.play();
            iconeBotao.classList.remove('fa-play');
            iconeBotao.classList.add('fa-pause');
            isTimerRunning = true;
            startTimer();
        } else {
            iconeBotao.classList.remove('fa-pause');
            iconeBotao.classList.add('fa-play');
            isTimerRunning = false;
            clearTimeout(timerId);
        }
    });

    resetButton.addEventListener('click', function() {
        resetPomodoro();
    });

    function startTimer() {
        const minElement = document.getElementById('minutosPomodoro');
        const segElement = document.getElementById('segundosPomodoro');
        const fasesElement = document.getElementById('contadorFases');
        const iconeBotao = document.getElementById('iconeBotaoPomodoro');

        const iconeTrabalho = document.getElementById('horaTrabalho');
        const iconeDescanso = document.getElementById('horaDescanso');

        const fasesPomodoro = document.getElementById('fasesPomodoro');
        const timer = document.getElementById('timer');

        iconeTrabalho.style.display = 'block';

        updateFase();
        updateTimer();

        function updateFase() {
            fasesElement.textContent = `${currentPhase}/${totalPhases}`;
        }

        function updateTimer() {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;

            minElement.textContent = minutes.toString().padStart(2, '0');
            segElement.textContent = seconds.toString().padStart(2, '0');
        }

        function timerLoop() {
            if (remainingTime <= 0) {
                if (currentPhase === 1 && descanso === 0) {
                    descanso++;

                    timer.style.opacity = '0.2';
                    fasesPomodoro.style.opacity = '0.2';
                    iconeTrabalho.style.display = 'none';
                    iconeDescanso.style.display = 'block';

                    fimPomodoroAudio.play();
                    remainingTime = breakDuration;
                } else if (currentPhase === 1 && descanso === 1) {
                    fimIntervalo.play();
                    currentPhase++;

                    timer.style.opacity = '1';
                    fasesPomodoro.style.opacity = '1';
                    iconeTrabalho.style.display = 'block';
                    iconeDescanso.style.display = 'none';

                    updateFase();
                    remainingTime = phaseDuration;
                } else if ((currentPhase === 2 || currentPhase === 3) && descanso < 2) {
                    descanso++;

                    timer.style.opacity = '0.2';
                    fasesPomodoro.style.opacity = '0.2';
                    iconeTrabalho.style.display = 'none';
                    iconeDescanso.style.display = 'block';

                    fimPomodoroAudio.play();
                    remainingTime = breakDuration;
                } else if ((currentPhase === 2 || currentPhase === 3) && descanso === 2) {
                    fimIntervalo.play();
                    currentPhase++;
                    descanso++;

                    timer.style.opacity = '1';
                    fasesPomodoro.style.opacity = '1';
                    iconeTrabalho.style.display = 'block';
                    iconeDescanso.style.display = 'none';

                    updateFase();
                    remainingTime = phaseDuration;
                } else if (currentPhase === 3 && descanso === 3) {
                    descanso++;

                    timer.style.opacity = '0.2';
                    fasesPomodoro.style.opacity = '0.2';
                    iconeTrabalho.style.display = 'none';
                    iconeDescanso.style.display = 'block';

                    fimPomodoroAudio.play();
                    remainingTime = breakDuration;
                } else if (currentPhase === 3 && descanso === 4) {
                    fimIntervalo.play();
                    currentPhase++;

                    timer.style.opacity = '1';
                    fasesPomodoro.style.opacity = '1';
                    iconeTrabalho.style.display = 'block';
                    iconeDescanso.style.display = 'none';

                    updateFase();
                    remainingTime = phaseDuration;
                } else {
                    tarefaConcluida.style.display = 'block';
                    intervaloPomodoroAudio.play();
                    currentPhase = 0;
                    descanso = 0;
                    remainingTime = phaseDuration;
                    iconeBotao.classList.remove('fa-pause');
                    iconeBotao.classList.add('fa-play');
                    isTimerRunning = false;
                }
            }

            remainingTime--;
            updateTimer();

            if (currentPhase <= totalPhases && isTimerRunning) {
                timerId = setTimeout(timerLoop, 1000);
            } else {
                currentPhase = 1;
                descanso = 0;
                updateFase();
                remainingTime = phaseDuration;
                iconeBotao.classList.remove('fa-pause');
                iconeBotao.classList.add('fa-play');
                isTimerRunning = false;
            }
        }

        timerLoop();
    }

    function pauseTimer() {
        const iconeBotao = document.getElementById('iconeBotaoPomodoro');
        iconeBotao.classList.remove('fa-pause');
        iconeBotao.classList.add('fa-play');
        isTimerRunning = false;
        clearTimeout(timerId);
    }
    function resetPomodoro() {
        clearTimeout(timerId);
        isTimerRunning = false;
        currentPhase = 1;
        descanso = 0;
        minutosPomodoro.textContent = selectedValueTrabalho.toString().padStart(2, '0');
        segundosPomodoro.textContent = '00';
        // Resetar valores para os armazenados no localStorage
        selectedValueTrabalho = parseInt(localStorage.getItem('tempoTrabalho')) || 25;
        selectedValueDescanso = parseInt(localStorage.getItem('tempoDescansoPomodoro')) || 5;
        volumeValue = parseFloat(localStorage.getItem('volumeSlider')) || 1;
    
        // Atualizar os sliders visualmente
        tempoTrabalho.value = selectedValueTrabalho;
        tempoDescanso.value = selectedValueDescanso;
        textInput.value = selectedValueTrabalho;
        textInputDescanso.value = selectedValueDescanso;
        volumeSlider.value = volumeValue;
    
        // Atualizar valores de duração e tempo restante
        remainingTime = selectedValueTrabalho * 60;
        phaseDuration = selectedValueTrabalho * 60;
        breakDuration = selectedValueDescanso * 60;
    
        // Atualizar timer e fase visualmente

    
        // Atualizar fase visualmente
        const fasesElement = document.getElementById('contadorFases');
        fasesElement.textContent = `1/4`;
    
        // Esconder ícones de hora de trabalho e descanso
        const iconeTrabalho = document.getElementById('horaTrabalho');
        const iconeDescanso = document.getElementById('horaDescanso');
        iconeTrabalho.style.display = 'none';
        iconeDescanso.style.display = 'none';
    
        // Atualizar ícone do botão
        const iconeBotao = document.getElementById('iconeBotaoPomodoro');
        iconeBotao.classList.remove('fa-pause');
        iconeBotao.classList.add('fa-play');
    }

    fimPomodoroAudio.volume = volumeSlider.value;
    inicioPomodoroAudio.volume = volumeSlider.value;

    volumeSlider.addEventListener('input', function() {
        fimPomodoroAudio.volume = volumeSlider.value;
        inicioPomodoroAudio.volume = volumeSlider.value;
        localStorage.setItem('volumeSlider', volumeSlider.value);
    });

    const salvarButton = document.getElementById('SalvarConfig');
    const ConfigurarPomodoro = document.getElementById('ConfigurarPomodoro');
        const pomodoroContent = document.getElementById('pomodoroContent');
        const abrirConfigButton = document.getElementById('abrirConfig');
    
        if (abrirConfigButton && ConfigurarPomodoro && pomodoroContent) {
            abrirConfigButton.addEventListener('click', function() {
                ConfigurarPomodoro.style.display = 'block';
                pomodoroContent.style.display = 'none';
            });
        }
    
        if (salvarButton && minutosPomodoro && segundosPomodoro && ConfigurarPomodoro && pomodoroContent) {
            salvarButton.addEventListener('click', function() {
                selectedValueTrabalho = parseInt(tempoTrabalho.value);
                selectedValueDescanso = parseInt(tempoDescanso.value);
                volumeValue = parseFloat(volumeSlider.value);
    
                localStorage.setItem('tempoTrabalho', selectedValueTrabalho);
                localStorage.setItem('tempoDescansoPomodoro', selectedValueDescanso);
                localStorage.setItem('volumeSlider', volumeValue);
    
                remainingTime = selectedValueTrabalho * 60;
                phaseDuration = selectedValueTrabalho * 60;
                breakDuration = selectedValueDescanso * 60;
    
                var minutos = Math.floor(remainingTime / 60);
                var segundos = remainingTime % 60;
                minutosPomodoro.textContent = minutos.toString().padStart(2, '0');
                segundosPomodoro.textContent = segundos.toString().padStart(2, '0');
    
                ConfigurarPomodoro.style.display = 'none';
                pomodoroContent.style.display = 'inline-flex';
            });
        }
    
        const closeButton = document.getElementById('fecharConfig');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                ConfigurarPomodoro.style.display = 'none';
                pomodoroContent.style.display = 'inline-flex';
            });
        }
    });
    
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }
    
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    