// src/components/RoleCard.jsx
import React from 'react';

/**
 * Responsive RoleCard
 *
 * Props:
 * - label: "Candidate" | "Company"
 * - value: string (e.g., "candidate" or "company")
 * - selected: boolean
 * - onSelect: (value) => void
 * - className: extra classes (optional)
 *
 * Behavior:
 * - mobile (<sm): icon-only button (aria-label set to label)
 * - sm+: icon + label + subtitle shown
 */
export default function RoleCard({ label, value, selected, onSelect, className = '' }) {
  const isCandidate = label.toLowerCase().startsWith('cand');

  // Icons (inline SVGs)
  const CandidateIcon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const CompanyIcon = (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="5" y="3" width="14" height="17" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7h8M8 11h8M8 15h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const base = `flex items-center gap-3 p-3 rounded-md transition-transform focus:outline-none w-full text-left ${className}`;
  const selectedClasses = 'bg-primary border border-primary text-darkTextOnPrimary scale-100 shadow-sm';
  const normalClasses = 'bg-bg border border-border text-white';
  const rootClasses = `${base} ${selected ? selectedClasses : normalClasses} ${selected ? 'ring-2 ring-primary/50 flex justify-center ' : 'justify-center'}`;

  const subtitle = isCandidate ? 'Personal professional profile' : 'Company profile & jobs';

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      aria-label={label}
      className={rootClasses}
    >
      {/* Left: icon circle (always visible). On mobile this is the only visible content. */}
      <span
        className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 
          ${selected ? 'bg-darkTextOnPrimary text-primary' : 'bg-gray-800 text-white'}
        `}
      >
        {isCandidate ? CandidateIcon : CompanyIcon}
      </span>

      {/* Text block: hidden on xs, visible from sm and up */}
      <div className="hidden sm:flex flex-col">
        <span className="font-medium text-sm">{label}</span>
        {/* <span className="text-xs text-secondaryText">{subtitle}</span> */}
      </div>

     
    </button>
  );
}
