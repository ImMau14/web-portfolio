import React, { useState } from "react"

export const ContactForm = () => {
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

  const inputStyles = "mt-1 block w-full rounded border p-2 border-gray-700/40 bg-gray-900/50 rounded-md"

  return (
    <form
      onSubmit={handleSubmit}
      action="https://formsubmit.co/immau140@gmail.com"
      method="POST"
      className="flex w-[90%] flex-col items-center gap-4 rounded-xl border-2 border-gray-900 p-6 md:w-[500px]"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <h1 className="bg-gradient-to-b from-gray-100 via-gray-100 to-gray-200 bg-clip-text font-heading text-2xl font-semibold text-transparent">
        Contact
      </h1>

      <label className="block w-full">
        <span className="block text-sm font-semibold text-gray-300">Name</span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputStyles}
          placeholder="Your name"
        />
      </label>

      <label className="block w-full">
        <span className="block text-sm font-semibold text-gray-300">Email</span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyles}
          placeholder="your@email.com"
        />
      </label>

      <label className="block w-full">
        <span className="block text-sm font-semibold text-gray-300">Message</span>
        <textarea
          required
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputStyles} min-h-[140px]`}
          placeholder="Your message"
        />
      </label>

      {error && <div className="text-red-600">{error}</div>}

      <button
        type="submit"
        className="mt-4 w-full rounded-xl border-2 border-lime-400/30 bg-[#648d2c] py-2 font-semibold text-white"
      >
        Send
      </button>
    </form>
  )
}

export default ContactForm
