

const Navbar = () => {
return(
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
  <div className="px-2 mx-2 navbar-start">
    <span className="text-lg font-bold">
            Image Gallery
          </span>
  </div> 
  <div className="hidden px-2 mx-2 navbar-center lg:flex">
    <div className="flex items-stretch">
      <a className="btn btn-ghost btn-sm rounded-btn">
              Home
            </a> 
      <a className="btn btn-ghost btn-sm rounded-btn">
              Upload
            </a> 
    </div>
  </div> 
</div>
)
}

export default Navbar;