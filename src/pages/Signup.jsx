
import {useState} from 'react'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function Signup() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const {email, password, name} = formData

  const navigate = useNavigate()

  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password 
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    }catch(error) {
      toast.error('Something went wrong with signup')
    }
  }
    return (
     <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form action="" onSubmit={onSubmit}>
            <input type="text" className="nameInput" placeholder='Name' id="name" value={name} onChange={onChange}/>
            <input type="email" className="emailInput" placeholder='Email' id="email" value={email} onChange={onChange}/>
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='password' id='password' value={password} onChange={onChange} />
              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>

            <Link to='/forgot-password'
            className='forgotPasswordLink'>Forgot Password?</Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' height='34px' width='34px' />
              </button>
            </div>
          </form>
          
          <OAuth />
          
          <Link to='/signin' className='registerLink'>Signin Instead</Link>
        </main>
      </div>
     </>
    )
  }
  
  export default Signup
  