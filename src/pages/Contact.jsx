import {useState, useEffect} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast} from 'react-toastify'

function Contact() {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() => {
        const getLandLord = async () => {
            const docRef = doc(db, 'users', params.landlordId)
            const docSnap = await getDoc(docRef)
            console.log(params.landlordId);
            if(docSnap.exists()) {
                setLandlord(docSnap.data())
            }else{
                toast.error('Landlord not found')
            }
        }

        getLandLord()
    }, [params.landlordId])


    const onChange = (e) => setMessage(e.target.value)
        

  return <div className="pageContiner">
    <header>
        <p className="pageHeader">Contact Landloard</p>
    </header>
    {landlord !== null && (
        <main>
            <div className="contactLandloard">
                <p className="landlordName">Contact {landlord?.name}</p>
            </div>

            <form action="" className="messageForm">
                <div className="messageDiv">
                    <label htmlFor="message" className="messageLabel">
                        Message
                    </label>
                    <textarea name="message" id="message" className="textarea" value={message} onChange={onChange}></textarea>
                </div>
                <a href={`mailto:${landlord.email}?
                Subject=${searchParams.get('listingName')}
                &body=${message}`} className="contactLandloardBtn">
                    <button type='button' className="primaryButton">
                        Send Message
                    </button>
                </a>
            </form>
        </main>
    )}
  </div>
}

export default Contact
