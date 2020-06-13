import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    console.log("plantList component");
    super();
    this.state = {
      plants: [],
    };
  }
  // when the component mounts:
  componentDidMount() {
    console.log("PlantList component mounting");
    //   - fetch data from the server endpoint - http://localhost:3333/plants
    axios
      .get("http://localhost:3333/plants")
      .then((res) => {
        console.log(res.data);
        //   - set the returned plants array to this.state.plants
        this.setState({ plants: res.data.plantsData });
      })
      .catch((err) => console.log(err));
  }

  //trying stretch
  filterPlants = (plants) => {
    return plants.filter((plant) => {
      if (!this.state.searchTerm) {
        return plant;
      }
      if (
        plant.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        // || plant.difficulty.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      ) {
        return plant;
      }
    });
  };

  handleInputChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };
  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        <input
          onChange={this.handleInputChange}
          placeholder="Lookup plants by name"
        />
        {/* {this.state?.plants?.map((plant) => ( */}
        {this.filterPlants(this.state.plants).map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
