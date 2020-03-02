import React from 'react'
import DB from '@/firebase/index'

const messageRef = DB.collection('message')

const App: React.FunctionComponent = () => {

    const [temp, setTemp] = React.useState('')
    const [message, setMessage] = React.useState(new Array())

    const [bool, setBool] = React.useState(false)

    React.useEffect(() => {
        messageRef.get().then((snapshot) => {
            const messages: React.SetStateAction<String[]> = []

            snapshot.forEach((doc) => {
                messages.push(doc.data().message)
            })

            setMessage(messages)
        })
    }, [bool])

    const handleSubmit = () => {
        messageRef.add({
            message: temp
        })

        setBool(! bool)
    }

    const create = (): JSX.Element[] => {
        const messages: JSX.Element[] = []

        message.forEach((value, key) => {
            messages.push(<div key={key}>{value}</div>)
        })

        return messages
    }

    return (
        <div>
            <input onChange={(event) => {setTemp(event.target.value)}}></input>
            <button
                type='button'
                onClick={() => {handleSubmit()}}>
            Send</button>
            <div>{create()}</div>
        </div>
    )
}

export default App