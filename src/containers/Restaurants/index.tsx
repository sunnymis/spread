import React from "react";
import getRestaurantsByUserId from "../../firebase/getRestaurantsByUserId";
// import addRestaurant from "../../firebase/addRestaurant";
// import Form from "./Form";
// import List from "./List";
import styles from "./restaurants.module.scss";
// import { FormValues } from "./Form";

class Restaurants extends React.Component<{}, { restaurants: any[] }> {
  constructor(props: any) {
    super(props);

    this.state = {
      restaurants: [],
    };
  }
  async componentDidMount() {
    const res = await getRestaurantsByUserId("n23qMAUSzDR5GcPgQmlarnK0Ok43");
    this.setState({ restaurants: res });
  }

  // const initialValues: FormValues = {
  //   name: "",
  //   location: "",
  //   rating: 0,
  //   description: "",
  //   tags: "",
  // };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [showForm, setShowForm] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);

  // useEffect(() => {
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const reset = () => {
  //   setShowForm(false);
  //   setFormValues(initialValues);
  // };

  // const handleOnSubmit = (restaurant: Restaurant) => {
  //   if (typeof restaurant.tags !== "string") {
  //     return;
  //   }

  //   let tags = restaurant.tags.split(" ");

  //   addRestaurant({
  //     ...restaurant,
  //     tags,
  //   });

  //   reset();
  // };

  render() {
    return (
      <div className={styles.app}>
        <h1>{JSON.stringify(this.state.restaurants)}</h1>
      </div>
      //   {showForm ? (
      //     <div>
      //       <Form formValues={formValues} onSubmit={handleOnSubmit} onCancel={reset} />
      //     </div>
      //   ) : (
      //     <div>
      //       <List restaurants={restaurants || []} />
      //       <button className={styles.addButton} onClick={() => setShowForm(true)}>
      //         <i className="material-icons md-48">add</i>
      //       </button>
      //     </div>
      //   )}
      // </div>
    );
  }
}

export default Restaurants;
