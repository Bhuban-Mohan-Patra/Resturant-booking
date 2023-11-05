const inputs=document.querySelectorAll(".inputs");
const submit_btn=document.querySelector(".submitbtn");

let logindetails={
    email:"",
    password:""
}

const handleLogin=async (e)=>
{
    e.preventDefault();
    logindetails.email=inputs[0].value;
    logindetails.password=inputs[1].value;

    const res=await fetch('http://localhost:4600/signin',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(logindetails)
    })
    const resp=await res.json();
    if(res.status===200)
    {
        localStorage.setItem('email',resp.email);
        localStorage.setItem('token',resp.token);
        alert("Signed in successfully");
        console.log(resp);
        window.location.href="http://127.0.0.1:5502/client/index.html";
    }
    else
    {
        alert('Invalid credentials');
    }
    

}

submit_btn.addEventListener('click',handleLogin)