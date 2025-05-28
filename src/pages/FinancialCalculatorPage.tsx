import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, CalendarClock, Percent, ArrowRight, AlertCircle } from 'lucide-react';

interface LoanResults {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  loanBreakdown: {
    principal: number;
    interest: number;
    month: number;
  }[];
}

const FinancialCalculatorPage = () => {
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [results, setResults] = useState<LoanResults | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);

  const calculateLoan = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = 
      principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
      (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - principal;
    
    // Calculate amortization schedule for the chart
    let remainingBalance = principal;
    const loanBreakdown = [];
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      // Store data points at intervals to keep the array size manageable
      if (month === 1 || month % Math.ceil(loanTerm / 12) === 0 || month === loanTerm) {
        loanBreakdown.push({
          month,
          principal: principalPayment,
          interest: interestPayment
        });
      }
    }
    
    setResults({
      monthlyPayment,
      totalInterest,
      totalPayment,
      loanBreakdown
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getAffordabilityMessage = () => {
    if (!results) return null;
    
    // Rule of thumb: monthly payment should be less than 15% of monthly income
    const estimatedIncome = results.monthlyPayment / 0.15;
    
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <AlertCircle size={18} className="mr-2" />
          Affordability Estimate
        </h3>
        <p className="text-sm text-gray-700 mb-2">
          Based on financial best practices, your estimated monthly payment of {formatCurrency(results.monthlyPayment)} 
          would be affordable with a monthly income of at least {formatCurrency(estimatedIncome)}.
        </p>
        <p className="text-sm text-gray-700">
          This is approximately {formatCurrency(estimatedIncome * 12)} annual income before taxes.
        </p>
      </div>
    );
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Auto Loan Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate your monthly payments, total interest, and determine what you can afford with our auto loan calculator.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Calculator size={20} className="mr-2 text-blue-900" />
              Loan Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                    className="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
                  Down Payment
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="downPayment"
                    value={downPayment}
                    onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                    className="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {((downPayment / loanAmount) * 100).toFixed(1)}% of vehicle price
                </div>
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (APR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Percent size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="interestRate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    step="0.1"
                    className="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (months)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarClock size={16} className="text-gray-400" />
                  </div>
                  <select
                    id="loanTerm"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={24}>24 months (2 years)</option>
                    <option value={36}>36 months (3 years)</option>
                    <option value={48}>48 months (4 years)</option>
                    <option value={60}>60 months (5 years)</option>
                    <option value={72}>72 months (6 years)</option>
                    <option value={84}>84 months (7 years)</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={calculateLoan}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                Calculate
              </button>
            </div>
            
            {getAffordabilityMessage()}
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            {results && (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Summary</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.monthlyPayment)}</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Principal</p>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(loanAmount - downPayment)}</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                      <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.totalInterest)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Loan Amount:</span>
                      <span className="font-medium">{formatCurrency(loanAmount - downPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-medium">{formatCurrency(downPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Loan Term:</span>
                      <span className="font-medium">{loanTerm} months ({Math.floor(loanTerm / 12)} years{loanTerm % 12 > 0 ? `, ${loanTerm % 12} months` : ''})</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-gray-700 font-medium">Total Cost:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(results.totalPayment + downPayment)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Breakdown</h2>
                    <button
                      onClick={() => setShowChart(!showChart)}
                      className="text-blue-900 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      {showChart ? 'Hide Chart' : 'Show Chart'}
                      <ArrowRight size={16} className={`ml-1 transition-transform ${showChart ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {showChart && (
                    <div className="mb-6">
                      <div className="h-64 w-full">
                        <div className="relative h-full">
                          <div className="absolute inset-0 flex items-end">
                            <div className="w-1/2 h-full bg-blue-100 flex items-end">
                              <div 
                                className="bg-blue-900 w-full" 
                                style={{ height: `${((loanAmount - downPayment) / results.totalPayment) * 100}%` }}
                              ></div>
                            </div>
                            <div className="w-1/2 h-full bg-green-100 flex items-end">
                              <div 
                                className="bg-green-600 w-full" 
                                style={{ height: `${(results.totalInterest / results.totalPayment) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        <div className="flex items-center mr-6">
                          <div className="w-4 h-4 bg-blue-900 mr-2"></div>
                          <span className="text-sm">Principal ({((loanAmount - downPayment) / results.totalPayment * 100).toFixed(1)}%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-600 mr-2"></div>
                          <span className="text-sm">Interest ({(results.totalInterest / results.totalPayment * 100).toFixed(1)}%)</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Loan Amortization</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Month
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Principal
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Interest
                            </th>
                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {results.loanBreakdown.map((payment) => (
                            <tr key={payment.month}>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {payment.month}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {formatCurrency(payment.principal)}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {formatCurrency(payment.interest)}
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {formatCurrency(payment.principal + payment.interest)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculatorPage;