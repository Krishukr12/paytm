import { useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
import { sendMoneyRequestSchema } from "@repo/zod-schemas/transactionRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosAuth } from "@/lib/axios";

interface SendMoneySchema {
  amount: number;
  receiverAccountNumber: string;
}

const SendMoney = ({
  closeAllModal,
  afterSendMoneySuccess,
}: {
  closeAllModal: () => void;
  afterSendMoneySuccess: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendMoneySchema>({
    resolver: zodResolver(sendMoneyRequestSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SendMoneySchema) => {
    console.log("hitting api");
    try {
      const response = await axiosAuth.post("/api/v1/transaction/send-money", {
        amount: Number(data.amount),
        receiverAccountNumber: Number(data.receiverAccountNumber),
      });
      if (response.data.success) {
        afterSendMoneySuccess();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    } finally {
      closeAllModal();
    }
  };

  return (
    <div className="max-w-md  p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Money</h2>
        <p className="text-gray-600">
          Transfer money to another account securely
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-700"
          >
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              {...register("amount")}
              type="number"
              id="amount"
              name="amount"
              placeholder="0.00"
              required
              className="appearance-none w-full pl-8 pr-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-gray-100 focus:bg-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          {errors.amount && (
            <ErrorMessage message={errors.amount.message ?? ""} />
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="receiverAccountNumber"
            className="block text-sm font-semibold text-gray-700"
          >
            Account Number
          </label>
          <div className="relative">
            <input
              {...register("receiverAccountNumber")}
              type="number"
              placeholder="Enter account number"
              id="receiverAccountNumber"
              name="receiverAccountNumber"
              className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 hover:bg-gray-100 focus:bg-white"
            />
            {errors.receiverAccountNumber && (
              <ErrorMessage
                message={errors.receiverAccountNumber.message ?? ""}
              />
            )}
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full disabled:cursor-wait disabled:opacity-50 mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? "Sending..." : "Send Money →"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Protected by bank-grade security</p>
      </div>
    </div>
  );
};

export default SendMoney;
