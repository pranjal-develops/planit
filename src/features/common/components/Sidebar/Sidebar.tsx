import NavbarLogo from "../Navbar/NavbarLogo";
import NavSection from "./NavSection";
import useResizableWidth from "./userResizeableWodth";
import UserSection from "./UserSection";

const Sidebar = () => {
  const { width, startResizing } = useResizableWidth({
    initialWidth: 300,
    minWidth: 240,
    maxWidth: 480,
  });

  return (
    // <div className='absolute top-0 left-0 min-w-75 w-[20vh] h-screen bg-lime-400'>
    <aside
      style={{ width: `${width}px` }}
      className="relative hidden h-full shrink-0 flex-col gap-2 border-r border-(--primary-border) px-3 py-5 lg:flex"
    >
      <NavbarLogo />
      <div className="flex flex-col justify-between h-full">
        {/* sdfass */}
        <NavSection />
        <UserSection />
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        onPointerDown={startResizing}
        className="absolute right-0 top-0 z-10 h-full w-0.5 cursor-col-resize touch-none transition-colors hover:bg-(--accent-bg)"
      />
    </aside>
  );
};

export default Sidebar;
