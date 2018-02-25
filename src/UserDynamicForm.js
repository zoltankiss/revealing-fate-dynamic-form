import React from 'react';
import Usernames from './Usernames';
import DynamicForm from './DynamicForm';

const UserDynamicForm = ({ match }) => (
  <div>
    <Usernames username={match.params.username}/>
    <br />
    <DynamicForm />
  </div>
)

export default UserDynamicForm;
