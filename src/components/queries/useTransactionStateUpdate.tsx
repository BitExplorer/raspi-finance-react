import axios from "axios";
import {endpointUrl} from "../Common";
import {useMutation, useQueryClient} from "react-query";
import {getAccountKey} from "./KeyFile";


const changeTransactionState =  (guid : any, newTransactionState: any) => {
    console.log('guid:' + guid)
    console.log('newTransactionState:' + newTransactionState)

    return axios.put(
        endpointUrl() + "/transaction/state/update/" + guid + "/" + newTransactionState, "{}", {
            timeout: 0,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }
    ).then(response => response.data)
}

const catchError = (error: any) => {
    console.log(error.response)
    console.log(JSON.stringify(error.response))
    if (error.response) {
        if (error.response.status === 404) {

        }
    }
    //handleError(error, 'fetchAccountData', true)
}

export default function useTransactionStateUpdate (accountNameOwner: any) {
    const queryClient = useQueryClient()

    return useMutation(['transactionState'], (variables: any) => changeTransactionState(variables.guid, variables.transactionState), {onError: catchError,

        onSuccess: (response, variables) => {
            let oldData :any = queryClient.getQueryData(getAccountKey(accountNameOwner))

            let newData = oldData.map((element: any) => {
                if (element["guid"] === variables.guid) {
                    return {...element, transactionState: variables.transactionState}
                } else {
                    return element
                }
            })

            queryClient.setQueryData(getAccountKey(accountNameOwner), newData)
        }})
}