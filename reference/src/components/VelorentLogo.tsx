import logoImage from "figma:asset/1d5929251d486a23a0e0c4baa097ff17cda33da8.png";

export function VelorentLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={logoImage} 
        alt="Velorent" 
        className="w-full max-w-[200px] h-auto object-contain dark:invert dark:brightness-0 dark:contrast-[1.2]"
        style={{ 
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
}