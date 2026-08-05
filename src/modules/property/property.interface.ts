import { PropertyPricePeriod, PropertyStatus } from "../../../prisma/generated/prisma/enums"

export default interface IProperty {
    id?: string
    title: string
    addressLine: string
    city: string
    district: string
    price: number
    description?: string
    zipCode?: number
    longitude?: number
    pricePeriod?: PropertyPricePeriod
    bedrooms?: string
    bathrooms?: string
    areaSqft?: string
    status?: PropertyStatus
    image?: string
}