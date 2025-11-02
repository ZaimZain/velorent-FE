type VelorentLogoProps = {
  fontSize?: string;
  className?: string;
};

const VelorentLogo = ({ fontSize = "1.5rem", className = "" }: VelorentLogoProps) => {
  return (
    <span
      className={`fw-bold ${className}`}
      style={{
        fontFamily: "Poppins, sans-serif",
        fontSize,
      }}
    >
      <span style={{ color: "#1E293B" }}>Velo</span>
      <span style={{ color: "#38BDF8" }}>Rent</span>
    </span>
  );
};

export default VelorentLogo;
