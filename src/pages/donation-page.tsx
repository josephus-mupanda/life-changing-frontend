import { useNavigate } from 'react-router';
import { DonationFlow } from './donation-flow';

export default function DonationPage() {
  const navigate = useNavigate();

  return (
    <DonationFlow onNavigate={(page) => navigate(page)} />
  );
}
