import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { nanoid } from 'nanoid'

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('please enter your name'),
      email: Yup.string()
        .email('Invalid email address')
        .required('please enter your email'),
      message: Yup.string().required('please enter a message'),
      subject: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      setSubmitting(true)

      const postData = {
        id: nanoid(),
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      }

      axios
        .post(
          'https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',
          postData
        )
        .then(() => {
          setSubmitting(false)
          setSuccess(true)
          resetForm()
        })
        .catch(() => {
          setSubmitting(false)
          setError(true)
        })
    },
  })

  return (
    <>
      <div className='mt-12 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='mb-8 text-center font-bold text-4xl'>Contact Form</div>
        <div className=' py-8 px-6 shadow rounded-lg sm:px-10'>
          <form className='mb-0 space-y-6 ' onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                className='w-full border border-gray-200 px-3 py-2 mt-1 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                name='name'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <small className='text-red-300'>{formik.errors.name}</small>
              )}
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                className='w-full border border-gray-200 px-3 py-2
              mt-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                name='email'
                type='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <small className='text-red-300'>{formik.errors.email}</small>
              )}
            </div>
            <div>
              <label htmlFor='subject'>Subject</label>
              <input
                id='subject'
                className='w-full border border-gray-200 px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                name='subject'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.subject}
              />
            </div>
            <div>
              <label htmlFor='message'>Message</label>
              <textarea
                id='message'
                className='w-full border border-gray-200 px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                name='message'
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message && (
                <small className='text-red-300'>{formik.errors.message}</small>
              )}
            </div>
            <button
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-meduim text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:rign-offset-2 focus:ring-indigo-500'
              type='submit'
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            {success && <div>Form submitted successfully!</div>}
            {error && <div>Error submitting form. Please try again later.</div>}
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactForm

// import React, { useState } from 'react'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import axios from 'axios'

// function ContactForm() {
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       subject: '',
//       message: '',
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Please enter your name'),
//       email: Yup.string()
//         .email('Please enter a valid email')
//         .required('Please enter your email'),
//       message: Yup.string().required('Please enter a message'),
//     }),
//     onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
//       axios
//         .post('/api/contact', values)
//         .then(() => {
//           setSubmitting(false)
//           resetForm()
//           alert('Thank you for contacting us!')
//         })
//         .catch(() => {
//           setSubmitting(false)
//           setErrors({
//             submit:
//               'There was an error submitting your message. Please try again.',
//           })
//         })
//     },
//   })
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [subject, setSubject] = useState('')
//   const [message, setMessage] = useState('')
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [isError, setIsError] = useState(false)
//   const [errorMessages, setErrorMessages] = useState({
//     name: '',
//     email: '',
//     message: '',
//   })

//   const handleNameChange = (event) => {
//     setName(event.target.value)
//     setErrorMessages({ ...errorMessages, name: '' })
//   }

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value)
//     setErrorMessages({ ...errorMessages, email: '' })
//   }

//   const handleSubjectChange = (event) => {
//     setSubject(event.target.value)
//   }

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value)
//     setErrorMessages({ ...errorMessages, message: '' })
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     // send message to server or do any other necessary action here
//     setIsSubmitted(true)
//   }

//   if (!name) {
//     setErrorMessages({ ...errorMessages, name: 'Please enter your name' })
//   }
//   if (!email) {
//     setErrorMessages({ ...errorMessages, email: 'Please enter your email' })
//   }
//   if (!message) {
//     setErrorMessages({ ...errorMessages, message: 'Please enter a message' })
//   }

//   // email validation
//   const emailRegex = /^\S+@\S+\.\S+$/
//   if (email && !emailRegex.test(email)) {
//     setErrorMessages({ ...errorMessages, email: 'Please enter a valid email' })
//   }

//   // if no errors, submit form
//   if (!errorMessages.name && !errorMessages.email && !errorMessages.message) {
//     // send message to server or do any other necessary action here
//     setIsSubmitted(true)
//     setIsError(false)
//     setName('')
//     setEmail('')
//     setSubject('')
//     setMessage('')
//   } else {
//     setIsError(true)
//   }

