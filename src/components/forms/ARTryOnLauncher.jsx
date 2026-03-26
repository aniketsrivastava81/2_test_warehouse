import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { progressionConfig } from '../../config/progression';
import { siteConfig } from '../../config/site';
import { useExperience } from '../../context/ExperienceContext';
import { trackEvent } from '../../utils/analytics';

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const value = clean.length === 3 ? clean.split('').map((char) => char + char).join('') : clean;
  const int = parseInt(value, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function colorDistance(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export default function ARTryOnLauncher({ compact = false }) {
  const navigate = useNavigate();
  const { selectedProduct, markPuzzleSolved } = useExperience();
  const product = selectedProduct;
  const [status, setStatus] = useState('');
  const [streamActive, setStreamActive] = useState(false);
  const [captureUrl, setCaptureUrl] = useState('');
  const [huntMatches, setHuntMatches] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const targetColors = useMemo(() => (product?.colors || ['#ffffff', '#000000', '#888888']).slice(0, 3).map(hexToRgb), [product]);

  useEffect(() => () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, []);

  const launchCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('Camera access is not available in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStreamActive(true);
      setStatus('Camera live. Position the shirt overlay on your torso.');
      trackEvent('ar_launch', { productId: product?.id || 'none' });
    } catch {
      setStatus('Camera permission was denied. You can still use the desktop preview.');
    }
  };

  const captureFrame = async () => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 1280;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = (product?.colors?.[0] || '#ffffff') + 'bb';
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.34, canvas.height * 0.26);
    ctx.lineTo(canvas.width * 0.66, canvas.height * 0.26);
    ctx.lineTo(canvas.width * 0.74, canvas.height * 0.6);
    ctx.lineTo(canvas.width * 0.26, canvas.height * 0.6);
    ctx.closePath();
    ctx.fill();
    const url = canvas.toDataURL('image/png');
    setCaptureUrl(url);
    trackEvent('ar_capture', { productId: product?.id || 'none' });
    if (navigator.share) {
      try {
        await navigator.share({ title: `${siteConfig.brandName} AR Fit`, text: `Sharing my fit with ${siteConfig.socialHashtag}` });
      } catch {
        // User may cancel sharing.
      }
    }
  };

  const handleHuntTap = (event) => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 1280;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.round(((event.clientY - rect.top) / rect.height) * canvas.height);
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgb = { r: pixel[0], g: pixel[1], b: pixel[2] };
    const targetIndex = targetColors.findIndex((target, index) => !huntMatches.includes(index) && colorDistance(rgb, target) < 120);
    if (targetIndex >= 0) {
      const next = [...huntMatches, targetIndex];
      setHuntMatches(next);
      setStatus(`Matched ${next.length}/3 colors.`);
      if (next.length === 3) {
        markPuzzleSolved('scavenger');
        setStatus(`Scavenger hunt complete. Reward code: ${progressionConfig.rewards.scavenger}`);
      }
    }
  };

  if (compact) {
    return <button type="button" className="ghost-button" onClick={() => navigate(ROUTES.ar)}>Try in AR</button>;
  }

  return (
    <div className="floating-info-panel ar-panel">
      <p className="eyebrow">AR Try-On</p>
      <h3>{product ? `Preview ${product.name}` : 'Preview the selected shirt'}</h3>
      <p>{isMobile ? 'Launch the camera, capture your look, then complete the color hunt.' : 'Desktop mode shows the control surface and camera fallback if your browser allows it.'}</p>
      <div className="button-stack inline-actions">
        <button type="button" className="primary-button" onClick={launchCamera}>Launch AR Camera</button>
        <button type="button" className="ghost-button" onClick={captureFrame} disabled={!streamActive}>Capture & Share</button>
      </div>
      <div className="ar-stage" onClick={handleHuntTap} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') handleHuntTap(event); }}>
        <video ref={videoRef} playsInline muted className="ar-video" />
        <div className="ar-shirt-overlay" style={{ background: product?.colors?.[0] || '#ffffff', borderColor: product?.accentColor || '#ffffff' }}>
          <span>{product?.name || 'Selected Tee'}</span>
        </div>
        {!streamActive ? <div className="ar-empty-state">Tap launch to enable the live preview.</div> : null}
      </div>
      <p className="tiny-copy">Capture & share with {siteConfig.socialHashtag}</p>
      <p className="tiny-copy">Color hunt: tap 3 real-world objects that match the garment palette.</p>
      {status ? <p className="success-copy">{status}</p> : null}
      {captureUrl ? <img src={captureUrl} alt="AR capture preview" className="capture-preview" /> : null}
      <canvas ref={captureCanvasRef} hidden />
    </div>
  );
}

ARTryOnLauncher.propTypes = {
  compact: PropTypes.bool,
};
