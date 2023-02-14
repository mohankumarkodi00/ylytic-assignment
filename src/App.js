import {Component} from "react";
import "./App.css";

class CommentTable extends Component{
  state = {comments:[],inputText:""}
  


componentDidMount(){
  this.getComments()
}
getComments = async () =>{

  const apiUrl = "https://dev.ylytic.com/ylytic/test"
  const options = {
    method : "GET"
  }
  const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.comments.map(comment => ({
        at: comment.at,
        author: comment.author,
        like : comment.like,
        reply: comment.reply,
        text: comment.text,
      }))
      this.setState({
        comments: updatedData,
      
      })
    }

}

onchangeComment = event =>{
  const inputText = event.target.value
  this.setState({inputText:inputText})
  const {comments} = this.state
  const filteredcomments = comments.filter(comment =>comment.text.includes(inputText));
  this.setState({comments:filteredcomments})
}

keyDownHandler = (event) => {
  if (event.key === "Backspace") {
    this.getComments()
    this.onchangeComment(event)
    
  }
}
onChangeAuthor = event =>{
  const inputAuthor = event.target.value
  const {comments} = this.state
  const filteredcomments = comments.filter(comment =>comment.text.includes(inputAuthor));
  this.setState({comments:filteredcomments})
}
render(){
  
  const {comments} = this.state
  
  return (
    <div>
      <div className="search-align">
        <div>
          <p>Comment Search</p>
          <input type="search" onChange={this.onchangeComment} onKeyDown={this.keyDownHandler}/>
        </div>
        <div>
          <p>Author search</p>
          <input type = "search" onChange={this.onChangeAuthor} onKeyDown={this.keyDownHandler}/>
        </div>     
      </div>
      <table className="comment-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Author</th>
          <th>Likes</th>
          <th>Replies</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.id}>
            <td>{comment.at}</td>
            <td>{comment.author}</td>
            <td>{comment.like}</td>
            <td>{comment.reply}</td>
            <td>{comment.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </div>
    
  );
};
}

export default CommentTable;