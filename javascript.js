const message_input_container = BWProperties.namespace + '_message_input';

const chat_container_id = BWProperties.namespace + '_chat';

const chat_container = document.getElementById(chat_container_id);

const chat = document.querySelector("#" + chat_container_id + ">ul");

function appendMessage(message) {

	let newMessage = document.createElement("li");

	let text = document.createElement("blockquote");

	text.innerHTML = `<div style="font-weight: bold;">${message.account.first_name} ${message.account.first_name}</div><div>${message.message}</div>`;

	newMessage.append(text);

	chat.append(newMessage);

	chat.scrollTop = chat.scrollHeight;

	chat_container.scrollTop = chat_container.scrollHeight;
}

function submitMessage() {

	let input_box = document.getElementById(message_input_container);

	let input = input_box.value;

	if (input) {

		BWAPI.post(`/events/${BWProperties.event_id}/messages`, {
			message: input
		}).then(response => {
			console.log(response);
		});

		input_box.value = '';
	}

}

BWEvents.subscribe('chat_message', BWProperties.namespace + '_listener_1', function(response) {

	if (response.message) {
		appendMessage(response);
	}
});

document.addEventListener("keyup", function(event) {
	if (event.code === 'Enter') {
		submitMessage();
	}
});

function init() {

	BWAPI.get(`/events/${BWProperties.event_id}/messages`).then(response => {

		if (response.status == 'success' && response.data) {

			response.data.forEach(message => {
				appendMessage(message);
			});

		}
	});
}


init();

this.submitMessage = submitMessage;
