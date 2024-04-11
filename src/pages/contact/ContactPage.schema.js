import { z } from 'zod';

const contactSchema = z.object({
  howYouHearAboutHabitatApp: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  affiliateName: z.string().min(1),
  affiliateRole: z.string().min(1),
  affiliateState: z.string().min(1),
  housesBuildPerYear: z.string().min(1),
  applicationProcessPerYear: z.string().min(1),
  anythingElse: z.string().optional(),
});

export default contactSchema;
