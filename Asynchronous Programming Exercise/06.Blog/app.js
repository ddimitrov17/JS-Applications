function attachEvents() {
    const loadPostsButton = document.getElementById('btnLoadPosts');
    const viewPostButton = document.getElementById('btnViewPost');
    const postsURL = "http://localhost:3030/jsonstore/blog/posts";
    const commentsURL = "http://localhost:3030/jsonstore/blog/comments";
    loadPostsButton.addEventListener('click', onLoad);
    viewPostButton.addEventListener('click', onView);
    const postsSelectReference = document.getElementById('posts');
    const commentsUnorderedList=document.getElementById('post-comments');
    let dataArray; // to take the data out of the scope onLoad
    async function onLoad(e) {
        const response = await fetch(postsURL);
        const data = await response.json();
        dataArray=Object.values(data);
        for (let currentPost of Object.values(data)) {
            optionCreator(currentPost.body, currentPost.id, currentPost.title);
        }
        function optionCreator(body, id, title) {
            let currentOption = document.createElement('option');
            currentOption.value = id;
            currentOption.textContent = title;
            postsSelectReference.appendChild(currentOption);
        }
    }
    async function onView(event) {
        commentsUnorderedList.innerHTML='';
        const responseView = await fetch(commentsURL);
        const dataView = await responseView.json();
        let titleReference = document.getElementById('post-title');
        const selectedOption = postsSelectReference.querySelector('option:checked');
        let optionId = selectedOption.value;
        let optionToDisplay=dataArray.find(post => post.id==optionId);
        titleReference.textContent=optionToDisplay.title;
        let contentParagraph=document.getElementById('post-body');
        contentParagraph.textContent=optionToDisplay.body;
        for (let currentComment of Object.values(dataView)) {
            if (currentComment.postId==optionToDisplay.id) {
                liCreator(currentComment.id,currentComment.text);
            }
        }
        function liCreator(id,text) {
            let currentListItem=document.createElement('li');
            commentsUnorderedList.appendChild(currentListItem);
            currentListItem.id=id;
            currentListItem.textContent=text;
        }
    }
}

attachEvents();