//   return (
//     <div>
//       {formik.isSubmitting && <p>Sending message...</p>}
//       {formik.errors.submit && (
//         <p style={{ color: 'red' }}>{formik.errors.submit}</p>
//       )}
//       {formik.status && <p style={{ color: 'green' }}>{formik.status}</p>}
//       {!formik.isSubmitting && !formik.status && (
//         <form onSubmit={formik.handleSubmit}>
//           {isError && (
//             <p style={{ color: 'red' }}>
//               There was an error submitting your message. Please try again.
//             </p>
//           )}
//           <label>
//             Name:
//             <input
//               type='text'
//               name='name'
//               value={formik.values.name}
//               onChange={formik.handleChange}
//             />
//           </label>
//           {formik.touched.name && formik.errors.name && (
//             <p style={{ color: 'red' }}>{formik.errors.name}</p>
//           )}
//           <br />
//           <label>
//             Email:
//             <input
//               type='email'
//               name='email'
//               value={formik.values.email}
//               onChange={formik.handleChange}
//             />
//           </label>
//           {formik.touched.email && formik.errors.email && (
//             <p style={{ color: 'red' }}>{formik.errors.email}</p>
//           )}
//           <br />
//           <label>
//             Subject:
//             <input
//               type='text'
//               name='subject'
//               value={formik.values.subject}
//               onChange={formik.handleChange}
//             />
//           </label>
//           <br />
//           <label>
//             Message:
//             <textarea
//               name='message'
//               value={formik.values.message}
//               onChange={formik.handleChange}
//             />
//           </label>
//           {formik.touched.message && formik.errors.message && (
//             <p style={{ color: 'red' }}>{formik.errors.message}</p>
//           )}
//           <br />

//           <br />
//           <button type='submit' disabled={formik.isSubmitting}>
//             Send Message
//           </button>
//         </form>
//       )}
//     </div>
//   )
// }

// export default ContactForm

// // import React, { useState } from 'react'
// // import { nanoid } from 'nanoid'
// // import axios from 'axios'

// // const ContactForm = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     subject: '',
// //     message: '',
// //   })
// //   const [errors, setErrors] = useState({})

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value })
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     const errors = validateFormData(formData)
// //     if (Object.keys(errors).length > 0) {
// //       setErrors(errors)
// //       return
// //     }

// //     try {
// //       const response = await axios.post(
// //         'https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',
// //         {
// //           id: nanoid(),
// //           ...formData,
// //         }
// //       )
// //       console.log(response)
// //       setFormData({
// //         name: '',
// //         email: '',
// //         subject: '',
// //         message: '',
// //       })
// //       alert('Thank you for your inquiry! We will get back to you soon.')
// //     } catch (error) {
// //       console.error(error)
// //       alert('There was an error submitting your inquiry. Please try again.')
// //     }
// //   }

// //   const validateFormData = (data) => {
// //     const errors = {}

// //     if (!data.name) {
// //       errors.name = 'Name is required'
// //     }

// //     if (!data.email) {
// //       errors.email = 'Email is required'
// //     } else if (!/\S+@\S+\.\S+/.test(data.email)) {
// //       errors.email = 'Invalid email address'
// //     }

// //     if (!data.message) {
// //       errors.message = 'Message is required'
// //     }

// //     return errors
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div>
// //         <label htmlFor='name'>Name</label>
// //         <input
// //           type='text'
// //           id='name'
// //           name='name'
// //           value={formData.name}
// //           onChange={handleChange}
// //           required
// //         />
// //         {errors.name && <p className='error'>{errors.name}</p>}
// //       </div>
// //       <div>
// //         <label htmlFor='email'>Email</label>
// //         <input
// //           type='email'
// //           id='email'
// //           name='email'
// //           value={formData.email}
// //           onChange={handleChange}
// //           required
// //         />
// //         {errors.email && <p className='error'>{errors.email}</p>}
// //       </div>
// //       <div>
// //         <label htmlFor='subject'>Subject</label>
// //         <input
// //           type='text'
// //           id='subject'
// //           name='subject'
// //           value={formData.subject}
// //           onChange={handleChange}
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor='message'>Message</label>
// //         <textarea
// //           id='message'
// //           name='message'
// //           value={formData.message}
// //           onChange={handleChange}
// //           required
// //         />
// //         {errors.message && <p className='error'>{errors.message}</p>}
// //       </div>
// //       <button type='submit'>Submit</button>
// //     </form>
// //   )
// // }

// // export default ContactForm
