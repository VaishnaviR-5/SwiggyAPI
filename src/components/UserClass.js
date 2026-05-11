import React from "react";

class UserClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
                avatar_url: "htp://dummy-photo.com",
            }
        };
        //console.log("Child Constructor");
    }

   async componentDidMount() {
        //console.log("Child Component Did Mount");
      
        const data = await fetch("https://api.github.com/users/VaishnaviR-5");

        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        console.log(json);
    }
    render () {
       
        const { name, location, avatar_url } = this.state.userInfo;
      
        // console.log("Child Render");
        return (
    <div className="user-card">
         <img src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @vaishnavir5</h4>
    </div>
    );
    };
};

export default UserClass;