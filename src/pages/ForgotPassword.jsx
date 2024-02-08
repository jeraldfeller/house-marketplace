import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {

  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset link sent to your email')
    }catch(error){
      toast.error('Something went wrong with signup')
    }
  }

    return (
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Forgot Password</p>
        </header>
        <main>
          <form action="" onSubmit={onSubmit}>
            <input 
            type="email" 
            id="email"
            value={email}
            onChange={onChange}
            className="emailInput" />
          </form>
          <Link className="forgotPasswordLink" to="/signin">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button type='button' className="signUpButton" onClick={onSubmit}>
              <ArrowRightIcon 
                fill="#ffffff" 
                width="32px"
                height="34px"
              />
            </button>
          </div>
        </main>
      </div>
    )
  }
  
  export default ForgotPassword
  