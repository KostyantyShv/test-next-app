interface OverlayProps {
  isSidePanelOpen: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({ isSidePanelOpen }) => (
  <div
    className={`fixed inset-0 bg-black/50 z-[1000] transition-all duration-300 ${
      isSidePanelOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
  />
);
