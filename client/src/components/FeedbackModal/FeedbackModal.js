import React from "react";
import PropTypes from 'prop-types';
import "./FeedbackModal.css";

class FeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render() {
        return (
            <div id="feedbackModal" className="modal" tabindex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="modalTitle" className="modal-title modalFont">Oops!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p id="modalBody" className="modalFont">This recipe was already saved - check your saved recipe list!</p>
                        </div>
                        <div className="modal-footer">
                            <button id="closeModal" type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeedbackModal;