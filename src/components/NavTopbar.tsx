const NavTopbar = () => {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 bg-white border-bottom"
      style={{ marginLeft: "250px" }}
    >
      <h5 className="m-0 fw-semibold">Dashboard</h5>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-arrow-repeat me-1"></i> Refresh
        </button>
        <button className="btn btn-primary btn-sm">
          <i className="bi bi-shop-window me-1"></i> View Marketplace
        </button>
      </div>
    </div>
  );
};

export default NavTopbar;
