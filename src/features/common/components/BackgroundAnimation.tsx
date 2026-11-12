const BackgroundAnimation = () => {
  return (
    <div className = "hidden md:flex">
    <div className="fixed top-[5%] left-[5%] w-100 h-100 rounded-full animate-pulse blur-3xl  pointer-events-none
    bg-lime-500/10
    "></div>
    <div className="fixed bottom-[5%] right-[5%] w-100 h-100 rounded-full animate-pulse blur-3xl  pointer-events-none
 bg-[oklch(0.7_0.32_328/15%)] 
    "></div>
    </div>
  )
}

export default BackgroundAnimation