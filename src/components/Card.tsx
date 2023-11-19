import React from "react";

const Card = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card Title</h5>
                <p className="card-text">
                  This is a description of the card. You can add more details
                  here.
                </p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-primary">Like</button>
                  <button className="btn btn-outline-secondary">
                    Comments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
