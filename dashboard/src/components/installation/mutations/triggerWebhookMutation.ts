import { commitMutation} from "react-relay"
import graphql from 'babel-plugin-relay/macro';

import { Environment } from "relay-runtime"

const mutation = graphql`
  mutation triggerWebhookMutation($iID: Int!, $eventID: String!) {
    sendWebhookForInstallation(iID: $iID, eventID: $eventID) {
      event
    }
  }
`

export const triggerWebhookMutation = (environment: Environment, installationID: number, eventID: string) => {
  const variables = {
    iID: installationID,
    eventID,
  }

  console.log(variables)
  commitMutation(environment, {
    mutation,
    variables,
    onError: err => console.error(err),
  })
}
