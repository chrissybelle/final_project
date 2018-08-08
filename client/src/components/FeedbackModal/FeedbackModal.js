import React from "react";
import PropTypes from 'prop-types';
import "./FeedbackModal.css";

class FeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // show: false
        }
    }


    // handleBtnClick = () => {
    //     // event.preventDefault();
    //     console.log("button clicked");
    //     var hide = function (elem) {
    //         elem.classList.remove('toggle-content');
    //     };
    // }
    closeModal = () => {
console.log("close");
    }


    render() {

        const { show } = this.props

        return (

            <div>
                {show ?

                    <div className=".is-visible">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 id="modalTitle" className="modal-title modalFont">Oops!</h5>
                                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                                </div>
                                <div className="modal-body">
                                    <p id="modalBody" className="modalFont">Please log in to start creating your recipe collection!</p>
                                </div>
                                <div className="modal-footer">
                                    <button id="closeModal" type="button" className="btn btn-primary" data-dismiss="modal"><a href="/home">Close</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    ""

                }
            </div>

        )
    }
}

FeedbackModal.propTypes = {
    show: PropTypes.bool
}

export default FeedbackModal;