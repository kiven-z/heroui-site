import { subtitle, title } from '@/components/primitives';

export default function IntegrationsPage() {
  return (
    <section className="flex flex-col items-start justify-center gap-4 py-8 md:py-10">
      <h1 className={title()}>Integrations</h1>
      <p className={subtitle()}>Connect with the tools and platforms you already use.</p>
    </section>
  );
}
