import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStateValue } from '../../store/Store';

export default function EditMe() {
    const [{user,api},dispatch]=useStateValue()
    const [name, setName] = useState(user.name)
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [err, setErr] = useState('')
const [passMsg, setPassMsg] = useState("")



const saveName=()=>{
axios.put(api+"/adminuser",{
    infoName:"name",
    data:name
},{
    headers:{
        token: localStorage.getItem('_atoken'),
    }
}).then(()=>{
    dispatch({type:"setName",payload:name})
}).catch(err=>{
    setErr(err.response.data)
})
}

const savePass=()=>{
axios.put(api+"/adminuser",{
    infoName:"password",
    data:{
        oldp:oldPass,
        newp:newPass
    }
},{
    headers:{
        token: localStorage.getItem('_atoken'),
    }
}).then(()=>{
    setPassMsg("Password Changed")
    setOldPass("")
    setNewPass("")
}).catch(err=>{
    setPassMsg(err.response.data)
})
}

  return (
  <>
  <p className="text-danger">{err}</p>
    <Form.Group className="mb-3 d-flex align-items-center" controlId="name">
      <Form.Label >Name: </Form.Label>
      <Form.Control type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <Button disabled={name===user.name} onClick={saveName} >Save</Button>
    </Form.Group>
  
    
    <Form.Group className="mb-3" controlId="pass">
        <p className='text-info'>{passMsg}</p>
      <Form.Label >Password: </Form.Label>
      <Form.Control type="password" placeholder="Old password" value={oldPass} onChange={(e)=>setOldPass(e.target.value)} />
      <Form.Control type="password" placeholder="New password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} />
        {oldPass && newPass && (<Button onClick={savePass}>Save</Button>)}
    </Form.Group></>
  );
}
