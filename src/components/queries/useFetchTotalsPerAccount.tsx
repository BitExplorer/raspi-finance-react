import {endpointUrl} from "../Common"
import {useQuery} from "react-query"
import axios from "axios"

const fetchTotalsPerAccount = (accountNameOwner:any) => {
    return axios.get(
        endpointUrl() + "/transaction/account/totals/" + accountNameOwner,
        {
            timeout: 0,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }
    ).then(response => response.data)
}

const catchError = (error:any) => {
    if (error.response) {
        if (error.response.status === 404) {

        }
    }
    //handleError(error, 'fetchAccountData', true)
}

export default function useFetchTotalsPerAccount (accountNameOwner:any) {
    return useQuery(['totals', accountNameOwner], () => fetchTotalsPerAccount(accountNameOwner), {onError: catchError})
}