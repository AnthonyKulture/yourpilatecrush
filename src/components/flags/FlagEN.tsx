export default function FlagEN({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 60 30" 
      className={className} 
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );
}
