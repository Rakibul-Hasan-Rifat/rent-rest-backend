import z from "zod";
import { PropertyPricePeriod, PropertyStatus, RentalRequestStatus } from "../../../prisma/generated/prisma/client";

export const createPropertySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(5000).optional(),

  addressLine: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  zipCode: z.number().int().optional(),

  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),

  price: z.coerce.number().positive("Price must be greater than 0"),
  pricePeriod: z.enum(Object.values(PropertyPricePeriod)).optional().default(PropertyPricePeriod.MONTHLY),

  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  areaSqft: z.string().optional(),

  status: z.enum(Object.values(PropertyStatus)).optional().default(PropertyStatus.AVAILABLE),
  images: z.array(z.url("Each image must be a valid URL")).default([]),

  landlordId: z.uuid().optional(),
  categoryId: z.uuid().optional(),
});

export const updatePropertySchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),

  addressLine: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  district: z.string().min(1).optional(),
  zipCode: z.number().int().optional(),

  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),

  price: z.coerce.number().positive().optional(),
  pricePeriod: z.enum(Object.values(PropertyPricePeriod)).optional(),

  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  areaSqft: z.string().optional(),

  status: z.enum(Object.values(PropertyStatus)).optional(),
  images: z.array(z.url()).optional(),
})
  // Reject an empty body — PATCH with nothing to update is a client error
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });

export const updateRentalStatusSchema = z.object({
  status: z.enum(Object.values(RentalRequestStatus) as [string, ...string[]], {
    message: "Status must be one of: PENDING, APPROVED, REJECTED",
  })
})