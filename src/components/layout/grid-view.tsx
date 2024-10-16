type Props = {
  children: React.ReactNode;
};

export const GridView = ({ children }: Props) => {
  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </section>
  );
};

export const GridViewSkeleton = ({ children }: Props) => {
  return (
    <section className="w-full" aria-busy="true" aria-label="Loading overview">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </section>
  );
};
