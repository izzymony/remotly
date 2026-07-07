'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface CompanyLogoProps {
  /** URL of the company logo image (optional — falls back to coloured initials). */
  companyLogoUrl?: string;
  /** Company name used to generate initials when no logo URL is available. */
  companyName?: string;
  /** Override the avatar background colour (e.g. pass `company.logo` for branded colours). */
  brandColor?: string;
  /** Side length in px (renders a square). Defaults to 40. */
  size?: number;
}

const AVATAR_COLORS = [
  '#6772E5', '#5E6AD2', '#F24E1E', '#10A37F',
  '#FCB400', '#625DF5', '#CC785C', '#F33F86',
  '#E94E4E', '#3D3D3D', '#000000', '#F05A22',
];

function getInitials(name?: string): string {
  if (!name) return 'JO';
  const words = name
    .replace(/[^a-zA-Z0-9\s&]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  return words.map((w) => w[0]?.toUpperCase() ?? '').join('').slice(0, 2) || 'JO';
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const CompanyLogo = ({ companyLogoUrl, companyName, brandColor, size = 40 }: CompanyLogoProps) => {
  const [imgError, setImgError] = useState(false);

  const showFallback = !companyLogoUrl || imgError;
  const initials = getInitials(companyName);
  const bgColor = brandColor || getColor(companyName ?? '');

  return (
    <div
      style={{ width: size, height: size, minWidth: size }}
      className="rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
    >
      {showFallback ? (
        <div
          style={{ width: size, height: size, backgroundColor: bgColor }}
          className="flex items-center justify-center rounded-xl"
        >
          <span
            style={{ fontSize: size * 0.35, color: '#fff', fontWeight: 700, letterSpacing: '-0.01em' }}
          >
            {initials}
          </span>
        </div>
      ) : (
        <Image
          src={companyLogoUrl}
          alt={`${companyName} logo`}
          width={size}
          height={size}
          className="object-contain rounded-xl"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default CompanyLogo;