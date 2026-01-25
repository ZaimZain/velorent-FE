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



// import logoImage from "../../assets/VelorentLogo-nobg.png";
//
// export function VelorentLogo({ className = "" }: { className?: string }) {
//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       <img
//         src={logoImage}
//         alt="Velorent"
//         className="w-full max-w-[200px] h-auto object-contain dark:invert dark:brightness-0 dark:contrast-[1.2]"
//         style={{
//           mixBlendMode: 'multiply'
//         }}
//       />
//     </div>
//   );
// }
