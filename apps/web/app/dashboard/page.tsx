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
} from "@heroicons/react/20/solid";
import { axiosAuth } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Modal
        isOpen={isSendMoneyModalOpen}
        onClose={() => {
          setIsSendMoneyModalOpen(false);
        }}
      >
        <SendMoney
          closeAllModal={closeAllModal}
          afterSendMoneySuccess={handleAfterSendMoneySuccess}
        />
      </Modal>
      <Modal
        isOpen={isComingSoonModalOpen}
        onClose={() => {
          setIsComingSoonModalOpen(false);
        }}
      >
        <ComingSoon />
      </Modal>
      <header className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <Link href="/">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {dashboardData?.name}!
              </h1>
              <p className="text-gray-500">Your Paytm Wallet</p>
            </div>
          </Link>

          <div className="mt-4 md:mt-0 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <CurrencyRupeeIcon className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Available Balance</p>
                <h2 className="text-3xl font-bold animate-pulse">
                  ₹ {dashboardData?.AccountDetails?.accountBalance}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8 animate-slide-up">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              onClick={() => action.onClick()}
              key={index}
              className={`${action.color} p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300`}
            >
              <span className="text-3xl mb-2">{action.icon}</span>
              <p className="font-medium">{action.name}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="animate-slide-up">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Recent Transactions
        </h3>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowUpIcon className="h-6 w-6 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      {transaction.timestamp}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₹
                    {transaction.amount}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    {transaction.status === "success" ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : transaction.status === "pending" ? (
                      <ClockIcon className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span className="capitalize">{transaction.status}</span>
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
