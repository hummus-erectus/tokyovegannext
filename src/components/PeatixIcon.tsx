/**
 * Peatix brand mark — the green "P" speech-bubble icon extracted from
 * Peatix's official logo SVG (https://peatix.com). Wordmark stripped so
 * this works as a compact icon alongside text labels.
 *
 * Source: https://cdn.peatix.com/assets/production/static/images/peatix-logo-e60aa654c4c42c9b0f99074a66552e95.svg
 */
export function PeatixIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-5 -5 54 54"
      role="img"
      aria-label="Peatix"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M14.6,0.4c-0.2,0.1-0.3,0.3-0.3,0.6c0,0.3,0.2,0.6,0.5,0.6l0.9,0.2c0.3,0.1,0.5,0.3,0.5,0.6c0,0.3-0.2,0.5-0.3,0.5C13.2,4.6,0.8,8.1,1,23.6c0.1,8.7,6.1,16.8,11.8,19.1c1.6,0.7,3,0.4,3-0.1c0-0.3-0.7-1.4-0.7-1.4c-2.2-3.7-4.4-8.8-5.1-15.5c-0.4-3.9-1.4-14.9,13.1-15c7,0,13.1,4.6,12.4,13.3c-0.6,6.6-5.6,11-13.4,11.4c-0.9,0.1-1.7,0.9-1.3,2c0.6,1.7,2.3,7,6,6.3c9.6-2.3,17-9.9,16.9-20.3C43.5,8.6,30.4-0.1,17.6,0C15.1,0.1,14.6,0.4,14.6,0.4z"
      />
      <path
        fill="currentColor"
        d="M41.1,24.6C41,14.1,32.3,5.7,21.6,5.9C11,6,3.3,14.5,3.4,25.5c0.1,5.5,3.4,12.9,8.8,16.4c0.3,0.2,3.2,1.4,3.4,0.7c-0.1-0.4-0.6-1.4-0.6-1.4c-2.2-3.7-4.4-8.8-5.1-15.5c-0.4-3.9-1.4-14.9,13.1-15c7,0,13.1,4.6,12.4,13.3c-0.6,6.6-5.6,11-13.4,11.4c-0.9,0.1-1.7,0.9-1.3,2c0.4,1.2,1.4,4,3.1,5.5c0.6,0.6,2.2,0.3,2.8,0.2C34.7,40.9,41.2,33.4,41.1,24.6z"
      />
      <path
        fill="currentColor"
        d="M20.2,29c6-0.4,7.8-3.5,8-6.1c0.2-2.8-2-6.7-6.1-6.2c-5.9,0.8-5.7,5-5.5,6.7c0.1,1.3,0.4,2.4,0.7,3.4C17.8,27.9,18.8,29.1,20.2,29z"
      />
    </svg>
  );
}
