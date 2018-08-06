import Background from '../../../public/images/marble.png';

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`
};

class Background extends Component {
  render() {
    return (
      <section style={ sectionStyle }>
      </section>
    );
  }
}

export default Background;