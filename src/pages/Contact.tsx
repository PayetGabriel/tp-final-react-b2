import { useState } from 'react'
import type { FormEvent } from 'react'

export default function Contact() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (nom === '') {
      setErreur('Le nom est obligatoire')
      setSucces(false)
      return
    }

    if (!email.includes('@')) {
      setErreur("L'email n'est pas valide")
      setSucces(false)
      return
    }

    if (message === '') {
      setErreur('Le message est obligatoire')
      setSucces(false)
      return
    }

    setErreur('')
    setSucces(true)
    setNom('')
    setEmail('')
    setMessage('')
  }

  return (
    <div>
      <h1>Contact</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        {erreur !== '' && <p>{erreur}</p>}
        {succes && <p>Message envoyé avec succès</p>}

        <button type="submit">Envoyer</button>
      </form>
    </div>
  )
}