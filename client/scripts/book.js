
if(!localStorage.getItem('token'))
{
    alert('Please sign in first');
    window.location.href='../login.html'
}


const t_data=document.querySelectorAll('.t_data');
const select_table=document.querySelector('#tables');



const resData={
    name:"",
    email:"",
    date:"",
    time_slot:"",
    party_size:"",
    T_id:""
}

const inputs=document.querySelectorAll('.inputs');



const handleSubmit=async (e)=>
{

    e.preventDefault();
    const token=localStorage.getItem('token')
    resData.name=inputs[0].value;
    resData.email=inputs[1].value;
    resData.date=inputs[2].value;
    resData.time_slot=inputs[3].value;
    resData.party_size=inputs[4].value;
    resData.T_id=inputs[5].value;

    const res=await fetch(`https://resturant-booking-310m.onrender.com/reservation`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resData)
    })

    const resp=await res.json();
    if(res.status===200)
    {
        console.log(resp);
        alert(resp.message);
    }
    else
        alert(resp.error);
}


document.querySelector('.submit_res').addEventListener('click',handleSubmit)


const getTables=async ()=>
{
    data={
        date:"",
        time_slot:"",
        capacity:""
    }
    data.date=t_data[0].value;
    data.time_slot=t_data[1].value;
    data.capacity=t_data[2].value;
    // const token=localStorage.getItem('token');
    const res=await fetch('https://resturant-booking-310m.onrender.com/getTables',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)

    })
    const resp=await res.json();
    console.log(resp);
    select_table.innerHTML=`<option value="" hidden>Select table</option>`;
    resp.forEach((table)=>
    {
        select_table.innerHTML+=` <option value="${table.T_id}">${table.T_id}</option>`
    })
}



t_data.forEach((input)=>
{
    input.addEventListener('change',()=>
    {
        if(t_data[0].value!=="" && t_data[1].value!=="" && t_data[2].value!=="" )
        {
            getTables();
        }
        else{
            console.log("error");
        }
    })
})

