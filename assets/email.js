function validate(){
    var mailid=document.getElementById("email").value;
	if(mailid=="")
	{
	document.getElementById("mail").innerHTML='Please enter your email Id.';
	document.getElementById("email").focus();
	return false;
	}
	else
	{
		document.getElementById("mail").innerHTML="";
    }

var v = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(v.test(f1.email.value) == false){
        document.getElementById("mail").innerHTML='Invalid Email Address.';
        f1.email.focus();
        return false;
    }
	return true;
}