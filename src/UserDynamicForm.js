import React from 'react';
import Usernames from './Usernames';
import DynamicForm from './DynamicForm';

const UserDynamicForm = ({ match }) => (
  <div>
    <Usernames username={match.params.username}/>
    <br />
    <DynamicForm username={match.params.username}/>
  </div>
)

export default UserDynamicForm;
