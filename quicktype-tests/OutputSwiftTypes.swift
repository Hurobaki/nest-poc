// Generated using the 'quicktype InputTsTypes.ts -o OutputSwiftTypes.swift'
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
struct Renter: Codable {
    let licenseNumber: Double
    let name, surname: String
}

// MARK: Renter convenience initializers and mutators

extension Renter {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(Renter.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        licenseNumber: Double? = nil,
        name: String? = nil,
        surname: String? = nil
    ) -> Renter {
        return Renter(
            licenseNumber: licenseNumber ?? self.licenseNumber,
            name: name ?? self.name,
            surname: surname ?? self.surname
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

// MARK: - RentedCarInformation
struct RentedCarInformation: Codable {
    let rentEndDate: Date
    let renter: RentedCarInformationRenter
    let rentingStatus: RentedCarInformationRentingStatus
    let rentStartDate: Date
}

// MARK: RentedCarInformation convenience initializers and mutators

extension RentedCarInformation {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(RentedCarInformation.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        rentEndDate: Date? = nil,
        renter: RentedCarInformationRenter? = nil,
        rentingStatus: RentedCarInformationRentingStatus? = nil,
        rentStartDate: Date? = nil
    ) -> RentedCarInformation {
        return RentedCarInformation(
            rentEndDate: rentEndDate ?? self.rentEndDate,
            renter: renter ?? self.renter,
            rentingStatus: rentingStatus ?? self.rentingStatus,
            rentStartDate: rentStartDate ?? self.rentStartDate
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

// MARK: - RentedCarInformationRenter
struct RentedCarInformationRenter: Codable {
    let licenseNumber: Double
    let name, surname: String
}

// MARK: RentedCarInformationRenter convenience initializers and mutators

extension RentedCarInformationRenter {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(RentedCarInformationRenter.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        licenseNumber: Double? = nil,
        name: String? = nil,
        surname: String? = nil
    ) -> RentedCarInformationRenter {
        return RentedCarInformationRenter(
            licenseNumber: licenseNumber ?? self.licenseNumber,
            name: name ?? self.name,
            surname: surname ?? self.surname
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

enum RentedCarInformationRentingStatus: String, Codable {
    case rented = "Rented"
}

// MARK: - NotRentedCarInformation
struct NotRentedCarInformation: Codable {
    let rentingStatus: NotRentedCarInformationRentingStatus
}

// MARK: NotRentedCarInformation convenience initializers and mutators

extension NotRentedCarInformation {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(NotRentedCarInformation.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        rentingStatus: NotRentedCarInformationRentingStatus? = nil
    ) -> NotRentedCarInformation {
        return NotRentedCarInformation(
            rentingStatus: rentingStatus ?? self.rentingStatus
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

enum NotRentedCarInformationRentingStatus: String, Codable {
    case notRented = "NotRented"
}

// MARK: - Car
struct Car: Codable {
    let brand: CarBrand
    let model: String
    let rentingInformation: RentingInformation
}

// MARK: Car convenience initializers and mutators

extension Car {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(Car.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        brand: CarBrand? = nil,
        model: String? = nil,
        rentingInformation: RentingInformation? = nil
    ) -> Car {
        return Car(
            brand: brand ?? self.brand,
            model: model ?? self.model,
            rentingInformation: rentingInformation ?? self.rentingInformation
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

enum CarBrand: String, Codable {
    case audi = "Audi"
    case peugeot = "Peugeot"
    case renault = "Renault"
    case volkswagen = "Volkswagen"
}

// MARK: - RentingInformation
struct RentingInformation: Codable {
    let rentEndDate: Date?
    let renter: RentingInformationRenter?
    let rentingStatus: RentingStatus
    let rentStartDate: Date?
}

// MARK: RentingInformation convenience initializers and mutators

extension RentingInformation {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(RentingInformation.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        rentEndDate: Date?? = nil,
        renter: RentingInformationRenter?? = nil,
        rentingStatus: RentingStatus? = nil,
        rentStartDate: Date?? = nil
    ) -> RentingInformation {
        return RentingInformation(
            rentEndDate: rentEndDate ?? self.rentEndDate,
            renter: renter ?? self.renter,
            rentingStatus: rentingStatus ?? self.rentingStatus,
            rentStartDate: rentStartDate ?? self.rentStartDate
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

// MARK: - RentingInformationRenter
struct RentingInformationRenter: Codable {
    let licenseNumber: Double
    let name, surname: String
}

// MARK: RentingInformationRenter convenience initializers and mutators

extension RentingInformationRenter {
    init(data: Data) throws {
        self = try newJSONDecoder().decode(RentingInformationRenter.self, from: data)
    }

    init(_ json: String, using encoding: String.Encoding = .utf8) throws {
        guard let data = json.data(using: encoding) else {
            throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
        }
        try self.init(data: data)
    }

    init(fromURL url: URL) throws {
        try self.init(data: try Data(contentsOf: url))
    }

    func with(
        licenseNumber: Double? = nil,
        name: String? = nil,
        surname: String? = nil
    ) -> RentingInformationRenter {
        return RentingInformationRenter(
            licenseNumber: licenseNumber ?? self.licenseNumber,
            name: name ?? self.name,
            surname: surname ?? self.surname
        )
    }

    func jsonData() throws -> Data {
        return try newJSONEncoder().encode(self)
    }

    func jsonString(encoding: String.Encoding = .utf8) throws -> String? {
        return String(data: try self.jsonData(), encoding: encoding)
    }
}

enum RentingStatus: String, Codable {
    case notRented = "NotRented"
    case rented = "Rented"
}

// MARK: - Helper functions for creating encoders and decoders

func newJSONDecoder() -> JSONDecoder {
    let decoder = JSONDecoder()
    if #available(iOS 10.0, OSX 10.12, tvOS 10.0, watchOS 3.0, *) {
        decoder.dateDecodingStrategy = .iso8601
    }
    return decoder
}

func newJSONEncoder() -> JSONEncoder {
    let encoder = JSONEncoder()
    if #available(iOS 10.0, OSX 10.12, tvOS 10.0, watchOS 3.0, *) {
        encoder.dateEncodingStrategy = .iso8601
    }
    return encoder
}
