import {endpointUrl} from "../Common";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";

const deleteAccount = (payload: any) => {
    let endpoint = endpointUrl() + "/account/delete/" + payload.accountNameOwner

    return axios.delete(endpoint, {
        timeout: 0,
        headers: {"Content-Type": "application/json"},
    }).then(response => response.data)
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

export default function useAccountDelete() {
    const queryClient = useQueryClient()

    return useMutation(['deleteAccount'], (variables:any) => deleteAccount(variables.oldRow), {onError: catchError,

        onSuccess: (response, variables) => {
            let oldData :any = queryClient.getQueryData('account')
            const dataDelete = [...oldData]
            const index = variables.oldRow.tableData.id
            dataDelete.splice(index, 1)
            let newData = [...dataDelete]
            queryClient.setQueryData('account', newData)
        }})
}