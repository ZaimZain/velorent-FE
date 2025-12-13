import logoImage from "figma:asset/VelorentLogo-nobg.png";

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