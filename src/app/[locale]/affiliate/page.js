import dynamic from 'next/dynamic';

const Affiliate = dynamic(() => import('@/components/affiliate/components'), {
  ssr: false,
});

export default function Page() {
  return <Affiliate />;
}