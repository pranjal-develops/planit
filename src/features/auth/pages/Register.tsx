import ThemeToggle from '../../common/components/Navbar/ThemeToggle'
import SignUpForm from '../components/RegisterForm'


const Register = () => {
  return (
    <div className='relative w-screen h-screen flex justify-center items-center overflow-auto'>
      <div className="absolute top-2 right-2">
        <ThemeToggle/>
      </div>
        <SignUpForm />
    </div>
  )
}

export default Register