import { useNavigate } from 'react-router-dom';
import { getVaultProducts } from '../config/products';
import { ROUTES } from '../config/routes';
import GallerySpace from '../components/3d/GallerySpace';
import TShirtModel from '../components/3d/TShirtModel';
import PortalGate from '../components/3d/PortalGate';

export default function VaultRoom() {
  const navigate = useNavigate();
  const vaultProducts = getVaultProducts().slice(0, 4);
  const positions = [
    [-4.2, 1.7, -0.8],
    [-1.4, 1.7, 0.5],
    [1.4, 1.7, 0.5],
    [4.2, 1.7, -0.8],
  ];

  return (
    <group>
      <GallerySpace tint="#090c14" particleColor="#8fa9ff" />
      {vaultProducts.map((product, index) => (
        <group key={product.id} position={positions[index]}>
          <mesh position={[0, -0.68, 0]}>
            <cylinderGeometry args={[0.95, 1.1, 1.2, 20]} />
            <meshStandardMaterial color="#131b2c" metalness={0.25} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[2.05, 3.2, 1.45]} />
            <meshStandardMaterial color="#a9c1ff" transparent opacity={0.14} metalness={0.5} roughness={0.06} />
          </mesh>
          <TShirtModel product={product} position={[0, 0.25, 0]} scale={1.02} />
        </group>
      ))}
      <PortalGate label="Return to Gallery" slug="return" position={[0, 2.2, -5.6]} onEnter={() => navigate(ROUTES.home)} />
    </group>
  );
}
