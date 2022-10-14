window.addEventListener("load", function(){

    let formLogin = document.querySelector('form.login');
    let inputEmail = document.querySelector('#email');
    let inputPass = document.querySelector('#pass'); 
    const togglePassword = document.querySelector('#togglePassword');




togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = inputPass.getAttribute('type') === 'password' ? 'text' : 'password';
  inputPass.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');   
 });


 formLogin.addEventListener('submit', function(event) {
      
    let errors = [];

    if (inputEmail.value.length > 4){         //minimo 5 caracteres el email, incluido el punto y la arroba
       if ((inputEmail.value).indexOf('@') < 0){ 
          errors.push("email");
       }
    } else {
       errors.push("email");
    } 

    if((inputPass.value == '')){
       errors.push("pass");
    }  


  if (errors.length > 0) {
      event.preventDefault();

      errors.forEach(error =>{
          console.log(error);
          switch(error){
              case 'email':       inputEmail.value = "";
                                  inputEmail.placeholder = "mail?";
                                  break;   
             case 'pass':         inputPass.value = "";
                                  inputPass.placeholder = "pass?";
                                  break;  
          }
      })
  }

  
  })
})