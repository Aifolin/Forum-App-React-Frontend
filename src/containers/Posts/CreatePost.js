import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Posts.css";
import NavbarClass from '../NavbarClass'
import { useSelector, useDispatch } from "react-redux";
import { createPost } from '../../actions/postsAction';
import { Redirect } from 'react-router-dom';



const Register = () => {

  const currentState = useSelector((state) => state);

  const [post, setPost] = useState({
    title:'',
    content: '',
  });
  const dispatch = useDispatch()

  const addPost = (postDetails) => dispatch(createPost(postDetails))

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  const handleChange = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addPost({
      title: post.title,
      content: post.content,
      author_id: currentState.auth.currentUser.id
    });
  console.log("the current user id: ", currentState.auth.currentUser.id)

  }

  if(!currentState.auth.isAuthenticated){
    return <Redirect to='/login' />
  }

    return (
      <div className="App">
        <div>
          <NavbarClass />
        </div>
        <div className="post-style">
        <Card className="card-style">
          <CardHeader>Create Post</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>Title</Label>
            <Input type="text" name="title" placeholder="Enter title"  onChange={handleChange}/>
            { currentState.CreatePost.postError && currentState.CreatePost.postError.Required_title ? (
              <small className="color-red">{currentState.CreatePost.postError.Required_title}</small>
              ) : (
                ""
              )}
              { currentState.CreatePost.postError && currentState.CreatePost.postError.Taken_title ? (
              <small className="color-red">{ currentState.CreatePost.postError.Taken_title }</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Content</Label>
            <Input type="textarea" cols="30" rows="6" name="content" id="" placeholder="Enter a short description" onChange={handleChange} />
            { currentState.CreatePost.postError && currentState.CreatePost.postError.Required_content ? (
              <small className="color-red">{currentState.CreatePost.postError.Required_content}</small>
              ) : (
                ""
              )}
            </FormGroup>
            {/* <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { currentState.auth.authError && currentState.auth.authError.Required_password ? (
              <small className="color-red">{ currentState.auth.authError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.auth.authError && currentState.auth.authError.Invalid_password ? (
              <small className="color-red">{ currentState.auth.authError.Invalid_password }</small>
              ) : (
                ""
              )}
            </FormGroup> */}
            <Button
              color="primary"
              type="submit"
              block
            >
              Create Post
            </Button>
            </form>
            </CardBody>
          </Card>
        </div>
        </div>
    );
}

export default Register
