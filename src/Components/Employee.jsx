import React, { useState ,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify";


function Employee() {

  const employeeInfo = JSON.parse(localStorage.getItem('employees')) || [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com' },
  ];

      const [employeeData,setEmployeeData]=useState(employeeInfo);
      const [name,setName]=useState('');
      const [email,setEmail]=useState('');
      const [isEdit,setIsEdit]=useState(null);
      const [condition,setConditon]=useState(false);

      const [currentPage,setCurrentPage]=useState(1);
      const recordPPage=4;
      const lastPage=currentPage*recordPPage;
      const firstPage=lastPage-recordPPage;
      const recordsperPage=employeeData.slice(firstPage,lastPage);
      const npages=Math.ceil(employeeData.length/recordPPage);
      const Numbers=[...Array(npages).keys()].map(n=>n+1);
      console.log(Numbers)

      const [searchData,setSearchData]=useState(" ");
      const filterdData=employeeData.filter((items)=>(items.name.toLowerCase().includes(searchData.toLowerCase())))

      useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employeeData));
      }, [employeeData]);
      const deleteOne=(id)=>{
        setEmployeeData(employeeData.filter((values)=>(values.id!==id)));
        toast.error("task deleted");
      }

      const addEmployee=()=>{
        const newEmployee={id:uuidv4(),name:name,email:email};

      if(isEdit)
      {
        setEmployeeData(employeeData.map((values)=>(values.id===isEdit?{...values,name,email}:values)));
        setIsEdit(null);
        toast.success("Employee infomation updated")

      }
        else{
            setEmployeeData([newEmployee,...employeeData]);
            toast.success("Employee added")
        }

        setEmail('');
        setName('')
        
      }

      const editEmployee=(id,name,email)=>{
        setIsEdit(id);
  setName(name);
  setEmail(email);
  
      }
      console.log(isEdit);


      const prePage=()=>{
        if(currentPage!=1)
        {
            setCurrentPage(currentPage-1);
        }
      }
      const nextPage=()=>{
        if(currentPage!=npages)
        {
            setCurrentPage(currentPage+1)
        }
      }
      function changeCpage(id){
        setCurrentPage(id);
      }
      
      const recordsToShow = condition ?  filterdData : recordsperPage;
      console.log(condition);
      
  return (
    <div >

        <h1>Employee Details</h1>
      
            Name   <input
        type='text'
        placeholder='enter name of employee'
        value={name}
        onChange={(e)=>setName(e.target.value) ||setConditon(false)}
        class="form-control w-50 "
      
        />

        Email <input
         type="email"
         placeholder='enter email of employee'
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         className='form-control w-50'
        />
        <br></br>
      <button onClick={addEmployee} className='btn btn-success'>{isEdit?"edit":"add"}</button>

      <h2>Search Employee</h2>

      <input
      type='text'
      placeholder='search here '
      value={searchData}
      onChange={(e)=>setSearchData(e.target.value) || setConditon(true)}
        className='form-control w-50'
      />
      
      

        <table className="table  table-striped">
            <thead  className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
               {
                filterdData.length>0?(
                    recordsToShow.map((values,id)=>(
                        <tr key={id}>
                            <td>{values.id}</td>
                            <td>{values.name}</td>
                            <td>{values.email}</td>
                            <button className='btn btn-success' onClick={()=>editEmployee(values.id,values.name,values.email)}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>deleteOne(values.id)}>Delete</button>
                        </tr>
                    ))):<tr>no Data aviable</tr>
                }
                
                   
            </tbody>
        </table>
        <nav>
            <ul className='pagination'>
                <li className='page-item'>
                    <a href='#'onClick={prePage} className='page-link'>prev</a>
                </li>

                {
            Numbers.map((n,i)=>(
                <li className={`page-item ${currentPage===n ?'active':''}`}  key={i}>
                    <a href='#' className='page-link'
                    onClick={()=>changeCpage(n)}
                    >{n}</a>
                </li>
            ))
            
        }

                <li className='page-item'>
                    <a href='#' onClick={nextPage} className='page-link'>Next</a>
                </li>
            </ul>
        </nav>

      
    </div>
  )
}

export default Employee
