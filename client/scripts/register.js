const regdInputs=document.querySelectorAll('.regdInputs');
const submitbtn2=document.querySelector("#submitbtn2");

let regddetails={
    username:"",
    email:"",
    password:"",
}

const handleRegister=async(e)=>
{
    e.preventDefault();
    regddetails.name=regdInputs[0].value;
    regddetails.email=regdInputs[1].value;
    regddetails.password=regdInputs[2].value;

    const res=await fetch('http://localhost:4600/signup',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(regddetails)
    })
    const resp=await res.json();
    console.log(resp);
    alert("Successfully Registered");
}

submitbtn2.addEventListener('click', handleRegister);