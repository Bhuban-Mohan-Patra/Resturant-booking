const getRes=async()=>
{
    try
    {
        const email=localStorage.getItem('email');
        const res=await fetch(`http://localhost:4600/user/reservation/${email}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    })
    const resp=await res.json();
    console.log(resp);
    resp.forEach((row,index)=>
{
    document.querySelector('.tbody').innerHTML+=`
    <tr>
    <td>${index+1}</td>
    <td>${row.b_date.split('T')[0]}</td>
    <td>${row.date.split('T')[0]}</td>
    <td>${row.time_slot}</td>
</tr>`
})
    }
    catch(e){console.log(e);}
}





getRes();