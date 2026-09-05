import { subtitle, title } from '@/components/primitives';

export default function PricingPage() {
  return (
    <section className="flex flex-col items-start justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>Pricing</h1>
      <p className={subtitle()}>Plans and billing options.</p>
    </section>
  );
}
