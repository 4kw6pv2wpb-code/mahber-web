/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mahber — The Diaspora Super App';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#1a1a2e',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Tricolor top bar */}
        <div style={{ display: 'flex', height: 8, width: '100%' }}>
          <div style={{ flex: 1, background: '#078930' }} />
          <div style={{ flex: 1, background: '#FCDD09' }} />
          <div style={{ flex: 1, background: '#DA121A' }} />
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 36,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background: '#D4A017',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 38,
                fontWeight: 800,
                color: 'white',
              }}
            >
              M
            </div>
            <div style={{ display: 'flex', fontSize: 48, fontWeight: 800, color: '#D4A017' }}>
              Mahber
            </div>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            The Diaspora Super App
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              maxWidth: 700,
              lineHeight: 1.5,
              marginBottom: 40,
            }}
          >
            Connecting Ethiopian, Eritrean & Somali communities worldwide
          </div>

          {/* Feature pills row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center',
              maxWidth: 900,
            }}
          >
            {['Jobs', 'Housing', 'Dating', 'Marketplace', 'Remittance', 'Events', 'Videos', 'Community'].map(
              (feature) => (
                <div
                  key={feature}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: 50,
                    padding: '10px 24px',
                    fontSize: 17,
                    color: 'rgba(255,255,255,0.65)',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  {feature}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Bottom accent dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            paddingBottom: 28,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#078930' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FCDD09' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#DA121A' }} />
        </div>

        {/* URL bar at bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 20,
            fontSize: 16,
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 500,
          }}
        >
          mahber.com
        </div>
      </div>
    ),
    { ...size },
  );
}
