import React from "react";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
// import addRestaurant from "../../firebase/addRestaurant";
import Form from "./Form";
import List from "./List";
import styles from "./restaurants.module.scss";
import { FormValues } from "./Form";

interface State {
  restaurants: Restaurant[];
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
  async componentDidMount() {
    const restaurants = await getRestaurantsByUserId("n23qMAUSzDR5GcPgQmlarnK0Ok43");
    this.setState({ restaurants });
  }

  initialValues: FormValues = {
    name: "",
    location: "",
    rating: 0,
    description: "",
    tags: "",
  };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [showForm, setShowForm] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);

  // const reset = () => {
  //   setShowForm(false);
  //   setFormValues(initialValues);
  // };

  handleOnSubmit = (restaurant: Restaurant) => {
    console.log("Submitted");
    // if (typeof restaurant.tags !== "string") {
    //   return;
    // }

    // let tags = restaurant.tags.split(" ");

    // addRestaurant({
    //   ...restaurant,
    //   tags,
    // });

    // reset();
  };

  render() {
    if (this.state.showAddNewForm) {
      return (
        <Form
          formValues={this.initialValues}
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
