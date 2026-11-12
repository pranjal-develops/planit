import ThemeToggle from "../../common/components/Navbar/ThemeToggle"
import LoginForm from "../components/LoginForm"

const Login = () => {
  return (
    <div className='relative w-screen h-screen flex justify-center items-center overflow-auto'>
      <div className="absolute top-2 right-2">
        <ThemeToggle/>
      </div>
        <LoginForm type="login"/>
    </div>
  )
}

export default Login