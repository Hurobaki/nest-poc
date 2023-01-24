// Generated using the 'quicktype InputTsTypes.ts -o OutputSwiftJustTypes.swift --just-types'
//
// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse the JSON, add this file to your project and do:
//
//   let rentingStatus = try? JSONDecoder().decode(RentingStatus.self, from: jsonData)
//   let carBrand = try? JSONDecoder().decode(CarBrand.self, from: jsonData)
//   let renter = try Renter(json)
//   let rentedCarInformation = try RentedCarInformation(json)
//   let notRentedCarInformation = try NotRentedCarInformation(json)
//   let rentingInformation = try RentingInformation(json)
//   let car = try Car(json)

import Foundation

// MARK: - Renter
struct Renter {
    let licenseNumber: Double
    let name, surname: String
}

// MARK: - RentedCarInformation
struct RentedCarInformation {
    let rentEndDate: Date
    let renter: RentedCarInformationRenter
    let rentingStatus: RentedCarInformationRentingStatus
    let rentStartDate: Date
}

// MARK: - RentedCarInformationRenter
struct RentedCarInformationRenter {
    let licenseNumber: Double
    let name, surname: String
}

enum RentedCarInformationRentingStatus {
    case rented
}

// MARK: - NotRentedCarInformation
struct NotRentedCarInformation {
    let rentingStatus: NotRentedCarInformationRentingStatus
}

enum NotRentedCarInformationRentingStatus {
    case notRented
}

// MARK: - Car
struct Car {
    let brand: CarBrand
    let model: String
    let rentingInformation: RentingInformation
}

enum CarBrand {
    case audi
    case peugeot
    case renault
    case volkswagen
}

// MARK: - RentingInformation
struct RentingInformation {
    let rentEndDate: Date?
    let renter: RentingInformationRenter?
    let rentingStatus: RentingStatus
    let rentStartDate: Date?
}

// MARK: - RentingInformationRenter
struct RentingInformationRenter {
    let licenseNumber: Double
    let name, surname: String
}

enum RentingStatus {
    case notRented
    case rented
}
