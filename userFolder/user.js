//get info from localstore
let userLocal = JSON.parse(localStorage.getItem('myStore'));

const outputUser =  document.getElementById('outputt');
const orgs =  document.getElementById('organisations');

  //display enterd user's info
  async function getUrll() {
         
   const sponse = await fetch(`https://api.github.com/users/${userLocal[0].Name}/repos`);
   const sult = await sponse.json();
    
      if(sult.length > 2) {
              
        outputUser.innerHTML = `
        <div class="divWrap"> 
          <div class="wrap">  
            <img src="${sult[0].owner.avatar_url}" alt="avatar">
          </div>  
          <div class="wrap2">
            <a href="${sult[0].owner.html_url}" target="_blank">${sult[0].owner.login}</a>
            <p>Type: ${sult[0].owner.type}</p>
            <h4>First three ropo names:</h4>
            <ol class="repositories"> 
              <li>${sult[0].name}</li>
              <li>${sult[1].name}</li>
              <li>${sult[2].name}</li>
            </ol>
          </div> 
        </div>  
         `
       }       
       
       else if(sult.length = 2) {
              
        outputUser.innerHTML = `
        <div class="divWrap"> 
          <div class="wrap">  
            <img src="${sult[0].owner.avatar_url}" alt="avatar">
          </div>  
          <div class="wrap2">
            <a href="${sult[0].owner.html_url}" target="_blank">${sult[0].owner.login}</a>
            <p>Type: ${sult[0].owner.type}</p>
  
            <ol class="repositories"> 
              <li>${sult[0].name}</li>
              <li>${sult[1].name}</li>
              <li>-</li>
            </ol>
          </div> 
        </div>  
         `
       }      
       
       else if (sult.length = 1) {
              
        outputUser.innerHTML = `
        <div class="divWrap"> 
          <div class="wrap">  
            <img src="${sult[0].owner.avatar_url}" alt="avatar">
          </div>  
          <div class="wrap2">
            <a href="${sult[0].owner.html_url}" target="_blank">${sult[0].owner.login}</a>
            <p>Type: ${sult[0].owner.type}</p>
  
            <ol class="repositories"> 
              <li>${sult[0].name}</li>
              <li>-</li>
              <li>-</li>
            </ol>
          </div> 
        </div>  
         `
       }    
          
    }
    getUrll()
    .catch(() => {
      outputUser.innerHTML = `
       <div class="usrNot">
             <p>User Not Found</p>
             <button class="notFnd"> <a href="/index.html">try again</a></button>
       </div>      
             `; 
                             
     }); 




     //       B   R   E   A    K 

     

 //display user's organisation info
 async function getRepos() {
         
  const sponse = await fetch(`https://api.github.com/users/${userLocal[0].Name}/orgs`);
  const data = await sponse.json();

  if(data.length === 0) {
    orgs.innerHTML = `
    <div class="orgNot"
    <p>Not Found</p>
    </div>
    `;
  }
  else{
    data.forEach(function(e, i) {
      fetch(`https://api.github.com/orgs/${e.login}`)
      .then(sResp => sResp.json())
      .then(sData => {
        orgs.innerHTML += ` 
         <div class='orgWrap'>
          <div class='orgWrap'>
          <img src="${sData.avatar_url}" alt="avatarA">
          <a href="${sData.html_url}" target="smt">${sData.login}</a>
          </div> 
         </div> 
      `
      })
      .catch(error => console.log(error))

    })
  }

 }
 getRepos()
 .catch(() => orgs.innerHTML = `
 <div class="orgNot"
 <p>Not Found</p>
 </div>
 `)



    //css animation
 const tl = gsap.timeline({defaults: { ease: "power1.out"} });

 tl.to('.btn', { y: "0%", duration: 2 });
 tl.fromTo('.output', {opacity: 0}, {opacity: 1, duration: 2 }, '-=1');
 tl.fromTo('.orgs', {opacity: 0}, {opacity: 1, duration: 1 }, '-=1');
 tl.fromTo('.orgs', {opacity: 0}, {opacity: 1, duration: 1.5 }, '-=1.2');
 tl.fromTo('.shown', {opacity: 0}, {opacity: 1, duration: 1.5 }, '-=1.2');


