import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {

    constructor(props) {
        super(props);
        //console.log("Parent Constructor");
    }

    componentDidMount() {
       // console.log("Parent Component Did Mount");
    }

    render() {
        //console.log("Parent Render")
   return (
        <div>
            <h1>About</h1>
            <h2>This is namaste react.</h2>

            <UserClass name = {"First"} location = {"Delhi"} />
             <UserClass name = {"Second"} location = {"US"} />
        </div>
    );
    }
}

/* 

- Parent Constructor
- Parent Render
    - FirstChild Constructor
    - FirstChild Render
    
    - SecondChild Constructor
    - SecondChild Render
    
    <DOM UPDATED>
    - FirstChild ComponentDidMount
    - SecondChild ComponentDidMount
    - Parent ComponentDidMount

*/

export default About;