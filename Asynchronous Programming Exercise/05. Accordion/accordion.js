async function solution() {
    const mainReference = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const detailedUrl = `http://localhost:3030/jsonstore/advanced/articles/details/`;
    const response = await fetch(url);
    const data = await response.json();
    let ids = [];
    data.forEach(element => {
        ids.push(element._id);
    });
    for (let currentId of ids) {
        let resp = await fetch(detailedUrl + currentId);
        let detailedData = await resp.json();
        creatingElements(detailedData._id, detailedData.title, detailedData.content);
    }
    function creatingElements(id, title, content) {
        const accordionDiv = document.createElement('div');
        accordionDiv.classList.add('accordion');
        mainReference.appendChild(accordionDiv);
        const headDiv = document.createElement('div');
        headDiv.classList.add('head');
        accordionDiv.appendChild(headDiv);
        let spanTitle = document.createElement('span');
        spanTitle.textContent = title;
        headDiv.appendChild(spanTitle);
        let moreButton = document.createElement('button');
        moreButton.classList.add('button'); // SHOULD SET THE ID OF THE BUTTON
        moreButton.textContent = 'More';
        moreButton.id = id;
        headDiv.appendChild(moreButton);
        let extraDiv = document.createElement('div');
        extraDiv.classList.add('extra');
        accordionDiv.appendChild(extraDiv);
        let paragraph = document.createElement('p');
        paragraph.textContent = content;
        extraDiv.appendChild(paragraph);
    }
    const moreButtons = Array.from(document.querySelectorAll('button'));
    for (let currentButton of moreButtons) {
        currentButton.addEventListener('click', moreButtonClicked);
    }
}
function moreButtonClicked(e) {
    if (e.target.textContent == 'More') {
        let currentExtraDiv = e.target.parentElement.parentElement.children[1];
        currentExtraDiv.style.display = 'block';
        e.target.textContent = 'Less';
    } else if (e.target.textContent=='Less') {
        let currentExtraDiv = e.target.parentElement.parentElement.children[1];
        currentExtraDiv.style.display = 'none';
        e.target.textContent = 'More';
    }
}

solution();