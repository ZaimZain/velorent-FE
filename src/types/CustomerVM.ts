type CustomerVM = CustomerType & {
  totalRentals: number;
  totalSpent: number;
  currentRental: null | {
    carName: string;
    startDate: string;
    endDate: string;
  };
};
