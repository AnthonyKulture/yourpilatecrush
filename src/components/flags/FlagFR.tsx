export default function FlagFR({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 3 2" 
      className={className} 
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1" height="2" fill="#002395"/>
      <rect x="1" width="1" height="2" fill="#fff"/>
      <rect x="2" width="1" height="2" fill="#ED2939"/>
    </svg>
  );
}
