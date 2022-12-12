import axios from 'axios';

class TutorialDataService {
  getAllProducts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }))
      .catch((error) => console.log(error));
  }
}

export default new TutorialDataService();