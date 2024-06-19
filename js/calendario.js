document.addEventListener('DOMContentLoaded', function () {
    function getWindowHeight() {
        return window.innerHeight / 1.1;
    }

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        eventClick: function (info) {
            var eventTitle = info.event.title;
            var selectedEvent = info.event;
            var eventId = info.event.id;

            var modalEditEvent = document.getElementById('modalEditarEvento');
            var inputEventText = document.getElementById('eventContent');
            var editButtonEvent = document.getElementById('editButton');
            var cancelEditEvent = document.getElementById('cancelButton');
            var deleteEventButton = document.getElementById('deleteButton');
            var popUpDeletarEvento = document.getElementById('popUpDeletarEvento');
            var deletarEvento = document.getElementById('deletarEvento');
            var naoDeletarEvento = document.getElementById('naoDeletarEvento');

            modalEditEvent.style.display = 'block';
            inputEventText.value = eventTitle;

            editButtonEvent.onclick = function () {
                var newTitle = inputEventText.value;
                selectedEvent.setProp('title', newTitle);
                saveEventToLocalStorage(eventId, newTitle, selectedEvent.startStr);
                modalEditEvent.style.display = 'none';
            };

            deleteEventButton.onclick = function () {
                popUpDeletarEvento.style.display = 'block';
            };

            deletarEvento.onclick = function () {
                calendar.getEventById(eventId).remove();
                deleteEventFromLocalStorage(eventId);
                modalEditEvent.style.display = 'none';
                popUpDeletarEvento.style.display = 'none';
            };

            naoDeletarEvento.onclick = function () {
                popUpDeletarEvento.style.display = 'none';
            };

            cancelEditEvent.onclick = function () {
                modalEditEvent.style.display = 'none';
                popUpDeletarEvento.style.display = 'none';
            };
        },

        eventDrop: function (info) {
            saveEventToLocalStorage(info.event.id, info.event.title, info.event.startStr);
        },

        eventColor: '#258A5E',
        editable: true,
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        height: getWindowHeight() + 'px',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'prev,next',
        },
        customButtons: {
            addEventButton: {
                text: 'Adicionar Evento',
                click: function () {
                    openEventModal();
                }
            }
        },
        dateClick: function (info) {
            openEventModal(info.date);
        },
    });

    calendar.render();

    var eventModal = document.getElementById('eventModal');
    var eventTitleInput = document.getElementById('eventTitle');
    var saveEventButton = document.getElementById('saveEventButton');
    var eventDateInput = document.getElementById('eventDate');
    var eventDate = document.getElementById('eventEditDate');
    var cancelBtn = document.getElementById('cancelEventButton');

    function openEventModal(date) {
        eventModal.style.display = 'flex';
        eventTitleInput.value = '';
        eventDateInput.value = formatDate(date);
        eventDate.value = formatDate(date);

        eventTitleInput.focus();

        cancelBtn.onclick = function () {
            eventModal.style.display = 'none';
        };

        saveEventButton.onclick = function () {
            var eventTitle = eventTitleInput.value;
            if (eventTitle) {
                var eventId = generateUniqueId();
                calendar.addEvent({
                    id: eventId,
                    title: eventTitle,
                    start: date,
                    allDay: true,
                });
                saveEventToLocalStorage(eventId, eventTitle, date);
                eventModal.style.display = 'none';
            }
        };

        function formatDate(date) {
            var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return date.toLocaleDateString('pt-br', options);
        }
    }

    function saveEventToLocalStorage(id, title, date) {
        var eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos.push({ id: id, title: title, date: date });
        localStorage.setItem('eventos', JSON.stringify(eventos));
    }

    function deleteEventFromLocalStorage(id) {
        var eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos = eventos.filter(evento => evento.id !== id);
        localStorage.setItem('eventos', JSON.stringify(eventos));
    }

    function loadEventsFromLocalStorage() {
        var eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos.forEach(function (evento) {
            calendar.addEvent({
                id: evento.id,
                title: evento.title,
                start: evento.date,
                allDay: true,
            });
        });
    }

    function generateUniqueId() {
        return 'event-' + Math.random().toString(36).substr(2, 9);
    }

    loadEventsFromLocalStorage();
});
