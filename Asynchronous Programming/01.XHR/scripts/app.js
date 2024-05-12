function loadRepos() {
   let url='https://api.github.com/users/testnakov/repos';
   let button=document.querySelector('button');
   let httpRequest= new XMLHttpRequest();
   httpRequest.addEventListener('readystatechange',displayRepos);
   httpRequest.open("GET",url);
   httpRequest.send();
   function displayRepos() {
      if (httpRequest.readyState==4 && httpRequest.status==200) {
         document.getElementById("res").textContent=httpRequest.responseText;
      }
   }
}