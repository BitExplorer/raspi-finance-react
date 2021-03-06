import { endpointUrl } from "../Common";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import Payment from "../model/Payment";

const deletePayment = async (payload: Payment): Promise<String> => {
  let endpoint = endpointUrl() + "/payment/delete/" + payload.paymentId;

  const response = await axios.delete(endpoint, {
    timeout: 0,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export default function usePaymentDelete() {
  const queryClient = useQueryClient();

  return useMutation(
    ["deletePayment"],
    (variables: any) => deletePayment(variables.oldRow),
    {
      onError: (error: AxiosError<any>) => {
        console.log(error ? error : "error is undefined.");
        console.log(
          error.response ? error.response : "error.response is undefined."
        );
        console.log(
          error.response
            ? JSON.stringify(error.response)
            : "error.response is undefined - cannot stringify."
        );
      },

      onSuccess: (response, variables) => {
        let oldData: any = queryClient.getQueryData("payment");
        // @ts-ignore
        let newData = oldData.filter(
          (t: any) => t.tableData.id !== variables.oldRow.tableData.id
        );
        queryClient.setQueryData("payment", newData);
      },
    }
  );
}
