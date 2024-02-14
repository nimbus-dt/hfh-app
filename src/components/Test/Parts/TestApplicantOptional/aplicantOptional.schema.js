import { z } from 'zod';

const yesNoOptions = ['Yes', 'No'];

export const militaryServiceSchema = z.object({
  serveOrServedInUSAF: z.enum(yesNoOptions),
  currentlyServing: z.enum(yesNoOptions).optional().nullable(),
  projectedExpirationDateOfServiceTour: z.string().optional().nullable(),
  currentlyRetiredDischargedOrSeparated: z
    .enum(yesNoOptions)
    .optional()
    .nullable(),
  onlyPeriodWasNonActive: z.enum(yesNoOptions).optional().nullable(),
  survivingSpouse: z.enum(yesNoOptions).optional().nullable(),
});

export const demographicSchema = z.object({
  ethnicity: z
    .object({
      hispanicOrLatino: z.boolean().optional(),
      mexican: z.boolean().optional(),
      puertoRican: z.boolean().optional(),
      cuban: z.boolean().optional(),
      otherHispanicOrLatino: z.boolean().optional(),
      otherHispanicOrLatinoValue: z.string().optional(),
      notHispanicOrLatino: z.boolean().optional(),
      iDoNotWishToProvideThisInfo: z.boolean().optional(),
    })
    .optional(),
  sex: z
    .enum(['Female', 'Male', 'I do not wish to provide this information'])
    .optional()
    .nullable(),
  race: z
    .object({
      americanIndianOrAlaskaNative: z.boolean().optional(),
      nameOfEnrolledOrPrincipalTribe: z.string().optional(),
      asian: z.boolean().optional(),
      asianIndian: z.boolean().optional(),
      chinese: z.boolean().optional(),
      filipino: z.boolean().optional(),
      japanese: z.boolean().optional(),
      korean: z.boolean().optional(),
      vietnamese: z.boolean().optional(),
      otherAsian: z.boolean().optional(),
      otherAsianValue: z.string().optional(),
      blackOrAfricanAmerican: z.boolean().optional(),
      nativeHawaiianOrOtherPacificIslander: z.boolean().optional(),
      nativeHawaiian: z.boolean().optional(),
      guamanianOrChamorro: z.boolean().optional(),
      samoan: z.boolean().optional(),
      otherPacificIslander: z.boolean().optional(),
      otherPacificIslanderValue: z.string().optional(),
      white: z.boolean().optional(),
      iDoNotWishToProvideThisInfo: z.boolean().optional(),
    })
    .optional(),
});
