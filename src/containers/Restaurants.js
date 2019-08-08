import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RestaurantListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    restaurants: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchRestaurants: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchRestaurants } = this.props;

    this.setState({ loading: true });

    return fetchRestaurants(data)
      .then(() => { console.log('??', data);  })
      .then(() => this.setState({
        loading: false,
        error: null,
      })).catch(err => this.setState({
        loading: false,
        error: err,
      }));
  }

  render = () => {
    const { Layout, restaurants, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        restaurantId={id}
        error={error}
        loading={loading}
        restaurants={restaurants}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants || {},
});

const mapDispatchToProps = dispatch => ({
  fetchRestaurants: dispatch.restaurants.getRestaurants,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListing);
