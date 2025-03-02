"use client";

import Link from "next/link";
import Modal from "@/components/Modal";
import SendMoney from "@/components/SendMoney";
import ComingSoon from "@/components/ComingSoon";
import { useState, useEffect } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { axiosAuth } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import TextLoading from "@/components/TextLoading";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  description: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

interface User {
  userId: number;
  email: string;
  phoneNumber: string;
  password: string;
  name: string;
  AccountDetails?: AccountDetails;
  TransactionHistory: TransactionHistory[];
}

interface AccountDetails {
  accountNumber: number;
  accountBalance: number;
  userId: number;
  user?: User;
  TransactionHistory: TransactionHistory[];
}

interface TransactionHistory {
  transactionId: number;
  amount: number;
  receivingAccountNumber: number;
  date: Date;
  senderAccountId: number;
  senderAccount: AccountDetails;
  userUserId?: number;
  User?: User;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<User | null>(null);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] =
    useState<boolean>(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] =
    useState<boolean>(false);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosAuth.get("/api/v1/user/dashboard");
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setDashboardData(response?.data?.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleAfterSendMoneySuccess = () => {
    fetchDashboardData();
    closeAllModal();
  };

  const closeAllModal = () => {
    setIsComingSoonModalOpen(false);
    setIsSendMoneyModalOpen(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const transactions: Transaction[] = [
    {
      id: 1,
      type: "credit",
      amount: 5000,
      description: "Salary Deposit",
      timestamp: "2024-02-20 09:30",
      status: "success",
    },
    {
      id: 2,
      type: "debit",
      amount: 1500,
      description: "Electricity Bill",
      timestamp: "2024-02-19 14:15",
      status: "success",
    },
    {
      id: 3,
      type: "debit",
      amount: 200,
      description: "Wallet Transfer",
      timestamp: "2024-02-18 18:45",
      status: "pending",
    },
  ];

  const quickActions = [
    {
      name: "Add Money",
      icon: "➕",
      color: "bg-green-100",
      onClick: () => {
        setIsComingSoonModalOpen(true);
      },
    },
    {
      name: "Send Money",
      icon: "💸",
      color: "bg-blue-100",
      onClick: () => {
        setIsSendMoneyModalOpen(true);
      },
    },
    {
      name: "Pay Bills",
      icon: "🧾",
      color: "bg-purple-100",
      onClick: () => setIsComingSoonModalOpen(true),
    },
    {
      name: "Recharge",
      icon: "📱",
      color: "bg-yellow-100",
      onClick: () => setIsComingSoonModalOpen(true),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Modals remain unchanged */}
      <Modal
        isOpen={isSendMoneyModalOpen}
        onClose={() => setIsSendMoneyModalOpen(false)}
      >
        <SendMoney
          closeAllModal={closeAllModal}
          afterSendMoneySuccess={handleAfterSendMoneySuccess}
        />
      </Modal>
      <Modal
        isOpen={isComingSoonModalOpen}
        onClose={() => setIsComingSoonModalOpen(false)}
      >
        <ComingSoon />
      </Modal>

      <header className="mb-6 md:mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                Welcome, {dashboardData?.name ?? <TextLoading />}
              </h1>
              <Link
                href="/edit-profile"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors shrink-0"
              >
                <PencilSquareIcon className="h-5 w-5" />
                <span className="text-sm font-medium hidden xs:inline">
                  Edit Profile
                </span>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                Account:{" "}
                {dashboardData?.AccountDetails?.accountNumber ?? (
                  <TextLoading />
                )}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto mt-2 md:mt-0 bg-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <CurrencyRupeeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Balance</p>
                <h2 className="text-2xl sm:text-3xl font-bold animate-pulse">
                  ₹{" "}
                  {dashboardData?.AccountDetails?.accountBalance ?? (
                    <TextLoading />
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-6 md:mb-8 animate-slide-up">
        <h3 className="text-lg font-semibold mb-3 md:mb-4 text-gray-700">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 gap-2 sm:gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.color} p-4 sm:p-6 rounded-lg md:rounded-xl hover:scale-[1.02] transition-transform duration-200`}
            >
              <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                {action.icon}
              </span>
              <p className="text-sm sm:text-base font-medium">{action.name}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="animate-slide-up">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Transactions</h3>
          <Link
            href="/transactions"
            className="text-blue-600 text-sm hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 sm:p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div
                    className={`p-2 sm:p-3 rounded-full ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowUpIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                      <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate">{transaction.timestamp}</span>
                    </p>
                  </div>
                </div>
                <div className="min-w-[100px] text-right">
                  <p
                    className={`text-sm sm:text-base font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₹
                    {transaction.amount}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-xs sm:text-sm">
                    {transaction.status === "success" ? (
                      <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                    ) : transaction.status === "pending" ? (
                      <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                    ) : (
                      <XCircleIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                    )}
                    <span className="capitalize truncate">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
