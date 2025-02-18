import React from 'react'
import { useTranslation } from 'react-i18next'
import { CCol, CRow } from '@coreui/react'

import { UserExperimentInput } from '__generated__/graphql'

type Props = {
  input: UserExperimentInput[]
}

const ShowUserExperimentInput: React.FC<Props> = ({ input }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <h5>{t('user_experiments.executed_commands')}:</h5>
      {input.map((input) => (
        <div className="mb-3" key={input.script_name}>
          <h5>{input.script_name}</h5>

          <ol className="ps-4">
            {input.input.map((commandInput, i) => (
              <React.Fragment key={i}>
                {commandInput.length > 0 && <li>
                  <CRow>
                    {commandInput.map((arg) => (
                      <CCol sm={6} key={arg.name}>
                        <strong>{arg.label || arg.name}</strong>:&nbsp;
                        <span>{arg.formatted_value || arg.value}</span>
                      </CCol>
                    ))}
                  </CRow>
                  {commandInput.length > 0 && <hr className="my-3" />}
                </li>}
              </React.Fragment>
            ))}
          </ol>
        </div>
      ))}
    </>
  )
}

export default ShowUserExperimentInput
