const output = document.getElementById('p-user-n');  
let colectArr = [];

  const getRepos = async function () {
  //get most rated repositories in github
  const response = await fetch('https://api.github.com/search/repositories?q=stars:>165000');
  const result = await response.json();
   
  let smt = result.items;
   for(var i = 0; i < smt.length; i++) {  
    if(i === 1) {
      async function getUrl() {
         
      const sponse = await fetch(`https://api.github.com/users/${smt[i].owner.login}/repos`);
      const sult = await sponse.json();
      
      //sort array oldest to newest
      sult.sort(function(a, b) {
        var dateA = new Date(a.created_at), dateB = new Date(b.created_at);
        return dateA - dateB;
      });

       output.innerHTML = `
        <div class="divWrap" id="togle"> 
          <div class="wrap">  
            <img src="${sult[0].owner.avatar_url}" alt="avatar">
          </div>  
          <div class="wrap2">
            <h4><a class="userName">${sult[0].owner.login}</a></h4>
            <p>Type: ${sult[0].owner.type}</p>
            <h4>First three ropo names:</h4>
            <ol class="repositories"> 
              <li>.${sult[0].name}</li>
              <li>.${sult[1].name}</li>
              <li>-</li>
            </ol>
          </div> 
        </div>  
         `;             
       } 
            getUrl()
            .catch(error => {console.log(error);}); 
            
    }
    else{
      async function getSUrl() {
         
        const sponsee = await fetch(`https://api.github.com/users/${smt[i].owner.login}/repos`);
        const sult = await sponsee.json();
      
        //sort array oldest to newest
       sult.sort(function(a, b) {
        var dateA = new Date(a.created_at), dateB = new Date(b.created_at);
        return dateA - dateB;
       });

       output.innerHTML += ` 
       <div class="divWrap" id="togle"> 
       <div class="wrap">  
         <img src="${sult[0].owner.avatar_url}" alt="avatar">
       </div>  
       <div class="wrap2">
         <h4><a class="userName">${sult[0].owner.login}</a></h4>
         <p>Type: ${sult[0].owner.type}</p>
         <h4>First three ropo names:</h4>
         <ol class="repositories"> 
           <li>.${sult[0].name}</li>
           <li>.${sult[1].name}</li>
           <li>.${sult[2].name}</li>
         </ol>
       </div> 
     </div>
       `;

       let names = document.querySelectorAll('.userName');
       names.forEach(item => {
         item.addEventListener('click', function() {
            let message = {
              Name: this.innerText
            }
           colectArr.push(message);
           localStorage.setItem('myStore', JSON.stringify(colectArr));
           location.href = 'userFolder/user.html';
         });
       });

      }    
      getSUrl()
      .catch(error => {console.log(error);}); 
    }
  }

}


  
     //       B   R   E   A    K 
  




  const historiNames = document.getElementById('profile');
  
   //save input names into localstorage
   const saveEl = (e) => {
    e.preventDefault();
     if(document.getElementById('search-user').value === "") {
       alert("input is empty");
     } 
     else{
     let message = {
           Name: document.getElementById('search-user').value,
      }

      colectArr.push(message);
      document.querySelector('form').reset();
      location.href = 'userFolder/user.html';
      localStorage.setItem('myStore', JSON.stringify(colectArr));
     }
      
   };



//get element(s) from localstore
  const getEll = () => {
    
   let objStorage = JSON.parse(localStorage.getItem('myStore'));
   historiNames.innerHTML = `<p class="endTag">Last viewed: ${objStorage[0].Name}</p>`;
  };


  
 document.addEventListener('DOMContentLoaded', () => {
   getRepos();
   document.getElementById('button').addEventListener('click', saveEl);
   document.querySelector('body').addEventListener("mouseover", getEll);
  });
   

     //       B   R   E   A    K 


//css
const iSimbol = document.getElementById('simb');
const listTogle = document.querySelector('.reposs');

iSimbol.addEventListener('click', function() {

  listTogle.classList.toggle('addClassUsers');
  
});


//css animation
const tl = gsap.timeline({defaults: { ease: "power1.out"} });

tl.fromTo('.popular', {opacity: 0}, {opacity: 1, duration: 2 });
tl.fromTo('.reposs', {opacity: 0}, {opacity: 1, duration: 2 }, '-=1.2');
tl.fromTo('.section2', {opacity: 0}, {opacity: 1, duration: 1 }, '-=1');

