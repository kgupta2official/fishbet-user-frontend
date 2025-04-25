
import dynamic from 'next/dynamic';
const Affiliate = dynamic(() => import('@/components/affiliate/components'));

export default function Page() {
  return <Affiliate />;
}