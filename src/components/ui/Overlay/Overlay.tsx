interface OverlayProps {
  isSidePanelOpen: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({ isSidePanelOpen }) => (
  <div
    className={`fixed top-[64px] left-0 right-0 bottom-0 bg-black/50 z-[1000] transition-all duration-300 ${
      isSidePanelOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
  />
);
