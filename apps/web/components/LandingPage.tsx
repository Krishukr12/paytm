import Link from "next/link";
import Image from "next/image";

const LandingPage = (): React.ReactNode => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="http://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo_new.svg"
                alt="WalletApp"
                width={120}
                height={40}
                className="h-8 sm:h-8 md:h-10 lg:h-12"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Personal
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Business
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Developer
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Company
              </Link>
            </div>
            <Link href="/signin">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              India&apos;s Most-loved Payments App
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Recharge & pay bills, book flights & movie tickets, open a savings
              account, invest in stocks & mutual funds, and do a lot more.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Download App
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Money Transfer
              </h3>
              <p className="mt-2 text-gray-500">
                Instant bank-to-bank transfers 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
