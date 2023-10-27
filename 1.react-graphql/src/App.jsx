import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap';

//Consultas GraphQL
const GET_USER_DETAILS = gql`
  query GetUserDetails($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      gender
      status
      posts(first: 5) {
        nodes {
          id
          title
          body
          comments(first: 2) {
            nodes {
              id
              body
            }
          }
        }
      }
    }
  }
`;

// Consulta GraphQL para obtener todos los usuarios
const GET_USERS = gql`
  query {
    users {
      nodes {
        id
        name
        email
        gender
        status
      }
    }
  }
`;

const UserDetails = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_DETAILS, {
    variables: { userId },
  });

  const [expandedPostId, setExpandedPostId] = useState(null);

  const handlePostDetailsClick = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;
  return (
    <Container>
      <h2>{user.name}'s Details</h2>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>Status: {user.status}</p>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <h3>Latest Posts:</h3>
        <ListGroup>
          {user.posts.nodes.map((post) => (
            <ListGroup.Item key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
              <button onClick={() => handlePostDetailsClick(post.id)}>
                Ver Detalles
              </button>
              {expandedPostId === post.id && (
                <div>
                  <h4>Comments:</h4>
                  <ListGroup>
                    {post.comments.nodes.map((comment) => (
                      <ListGroup.Item key={comment.id}>{comment.body}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};


function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [selectedUserId, setSelectedUserId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <Container>
      <h1>1. Reto de consumo de API y visualización/distribución de elementos.</h1>
      <Row>
        <Col md={4}>
          <div className="card">
            <h2>User List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.users.nodes.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
        <Col>
          {selectedUserId && <UserDetails userId={selectedUserId} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;