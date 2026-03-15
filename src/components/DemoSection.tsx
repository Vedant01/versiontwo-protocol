import ProductDemo from "@/components/ProductDemo";

const DemoSection = () => {
  return (
    <section id="demo" className="px-6 md:px-12 lg:px-20 py-20 border-t border-grid/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-technical text-primary/50 block mb-4">001 / LIVE DEMO</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9] text-primary">
            SEE THE PROTOCOL<br />IN ACTION.
          </h2>
          <p className="font-body text-[15px] leading-[1.6] text-primary/70 mt-4 max-w-lg">
            Watch a complete governance cycle — from task creation to trust promotion. Every step is deterministic, verifiable, and on-chain.
          </p>
        </div>

        <ProductDemo />
      </div>
    </section>
  );
};

export default DemoSection;
