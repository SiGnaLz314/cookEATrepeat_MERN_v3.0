import React, { Component } from "react";
import axios from "axios";

const endpoint = "http://localhost:5000/fileUpload/upload/";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      selectedFile: null
    };
  }

  handleSelectedFile = e => {
    e.preventDefault();
    this.setState({
      description: e.target.value,
      selectedFile: e.target.files[0]
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpload = event => {
    event.preventDefault();

    const data = new FormData(event.target);
    data.append("file", this.state.selectedFile, this.state.description);

    axios.post(endpoint, data)
      .then(() => {
            window.location = '/';
      })
      .catch(error => {
        alert("Oops some error happened, please try again");
      });
  };

  render() {
    return (
      <div>
        <h4>Upload a new Document</h4>
            <form onSubmit={this.handleUpload}>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="description"
                      onChange={this.onChange}
                      placeholder="Description"
                    />
                </div>

                <div className="form-group">
                    <input
                      required
                      type="file"
                      name=""
                      id=""
                      onChange={this.handleSelectedFile}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Upload
                </button>
            </form>
      </div>
    );
  }
}

export default FileUpload;