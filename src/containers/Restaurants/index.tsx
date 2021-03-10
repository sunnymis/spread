import React from "react";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
import addRestaurant from "../../firebase/addRestaurant";
import Form from "./Form";
import List from "./List";
import styles from "./restaurants.module.scss";
import { FormValues, Restaurant, RestaurantDTO } from "../../types/restaurant";
import transformFormValuesToRestaurant from "../../util/transformFormValuesToRestaurant";

interface State {
  restaurants: RestaurantDTO[];
  showAddNewForm: boolean;
}
class Restaurants extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      restaurants: [],
      showAddNewForm: false,
    };
  }

  componentDidMount() {
    console.log("Fetching!!");
    this.fetchRestaurants();
  }

  async fetchRestaurants() {
    const restaurants = await getRestaurantsByUserId("n23qMAUSzDR5GcPgQmlarnK0Ok43");
    this.setState({ restaurants });
  }

  handleOnSubmit = async (formValues: FormValues) => {
    const restaurant = transformFormValuesToRestaurant(formValues);

    await addRestaurant({ ...restaurant });

    this.setState({ showAddNewForm: false });
    this.fetchRestaurants();
  };

  render() {
    if (this.state.showAddNewForm) {
      const initialValues: FormValues = {
        name: "",
        location: "location",
        rating: 3,
        description: "some description",
        tags: "some tags",
      };

      return (
        <Form
          formValues={initialValues}
          onSubmit={this.handleOnSubmit}
          onCancel={() => console.log("reset form")}
        />
      );
    }

    return (
      <div className={styles.app}>
        <div>
          <List restaurants={this.state.restaurants} />
          <button
            className={styles.addButton}
            onClick={() => this.setState({ showAddNewForm: true })}
          >
            <i className="material-icons md-48">add</i>
          </button>
        </div>
      </div>
    );
  }
}

export default Restaurants;
