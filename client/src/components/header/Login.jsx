import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {

    super(props);

    this.state = {
      username: null,
      password: null,
      failedLogin: '',
      modalIsOpen: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.sendLogin = this.props.sendLogin.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleChange(e) {
    this.setState({ 
      [e.target.name]: e.target.value,
    })
  }

  handleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
      failedLogin: ''
    })
  }

  handleLogin(e) {
    this.props.sendLogin(this.state)
      .then(data => {
        this.handleModal();
        this.props.handleView('logout');
        this.props.history.push('/loggedinview');
        return data;
      })
      .then(({ data }) => this.props.setUser(data))
      .catch(err => this.setState({
        failedLogin: 'Incorrect username or password.'
      }));
  }

  render() {
    return (
      <Modal
        trigger={
          <Button onClick={this.handleModal}>
            Login
          </Button>
        }
        open={this.state.modalIsOpen}
        onClose={this.handleModal}
        size='mini'
        closeIcon
      >
        <Modal.Header>
          <Icon name='user circle outline' />  Login
      </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label='Username'
              placeholder='Username'
              name='username'
              type='text'
              onChange={this.handleChange}
            />
          <Form.Input
              label='Password'
              placeholder='Password'
              name='password'
              type='password'
              onChange={this.handleChange}
            />
          </Form>
          {
            this.state.failedLogin !== ''
              ?
              <Message
                error
                header='Error'
                content={this.state.failedLogin}
              />
              : null
          }
        </Modal.Content>
        <Modal.Actions>
        <Button basic color='grey' onClick={() => this.props.handleView('signup')}>Sign Up</Button>
          <Button color='green' onClick={this.handleLogin} inverted>
            <Icon name='sign in' /> Login
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withRouter(Login);

