import React from 'react';


const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map( (user, index) => (
          <tr key={`user#${index}`}>
            <td>{ user.name }</td>
            <td>{ user.username }</td>
            <td>
              <button className="button muted-button"
                      onClick={ () => props.editUser(user)}>Edit</button>
              <button className="button muted-button"
                      onClick= {() => props.deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))
      ):(
        <tr>
          <td colspan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable;
