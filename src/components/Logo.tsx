import nimBasketLogoPng from '../assets/nim_basket_logo.png';   // white bg  → hero
import nimBasketLogoJpeg from '../assets/nimbasket_logo.jpeg';   // black bg  → footer

interface LogoProps {
  size?: 'small' | 'large';
  theme?: 'light' | 'dark';
}

export default function Logo({ size = 'large', theme = 'light' }: LogoProps) {
  const imgSize = size === 'large' ? 160 : 90;
  const isFooter = theme === 'dark';

  // Hero  : white-bg PNG  → mix-blend-mode multiply makes white transparent on light bg
  // Footer: black-bg JPEG → mix-blend-mode screen  makes black transparent on dark  bg
  const logoSrc = isFooter ? nimBasketLogoJpeg : nimBasketLogoPng;
  const blendMode = isFooter ? 'screen' : 'multiply';

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={logoSrc}
        alt="Nim Basket Logo"
        width={imgSize}
        height={imgSize}
        style={{ objectFit: 'contain', mixBlendMode: blendMode }}
      />
      <div
        style={{
          fontSize: size === 'large' ? '1.7rem' : '1.1rem',
          fontWeight: 800,
          color: isFooter ? '#ffffff' : '#b91c1c',
          letterSpacing: '0.02em',
        }}
      >
        Nim Basket
      </div>
    </div>
  );
}
