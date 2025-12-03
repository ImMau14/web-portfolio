import React, { useState } from "react"
import { IoIosMail, IoIosCall } from "react-icons/io"

type TextData = {
  pageName: string
  header: string
  name: string
  email: string
  message: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
  send: string
}

interface ContactFormPromps {
  textData?: TextData
}

export const ContactForm = ({
  textData = {
    pageName: "Contact",
    header: "Contact",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "your@email.com",
    messagePlaceholder: "Your message",
    send: "Send",
  },
}: ContactFormPromps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)

  function validateEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required.")
      return
    }
    if (!validateEmail(email)) {
      setError("Invalid email")
      return
    }

    const form = ev.target as HTMLFormElement
    form.submit()
  }

  const inputStyles =
    "mt-1 block w-full rounded border p-2 border-silver-600 bg-silver-750 rounded-md font-body text-sm focus:outline-none hover:border-green-300/80 duration-150 text-silver-400"

  return (
    <form
      onSubmit={handleSubmit}
      action="https://formsubmit.co/immau140@gmail.com"
      method="POST"
      className="flex w-[90%] flex-col items-start gap-4 rounded-xl border-2 border-silver-700 bg-gradient-to-b from-silver-850 via-silver-900 to-silver-950 p-6 md:w-[500px]"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <div className="flex flex-row items-center gap-4">
        <IoIosCall class="text-3xl text-silver-500" />
        <h1 className="bg-gradient-to-b from-gray-100 via-gray-100 to-gray-300 bg-clip-text font-heading text-3xl font-bold text-transparent">
          {textData.header}
        </h1>
      </div>
      <label className="block w-full">
        <span className="block font-body text-sm text-gray-300">{textData.name}</span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputStyles}
          placeholder={textData.namePlaceholder}
        />
      </label>

      <label className="block w-full">
        <span className="block font-body text-sm text-gray-300">{textData.email}</span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyles}
          placeholder={textData.emailPlaceholder}
        />
      </label>

      <label className="block w-full">
        <span className="block font-body text-sm text-gray-300">{textData.message}</span>
        <textarea
          required
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputStyles} min-h-[140px]`}
          placeholder={textData.messagePlaceholder}
        />
      </label>

      {error && <div className="text-red-600">{error}</div>}

      <button
        type="submit"
        className="mt-2 flex w-full flex-row items-center justify-center gap-2 rounded-md bg-green-700 py-2 font-body text-sm font-semibold text-white hover:bg-green-600 active:bg-green-500"
      >
        <IoIosMail class="text-xl" />
        {textData.send}
      </button>
    </form>
  )
}

export default ContactForm
