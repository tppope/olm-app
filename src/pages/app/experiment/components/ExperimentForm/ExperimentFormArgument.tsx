import { CFormFloating, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ArgumentBasic } from 'types'
import { UserExperimentArgInput } from '__generated__/graphql'

type Props = {
  argument: ArgumentBasic
  handleChange: (value: UserExperimentArgInput) => void
  val?: string
  className?: string
  style?: object
}

const ExperimentFormArgument: React.FC<Props> = ({
  argument,
  handleChange,
  val,
  className = '',
  style = {},
}: Props) => {
  const { t } = useTranslation()
  const [value, setValue] = useState<string>(val || argument?.default_value?.toString() || '')

  useEffect(() => {
    handleChange({
      name: argument.name,
      value: value,
    })
  }, [value, argument, handleChange])

  useEffect(() => {
    setValue(val !== undefined ? val : argument?.default_value?.toString() || '')
  }, [argument, val])

  return argument.options && argument.options.length ? (
    <div className={className} style={style}>
      <CFormLabel className="d-block">{argument.label}</CFormLabel>
      <CFormSelect
        aria-label="schema"
        id="schema"
        value={value}
        // required
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setValue(event.target.value)}
      >
        <option value="">{t('experiments.select_value')}</option>
        {argument.options.map((option) => (
          <option value={option?.value} key={option?.name}>
            {option?.name}
          </option>
        ))}
      </CFormSelect>
    </div>
  ) : (
    <CFormFloating className={className} style={style}>
      <CFormInput
        type="text"
        id={argument.name}
        value={value}
        required={true}
        placeholder={argument.label}
        // required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          // eslint-disable-next-line
          setValue(event.target.value.replace(/[^0-9\,.\]\[\s]/g, ''))
        }}
      />
      <CFormLabel>{argument.label}</CFormLabel>
    </CFormFloating>
  )
}

export default ExperimentFormArgument
