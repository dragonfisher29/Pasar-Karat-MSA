type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="76" x2="436" y1="64" y2="448" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6B38D4" />
          <stop offset="0.52" stopColor="#8455EF" />
          <stop offset="1" stopColor="#008096" />
        </linearGradient>
        <linearGradient id="logo-shadow" x1="152" x2="364" y1="152" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5516BE" stopOpacity="0.34" />
          <stop offset="1" stopColor="#004E5C" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <rect fill="url(#logo-bg)" height="448" rx="120" width="448" x="32" y="32" />
      <rect fill="url(#logo-shadow)" height="72" rx="12" width="248" x="132" y="338" />
      <path d="M155 161H357L378 234H134L155 161Z" fill="#F8FAFC" />
      <path d="M155 161H193L183 234H134L155 161Z" fill="#FFFFFF" />
      <path d="M202 161H240L236 234H187L202 161Z" fill="#F2F3FF" />
      <path d="M249 161H287L289 234H240L249 161Z" fill="#FFFFFF" />
      <path d="M296 161H334L343 234H294L296 161Z" fill="#F2F3FF" />
      <path d="M319 161H357L378 234H329L319 161Z" fill="#FFFFFF" />
      <path d="M134 234H183V251C183 268.673 168.673 283 151 283C141.611 283 134 275.389 134 266V234Z" fill="#F8FAFC" />
      <path d="M183 234H232V251C232 268.673 217.673 283 200 283C190.611 283 183 275.389 183 266V234Z" fill="#FFFFFF" />
      <path d="M232 234H281V251C281 268.673 266.673 283 249 283C239.611 283 232 275.389 232 266V234Z" fill="#F8FAFC" />
      <path d="M281 234H330V251C330 268.673 315.673 283 298 283C288.611 283 281 275.389 281 266V234Z" fill="#FFFFFF" />
      <path d="M330 234H378V251C378 268.673 363.673 283 346 283C336.611 283 330 275.389 330 266V234Z" fill="#F8FAFC" />
      <rect fill="#F8FAFC" height="84" rx="4" width="18" x="145" y="288" />
      <rect fill="#F8FAFC" height="84" rx="4" width="18" x="349" y="288" />
      <path d="M186 313C186 308.582 189.582 305 194 305C198.418 305 202 308.582 202 313V324H208V313C208 308.582 211.582 305 216 305C220.418 305 224 308.582 224 313V324H230V313C230 308.582 233.582 305 238 305C242.418 305 246 308.582 246 313V341H186V313Z" fill="#F8FAFC" />
      <path d="M262 324C262 313.507 270.507 305 281 305C287.104 305 292.536 307.877 296 312.348C299.464 307.877 304.896 305 311 305C321.493 305 330 313.507 330 324V341H262V324Z" fill="#F8FAFC" />
      <rect fill="#F8FAFC" height="82" rx="12" width="256" x="128" y="350" />
    </svg>
  );
}
