import React from "react";

import "./style.css";

import Place from "../Place";

class Places  extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            places: []
        }

        this.id = this.props.id

        this.chargerPlaces = this.chargerPlaces.bind(this)
    }

    chargerPlaces() {

    }

    render() {
        return (
            <div className="places-container">
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
                <Place id={this.id}/>
            </div>
        );
    }
}

export default Places;
