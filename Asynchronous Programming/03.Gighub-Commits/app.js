const list=document.getElementById('commits');
function loadCommits() {
	const username = document.getElementById('username').value;
    const repository=document.getElementById('repo').value;
	const url = `https://api.github.com/repos/${username}/${repository}/commits`;
	fetch(url).then(onHeaders).then(OnSuccess).catch(onError);
}
function onHeaders(response) {
	if (!response.ok) {
		throw 'Error';
	}
	return response.json();
}

function OnSuccess(data) {
    console.log(data);
	list.replaceChildren(...data.map(CreateListItem));
}

function onError(error) {
    const itemError=document.createElement('li');
    list.appendChild(itemError);
	itemError.textContent=`Error: 404 (Not Found)`;
}

function CreateListItem({commit: {author: {name},message}}) {
	const item=document.createElement('li');
	item.textContent=`${name}: ${message}`
	list.appendChild(item);
	return item;
}

