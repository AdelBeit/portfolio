import {ActiveSectionProvider} from "./store/ActiveSectionStore";
import {WidthProvider} from "./store/WidthStore";

function Providers({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <WidthProvider>
      <ActiveSectionProvider>{children}</ActiveSectionProvider>
    </WidthProvider>
  );
}

export {Providers};
