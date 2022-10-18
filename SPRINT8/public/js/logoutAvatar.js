window.addEventListener("load", function () {


    let avatarLogo = document.querySelector('#avatarLogo');  



    avatarLogo.addEventListener('click', function (event) {
        event.preventDefault();


            if (confirm("Esta seguro de salir?")) {
                window.location = '/user/logout';
              txt = "You pressed OK!";
            } else {
              txt = "You pressed Cancel!";
            }
        

    })
})