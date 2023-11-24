const Card = ({ item }: any) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card">
              <img
                src={item.image}
                className="card-img-top"
                alt=""
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => alert("Not working yet")}
                    className="btn btn-outline-primary"
                  >
                    Like
                  </button>
                  <button
                    onClick={() => alert("Not working yet")}
                    className="btn btn-outline-secondary"
                  >
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
