import React from 'react'
import { ApolloError } from '@apollo/client'
import { CAlert } from '@coreui/react'

interface Props {
  error?: ApolloError | string | string[]
}

const ErrorNotifier: React.FC<Props> = ({ error }: Props) => {
  if (!error) return <></>

  const formatError = () => {
    if (typeof error === 'string') return error
    if (Array.isArray(error))
      return (
        <ul className="mb-0">
          {error.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )

    const { graphQLErrors, message } = error
    const msg = graphQLErrors[0]?.message
    const reason = graphQLErrors[0]?.extensions?.reason
    const validation = graphQLErrors[0]?.extensions?.validation

    let validationList = null
    if (Object.prototype.toString.call(validation) === '[object Object]') {
      validationList = (
        <ul className="mb-0">
          {Object.entries(validation).map((entry) => {
            const [key, value] = entry
            return <li key={key}>{value as string}</li>
          })}
        </ul>
      )
    }

    return validationList || reason || msg || message || ''
  }

  return (
    <CAlert color="danger" className="py-2">
      {formatError()}
    </CAlert>
  )
}

export default ErrorNotifier
