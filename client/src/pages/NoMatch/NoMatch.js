import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "./noMatch.css";


class NoMatch extends React.Component {

  render() {

    return (
      <Container fluid>
        <Row>
          <div className="bgImage">
            <Col size="md-12">
              <div className="text">
                <h1>404 Page Not Found</h1>
                <h1>
                  <span role="img" aria-label="Face With Rolling Eyes Emoji">
                    🙄
                </span>
                </h1>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    )
  }
}

export default NoMatch;
