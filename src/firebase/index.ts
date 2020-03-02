import Firebase from 'firebase'
import Config from '@/firebase/config'

Firebase.initializeApp(Config)
export default Firebase.firestore()