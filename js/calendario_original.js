document.addEventListener('DOMContentLoaded', function () {
    function getWindowHeight() {
        return window.innerHeight / 1.1
    }

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {


        eventClick: function (info) {

            var eventTitle = info.event.title;
            var selectedEvent = info.event; 
            //---------------------------------------------------------------
            var modalEditEvent = document.getElementById('modalEditarEvento');
            var inputEventText = document.getElementById('eventContent');
            var editButtonEvent = document.getElementById('editButton');
            var cancelEditEvent = document.getElementById('cancelButton');
            var deleteEventButton = document.getElementById('deleteButton')
            var popUpDeletarEvento = document.getElementById('popUpDeletarEvento')
            var deletarEvento = document.getElementById('deletarEvento')
            var naoDeletarEvento = document.getElementById('naoDeletarEvento')

            modalEditEvent.style.display = 'block'

            inputEventText.value = eventTitle

            editButtonEvent.addEventListener('click', function () {
                popUpDeletarEvento.style.display = 'none';
                var newTitle = inputEventText.value;
                selectedEvent.setProp('title', newTitle); 
                modalEditEvent.style.display = 'none';
            });

            deleteEventButton.addEventListener('click', function () {
                popUpDeletarEvento.style.display = 'block';
            });

            deletarEvento.addEventListener('click', function () {
                popUpDeletarEvento.style.display = 'none';
                calendar.getEventById(info.event.id).remove();
                modalEditEvent.style.display = 'none';
            });


            naoDeletarEvento.addEventListener('click', function () {
                popUpDeletarEvento.style.display = 'none';

            });

            cancelEditEvent.addEventListener('click', function () {
                modalEditEvent.style.display = 'none';
                popUpDeletarEvento.style.display = 'none';

            });

        },

        eventDrop: function (info) {
            var newStartDate = info.event.start;
            eventDate.value = newStartDate.toLocaleDateString('pt-br')
        },

        eventColor: '#258A5E',
        editable: true,
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        height: getWindowHeight() + 'px',
        headerToolbar: {
            left: 'prev,next today',
            center:'title',
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
    var eventDate = document.getElementById('eventEditDate')
    var cancelBtn = document.getElementById('cancelEventButton')


    function openEventModal(date) {
        eventModal.style.display = 'flex';
        eventTitleInput.value = '';
        eventDateInput.value = formatDate(date);
        eventDate.value = formatDate(date);

        eventTitleInput.focus();

        cancelBtn.addEventListener('click', function () {
            eventModal.style.display = 'none';

        }); 
    

        saveEventButton.onclick = function () {
            var eventTitle = eventTitleInput.value;
            if (eventTitle) {
                calendar.addEvent({
                    title: eventTitle,
                    start: date,
                    allDay: true,
                    

                });
                eventModal.style.display = 'none';
            }
        };

          function formatDate(date) {
                    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                    return date.toLocaleDateString('pt-br', options);
                }

}
});

