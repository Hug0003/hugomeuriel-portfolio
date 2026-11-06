var username = document.forms["form"]['username'];
var password = document.forms['form']['password'];


username.addEventListener("textInput", username_Verify);
password.addEventListener("textInput", pass_Verify);


function validated(){
    if (username.value.length < 3){
        username.style.border = "2px solid red";
        username.focus();
        return false;
    }

    if (password.value.length < 7){
        password.style.border = "2px solid red";
        password.focus();
        return false;
    }
}

function username_Verify(){
    if (username.value.length >= 2){
        username.style.border = "2px solid #041664";
        return true;

    }

}

function pass_Verify(){
    if (password.value.length >= 8){
        password.style.border = "2px solid #041664";
        return true;


    }
}
