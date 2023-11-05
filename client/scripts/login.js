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

    const res=await fetch('https://resturant-booking-310m.onrender.com/signin',{
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
        window.location.href="../index.html";
    }
    else
    {
        alert('Invalid credentials');
    }
    

}

submit_btn.addEventListener('click',handleLogin)