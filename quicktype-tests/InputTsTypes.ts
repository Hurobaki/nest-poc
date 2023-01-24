enum RentingStatus {
  'Rented' = 'Rented',
  'NotRented' = 'NotRented',
}

enum CarBrand {
  'Renault' = 'Renault',
  'Peugeot' = 'Peugeot',
  'Volkswagen' = 'Volkswagen',
  'Audi' = 'Audi',
}

type Renter = {
  name: string;
  surname: string;
  licenseNumber: number;
};

type RentedCarInformation = {
  rentingStatus: RentingStatus.Rented;
  rentStartDate: Date;
  rentEndDate: Date;
  renter: Renter;
};

type NotRentedCarInformation = {
  rentingStatus: RentingStatus.NotRented;
};

type RentingInformation = RentedCarInformation | NotRentedCarInformation;

type Car = {
  brand: CarBrand;
  model: string;
  rentingInformation: RentingInformation;
};
