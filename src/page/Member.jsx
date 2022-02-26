import React from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import Addnew from '../components/member/Addnew';
import EditMe from '../components/member/EditMe';
import ListUser from '../components/member/ListUser';
import { useStateValue } from '../store/Store';

export default function Member() {
  const [{ user }] = useStateValue();
  return (
    <Container>
      <h1>{user.name}</h1>
      <h3>{user.role}</h3>
      <h6>{user.email}</h6>
      <h6>
        <span>Since: {new Date(user.createdAt).toLocaleDateString()}</span>{' '}
        <br />
        <span>
          Added By: {user.addedBy?.name} | {user.addedBy?.role}
        </span>
      </h6>
      <hr />
      <div>
        <Tabs
          defaultActiveKey="list"
          transition={true}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="list" title="List">
            <ListUser />
          </Tab>
         {user.role==='admin'&& <Tab eventKey="addnew" title="Add New">
            <Addnew />
          </Tab>}
          <Tab eventKey="editme" title="Edit Me">
         <EditMe />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}
